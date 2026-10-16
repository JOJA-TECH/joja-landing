import { cache } from 'react'
import type { Locale } from '@/lib/i18n/config'
import {
  GITHUB_ORG,
  catalogOptions,
  getProjectConfig,
  projectsConfig,
  repoKey,
  type ProjectIcon,
} from '@/lib/projects.config'

const REVALIDATE_SECONDS = 3600

interface GitHubRepo {
  name: string
  html_url: string
  description: string | null
  language: string | null
  topics?: string[]
  fork: boolean
  archived: boolean
  private: boolean
  pushed_at: string
  updated_at: string
  languages_url: string
}

export interface Project {
  id: string
  slug: string
  title: string
  description: string | null
  repositoryUrl: string
  deploymentUrl?: string
  documentationUrl?: string
  languages: string[]
  topics: string[]
  updatedAt: string | null
  featured: boolean
  archived: boolean
  icon: ProjectIcon
}

export type ProjectsResult =
  | { status: 'ok'; projects: Project[] }
  | { status: 'error'; reason: 'rate_limit' | 'unavailable'; projects: Project[] }

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  // Optional server-only token to raise the API rate limit. Never exposed to the client.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  return headers
}

function isRateLimited(res: Response) {
  return (res.status === 403 || res.status === 429) && res.headers.get('x-ratelimit-remaining') === '0'
}

function humanize(name: string) {
  return name
    .replace(/^\./, '')
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => (word === word.toUpperCase() ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ')
}

function isSafeUrl(value?: string) {
  if (!value) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

async function fetchLanguages(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, { headers: githubHeaders(), next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) return []
    const data = (await res.json()) as Record<string, number>
    return Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([language]) => language)
  } catch {
    return []
  }
}

function toProject(repo: GitHubRepo, languages: string[], locale: Locale): Project {
  const config = getProjectConfig(repo.html_url)
  const resolvedLanguages = languages.length ? languages : repo.language ? [repo.language] : []

  return {
    id: repoKey(repo.html_url),
    slug: repo.name,
    title: config?.title ?? humanize(repo.name),
    description: config?.description?.[locale] ?? repo.description,
    repositoryUrl: repo.html_url,
    deploymentUrl: isSafeUrl(config?.deploymentUrl),
    documentationUrl: isSafeUrl(config?.documentationUrl),
    languages: resolvedLanguages,
    topics: repo.topics ?? [],
    updatedAt: repo.pushed_at ?? repo.updated_at,
    featured: !!config?.featured,
    archived: repo.archived,
    icon: config?.icon ?? 'code',
  }
}

/** Projects built only from local configuration, used when GitHub is unreachable. */
function fallbackProjects(locale: Locale): Project[] {
  return projectsConfig
    .filter((entry) => !entry.hidden && entry.featured)
    .map((entry) => {
      const slug = entry.repository.split('/').pop() ?? entry.repository
      return {
        id: repoKey(entry.repository),
        slug,
        title: entry.title ?? humanize(slug),
        description: entry.description?.[locale] ?? null,
        repositoryUrl: entry.repository,
        deploymentUrl: isSafeUrl(entry.deploymentUrl),
        documentationUrl: isSafeUrl(entry.documentationUrl),
        languages: [],
        topics: [],
        updatedAt: null,
        featured: true,
        archived: false,
        icon: entry.icon ?? 'code',
      }
    })
}

const fetchRepos = cache(async (): Promise<{ repos: GitHubRepo[]; languages: Record<string, string[]> } | 'rate_limit' | 'unavailable'> => {
  try {
    const res = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&sort=updated&type=public`, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (isRateLimited(res)) return 'rate_limit'
    if (!res.ok) return 'unavailable'

    const all = (await res.json()) as GitHubRepo[]
    const repos = all.filter((repo) => {
      if (repo.private) return false
      if (repo.fork && !catalogOptions.includeForks) return false
      const config = getProjectConfig(repo.html_url)
      if (config?.hidden) return false
      if (repo.archived && !catalogOptions.includeArchived && !config?.featured) return false
      return true
    })

    const languageEntries = await Promise.all(
      repos.map(async (repo) => [repo.html_url, await fetchLanguages(repo.languages_url)] as const),
    )

    return { repos, languages: Object.fromEntries(languageEntries) }
  } catch {
    return 'unavailable'
  }
})

export async function getProjects(locale: Locale): Promise<ProjectsResult> {
  const result = await fetchRepos()

  if (typeof result === 'string') {
    return { status: 'error', reason: result, projects: fallbackProjects(locale) }
  }

  const featuredOrder = projectsConfig.filter((entry) => entry.featured).map((entry) => repoKey(entry.repository))

  const projects = result.repos
    .map((repo) => toProject(repo, result.languages[repo.html_url] ?? [], locale))
    .sort((a, b) => {
      const ai = featuredOrder.indexOf(a.id)
      const bi = featuredOrder.indexOf(b.id)
      if (ai !== -1 || bi !== -1) return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi)
      return (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '')
    })

  return { status: 'ok', projects }
}

export interface TechnologyStat {
  name: string
  count: number
}

export function getTechnologyStats(projects: Project[]): TechnologyStat[] {
  const counts = new Map<string, number>()
  for (const project of projects) {
    for (const language of project.languages) counts.set(language, (counts.get(language) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

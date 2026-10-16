import { ArrowUpRight, ChartLine, Cloud, CodeXml, Cpu, ShieldCheck, Terminal, type LucideIcon } from 'lucide-react'
import { GitHubMark } from '@/components/brand'
import type { Project } from '@/lib/github'
import { format, intlLocales, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { getLanguageColor } from '@/lib/language-colors'
import { getProjectDestination } from '@/lib/project-destination'
import type { ProjectIcon } from '@/lib/projects.config'
import { cn } from '@/lib/utils'

const icons: Record<ProjectIcon, LucideIcon> = {
  cloud: Cloud,
  cpu: Cpu,
  shield: ShieldCheck,
  chart: ChartLine,
  code: CodeXml,
  terminal: Terminal,
}

interface ProjectCardProps {
  project: Project
  dict: Dictionary['card']
  locale: Locale
  variant?: 'featured' | 'default'
}

export function ProjectCard({ project, dict, locale, variant = 'default' }: ProjectCardProps) {
  const destination = getProjectDestination(project)
  const Icon = icons[project.icon]
  const featured = variant === 'featured'
  const actionLabel = destination.kind === 'app' ? dict.openApp : destination.kind === 'docs' ? dict.readDocs : dict.viewRepo

  const updated = project.updatedAt
    ? new Intl.DateTimeFormat(intlLocales[locale], { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(project.updatedAt))
    : null

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-lg border border-border p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out focus-within:border-primary hover:-translate-y-1 hover:border-[#d9cdbb] hover:shadow-[0_18px_40px_-24px_rgba(36,35,33,0.35)]',
        featured ? 'bg-card md:p-7' : 'bg-card/60',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            'inline-flex size-10 items-center justify-center rounded-md border',
            featured ? 'border-transparent bg-secondary text-brand-strong' : 'border-border text-muted-foreground',
          )}
        >
          <Icon className="size-[18px]" aria-hidden="true" />
        </span>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {destination.kind === 'app' ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef0e6] px-2.5 py-1 font-mono text-[11px] text-[#5d6247]">
              <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
              {dict.live}
            </span>
          ) : null}
          {project.archived ? (
            <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
              {dict.archived}
            </span>
          ) : null}
          <ArrowUpRight
            className="size-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
      </div>

      <h3 className={cn('mt-6 font-medium tracking-tight text-foreground', featured ? 'text-xl' : 'text-lg')}>
        <a
          href={destination.href}
          target="_blank"
          rel="noopener noreferrer"
          className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-ring"
        >
          {project.title}
          <span className="sr-only">
            {' — '}
            {actionLabel} {dict.opensInNewTab}
          </span>
        </a>
      </h3>
      <p className="mt-1 font-mono text-xs text-muted-foreground">{project.slug}</p>

      <p
        className={cn(
          'mt-4 text-sm leading-relaxed text-pretty',
          project.description ? 'text-muted-foreground' : 'text-muted-foreground/70 italic',
          featured ? 'line-clamp-4' : 'line-clamp-3',
        )}
      >
        {project.description ?? dict.noDescription}
      </p>

      {project.topics.length ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.topics.slice(0, 5).map((topic) => (
            <li key={topic} className="rounded bg-secondary px-2 py-0.5 font-mono text-[11px] text-secondary-foreground">
              {topic}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-6">
        {project.languages.length ? (
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {project.languages.map((language) => (
              <li key={language} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full" style={{ backgroundColor: getLanguageColor(language) }} aria-hidden="true" />
                {language}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="text-sm font-medium text-foreground transition-colors group-hover:text-brand-strong">
            {actionLabel}
          </span>
          {destination.sourceHref ? (
            <a
              href={destination.sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 rounded text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubMark className="size-3.5" />
              {dict.source}
              <span className="sr-only">
                {project.title} {dict.opensInNewTab}
              </span>
            </a>
          ) : updated ? (
            <span className="text-xs text-muted-foreground">{format(dict.updated, { date: updated })}</span>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function ProjectCardSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn('flex h-full flex-col rounded-lg border border-border p-6', featured ? 'min-h-80 bg-card' : 'min-h-72 bg-card/60')}
    >
      <div className="size-10 animate-pulse rounded-md bg-secondary" />
      <div className="mt-6 h-5 w-2/3 animate-pulse rounded bg-secondary" />
      <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-secondary" />
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-secondary" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-secondary" />
        <div className="h-3 w-3/5 animate-pulse rounded bg-secondary" />
      </div>
      <div className="mt-auto h-px w-full bg-border" />
      <div className="mt-4 h-4 w-28 animate-pulse rounded bg-secondary" />
    </div>
  )
}

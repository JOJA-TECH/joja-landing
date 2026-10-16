import type { Locale } from '@/lib/i18n/config'

export const GITHUB_ORG = 'JOJA-TECH'
export const GITHUB_ORG_URL = `https://github.com/${GITHUB_ORG}`

export type ProjectIcon = 'cloud' | 'cpu' | 'shield' | 'chart' | 'code' | 'terminal'

export interface ProjectConfig {
  /** Canonical GitHub repository URL. Used as the stable identifier. */
  repository: string
  /** Public application URL. When present, it becomes the card's primary destination. */
  deploymentUrl?: string
  /** Verified documentation URL. Used when the project has no deployment. */
  documentationUrl?: string
  /** Shown in the featured section, in the order defined in this list. */
  featured?: boolean
  /** Removes the repository from every listing (e.g. the org profile repo). */
  hidden?: boolean
  /** Optional display title. Defaults to a humanized repository name. */
  title?: string
  /** Optional per-locale description. Falls back to the GitHub description. */
  description?: Partial<Record<Locale, string>>
  icon?: ProjectIcon
}

export const catalogOptions = {
  includeForks: false,
  includeArchived: false,
}

/**
 * Source of truth for deployment destinations and featured projects.
 * To add a repo or change a deployment, edit this list — the UI does not need to change.
 */
export const projectsConfig: ProjectConfig[] = [
  {
    repository: 'https://github.com/JOJA-TECH/cloud-cost-optimazer',
    deploymentUrl: 'https://cloud-cost-optimazer.vercel.app',
    featured: true,
    icon: 'chart',
    description: {
      en: 'Intelligent cloud cost optimization platform to monitor, analyze, and recommend cost-effective resource configurations in cloud environments.',
    },
  },
  {
    repository: 'https://github.com/JOJA-TECH/AWS-Static-web-S3-CloudFront',
    featured: true,
    icon: 'cloud',
    title: 'AWS Static Web · S3 + CloudFront',
    description: {
      en: 'Static content storage and delivery platform on AWS, built with Terraform and GitHub Actions. Integrates Amazon S3, CloudFront, Route 53, ACM, Lambda@Edge, and lifecycle policies for security, performance, automation, and cost optimization.',
    },
  },
  {
    repository: 'https://github.com/JOJA-TECH/windows-process-thread-lab',
    featured: true,
    icon: 'cpu',
    description: {
      en: 'Experimental C++17 lab for Windows that analyzes processes, threads, concurrency, parallelism, and CPU scheduling. Detects hardware automatically, bounds tests by logical processors, measures timings, and generates data, charts, and evidence for the academic report.',
    },
  },
  {
    repository: 'https://github.com/JOJA-TECH/aws-security-remediation-checkov-trivy',
    icon: 'shield',
    title: 'AWS Security Remediation · Checkov + Trivy',
    description: {
      en: 'Exercise: remediating an insecure AWS infrastructure with Checkov and Trivy (Terraform + ECS Fargate + GitHub Actions).',
    },
  },
  {
    repository: 'https://github.com/JOJA-TECH/linux-process-thread-lab',
    icon: 'terminal',
  },
  {
    repository: 'https://github.com/JOJA-TECH/.github',
    hidden: true,
  },
]

export function repoKey(url: string) {
  return url.replace(/\/+$/, '').toLowerCase()
}

export function getProjectConfig(repositoryUrl: string) {
  const key = repoKey(repositoryUrl)
  return projectsConfig.find((entry) => repoKey(entry.repository) === key)
}

import type { Project } from '@/lib/github'

export type DestinationKind = 'app' | 'docs' | 'repo'

export interface ProjectDestination {
  kind: DestinationKind
  href: string
  /** Link to the source repository when the primary action points elsewhere. */
  sourceHref?: string
}

/** Deployment first, then verified documentation, then the GitHub repository. */
export function getProjectDestination(project: Pick<Project, 'deploymentUrl' | 'documentationUrl' | 'repositoryUrl'>): ProjectDestination {
  if (project.deploymentUrl) {
    return { kind: 'app', href: project.deploymentUrl, sourceHref: project.repositoryUrl }
  }
  if (project.documentationUrl) {
    return { kind: 'docs', href: project.documentationUrl, sourceHref: project.repositoryUrl }
  }
  return { kind: 'repo', href: project.repositoryUrl }
}

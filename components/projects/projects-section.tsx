import { CircleAlert } from 'lucide-react'
import { GitHubMark } from '@/components/brand'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard, ProjectCardSkeleton } from '@/components/projects/project-card'
import { ProjectsCatalog } from '@/components/projects/projects-catalog'
import { getProjects } from '@/lib/github'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { GITHUB_ORG_URL } from '@/lib/projects.config'

function ViewAllLink({ label }: { label: string }) {
  return (
    <a
      href={`${GITHUB_ORG_URL}?tab=repositories`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand-strong hover:decoration-primary"
    >
      <GitHubMark className="size-3.5" />
      {label}
    </a>
  )
}

export async function ProjectsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const result = await getProjects(locale)
  const featured = result.projects.filter((project) => project.featured)

  return (
    <section id="projects" aria-labelledby="featured-title" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            id="featured-title"
            eyebrow={dict.featured.eyebrow}
            title={dict.featured.title}
            description={dict.featured.description}
          />
        </Reveal>

        {featured.length ? (
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal as="li" key={project.id} delay={index * 90}>
                <ProjectCard project={project} dict={dict.card} locale={locale} variant="featured" />
              </Reveal>
            ))}
          </ul>
        ) : null}

        <div className="mt-28 md:mt-36">
          <Reveal>
            <SectionHeading
              id="catalog-title"
              eyebrow={dict.catalog.eyebrow}
              title={dict.catalog.title}
              description={dict.catalog.description}
              action={<ViewAllLink label={dict.catalog.viewAll} />}
            />
          </Reveal>

          {result.status === 'error' ? (
            <div role="status" className="mt-12 flex flex-col gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-start">
              <CircleAlert className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{dict.catalog.errorTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {result.reason === 'rate_limit' ? dict.catalog.rateLimitDescription : dict.catalog.errorDescription}
                </p>
                <div className="mt-4">
                  <ViewAllLink label={dict.catalog.viewAll} />
                </div>
              </div>
            </div>
          ) : result.projects.length === 0 ? (
            <div className="mt-12 rounded-lg border border-dashed border-border p-10 text-center">
              <p className="font-medium text-foreground">{dict.catalog.noReposTitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">{dict.catalog.noReposDescription}</p>
            </div>
          ) : (
            <ProjectsCatalog projects={result.projects} locale={locale} dict={dict} />
          )}
        </div>
      </div>
    </section>
  )
}

export function ProjectsSectionSkeleton({ dict }: { dict: Dictionary }) {
  return (
    <section id="projects" aria-labelledby="featured-title" aria-busy="true" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="featured-title"
          eyebrow={dict.featured.eyebrow}
          title={dict.featured.title}
          description={dict.featured.description}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((key) => (
            <ProjectCardSkeleton key={key} featured />
          ))}
        </div>
      </div>
    </section>
  )
}

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { getProjects, getTechnologyStats } from '@/lib/github'
import { format, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { getLanguageColor } from '@/lib/language-colors'

type TechDict = Dictionary['technologies']

function Heading({ dict }: { dict: TechDict }) {
  return <SectionHeading id="technologies-title" eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />
}

export async function TechnologiesSection({ locale, dict }: { locale: Locale; dict: TechDict }) {
  const result = await getProjects(locale)
  const stats = getTechnologyStats(result.projects)
  const max = stats[0]?.count ?? 1

  return (
    <section id="technologies" aria-labelledby="technologies-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <Heading dict={dict} />
        </Reveal>

        {stats.length ? (
          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((tech, index) => (
              <Reveal
                as="li"
                key={tech.name}
                delay={Math.min(index, 8) * 50}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-[#d9cdbb]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2.5 font-medium text-foreground">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(tech.name) }} aria-hidden="true" />
                    {tech.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {tech.count === 1 ? dict.repoCountOne : format(dict.repoCount, { count: tech.count })}
                  </span>
                </div>
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{ width: `${Math.max((tech.count / max) * 100, 8)}%`, backgroundColor: getLanguageColor(tech.name) }}
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="mt-12 rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">{dict.empty}</p>
        )}
      </div>
    </section>
  )
}

export function TechnologiesSkeleton({ dict }: { dict: TechDict }) {
  return (
    <section id="technologies" aria-labelledby="technologies-title" aria-busy="true" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Heading dict={dict} />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="h-[86px] animate-pulse rounded-lg border border-border bg-card" />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useDeferredValue, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { ProjectCard } from '@/components/projects/project-card'
import type { Project } from '@/lib/github'
import { format, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { getLanguageColor } from '@/lib/language-colors'
import { cn } from '@/lib/utils'

interface ProjectsCatalogProps {
  projects: Project[]
  locale: Locale
  dict: Dictionary
}

export function ProjectsCatalog({ projects, locale, dict }: ProjectsCatalogProps) {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState<string | null>(null)
  const deferredQuery = useDeferredValue(query)

  const languages = useMemo(() => {
    const counts = new Map<string, number>()
    for (const project of projects) for (const lang of project.languages) counts.set(lang, (counts.get(lang) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name)
  }, [projects])

  const filtered = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase()
    return projects.filter((project) => {
      if (language && !project.languages.includes(language)) return false
      if (!needle) return true
      return [project.title, project.slug, project.description ?? '', ...project.topics, ...project.languages]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    })
  }, [projects, deferredQuery, language])

  const hasFilters = query.length > 0 || language !== null
  const clear = () => {
    setQuery('')
    setLanguage(null)
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="project-search" className="sr-only">
            {dict.catalog.searchLabel}
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dict.catalog.searchPlaceholder}
            autoComplete="off"
            className="h-11 w-full rounded-md border border-input bg-card pr-10 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={dict.catalog.clearFilters}
              className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {languages.length > 1 ? (
          <div role="group" aria-label={dict.catalog.filterLabel} className="flex flex-wrap gap-2">
            {[null, ...languages].map((lang) => {
              const active = language === lang
              return (
                <button
                  key={lang ?? 'all'}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    'inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-xs transition-colors',
                    active
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-card text-muted-foreground hover:border-[#d9cdbb] hover:text-foreground',
                  )}
                >
                  {lang ? (
                    <span className="size-2 rounded-full" style={{ backgroundColor: getLanguageColor(lang) }} aria-hidden="true" />
                  ) : null}
                  {lang ?? dict.catalog.allLanguages}
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-xs text-muted-foreground">
        {format(dict.catalog.results, { count: filtered.length, total: projects.length })}
      </p>

      {filtered.length ? (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <li
              key={project.id}
              className="animate-rise-in"
              style={{ animationDelay: `${Math.min(index, 8) * 40}ms`, animationDuration: '0.5s' }}
            >
              <ProjectCard project={project} dict={dict.card} locale={locale} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-border p-10 text-center">
          <p className="font-medium text-foreground">{dict.catalog.emptyTitle}</p>
          <p className="mt-2 text-sm text-muted-foreground">{dict.catalog.emptyDescription}</p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clear}
              className="mt-5 inline-flex h-9 items-center rounded-md border border-border bg-card px-4 text-sm text-foreground hover:border-primary"
            >
              {dict.catalog.clearFilters}
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

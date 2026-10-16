import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { ProjectsSection, ProjectsSectionSkeleton } from '@/components/projects/projects-section'
import { About } from '@/components/about'
import { TechnologiesSection, TechnologiesSkeleton } from '@/components/technologies'
import { SiteFooter } from '@/components/site-footer'

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {dict.nav.skipToContent}
      </a>
      <SiteHeader locale={lang} dict={dict.nav} />
      <main id="main">
        <Hero dict={dict.hero} />
        <Suspense fallback={<ProjectsSectionSkeleton dict={dict} />}>
          <ProjectsSection locale={lang} dict={dict} />
        </Suspense>
        <About dict={dict.about} />
        <Suspense fallback={<TechnologiesSkeleton dict={dict.technologies} />}>
          <TechnologiesSection locale={lang} dict={dict.technologies} />
        </Suspense>
      </main>
      <SiteFooter locale={lang} dict={dict} />
    </>
  )
}

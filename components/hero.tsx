import { ArrowRight } from 'lucide-react'
import { GitHubMark } from '@/components/brand'
import { HeroVisual } from '@/components/hero-visual'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { GITHUB_ORG_URL } from '@/lib/projects.config'

export function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,#e4dccf_1px,transparent_1px),linear-gradient(to_bottom,#e4dccf_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_70%)] opacity-60"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <div>
          <p
            className="animate-rise-in mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-3 py-1.5 font-mono text-xs text-muted-foreground"
            style={{ animationDelay: '50ms' }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-sage" />
            </span>
            {dict.badge}
          </p>

          <h1
            id="hero-title"
            className="animate-rise-in text-5xl leading-[1.02] font-medium tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '120ms' }}
          >
            {dict.titleStart}{' '}
            <span className="font-serif font-normal text-primary italic">{dict.titleEmphasis}</span>
          </h1>

          <p
            className="animate-rise-in mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
            style={{ animationDelay: '220ms' }}
          >
            {dict.description}
          </p>

          <div className="animate-rise-in mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '320ms' }}>
            <a
              href="#projects"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-brand-strong"
            >
              {dict.primaryCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href={GITHUB_ORG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-brand-strong"
            >
              <GitHubMark />
              {dict.secondaryCta}
            </a>
          </div>
        </div>

        <div className="animate-rise-in" style={{ animationDelay: '260ms' }}>
          <HeroVisual label={dict.visualLabel} />
        </div>
      </div>
    </section>
  )
}

import { Compass, GitBranch, Wrench } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

const principleIcons = [Wrench, Compass, GitBranch]

export function About({ dict }: { dict: Dictionary['about'] }) {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-foreground py-24 text-background md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-primary uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              {dict.eyebrow}
            </p>
            <h2 id="about-title" className="text-4xl leading-tight font-medium tracking-tight text-balance md:text-5xl">
              {dict.titleStart} <span className="font-serif font-normal text-[#e3a184] italic">{dict.titleEmphasis}</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed text-pretty text-[#cfc8bd] lg:pt-12">{dict.body}</p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
          {dict.principles.map((principle, index) => {
            const Icon = principleIcons[index] ?? Wrench
            return (
              <Reveal as="li" key={principle.title} delay={index * 100} className="bg-foreground p-8">
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-[#e3a184]" aria-hidden="true" />
                  <span className="font-mono text-xs text-[#8f887e]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-10 text-xl font-medium">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#cfc8bd]">{principle.description}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { GitHubMark, Wordmark } from '@/components/brand'
import { LanguageSwitcher } from '@/components/language-switcher'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import type { Locale } from '@/lib/i18n/config'
import { GITHUB_ORG_URL } from '@/lib/projects.config'
import { cn } from '@/lib/utils'

interface SiteHeaderProps {
  locale: Locale
  dict: Dictionary['nav']
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: '#projects', label: dict.projects },
    { href: '#about', label: dict.about },
    { href: '#technologies', label: dict.technologies },
  ]

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open ? 'border-border bg-background/85 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="rounded-md" aria-label="JOJA-TECH">
          <Wordmark />
        </a>

        <nav aria-label={dict.primaryLabel} className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubMark className="size-3.5" />
            {dict.github}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={dict.language} />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground hover:bg-secondary md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-border bg-background md:hidden"
      >
        <nav aria-label={dict.primaryLabel} className="flex flex-col px-5 py-6">
          {[...links, { href: GITHUB_ORG_URL, label: dict.github }].map((link, index) => {
            const external = link.href.startsWith('http')
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="animate-rise-in flex items-center justify-between border-b border-border py-5 font-serif text-3xl text-foreground"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {link.label}
                <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

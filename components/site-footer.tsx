import { GitHubMark, Wordmark } from '@/components/brand'
import { LanguageSwitcher } from '@/components/language-switcher'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'
import { GITHUB_ORG_URL } from '@/lib/projects.config'

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{dict.footer.description}</p>
          </div>

          <nav aria-label={dict.footer.navigation}>
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{dict.footer.navigation}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#projects" className="text-foreground hover:text-brand-strong">{dict.nav.projects}</a>
              </li>
              <li>
                <a href="#about" className="text-foreground hover:text-brand-strong">{dict.nav.about}</a>
              </li>
              <li>
                <a href="#technologies" className="text-foreground hover:text-brand-strong">{dict.nav.technologies}</a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{dict.footer.resources}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={GITHUB_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground hover:text-brand-strong"
                >
                  <GitHubMark className="size-3.5" />
                  {dict.footer.organization}
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_ORG_URL}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-brand-strong"
                >
                  {dict.footer.allRepos}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} JOJA-TECH. {dict.footer.rights}
          </p>
          <LanguageSwitcher locale={locale} label={dict.nav.language} />
        </div>
      </div>
    </footer>
  )
}

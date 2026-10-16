'use client'

import { LOCALE_COOKIE, localeNames, locales, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const remember = (next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
  }

  return (
    <div role="group" aria-label={label} className="flex items-center rounded-full border border-border bg-card/60 p-0.5">
      {locales.map((code) => {
        const active = code === locale
        return (
          <a
            key={code}
            href={`/${code}`}
            hrefLang={code}
            lang={code}
            aria-current={active ? 'true' : undefined}
            aria-label={localeNames[code]}
            onClick={() => remember(code)}
            className={cn(
              'rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider uppercase transition-colors',
              active ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {code}
          </a>
        )
      })}
    </div>
  )
}

export const locales = ['en', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
}

export const intlLocales: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-ES',
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value)
}

/**
 * Picks the best supported locale from an Accept-Language header.
 * Spanish variants (es, es-MX, es-419…) map to "es"; everything else falls back to English.
 */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale

  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { tag: tag.toLowerCase(), q: q ? Number.parseFloat(q.split('=')[1]) : 1 }
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (isLocale(base)) return base
  }

  return defaultLocale
}

export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`))
}

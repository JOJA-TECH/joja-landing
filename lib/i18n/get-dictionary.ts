import type { Locale } from './config'
import type { Dictionary } from './dictionaries/en'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en').then((m) => m.default),
  es: () => import('./dictionaries/es').then((m) => m.default),
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}

export type { Dictionary }

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import { notFound } from 'next/navigation'
import { intlLocales, isLocale, locales } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import '../globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = await getDictionary(lang)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: '/en', es: '/es', 'x-default': '/en' },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: 'website',
      siteName: 'JOJA-TECH',
      locale: intlLocales[lang].replace('-', '_'),
    },
    twitter: { card: 'summary', title: dict.meta.title, description: dict.meta.description },
    icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
  }
}

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  colorScheme: 'light',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

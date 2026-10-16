import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_COOKIE, isLocale, locales, matchLocale } from '@/lib/i18n/config'

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  if (hasLocale) return NextResponse.next()

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale = isLocale(cookieLocale) ? cookieLocale : matchLocale(request.headers.get('accept-language'))

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  url.search = search

  const response = NextResponse.redirect(url)
  response.headers.set('Vary', 'Accept-Language, Cookie')
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

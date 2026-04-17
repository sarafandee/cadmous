import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all pathnames except:
    // - /api (Payload API)
    // - /admin (Payload admin panel)
    // - /next (Next.js internal routes like preview)
    // - /_next (Next.js assets)
    // - /favicon.ico, /robots.txt, etc.
    '/((?!api|admin|next|_next|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
}

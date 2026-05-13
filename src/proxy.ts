import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all pathnames except Next.js internals, static assets,
    // the admin app, all API routes, and uploads (handled outside i18n).
    '/((?!_next|admin|api|uploads|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
}

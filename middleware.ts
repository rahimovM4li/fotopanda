import { next, rewrite } from '@vercel/functions'
import { canonicalRedirect } from './src/seo/redirects.js'
import { pages } from './src/seo/pages.js'
import { basePath, pathLanguage } from './src/seo/paths.js'

export default function middleware(request: Request) {
  const url = new URL(request.url)
  const preview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production')
    || !['www.fotopandastudio.de', 'fotopandastudio.de', 'localhost', '127.0.0.1'].includes(url.hostname)
  const headers: Record<string, string> = preview ? { 'X-Robots-Tag': 'noindex, follow' } : {}
  const redirect = canonicalRedirect(url)
  if (redirect) return new Response(null, { status: 308, headers: { ...headers, Location: redirect.href } })
  if (pages.some(page => page.path === basePath(url.pathname))) return next({ headers })
  // Preserve normal static asset delivery. Missing assets remain platform 404s.
  if (/\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith('.html')) return next({ headers })
  const error = new URL(pathLanguage(url.pathname) === 'ru' ? '/ru/404.html' : '/404.html', url)
  return rewrite(error, { status: 404, headers: { ...headers, 'X-Robots-Tag': 'noindex, follow' } })
}
// Keep crawler files available even when page middleware cannot start.
export const config = { matcher: ['/((?!assets/|_vercel/|robots\\.txt$|sitemap\\.xml$|site\\.webmanifest$|favicon\\.ico$|favicon\\.png$).*)'] }

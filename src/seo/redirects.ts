import { pages } from './pages.js'
import { basePath, languagePath, pathLanguage } from './paths.js'
import { siteConfig } from '../config/siteConfig.js'

/** One redirect combines legacy language, HTML, slash and production-host normalization. */
export function canonicalRedirect(input: URL): URL | null {
  const target = new URL(input)
  let path = input.pathname.replace(/\/+$/, '') || '/'
  path = path.replace(/\/index\.html$/, '/') || '/'
  path = path.replace(/\.html$/, '').replace(/\/+$/, '') || '/'
  const base = basePath(path)
  if (pages.some(page => page.path === base)) {
    const legacy = input.searchParams.get('lang')
    const language = legacy === 'de' || legacy === 'ru' ? legacy : pathLanguage(path)
    target.pathname = languagePath(base, language)
    // Unknown language values do not select content and are redundant too.
    target.searchParams.delete('lang')
  }
  if (input.hostname === 'fotopandastudio.de' || input.hostname === 'www.fotopandastudio.de') {
    target.host = new URL(siteConfig.domain).host
    target.protocol = 'https:'
  }
  return target.href === input.href ? null : target
}

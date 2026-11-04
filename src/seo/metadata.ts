import { siteConfig, linkedSocial } from '../config/siteConfig'
import { basePath, languagePath, pathLanguage } from './paths'
import { pages, notFound } from './pages'

export function metadata(pathname: string, preview = false) {
  const language = pathLanguage(pathname)
  const path = basePath(pathname)
  const page = pages.find(entry => entry.path === path)
  const copy = (page ?? notFound)[language]
  const origin = siteConfig.domain
  const url = origin + languagePath(path, language)
  const image = origin + '/assets/photos/bridal-palace-1320.jpg'
  const imageAlt = language === 'de' ? 'Braut mit Diadem und langem weißen Kleid an einer goldgerahmten Tür' : 'Невеста в диадеме и длинном белом платье у двери с золотой отделкой'
  const name = copy.title.split(' | ')[0]
  const organizationId = origin + '/#organization'
  const websiteId = origin + '/#website'
  const pageId = url + '#webpage'
  const graph: Record<string, unknown>[] = [
    { '@type': 'Organization', '@id': organizationId, name: siteConfig.brandName, url: origin + '/',
      logo: { '@type': 'ImageObject', url: origin + '/assets/brand/favicon-180.png', width: 180, height: 180 },
      email: siteConfig.email, telephone: siteConfig.phoneHref,
      location: { '@type': 'Place', name: 'Osnabrück, Deutschland' },
      areaServed: { '@type': 'Country', name: 'Deutschland' }, sameAs: linkedSocial.map(social => social.url) },
    { '@type': 'WebSite', '@id': websiteId, name: siteConfig.brandName, url: origin + '/', inLanguage: ['de', 'ru'], publisher: { '@id': organizationId } },
    { '@type': page?.type ?? 'WebPage', '@id': pageId, url, name: copy.title, description: copy.description,
      inLanguage: language, isPartOf: { '@id': websiteId }, about: { '@id': organizationId },
      ...(page?.service ? { mainEntity: { '@id': url + '#service' } } : {}),
      ...(page && path !== '/' ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {}) },
  ]
  if (page && path !== '/') graph.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: [
    { '@type': 'ListItem', position: 1, name: language === 'de' ? 'Startseite' : 'Главная', item: origin + languagePath('/', language) },
    { '@type': 'ListItem', position: 2, name, item: url },
  ] })
  if (page?.service) graph.push({ '@type': 'Service', '@id': url + '#service', name, description: copy.description, url,
    provider: { '@id': organizationId }, areaServed: { '@type': 'Country', name: 'Deutschland' } })
  const metas: Record<string, string> = {
    description: copy.description,
    robots: preview || !page || page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    'og:type': 'website', 'og:site_name': siteConfig.brandName, 'og:title': copy.title,
    'og:description': copy.description, 'og:url': url, 'og:locale': language === 'de' ? 'de_DE' : 'ru_RU',
    'og:locale:alternate': language === 'de' ? 'ru_RU' : 'de_DE',
    'og:image': image, 'og:image:width': '1320', 'og:image:height': '1622', 'og:image:alt': imageAlt,
    'twitter:card': 'summary_large_image', 'twitter:title': copy.title, 'twitter:description': copy.description,
    'twitter:image': image, 'twitter:image:alt': imageAlt,
  }
  const alternates = page && !page.noindex ? ['de', 'ru', 'x-default'].map(lang => ({ lang, href: origin + languagePath(path, lang === 'ru' ? 'ru' : 'de') })) : []
  return { title: copy.title, language, url: page ? url : undefined, metas, alternates, schema: { '@context': 'https://schema.org', '@graph': graph } }
}
export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}
export function serializeHead(path: string, preview = false) {
  const data = metadata(path, preview)
  return `<title>${escapeHtml(data.title)}</title>\n` +
    Object.entries(data.metas).map(([key, value]) => `<meta data-seo="" ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}">`).join('\n') + '\n' +
    (data.url ? `<link data-seo="" rel="canonical" href="${data.url}">\n` : '') +
    data.alternates.map(item => `<link data-seo="" rel="alternate" hreflang="${item.lang}" href="${item.href}">`).join('\n') +
    `<script data-seo="" type="application/ld+json">${JSON.stringify(data.schema).replace(/</g, '\\u003c')}</script>`
}

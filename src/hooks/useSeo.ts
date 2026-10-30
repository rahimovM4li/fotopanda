import { useEffect } from 'react'
import { useTranslation } from '@/i18n/LanguageProvider'
import { siteConfig } from '@/config/siteConfig'

/**
 * Setzt Titel, Beschreibung und canonical fuer Routen, die nicht die
 * Startseite sind. Die Startseite traegt ihre Metadaten statisch in
 * index.html, damit sie auch ohne ausgefuehrtes JavaScript stimmen.
 */
export function useSeo({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string
  description: string
  path: string
  noIndex?: boolean
}) {
  const { t, language } = useTranslation()
  useEffect(() => {
    const localizedTitle = t(title)
    const localizedDescription = t(description)
    const url = `${siteConfig.domain}${path}${language === 'ru' ? '?lang=ru' : ''}`
    const previousTitle = document.title
    document.title = localizedTitle

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector)
      if (!el) {
        el = document.createElement('meta')
        const [key, val] = selector.replace(/^meta\[|\]$/g, '').split('=')
        el.setAttribute(key, val.replace(/"/g, ''))
        document.head.appendChild(el)
      }
      const previous = el.getAttribute(attr)
      el.setAttribute(attr, value)
      return () => {
        if (previous !== null) el.setAttribute(attr, previous)
      }
    }

    const restoreDescription = setMeta('meta[name="description"]', 'content', localizedDescription)
    const restoreOgTitle = setMeta('meta[property="og:title"]', 'content', localizedTitle)
    const restoreOgDescription = setMeta('meta[property="og:description"]', 'content', localizedDescription)
    const restoreOgUrl = setMeta('meta[property="og:url"]', 'content', url)
    const restoreTwitterTitle = setMeta('meta[name="twitter:title"]', 'content', localizedTitle)
    const restoreTwitterDescription = setMeta('meta[name="twitter:description"]', 'content', localizedDescription)

    const restoreImageAlt = setMeta('meta[property="og:image:alt"]', 'content', t('Braut mit Diadem und langem weißen Kleid an einer goldgerahmten Tür'))
    const schema = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]')
    const previousSchema = schema?.textContent
    if (schema && previousSchema) {
      const data = JSON.parse(previousSchema)
      data.slogan = t('Fotos. Videos. Erlebnisse.')
      data.description = t('Fotografie und Videoproduktion für Hochzeiten, Porträts, Gastronomie, Unternehmen, Schulen, Kindergärten und Veranstaltungen.')
      data.areaServed = t('Deutschland')
      data.availableLanguage = ['de', 'ru']
      schema.textContent = JSON.stringify(data)
    }
    const restoreLocale = setMeta('meta[property="og:locale"]', 'content', language === 'ru' ? 'ru_RU' : 'de_DE')
    const alternates = ['de', 'ru', 'x-default'].map(lang => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = lang
      link.href = `${siteConfig.domain}${path}${lang === 'ru' ? '?lang=ru' : lang === 'de' ? '?lang=de' : ''}`
      document.head.appendChild(link)
      return link
    })
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href') ?? null
    canonical?.setAttribute('href', url)

    let robots: HTMLMetaElement | null = null
    if (noIndex) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      robots.content = 'noindex, follow'
      document.head.appendChild(robots)
    }

    return () => {
      document.title = previousTitle
      restoreDescription()
      restoreOgTitle()
      restoreOgDescription()
      restoreOgUrl()
      restoreLocale()
      restoreImageAlt()
      if (schema && previousSchema) schema.textContent = previousSchema
      alternates.forEach(link => link.remove())
      restoreTwitterTitle()
      restoreTwitterDescription()
      if (previousCanonical) canonical?.setAttribute('href', previousCanonical)
      robots?.remove()
    }
  }, [title, description, path, noIndex, t, language])
}

import { useEffect } from 'react'
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
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

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

    const restoreDescription = setMeta('meta[name="description"]', 'content', description)
    const restoreOgTitle = setMeta('meta[property="og:title"]', 'content', title)
    const restoreOgDescription = setMeta('meta[property="og:description"]', 'content', description)
    const restoreOgUrl = setMeta('meta[property="og:url"]', 'content', `${siteConfig.domain}${path}`)
    const restoreTwitterTitle = setMeta('meta[name="twitter:title"]', 'content', title)
    const restoreTwitterDescription = setMeta('meta[name="twitter:description"]', 'content', description)

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href') ?? null
    canonical?.setAttribute('href', `${siteConfig.domain}${path}`)

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
      restoreTwitterTitle()
      restoreTwitterDescription()
      if (previousCanonical) canonical?.setAttribute('href', previousCanonical)
      robots?.remove()
    }
  }, [title, description, path, noIndex])
}

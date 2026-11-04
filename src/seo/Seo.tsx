import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metadata } from './metadata'

export function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const data = metadata(pathname, import.meta.env.VITE_DEPLOY_ENV === 'preview')
    document.title = data.title
    document.documentElement.lang = data.language
    document.head.querySelectorAll('[data-seo]').forEach(node => node.remove())
    const append = (tag: string, attrs: Record<string, string>, text?: string) => {
      const node = document.createElement(tag)
      node.setAttribute('data-seo', '')
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value))
      if (text) node.textContent = text
      document.head.appendChild(node)
    }
    Object.entries(data.metas).forEach(([key, value]) => append('meta', { [key.startsWith('og:') ? 'property' : 'name']: key, content: value }))
    if (data.url) append('link', { rel: 'canonical', href: data.url })
    data.alternates.forEach(item => append('link', { rel: 'alternate', hreflang: item.lang, href: item.href }))
    append('script', { type: 'application/ld+json' }, JSON.stringify(data.schema))
  }, [pathname])
  return null
}

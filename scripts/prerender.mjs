import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import { prerenderToNodeStream } from 'react-dom/static'
import { documentNodes, textContent } from './html-utils.mjs'

const vite = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
try {
  const { renderApp } = await vite.ssrLoadModule('/scripts/render-app.tsx')
  const { pages } = await vite.ssrLoadModule('/src/seo/pages.ts')
  const { serializeHead } = await vite.ssrLoadModule('/src/seo/metadata.ts')
  const { languagePath } = await vite.ssrLoadModule('/src/seo/paths.ts')
  const { siteConfig } = await vite.ssrLoadModule('/src/config/siteConfig.ts')
  const template = await readFile('dist/index.html', 'utf8')
  const preview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') || process.env.SEO_PREVIEW === '1'
  const locations = []
  for (const page of pages) for (const language of ['de', 'ru']) locations.push({ page, language, path: languagePath(page.path, language) })
  locations.push({ language: 'de', path: '/404' }, { language: 'ru', path: '/ru/404' })
  const seoMap = ['# Карта SEO Foto Panda', '', 'Генерируется из реестра страниц и фактического HTML при сборке. H1 сохраняют утверждённую редакционную подачу. Параметры запросов не входят в canonical. `x-default` — немецкая версия. Юридические страницы исключены из sitemap.', '']
  for (const { path, language, page } of locations) {
    const { prelude } = await prerenderToNodeStream(renderApp(path), { onError(error) { throw error } })
    for await (const chunk of prelude) void chunk
    // Resolve lazy modules first, then emit an inline, hydration-compatible tree.
    const body = renderToString(renderApp(path))
    if (body.includes('<template')) throw new Error(`Unresolved Suspense boundary: ${path}`)
    const html = template.replace('<html lang="de">', `<html lang="${language}">`)
      .replace('<!--seo-head-->', () => serializeHead(path, preview))
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
    const file = path === '/' ? 'dist/index.html' : `dist${path}.html`
    await mkdir(file.slice(0, file.lastIndexOf('/')), { recursive: true })
    await writeFile(file, html)
    if (page) {
      const h1 = documentNodes(html).filter(node => node.tagName === 'h1').map(textContent).join(' ').replace(/\s+/g, ' ').trim()
      seoMap.push(`## ${path} (${language})`, '', `- URL / canonical: ${siteConfig.domain}${path}`, `- Индексация: ${page.noindex ? 'noindex, follow' : 'index, follow'}`, `- Намерение: ${page.intent}`, `- Тема и дополнительные термины: ${page.topics[language === 'de' ? 0 : 1]}`, `- Title: ${page[language].title}`, `- Description: ${page[language].description}`, `- H1: ${h1}`, '')
    }
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.filter(entry => entry.page && !entry.page.noindex).map(({ path }) => `  <url><loc>${siteConfig.domain}${path}</loc></url>`).join('\n')}\n</urlset>\n`
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.domain}/sitemap.xml\n`
  // Tracked public copies are generated too, never maintained separately.
  for (const directory of ['dist', 'public']) {
    await writeFile(`${directory}/sitemap.xml`, sitemap)
    await writeFile(`${directory}/robots.txt`, robots)
  }
  await writeFile('docs/SEO-MAP.md', seoMap.join('\n'))
  console.log(`Prerendered ${locations.length} pages; generated sitemap with ${locations.filter(entry => entry.page && !entry.page.noindex).length} URLs. Preview: ${preview}.`)
} finally { await vite.close() }

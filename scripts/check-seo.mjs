import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { createServer } from 'vite'
import sharp from 'sharp'
import { documentNodes, attr, textContent } from './html-utils.mjs'
const vite = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
try {
  const { pages } = await vite.ssrLoadModule('/src/seo/pages.ts')
  const { languagePath } = await vite.ssrLoadModule('/src/seo/paths.ts')
  const { metadata } = await vite.ssrLoadModule('/src/seo/metadata.ts')
  const { canonicalRedirect } = await vite.ssrLoadModule('/src/seo/redirects.ts')
  const { default: middleware } = await vite.ssrLoadModule('/middleware.ts')
  const origin = 'https://www.fotopandastudio.de'
  const preview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') || process.env.SEO_PREVIEW === '1'
  const paths = pages.flatMap(page => ['de', 'ru'].map(language => languagePath(page.path, language)))
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
  assert.deepEqual(locations.sort(), pages.filter(page => !page.noindex).flatMap(page => ['de', 'ru'].map(language => origin + languagePath(page.path, language))).sort())
  const titles = new Set(), descriptions = new Set()
  let assets = new Set(), links = 0
  for (const page of pages) for (const language of ['de', 'ru']) {
    const path = languagePath(page.path, language)
    const html = await readFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, 'utf8')
    const nodes = documentNodes(html)
    const tag = name => nodes.filter(node => node.tagName === name)
    const meta = key => tag('meta').filter(node => attr(node, key.startsWith('og:') ? 'property' : 'name') === key)
    assert.equal(attr(tag('html')[0], 'lang'), language, path)
    assert.equal(tag('h1').length, 1, `${path}: one H1`)
    assert.ok(textContent(tag('main')[0]).length > 100, `${path}: initial content`)
    assert.equal(tag('title').length, 1, path)
    assert.equal(meta('description').length, 1, path)
    assert.equal(meta('robots').length, 1, path)
    assert.equal(titles.has(textContent(tag('title')[0])), false, path)
    titles.add(textContent(tag('title')[0]))
    const description = attr(meta('description')[0], 'content')
    assert.equal(descriptions.has(description), false, path); descriptions.add(description)
    assert.equal(meta('keywords').length, 0)
    assert.equal(attr(meta('robots')[0], 'content').includes('noindex'), Boolean(preview || page.noindex))
    const expected = metadata(path, preview)
    for (const [key, value] of Object.entries(expected.metas)) assert.equal(attr(meta(key)[0], 'content'), value, `${path}: ${key}`)
    const canonical = tag('link').filter(node => attr(node, 'rel') === 'canonical')
    assert.equal(canonical.length, 1); assert.equal(attr(canonical[0], 'href'), origin + path)
    const alternates = tag('link').filter(node => attr(node, 'hreflang'))
    assert.equal(alternates.length, page.noindex ? 0 : 3)
    for (const alternate of alternates) assert.equal(attr(alternate, 'href'), origin + languagePath(page.path, attr(alternate, 'hreflang') === 'ru' ? 'ru' : 'de'))
    const jsonld = tag('script').filter(node => attr(node, 'type') === 'application/ld+json')
    assert.equal(jsonld.length, 1)
    const schema = JSON.parse(textContent(jsonld[0]))
    assert.deepEqual(schema, expected.schema)
    assert.ok(!JSON.stringify(schema).includes('Qadriddin'))
    assert.ok(!JSON.stringify(schema).includes('AggregateRating'))
    const ids = schema['@graph'].map(entity => entity['@id']); assert.equal(new Set(ids).size, ids.length)
    const organization = schema['@graph'].find(entity => entity['@type'] === 'Organization')
    assert.equal(organization.email, 'info@fotopandastudio.de')
    assert.equal(organization.telephone, '+4917684506657')
    assert.equal(organization.url, origin + '/')
    for (const entity of schema['@graph']) {
      assert.ok(entity['@id'].startsWith(origin), 'Production entity ID')
      if (entity['@type'] === 'BreadcrumbList') {
        assert.deepEqual(entity.itemListElement.map(item => item.position), [1, 2])
        assert.ok(entity.itemListElement.every(item => item.name && item.item.startsWith(origin)))
      } else assert.ok(entity.name && entity.url, 'Entity name and URL')
      if (entity['@type'] === 'Service') assert.ok(ids.includes(entity.provider['@id']))
      if (entity.inLanguage && typeof entity.inLanguage === 'string') assert.equal(entity.inLanguage, language)
    }
    for (const node of tag('img')) {
      assert.notEqual(attr(node, 'alt'), undefined, path)
      assert.ok(Number(attr(node, 'width')) > 0 && Number(attr(node, 'height')) > 0, `${path}: image dimensions`)
    }
    for (const node of tag('video')) { assert.equal(attr(node, 'preload'), 'none'); assert.equal(attr(node, 'autoplay'), undefined) }
    for (const node of nodes) for (const key of ['src', 'href', 'poster']) {
      const value = attr(node, key)
      if (value?.startsWith('/assets/')) assets.add(value)
    }
    for (const node of tag('a')) {
      const href = attr(node, 'href')
      if (!href?.startsWith('/') || href.startsWith('/assets/')) continue
      const url = new URL(href, origin)
      assert.ok(paths.includes(url.pathname), `${path}: broken link ${href}`)
      assert.equal(url.searchParams.has('lang'), false)
      if (!attr(node, 'lang')) assert.equal(url.pathname.startsWith('/ru'), language === 'ru', `${path}: cross-language link ${href}`)
      links++
    }
  }
  for (const asset of assets) await access(`dist${asset}`)
  const image = await sharp('dist/assets/photos/bridal-palace-1320.jpg').metadata()
  assert.equal(image.width, 1320); assert.equal(image.height, 1622)
  for (const path of paths) {
    const isRu = path === '/ru' || path.startsWith('/ru/')
    for (const lang of ['de', 'ru']) {
      const start = new URL(`https://fotopandastudio.de${path === '/' ? '/index.html' : path + '/'}?utm_source=test&lang=${lang}&topic=hochzeit`)
      const target = canonicalRedirect(start)
      assert.equal(target.origin, origin)
      assert.equal(target.pathname, languagePath(path, lang))
      assert.equal(target.searchParams.get('utm_source'), 'test')
      assert.equal(target.searchParams.get('topic'), 'hochzeit')
      assert.equal(target.searchParams.has('lang'), false)
      assert.equal(canonicalRedirect(target), null)
    }
    assert.equal(canonicalRedirect(new URL(origin + path)), null)
    assert.equal(canonicalRedirect(new URL(origin + path + '?utm_source=test')), null)
    assert.equal(metadata(path, true).metas.robots, 'noindex, follow')
    assert.equal(isRu, metadata(path).language === 'ru')
  }
  assert.equal(canonicalRedirect(new URL(origin + '/missing?lang=ru')), null)
  assert.equal(middleware(new Request(origin + '/fotografie?lang=ru&x=1')).status, 308)
  for (const path of ['/missing', '/ru/missing', '/404', '/ru/404']) {
    const response = middleware(new Request(origin + path))
    assert.equal(response.status, 404)
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow')
  }
  assert.equal(middleware(new Request('https://preview.vercel.app/ru')).headers.get('x-robots-tag'), 'noindex, follow')
  const robots = await readFile('dist/robots.txt', 'utf8')
  assert.ok(!robots.includes('Disallow:'))
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`))
  console.log(`PASS: 20 localized HTML pages, 16 sitemap URLs, metadata/schema, ${links} localized links, ${assets.size} assets, media dimensions/loading, redirect matrix, 404 and preview policies.`)
} finally { await vite.close() }

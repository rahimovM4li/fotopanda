import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { photos, livingMedia } = await server.ssrLoadModule('/src/data/media.ts')
  const { portfolio, processSteps, inquiryTopics, faq } = await server.ssrLoadModule('/src/data/content.ts')
  let checked = 0
  for (const photo of Object.values(photos)) {
    for (const width of photo.widths) for (const ext of ['jpg','webp','avif']) {
      await access(`public${photo.base}-${width}.${ext}`)
      checked++
    }
    assert.ok(photo.alt.length > 12)
  }
  assert.deepEqual(Object.keys(livingMedia).sort(), ['gastronomy-kitchen','wedding'])
  for (const item of Object.values(livingMedia)) {
    for (const ext of ['jpg','webp','avif']) await access(`public${item.posterBase}.${ext}`)
    await access(`public${item.video}`)
  }
  for (const item of portfolio) assert.ok((item.kind === 'photo' ? photos : livingMedia)[item.ref], `Missing ${item.ref}`)
  assert.deepEqual(processSteps.map(s=>s.title), ['Besprechen','Fotografieren & Filmen','Bearbeiten & Gestalten','Lebendig machen'])
  assert.equal(faq.length, 7)
  assert.deepEqual(inquiryTopics.map(t=>t.label), ['Hochzeit & Feier','Schule & Kindergarten','Tanz & Abschlussball','Paar & Familie','Business & Unternehmen','Lebendiges Menü','Visitenkarte & Flyer','Foto & Video','Veranstaltungen','Sonstiges'])
  const sources = []
  async function walk(dir) {
    for (const entry of await readdir(dir, {withFileTypes:true})) {
      const file = `${dir}/${entry.name}`
      if(entry.isDirectory()) await walk(file)
      else if (/\.tsx?$/.test(file)) sources.push([file, await readFile(file, 'utf8')])
    }
  }
  await walk('src')
  for (const [file, source] of sources) {
    for (const match of source.matchAll(/kind:\s*'(photo|living)'\s*,\s*ref:\s*'([^']+)'/g)) {
      assert.ok((match[1] === 'photo' ? photos : livingMedia)[match[2]], `${file}: invalid media ${match[2]}`)
    }
    assert.ok(!/\b(real-estate|gastronomy-plating|gastronomy-serving|business-shoot|living-album)\b/.test(source), `${file}: obsolete media`)
  }
  console.log(`PASS: ${checked} photo variants, two films, all source media references, 4 process steps, 7 FAQs and 10 form topics.`)
} finally { await server.close() }

import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

// Vercel executes emitted ESM in Node, without Vite's extension resolution.
const root = fileURLToPath(new URL('../', import.meta.url))
const outputRoot = join(root, 'dist-ssr')
mkdirSync(outputRoot, { recursive: true })
const output = mkdtempSync(join(outputRoot, 'middleware-runtime-'))
const previousEnvironment = process.env.VERCEL_ENV
try {
  const program = ts.createProgram([join(root, 'middleware.ts')], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    verbatimModuleSyntax: true,
    skipLibCheck: true,
    rootDir: root,
    outDir: output,
  })
  const result = program.emit(undefined, (file, content) => {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, content)
  })
  assert.equal(result.emitSkipped, false)
  writeFileSync(join(output, 'package.json'), '{"type":"module"}')
  process.env.VERCEL_ENV = 'production'
  const { default: middleware, config } = await import(pathToFileURL(join(output, 'middleware.js')).href)
  const origin = 'https://www.fotopandastudio.de'
  for (const path of ['/', '/ru', '/fotografie', '/ru/fotografie', '/robots.txt', '/sitemap.xml']) {
    const response = middleware(new Request(origin + path))
    assert.equal(response.status, 200, path)
    assert.equal(response.headers.get('x-middleware-next'), '1', path)
    assert.equal(response.headers.has('x-robots-tag'), false, path)
  }
  const redirect = middleware(new Request(origin + '/fotografie?lang=ru&utm_source=test'))
  assert.equal(redirect.status, 308)
  assert.equal(redirect.headers.get('location'), origin + '/ru/fotografie?utm_source=test')
  for (const path of ['/missing', '/ru/missing']) {
    const response = middleware(new Request(origin + path))
    assert.equal(response.status, 404)
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow')
  }
  assert.equal(middleware(new Request('https://preview.vercel.app/ru')).headers.get('x-robots-tag'), 'noindex, follow')
  const matchers = [config.matcher].flat().map(pattern => new RegExp(`^${pattern}$`))
  for (const path of ['/robots.txt', '/sitemap.xml', '/site.webmanifest', '/assets/brand/mark.svg', '/_vercel/test']) {
    assert.equal(matchers.some(matcher => matcher.test(path)), false, `${path}: serve without middleware`)
  }
  for (const path of ['/', '/ru/fotografie', '/missing', '/ru/missing', '/robots.txt/nested']) {
    assert.equal(matchers.some(matcher => matcher.test(path)), true, `${path}: keep page routing`)
  }
  console.log('PASS: emitted middleware loads in Node ESM; pages, redirects, 404, preview headers and static crawler-file exclusions.')
} finally {
  if (previousEnvironment === undefined) delete process.env.VERCEL_ENV
  else process.env.VERCEL_ENV = previousEnvironment
  assert.ok(resolve(output).startsWith(resolve(outputRoot) + sep), 'Temporary output must stay within dist-ssr')
  rmSync(output, { recursive: true, force: true })
}

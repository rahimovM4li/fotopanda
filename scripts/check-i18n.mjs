import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import ts from 'typescript'
const dictionary = JSON.parse(await readFile('src/i18n/ru.json', 'utf8'))
const missing = new Set()
const check = value => {
  const key = value.replace(/\s+/g, ' ').trim()
  if (/[A-Za-zÄÖÜäöüß]/.test(key) && !dictionary[key]) missing.add(key)
}
for (const file of await readdir('src', { recursive: true })) {
  if (!/\.(tsx|ts)$/.test(file)) continue
  const ast = ts.createSourceFile(file, await readFile(`src/${file}`, 'utf8'), ts.ScriptTarget.Latest, true)
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(ast) === 't' && ts.isStringLiteral(node.arguments[0])) check(node.arguments[0].text)
    if (['data/content.ts', 'data/pages.ts', 'data/media.ts'].includes(file) && ts.isPropertyAssignment(node) && ['title','label','body','description','lead','alt','eyebrow','headlineAccent','tagline','quote','mechanism','caption','lineOne','lineTwo','detail'].includes(node.name.getText(ast)) && ts.isStringLiteral(node.initializer)) check(node.initializer.text)
    ts.forEachChild(node, visit)
  }
  visit(ast)
}
assert.deepEqual([...missing], [], 'Russian translations missing')
for (const [key, value] of Object.entries(dictionary)) {
  assert.ok(value.trim(), `Empty translation: ${key}`)
  assert.deepEqual([...key.matchAll(/\{\w+\}/g)].map(m=>m[0]).sort(), [...value.matchAll(/\{\w+\}/g)].map(m=>m[0]).sort(), `Interpolation mismatch: ${key}`)
}
console.log(`PASS: ${Object.keys(dictionary).length} translations, UI/data coverage and interpolation placeholders.`)

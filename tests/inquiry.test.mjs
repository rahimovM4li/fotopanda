import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

// Execute the production transport with an isolated configuration and mocked network.
const source = readFileSync(new URL('../src/lib/submitInquiry.ts', import.meta.url), 'utf8')
async function load(key) {
  const configured = source.replace("import { siteConfig } from '@/config/siteConfig'", `const siteConfig = ${JSON.stringify({ inquiryAccessKey: key, inquiryEndpoint: 'https://api.web3forms.com/submit' })}`)
  const { outputText } = ts.transpileModule(configured, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}
const inquiry = { name: ' Анна ', contact: ' anna@example.com ', topic: 'Фотография', message: ' Моя идея ', consent: true }
const originalFetch = globalThis.fetch
let requests = []
let response = new Response(JSON.stringify({ success: true }))
globalThis.fetch = async (url, options) => { requests.push({ url, options, body: JSON.parse(options.body) }); return response }
try {
  const inactive = await load('')
  assert.equal((await inactive.submitInquiry(inquiry)).status, 'no-transport')
  assert.equal(requests.length, 0)
  const active = await load('test-key-not-real')
  assert.equal((await active.submitInquiry(inquiry, 'ru')).status, 'sent')
  assert.equal(requests[0].body.email, 'anna@example.com')
  assert.equal(requests[0].body.name, 'Анна')
  assert.equal(requests[0].body.language, 'ru')
  assert.equal(requests[0].body.botcheck, false)
  assert.equal(requests[0].options.credentials, 'omit')
  response = new Response(JSON.stringify({ success: true }))
  assert.equal((await active.submitInquiry({ ...inquiry, contact: '+49 12345678' })).status, 'sent')
  assert.equal(requests[1].body.phone, '+49 12345678')
  assert.equal('email' in requests[1].body, false)
  const count = requests.length
  assert.equal((await active.submitInquiry({ ...inquiry, botcheck: true })).status, 'failed')
  assert.equal((await active.submitInquiry({ ...inquiry, consent: false })).status, 'failed')
  assert.equal(requests.length, count)
  for (const [body, status] of [[{ success: false }, 200], [{ success: 'true' }, 200], [null, 200], [{ success: true }, 400], [{}, 500]]) {
    response = new Response(JSON.stringify(body), { status })
    assert.equal((await active.submitInquiry(inquiry)).status, 'failed')
  }
  response = new Response('{}', { status: 429 })
  assert.match((await active.submitInquiry(inquiry)).reason, /Zu viele/)
  response = new Response('<html>Bad gateway</html>')
  assert.equal((await active.submitInquiry(inquiry)).status, 'failed')
  globalThis.fetch = async () => { throw new DOMException('Timeout', 'TimeoutError') }
  assert.equal((await active.submitInquiry(inquiry)).status, 'failed')
  console.log('PASS: inactive configuration, email/phone payloads, Cyrillic, consent, honeypot, strict success, HTTP errors, rate limit, malformed JSON and timeout. No live messages sent.')
} finally { globalThis.fetch = originalFetch }

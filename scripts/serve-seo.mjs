// Local static server exercising the real middleware. Vercel CDN behavior still needs deployment verification.
import { createServer as createHttpServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname } from 'node:path'
import { createServer } from 'vite'
const vite = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
const { default: middleware } = await vite.ssrLoadModule('/middleware.ts')
const root = resolve('dist')
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.jpg': 'image/jpeg', '.png': 'image/png', '.avif': 'image/avif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.woff2': 'font/woff2' }
const server = createHttpServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const response = middleware(new Request(url))
    const headers = Object.fromEntries([...response.headers].filter(([key]) => !key.startsWith('x-middleware')))
    if (response.status === 308) { res.writeHead(308, headers); res.end(); return }
    const rewrite = response.headers.get('x-middleware-rewrite')
    const path = rewrite ? new URL(rewrite).pathname : url.pathname
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : extname(path) ? path : path + '.html'))
    if (!file.startsWith(root + '/')) { res.writeHead(404); res.end(); return }
    let body, status = response.status
    try { body = await readFile(file) } catch { body = await readFile(root + '/404.html'); status = 404 }
    const type = status === 404 ? types['.html'] : types[extname(file)] ?? 'application/octet-stream'
    res.writeHead(status, { ...headers, 'Content-Type': type }); res.end(req.method === 'HEAD' ? undefined : body)
  } catch (error) { console.error(error); res.writeHead(500); res.end() }
})
server.listen(4186, '127.0.0.1', () => console.log('SEO static preview: http://127.0.0.1:4186'))
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { server.close(); await vite.close(); process.exit(0) })

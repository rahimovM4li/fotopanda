import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

export default defineConfig(({ command }) => ({
  // Customer originals remain local and never enter the production output.
  publicDir: command === 'build' ? false : 'public',
  plugins: [react(), tailwindcss(), {
    name: 'curated-public-assets',
    apply: 'build',
    async generateBundle() {
      const publicRoot = fileURLToPath(new URL('./public', import.meta.url))
      const discarded = /^(?:(real-estate|business-shoot|gastronomy-plating|gastronomy-serving|living-album)\.|school-album-(960|1320)\.)/
      const walk = async (directory: string) => {
        for (const entry of await readdir(path.join(publicRoot, directory), { withFileTypes: true })) {
          if (entry.name.startsWith('.')) continue
          const relative = `${directory}/${entry.name}`
          if (entry.isDirectory()) await walk(relative)
          else if (!discarded.test(entry.name)) {
            this.emitFile({ type: 'asset', fileName: relative, source: await readFile(path.join(publicRoot, relative)) })
          }
        }
      }
      await walk('assets')
      for (const fileName of ['robots.txt', 'sitemap.xml', 'site.webmanifest']) {
        this.emitFile({ type: 'asset', fileName, source: await readFile(path.join(publicRoot, fileName)) })
      }
    },
  }],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // Poster und Videos liegen in public/ und werden unverändert kopiert.
    assetsInlineLimit: 2048,
  },
}))

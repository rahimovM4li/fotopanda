import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Reproducible crops of the supplied artwork, without redrawing the logo. */
export async function prepareBrand() {
  const source = path.join(root, 'public/new assets/logo-new.jpg')
  const out = path.join(root, 'public/assets/brand')
  await mkdir(out, { recursive: true })
  const mark = await sharp(source)
    .extract({ left: 296, top: 120, width: 664, height: 680 })
    .resize(680, 680, { fit: 'contain', background: '#000000' })
    .png().toBuffer()
  await sharp(mark).resize(160, 160).png().toFile(path.join(out, 'panda-camera.png'))

  // Remove the black matte while retaining source lettering and antialiasing.
  const { data, info } = await sharp(source)
    .extract({ left: 89, top: 805, width: 1070, height: 140 })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) {
    const alpha = Math.max(data[i], data[i + 1], data[i + 2])
    data[i + 3] = alpha < 12 ? 0 : alpha
    if (alpha >= 12) for (let c = 0; c < 3; c++) data[i + c] = Math.round(data[i + c] * 255 / alpha)
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize({ width: 640 }).png().toFile(path.join(out, 'wordmark.png'))
  for (const size of [32, 48, 180, 512]) {
    await sharp(mark).resize(size, size).png().toFile(path.join(out, `favicon-${size}.png`))
  }
  // Stable favicon URL embeds exact customer artwork, not a guessed vector.
  const embedded = (await sharp(mark).resize(96, 96).png().toBuffer()).toString('base64')
  await writeFile(path.join(out, 'mark.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 680"><image width="680" height="680" href="data:image/png;base64,${embedded}"/></svg>`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await prepareBrand()
  console.log('Neue Foto-Panda-Bildmarke, Schriftzug und Favicons erstellt.')
}

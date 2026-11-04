/** November gastronomy additions. Originals remain untouched. */
import sharp from 'sharp'
import bundledFfmpeg from 'ffmpeg-static'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
const input = 'public/new assets'
const output = 'public/assets'
for (const dir of ['photos', 'posters', 'videos']) await mkdir(`${output}/${dir}`, { recursive: true })
const previews = JSON.parse(await readFile('src/data/previews.json', 'utf8'))
async function formats(source, base, width) {
  for (const [ext, options] of [['avif', { quality: 60 }], ['webp', { quality: 85 }], ['jpg', { quality: 88 }]]) {
    await sharp(source).rotate().resize({ width, withoutEnlargement: true }).toFormat(ext, options).toFile(`${base}.${ext}`)
  }
}
for (const [id, file, widths] of [
  ['menu-dessert', 'photo_2026-11-04 20.37.23.jpeg', [480, 915]],
  ['menu-korean', 'photo_2026-11-04 20.37.25.jpeg', [384, 595]],
  ['menu-special', 'photo_2026-11-04 20.37.27.jpeg', [480, 853]],
  ['menu-signature', 'photo_2026-11-04 20.37.29.jpeg', [384, 649]],
]) {
  for (const width of widths) await formats(`${input}/${file}`, `${output}/photos/${id}-${width}`, width)
  previews[id] = `data:image/webp;base64,${(await sharp(`${input}/${file}`).resize(20).webp({ quality: 32 }).toBuffer()).toString('base64')}`
}
const ffmpeg = process.env.FFMPEG_PATH || bundledFfmpeg
function run(args) {
  const r = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { encoding: 'utf8' })
  if (r.status !== 0) throw Error(r.stderr || r.error)
}
for (const [id, file] of [['gastro-grill','IMG_3603.MP4'],['gastro-finish','IMG_3604.MP4'],['gastro-table','IMG_3605.MOV']]) {
  run(['-i', `${input}/${file}`, '-map', '0:v:0', '-map', '0:a?', '-vf', 'scale=720:1280,fps=30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', `${output}/videos/${id}.mp4`])
  const temp = `/tmp/${id}-poster.png`
  run(['-ss', '3', '-i', `${input}/${file}`, '-frames:v', '1', temp])
  if (id === 'gastro-table') await formats(temp, `${output}/posters/gastro-table-scene`, 720)
  const poster = id === 'gastro-table' ? `${input}/photo_2026-11-04 20.37.18.jpeg` : temp
  await formats(poster, `${output}/posters/${id}`, id === 'gastro-table' ? 1280 : 720)
  previews[id] = `data:image/webp;base64,${(await sharp(poster).resize(20).webp({quality:32}).toBuffer()).toString('base64')}`
}
await writeFile('src/data/previews.json', JSON.stringify(previews))
console.log('Prepared four menu pages, three H.264 films and their posters (shashlik cover for gastro-table).')

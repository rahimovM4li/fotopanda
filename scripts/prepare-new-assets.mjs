/** Curated customer assets. Original files are never modified. */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import sharp from 'sharp'
import ffmpeg from 'ffmpeg-static'

const source = path.resolve('public/new assets')
const target = path.resolve('public/assets')
const previewPath = path.resolve('src/data/previews.json')
const previews = JSON.parse(await readFile(previewPath, 'utf8'))
// Optional IDs allow new additions to be prepared without re-encoding existing media.
const requested = new Set(process.argv.slice(2))
const includes = (id) => requested.size === 0 || requested.has(id)
const files = {
  'restaurant-menu': ['menu.jpg', [480, 853]],
  'bridal-editorial': ['IMG_2181.JPG', [640, 960, 1080]],
  'bridal-full-length': ['IMG_2184.JPG', [640, 960, 1080]],
  'bridal-closeup': ['IMG_2179.JPG', [640, 960, 1080]],
  'bridal-palace': ['IMG_2584.PNG', [640, 960, 1320]],
  'bridal-palace-portrait': ['IMG_2588.PNG', [640, 960, 1320]],
  'digital-card': ['⚜STILER ⚜, [7 Sep 2026 um 14_29]_Да визтенкарта бояд и бия_.png', [384, 589]],
}
for (const dir of ['photos', 'videos', 'posters']) await mkdir(path.join(target, dir), { recursive: true })

async function preview(id, input) {
  const small = await sharp(input).resize({width:20}).webp({quality:32}).toBuffer()
  previews[id] = `data:image/webp;base64,${small.toString('base64')}`
}
async function photo(id, input, widths) {
  for (const width of widths) {
    await sharp(input).rotate().resize({width, withoutEnlargement:true}).avif({quality:60, effort:4}).toFile(path.join(target, 'photos', `${id}-${width}.avif`))
    await sharp(input).rotate().resize({width, withoutEnlargement:true}).webp({quality:85, effort:5}).toFile(path.join(target, 'photos', `${id}-${width}.webp`))
    await sharp(input).rotate().resize({width, withoutEnlargement:true}).jpeg({quality:88, mozjpeg:true}).toFile(path.join(target, 'photos', `${id}-${width}.jpg`))
  }
  await preview(id, input)
}
for (const [id, [filename, widths]] of Object.entries(files)) {
  if (includes(id)) await photo(id, path.join(source, filename), widths)
}

function run(args) {
  const result = spawnSync(process.env.FFMPEG_PATH || ffmpeg, ['-hide_banner','-loglevel','error','-y',...args], {encoding:'utf8'})
  if (result.status !== 0) throw Error(result.stderr)
}
for (const video of [
  {id:'birthday', file:'birthdayGirl.MP4', frame:3, width:720, crf:26},
  {id:'wedding', file:'IMG_2582.MP4', frame:7.6, width:720},
  {id:'gastronomy-kitchen', file:'IMG_2533.MP4', frame:21, width:720},
]) {
  if (!includes(video.id)) continue
  const input = path.join(source, video.file)
  run(['-i',input,'-map','0:v:0','-map','0:a?','-vf',`scale=${video.width}:-2,fps=30`,'-c:v','libx264','-preset','slow','-crf',String(video.crf ?? 23),'-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',path.join(target,'videos',`${video.id}.mp4`)])
  const poster = path.join(target,'posters',`${video.id}.jpg`)
  run(['-ss',String(video.frame),'-i',input,'-frames:v','1','-q:v','2',poster])
  await sharp(poster).webp({quality:86}).toFile(path.join(target,'posters',`${video.id}.webp`))
  await sharp(poster).avif({quality:60, effort:4}).toFile(path.join(target,'posters',`${video.id}.avif`))
  await preview(video.id, poster)
}
// Only this crop is free of the Cyrillic placeholders printed on other album pages.
// It is a product photograph, not an AR demonstration or a synthesized film.
if (includes('school-album')) {
  const albumFrame = path.join(target, 'posters', 'living-album.jpg')
  run(['-ss','18','-i',path.join(source,'IMG_2580.MP4'),'-frames:v','1','-vf','crop=840:600:300:55','-q:v','2',albumFrame])
  await sharp(albumFrame).webp({quality:86}).toFile(path.join(target,'posters','living-album.webp'))
  await sharp(albumFrame).avif({quality:60, effort:4}).toFile(path.join(target,'posters','living-album.avif'))
  await photo('school-album', albumFrame, [640,840])
}
for (const id of ['living-album', 'real-estate', 'business-shoot', 'gastronomy-plating', 'gastronomy-serving']) delete previews[id]
await writeFile(previewPath, JSON.stringify(previews))
console.log(`Prepared customer assets: ${requested.size ? [...requested].join(', ') : 'all photos and films'}.`)

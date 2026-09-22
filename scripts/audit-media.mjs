import { readdir, mkdir, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import sharp from 'sharp'
import ffmpeg from 'ffmpeg-static'
import ffprobe from 'ffprobe-static'

const out = path.resolve('.media-audit')
await mkdir(out, { recursive: true })
const newImages = (await readdir('public/new assets')).filter(n => /\.(jpe?g|png)$/i.test(n)).map(n => `public/new assets/${n}`)
const existingImages = (await readdir('public/assets/photos')).filter(n => n.endsWith('-1320.webp') || n.endsWith('-576.webp')).map(n => `public/assets/photos/${n}`)
async function sheet(files, name, columns = 4, w = 280, h = 340) {
  const cells = await Promise.all(files.map(async (file, i) => {
    const label = path.basename(file).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    const pic = await sharp(file).rotate().resize(w, h - 34, { fit: 'contain', background: '#eeeeee' }).flatten({ background: '#eeeeee' }).png().toBuffer()
    const svg = Buffer.from(`<svg width="${w}" height="34"><rect width="100%" height="100%" fill="white"/><text x="8" y="22" font-family="Arial" font-size="12">${label.slice(0,42)}</text></svg>`)
    const top = Math.floor(i / columns) * h, left = (i % columns) * w
    return [{ input: pic, top, left }, { input: svg, top: top + h - 34, left }]
  }))
  await sharp({ create: { width: columns * w, height: Math.ceil(files.length / columns) * h, channels: 3, background: '#dddddd' } }).composite(cells.flat()).jpeg({ quality: 90 }).toFile(path.join(out, name))
}
await sheet(newImages, 'new-images.jpg')
await sheet(existingImages, 'existing-images.jpg')
const videos = [
  ...(await readdir('public/new assets')).filter(n => /\.mp4$/i.test(n)).map(n => `public/new assets/${n}`),
  ...(await readdir('public/assets/videos')).filter(n => /\.mp4$/i.test(n)).map(n => `public/assets/videos/${n}`),
]
const report = []
for (const video of videos) {
  const probe = JSON.parse(spawnSync(ffprobe.path, ['-v','error','-show_format','-show_streams','-of','json',video], {encoding:'utf8'}).stdout)
  const stream = probe.streams.find(s=>s.codec_type === 'video')
  report.push({ video, width:stream.width, height:stream.height, fps:stream.r_frame_rate, seconds:probe.format.duration, bitrate:probe.format.bit_rate, audio:probe.streams.some(s=>s.codec_type==='audio') })
  const frames = []
  for (const fraction of [0.15, 0.40, 0.7, 0.9]) {
    const frame = path.join(out, `${path.basename(video, path.extname(video))}-${fraction}.jpg`)
    const result = spawnSync(ffmpeg, ['-hide_banner','-loglevel','error','-y','-ss', String(Number(probe.format.duration)*fraction),'-i',video,'-frames:v','1','-vf','scale=800:-2',frame], { encoding:'utf8' })
    if(result.status !== 0) throw Error(result.stderr)
    frames.push(frame)
  }
  await sheet(frames, `${path.basename(video, path.extname(video))}-frames.jpg`, 4, 360, 420)
}
await writeFile(path.join(out, 'report.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))

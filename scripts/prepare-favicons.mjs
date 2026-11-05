import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Encode the existing customer artwork as standalone, crawlable favicon files. */
export async function prepareFavicons() {
  const source = path.join(root, 'public/assets/brand/favicon-512.png')
  await sharp(source).resize(96, 96).png().toFile(path.join(root, 'public/favicon.png'))
  const sizes = [32, 48, 96, 256]
  const frames = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()))
  const directory = Buffer.alloc(6 + frames.length * 16)
  directory.writeUInt16LE(1, 2) // ICO image type.
  directory.writeUInt16LE(frames.length, 4)
  let offset = directory.length
  frames.forEach((frame, index) => {
    const entry = 6 + index * 16
    directory[entry] = sizes[index] === 256 ? 0 : sizes[index]
    directory[entry + 1] = directory[entry]
    directory.writeUInt16LE(1, entry + 4)
    directory.writeUInt16LE(32, entry + 6)
    directory.writeUInt32LE(frame.length, entry + 8)
    directory.writeUInt32LE(offset, entry + 12)
    offset += frame.length
  })
  await writeFile(path.join(root, 'public/favicon.ico'), Buffer.concat([directory, ...frames]))
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await prepareFavicons()
  console.log('Standalone Panda PNG and ICO favicons generated from the existing brand artwork.')
}

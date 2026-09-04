#!/usr/bin/env node
/**
 * Einmalige Aufbereitung des Kundenmaterials fuer die Website.
 *
 *   npm run prepare-assets
 *   npm run prepare-assets -- --source "D:\\Pfad\\zu\\Originalen"
 *
 * Liest die Rohdateien aus einem Quellordner und schreibt nach public/assets/.
 * Das Skript ist NICHT Teil des Builds: die Ergebnisse sind eingecheckt, damit
 * weder CI noch Deploy ffmpeg oder sharp braucht.
 *
 * ORIGINALE NACHREICHEN
 * ---------------------
 * Alle sechs Videos liegen derzeit nur als WhatsApp-Export vor (max. 576 px
 * Breite). Sobald die unkomprimierten Originale da sind:
 *   1. Dateien in den Quellordner legen und in SOURCES unten den Dateinamen
 *      anpassen (nur den Wert von `file`, nicht den Schluessel).
 *   2. `npm run prepare-assets` erneut ausfuehren.
 *   3. Ergebnisse aus public/assets/ einchecken.
 * Am Anwendungscode aendert sich nichts: src/data/media.ts referenziert die
 * stabilen Namen, nicht die Quelldateien.
 */

import { spawnSync } from 'node:child_process'
import { mkdir, rm, readdir, access, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import ffmpegPath from 'ffmpeg-static'
import ffprobeStatic from 'ffprobe-static'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'public', 'assets')

const argSource = process.argv.indexOf('--source')
const SOURCE =
  argSource !== -1 && process.argv[argSource + 1]
    ? path.resolve(process.argv[argSource + 1])
    : 'C:\\Users\\rahimm\\Downloads'

/* Die Bildmarke ist die einzige Grafik, die nicht aus dem Quellordner stammt.
   Sie liegt als Vektor im Repo und wird aus der Komponente PandaMark.tsx
   erzeugt. Aus dem Vektor entstehen alle Favicon-Groessen scharf; die
   fruehere Rastervorlage aus der Kunden-PDF war nur 65 px breit. */
const MARK_SOURCE = path.join(ROOT, 'src', 'assets', 'panda-mark.svg')

const PHOTO_WIDTHS = [640, 960, 1320]

/* Winzige unscharfe Vorschauen. Sie landen als base64 in einer JSON-Datei und
   liegen zur Laufzeit als Hintergrund hinter jedem Medienrahmen. Ohne sie
   zeigt ein noch nicht geladenes Bild eine leere graue Fläche, und genau das
   fällt auf einer Fotografieseite als Erstes auf. 20 Pixel Breite reichen für
   den Farbeindruck und kosten rund 400 Byte je Bild. */
const LQIP_WIDTH = 20
const previews = {}

async function makePreview(input) {
  const buf = await sharp(input, { failOn: 'none' })
    .resize({ width: LQIP_WIDTH })
    .webp({ quality: 32, alphaQuality: 0, smartSubsample: true })
    .toBuffer()
  return `data:image/webp;base64,${buf.toString('base64')}`
}

/* ------------------------------------------------------------------ *
 * Zuordnung des Rohmaterials.
 * Die Schluessel sind die stabilen Namen, die src/data/media.ts kennt.
 * ------------------------------------------------------------------ */

const PHOTOS = {
  'business-portrait-01': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.56.jpeg',
    note: 'Studioportraet vor grauem Grund, verschraenkte Arme',
  },
  'business-portrait-02': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57.jpeg',
    note: 'Studioportraet vor grauem Grund, frontal',
  },
  'business-office-01': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (1).jpeg',
    note: 'Am Schreibtisch mit Laptop und Tasse',
  },
  'business-office-02': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (2).jpeg',
    note: 'Am Fenster mit Tasse',
  },
  'wedding-stairs': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (3).jpeg',
    note: 'Paar auf der Treppe, kurz vor einem Kuss',
  },
  'wedding-closeup': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (4).jpeg',
    note: 'Nahaufnahme mit Brautstrauss',
  },
  'wedding-facade': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (5).jpeg',
    note: 'Paar stehend vor Gebaeude und Baeumen',
  },
  'portrait-court-standing': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (6).jpeg',
    note: 'Weisses Top, Schlaeger auf der Schulter',
  },
  'portrait-fence': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (7).jpeg',
    note: 'Am Zaun, Arm ueber dem Kopf mit Ball',
  },
  'portrait-court-full': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (8).jpeg',
    note: 'Ganzkoerper auf dem Platz',
  },
  'portrait-court-seated': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (9).jpeg',
    note: 'Im Schneidersitz, Ball in der Hand',
  },
  'portrait-court-knees': {
    file: 'WhatsApp Image 2026-08-18 at 14.33.57 (10).jpeg',
    note: 'Angezogene Knie, gruener Pullover',
  },
}

const VIDEOS = {
  wedding: {
    file: 'WhatsApp Video 2026-08-18 at 14.30.53.mp4',
    poster: 7.4, // Zeitmarke im gedrehten Video: Paar frontal, Schleier ausgebreitet
    /* Der gesamte Zusammenschnitt liegt um 90 Grad gedreht im
       Hochformat-Container. transpose=2 stellt ihn durchgaengig aufrecht;
       danach ist es mit 1168x576 das hoechstaufgeloeste Video des Materials. */
    transform: { transpose: 2, startAt: 0 },
    note: 'Hochzeit: Paar, Braut, Feier, Wunderkerzen',
  },
  'gastronomy-plating': {
    file: 'WhatsApp Video 2026-08-18 at 14.32.37.mp4',
    poster: 0.6,
    note: 'Gerichte von oben, Steak, Dessert',
  },
  'gastronomy-serving': {
    file: 'WhatsApp Video 2026-08-18 at 14.32.49.mp4',
    poster: 1.0,
    note: 'Anrichten und Servieren',
  },
  'real-estate': {
    file: 'WhatsApp Video 2026-08-18 at 14.33.11.mp4',
    poster: 6.0, // Zeitmarke im BEREINIGTEN Video
    /* Der Inhalt liegt um 90 Grad gedreht im Hochformat-Container und traegt
       am Anfang einen eingebrannten Hinweis zum Drehen des Geraets. Beides
       wird hier korrigiert: transpose=2 dreht gegen den Uhrzeigersinn, der
       Vorspann faellt weg. */
    transform: { transpose: 2, startAt: 4.5 },
    note: 'Immobilie innen und aussen',
  },
  'business-shoot': {
    file: 'WhatsApp Video 2026-08-18 at 14.33.56.mp4',
    poster: 1.2,
    note: 'Business-Shooting im Studio',
  },
  'living-album': {
    file: 'WhatsApp Video 2026-08-18 at 14.34.12.mp4',
    poster: 2.2,
    note: 'Smartphone ueber einem Fotoalbum, das Video laeuft',
  },
}

/* ------------------------------------------------------------------ *
 * Werkzeuge
 * ------------------------------------------------------------------ */

const FFMPEG = ffmpegPath
const FFPROBE = ffprobeStatic.path

let failures = 0

function run(bin, args, label) {
  const res = spawnSync(bin, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (res.status !== 0) {
    failures += 1
    console.error(`  ! ${label} fehlgeschlagen`)
    console.error((res.stderr || res.error?.message || '').split('\n').slice(-6).join('\n'))
    return false
  }
  return true
}

function probe(file) {
  const res = spawnSync(
    FFPROBE,
    [
      '-v', 'error',
      '-select_streams', 'v:0',
      '-show_entries', 'stream=width,height:format=duration',
      '-of', 'default=nw=1:nk=1',
      file,
    ],
    { encoding: 'utf8' },
  )
  const [w, h, d] = res.stdout.trim().split('\n')
  return { width: Number(w), height: Number(h), duration: Number(d) }
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true })
}

async function exists(p) {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

/* ------------------------------------------------------------------ *
 * Fotos
 * ------------------------------------------------------------------ */

async function buildPhotos() {
  const dir = path.join(OUT, 'photos')
  await ensureDir(dir)
  console.log('\nFotos')

  for (const [name, meta] of Object.entries(PHOTOS)) {
    const src = path.join(SOURCE, meta.file)
    if (!(await exists(src))) {
      failures += 1
      console.error(`  ! fehlt: ${meta.file}`)
      continue
    }
    const input = sharp(src, { failOn: 'none' })
    const { width: srcW } = await input.metadata()

    for (const w of PHOTO_WIDTHS) {
      /* Nie ueber die Quellbreite hochskalieren: das erfindet nur Dateigroesse. */
      if (srcW && w > srcW) continue
      const base = sharp(src, { failOn: 'none' }).resize({ width: w, withoutEnlargement: true })
      await base.clone().avif({ quality: 62, effort: 6 }).toFile(path.join(dir, `${name}-${w}.avif`))
      await base.clone().webp({ quality: 78 }).toFile(path.join(dir, `${name}-${w}.webp`))
      await base
        .clone()
        .jpeg({ quality: 82, mozjpeg: true, progressive: true })
        .toFile(path.join(dir, `${name}-${w}.jpg`))
    }
    previews[name] = await makePreview(src)
    console.log(`  ${name}  (${meta.note})`)
  }
}

/* ------------------------------------------------------------------ *
 * Standbilder aus Videos
 * ------------------------------------------------------------------ */

/**
 * Manche Aufnahmen gibt es nur als Bewegtbild. Der Blick auf das Set beim
 * Business-Dreh ist so ein Fall: ein echtes Bild von der Arbeit, das als
 * Foto nicht vorliegt. Statt fuer die Seite "Ueber uns" eine Person zu
 * erfinden oder ein Stockbild einzusetzen, wird der Moment aus dem eigenen
 * Material geschnitten. Laeuft nach buildVideos, weil die Zeitmarke sich
 * auf das bereinigte, gedrehte Video bezieht.
 */
const STILLS = {
  'behind-the-scenes': {
    from: 'business-shoot',
    at: 10.4,
    /* Eigene Breiten: die Quelle ist ein Videobild und damit schmaler als
       jedes Foto. Die regulaeren Fotobreiten wuerden alle uebersprungen. */
    widths: [384, 576],
    note: 'Set-Ansicht aus dem Business-Dreh',
  },
}

async function buildStills() {
  const dir = path.join(OUT, 'photos')
  const tmp = path.join(OUT, '.tmp')
  await ensureDir(dir)
  await ensureDir(tmp)
  console.log('\nStandbilder')

  for (const [name, meta] of Object.entries(STILLS)) {
    const video = path.join(OUT, 'videos', `${meta.from}.mp4`)
    if (!(await exists(video))) {
      failures += 1
      console.error(`  ! Video fehlt: ${meta.from}.mp4`)
      continue
    }
    const raw = path.join(tmp, `${name}.png`)
    const ok = run(
      FFMPEG,
      ['-y', '-v', 'error', '-ss', String(meta.at), '-i', video, '-frames:v', '1', raw],
      `${name}: Standbild`,
    )
    if (!ok) continue

    const { width: srcW } = await sharp(raw).metadata()
    for (const w of meta.widths) {
      if (srcW && w > srcW) continue
      const base = sharp(raw).resize({ width: w, withoutEnlargement: true })
      await base.clone().avif({ quality: 62, effort: 6 }).toFile(path.join(dir, `${name}-${w}.avif`))
      await base.clone().webp({ quality: 78 }).toFile(path.join(dir, `${name}-${w}.webp`))
      await base
        .clone()
        .jpeg({ quality: 82, mozjpeg: true, progressive: true })
        .toFile(path.join(dir, `${name}-${w}.jpg`))
    }
    previews[name] = await makePreview(raw)
    console.log(`  ${name}  (${meta.note}, ${srcW}px breit)`)
  }
}

/* ------------------------------------------------------------------ *
 * Videos und Poster
 * ------------------------------------------------------------------ */

async function buildVideos() {
  const vDir = path.join(OUT, 'videos')
  const pDir = path.join(OUT, 'posters')
  const tmp = path.join(OUT, '.tmp')
  await ensureDir(vDir)
  await ensureDir(pDir)
  await ensureDir(tmp)
  console.log('\nVideos')

  const manifest = {}

  for (const [name, meta] of Object.entries(VIDEOS)) {
    const src = path.join(SOURCE, meta.file)
    if (!(await exists(src))) {
      failures += 1
      console.error(`  ! fehlt: ${meta.file}`)
      continue
    }

    const outVideo = path.join(vDir, `${name}.mp4`)

    if (meta.transform) {
      /* Nur dieses eine Video braucht eine echte Neukodierung. */
      const { transpose, startAt } = meta.transform
      const ok = run(
        FFMPEG,
        [
          '-y', '-v', 'error',
          '-ss', String(startAt),
          '-i', src,
          '-vf', `transpose=${transpose}`,
          '-c:v', 'libx264', '-preset', 'slow', '-crf', '21',
          '-pix_fmt', 'yuv420p',
          '-c:a', 'aac', '-b:a', '128k',
          '-movflags', '+faststart',
          outVideo,
        ],
        `${name}: drehen und beschneiden`,
      )
      if (!ok) continue
    } else {
      /* Die Quellen sind bereits H.264. Reines Umpacken statt Neukodierung:
         kein weiterer Qualitaetsverlust auf ohnehin knappem Material. */
      const ok = run(
        FFMPEG,
        ['-y', '-v', 'error', '-i', src, '-c', 'copy', '-movflags', '+faststart', outVideo],
        `${name}: umpacken`,
      )
      if (!ok) continue
    }

    const info = probe(outVideo)

    /* Poster als Standbild aus dem eigenen Video: nur so zeigen Poster und
       erstes Videobild dieselbe Szene, und der Uebergang wirkt wie ein Foto,
       das sich zu bewegen beginnt. */
    const rawPoster = path.join(tmp, `${name}.png`)
    const okFrame = run(
      FFMPEG,
      ['-y', '-v', 'error', '-ss', String(meta.poster), '-i', outVideo, '-frames:v', '1', rawPoster],
      `${name}: Posterbild`,
    )
    if (!okFrame) continue

    /* Moderat hochskalieren und leicht nachschaerfen. Bei Einzelbildern ist
       das verlustaermer als bei Bewegtbild, erfindet aber keine Details. */
    const target = Math.min(1600, Math.round(info.width * 1.6))
    const poster = sharp(rawPoster)
      .resize({ width: target, kernel: 'lanczos3' })
      .sharpen({ sigma: 0.7, m1: 0.6, m2: 0.4 })

    await poster.clone().avif({ quality: 66, effort: 6 }).toFile(path.join(pDir, `${name}.avif`))
    await poster.clone().webp({ quality: 82 }).toFile(path.join(pDir, `${name}.webp`))
    await poster
      .clone()
      .jpeg({ quality: 84, mozjpeg: true, progressive: true })
      .toFile(path.join(pDir, `${name}.jpg`))

    previews[name] = await makePreview(rawPoster)

    manifest[name] = {
      width: info.width,
      height: info.height,
      duration: Number(info.duration.toFixed(2)),
      ratio: Number((info.width / info.height).toFixed(3)),
    }
    console.log(
      `  ${name.padEnd(20)} ${info.width}x${info.height}  ${info.duration.toFixed(1)}s  (${meta.note})`,
    )
  }

  await rm(tmp, { recursive: true, force: true })
  return manifest
}

/* ------------------------------------------------------------------ *
 * Favicon
 * ------------------------------------------------------------------ */

async function buildFavicon() {
  console.log('\nFavicon')
  if (!existsSync(MARK_SOURCE)) {
    console.log('  uebersprungen: src/assets/panda-mark.svg fehlt')
    return
  }
  const dir = path.join(OUT, 'brand')
  await ensureDir(dir)

  /* Die Marke bringt ihren eigenen Grund mit -- der orangene Kreis traegt sie
     auf hellen wie dunklen Tableaus. Der Rand ringsum bleibt durchsichtig,
     damit iOS und Android sie in ihre eigene Kachelform setzen koennen. */
  const svg = await readFile(MARK_SOURCE)
  for (const size of [32, 48, 180, 512]) {
    await sharp(svg, { density: Math.max(72, Math.round((size / 100) * 72 * 4)) })
      .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(dir, `favicon-${size}.png`))
  }

  /* Zusaetzlich der Vektor selbst: moderne Browser bevorzugen ihn und
     zeichnen ihn in jeder Kachelgroesse scharf. */
  await writeFile(path.join(dir, 'mark.svg'), svg)
  console.log('  favicon-32 / 48 / 180 / 512 und mark.svg')
}

/* ------------------------------------------------------------------ *
 * Ablauf
 * ------------------------------------------------------------------ */

async function main() {
  console.log(`Quelle : ${SOURCE}`)
  console.log(`Ziel   : ${OUT}`)

  if (!existsSync(SOURCE)) {
    console.error(`\nQuellordner nicht gefunden: ${SOURCE}`)
    console.error('Mit --source "Pfad" einen anderen Ordner angeben.')
    process.exit(1)
  }

  await ensureDir(OUT)
  if (process.argv.includes('--skip-photos')) {
    console.log('\nFotos uebersprungen (--skip-photos)')
  } else {
    await buildPhotos()
  }
  const manifest = await buildVideos()
  await buildStills()
  await buildFavicon()

  const previewFile = path.join(ROOT, 'src', 'data', 'previews.json')
  await writeFile(previewFile, JSON.stringify(previews, null, 0) + '\n', 'utf8')
  console.log(`\n${Object.keys(previews).length} Vorschauen in src/data/previews.json`)

  console.log('\nVideo-Kennwerte fuer src/data/media.ts:')
  console.log(JSON.stringify(manifest, null, 2))

  const files = (await readdir(path.join(OUT, 'photos'))).length
  console.log(`\n${files} Fotodateien in public/assets/photos.`)

  if (failures > 0) {
    console.error(`\n${failures} Schritt(e) fehlgeschlagen.`)
    process.exit(1)
  }
  console.log('\nFertig.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

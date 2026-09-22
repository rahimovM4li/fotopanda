import type { LivingMediaItem, Photo } from '@/types'
import previews from './previews.json'

/**
 * Alle Medien der Seite an genau einer Stelle.
 *
 * Neue Medien werden mit scripts/prepare-new-assets.mjs aufbereitet.
 * Die kuratierte Auswahl enthält nur geprüfte Fotos und zwei neue Filme.
 *
 * `aspect` ist bewusst eine Utility-Klasse und keine Zahl: mehrere Medien
 * brauchen auf schmalen Viewports ein anderes Kastenformat als auf breiten.
 */

const PHOTO_WIDTHS = [640, 960, 1320]

const photosRaw = {
  'bridal-editorial': {
    id: 'bridal-editorial', base: '/assets/photos/bridal-editorial', widths: [640, 960, 1080],
    intrinsic: { width: 1080, height: 1350 },
    alt: 'Braut in einem bestickten Kleid mit feinem Schleier vor hellen Säulen',
    category: 'hochzeit', objectPosition: '50% 32%',
  },
  'bridal-full-length': {
    id: 'bridal-full-length', base: '/assets/photos/bridal-full-length', widths: [640, 960, 1080],
    intrinsic: { width: 1080, height: 1350 },
    alt: 'Braut im langen Spitzenkleid mit ausgebreiteter Schleppe in einem hellen Raum',
    category: 'hochzeit', objectPosition: '50% 48%',
  },
  'bridal-closeup': {
    id: 'bridal-closeup', base: '/assets/photos/bridal-closeup', widths: [640, 960, 1080],
    intrinsic: { width: 1080, height: 1350 },
    alt: 'Nahes Brautporträt mit besticktem Schleier und einer Hand am Haar',
    category: 'hochzeit', objectPosition: '50% 28%',
  },
  'bridal-palace': {
    id: 'bridal-palace', base: '/assets/photos/bridal-palace', widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1622 },
    alt: 'Braut mit Diadem und langem weißen Kleid an einer goldgerahmten Tür',
    category: 'hochzeit', objectPosition: '50% 45%',
  },
  'bridal-palace-portrait': {
    id: 'bridal-palace-portrait', base: '/assets/photos/bridal-palace-portrait', widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1616 },
    alt: 'Braut mit Diadem und weißem Schleier vor einem dunklen Hintergrund',
    category: 'hochzeit', objectPosition: '50% 30%',
  },
  'digital-card': {
    id: 'digital-card', base: '/assets/photos/digital-card', widths: [384, 589],
    intrinsic: { width: 589, height: 1280 },
    alt: 'Smartphone über einer Foto-Panda-Visitenkarte mit QR-Code und digitalen Kontaktmöglichkeiten',
    category: 'lebendige-medien', objectPosition: '50% 50%',
  },
  'school-album': {
    id: 'school-album', base: '/assets/photos/school-album', widths: [640, 840],
    intrinsic: { width: 840, height: 600 },
    alt: 'Gestaltete Fotobuchseite mit drei Kinderporträts und dem Namen Lion',
    category: 'lebendige-medien', objectPosition: '50% 50%',
  },
  'wedding-stairs': {
    id: 'wedding-stairs',
    base: '/assets/photos/wedding-stairs',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1631 },
    alt: 'Braut und Bräutigam auf einer Freitreppe, dicht beieinander, kurz vor einem Kuss',
    category: 'hochzeit',
    objectPosition: '50% 35%',
  },
  'wedding-closeup': {
    id: 'wedding-closeup',
    base: '/assets/photos/wedding-closeup',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1621 },
    alt: 'Umarmung des Brautpaars aus naher Distanz, der Brautstrauß liegt auf der Schulter',
    category: 'hochzeit',
    objectPosition: '50% 40%',
  },
  'wedding-facade': {
    id: 'wedding-facade',
    base: '/assets/photos/wedding-facade',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1635 },
    alt: 'Brautpaar Stirn an Stirn vor einer Glasfassade, im Hintergrund hohe Koniferen',
    category: 'hochzeit',
    objectPosition: '50% 45%',
  },

  'portrait-court-knees': {
    id: 'portrait-court-knees',
    base: '/assets/photos/portrait-court-knees',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1642 },
    alt: 'Junge Frau im grünen Sweatshirt sitzt mit angezogenen Knien am Zaun eines Sportplatzes',
    category: 'portrait',
    objectPosition: '55% 40%',
  },
  'portrait-court-seated': {
    id: 'portrait-court-seated',
    base: '/assets/photos/portrait-court-seated',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1641 },
    alt: 'Junge Frau im Schneidersitz auf dem Spielfeld, einen Tennisball in der Hand',
    category: 'portrait',
    objectPosition: '50% 30%',
  },
  'portrait-fence': {
    id: 'portrait-fence',
    base: '/assets/photos/portrait-fence',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1621 },
    alt: 'Junge Frau lehnt am Maschendrahtzaun, ein Arm über dem Kopf, Ball in der Hand',
    category: 'portrait',
    objectPosition: '50% 30%',
  },
  'portrait-court-full': {
    id: 'portrait-court-full',
    base: '/assets/photos/portrait-court-full',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1631 },
    alt: 'Junge Frau steht auf der Mittellinie des Platzes, den Schläger über der Schulter',
    category: 'portrait',
    objectPosition: '50% 40%',
  },
  'portrait-court-standing': {
    id: 'portrait-court-standing',
    base: '/assets/photos/portrait-court-standing',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1625 },
    alt: 'Porträt einer jungen Frau im weißen Top, den Schläger locker auf der Schulter',
    category: 'portrait',
    objectPosition: '50% 25%',
  },

  'business-portrait-01': {
    id: 'business-portrait-01',
    base: '/assets/photos/business-portrait-01',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1633 },
    alt: 'Mann im dunkelblauen Sakko mit verschränkten Armen vor grauem Studiohintergrund',
    category: 'business',
    objectPosition: '50% 25%',
  },
  'business-portrait-02': {
    id: 'business-portrait-02',
    base: '/assets/photos/business-portrait-02',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1633 },
    alt: 'Freundliches Studioporträt eines Mannes im dunkelblauen Sakko vor grauem Hintergrund',
    category: 'business',
    objectPosition: '50% 22%',
  },
  'business-office-01': {
    id: 'business-office-01',
    base: '/assets/photos/business-office-01',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1614 },
    alt: 'Mann im Anzug sitzt lachend am Schreibtisch, Kaffeetasse in beiden Händen, Laptop davor',
    category: 'business',
    objectPosition: '50% 35%',
  },
  'business-office-02': {
    id: 'business-office-02',
    base: '/assets/photos/business-office-02',
    widths: PHOTO_WIDTHS,
    intrinsic: { width: 1320, height: 1611 },
    alt: 'Mann im Anzug am Bürofenster mit Kaffeetasse, sein Spiegelbild in der Scheibe',
    category: 'business',
    objectPosition: '50% 30%',
  },

  /* Kein Fotoshooting, sondern ein Standbild aus dem eigenen Business-Dreh:
     der einzige Blick auf das Set, den es im Material gibt. Deshalb nur zwei
     Breiten -- mehr gibt die Videoquelle nicht her. */
  'behind-the-scenes': {
    id: 'behind-the-scenes',
    base: '/assets/photos/behind-the-scenes',
    widths: [384, 576],
    intrinsic: { width: 576, height: 976 },
    alt: 'Blick auf das Set eines Business-Shootings: Softboxen links und rechts, davor der Kunde im Anzug',
    category: 'business',
    objectPosition: '50% 50%',
  },
} as const satisfies Record<string, Photo>

export type PhotoId = keyof typeof photosRaw

const livingMediaRaw = {
  wedding: {
    id: 'wedding',
    posterBase: '/assets/posters/wedding',
    video: '/assets/videos/wedding.mp4',
    aspect: 'aspect-[4/5]',
    intrinsic: { width: 720, height: 1280 },
    title: 'Brautporträt in Bewegung',
    alt: 'Braut mit Diadem hält die Hände vor ihrem weißen Kleid in einem festlichen Saal',
    category: 'hochzeit',
    objectPosition: '50% 45%',
    hasAudio: true,
  },

  'gastronomy-kitchen': {
    id: 'gastronomy-kitchen',
    posterBase: '/assets/posters/gastronomy-kitchen',
    video: '/assets/videos/gastronomy-kitchen.mp4',
    aspect: 'aspect-[4/5]',
    intrinsic: { width: 720, height: 1280 },
    title: 'Von der Küche auf den Tisch',
    alt: 'Rote Sauce wird mit einer Kelle auf frischem Teig in einer Restaurantküche verteilt',
    category: 'gastronomie',
    objectPosition: '50% 50%',
    hasAudio: true,
  },
} as const satisfies Record<string, LivingMediaItem>

export type LivingMediaId = keyof typeof livingMediaRaw

/* ------------------------------------------------------------------ *
 * Unschaerfe-Vorschauen anhaengen.
 *
 * `previews.json` ergänzt scripts/prepare-new-assets.mjs: je Medium ein 20 Pixel
 * breites WebP als data-URI. Es liegt zur Laufzeit als
 * Hintergrund hinter dem Bild. Ohne das zeigt ein noch nicht geladenes Foto
 * eine leere Flaeche, und genau die faellt auf einer Fotografieseite als
 * Erstes auf.
 * ------------------------------------------------------------------ */

const lqip = previews as Record<string, string>

/** Behaelt die Schluesseltypen und ergaenzt jeden Eintrag um `lqip`. */
type WithPreview<T> = { [K in keyof T]: T[K] & { lqip?: string } }

function withPreview<T extends Record<string, { id: string }>>(records: T): WithPreview<T> {
  return Object.fromEntries(
    Object.entries(records).map(([key, value]) => [key, { ...value, lqip: lqip[value.id] }]),
  ) as WithPreview<T>
}

export const photos = withPreview(photosRaw)
export const livingMedia = withPreview(livingMediaRaw)

/* ------------------------------------------------------------------ *
 * Auslieferungsregel: ein Datensatz ohne beschreibenden Alternativtext
 * wird nicht ausgeliefert. Die Pruefung laeuft einmal beim Laden des
 * Moduls und meldet den Fehler im Entwicklungsmodus laut.
 * ------------------------------------------------------------------ */

const MIN_ALT_LENGTH = 12



function isDeliverable(alt: string): boolean {
  return alt.trim().length >= MIN_ALT_LENGTH
}

function rejectIncomplete<T extends { id: string; alt: string }>(
  records: Record<string, T>,
  kind: string,
): Record<string, T> {
  const kept: Record<string, T> = {}
  for (const [key, value] of Object.entries(records)) {
    if (isDeliverable(value.alt)) {
      kept[key] = value
    } else if (import.meta.env.DEV) {
      throw new Error(
        `${kind} "${key}" hat keinen brauchbaren Alternativtext und wird nicht ausgeliefert.`,
      )
    }
  }
  return kept
}

export const deliverablePhotos = rejectIncomplete(photos, 'Foto')
export const deliverableLivingMedia = rejectIncomplete(livingMedia, 'Medium')

export function getPhoto(id: PhotoId): Photo | undefined {
  return deliverablePhotos[id]
}

export function getLiving(id: LivingMediaId): LivingMediaItem | undefined {
  return deliverableLivingMedia[id]
}

/** Gemeinsame Typen fuer Inhalte und Medien. */

/** Die Kategorien, fuer die tatsaechlich Material des Kunden vorliegt. */
export type CategoryId =
  | 'hochzeit'
  | 'portrait'
  | 'business'
  | 'gastronomie'
  | 'immobilien'
  | 'lebendige-medien'

/** CSS-Wert fuer aspect-ratio, z. B. '16 / 9'. */
export type Aspect = string

/**
 * Ein Foto aus der Fotostrecke des Kunden.
 * `base` ist der Pfad ohne Breite und Endung; die Varianten erzeugt
 * scripts/prepare-assets.mjs.
 */
export interface Photo {
  id: string
  /** z. B. '/assets/photos/wedding-stairs' */
  base: string
  /** verfuegbare Breiten in Pixeln, aufsteigend */
  widths: number[]
  /** natuerliches Seitenverhaeltnis der Quelldatei */
  intrinsic: { width: number; height: number }
  /** beschreibt das Motiv, nicht die Bildgattung */
  alt: string
  category: CategoryId
  /** Bildausschnitt, wenn das Motiv nicht mittig sitzt */
  objectPosition?: string
  /** 20 Pixel breite unscharfe Vorschau als data-URI, siehe previews.json */
  lqip?: string
}

/**
 * Ein Foto-Video-Paar fuer die Foto-zu-Video-Einheit.
 * Das Poster ist ein Standbild aus dem eigenen Video, damit Poster und erstes
 * Videobild dieselbe Szene zeigen.
 */
export interface LivingMediaItem {
  id: string
  /** Pfad ohne Endung, z. B. '/assets/posters/wedding' */
  posterBase: string
  /** vollstaendiger Pfad zur Videodatei */
  video: string
  /** Box-Verhaeltnis der Darstellung, unabhaengig vom Videoformat */
  aspect: Aspect
  /** natuerliche Videomasse, fuer Dokumentation und Sanity-Checks */
  intrinsic: { width: number; height: number }
  /** kurze Bezeichnung der Arbeit */
  title: string
  /** beschreibt das Posterbild */
  alt: string
  category: CategoryId
  objectPosition?: string
  hasAudio: boolean
  /** 20 Pixel breite unscharfe Vorschau als data-URI, siehe previews.json */
  lqip?: string
}

export interface NavItem {
  label: string
  /** Echter Routenpfad, keine Sprungmarke */
  href: string
}

/** Verweis auf ein Foto oder ein Foto-Video-Paar aus src/data/media.ts */
export type MediaRef = { kind: 'photo'; ref: string } | { kind: 'living'; ref: string }

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface Benefit {
  title: string
  description: string
}

export type PortfolioItem = MediaRef

export interface InquiryTopic {
  value: string
  label: string
}

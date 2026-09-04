import type { Benefit, InquiryTopic, NavItem, PortfolioItem, ProcessStep } from '@/types'

/**
 * Navigation, Startseite und alles, was über mehrere Seiten hinweg gilt.
 * Die einzelnen Unterseiten liegen in pages.ts.
 */

export const CTA_PRIMARY = 'Jetzt anfragen'
export const CONTACT_PATH = '/kontakt'

export const navigation: NavItem[] = [
  { label: 'Fotografie', href: '/fotografie' },
  { label: 'Lebendige Medien', href: '/lebendige-medien' },
  { label: 'Gastronomie', href: '/gastronomie' },
  { label: 'Unternehmen', href: '/unternehmen' },
  { label: 'Arbeiten', href: '/arbeiten' },
  { label: 'Über uns', href: '/ueber-uns' },
]

/* ------------------------------------------------------------------ *
 * Startseite
 * ------------------------------------------------------------------ */

export const hero = {
  eyebrow: 'Fotografie & Videoproduktion',
  headlineLines: ['Das Foto bleibt.', 'Der Moment wird'],
  headlineAccent: 'lebendig.',
  lead: 'Wir halten deine Momente als Foto fest und im selben Termin als Film. Zwei Ergebnisse, eine Bildsprache.',
  mediaHint: 'Foto zum Leben erwecken',
  secondary: { label: 'Arbeiten ansehen', to: '/arbeiten' },
  markers: [
    { title: 'Foto & Video', detail: 'im selben Termin' },
    { title: 'Persönlich', detail: 'vom ersten Gespräch an' },
    { title: 'Privat & Business', detail: 'dieselbe Sorgfalt' },
  ],
}

/**
 * Die Scroll-Erzählung auf der Startseite. Drei Stationen, durch die sich
 * ein Standbild zum Film entwickelt.
 */
export const livingStory = {
  eyebrow: 'Lebendige Medien',
  headlineLines: ['Deine Erinnerungen.'],
  headlineAccent: 'Jetzt lebendig.',
  steps: [
    {
      number: '01',
      title: 'Foto',
      body: 'Eine Sekunde, festgehalten. Scharf, ruhig, für die Wand oder das Album.',
    },
    {
      number: '02',
      title: 'Bewegung',
      body: 'Dieselbe Szene als Film: die Sekunden davor, der Schritt, das Lachen.',
    },
    {
      number: '03',
      title: 'Erinnerung',
      body: 'Beides gehört zusammen und wird als Paar ausgeliefert. Antippen genügt.',
    },
  ],
  cta: { label: 'Lebendige Medien ansehen', to: '/lebendige-medien' },
}

/**
 * Leistungen als Einstiege in die Unterseiten. Jede Kategorie hat echtes
 * Material; Kategorien ohne Material stehen hier nicht.
 */
export const serviceEntries = [
  {
    id: 'hochzeit',
    title: 'Hochzeiten',
    tagline: 'Der ganze Tag, ohne Aufstellung',
    to: '/fotografie',
    media: { kind: 'living', ref: 'wedding' } as const,
  },
  {
    id: 'portrait',
    title: 'Porträt & Lifestyle',
    tagline: 'Für Bewerbung, Social Media oder dich',
    to: '/fotografie',
    media: { kind: 'photo', ref: 'portrait-court-standing' } as const,
  },
  {
    id: 'business',
    title: 'Business & Team',
    tagline: 'Einheitlich für die ganze Mannschaft',
    to: '/unternehmen',
    media: { kind: 'living', ref: 'business-shoot' } as const,
  },
  {
    id: 'gastronomie',
    title: 'Gastronomie',
    tagline: 'Gerichte, die Appetit machen',
    to: '/gastronomie',
    media: { kind: 'living', ref: 'gastronomy-plating' } as const,
  },
  {
    id: 'immobilien',
    title: 'Immobilien',
    tagline: 'Räume, die ihre Wege zeigen',
    to: '/unternehmen',
    media: { kind: 'living', ref: 'real-estate' } as const,
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Fotografieren',
    description: 'Wir halten den Moment, das Produkt oder den Raum fest. Ruhig, mit Zeit für Wiederholungen.',
  },
  {
    number: '02',
    title: 'Video erstellen',
    description: 'Aus demselben Termin und denselben Motiven entsteht eine kurze bewegte Fassung.',
  },
  {
    number: '03',
    title: 'Verbinden',
    description: 'Foto und Video gehören zum selben Augenblick und werden als Paar zusammengestellt.',
  },
  {
    number: '04',
    title: 'Erleben',
    description: 'Antippen, und aus dem Standbild wird die Szene. Genau so, wie auf dieser Seite.',
  },
]

export const benefits: Benefit[] = [
  {
    title: 'Alles aus einer Hand',
    description: 'Fotografie, Video und Bearbeitung. Kein zweiter Dienstleister, keine Abstimmung zwischen zweien.',
  },
  {
    title: 'Persönlich',
    description: 'Sie sprechen mit der Person, die auch fotografiert. Vom ersten Anruf bis zur Übergabe.',
  },
  {
    title: 'Foto und Film im selben Termin',
    description: 'Ein Ort, ein Tag, zwei Ergebnisse. Das spart Zeit und hält die Bildsprache einheitlich.',
  },
  {
    title: 'Aus Osnabrück',
    description: 'Kurze Wege in der Region, Termine außerhalb nach Absprache.',
  },
]

export const finalCta = {
  headlineLines: ['Bereit für Fotos,', 'die mehr können?'],
  lead: 'Anlass, Ort und ungefährer Zeitraum reichen für den Anfang. Alles Weitere klären wir im Gespräch.',
}

/* ------------------------------------------------------------------ *
 * Arbeiten
 * ------------------------------------------------------------------ */

export const portfolio: PortfolioItem[] = [
  { kind: 'living', ref: 'wedding' },
  { kind: 'photo', ref: 'wedding-stairs' },
  { kind: 'photo', ref: 'portrait-court-knees' },
  { kind: 'living', ref: 'gastronomy-plating' },
  { kind: 'photo', ref: 'wedding-closeup' },
  { kind: 'living', ref: 'real-estate' },
  { kind: 'photo', ref: 'portrait-fence' },
  { kind: 'photo', ref: 'business-portrait-01' },
  { kind: 'living', ref: 'living-album' },
  { kind: 'photo', ref: 'portrait-court-seated' },
  { kind: 'photo', ref: 'business-office-01' },
  { kind: 'living', ref: 'gastronomy-serving' },
  { kind: 'photo', ref: 'wedding-facade' },
  { kind: 'photo', ref: 'portrait-court-full' },
  { kind: 'living', ref: 'business-shoot' },
  { kind: 'photo', ref: 'business-office-02' },
  { kind: 'photo', ref: 'portrait-court-standing' },
  { kind: 'photo', ref: 'business-portrait-02' },
]

export const portfolioFilters = [
  { id: 'alle', label: 'Alle' },
  { id: 'hochzeit', label: 'Hochzeit' },
  { id: 'portrait', label: 'Porträt' },
  { id: 'business', label: 'Business' },
  { id: 'gastronomie', label: 'Gastronomie' },
  { id: 'immobilien', label: 'Immobilien' },
  { id: 'lebendige-medien', label: 'Lebendige Medien' },
] as const

/* ------------------------------------------------------------------ *
 * Kontakt
 * ------------------------------------------------------------------ */

export const inquiryTopics: InquiryTopic[] = [
  { value: 'hochzeit', label: 'Hochzeit' },
  { value: 'paar-familie', label: 'Paar & Familie' },
  { value: 'portrait', label: 'Porträt & Lifestyle' },
  { value: 'business', label: 'Business & Team' },
  { value: 'gastronomie', label: 'Gastronomie' },
  { value: 'immobilien', label: 'Immobilien' },
  { value: 'lebendige-medien', label: 'Lebendige Medien' },
  { value: 'sonstiges', label: 'Sonstiges' },
]

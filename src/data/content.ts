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
  lead: 'Fotos, Filme und digitale Erlebnisse für eure Hochzeit, euer Unternehmen und die Momente dazwischen. Aus Osnabrück. Für euch bundesweit.',
  mediaHint: 'Foto zum Leben erwecken',
  secondary: { label: 'Arbeiten ansehen', to: '/arbeiten' },
  markers: [
    { title: 'Foto & Video', detail: 'im selben Termin' },
    { title: 'Persönlich', detail: 'vom ersten Gespräch an' },
    { title: 'Bundesweit', detail: 'an eurem Wunschort' },
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
      body: 'Im Fotobuch, auf einer Karte oder im Menü: Mit der passenden App wird aus einem Bild ein Erlebnis.',
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
    media: { kind: 'photo', ref: 'business-portrait-01' } as const,
  },
  {
    id: 'gastronomie',
    title: 'Gastronomie',
    tagline: 'Gerichte, die Appetit machen',
    to: '/gastronomie',
    media: { kind: 'living', ref: 'gastronomy-kitchen' } as const,
  },
  {
    id: 'lebendige-medien',
    title: 'Lebendige Medien',
    tagline: 'Fotobücher, Karten und neue Möglichkeiten',
    to: '/lebendige-medien',
    media: { kind: 'photo', ref: 'digital-card' } as const,
  },
]

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Besprechen', description: 'Wir besprechen gemeinsam, was ihr braucht und welche Momente oder Inhalte wichtig sind.' },
  { number: '02', title: 'Fotografieren & Filmen', description: 'Wir erstellen professionelle Fotos und Videos – direkt bei euch vor Ort.' },
  { number: '03', title: 'Bearbeiten & Gestalten', description: 'Wir machen aus euren Aufnahmen fertige Inhalte für Website, Social Media, Flyer, Menü und mehr.' },
  { number: '04', title: 'Lebendig machen', description: 'Mit unseren digitalen Erlebnissen werden eure Fotos und Inhalte interaktiv und lebendig.' },
]

export const faq = [
  { q: 'Was bietet Foto Panda an?', a: 'Wir machen professionelle Fotos, Videos und lebendige Erlebnisse für Hochzeiten, Restaurants, Unternehmen, Schulen, Kindergärten und besondere Veranstaltungen.' },
  { q: 'Fotografiert ihr auch Schulen und Kindergärten?', a: 'Ja. Wir fotografieren Schulen, Kindergärten, Tanzveranstaltungen, Abschlussbälle und weitere besondere Events – auf Wunsch mit Foto und Video.' },
  { q: 'Macht ihr auch Hochzeitsfotos und Hochzeitsvideos?', a: 'Ja. Wir begleiten eure Hochzeit mit professionellen Fotos und Videos und halten die wichtigsten Momente für euch fest.' },
  { q: 'Was ist ein lebendiges Fotobuch?', a: 'Wir verbinden eure schönsten Fotos mit Videos. So könnt ihr besondere Momente später wieder zum Leben erwecken – direkt über das Fotobuch.' },
  { q: 'Kann ich mein Restaurant mit Foto Panda präsentieren?', a: 'Ja. Wir fotografieren eure Gerichte und erstellen appetitliche Fotos und kurze Videos für Speisekarten, Flyer, Social Media und QR-Menüs.' },
  { q: 'Kann ich Flyer, Visitenkarten oder Speisekarten mit QR-Code bekommen?', a: 'Ja. Wir gestalten eure Flyer, Visitenkarten und Speisekarten und können sie mit einem QR-Code verbinden. So werden Fotos, Videos und Informationen direkt erlebbar.' },
  { q: 'Arbeitet ihr bundesweit?', a: 'Ja. Wir arbeiten bundesweit und kommen gerne zu eurem Wunschort – egal ob Hochzeit, Restaurant, Schule, Kindergarten oder Unternehmen.' },
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
    title: 'Bundesweit für euch da',
    description: 'Unser Ausgangspunkt ist Osnabrück. Euer Wunschort bestimmt, wohin die Reise geht.',
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
  { kind: 'photo', ref: 'bridal-palace' },
  { kind: 'photo', ref: 'bridal-closeup' },
  { kind: 'living', ref: 'wedding' },
  { kind: 'photo', ref: 'business-portrait-01' },
  { kind: 'living', ref: 'gastronomy-kitchen' },
  { kind: 'photo', ref: 'portrait-court-knees' },
  { kind: 'photo', ref: 'bridal-full-length' },
  { kind: 'photo', ref: 'digital-card' },
  { kind: 'photo', ref: 'business-office-01' },
  { kind: 'photo', ref: 'portrait-fence' },
  { kind: 'photo', ref: 'school-album' },
  { kind: 'photo', ref: 'bridal-editorial' },
]

export const portfolioFilters = [
  { id: 'alle', label: 'Alle' },
  { id: 'hochzeit', label: 'Hochzeit' },
  { id: 'portrait', label: 'Porträt' },
  { id: 'business', label: 'Business' },
  { id: 'gastronomie', label: 'Gastronomie' },
  { id: 'lebendige-medien', label: 'Lebendige Medien' },
] as const

/* ------------------------------------------------------------------ *
 * Kontakt
 * ------------------------------------------------------------------ */

export const inquiryTopics: InquiryTopic[] = [
  { value: 'hochzeit-feier', label: 'Hochzeit & Feier' },
  { value: 'schule-kindergarten', label: 'Schule & Kindergarten' },
  { value: 'tanz-abschlussball', label: 'Tanz & Abschlussball' },
  { value: 'paar-familie', label: 'Paar & Familie' },
  { value: 'business-unternehmen', label: 'Business & Unternehmen' },
  { value: 'lebendiges-menue', label: 'Lebendiges Menü' },
  { value: 'visitenkarte-flyer', label: 'Visitenkarte & Flyer' },
  { value: 'foto-video', label: 'Foto & Video' },
  { value: 'veranstaltungen', label: 'Veranstaltungen' },
  { value: 'sonstiges', label: 'Sonstiges' },
]

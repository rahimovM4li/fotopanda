/**
 * Einzige Quelle aller Geschaeftsdaten.
 *
 * Keine Komponente kennt eine Telefonnummer, eine Adresse oder einen
 * Markennamen. Was hier nicht steht, erscheint nicht auf der Seite: Felder mit
 * `null` werden im UI weggelassen statt mit einem Platzhalter gefuellt.
 *
 * Herkunft der Werte: Seite 5 der Kunden-PDF, ergaenzt um die vom Auftraggeber
 * bestaetigte Umstellung auf die Domain fotopandastudio.de.
 */

export interface SocialLink {
  /** Anzeigename des Netzwerks */
  network: string
  /** Handle, wie ihn der Kunde angibt */
  handle: string
  /**
   * Vollstaendige URL. `null`, wenn sie sich aus dem Handle nicht zweifelsfrei
   * ableiten laesst; der Eintrag wird dann nicht verlinkt und nicht gerendert.
   */
  url: string | null
}

export interface LegalEntity {
  /** Vollstaendige Firmierung laut Handels- oder Gewerberegister */
  legalName: string | null
  /** Vertretungsberechtigte Person */
  representative: string | null
  /** Strasse und Hausnummer */
  street: string | null
  /** Postleitzahl */
  postalCode: string | null
  /** Umsatzsteuer-Identifikationsnummer */
  vatId: string | null
}

export const siteConfig = {
  brandName: 'Foto Panda',
  tagline: 'Fotos. Videos. Erlebnisse.',
  domain: 'https://fotopandastudio.de',

  email: 'info@fotopandastudio.de',
  phone: '+49 176 41799016',
  /** Fuer tel:-Links, ohne Leerzeichen */
  phoneHref: '+4917641799016',

  city: 'Osnabrück',
  country: 'Deutschland',

  social: [
    {
      network: 'Instagram',
      handle: 'fotopanda.de',
      url: 'https://www.instagram.com/fotopanda.de/',
    },
    {
      network: 'TikTok',
      handle: 'fotopanda.de',
      url: 'https://www.tiktok.com/@fotopanda.de',
    },
    {
      network: 'YouTube',
      handle: 'Foto Panda',
      /* Ein Kanalname ist keine URL. Solange der Kanal-Link nicht vorliegt,
         wird der Eintrag nicht ausgegeben, statt eine Adresse zu raten. */
      url: null,
    },
  ] satisfies SocialLink[],

  /**
   * Rechtliche Angaben fuer Impressum und strukturierte Daten.
   * Alle Felder stehen auf `null`, weil sie noch nicht vorliegen.
   * Siehe RECHTLICHE-ANGABEN.md.
   */
  legal: {
    legalName: null,
    representative: null,
    street: null,
    postalCode: null,
    vatId: null,
  } satisfies LegalEntity,

  /**
   * Zieladresse fuer Formularanfragen. Solange `null`, meldet das Formular
   * keinen Versand, sondern bietet Telefon und E-Mail an.
   */
  inquiryEndpoint: null as string | null,
} as const

/** Nur Netzwerke mit belegter URL werden verlinkt. */
export const linkedSocial = siteConfig.social.filter(
  (s): s is SocialLink & { url: string } => s.url !== null,
)

/** Sind genug rechtliche Angaben da, um ein vollstaendiges Impressum zu zeigen? */
export const hasLegalData =
  siteConfig.legal.legalName !== null &&
  siteConfig.legal.street !== null &&
  siteConfig.legal.postalCode !== null

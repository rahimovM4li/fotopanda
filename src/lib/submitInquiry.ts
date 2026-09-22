import { siteConfig } from '@/config/siteConfig'

export interface Inquiry {
  name: string
  contact: string
  topic: string
  message: string
  consent: boolean
}

export type InquiryResult =
  /** Kein Empfangsdienst konfiguriert: es wurde nichts versendet. */
  | { status: 'no-transport' }
  | { status: 'sent' }
  | { status: 'failed'; reason: string }

/**
 * Einzige Stelle, an der eine Anfrage das Frontend verlaesst.
 *
 * Solange `siteConfig.inquiryEndpoint` auf `null` steht, gibt es keinen
 * Empfaenger. Dann meldet diese Funktion `no-transport`, und das Formular
 * behauptet keinen Versand, sondern bietet Telefon und E-Mail an.
 *
 * Anbindung spaeter: `inquiryEndpoint` in siteConfig setzen. An der
 * Darstellung aendert sich nichts.
 */
export async function submitInquiry(inquiry: Inquiry): Promise<InquiryResult> {
  const endpoint = siteConfig.inquiryEndpoint
  if (!endpoint) {
    return { status: 'no-transport' }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) {
      return { status: 'failed', reason: 'Der Empfangsdienst ist momentan nicht erreichbar.' }
    }
    return { status: 'sent' }
  } catch {
    return {
      status: 'failed',
      reason: 'Die Verbindung konnte nicht hergestellt werden.',
    }
  }
}

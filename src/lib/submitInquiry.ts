import { siteConfig } from '@/config/siteConfig'

export interface Inquiry {
  name: string
  contact: string
  topic: string
  message: string
  consent: boolean
  botcheck?: boolean
}

export type InquiryResult =
  | { status: 'no-transport' }
  | { status: 'sent' }
  | { status: 'failed'; reason: string }

export const inquiryAvailable = Boolean(siteConfig.inquiryAccessKey)

/** Never infer delivery from HTTP status alone; require the provider confirmation. */
export async function submitInquiry(inquiry: Inquiry, language = 'de'): Promise<InquiryResult> {
  if (!inquiryAvailable) return { status: 'no-transport' }
  if (inquiry.botcheck || !inquiry.consent) {
    return { status: 'failed', reason: 'Die Anfrage konnte nicht verarbeitet werden. Bitte prüfen Sie Ihre Angaben.' }
  }
  const contact = inquiry.contact.trim()
  try {
    const response = await fetch(siteConfig.inquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'omit',
      body: JSON.stringify({
        access_key: siteConfig.inquiryAccessKey,
        subject: `Foto Panda · ${inquiry.topic}`,
        from_name: 'Foto Panda Website',
        name: inquiry.name.trim(),
        ...(contact.includes('@') ? { email: contact } : { phone: contact }),
        topic: inquiry.topic,
        message: inquiry.message.trim(),
        language,
        consent: 'Ja / Да',
        botcheck: false,
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (response.status === 429) {
      return { status: 'failed', reason: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns per E-Mail.' }
    }
    const body: unknown = await response.json()
    if (!response.ok || typeof body !== 'object' || body === null || !('success' in body) || body.success !== true) {
      return { status: 'failed', reason: 'Der Empfangsdienst ist momentan nicht erreichbar.' }
    }
    return { status: 'sent' }
  } catch {
    return { status: 'failed', reason: 'Der Versand konnte nicht bestätigt werden. Bitte prüfen Sie Ihre Verbindung. Ihre Angaben bleiben erhalten.' }
  }
}

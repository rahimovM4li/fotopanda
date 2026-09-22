import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { MotionSurface } from '@/components/motion/MotionSurface'
import { Reveal } from '@/components/motion/Reveal'
import { inquiryTopics } from '@/data/content'
import { kontakt as page } from '@/data/pages'
import { siteConfig } from '@/config/siteConfig'
import { submitInquiry, type Inquiry, type InquiryResult } from '@/lib/submitInquiry'
import { useSeo } from '@/hooks/useSeo'
import '@/contact.css'

type FieldName = 'name' | 'contact' | 'topic' | 'message' | 'consent'
type Errors = Partial<Record<FieldName, string>>
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
const PHONE = /^\+?[\d\s/()-]{7,}$/
const empty: Inquiry = { name: '', contact: '', topic: '', message: '', consent: false }

function validate(values: Inquiry): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.'
  const contact = values.contact.trim()
  if (!contact) errors.contact = 'Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.'
  else if (!EMAIL.test(contact) && !(PHONE.test(contact) && contact.replace(/\D/g, '').length >= 7)) {
    errors.contact = 'Bitte geben Sie eine gültige E-Mail-Adresse oder Telefonnummer mit mindestens sieben Ziffern an.'
  }
  if (!inquiryTopics.some((topic) => topic.value === values.topic)) errors.topic = 'Bitte wählen Sie aus, worum es geht.'
  if (!values.consent) errors.consent = 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.'
  return errors
}

export function Kontakt() {
  useSeo({ ...page.seo, path: '/kontakt' })
  const [values, setValues] = useState<Inquiry>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [result, setResult] = useState<InquiryResult | null>(null)
  const [pending, setPending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const hasEndpoint = Boolean(siteConfig.inquiryEndpoint)

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
    setResult(null)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const found = validate(values)
    setErrors(found)
    const firstError = (Object.keys(found) as FieldName[])[0]
    if (firstError) {
      const field = formRef.current?.elements.namedItem(firstError)
      if (field instanceof HTMLElement) field.focus()
      return
    }
    setPending(true)
    const outcome = await submitInquiry(values)
    setPending(false)
    setResult(outcome)
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const describedBy = (field: FieldName) => errors[field] ? `${field}-error` : undefined
  const error = (field: FieldName) => errors[field] && <p id={`${field}-error`} className="contact-error">{errors[field]}</p>
  const topic = inquiryTopics.find((item) => item.value === values.topic)?.label ?? 'Foto Panda'
  const mailHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Anfrage: ${topic}`)}&body=${encodeURIComponent(`Guten Tag Foto Panda,\n\n${values.message.trim()}\n\nThema: ${topic}\nName: ${values.name.trim()}\nKontakt: ${values.contact.trim()}`)}`

  return (
    <section data-tone="ink" className="contact-page">
      <Container width="wide">
        <div className="contact-layout">
          <div className="contact-intro">
            <Reveal>
              <Eyebrow>{`${page.eyebrow} · Bundesweit`}</Eyebrow>
              <h1>Erzählen Sie uns<br /><span>von Ihrem Projekt.</span></h1>
              <p className="contact-lead">{page.lead}</p>
              <div className="contact-direct">
                <a href={`tel:${siteConfig.phoneHref}`}><Phone size={19} aria-hidden /><span><small>Rufen Sie uns an</small>{siteConfig.phone}</span><ArrowUpRight size={18} aria-hidden /></a>
                <a href={`mailto:${siteConfig.email}`}><Mail size={19} aria-hidden /><span><small>Schreiben Sie uns</small>{siteConfig.email}</span><ArrowUpRight size={18} aria-hidden /></a>
                <div><MapPin size={19} aria-hidden /><span><small>Unser Ausgangspunkt</small>{siteConfig.city}, {siteConfig.country}</span></div>
              </div>
              <p className="contact-note">Eine Idee reicht für den Anfang.<br />Den Rest finden wir gemeinsam heraus.</p>
            </Reveal>
          </div>
          <MotionSurface variant="soft" index={1} className="contact-form-motion">
          <form data-tone="ivory" ref={formRef} onSubmit={onSubmit} noValidate className="contact-form" aria-busy={pending} aria-labelledby="inquiry-title">
            <div className="contact-form-heading">
              <p className="contact-kicker">Ihr nächstes Kapitel</p>
              <h2 id="inquiry-title">Lassen Sie uns anfangen.</h2>
              <p id="form-method">{hasEndpoint ? 'Erzählen Sie uns von Ihrem Vorhaben.' : 'Hier bereiten Sie Ihre Anfrage als E-Mail vor. Den Versand übernehmen Sie anschließend in Ihrem E-Mail-Programm.'}</p>
            </div>
            <div className="contact-field-row">
              <div className="contact-field">
                <label htmlFor="name">Ihr Name <span aria-hidden>*</span></label>
                <input id="name" name="name" autoComplete="name" required maxLength={120} value={values.name} onChange={(event) => set('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} placeholder="Vor- und Nachname" />
                {error('name')}
              </div>
              <div className="contact-field">
                <label htmlFor="contact">E-Mail oder Telefon <span aria-hidden>*</span></label>
                <input id="contact" name="contact" autoComplete="email" required maxLength={180} value={values.contact} onChange={(event) => set('contact', event.target.value)} aria-invalid={Boolean(errors.contact)} aria-describedby={describedBy('contact')} placeholder="So erreichen wir Sie" />
                {error('contact')}
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="topic">Worum geht es? <span aria-hidden>*</span></label>
              <div className="contact-select">
                <select id="topic" name="topic" required value={values.topic} onChange={(event) => set('topic', event.target.value)} aria-invalid={Boolean(errors.topic)} aria-describedby={describedBy('topic')}>
                  <option value="">Bitte wählen</option>
                  {inquiryTopics.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
                <ChevronDown size={18} aria-hidden />
              </div>
              {error('topic')}
            </div>
            <div className="contact-field">
              <label htmlFor="message">Ihre Idee <span className="contact-optional">(optional)</span></label>
              <textarea id="message" name="message" rows={4} maxLength={3000} value={values.message} onChange={(event) => set('message', event.target.value)} placeholder="Anlass, Wunschort, Zeitraum – und was Ihnen am Herzen liegt." />
            </div>
            <div>
              <label htmlFor="consent" className="contact-consent">
                <input id="consent" name="consent" type="checkbox" required checked={values.consent} onChange={(event) => set('consent', event.target.checked)} aria-invalid={Boolean(errors.consent)} aria-describedby={describedBy('consent')} />
                <span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. <span aria-hidden>*</span> <Link to="/datenschutz">Datenschutzerklärung</Link></span>
              </label>
              {error('consent')}
            </div>
            <div className="contact-submit">
              <Button type="submit" size="lg" disabled={pending} aria-describedby="form-method">
                {pending ? 'Wird vorbereitet…' : hasEndpoint ? 'Anfrage absenden' : 'E-Mail vorbereiten'}<ArrowUpRight size={18} aria-hidden />
              </Button>
              <p>* Pflichtfelder</p>
            </div>
            {result && (
              <div ref={resultRef} tabIndex={-1} role={result.status === 'failed' ? 'alert' : 'status'} className="contact-result">
                {result.status === 'no-transport' && <>
                  <h3>Ihre E-Mail ist vorbereitet.</h3>
                  <p>Öffnen Sie die Anfrage in Ihrem E-Mail-Programm und senden Sie sie dort ab. Über diese Website wurde noch nichts versendet.</p>
                  <Button as="a" href={mailHref} variant="outline" className="mt-4">E-Mail-Programm öffnen<ArrowUpRight size={16} aria-hidden /></Button>
                  <p className="contact-result-note">Kein E-Mail-Programm eingerichtet? Schreiben Sie direkt an <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Ihre Angaben bleiben im Formular stehen.</p>
                </>}
                {result.status === 'sent' && <><h3>Vielen Dank für Ihre Anfrage.</h3><p>Ihre Nachricht wurde übermittelt. Wir melden uns persönlich bei Ihnen.</p></>}
                {result.status === 'failed' && <><h3>Die Anfrage konnte nicht versendet werden.</h3><p>{result.reason} Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p></>}
              </div>
            )}
          </form>
          </MotionSurface>
        </div>
      </Container>
    </section>
  )
}

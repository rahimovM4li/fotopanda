import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { MediaStill } from '@/components/ui/MediaStill'
import { inquiryTopics } from '@/data/content'
import { kontakt as page } from '@/data/pages'
import { siteConfig } from '@/config/siteConfig'
import { submitInquiry, type Inquiry, type InquiryResult } from '@/lib/submitInquiry'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/cn'

type FieldName = 'name' | 'contact' | 'topic' | 'message' | 'consent'
type Errors = Partial<Record<FieldName, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
/** Mindestens sieben Ziffern, optional Pluszeichen, Leerzeichen, Striche. */
const PHONE = /^\+?[\d\s/()-]{7,}$/

function validate(values: Inquiry): Errors {
  const errors: Errors = {}

  if (values.name.trim().length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.'

  const contact = values.contact.trim()
  if (contact.length === 0) {
    errors.contact = 'Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.'
  } else if (
    !EMAIL.test(contact) &&
    !(PHONE.test(contact) && contact.replace(/\D/g, '').length >= 7)
  ) {
    errors.contact =
      'Bitte eine gültige E-Mail-Adresse (name@beispiel.de) oder Telefonnummer mit mindestens sieben Ziffern.'
  }

  if (!values.topic) errors.topic = 'Bitte wählen Sie aus, worum es geht.'
  if (!values.consent) errors.consent = 'Ohne diese Zustimmung dürfen wir Ihre Anfrage nicht verarbeiten.'

  return errors
}

const empty: Inquiry = { name: '', contact: '', topic: '', message: '', consent: false }

export function Kontakt() {
  useSeo({ ...page.seo, path: '/kontakt' })

  const [values, setValues] = useState<Inquiry>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [result, setResult] = useState<InquiryResult | null>(null)
  const [pending, setPending] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
    setResult(null)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
    /* Die Eingaben bleiben stehen: Solange kein Empfänger angebunden ist,
       braucht der Besucher sie noch. */
  }

  const describedBy = (field: FieldName) => (errors[field] ? `${field}-error` : undefined)

  const fieldClass = (field: FieldName) =>
    cn(
      'w-full rounded-card border bg-ink-2 px-4 py-3.5 text-on-ink transition-colors',
      'focus:border-brand focus:outline-none',
      errors[field] ? 'border-danger' : 'border-ink-line',
    )

  return (
    <section
      data-tone="ink"
      className="relative isolate overflow-hidden bg-ink pt-28 pb-section-tight text-on-ink grain lg:pt-36"
    >
      <div aria-hidden className="glow-warm top-[-14rem] right-[-10rem] h-[42rem] w-[42rem] opacity-30" />

      <Container width="wide" className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* Linke Spalte: Aussage, direkte Wege, ein Bild als Anker. */}
          <div>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <MaskReveal
              as="h1"
              immediate
              delay={100}
              lines={[...page.headlineLines, <span className="text-brand">{page.headlineAccent}</span>]}
              className="mt-6 font-display text-display leading-[0.98] font-extrabold tracking-[-0.042em]"
            />
            <Reveal delay={400} className="mt-7">
              <p className="max-w-[42ch] text-lead text-on-ink-soft">{page.lead}</p>
            </Reveal>

            <Reveal delay={500} className="mt-10">
              <ul className="flex flex-col divide-y divide-ink-line border-y border-ink-line">
                <li>
                  <a
                    href={`tel:${siteConfig.phoneHref}`}
                    className="group/c flex min-h-16 items-center gap-4 transition-colors hover:text-brand"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                    <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">
                      {siteConfig.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group/c flex min-h-16 items-center gap-4 transition-colors hover:text-brand"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                    <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">
                      {siteConfig.email}
                    </span>
                  </a>
                </li>
                <li className="flex min-h-16 items-center gap-4 text-on-ink-soft">
                  <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em]">
                    {siteConfig.city}, {siteConfig.country}
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={600} className="mt-10 hidden lg:block">
              <div className="media-frame aspect-[16/10] rounded-frame">
                <MediaStill
                  media={{ kind: 'photo', ref: 'wedding-closeup' }}
                  sizes="(min-width:1024px) 32vw, 100vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"
                />
              </div>
            </Reveal>
          </div>

          {/* Formular */}
          <Reveal delay={200}>
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-6 rounded-frame border border-ink-line bg-ink-2/60 p-6 backdrop-blur-sm sm:p-9"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                    Name <span className="text-brand">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => set('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                    className={fieldClass('name')}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-danger">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact" className="mb-2 block text-sm font-semibold">
                    E-Mail oder Telefon <span className="text-brand">*</span>
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    value={values.contact}
                    onChange={(e) => set('contact', e.target.value)}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={describedBy('contact')}
                    className={fieldClass('contact')}
                  />
                  {errors.contact && (
                    <p id="contact-error" className="mt-2 text-sm text-danger">
                      {errors.contact}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="topic" className="mb-2 block text-sm font-semibold">
                  Worum geht es? <span className="text-brand">*</span>
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={values.topic}
                  onChange={(e) => set('topic', e.target.value)}
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={describedBy('topic')}
                  className={fieldClass('topic')}
                >
                  <option value="">Bitte wählen</option>
                  {inquiryTopics.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
                {errors.topic && (
                  <p id="topic-error" className="mt-2 text-sm text-danger">
                    {errors.topic}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Datum, Ort, was Ihnen wichtig ist"
                  className={cn(fieldClass('message'), 'resize-y')}
                />
              </div>

              <div>
                <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => set('consent', e.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={describedBy('consent')}
                    className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-brand)]"
                  />
                  <span className="text-sm text-on-ink-muted">
                    Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet
                    werden. <span className="text-brand">*</span>{' '}
                    <Link
                      to="/datenschutz"
                      className="underline decoration-ink-line-2 underline-offset-4 hover:text-on-ink"
                    >
                      Datenschutzerklärung
                    </Link>
                  </span>
                </label>
                {errors.consent && (
                  <p id="consent-error" className="mt-2 text-sm text-danger">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg" disabled={pending}>
                  {pending ? 'Wird geprüft…' : 'Anfrage absenden'}
                </Button>
                <p className="text-sm text-on-ink-faint">Pflichtfelder sind mit * markiert.</p>
              </div>

              {/* Ohne angebundenen Empfänger wird kein Versand behauptet. */}
              {result?.status === 'no-transport' && (
                <div role="status" className="rounded-card border border-brand/40 bg-ink p-5">
                  <p className="font-display font-bold">
                    Der Online-Versand ist noch nicht freigeschaltet.
                  </p>
                  <p className="mt-2 text-[0.9375rem] text-on-ink-muted">
                    Ihre Eingaben stehen noch im Formular. Am schnellsten geht es direkt:
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button as="a" href={`tel:${siteConfig.phoneHref}`} size="md">
                      {siteConfig.phone}
                    </Button>
                    <Button
                      as="a"
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                        `Anfrage: ${inquiryTopics.find((t) => t.value === values.topic)?.label ?? 'Foto Panda'}`,
                      )}&body=${encodeURIComponent(`${values.message}\n\n${values.name}\n${values.contact}`)}`}
                      variant="outline"
                      size="md"
                    >
                      E-Mail schreiben
                    </Button>
                  </div>
                </div>
              )}

              {result?.status === 'sent' && (
                <p role="status" className="rounded-card border border-ink-line bg-ink p-5">
                  Danke, die Anfrage ist angekommen. Wir melden uns.
                </p>
              )}

              {result?.status === 'failed' && (
                <p role="alert" className="rounded-card border border-danger/50 bg-ink p-5">
                  Das Absenden hat nicht geklappt ({result.reason}). Bitte versuchen Sie es erneut
                  oder rufen Sie an: {siteConfig.phone}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

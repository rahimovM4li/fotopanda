import { Container } from '@/components/ui/Container'
import { PendingData } from '@/components/PendingData'
import { hasLegalData, siteConfig } from '@/config/siteConfig'
import { useSeo } from '@/hooks/useSeo'

export function Impressum() {
  useSeo({
    title: `Impressum | ${siteConfig.brandName}`,
    description: `Impressum und Anbieterkennzeichnung von ${siteConfig.brandName}.`,
    path: '/impressum',
    noIndex: true,
  })

  return (
    <article data-tone="ink"
      className="relative isolate bg-ink pt-32 pb-section text-on-ink lg:pt-40">
      <Container width="text">
        <h1 className="font-display text-h2 leading-[1] font-extrabold tracking-[-0.038em]">Impressum</h1>

        {!hasLegalData && (
          <p className="mt-8 rounded-card border border-brand/40 bg-ink-2 p-5 text-[0.9375rem] text-on-ink-soft">
            Diese Seite ist noch nicht vollständig. Die mit einem Warnzeichen markierten Angaben
            müssen vor dem Livegang eingetragen werden. Bis dahin erfüllt die Seite die
            Anforderungen von § 5 DDG nicht.
          </p>
        )}

        <section className="mt-12">
          <h2 className="text-h3">Angaben gemäß § 5 DDG</h2>
          <address className="mt-4 not-italic text-on-ink-soft">
            {siteConfig.legal.legalName ?? <PendingData>Vollständiger Firmenname</PendingData>}
            <br />
            {siteConfig.legal.street ?? <PendingData>Straße und Hausnummer</PendingData>}
            <br />
            {siteConfig.legal.postalCode ?? <PendingData>Postleitzahl</PendingData>} {siteConfig.city}
            <br />
            {siteConfig.country}
          </address>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Vertreten durch</h2>
          <p className="mt-4 text-on-ink-soft">
            {siteConfig.legal.representative ?? (
              <PendingData>Name der vertretungsberechtigten Person</PendingData>
            )}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Kontakt</h2>
          <ul className="mt-4 flex flex-col gap-1 text-on-ink-soft">
            <li>
              Telefon:{' '}
              <a href={`tel:${siteConfig.phoneHref}`} className="underline underline-offset-4">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              E-Mail:{' '}
              <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Umsatzsteuer-Identifikationsnummer</h2>
          <p className="mt-4 text-on-ink-soft">
            {siteConfig.legal.vatId ?? (
              <PendingData>USt-IdNr. gemäß § 27 a UStG, falls vorhanden</PendingData>
            )}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Verantwortlich für den Inhalt</h2>
          <p className="mt-4 text-on-ink-soft">
            {siteConfig.legal.representative ?? (
              <PendingData>Name und Anschrift der verantwortlichen Person</PendingData>
            )}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Streitbeilegung</h2>
          <p className="mt-4 text-on-ink-soft">
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Bildnachweis</h2>
          <p className="mt-4 text-on-ink-soft">
            Sämtliche Fotografien und Videos auf dieser Website stammen von {siteConfig.brandName}.
          </p>
        </section>
      </Container>
    </article>
  )
}

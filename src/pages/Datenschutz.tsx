import { Container } from '@/components/ui/Container'
import { PendingData } from '@/components/PendingData'
import { hasLegalData, siteConfig } from '@/config/siteConfig'
import { useSeo } from '@/hooks/useSeo'

export function Datenschutz() {
  useSeo({
    title: `Datenschutz | ${siteConfig.brandName}`,
    description: `Informationen zum Umgang mit personenbezogenen Daten auf der Website von ${siteConfig.brandName}.`,
    path: '/datenschutz',
    noIndex: true,
  })

  return (
    <article data-tone="ink"
      className="relative isolate bg-ink pt-32 pb-section text-on-ink lg:pt-40">
      <Container width="text">
        <h1 className="font-display text-h2 leading-[1] font-extrabold tracking-[-0.038em]">Datenschutzerklärung</h1>

        {!hasLegalData && (
          <p className="mt-8 rounded-card border border-brand/40 bg-ink-2 p-5 text-[0.9375rem] text-on-ink-soft">
            Die technischen Angaben auf dieser Seite beschreiben den tatsächlichen Stand der
            Website. Die Angaben zum Verantwortlichen fehlen noch und müssen vor dem Livegang
            eingetragen werden.
          </p>
        )}

        <section className="mt-12">
          <h2 className="text-h3">Verantwortlicher</h2>
          <address className="mt-4 not-italic text-on-ink-soft">
            {siteConfig.legal.legalName ?? <PendingData>Vollständiger Firmenname</PendingData>}
            <br />
            {siteConfig.legal.street ?? <PendingData>Straße und Hausnummer</PendingData>}
            <br />
            {siteConfig.legal.postalCode ?? <PendingData>Postleitzahl</PendingData>} {siteConfig.city}
            <br />
            E-Mail:{' '}
            <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
              {siteConfig.email}
            </a>
          </address>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Keine Dienste von Dritten</h2>
          <p className="mt-4 text-on-ink-soft">
            Diese Website lädt zur Laufzeit keine Inhalte von fremden Servern. Schriften, Bilder
            und Videos liegen auf demselben Server wie die Seite selbst. Es findet kein Aufruf von
            Google Fonts, keine Einbindung von Karten, Videoportalen oder Social-Media-Widgets
            statt.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Keine Analyse, kein Tracking, keine Cookies</h2>
          <p className="mt-4 text-on-ink-soft">
            Es werden keine Analyse- oder Trackingwerkzeuge eingesetzt. Die Website setzt keine
            Cookies und legt keine Daten im lokalen Speicher Ihres Browsers ab. Aus diesem Grund
            gibt es auch kein Einwilligungsbanner: Es besteht nichts, worin eingewilligt werden
            müsste.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Server-Logfiles</h2>
          <p className="mt-4 text-on-ink-soft">
            Der Anbieter des Webspace erhebt technisch bedingt Zugriffsdaten wie IP-Adresse,
            Datum und Uhrzeit des Abrufs, aufgerufene Seite und übertragene Datenmenge.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt im
            sicheren und störungsfreien Betrieb der Website.{' '}
            <PendingData>Hosting-Anbieter und Speicherdauer der Logfiles ergänzen</PendingData>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Anfrageformular</h2>
          <p className="mt-4 text-on-ink-soft">
            Über das Formular auf der Kontaktseite können Sie eine Anfrage stellen. Verarbeitet
            werden die von Ihnen eingegebenen Angaben: Name, E-Mail-Adresse oder Telefonnummer,
            Art der Anfrage und Ihre Nachricht. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO,
            da die Verarbeitung der Beantwortung Ihrer Anfrage und der Anbahnung eines Vertrags
            dient.
          </p>
          <p className="mt-4 text-on-ink-soft">
            Der Online-Versand ist derzeit nicht freigeschaltet. Ihre Eingaben verlassen Ihren
            Browser nicht und werden nirgends gespeichert; die Kontaktaufnahme erfolgt über
            Telefon oder E-Mail.{' '}
            <PendingData>
              Sobald ein Empfänger angebunden ist, diesen Abschnitt um Empfängerdienst und
              Speicherdauer ergänzen
            </PendingData>
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Ihre Rechte</h2>
          <p className="mt-4 text-on-ink-soft">
            Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten
            (Art. 15 DSGVO), auf Berichtigung (Art. 16), auf Löschung (Art. 17), auf
            Einschränkung der Verarbeitung (Art. 18), auf Datenübertragbarkeit (Art. 20) und auf
            Widerspruch gegen die Verarbeitung (Art. 21). Wenden Sie sich dafür an die oben
            genannte E-Mail-Adresse.
          </p>
          <p className="mt-4 text-on-ink-soft">
            Ihnen steht außerdem ein Beschwerderecht bei einer Aufsichtsbehörde zu. Zuständig ist
            in der Regel die Behörde Ihres gewöhnlichen Aufenthaltsorts.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-h3">Bild- und Videoaufnahmen</h2>
          <p className="mt-4 text-on-ink-soft">
            Aufnahmen aus Aufträgen werden nur mit Einwilligung der abgebildeten Personen
            veröffentlicht. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die
            Zukunft widerrufen; schreiben Sie dazu an die oben genannte E-Mail-Adresse.
          </p>
        </section>
      </Container>
    </article>
  )
}

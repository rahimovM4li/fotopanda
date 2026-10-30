import { useTranslation } from '@/i18n/LanguageProvider'
import { Container } from '@/components/ui/Container'
import { PendingData } from '@/components/PendingData'
import { Reveal } from '@/components/motion/Reveal'
import { hasLegalData, siteConfig } from '@/config/siteConfig'
import { useSeo } from '@/hooks/useSeo'

export function Impressum() {
  const { t } = useTranslation()
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
        <Reveal>
          <h1 className="font-display text-h2 leading-[1] font-extrabold tracking-[-0.038em]">{t("Impressum")}</h1>
        </Reveal>

        {!hasLegalData && (
          <Reveal delay={70}>
            <p className="mt-8 rounded-card border border-brand/40 bg-ink-2 p-5 text-[0.9375rem] text-on-ink-soft">{t("Diese Seite ist noch nicht vollständig. Die mit einem Warnzeichen markierten Angaben müssen vor dem Livegang eingetragen werden. Bis dahin erfüllt die Seite die Anforderungen von § 5 DDG nicht.")}</p>
          </Reveal>
        )}

        <Reveal as="section" className="mt-12">
          <h2 className="text-h3">{t("Angaben gemäß § 5 DDG")}</h2>
          <address className="mt-4 not-italic text-on-ink-soft">
            {siteConfig.legal.legalName ?? <PendingData>{t("Vollständiger Firmenname")}</PendingData>}
            <br />
            {siteConfig.legal.street ?? <PendingData>{t("Straße und Hausnummer")}</PendingData>}
            <br />
            {siteConfig.legal.postalCode ?? <PendingData>{t("Postleitzahl")}</PendingData>} {t(siteConfig.city)}
            <br />
            {t(siteConfig.country)}
          </address>
        </Reveal>

        <Reveal as="section" className="mt-10">
          <h2 className="text-h3">{t("Vertreten durch")}</h2>
          <p className="mt-4 text-on-ink-soft">
            {siteConfig.legal.representative ?? (
              <PendingData>{t("Name der vertretungsberechtigten Person")}</PendingData>
            )}
          </p>
        </Reveal>

        <Reveal as="section" className="mt-10">
          <h2 className="text-h3">{t("Kontakt")}</h2>
          <ul className="mt-4 flex flex-col gap-1 text-on-ink-soft">
            <li>{t("Telefon:")}{t(' ')}
              <a href={`tel:${siteConfig.phoneHref}`} className="underline underline-offset-4">
                {t(siteConfig.phone)}
              </a>
            </li>
            <li>{t("E-Mail:")}{t(' ')}
              <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
                {t(siteConfig.email)}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal as="section" className="mt-10">
          <h2 className="text-h3">{t("Umsatzsteuer-Identifikationsnummer")}</h2>
          <p className="mt-4 text-on-ink-soft">
            {siteConfig.legal.vatId ?? (
              <PendingData>{t("USt-IdNr. gemäß § 27 a UStG, falls vorhanden")}</PendingData>
            )}
          </p>
        </Reveal>

        <Reveal as="section" className="mt-10">
          <h2 className="text-h3">{t("Verantwortlich für den Inhalt")}</h2>
          <p className="mt-4 text-on-ink-soft">
            {siteConfig.legal.representative ?? (
              <PendingData>{t("Name und Anschrift der verantwortlichen Person")}</PendingData>
            )}
          </p>
        </Reveal>

        <Reveal as="section" className="mt-10">
          <h2 className="text-h3">{t("Streitbeilegung")}</h2>
          <p className="mt-4 text-on-ink-soft">{t("Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.")}</p>
        </Reveal>

        <Reveal as="section" className="mt-10">
          <h2 className="text-h3">{t("Bildnachweis")}</h2>
          <p className="mt-4 text-on-ink-soft">{t("Sämtliche Fotografien und Videos auf dieser Website stammen von ")}{t(siteConfig.brandName)}.
          </p>
        </Reveal>
      </Container>
    </article>
  )
}

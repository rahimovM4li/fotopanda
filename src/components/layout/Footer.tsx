import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Wordmark } from '@/components/Wordmark'
import { linkedSocial, siteConfig } from '@/config/siteConfig'
import { CONTACT_PATH, CTA_PRIMARY, navigation } from '@/data/content'

/**
 * Der Fuß ist der Abschluss der Marke, keine zweite Website.
 *
 * Die Handlungsaufforderung steht groß und typografisch, darunter die
 * Pflichtangaben. Auf schmalen Viewports laufen die Seitenlinks in einer Zeile
 * statt als sechs 44 Pixel hohe Listeneinträge; sonst ist der Fuß dort länger
 * als mancher Abschnitt darüber.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-tone="ink" className="relative isolate overflow-hidden bg-ink text-on-ink grain">
      <div
        aria-hidden
        className="glow-warm bottom-[-18rem] left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 opacity-40"
      />

      <div className="relative mx-auto w-full max-w-[92rem] px-5 pt-section-tight pb-10 sm:px-8 lg:px-12">
        {/* Abschluss-CTA */}
        <div className="flex flex-col items-start gap-9 border-b border-ink-line pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-14">
          <MaskReveal
            as="h2"
            lines={['Machen wir Ihre', <>Ideen <span className="text-brand">lebendig</span>.</>]}
            className="font-display text-mega leading-[0.94] font-extrabold tracking-[-0.04em]"
          />
          <div className="flex w-full shrink-0 flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
            <Button as="link" to={CONTACT_PATH} size="lg" className="w-full sm:w-auto" magnetic>
              {CTA_PRIMARY}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="inline-flex min-h-11 items-center gap-2.5 font-display font-bold text-on-ink transition-colors hover:text-brand"
            >
              <Phone className="h-4 w-4 text-brand" aria-hidden />
              {siteConfig.phone}
            </a>
          </div>
        </div>

        {/* Angaben. Auf md und breiter drei Spalten, darunter kompakt. */}
        <div className="grid gap-10 py-10 md:grid-cols-[1.5fr_1fr_1.2fr] md:gap-12 md:py-14">
          <div>
            <Wordmark showTagline />
            <p className="mt-4 hidden max-w-[34ch] text-sm text-on-ink-muted md:block">
              Fotografie und Bewegtbild aus einem Termin. Für Menschen, Gerichte, Räume und
              Unternehmen.
            </p>
            {linkedSocial.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {linkedSocial.map((s) => (
                  <li key={s.network}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-11 items-center rounded-full border border-ink-line-2 px-4 text-[0.8125rem] text-on-ink-muted transition-colors hover:border-brand hover:text-on-ink"
                    >
                      {s.network}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Seitenlinks: als Spalte ab md, darunter als eine laufende Zeile. */}
          <nav aria-label="Fußzeilennavigation" className="md:col-start-2">
            <h3 className="hidden font-display text-[0.6875rem] font-bold tracking-[0.16em] text-on-ink-faint uppercase md:block">
              Seite
            </h3>
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-0 md:mt-5 md:flex-col md:items-start md:gap-0.5">
              {navigation.map((item, i) => (
                <li key={item.href} className="flex items-center">
                  <Link
                    to={item.href}
                    className="inline-flex min-h-11 items-center px-1 text-sm text-on-ink-muted transition-colors hover:text-on-ink md:px-0"
                  >
                    {item.label}
                  </Link>
                  {i < navigation.length - 1 && (
                    <span aria-hidden className="text-on-ink-faint md:hidden">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-start-3">
            <h3 className="hidden font-display text-[0.6875rem] font-bold tracking-[0.16em] text-on-ink-faint uppercase md:block">
              Kontakt
            </h3>
            <ul className="flex flex-col gap-0.5 text-sm md:mt-5 md:gap-1">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex min-h-11 items-center gap-2.5 text-on-ink-soft transition-colors hover:text-on-ink"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex min-h-11 items-center gap-2.5 text-on-ink-soft">
                <MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                {siteConfig.city}, {siteConfig.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-ink-line pt-5 text-sm text-on-ink-faint sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          <p className="min-h-9 leading-9">
            © {year} {siteConfig.brandName}
          </p>
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/impressum"
                className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-on-ink"
              >
                Impressum
              </Link>
            </li>
            <li aria-hidden className="text-on-ink-faint">
              ·
            </li>
            <li>
              <Link
                to="/datenschutz"
                className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-on-ink"
              >
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

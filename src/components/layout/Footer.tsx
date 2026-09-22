import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Wordmark } from '@/components/Wordmark'
import { linkedSocial, siteConfig } from '@/config/siteConfig'
import { CONTACT_PATH, CTA_PRIMARY, navigation } from '@/data/content'

export function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()

  return (
    <footer data-tone="ink" className="relative border-t border-ink-line bg-ink text-on-ink">
      <div className="mx-auto w-full max-w-[92rem] px-5 pt-12 pb-8 sm:px-8 lg:px-12 lg:pt-18">
        {pathname !== CONTACT_PATH && (
          <div className="flex flex-col items-start gap-7 border-b border-ink-line pb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:pb-14">
            <div>
              <p className="mb-4 text-xs font-medium tracking-[0.14em] text-on-ink-muted uppercase">Aus einer Idee wird ein Erlebnis</p>
              <h2 className="max-w-[21ch] text-[clamp(2.2rem,4.8vw,4.5rem)] leading-[1.04]">Erzählen Sie uns von <span className="text-brand">Ihrem Projekt.</span></h2>
              <p className="mt-6 max-w-[56ch] text-on-ink-muted">Beschreiben Sie kurz Ihre Idee oder Ihren Wunsch. Wir melden uns persönlich bei Ihnen und besprechen die nächsten Schritte.</p>
            </div>
            <Button as="link" to={CONTACT_PATH} size="lg" className="shrink-0">{CTA_PRIMARY}<ArrowUpRight className="h-4 w-4" aria-hidden /></Button>
          </div>
        )}
        <div className="grid gap-9 py-10 md:grid-cols-[1.3fr_1fr_1.2fr] md:gap-12 md:py-14">
          <div>
            <Link to="/" className="inline-flex" aria-label="Foto Panda, zur Startseite"><Wordmark showTagline /></Link>
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-on-ink-muted">Fotos, Videos und digitale Erlebnisse. Für besondere Momente und neue Perspektiven.</p>
            {linkedSocial.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Soziale Netzwerke">
                {linkedSocial.map((social) => (
                  <li key={social.network}><a href={social.url} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-line-2 px-4 text-xs font-medium text-on-ink-soft transition-colors hover:border-on-ink-muted hover:text-on-ink">{social.network}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a></li>
                ))}
              </ul>
            )}
          </div>
          <nav aria-label="Fußzeilennavigation">
            <h3 className="font-display text-xs font-medium tracking-[0.12em] text-on-ink-faint uppercase">Entdecken</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-5 md:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}><Link to={item.href} className="inline-flex min-h-11 items-center text-sm text-on-ink-soft transition-colors hover:text-brand-soft">{item.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="font-display text-xs font-medium tracking-[0.12em] text-on-ink-faint uppercase">Persönlich für Sie da</h3>
            <ul className="mt-4 flex flex-col gap-1 text-sm">
              <li><a href={`tel:${siteConfig.phoneHref}`} className="inline-flex min-h-11 items-center gap-3 text-on-ink-soft transition-colors hover:text-on-ink"><Phone className="h-4 w-4 shrink-0 text-brand" aria-hidden />{siteConfig.phone}</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-11 items-center gap-3 text-on-ink-soft transition-colors hover:text-on-ink"><Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden />{siteConfig.email}</a></li>
              <li className="flex min-h-11 items-center gap-3 text-on-ink-soft"><MapPin className="h-4 w-4 shrink-0 text-brand" aria-hidden />{siteConfig.city}, {siteConfig.country}</li>
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-on-ink-faint">Bundesweit für Sie unterwegs.</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 border-t border-ink-line pt-5 text-xs text-on-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="min-h-9 leading-9">© {year} {siteConfig.brandName}</p>
          <ul className="flex items-center gap-5">
            <li><Link to="/impressum" className="inline-flex min-h-11 items-center transition-colors hover:text-on-ink">Impressum</Link></li>
            <li><Link to="/datenschutz" className="inline-flex min-h-11 items-center transition-colors hover:text-on-ink">Datenschutz</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

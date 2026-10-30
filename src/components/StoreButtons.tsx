import { useTranslation } from '@/i18n/LanguageProvider'
import { ArrowUpRight, Smartphone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

export function StoreButtons() {
  const { t } = useTranslation()
  const stores = [
    { label: 'App Store', prefix: 'Laden im', href: siteConfig.app.appStoreUrl },
    { label: 'Google Play', prefix: 'Jetzt bei', href: siteConfig.app.googlePlayUrl },
  ]
  return <div className="store-buttons">{stores.map((store) => (
    <a key={store.label} className="store-button" href={store.href} target="_blank" rel="noopener noreferrer" aria-label={t("{app} im {store} herunterladen (öffnet einen neuen Tab)", { app: siteConfig.app.name, store: store.label })}>
      <Smartphone size={26} aria-hidden /><span><small>{t(store.prefix)}</small><strong>{t(store.label)}</strong></span><ArrowUpRight size={17} aria-hidden />
    </a>
  ))}</div>
}

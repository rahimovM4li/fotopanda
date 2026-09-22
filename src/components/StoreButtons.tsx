import { ArrowUpRight, Smartphone } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

export function StoreButtons() {
  const stores = [
    { label: 'App Store', prefix: 'Laden im', href: siteConfig.app.appStoreUrl },
    { label: 'Google Play', prefix: 'Jetzt bei', href: siteConfig.app.googlePlayUrl },
  ]
  return <div className="store-buttons">{stores.map((store) => (
    <a key={store.label} className="store-button" href={store.href} target="_blank" rel="noopener noreferrer" aria-label={`${siteConfig.app.name} im ${store.label} herunterladen (öffnet einen neuen Tab)`}>
      <Smartphone size={26} aria-hidden /><span><small>{store.prefix}</small><strong>{store.label}</strong></span><ArrowUpRight size={17} aria-hidden />
    </a>
  ))}</div>
}

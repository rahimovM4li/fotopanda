import { useTranslation } from '@/i18n/LanguageProvider'
import { Link } from '@/i18n/LocalizedLink'

export function NotFound() {
  const { language } = useTranslation()
  return <section data-tone="ink" className="min-h-[70vh] bg-ink px-6 pt-40 pb-24 text-on-ink">
    <div className="mx-auto max-w-3xl">
      <p className="section-kicker">404</p>
      <h1 className="font-display text-4xl font-bold">{language === 'de' ? 'Seite nicht gefunden' : 'Страница не найдена'}</h1>
      <p className="mt-6">{language === 'de' ? 'Diese Seite ist nicht verfügbar. Entdecken Sie unsere Leistungen oder sprechen Sie mit uns über Ihr Projekt.' : 'Эта страница недоступна. Посмотрите наши услуги или расскажите нам о вашем проекте.'}</p>
      <div className="mt-8 flex gap-6"><Link to="/" className="text-link">{language === 'de' ? 'Zur Startseite' : 'На главную'}</Link><Link to="/kontakt" className="text-link">{language === 'de' ? 'Kontakt' : 'Связаться с нами'}</Link></div>
    </div>
  </section>
}

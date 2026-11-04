import { Container } from '@/components/ui/Container'
import { LivingMedia } from '@/components/living/LivingMedia'
import { Reveal } from '@/components/motion/Reveal'
import { livingMedia } from '@/data/media'
import { useTranslation } from '@/i18n/LanguageProvider'
import './gastronomy-editorial.css'

const films = [
  { id: 'gastro-grill', number: '01', duration: '0:11', eyebrow: 'Nah am Genuss', title: 'Geschmack im Detail', body: 'Ein Schnitt. Ein Blick auf die Textur. Kleine Momente, die große Vorfreude wecken.' },
  { id: 'gastro-finish', number: '02', duration: '0:18', eyebrow: 'Der letzte Schliff', title: 'Frische, die man sieht.', body: 'Ein Spritzer Zitrone, frische Kräuter, goldene Farben. Wir zeigen, was Ihr Gericht besonders macht.' },
  { id: 'gastro-table', number: '03', duration: '0:25', eyebrow: 'Gemeinsam genießen', title: 'Ein Tisch voller Geschichten', body: 'Vom Schaschlik bis zum liebevoll gedeckten Tisch. Aus einzelnen Gerichten wird eine Einladung zum Bleiben.' },
] as const
export function GastronomyFilms() {
  const { t } = useTranslation()
  return <section className="gastro-films" data-tone="ivory" aria-labelledby="gastro-films-title">
    <Container width="wide">
      <Reveal><div className="gastro-films-heading"><div><p className="section-kicker">{t('Drei Filme. Ein Gefühl.')}</p><h2 id="gastro-films-title">{t('Genuss beginnt mit einem Blick.')}</h2></div><p>{t('Echte Nähe, feine Details und die Atmosphäre Ihres Hauses. Starten Sie einen Film und lassen Sie die Bilder erzählen.')}</p></div></Reveal>
      <div className="gastro-film-grid">{films.map(film => <article key={film.id} className="gastro-film-card">
        <LivingMedia item={film.id === 'gastro-table' ? { ...livingMedia[film.id], posterBase: '/assets/posters/gastro-table-scene', alt: 'Ein frisch angerichteter Salat wird auf einen Tisch mit verschiedenen Speisen gestellt' } : livingMedia[film.id]} showCta={false} showStatus={false} hint={t('Film ansehen')} fullscreenOnMobile aspectClassName="aspect-[9/16]" radiusClassName="rounded-media" />
        <div className="gastro-film-meta"><span>{film.number} / {t(film.eyebrow)}</span><span>{film.duration}</span></div>
        <h3>{t(film.title)}</h3><p>{t(film.body)}</p>
      </article>)}</div>
      <div className="gastro-original">
        <LivingMedia item={livingMedia['gastronomy-kitchen']} hint={t('Küchenvideo abspielen')} showCta={false} showStatus={false} fullscreenOnMobile aspectClassName="aspect-[9/16]" radiusClassName="rounded-media" />
        <div><p className="section-kicker">{t('Das Handwerk dahinter.')}</p><h3>{t('Hier beginnt der Geschmack.')}</h3><p>{t('Das Handwerk dahinter. Ein Einblick in die Küche.')}</p></div>
      </div>
    </Container>
  </section>
}

import { motion, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ScrollTour, type TourStageProps } from '@/components/tours/ScrollTour'
import { Picture } from '@/components/ui/Picture'
import { photos, type PhotoId } from '@/data/media'
import { useTranslation } from '@/i18n/LanguageProvider'
import './gastronomy-editorial.css'

const chapters = [
  { label: 'Der Einband', title: 'Appetit auf die nächste Seite.', body: 'Ein Menü beginnt lange vor der Bestellung. Mit einem Bild, einer Idee und der Lust, weiterzublättern.' },
  { label: 'Der Auftakt', title: 'Aufschlagen. Entdecken.', body: 'Goldene Details, starke Fotografien und Raum für Genuss. So bekommt jedes Gericht seinen Auftritt.' },
  { label: 'Die Vielfalt', title: 'Eine Seite. Neue Vorfreude.', body: 'Von süßen Klassikern bis zu herzhaften Spezialitäten: Jede Seite erzählt ihre eigene Geschichte.' },
  { label: 'Die Erinnerung', title: 'Was bleibt, ist der Geschmack.', body: 'Vier Gestaltungsbeispiele. Ein Gedanke: Ihr Menü soll nicht nur informieren, sondern Lust auf Ihr Restaurant machen.' },
]
const pages: { id: PhotoId; label: string }[] = [
  { id: 'menu-dessert', label: 'Desserts' }, { id: 'menu-korean', label: 'Asiatische Küche' },
  { id: 'menu-special', label: 'Spezialitäten' }, { id: 'menu-signature', label: 'Signature-Menü' },
]
function MenuImage({ index }: { index: number }) {
  return <Picture photo={photos[pages[index].id]} sizes="(min-width:1000px) 30vw, 48vw" />
}
function MenuBook({ progress: p, animated }: TourStageProps) {
  const { t } = useTranslation()
  const cover = useTransform(p, [.06, .23], [0, -180])
  const first = useTransform(p, [.39, .55], [0, -180])
  const second = useTransform(p, [.69, .85], [0, -180])
  const tilt = useTransform(p, [0, .25, 1], [14, 3, 0])
  const turn = useTransform(p, [0, .3, 1], [-7, -2, 0])
  const x = useTransform(p, [0, .23], ['-23%', '0%'])
  const coverDepth = useTransform(p, value => value < .15 ? 5 : 1)
  const firstDepth = useTransform(p, value => value < .47 ? 4 : 2)
  const secondDepth = useTransform(p, value => value < .77 ? 3 : 4)
  if (!animated) return <div className="menu-static-pages">{pages.map((page, i) => <figure key={page.id}><MenuImage index={i} /><figcaption>0{i + 1} · {t(page.label)}</figcaption></figure>)}</div>
  return <div className="menu-book-studio" aria-hidden="true">
    <motion.div className="menu-book" style={{ rotateX: tilt, rotateZ: turn, x }}>
      <div className="menu-book-base menu-book-base--left"><span>FOTO PANDA</span><strong>{t('Mit Liebe zum Detail.')}</strong><i>Édition gastronomique</i></div>
      <div className="menu-book-base menu-book-base--right"><span>04 / 04</span><strong>{t('Ihr Menü. Ihr Charakter.')}</strong><i>{t('Vom ersten Blick bis zum letzten Bissen.')}</i></div>
      <motion.div className="menu-book-leaf" style={{ rotateY: second, zIndex: secondDepth }}>
        <div className="menu-book-face menu-book-front"><MenuImage index={2} /></div>
        <div className="menu-book-face menu-book-back"><MenuImage index={3} /></div>
      </motion.div>
      <motion.div className="menu-book-leaf" style={{ rotateY: first, zIndex: firstDepth }}>
        <div className="menu-book-face menu-book-front"><MenuImage index={0} /></div>
        <div className="menu-book-face menu-book-back"><MenuImage index={1} /></div>
      </motion.div>
      <motion.div className="menu-book-leaf menu-book-cover" style={{ rotateY: cover, zIndex: coverDepth }}>
        <div className="menu-book-face menu-book-front"><span>FOTO PANDA · STUDIO</span><strong>À la<br />carte.</strong><div className="menu-cover-rule" /><i>{t('Geschichten, die Appetit machen.')}</i><small>PHOTOGRAPHY & FILM</small></div>
        <div className="menu-book-face menu-book-back menu-cover-inside"><span>FOTO PANDA</span><strong>{t('Mit Liebe zum Detail.')}</strong><i>Édition gastronomique</i></div>
      </motion.div>
    </motion.div>
    <p className="menu-book-caption">{t('Zum Blättern weiterscrollen')} <span>01 — 04</span></p>
  </div>
}
export function GastronomyTour() {
  const { t } = useTranslation()
  return <>
    <ScrollTour cinematic id="menu-tour" title="Eine Speisekarte. Viele Geschichten." chapters={chapters} to="/kontakt" cta="Ihr Menü gestalten lassen">{props => <MenuBook {...props} />}</ScrollTour>
    <div className="menu-page-links" data-tone="ink"><p>{t('Alle vier Entwürfe in voller Größe')}</p><div>{pages.map((page, i) => {
      const photo = photos[page.id]
      return <a key={page.id} href={`${photo.base}-${photo.widths.at(-1)}.jpg`} target="_blank" rel="noopener noreferrer">0{i + 1} · {t(page.label)}<ArrowUpRight size={15} aria-hidden /><span className="sr-only">{t(' (neuer Tab)')}</span></a>
    })}</div></div>
  </>
}

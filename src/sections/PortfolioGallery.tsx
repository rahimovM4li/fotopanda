import { useCallback, useMemo, useRef, useState } from 'react'
import { useScroll } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/LocalizedLink'

import { WorksWheel } from '@/components/ui/works-wheel'
import { Lightbox } from '@/components/portfolio/Lightbox'
import { mediaAlt } from '@/lib/mediaAlt'
import { useTranslation } from '@/i18n/LanguageProvider'
import type { MediaRef } from '@/types'
import { portfolio } from '@/data/content'
import { photos, livingMedia, type LivingMediaId } from '@/data/media'
import './portfolio-ribbon.css'

const titles: Record<string, string> = {
  'bridal-palace': 'Hochzeitsmomente', 'bridal-closeup': 'Brautporträt', wedding: 'Hochzeitsfilm',
  'business-portrait-01': 'Businessporträt', 'gastronomy-kitchen': 'Genuss in Bewegung', birthday: 'Geburtstagsfilm',
  'portrait-court-knees': 'Urban Portrait', 'bridal-full-length': 'Bridal Story', 'digital-card': 'Digitale Visitenkarte',
  'business-office-01': 'Business im Alltag', 'portrait-fence': 'Porträt im Grünen', 'school-album': 'Erinnerungen im Fotobuch',
  'bridal-editorial': 'Bridal Editorial',
}

/** The supplied WorksWheel geometry, driven by ordinary page scrolling on every device. */
export function PortfolioGallery({ items = portfolio.slice(0, 6) }: { items?: MediaRef[] }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const opener = useRef(0)
  const [index, setIndex] = useState<number | null>(null)
  const [origin, setOrigin] = useState<DOMRect | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const works = useMemo(() => items.map(item => {
    const image = item.kind === 'photo'
      ? `${photos[item.ref as keyof typeof photos].base}-${photos[item.ref as keyof typeof photos].widths.at(-1)}.webp`
      : `${livingMedia[item.ref as LivingMediaId].posterBase}.webp`
    const objectPosition = item.kind === 'photo' ? photos[item.ref as keyof typeof photos].objectPosition : livingMedia[item.ref as LivingMediaId].objectPosition
    const media = item.kind === 'photo' ? photos[item.ref as keyof typeof photos] : livingMedia[item.ref as LivingMediaId]
    const srcSet = item.kind === 'photo' ? photos[item.ref as keyof typeof photos].widths.map(width => `${photos[item.ref as keyof typeof photos].base}-${width}.webp ${width}w`).join(', ') : undefined
    return { width: media.intrinsic.width, height: media.intrinsic.height, srcSet, title: t(titles[item.ref] ?? mediaAlt(item)), alt: t(mediaAlt(item)), image, objectPosition }
  }), [items, t])
  const navigate = useCallback((turn: number) => {
    const section = ref.current
    if (!section || !items.length) return
    const top = window.scrollY + section.getBoundingClientRect().top
    const distance = section.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + distance * turn / items.length, behavior: 'smooth' })
  }, [items.length])
  const close = useCallback(() => {
    setIndex(null)
    requestAnimationFrame(() => {
      const buttons = ref.current?.querySelectorAll<HTMLButtonElement>('.works-wheel-index button')
      buttons?.[opener.current]?.focus({ preventScroll: true })
    })
  }, [])
  if (!items.length) return <p className="work-empty">{t('Keine Arbeiten in dieser Auswahl.')}</p>
  return <>
    <section ref={ref} className="works-wheel-scroll scene is-live" style={{ height: `${items.length === 1 ? 100 : Math.max(260, items.length * 32 + 160)}svh` }} data-tone="ink" aria-label={t('Unsere Arbeiten')}>
      <div className="works-wheel-sticky">
        <WorksWheel items={works} label={t('Unsere Arbeiten')} action={t('Ansehen')} progress={scrollYProgress} onTurnRequest={navigate} suspended={index !== null}
          onOpen={(i, bounds) => { opener.current = i; setOrigin(bounds); setIndex(i) }} />
        <p className="works-wheel-scroll-hint">{t('Scrollen, um die Arbeiten zu entdecken.')}</p>
      </div>
    </section>
    <div className="work-inquiry"><h2>{t('Als Nächstes: eure Geschichte.')}</h2><Link to="/kontakt">{t('Projekt besprechen')}<ArrowUpRight size={20} aria-hidden /></Link></div>
    <Lightbox items={items} index={index} onClose={close} onNavigate={setIndex} origin={origin} />
  </>
}

import './tour-cinema.css'
import './tour-scenes.css'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/LocalizedLink'

import { useTourMotion } from '@/hooks/useTourMotion'
import { useTranslation } from '@/i18n/LanguageProvider'

export type TourChapter = { title: string; body: string; label?: string }
export type TourStageProps = { progress: MotionValue<number>; animated: boolean }

/** Native scroll, finite hold, keyboard chapter navigation and a fully readable static edition. */
export function ScrollTour({ id, title, chapters, children, to, cta, cinematic = false }: {
  id: string; title: string; chapters: TourChapter[]; children: (props: TourStageProps) => ReactNode; to: string; cta: string; cinematic?: boolean
}) {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const animated = useTourMotion(cinematic)
  const [active, setActive] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(84)
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!header) return
    const update = () => setHeaderHeight(header.offsetHeight)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${headerHeight}px`, 'end end'] })
  const progress = useTransform(scrollYProgress, [0, .9, 1], [0, 1, 1])
  useMotionValueEvent(progress, 'change', (value) => setActive(Math.min(chapters.length - 1, Math.floor(value * chapters.length))))
  function jump(index: number) {
    const el = ref.current
    if (!el) return
    const top = window.scrollY + el.getBoundingClientRect().top
    const travel = el.offsetHeight - window.innerHeight + headerHeight
    window.scrollTo({ top: top - headerHeight + travel * .9 * ((index + .5) / chapters.length), behavior: 'smooth' })
  }
  return <section ref={ref} id={id} className={`scene scroll-tour ${cinematic ? 'tour-cinematic' : ''} ${animated ? 'tour-live is-live' : 'tour-rest is-rest'}`} data-scene={id} data-tone="ink" aria-labelledby={`${id}-title`}>
    <div className="tour-stage scene-stage">
      <div className="tour-heading"><div><p className="tour-eyebrow">{t('Lebendige Medien')}</p><h2 id={`${id}-title`}>{t(title)}</h2></div><a href={`#${id}-end`} className="tour-skip">{t('Tour überspringen')}<ArrowDown size={16} aria-hidden /></a></div>
      <div className="tour-composition">
        <div className="tour-copy">
          <div className="tour-chapters">{chapters.map((chapter, i) => <article id={`${id}-chapter-${i}`} key={chapter.title} hidden={animated && active !== i}>
            <p className="tour-chapter-index" aria-hidden>{String(i + 1).padStart(2, '0')} <span>/ {String(chapters.length).padStart(2, '0')}</span></p>
            <h3>{t(chapter.title)}</h3><p>{t(chapter.body)}</p>
          </article>)}</div>
          {animated && <div className="tour-navigation" role="group" aria-label={t('Kapitel auswählen')}>
            {chapters.map((chapter, i) => <button key={chapter.title} type="button" aria-label={t(chapter.title)} aria-controls={`${id}-chapter-${i}`} aria-pressed={active === i} onClick={() => jump(i)}><span aria-hidden>{String(i + 1).padStart(2, '0')}</span><span className="tour-navigation-label">{t(chapter.label ?? chapter.title)}</span></button>)}
          </div>}
          <Link to={to} className="text-link">{t(cta)}<ArrowUpRight size={18} aria-hidden /></Link>
        </div>
        <div className="tour-art">{children({ progress, animated })}</div>
      </div>
      {animated && <motion.div className="tour-progress" style={{ scaleX: progress }} aria-hidden />}
    </div>
    <div id={`${id}-end`} className="tour-end" />
  </section>
}

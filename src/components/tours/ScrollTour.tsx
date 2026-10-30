import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTourMotion } from '@/hooks/useTourMotion'
import { useTranslation } from '@/i18n/LanguageProvider'

export type TourChapter = { title: string; body: string }
export type TourStageProps = { progress: MotionValue<number>; animated: boolean }

/** Native scroll, finite hold, keyboard chapter navigation and a fully readable static edition. */
export function ScrollTour({ id, title, chapters, children, to, cta }: {
  id: string; title: string; chapters: TourChapter[]; children: (props: TourStageProps) => ReactNode; to: string; cta: string
}) {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const animated = useTourMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useTransform(scrollYProgress, [0, .9, 1], [0, 1, 1])
  useMotionValueEvent(progress, 'change', (value) => setActive(Math.min(chapters.length - 1, Math.floor(value * chapters.length))))
  function jump(index: number) {
    const el = ref.current
    if (!el) return
    const top = window.scrollY + el.getBoundingClientRect().top
    window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * .9 * ((index + .15) / chapters.length), behavior: 'instant' })
  }
  return <section ref={ref} id={id} className={`scene scroll-tour ${animated ? 'tour-live is-live' : 'tour-rest is-rest'}`} data-scene={id} data-tone="ink" aria-labelledby={`${id}-title`}>
    <div className="tour-stage scene-stage">
      <div className="tour-heading"><h2 id={`${id}-title`}>{t(title)}</h2><a href={`#${id}-end`} className="tour-skip">{t('Tour überspringen')}<ArrowDown size={16} aria-hidden /></a></div>
      <div className="tour-composition">
        <div className="tour-copy">
          <div className="tour-chapters">{chapters.map((chapter, i) => <article key={chapter.title} hidden={animated && active !== i}>
            <h3>{t(chapter.title)}</h3><p>{t(chapter.body)}</p>
          </article>)}</div>
          {animated && <div className="tour-navigation" role="group" aria-label={t('Kapitel auswählen')}>
            {chapters.map((chapter, i) => <button key={chapter.title} type="button" aria-label={t(chapter.title)} aria-pressed={active === i} onClick={() => jump(i)}><span /></button>)}
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

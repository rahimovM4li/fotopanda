import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useTourMotion } from '@/hooks/useTourMotion'
import { MediaStill } from '@/components/ui/MediaStill'
import { Lightbox } from '@/components/portfolio/Lightbox'
import { portfolio } from '@/data/content'
import { mediaAlt } from '@/lib/mediaAlt'
import { useTranslation } from '@/i18n/LanguageProvider'

const selection = portfolio.slice(0, 6)
export function PortfolioGallery() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const rail = useRef<HTMLUListElement>(null)
  const triggers = useRef<Array<HTMLButtonElement | null>>([])
  const opener = useRef(0)
  const [index, setIndex] = useState<number | null>(null)
  const [distance, setDistance] = useState(0)
  const [origin, setOrigin] = useState<DOMRect | null>(null)
  const animated = useTourMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, .94, 1], [0, -distance, -distance])
  useEffect(() => {
    const el = rail.current
    if (!el) return
    const resize = new ResizeObserver(() => setDistance(Math.max(0, el.scrollWidth - el.clientWidth)))
    resize.observe(el)
    return () => resize.disconnect()
  }, [])
  function jump(next: number) {
    const el = ref.current
    if (!el || !rail.current) return
    if (!animated) { rail.current.scrollBy({ left: next * rail.current.clientWidth * .8, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); return }
    const start = window.scrollY + el.getBoundingClientRect().top
    const hold = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: Math.max(start, Math.min(start + hold, window.scrollY + next * hold / 5)), behavior: 'instant' })
  }
  const close = useCallback(() => {
    setIndex(null)
    requestAnimationFrame(() => triggers.current[opener.current]?.focus({ preventScroll: true }))
  }, [])
  return <section ref={ref} className={`scene gallery-tour ${animated ? 'gallery-live is-live' : 'gallery-rest is-rest'}`} data-scene="portfolio-gallery" data-tone="ivory" aria-labelledby="gallery-title">
    <div className="gallery-stage scene-stage">
      <div className="gallery-heading"><h2 id="gallery-title">{t('Jedes Bild ein eigener Raum.')}</h2><div className="gallery-controls">
        <button type="button" onClick={() => jump(-1)} aria-label={t('Vorherige Arbeit')}><ArrowLeft aria-hidden size={20} /></button>
        <button type="button" onClick={() => jump(1)} aria-label={t('Nächste Arbeit')}><ArrowRight aria-hidden size={20} /></button>
      </div></div>
      <div className="gallery-window"><motion.ul ref={rail} className="gallery-rail" style={{ x: animated ? x : 0 }}>
        {selection.map((item, i) => <li key={item.ref}>
          <button type="button" ref={el => { triggers.current[i] = el }}
            onFocus={() => {
              if (!animated || !ref.current) return
              const top = window.scrollY + ref.current.getBoundingClientRect().top
              // Keyboard navigation brings each off-screen picture into the held stage.
              if (triggers.current[i]?.matches(':focus-visible')) window.scrollTo({ top: top + (ref.current.offsetHeight - window.innerHeight) * .94 * i / (selection.length - 1), behavior: 'instant' })
            }}
            onClick={e => { opener.current = i; setOrigin(e.currentTarget.getBoundingClientRect()); setIndex(i) }}
            aria-label={t('{title}. Große Ansicht öffnen.', { title: t(mediaAlt(item)) })}>
            <MediaStill media={item} sizes="(min-width:1000px) 44vw, 80vw" />
            {item.kind === 'living' && <span className="gallery-video-label">{t('Video')}</span>}
            <span className="gallery-open" aria-hidden><ArrowUpRight size={22} /></span>
          </button>
        </li>)}
      </motion.ul></div>
      <p className="gallery-instruction">{animated ? t('Scrollen, um die Galerie zu entdecken.') : t('Wischen zum Blättern')}</p>
    </div>
    <Lightbox items={selection} index={index} onClose={close} onNavigate={setIndex} origin={origin} />
  </section>
}

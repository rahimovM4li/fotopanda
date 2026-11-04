'use client'

import * as React from 'react'
import type { MotionValue } from 'motion/react'
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useTranslation } from '@/i18n/LanguageProvider'
import './works-wheel.css'

export interface WorksWheelItem { title: string; image: string; width: number; height: number; srcSet?: string; alt?: string; objectPosition?: string; href?: string }
export interface WorksWheelProps extends Omit<React.ComponentPropsWithoutRef<'section'>, 'children' | 'onSelect'> {
  items: WorksWheelItem[]
  label?: string
  action?: string
  /** Optional native page-scroll driver; the standalone wheel still supports wheel/drag. */
  progress?: MotionValue<number>
  onTurnRequest?: (turn: number) => void
  onOpen?: (index: number, origin: DOMRect) => void
  suspended?: boolean
}

// Geometry from the supplied WorksWheel: ring -> bowed vertical drum.
const CARD_H = .38, CARD_MAX_W = .34, CARD_RATIO = 1.45
const STEP = 40, DRUM = 2.22, LENS = 2.7, RING_R = 1.14, BOW = 1.82
const TITLE = .124, INDEX = .04, CULL = 1.6, WHEEL_UNITS = 900, DRAG_UNITS = 420, SETTLE = 140, EASE = .12
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const rad = (deg: number) => deg * Math.PI / 180
const bowAt = (deg: number, bow: number) => -bow * (1 - Math.cos(rad(deg)))
function place(ringDeg: number, drumDeg: number, ringR: number, drumR: number, bow: number, m: number) {
  return `translateX(${m * bowAt(drumDeg, bow)}px) rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px) rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
}

export function WorksWheel({ items, label = "Works '26", action = 'View', progress, onTurnRequest, onOpen, suspended = false, className, ...props }: WorksWheelProps) {
  const { t } = useTranslation()
  const stageRef = React.useRef<HTMLDivElement>(null)
  const wheelRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const labelRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLDivElement>(null)
  const turn = React.useRef(0)
  const target = React.useRef(0)
  const drag = React.useRef<number | null>(null)
  const moved = React.useRef(false)
  const settling = React.useRef(0)
  const [active, setActive] = React.useState(0)
  const [stage, setStage] = React.useState({ w: 0, h: 0 })
  const [reduced, setReduced] = React.useState(false)
  const count = items.length
  const last = Math.max(count - 1, 0)
  const id = React.useId()

  React.useEffect(() => {
    const button = document.getElementById(`${id}-index-${active}`)
    const list = button?.closest('ol')
    if (button && list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: button.offsetLeft - list.clientWidth / 2 + button.clientWidth / 2, behavior: reduced ? 'instant' : 'smooth' })
    }
  }, [active, id, reduced])

  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setReduced(query.matches)
    read(); query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])
  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    read(); const observer = new ResizeObserver(read); observer.observe(el)
    return () => observer.disconnect()
  }, [])
  React.useEffect(() => {
    if (!progress || suspended) return
    const update = (value: number) => { target.current = count === 1 ? 1 : clamp(value, 0, 1) * count }
    update(progress.get())
    return progress.on('change', update)
  }, [progress, count, suspended])

  const metrics = React.useMemo(() => {
    const mobile = stage.w < 768
    const cardW = Math.min(stage.h * (mobile ? .38 : CARD_H) * CARD_RATIO, stage.w * (mobile ? .78 : CARD_MAX_W))
    const cardH = cardW / CARD_RATIO
    // Preserve the source geometry on desktop; keep the whole ring inside a phone.
    const ringR = mobile ? Math.min(cardH * RING_R, stage.w * .32) : cardH * RING_R
    return { cardW, cardH, ringR, ringScale: count ? clamp(((2 * Math.PI * ringR / count) * .82) / (cardW || 1), .16, 1) : 1,
      drumR: cardH * DRUM, bow: cardH * BOW, depth: cardH * LENS, title: Math.max(22, cardH * TITLE), index: Math.max(12, cardH * INDEX) }
  }, [stage, count])

  React.useEffect(() => {
    if (!stage.h || reduced) return
    let frame = 0
    let drawn = NaN
    let previousTime = 0
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      if (suspended) return
      const elapsed = previousTime ? Math.min(time - previousTime, 100) : 16.667
      previousTime = time
      const blend = 1 - Math.pow(1 - EASE, elapsed / 16.667)
      const gap = target.current - turn.current
      turn.current = Math.abs(gap) < .0005 ? target.current : turn.current + gap * blend
      const value = turn.current
      if (drawn === value) return
      drawn = value
      const m = clamp(value, 0, 1)
      const pos = Math.max(0, value - 1)
      if (wheelRef.current) wheelRef.current.style.transform = `translateZ(${-m * metrics.drumR}px)`
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const d = i - pos
        const culled = m > .5 && Math.abs(d) > CULL
        card.style.transform = place(d * (360 / count), d * STEP, metrics.ringR, metrics.drumR, metrics.bow, m)
        card.style.opacity = culled ? '0' : '1'
        card.style.visibility = culled ? 'hidden' : 'visible'
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2))
        card.dataset.front = String(m > .95 && Math.abs(d) < .3)
        const face = card.firstElementChild as HTMLElement | null
        if (face) face.style.transform = `scale(${lerp(metrics.ringScale, 1, m)})`
      })
      if (labelRef.current) labelRef.current.style.opacity = String(1 - m)
      if (titleRef.current) titleRef.current.style.opacity = String(m)
      const near = clamp(Math.round(pos), 0, last)
      setActive(previous => previous === near ? previous : near)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [metrics, stage.h, count, last, reduced, suspended])

  const to = React.useCallback((next: number) => {
    const value = clamp(next, 0, count)
    target.current = value
    if (reduced) setActive(clamp(Math.round(value - 1), 0, last))
    else onTurnRequest?.(value)
  }, [count, last, onTurnRequest, reduced])
  React.useEffect(() => {
    const el = stageRef.current
    if (!el || progress || reduced) return
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS
      if (next > 0 && next < count) event.preventDefault()
      to(next)
      clearTimeout(settling.current)
      settling.current = window.setTimeout(() => to(Math.round(target.current)), SETTLE)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => { el.removeEventListener('wheel', onWheel); clearTimeout(settling.current) }
  }, [to, count, progress, reduced])

  function open(index: number, node: HTMLElement) {
    if (moved.current) { moved.current = false; return }
    onOpen?.(index, node.getBoundingClientRect())
  }
  return <section className={cn('works-wheel', reduced && 'works-wheel--reduced', className)} aria-label={label} {...props}>
    <div ref={stageRef} className={cn('works-wheel-stage', !progress && 'works-wheel-stage--drag')} tabIndex={0} role="group" aria-label={label}
      style={{ perspective: `${metrics.depth}px` }}
      onPointerDown={event => { if (progress || reduced) return; drag.current = event.clientY; moved.current = false }}
      onPointerMove={event => {
        if (drag.current === null) return
        const delta = drag.current - event.clientY
        if (Math.abs(delta) > 3) { moved.current = true; event.currentTarget.setPointerCapture(event.pointerId) }
        to(target.current + delta / DRAG_UNITS); drag.current = event.clientY
      }}
      onPointerUp={() => { drag.current = null; if (!progress && target.current > 1) to(Math.round(target.current)) }}
      onPointerCancel={() => { drag.current = null }}
      onKeyDown={event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') to(Math.round(target.current) + 1)
        else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') to(Math.round(target.current) - 1)
        else return
        event.preventDefault()
      }}>
      <div ref={wheelRef} className="works-wheel-drum">
        {items.map((item, i) => <div key={`${item.title}-${i}`} ref={node => { cardRefs.current[i] = node }} className="works-wheel-card" style={{ width: metrics.cardW, height: metrics.cardH, marginLeft: -metrics.cardW / 2, marginTop: -metrics.cardH / 2 }}>
          <div className="works-wheel-face">
            {item.href && !onOpen ? <a href={item.href} className="works-wheel-image" aria-label={item.title}><img width={item.width} height={item.height} srcSet={item.srcSet} sizes="(min-width: 768px) 34vw, 78vw" loading="lazy" decoding="async" src={item.image} alt={item.alt ?? item.title} draggable={false} style={{ objectPosition: item.objectPosition }} /></a> :
              <button type="button" className="works-wheel-image" tabIndex={reduced || active === i ? 0 : -1} aria-label={t('{title}. Große Ansicht öffnen.', { title: item.title })} onClick={event => open(i, event.currentTarget)}><img width={item.width} height={item.height} srcSet={item.srcSet} sizes="(min-width: 768px) 34vw, 78vw" loading="lazy" decoding="async" src={item.image} alt={item.alt ?? item.title} draggable={false} style={{ objectPosition: item.objectPosition }} /></button>}
            {(item.href || onOpen) && action && <span className="works-wheel-action" aria-hidden><ArrowUpRight size={14} />{action}</span>}
          </div>
        </div>)}
      </div>
    </div>
    <div ref={labelRef} className="works-wheel-label" style={{ fontSize: metrics.title }}>{label}</div>
    <div ref={titleRef} className="works-wheel-title" style={{ fontSize: metrics.title }} aria-live="polite"><span>{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>{items[active]?.title}</div>
    <ol className="works-wheel-index" aria-label={t('Arbeit auswählen')} style={{ fontSize: metrics.index }}>
      {items.map((item, i) => <li key={`${item.title}-${i}`}><button id={`${id}-index-${i}`} type="button" onClick={() => to(i + 1)} aria-pressed={active === i}><span className="works-wheel-index-number">{String(i + 1).padStart(2, '0')}</span><span className="works-wheel-index-title">{item.title}</span></button></li>)}
    </ol>
    <div className="works-wheel-controls"><button type="button" onClick={() => to(Math.round(target.current) - 1)} aria-label={t('Vorherige Arbeit')}><ChevronUp size={20} /></button><button type="button" onClick={() => to(Math.round(target.current) + 1)} aria-label={t('Nächste Arbeit')}><ChevronDown size={20} /></button></div>
  </section>
}

export default WorksWheel


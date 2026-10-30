import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTourMotion } from '@/hooks/useTourMotion'
import { MediaStill } from '@/components/ui/MediaStill'

/** One photographic object bridges the hero and the first held story.
 * The portal avoids transformed page ancestors. Three bounds are read before
 * compositor-only writes; no wheel interception, duplicated focus or video.
 */
export function ImageHandoff() {
  const enabled = useTourMotion()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!enabled) return
    const source = document.querySelector<HTMLElement>('.hero-main-photo')
    const target = document.querySelector<HTMLElement>('#photo-film .cinema-print')
    const section = document.getElementById('photo-film')
    const overlay = ref.current
    if (!source || !target || !overlay || !section) return
    const incoming = overlay.querySelector<HTMLElement>('.handoff-incoming')!
    let frame = 0
    let hidden = false
    const restore = () => {
      if (hidden) {
        source.style.visibility = ''
        target.style.visibility = ''
        hidden = false
      }
      overlay.style.visibility = 'hidden'
    }
    const update = () => {
      frame = 0
      const a = source.getBoundingClientRect()
      const b = target.getBoundingClientRect()
      const from = innerHeight * .85 - a.bottom
      const to = section.getBoundingClientRect().top - 84
      if (from <= 0 || to <= 0 || a.bottom < -innerHeight * 2 || target.contains(document.activeElement) || document.querySelector('[role=dialog]')) { restore(); return }
      const p = from / (from + to)
      const mix = (start: number, end: number) => start + (end - start) * p
      overlay.style.width = `${a.width}px`
      overlay.style.height = `${a.height}px`
      overlay.style.transform = `translate3d(${mix(a.left, b.left)}px, ${mix(innerHeight * .85 - a.height, b.top)}px, 0) scale(${mix(1, b.width / a.width)}, ${mix(1, b.height / a.height)})`
      incoming.style.opacity = String(Math.max(0, (p - .55) / .45))
      overlay.style.visibility = 'visible'
      source.style.visibility = 'hidden'
      target.style.visibility = 'hidden'
      hidden = true
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); restore() }
  }, [enabled])
  if (!enabled) return null
  return createPortal(<div ref={ref} className="image-handoff" aria-hidden>
    <MediaStill media={{ kind: 'photo', ref: 'bridal-full-length' }} sizes="56vw" />
    <div className="handoff-incoming"><MediaStill media={{ kind: 'living', ref: 'wedding' }} sizes="45vw" /></div>
  </div>, document.body)
}

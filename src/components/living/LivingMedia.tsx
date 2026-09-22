import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { AlertCircle, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CTA_PRIMARY, CONTACT_PATH } from '@/data/content'
import { cn } from '@/lib/cn'
import type { LivingMediaItem } from '@/types'
import { useActiveMedia } from './ActiveMediaContext'

type State = 'poster' | 'loading' | 'playing' | 'paused' | 'ended' | 'error'

interface LivingMediaProps {
  item: LivingMediaItem
  hint?: string
  priority?: boolean
  showCta?: boolean
  showStatus?: boolean
  className?: string
  aspectClassName?: string
  radiusClassName?: string
}

/** Explicit playback, stable framing, and a single active video across the page. */
export function LivingMedia({
  item, hint = 'Foto zum Leben erwecken', priority = false, showCta = true,
  showStatus = true, className, aspectClassName, radiusClassName = 'rounded-media',
}: LivingMediaProps) {
  const [state, setState] = useState<State>('poster')
  const [muted, setMuted] = useState(true)
  const [ctaVisible, setCtaVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const playbackRequest = useRef(0)
  const instanceId = useId()
  const { activeId, claim, release } = useActiveMedia()
  const reduce = useReducedMotion()
  const live = state === 'playing' || state === 'paused' || state === 'ended'

  const pause = useCallback(() => {
    playbackRequest.current += 1
    videoRef.current?.pause()
    setState((current) => current === 'loading' ? 'poster' : current === 'playing' ? 'paused' : current)
    release(instanceId)
  }, [instanceId, release])

  useEffect(() => {
    if (activeId !== instanceId) pause()
  }, [activeId, instanceId, pause])

  // Pause when the media is no longer visible; never resume without a click.
  useEffect(() => {
    const frame = frameRef.current
    const video = videoRef.current
    const onVisibility = () => { if (document.hidden) pause() }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) pause()
    })
    if (frame) observer.observe(frame)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      playbackRequest.current += 1
      video?.pause()
      release(instanceId)
    }
  }, [instanceId, pause, release])

  useEffect(() => {
    if (state !== 'playing' || !showCta || ctaVisible) return
    const timer = window.setTimeout(() => setCtaVisible(true), 1500)
    return () => window.clearTimeout(timer)
  }, [state, showCta, ctaVisible])

  const fail = useCallback(() => {
    playbackRequest.current += 1
    videoRef.current?.pause()
    setState('error')
    setCtaVisible(false)
    release(instanceId)
  }, [instanceId, release])

  const play = async () => {
    const video = videoRef.current
    if (!video) return
    const request = ++playbackRequest.current
    if (state === 'ended') video.currentTime = 0
    if (state === 'error') video.load()
    claim(instanceId)
    setState('loading')
    try {
      await video.play()
      if (request !== playbackRequest.current) return
      setState('playing')
    } catch {
      // A pause or a newer request deliberately aborts pending playback.
      if (request === playbackRequest.current) fail()
    }
  }

  const toggle = () => {
    if (state === 'playing' || state === 'loading') pause()
    else void play()
  }
  const label = state === 'playing' ? 'Video pausieren'
    : state === 'loading' ? 'Laden abbrechen'
    : state === 'ended' ? 'Video erneut abspielen'
    : state === 'paused' ? 'Video fortsetzen'
    : state === 'error' ? 'Erneut versuchen' : hint

  return (
    <figure className={cn('relative', className)}>
      <div ref={frameRef} className={cn('media-frame relative w-full @container', radiusClassName, aspectClassName ?? item.aspect)}>
        <picture className="absolute inset-0 block h-full w-full">
          <source type="image/avif" srcSet={`${item.posterBase}.avif`} />
          <source type="image/webp" srcSet={`${item.posterBase}.webp`} />
          <img src={`${item.posterBase}.jpg`} alt={item.alt}
            width={item.intrinsic.width} height={item.intrinsic.height}
            loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}
            decoding="async" className="h-full w-full object-cover"
            style={{ objectPosition: item.objectPosition }} />
        </picture>
        <motion.video ref={videoRef} initial={false} animate={{ opacity: live ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: item.objectPosition }}
          src={item.video} preload="none" playsInline muted={muted}
          onPause={() => {
            if (videoRef.current?.paused && state === 'playing') {
              setState('paused')
              release(instanceId)
            }
          }}
          onEnded={() => { setState('ended'); setCtaVisible(showCta); release(instanceId) }}
          onError={fail} aria-label={item.title} />
        {showStatus && (
          <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.625rem] font-semibold tracking-[0.12em] text-on-ink uppercase">
            {live ? 'Video' : 'Foto mit Video'}
          </span>
        )}
        <div className={cn('absolute inset-0 flex flex-col p-3 sm:p-4',
          live ? 'justify-end bg-gradient-to-t from-ink/75 via-transparent to-transparent'
            : 'items-center justify-center gap-4 bg-ink/25', state === 'error' && 'bg-ink/85')}>
          {state === 'error' && (
            <div role="alert" className="flex max-w-[30ch] flex-col items-center gap-2 text-center text-sm text-on-ink">
              <AlertCircle className="h-6 w-6" aria-hidden />
              Das Video lässt sich gerade nicht abspielen.
            </div>
          )}
          <div className={cn('flex items-center gap-2', live && 'justify-between')}>
            <div className="flex items-center gap-2">
              {/* Keep this button mounted so keyboard focus survives every state change. */}
              <button type="button" onClick={toggle} aria-label={`${item.title}: ${label}`}
                className={cn('grid shrink-0 cursor-pointer place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand',
                  live ? 'h-11 w-11 bg-ink/85 text-on-ink hover:bg-ink' : 'h-16 w-16 bg-brand text-ink hover:bg-brand-soft')}>
                {state === 'playing' || state === 'loading' ? <Pause className="h-5 w-5" aria-hidden />
                  : state === 'ended' ? <RotateCcw className="h-5 w-5" aria-hidden />
                    : <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />}
              </button>
              {live && item.hasAudio && (
                <button type="button" onClick={() => setMuted((current) => !current)}
                  aria-pressed={!muted} aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
                  className="grid h-11 w-11 place-items-center rounded-full bg-ink/85 text-on-ink transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                  {muted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
                </button>
              )}
            </div>
            {live && ctaVisible && showCta && <Button as="link" to={CONTACT_PATH} size="md">{CTA_PRIMARY}</Button>}
          </div>
          {!live && <span aria-live="polite" className="max-w-full rounded-full bg-ink/80 px-3 py-1.5 text-center text-xs font-semibold text-on-ink">
            {state === 'loading' ? 'Video wird geladen · Tippen zum Abbrechen' : label}
          </span>}
        </div>
      </div>
      <figcaption className="sr-only">{item.alt}</figcaption>
    </figure>
  )
}

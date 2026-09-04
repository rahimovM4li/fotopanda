import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { AlertCircle, ArrowRight, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CTA_PRIMARY, CONTACT_PATH } from '@/data/content'
import { cn } from '@/lib/cn'
import type { LivingMediaItem } from '@/types'
import { useActiveMedia } from './ActiveMediaContext'

/**
 * Das Kernerlebnis: ein Foto, das auf Tippen zum Video wird.
 *
 *   poster -> loading -> playing <-> paused -> ended
 *                |
 *                +-----> error -> poster
 *
 * Der Übergang ist bewusst kein Bildtausch. Poster und Video überblenden
 * gegeneinander, dabei zieht das Poster in die Unschärfe und leicht auf,
 * während das Video aus der Unschärfe kommt und sich setzt. Eine schmale
 * Lichtkante läuft einmal quer durch. Zusammen liest sich das als ein
 * Standbild, das zu atmen beginnt, statt als zwei Elemente, von denen eines
 * verschwindet.
 *
 * Grundregeln bleiben: kein Autoplay beim Seitenaufruf, kein Ton ohne
 * Interaktion, feste Kastenmaße, und der Primär-CTA erscheint erst, wenn der
 * Besucher das Erlebnis wirklich gesehen hat.
 */

type State = 'poster' | 'loading' | 'playing' | 'paused' | 'ended' | 'error'

const CTA_DELAY_MS = 1500

interface LivingMediaProps {
  item: LivingMediaItem
  hint?: string
  priority?: boolean
  showCta?: boolean
  /** Der PHOTO → MOTION Zustandsanzeiger. Im Raster zu kleinteilig. */
  showStatus?: boolean
  className?: string
  aspectClassName?: string
  /** Rahmenradius, damit Vollbild-Bühnen kantig laufen können */
  radiusClassName?: string
}

export function LivingMedia({
  item,
  hint = 'Foto zum Leben erwecken',
  priority = false,
  showCta = true,
  showStatus = true,
  className,
  aspectClassName,
  radiusClassName = 'rounded-media',
}: LivingMediaProps) {
  const [state, setState] = useState<State>('poster')
  const [muted, setMuted] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [sweep, setSweep] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const ctaTimer = useRef<number | null>(null)
  const sweepTimer = useRef<number | null>(null)
  const labelId = useId()
  /* Die Ausschließlichkeit hängt an der Einheit, nicht am Medium. Dasselbe
     Video kann zweimal auf einer Seite stehen; mit `item.id` als Schlüssel
     hielten sich die beiden gegenseitig für sich selbst und keine pausierte. */
  const instanceId = useId()

  const { activeId, claim, release } = useActiveMedia()
  const reduce = useReducedMotion()

  const live = state === 'playing' || state === 'paused' || state === 'ended'
  const posterVisible = state === 'poster' || state === 'loading' || state === 'error'

  const clearTimers = useCallback(() => {
    if (ctaTimer.current !== null) window.clearTimeout(ctaTimer.current)
    if (sweepTimer.current !== null) window.clearTimeout(sweepTimer.current)
    ctaTimer.current = null
    sweepTimer.current = null
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  /* Eine andere Einheit hat übernommen: hier pausieren. */
  useEffect(() => {
    if (activeId !== instanceId && (state === 'playing' || state === 'loading')) {
      videoRef.current?.pause()
      if (ctaTimer.current !== null) window.clearTimeout(ctaTimer.current)
      ctaTimer.current = null
      setState((s) => (s === 'loading' ? 'poster' : 'paused'))
    }
  }, [activeId, instanceId, state])

  const startCtaTimer = useCallback(() => {
    if (!showCta || ctaVisible) return
    if (ctaTimer.current !== null) window.clearTimeout(ctaTimer.current)
    ctaTimer.current = window.setTimeout(() => setCtaVisible(true), CTA_DELAY_MS)
  }, [showCta, ctaVisible])

  const activate = useCallback(async () => {
    claim(instanceId)
    setState('loading')
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setState('playing')
      setSweep(true)
      sweepTimer.current = window.setTimeout(() => setSweep(false), 900)
      startCtaTimer()
    } catch {
      clearTimers()
      setState('error')
      release(instanceId)
    }
  }, [claim, release, instanceId, startCtaTimer, clearTimers])

  const pause = useCallback(() => {
    videoRef.current?.pause()
    if (ctaTimer.current !== null) window.clearTimeout(ctaTimer.current)
    ctaTimer.current = null
    setState('paused')
  }, [])

  const resume = useCallback(async () => {
    claim(instanceId)
    try {
      await videoRef.current?.play()
      setState('playing')
      startCtaTimer()
    } catch {
      setState('error')
    }
  }, [claim, instanceId, startCtaTimer])

  const restart = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    claim(instanceId)
    try {
      await video.play()
      setState('playing')
    } catch {
      setState('error')
    }
  }, [claim, instanceId])

  const toggle = useCallback(() => {
    if (state === 'poster' || state === 'error') return activate()
    if (state === 'playing') return pause()
    if (state === 'paused') return resume()
    if (state === 'ended') return restart()
  }, [state, activate, pause, resume, restart])

  const onEnded = useCallback(() => {
    clearTimers()
    setState('ended')
    if (showCta) setCtaVisible(true)
    release(instanceId)
  }, [clearTimers, release, instanceId, showCta])

  const onError = useCallback(() => {
    clearTimers()
    setCtaVisible(false)
    setState('error')
    release(instanceId)
  }, [clearTimers, release, instanceId])

  const ease = [0.16, 1, 0.3, 1] as const
  const dur = reduce ? 0 : 0.72

  return (
    <figure className={cn('group relative', className)}>
      <div
        className={cn(
          /* Container-Query statt Breakpoints: Die Einheit steht mal über die
             halbe Seite, mal als 160-Pixel-Kachel. Wie groß Symbol und Hinweis
             sein müssen, hängt an ihrer eigenen Breite, nicht am Viewport. */
          'media-frame relative w-full @container',
          radiusClassName,
          aspectClassName ?? item.aspect,
        )}
      >
        {/* Poster. Zieht beim Wechsel in die Unschärfe, statt einfach zu gehen. */}
        <AnimatePresence>
          {posterVisible && (
            <motion.picture
              key="poster"
              initial={false}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.05, filter: 'blur(14px)' }}
              transition={{ duration: dur, ease }}
              className="absolute inset-0 block h-full w-full"
            >
              <source type="image/avif" srcSet={`${item.posterBase}.avif`} />
              <source type="image/webp" srcSet={`${item.posterBase}.webp`} />
              <img
                src={`${item.posterBase}.jpg`}
                alt={item.alt}
                width={item.intrinsic.width}
                height={item.intrinsic.height}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding={priority ? 'sync' : 'async'}
                style={{
                  objectPosition: item.objectPosition,
                  backgroundImage: item.lqip ? `url("${item.lqip}")` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: item.objectPosition ?? '50% 50%',
                }}
                className="h-full w-full object-cover"
              />
            </motion.picture>
          )}
        </AnimatePresence>

        {/* Video. preload="none": vor dem ersten play() geht keine einzige
            Videoanfrage raus, auch keine Metadaten. */}
        <motion.video
          ref={videoRef}
          initial={false}
          animate={
            live
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : reduce
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.07, filter: 'blur(18px)' }
          }
          transition={{ duration: dur, ease }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: item.objectPosition }}
          src={item.video}
          preload="none"
          playsInline
          muted={muted}
          onEnded={onEnded}
          onError={onError}
          onPlaying={() => setState('playing')}
          aria-label={item.title}
        />

        {/* Lichtkante, die einmal durchläuft, wenn das Bild lebendig wird. */}
        <AnimatePresence>
          {sweep && !reduce && (
            <motion.div
              key="sweep"
              aria-hidden
              initial={{ x: '-120%' }}
              animate={{ x: '120%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
              className="pointer-events-none absolute inset-y-0 w-1/3 mix-blend-screen"
              style={{
                background:
                  'linear-gradient(100deg, transparent, color-mix(in oklab, var(--color-brand-soft) 55%, transparent), transparent)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Zustandsanzeiger: macht den Übergang benennbar. */}
        {showStatus && (
          <div className="pointer-events-none absolute top-3 left-3 z-20 hidden items-center gap-1.5 rounded-full bg-ink/65 px-2.5 py-1 font-display text-[0.625rem] font-bold tracking-[0.14em] text-on-ink uppercase backdrop-blur-md @[20rem]:flex @[36rem]:top-4 @[36rem]:left-4">
            <span className={cn('transition-opacity duration-500', live ? 'opacity-35' : 'opacity-100')}>
              Foto
            </span>
            <ArrowRight
              className={cn(
                'h-3 w-3 transition-colors duration-500',
                live ? 'text-brand' : 'text-on-ink/35',
              )}
              aria-hidden
            />
            <span
              className={cn(
                'transition-colors duration-500',
                live ? 'text-brand' : 'text-on-ink/35',
              )}
            >
              Video
            </span>
          </div>
        )}

        {/* Ladeanzeige. Das Poster bleibt darunter sichtbar. */}
        <AnimatePresence>
          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-ink/45"
            >
              <span className="sr-only" role="status">
                Video wird geladen
              </span>
              <span
                aria-hidden
                className="h-9 w-9 animate-spin rounded-full border-2 border-on-ink/25 border-t-brand"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Aufforderung im Poster-Zustand */}
        <AnimatePresence>
          {state === 'poster' && (
            <motion.button
              key="cue"
              type="button"
              onClick={activate}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
              aria-describedby={labelId}
              className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-4 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/25 transition-colors duration-500 hover:from-ink/80"
            >
              <span className="relative grid h-14 w-14 place-items-center @[22rem]:h-[4.5rem] @[22rem]:w-[4.5rem]">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-brand/70 motion-safe:animate-[pulse-ring_2.6s_var(--ease-out-quart)_infinite]"
                />
                <span
                  aria-hidden
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand text-ink shadow-[0_12px_40px_-8px_color-mix(in_oklab,var(--color-brand)_80%,transparent)] transition-transform duration-500 ease-out group-hover:scale-108 @[22rem]:h-16 @[22rem]:w-16"
                >
                  <Play className="ml-0.5 h-5 w-5 fill-current @[22rem]:ml-1 @[22rem]:h-6 @[22rem]:w-6" strokeWidth={0} />
                </span>
              </span>
              {/* Auf sehr schmalen Kacheln würde der Hinweis umbrechen und das
                  Bild zudecken; dort trägt das Symbol allein. */}
              <span className="hidden rounded-full bg-ink/60 px-3.5 py-1.5 font-display text-[0.8125rem] font-bold tracking-[-0.01em] text-on-ink backdrop-blur-md @[20rem]:block">
                {hint}
              </span>
              <span id={labelId} className="sr-only">
                {`${item.title}: Das Foto wird zum Video.`}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Fehlerfall: zurück zum Poster, mit Hinweis und Wiederholung. */}
        <AnimatePresence>
          {state === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-ink/85 px-6 text-center"
            >
              <AlertCircle className="h-7 w-7 text-brand-soft" aria-hidden />
              <p role="alert" className="max-w-[30ch] text-sm text-on-ink/85">
                Das Video lässt sich gerade nicht abspielen.
              </p>
              <button
                type="button"
                onClick={activate}
                className="min-h-11 rounded-full border border-on-ink/30 px-5 font-display text-sm font-bold text-on-ink transition-colors hover:bg-on-ink/10"
              >
                Erneut versuchen
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steuerung während und nach der Wiedergabe */}
        {live && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/85 to-transparent p-3 sm:p-4">
            <div className="pointer-events-auto flex gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label={
                  state === 'playing'
                    ? 'Video pausieren'
                    : state === 'ended'
                      ? 'Video erneut abspielen'
                      : 'Video fortsetzen'
                }
                className="grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-on-ink backdrop-blur-md transition-colors hover:bg-ink/90"
              >
                {state === 'playing' ? (
                  <Pause className="h-4 w-4 fill-current" strokeWidth={0} />
                ) : state === 'ended' ? (
                  <RotateCcw className="h-4 w-4" />
                ) : (
                  <Play className="ml-0.5 h-4 w-4 fill-current" strokeWidth={0} />
                )}
              </button>

              {item.hasAudio && (
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  aria-pressed={muted}
                  aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
                  className="grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-on-ink backdrop-blur-md transition-colors hover:bg-ink/90"
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span className="sr-only">{muted ? 'Ton ist aus' : 'Ton ist an'}</span>
                </button>
              )}
            </div>

            <AnimatePresence>
              {ctaVisible && showCta && (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease }}
                  className="pointer-events-auto"
                >
                  <Button as="link" to={CONTACT_PATH} size="md">
                    {CTA_PRIMARY}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <figcaption className="sr-only">{item.alt}</figcaption>
    </figure>
  )
}

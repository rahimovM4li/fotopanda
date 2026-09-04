import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { LivingMedia } from '@/components/living/LivingMedia'
import { livingStory } from '@/data/content'
import { livingMedia } from '@/data/media'
import { cn } from '@/lib/cn'

const item = livingMedia['living-album']

/**
 * Die Scroll-Erzählung: aus einem Standbild wird über drei Stationen ein Film.
 *
 * Auf Desktop steht das Medium fest, während der Text darunter durchläuft.
 * Der Fortschritt steuert Unschärfe, Maßstab und Überblendung; ab Station 02
 * läuft der Film, stumm und mit sichtbarer Tonschaltung.
 *
 * Das ist die einzige Stelle der Seite, an der Bewegtbild ohne Klick startet.
 * Sie ist bewusst unterhalb des ersten Bildschirms: Der erste Eindruck bleibt
 * ein Foto, und die Wiedergabe beginnt erst, nachdem der Besucher gescrollt
 * hat. Alle anderen Einheiten bleiben tippgesteuert.
 *
 * Auf schmalen Viewports entfällt die Bühne. Dort stehen die drei Stationen
 * untereinander und das Medium ist eine gewöhnliche Foto-zu-Video-Einheit,
 * die auf Tippen reagiert.
 */
export function LivingStory() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stage, setStage] = useState(0)
  const [muted, setMuted] = useState(true)
  /* Erst scharfstellen, wenn die Bühne in die Nähe kommt: Sonst holt der
     Browser schon beim Seitenaufruf Videodaten für einen Abschnitt, der
     zwei Bildschirme weiter unten liegt. */
  const [armed, setArmed] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  /* Kein Kreuzblenden: Läge das Video halbtransparent über dem Poster und
     wären beide unscharf, entstünde in der Mitte des Übergangs ein Matsch
     aus zwei Bildern. Stattdessen wischt das Video über das Poster, beide
     bleiben scharf. Weil das Poster ein Standbild desselben Videos ist,
     liest sich das als ein Bild, das von links zu laufen beginnt. */
  const wipe = useTransform(scrollYProgress, [0.24, 0.5], [100, 0])
  const wipeClip = useTransform(wipe, (v) => `inset(0 ${v}% 0 0)`)
  const wipeEdge = useTransform(wipe, (v) => `${100 - v}%`)
  const edgeOpacity = useTransform(scrollYProgress, [0.22, 0.26, 0.48, 0.54], [0, 1, 1, 0])
  const frameScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    /* Ein IntersectionObserver auf dem Container taugt hier nicht: Er ist
       280vh hoch und schneidet den Sichtbereich schon beim Seitenaufruf.
       Der Fortschritt steht dagegen erst dann über null, wenn die Bühne
       oben ankommt, und bis zur ersten Bewegung bleiben rund 400 Pixel
       Scrollweg, um die Metadaten zu holen. */
    if (p > 0.001) setArmed(true)
    const next = p < 0.3 ? 0 : p < 0.62 ? 1 : 2
    setStage((current) => (current === next ? current : next))
  })

  /* Ab Station 02 läuft der Film, davor steht er still. */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (stage >= 1) {
      void video.play().catch(() => {
        /* Blockiert der Browser die stumme Wiedergabe, bleibt das Poster
           stehen. Kein Fehlerzustand: Es fehlt nur die Bewegung. */
      })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [stage])

  return (
    <>
      {/* ---------------- Desktop: feste Bühne, laufender Text ------------- */}
      <section
        data-tone="ink"
        className="relative isolate hidden bg-ink text-on-ink grain lg:block"
      >
        <div ref={ref} className="relative h-[280vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div
              aria-hidden
              className="glow-warm top-1/2 right-[-6rem] h-[40rem] w-[40rem] -translate-y-1/2 opacity-35"
            />

            <div className="relative mx-auto grid w-full max-w-[92rem] grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center gap-14 px-12">
              {/* Stationen */}
              <div>
                <Eyebrow>{livingStory.eyebrow}</Eyebrow>
                <MaskReveal
                  as="h2"
                  lines={[
                    ...livingStory.headlineLines,
                    <span className="text-brand">{livingStory.headlineAccent}</span>,
                  ]}
                  className="mt-6 font-display text-h2 leading-[0.98] font-bold tracking-[-0.038em]"
                />

                <ol className="mt-12 flex flex-col">
                  {livingStory.steps.map((step, i) => {
                    const active = stage === i
                    const passed = stage > i
                    return (
                      <li
                        key={step.number}
                        className={cn(
                          'relative border-l py-5 pl-7 transition-colors duration-500',
                          active ? 'border-brand' : 'border-ink-line',
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'absolute top-7 -left-[5px] h-2.5 w-2.5 rounded-full transition-all duration-500',
                            active
                              ? 'scale-125 bg-brand'
                              : passed
                                ? 'bg-brand/45'
                                : 'bg-ink-line-2',
                          )}
                        />
                        <div className="flex items-baseline gap-3">
                          <span
                            className={cn(
                              'font-display text-xs font-bold tracking-[0.14em] transition-colors duration-500 tabular',
                              active ? 'text-brand' : 'text-on-ink-faint',
                            )}
                          >
                            {step.number}
                          </span>
                          <h3
                            className={cn(
                              'text-h3 transition-colors duration-500',
                              active ? 'text-on-ink' : 'text-on-ink-muted',
                            )}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p
                          className={cn(
                            'mt-2 max-w-[38ch] text-[0.9375rem] transition-colors duration-500',
                            active ? 'text-on-ink-soft' : 'text-on-ink-faint',
                          )}
                        >
                          {step.body}
                        </p>
                      </li>
                    )
                  })}
                </ol>

                <motion.div
                  animate={{ opacity: stage === 2 ? 1 : 0, y: stage === 2 ? 0 : 10 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10"
                >
                  <Button as="link" to={livingStory.cta.to} variant="outline" size="lg">
                    {livingStory.cta.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Button>
                </motion.div>
              </div>

              {/* Bühne */}
              <motion.div style={reduce ? undefined : { scale: frameScale }} className="relative">
                <div className="media-frame relative aspect-[16/10] rounded-frame shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]">
                  <picture className="absolute inset-0 block h-full w-full">
                    <source type="image/avif" srcSet={`${item.posterBase}.avif`} />
                    <source type="image/webp" srcSet={`${item.posterBase}.webp`} />
                    <img
                      src={`${item.posterBase}.jpg`}
                      alt={item.alt}
                      width={item.intrinsic.width}
                      height={item.intrinsic.height}
                      loading="lazy"
                      decoding="async"
                      style={{
                        objectPosition: item.objectPosition,
                        backgroundImage: item.lqip ? `url("${item.lqip}")` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: item.objectPosition ?? '50% 50%',
                      }}
                      className="h-full w-full object-cover"
                    />
                  </picture>

                  <motion.video
                    ref={videoRef}
                    style={
                      reduce
                        ? { opacity: stage >= 1 ? 1 : 0 }
                        : { clipPath: wipeClip, WebkitClipPath: wipeClip }
                    }
                    className="absolute inset-0 h-full w-full object-cover"
                    src={item.video}
                    /* metadata erst, wenn die Bühne in Reichweite ist. */
                    preload={armed ? 'metadata' : 'none'}
                    playsInline
                    muted={muted}
                    loop
                    aria-label={item.title}
                  />

                  {/* Die Kante der Wischbewegung. Sie macht sichtbar, dass hier
                      etwas passiert, statt dass ein Bild einfach ausgetauscht wird. */}
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      style={{ left: wipeEdge, opacity: edgeOpacity }}
                      className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-brand shadow-[0_0_30px_6px_color-mix(in_oklab,var(--color-brand)_70%,transparent)]"
                    />
                  )}

                  {/* Zustandsanzeiger, gleiche Sprache wie in der Kernkomponente */}
                  <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-ink/65 px-2.5 py-1 font-display text-[0.625rem] font-bold tracking-[0.14em] text-on-ink uppercase backdrop-blur-md">
                    <span className={stage >= 1 ? 'opacity-35' : 'opacity-100'}>Foto</span>
                    <span aria-hidden className={stage >= 1 ? 'text-brand' : 'text-on-ink/35'}>
                      →
                    </span>
                    <span className={stage >= 1 ? 'text-brand' : 'text-on-ink/35'}>Video</span>
                  </div>

                  {stage >= 1 && (
                    <button
                      type="button"
                      onClick={() => setMuted((m) => !m)}
                      aria-pressed={!muted}
                      aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
                      className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-on-ink backdrop-blur-md transition-colors hover:bg-ink/90"
                    >
                      {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Mobil: dieselbe Erzählung, ohne Bühne ------------ */}
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-ink py-section-tight text-on-ink lg:hidden"
      >
        <div
          aria-hidden
          className="glow-warm top-[-8rem] right-[-12rem] h-[28rem] w-[28rem] opacity-30"
        />
        <div className="relative mx-auto w-full max-w-[92rem] px-5 sm:px-8">
          <Eyebrow>{livingStory.eyebrow}</Eyebrow>
          <MaskReveal
            as="h2"
            lines={[
              ...livingStory.headlineLines,
              <span className="text-brand">{livingStory.headlineAccent}</span>,
            ]}
            className="mt-5 font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />

          <div className="mt-8">
            <LivingMedia
              item={item}
              hint="Antippen: aus der Seite wird ein Film"
              radiusClassName="rounded-frame"
            />
          </div>

          {/* Die drei Stationen als Snap-Strecke statt als Liste untereinander. */}
          <ol className="snap-rail mt-8 -mx-5 px-5 sm:-mx-8 sm:px-8">
            {livingStory.steps.map((step) => (
              <li
                key={step.number}
                className="w-[74vw] max-w-[19rem] rounded-media border border-ink-line bg-ink-2 p-5"
              >
                <span className="font-display text-xs font-bold tracking-[0.14em] text-brand tabular">
                  {step.number}
                </span>
                <h3 className="mt-2 text-h3">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-on-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <Button
            as="link"
            to={livingStory.cta.to}
            variant="outline"
            size="lg"
            className="mt-8 w-full"
          >
            {livingStory.cta.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </section>
    </>
  )
}

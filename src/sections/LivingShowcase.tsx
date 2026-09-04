import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { Play, Volume2, VolumeX } from 'lucide-react'
import { MediaStill } from '@/components/ui/MediaStill'
import { PandaMark } from '@/components/brand/PandaMark'
import { LivingMedia } from '@/components/living/LivingMedia'
import { livingMedia, photos } from '@/data/media'
import { cn } from '@/lib/cn'

const album = livingMedia['living-album']
const leftPhoto = photos['wedding-closeup']

const stages = [
  { number: '01', title: 'Ein Foto.', body: 'Ein Abzug, ein Album, eine Seite zum Umblättern.' },
  { number: '02', title: 'Eine Erinnerung.', body: 'Der Moment, den ihr aufgehoben habt.' },
  {
    number: '03',
    title: 'Und plötzlich bewegt sie sich.',
    body: 'Dieselbe Szene, nur weiter. Die Sekunden davor und danach.',
  },
  {
    number: '04',
    title: 'Foto → Bewegung → Erlebnis',
    body: 'Aus einem Termin entsteht beides. Ihr bekommt es als Paar.',
  },
]

/**
 * Das Schaustück der Seite: ein Fotobuch, das sich beim Scrollen öffnet, ein
 * Standbild freigibt und dieses schließlich in Bewegung setzt.
 *
 * Gebaut aus CSS-Perspektive und Transformationen, nicht aus einer
 * 3D-Bibliothek. Für zwei rotierende Flächen und ein Telefon wäre eine
 * WebGL-Szene reine Ladezeit ohne sichtbaren Gewinn.
 *
 * Buchdeckel und Telefonrahmen sind gezeichnete Flächen, kein Fotomaterial.
 * Der Inhalt darin ist ausnahmslos echte Kundenarbeit; das Gehäuse ist
 * Darstellung, so wie ein Bildschirmrahmen um einen Screenshot.
 *
 * Auf schmalen Viewports entfällt die Bühne. Dort stehen die vier Stationen
 * untereinander, und das Medium ist eine gewöhnliche Foto-zu-Video-Einheit.
 */
export function LivingShowcase() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stage, setStage] = useState(0)
  const [muted, setMuted] = useState(true)
  const [armed, setArmed] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  /* Die Szene richtet sich beim Eintreten auf und beruhigt sich zum Ende. */
  const sceneRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 4, 2])
  const sceneRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, -4, 0])
  const sceneScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.9, 1, 0.97])

  /* Der Buchdeckel liegt zu Beginn geschlossen auf der rechten Seite und
     schwingt nach links weg. Die Drehachse ist seine linke Kante, also der
     Buchrücken. */
  const coverRotate = useTransform(scrollYProgress, [0.06, 0.42], [0, -168])

  /* Das Telefon kommt erst zur letzten Station dazu. */
  const phoneX = useTransform(scrollYProgress, [0.62, 0.86], [90, 0])
  const phoneOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1])

  /* Ab Station 03 wischt das Video über das Standbild. */
  const wipe = useTransform(scrollYProgress, [0.66, 0.9], [100, 0])
  const wipeClip = useTransform(wipe, (v) => `inset(0 ${v}% 0 0)`)
  const wipeEdge = useTransform(wipe, (v) => `${100 - v}%`)
  const edgeOpacity = useTransform(scrollYProgress, [0.64, 0.68, 0.88, 0.93], [0, 1, 1, 0])

  const badgeScale = useTransform(scrollYProgress, [0.46, 0.58, 0.68], [0, 1, 0.9])
  const badgeOpacity = useTransform(scrollYProgress, [0.46, 0.56, 0.72], [0, 1, 0])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p > 0.001) setArmed(true)
    const next = p < 0.28 ? 0 : p < 0.5 ? 1 : p < 0.72 ? 2 : 3
    setStage((current) => (current === next ? current : next))
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (stage >= 2) {
      void video.play().catch(() => {
        /* Blockiert der Browser die stumme Wiedergabe, bleibt das Standbild
           stehen. Kein Fehlerzustand, es fehlt nur die Bewegung. */
      })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [stage])

  return (
    <>
      {/* ------------------ Desktop: feste Bühne ------------------ */}
      <section
        data-tone="ink"
        className="relative isolate hidden bg-ink text-on-ink grain lg:block"
      >
        <div ref={ref} className="relative h-[400vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div
              aria-hidden
              className="glow-warm top-1/2 right-[6%] h-[44rem] w-[44rem] -translate-y-1/2 opacity-45"
            />

            <div className="relative mx-auto grid w-full max-w-[92rem] grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] items-center gap-12 px-12">
              {/* Stationen */}
              <div>
                <p className="flex items-center gap-2.5 font-display text-[0.6875rem] font-bold tracking-[0.16em] text-brand uppercase">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  Das Prinzip
                </p>

                <ol className="mt-10">
                  {stages.map((s, i) => {
                    const active = stage === i
                    return (
                      <li key={s.number} className="relative">
                        <motion.div
                          animate={{
                            opacity: active ? 1 : 0.28,
                            filter: active ? 'blur(0px)' : 'blur(1.5px)',
                          }}
                          transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="py-3"
                        >
                          <div className="flex items-baseline gap-3">
                            <span
                              className={cn(
                                'font-display text-xs font-bold tracking-[0.14em] tabular',
                                active ? 'text-brand' : 'text-on-ink-faint',
                              )}
                            >
                              {s.number}
                            </span>
                            <h3
                              className={cn(
                                'text-h3 transition-colors duration-500',
                                active ? 'text-on-ink' : 'text-on-ink-muted',
                              )}
                            >
                              {s.title}
                            </h3>
                          </div>
                          {active && (
                            <p className="mt-2 max-w-[36ch] text-[0.9375rem] text-on-ink-soft">
                              {s.body}
                            </p>
                          )}
                        </motion.div>
                      </li>
                    )
                  })}
                </ol>
              </div>

              {/* Szene */}
              <motion.div
                style={
                  reduce
                    ? undefined
                    : {
                        rotateX: sceneRotateX,
                        rotateY: sceneRotateY,
                        scale: sceneScale,
                        transformStyle: 'preserve-3d',
                      }
                }
                className="relative mx-auto w-full max-w-[46rem]"
              >
                <div
                  className="relative flex"
                  style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
                >
                  {/* Linke Buchseite: ein echtes Foto */}
                  <div className="media-frame relative aspect-[3/4] w-1/2 rounded-l-frame shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]">
                    <MediaStill
                      media={{ kind: 'photo', ref: 'wedding-closeup' }}
                      sizes="(min-width:1024px) 23vw, 50vw"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink/70 to-transparent"
                    />
                    <span className="sr-only">{leftPhoto.alt}</span>
                  </div>

                  {/* Rechte Buchseite: vorne das Medium, hinten der Deckel */}
                  <div
                    className="relative aspect-[3/4] w-1/2"
                    style={{ perspective: '1800px' }}
                  >
                    {/* Untergrund, damit beim Aufklappen kein Loch entsteht */}
                    <div className="media-frame absolute inset-0 rounded-r-frame">
                      <MediaStill
                        media={{ kind: 'living', ref: 'living-album' }}
                        sizes="(min-width:1024px) 23vw, 50vw"
                      />

                      <motion.video
                        ref={videoRef}
                        style={
                          reduce
                            ? { opacity: stage >= 2 ? 1 : 0 }
                            : { clipPath: wipeClip, WebkitClipPath: wipeClip }
                        }
                        className="absolute inset-0 h-full w-full object-cover"
                        src={album.video}
                        preload={armed ? 'metadata' : 'none'}
                        playsInline
                        muted={muted}
                        loop
                        aria-label={album.title}
                      />

                      {!reduce && (
                        <motion.span
                          aria-hidden
                          style={{ left: wipeEdge, opacity: edgeOpacity }}
                          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-brand shadow-[0_0_30px_6px_color-mix(in_oklab,var(--color-brand)_70%,transparent)]"
                        />
                      )}

                      {/* Das Wiedergabesymbol erscheint zur dritten Station */}
                      <motion.span
                        aria-hidden
                        style={reduce ? { opacity: stage === 2 ? 1 : 0 } : { scale: badgeScale, opacity: badgeOpacity }}
                        className="absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-ink shadow-[0_12px_40px_-8px_color-mix(in_oklab,var(--color-brand)_80%,transparent)]"
                      >
                        <Play className="ml-1 h-6 w-6 fill-current" strokeWidth={0} />
                      </motion.span>

                      {stage >= 2 && (
                        <button
                          type="button"
                          onClick={() => setMuted((m) => !m)}
                          aria-pressed={!muted}
                          aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
                          className="absolute right-3 bottom-3 grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-on-ink backdrop-blur-md transition-colors hover:bg-ink/90"
                        >
                          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                      )}
                    </div>

                    {/* Der Deckel klappt darüber weg */}
                    <motion.div
                      aria-hidden
                      style={
                        reduce
                          ? { display: stage >= 1 ? 'none' : 'block' }
                          : {
                              rotateY: coverRotate,
                              transformOrigin: 'left center',
                              transformStyle: 'preserve-3d',
                            }
                      }
                      className="absolute inset-0"
                    >
                      {/* Vorderseite: der geschlossene Deckel */}
                      <span
                        className="absolute inset-0 grid place-items-center rounded-r-frame border border-ink-line-2 bg-[oklch(0.19_0.012_45)] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)]"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <span className="text-center">
                          {/* Ein Buchdeckel traegt ein Zeichen, keinen Absatz. */}
                          <PandaMark className="mx-auto h-14 w-14" />
                          <span className="mt-4 block font-display text-lg font-extrabold tracking-[-0.05em] text-on-ink uppercase">
                            Foto <span className="text-brand">Panda</span>
                          </span>
                          <span className="mt-2 block font-display text-[0.5625rem] font-bold tracking-[0.19em] text-on-ink-faint uppercase">
                            Unvergessliche Momente
                          </span>
                        </span>
                      </span>

                      {/* Rückseite. Der Deckel schwingt um den Buchrücken und
                          landet damit auf der linken Seite. Bliebe sie leer,
                          würde das Foto darunter verschwinden; deshalb trägt
                          sie dasselbe Bild und der Aufschlag bleibt lückenlos. */}
                      <span
                        className="media-frame absolute inset-0 rounded-l-frame"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <MediaStill
                          media={{ kind: 'photo', ref: 'wedding-closeup' }}
                          sizes="(min-width:1024px) 23vw, 50vw"
                        />
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink/70 to-transparent"
                        />
                      </span>
                    </motion.div>
                  </div>

                  {/* Telefon zur letzten Station */}
                  <motion.div
                    aria-hidden
                    style={
                      reduce
                        ? { opacity: stage === 3 ? 1 : 0 }
                        : { x: phoneX, opacity: phoneOpacity, translateZ: 90 }
                    }
                    className="absolute -right-6 bottom-[-6%] w-[7.5rem] xl:-right-10 xl:w-[9rem]"
                  >
                    <div className="relative rounded-[1.75rem] border-[3px] border-ink-line-2 bg-ink p-1.5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.95)]">
                      <span className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-ink-line-2" />
                      <div className="media-frame aspect-[9/19] overflow-hidden rounded-[1.4rem]">
                        <MediaStill
                          media={{ kind: 'living', ref: 'wedding' }}
                          sizes="160px"
                        />
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink">
                            <Play className="ml-0.5 h-3.5 w-3.5 fill-current" strokeWidth={0} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------ Mobil: dieselbe Erzählung, flach ------------------ */}
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-ink py-section-tight text-on-ink lg:hidden"
      >
        <div aria-hidden className="glow-warm top-[-8rem] right-[-12rem] h-[28rem] w-[28rem] opacity-30" />
        <div className="relative mx-auto w-full max-w-[92rem] px-5 sm:px-8">
          <p className="flex items-center gap-2.5 font-display text-[0.6875rem] font-bold tracking-[0.16em] text-brand uppercase">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            Das Prinzip
          </p>

          {/* Randlos: das Medium darf hier über die Containerkante laufen. */}
          <div className="mt-7 -mx-5 sm:-mx-8">
            <LivingMedia
              item={album}
              hint="Antippen: aus der Seite wird ein Film"
              radiusClassName="rounded-none"
              aspectClassName="aspect-[4/5]"
              showCta={false}
            />
          </div>

          <ol className="snap-rail mt-7 -mx-5 px-5 sm:-mx-8 sm:px-8">
            {stages.map((s) => (
              <li
                key={s.number}
                className="w-[72vw] max-w-[18rem] rounded-media border border-ink-line bg-ink-2 p-5"
              >
                <span className="font-display text-xs font-bold tracking-[0.14em] text-brand tabular">
                  {s.number}
                </span>
                <h3 className="mt-2 text-[1.0625rem] leading-tight">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-on-ink-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}

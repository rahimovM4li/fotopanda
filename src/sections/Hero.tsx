import { ArrowUpRight, Camera, Mouse, ShieldCheck, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { TiltLayer, TiltStage } from '@/components/motion/TiltStage'
import { MediaStill } from '@/components/ui/MediaStill'
import { LivingMedia } from '@/components/living/LivingMedia'
import { CONTACT_PATH, CTA_PRIMARY, hero } from '@/data/content'
import { livingMedia } from '@/data/media'

const markerIcons = [Camera, Users, ShieldCheck]

/**
 * Der Einstieg ist eine Bühne, kein Zweispalter.
 *
 * Das Hauptmedium steht leicht gedreht im Raum, davor und dahinter liegen
 * kleinere Karten auf eigenen Z-Ebenen. Auf Desktop neigt sich der ganze
 * Stapel der Maus entgegen. Das Standbild bleibt trotzdem der erste
 * Eindruck: Erst der Klick macht daraus den Film.
 */
export function Hero() {
  return (
    <section
      id="start"
      data-tone="ink"
      className="relative isolate overflow-hidden bg-ink pt-28 pb-16 text-on-ink grain sm:pb-20 lg:pt-32 lg:pb-16"
    >
      {/* Zwei Lichtquellen: eine hinter dem Medium, eine flach am oberen Rand. */}
      <div
        aria-hidden
        className="glow-warm top-[-16rem] right-[-8rem] h-[42rem] w-[42rem] opacity-40 lg:right-[6rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
      />

      {/* Auf schmalen Viewports zählt die Reihenfolge: erst die Aussage, dann
          das Bild zum Antippen, dann die Handlung. Auf Desktop stehen Text und
          Bühne nebeneinander, deshalb die ausdrückliche Rasterplatzierung. */}
      <div className="relative mx-auto flex w-full max-w-[92rem] flex-col gap-10 px-5 sm:px-8 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-x-12 lg:gap-y-8 lg:px-12">
        {/* Aussage */}
        <div className="order-1 lg:col-start-1 lg:row-start-1 lg:self-end">
          <Reveal variant="fade">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>

          <MaskReveal
            as="h1"
            immediate
            delay={120}
            lines={[...hero.headlineLines, <span className="text-brand">{hero.headlineAccent}</span>]}
            className="mt-6 font-display text-display leading-[0.98] font-extrabold tracking-[-0.042em]"
          />

          <Reveal delay={420} className="mt-7">
            <p className="max-w-[42ch] text-lead text-on-ink-soft">{hero.lead}</p>
          </Reveal>
        </div>

        {/* Handlung */}
        <div className="order-3 lg:col-start-1 lg:row-start-2 lg:self-start">
          <Reveal delay={520}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button as="link" to={CONTACT_PATH} size="lg" className="w-full sm:w-auto" magnetic>
                {CTA_PRIMARY}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                as="link"
                to={hero.secondary.to}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {hero.secondary.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={620} className="mt-10">
            <ul className="flex flex-wrap gap-x-8 gap-y-5">
              {hero.markers.map((marker, i) => {
                const Icon = markerIcons[i]
                return (
                  <li key={marker.title} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-line-2 text-brand">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-[0.8125rem] leading-tight">
                      <span className="block font-semibold text-on-ink">{marker.title}</span>
                      <span className="block text-on-ink-muted">{marker.detail}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={760} className="mt-12 hidden lg:block">
            <p className="flex items-center gap-3 font-display text-[0.625rem] font-bold tracking-[0.2em] text-on-ink-faint uppercase">
              <Mouse
                className="h-4 w-4 text-brand motion-safe:animate-[scroll-hint_2.4s_ease-in-out_infinite]"
                aria-hidden
              />
              Scrollen
            </p>
          </Reveal>
        </div>

        {/* Medienbühne. Die Karten sitzen an den Kanten des Hauptmediums, nicht
            außerhalb der Spalte: Sonst schneidet der Seitenrand sie an. */}
        <div className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pr-2 xl:pr-4">
          <TiltStage maxTilt={6} className="relative">
            {/* Hauptmedium, leicht aus der Achse gedreht */}
            <TiltLayer depth={0} className="relative">
              <div
                className="relative"
                style={{ transform: 'rotate(-1.4deg)' }}
              >
                <LivingMedia
                  item={livingMedia.wedding}
                  hint={hero.mediaHint}
                  priority
                  radiusClassName="rounded-frame"
                  className="[&_.media-frame]:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
                />
              </div>
            </TiltLayer>

            {/* Schwebende Karte links: ein echtes Foto in voller Auflösung */}
            <TiltLayer
              depth={58}
              /* Auf schmalen Viewports liegt die Karte innerhalb des Rahmens: Ein
                 Stück außerhalb würde am Seitenrand abgeschnitten. */
              className="pointer-events-none absolute bottom-3 left-3 w-20 sm:-bottom-6 sm:-left-5 sm:w-28 lg:-bottom-10 lg:-left-10 lg:w-40"
            >
              <div
                className="media-frame rounded-media shadow-[0_30px_70px_-24px_rgba(0,0,0,0.95)]"
                style={{ transform: 'rotate(-5deg)' }}
              >
                <div className="aspect-[4/5]">
                  <MediaStill
                    media={{ kind: 'photo', ref: 'wedding-stairs' }}
                    sizes="176px"
                    priority
                  />
                </div>
              </div>
            </TiltLayer>

            {/* Schwebende Karte rechts oben: Gastronomie als Beleg für die Breite */}
            <TiltLayer
              depth={44}
              className="pointer-events-none absolute -top-7 right-2 hidden w-24 sm:block sm:w-28 lg:-top-9 lg:-right-3 lg:w-32"
            >
              <div
                className="media-frame rounded-media shadow-[0_26px_60px_-22px_rgba(0,0,0,0.95)]"
                style={{ transform: 'rotate(6deg)' }}
              >
                <div className="aspect-[3/4]">
                  <MediaStill
                    media={{ kind: 'living', ref: 'gastronomy-plating' }}
                    sizes="128px"
                  />
                </div>
              </div>
            </TiltLayer>

            {/* Schwebende Karte rechts unten: Immobilie, quer */}
            <TiltLayer
              depth={34}
              className="pointer-events-none absolute right-2 bottom-8 hidden w-32 lg:block lg:-right-4 lg:w-36"
            >
              <div
                className="media-frame rounded-media shadow-[0_26px_60px_-22px_rgba(0,0,0,0.95)]"
                style={{ transform: 'rotate(-3deg)' }}
              >
                <div className="aspect-[16/10]">
                  <MediaStill media={{ kind: 'living', ref: 'real-estate' }} sizes="160px" />
                </div>
              </div>
            </TiltLayer>
          </TiltStage>
        </div>
      </div>
    </section>
  )
}

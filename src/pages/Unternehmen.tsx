import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { MotionSurface } from '@/components/motion/MotionSurface'
import { Reveal } from '@/components/motion/Reveal'
import { MediaStill } from '@/components/ui/MediaStill'
import { CONTACT_PATH, CTA_PRIMARY } from '@/data/content'
import { unternehmen as page } from '@/data/pages'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/cn'
import type { MediaRef } from '@/types'

/**
 * Die sachlichste Seite. Weniger Glow, mehr Weißraum, klare Kanten:
 * Geschäftskunden entscheiden anders als ein Brautpaar, und ein Seitenkopf,
 * der wie eine Hochzeitsreportage aussieht, arbeitet hier gegen die Sache.
 */
export function Unternehmen() {
  useSeo({ ...page.seo, path: '/unternehmen' })

  return (
    <>
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-ink pt-28 pb-section-tight text-on-ink lg:pt-36"
      >
        <div aria-hidden className="glow-warm top-[-14rem] left-[-10rem] h-[36rem] w-[36rem] opacity-25" />

        <div className="relative mx-auto grid w-full max-w-[92rem] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:px-12">
          <div>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <MaskReveal
              as="h1"
              immediate
              delay={100}
              lines={[...page.headlineLines, <span className="text-brand">{page.headlineAccent}</span>]}
              className="mt-6 font-display text-display leading-[0.98] font-extrabold tracking-[-0.042em]"
            />
            <Reveal delay={420} className="mt-7">
              <p className="max-w-[52ch] text-lead text-on-ink-soft">{page.lead}</p>
            </Reveal>
            <Reveal delay={520} className="mt-9">
              <Button as="link" to={CONTACT_PATH} size="lg" magnetic>
                {CTA_PRIMARY}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

          <Reveal delay={220} className="lg:justify-self-end">
            <MotionSurface variant="hero" index={1}>
              <div className="media-frame aspect-[4/5] rounded-frame lg:w-[26rem]">
                <MediaStill
                  media={page.hero as MediaRef}
                  sizes="(min-width:1024px) 26rem, 100vw"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent"
                />
              </div>
            </MotionSurface>
          </Reveal>
        </div>
      </section>

      {/* Der Kern der Seite: aus einem Termin entstehen mehrere Formate.
          Die vier gleich aufgebauten Leistungsblöcke, die hier standen,
          haben aufgezählt statt erklärt, wofür ein Unternehmen zahlt. */}
      <Section tone="ivory" spacing="none" className="py-section">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <MaskReveal
              as="h2"
              lines={[
                ...page.oneShoot.headlineLines,
                <span className="text-brand">{page.oneShoot.headlineAccent}</span>,
              ]}
              className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
            />
            <Reveal variant="fade">
              <p className="max-w-[48ch] text-lead text-tone-text-muted">{page.oneShoot.lead}</p>
            </Reveal>
          </div>

          {/* Der Termin steht links und größer, die Formate rechts im Raster.
              Die Richtung ist damit ablesbar, ohne dass ein Pfeil sie erklärt. */}
          <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
            <Reveal className="relative lg:h-full">
              <MotionSurface variant="media" className="h-full">
                <div className="media-frame aspect-[4/5] rounded-frame lg:h-full lg:aspect-auto">
                  <MediaStill
                    media={page.oneShoot.center as MediaRef}
                    sizes="(min-width:1024px) 44vw, 100vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <p className="font-display text-[0.6875rem] font-bold tracking-[0.16em] text-brand uppercase">
                      Ein Termin
                    </p>
                    <p className="mt-2 max-w-[22ch] font-display text-h3 leading-tight text-on-ink">
                      Ein Tag bei Ihnen oder im Studio.
                    </p>
                  </div>
                </div>
              </MotionSurface>
            </Reveal>

            {/* Fünf Formate, bewusst ungleich groß. */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {page.oneShoot.outputs.map((out, i) => (
                <Reveal
                  key={out.id}
                  delay={i * 70}
                  className={cn('group/out', i === 0 && 'col-span-2')}
                >
                  <MotionSurface variant="card" index={i}>
                    <div
                      className={cn(
                        'media-frame rounded-media',
                        i === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]',
                      )}
                    >
                      <MediaStill
                        media={out.media as MediaRef}
                        sizes="(min-width:1024px) 26vw, 46vw"
                        className="transition-transform duration-[900ms] ease-out group-hover/out:scale-[1.05]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 font-display text-[0.625rem] font-bold tracking-[0.12em] text-on-ink uppercase backdrop-blur-md">
                        {out.label}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[0.875rem] text-tone-text-muted">{out.body}</p>
                  </MotionSurface>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Gruende als reine Struktur. Ein weiteres Bild stand hier frueher als
          Gegengewicht -- es zeigte denselben Menschen wie der Seitenkopf. Fuer
          Geschaeftskunden traegt an dieser Stelle ohnehin das Raster, nicht
          noch ein Portraet. */}
      <Section tone="ink">
        <Container width="wide" className="relative">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <MaskReveal
              as="h2"
              lines={[<>Warum mit <span className="text-brand">uns</span></>]}
              className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
            />

            <dl className="border-t border-ink-line">
              {page.reasons.map((reason, i) => (
                <Reveal
                  key={reason.title}
                  delay={i * 80}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 border-b border-ink-line py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-x-10"
                >
                  <span className="font-display text-sm font-bold text-brand tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <dt className="text-h3">{reason.title}</dt>
                  <dd className="col-start-2 mt-2 max-w-[46ch] text-[0.9375rem] text-on-ink-muted sm:col-start-3 sm:mt-0">
                    {reason.body}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

    </>
  )
}

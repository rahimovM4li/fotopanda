import { ArrowUpRight, Hand, Layers, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { TiltLayer, TiltStage } from '@/components/motion/TiltStage'
import { MediaStill } from '@/components/ui/MediaStill'
import { LivingMedia } from '@/components/living/LivingMedia'
import { LivingShowcase } from '@/sections/LivingShowcase'
import { CONTACT_PATH, CTA_PRIMARY, processSteps } from '@/data/content'
import { lebendigeMedien as page } from '@/data/pages'
import { livingMedia } from '@/data/media'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/cn'
import type { LivingMediaId } from '@/data/media'
import type { MediaRef } from '@/types'

/* Spaltenbreite und Bildformat je Produktgewicht. Die Formate folgen der
   Ausrichtung der jeweiligen Aufnahme: das hochformatige Tellervideo wird
   nicht ins Querformat geschnitten, nur damit die Reihe buendig ist. */
const PRODUCT_SPAN: Record<string, string> = {
  feature: 'lg:col-span-7',
  wide: 'lg:col-span-5',
  tall: 'lg:col-span-4',
  block: 'lg:col-span-4',
}

const PRODUCT_RATIO: Record<string, string> = {
  feature: 'aspect-[4/3] sm:aspect-[16/10]',
  wide: 'aspect-[16/10] lg:aspect-[16/11]',
  tall: 'aspect-[3/4]',
  block: 'aspect-[16/10]',
}

const pointIcons = [Layers, Sparkles, Hand]

export function LebendigeMedien() {
  useSeo({ ...page.seo, path: '/lebendige-medien' })

  return (
    <>
      {/* Hero: räumlicher Stapel aus dem Hauptmedium und zwei kleineren
          Belegen, die sich der Maus entgegenneigen. */}
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-ink pt-28 pb-section-tight text-on-ink grain lg:pt-36"
      >
        <div aria-hidden className="glow-warm top-[-8rem] right-[-4rem] h-[44rem] w-[44rem] opacity-40" />

        <div className="relative mx-auto grid w-full max-w-[92rem] gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:px-12">
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
              <p className="max-w-[44ch] text-lead text-on-ink-soft">{page.lead}</p>
            </Reveal>

            <Reveal delay={520} className="mt-10">
              <ul className="flex flex-col gap-4">
                {page.points.map((point, i) => {
                  const Icon = pointIcons[i]
                  return (
                    <li key={point.title} className="flex gap-4">
                      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line-2 text-brand">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-semibold text-on-ink">{point.title}</span>
                        <span className="block max-w-[40ch] text-[0.9375rem] text-on-ink-muted">
                          {point.body}
                        </span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>

            <Reveal delay={620} className="mt-10">
              <Button as="link" to={CONTACT_PATH} size="lg" magnetic>
                {CTA_PRIMARY}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

          <TiltStage maxTilt={8} className="relative">
            <TiltLayer depth={0}>
              <div style={{ transform: 'rotate(-1.2deg)' }}>
                <LivingMedia
                  item={livingMedia['living-album']}
                  hint="Antippen: aus der Seite wird ein Film"
                  priority
                  radiusClassName="rounded-frame"
                  className="[&_.media-frame]:shadow-[0_60px_140px_-45px_rgba(0,0,0,0.95)]"
                />
              </div>
            </TiltLayer>

            <TiltLayer
              depth={62}
              className="pointer-events-none absolute bottom-3 left-3 w-20 sm:-bottom-8 sm:-left-4 sm:w-32 lg:-bottom-10 lg:-left-10 lg:w-40"
            >
              <div
                className="media-frame rounded-media shadow-[0_30px_70px_-24px_rgba(0,0,0,0.95)]"
                style={{ transform: 'rotate(-6deg)' }}
              >
                <div className="aspect-[3/4]">
                  <MediaStill media={{ kind: 'living', ref: 'gastronomy-plating' }} sizes="176px" />
                </div>
              </div>
            </TiltLayer>

            <TiltLayer
              depth={40}
              className="pointer-events-none absolute -top-9 right-2 hidden w-32 sm:block lg:-right-4 lg:w-40"
            >
              <div
                className="media-frame rounded-media shadow-[0_26px_60px_-22px_rgba(0,0,0,0.95)]"
                style={{ transform: 'rotate(5deg)' }}
              >
                <div className="aspect-[16/10]">
                  <MediaStill media={{ kind: 'living', ref: 'real-estate' }} sizes="160px" />
                </div>
              </div>
            </TiltLayer>
          </TiltStage>
        </div>
      </section>

      {/* Der Mechanismus als eine große Zeile, nicht als Absatz. */}
      <Section tone="ivory" spacing="tight">
        <Container>
          <Reveal>
            <p className="max-w-[24ch] font-display text-h2 leading-[1.05] font-bold tracking-[-0.035em] text-tone-text">
              {page.mechanism}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Das Schaustück der Seite. Die zwei nebeneinanderstehenden Einheiten,
          die hier standen, haben dasselbe erklärt wie der Seitenkopf; jetzt
          führt die Seite es vor. */}
      <LivingShowcase />

      {/* Produkte */}
      <Section tone="ivory">
        <Container width="wide">
          <MaskReveal
            as="h2"
            lines={['Unsere lebendigen', <span className="text-brand">Produkte</span>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />

          {/* Mosaik statt Reihe: Breite und Bildformat folgen dem Gewicht des
              Produkts und der Ausrichtung seines Motivs. Fuenf gleich grosse
              Kacheln haetten alle Produkte gleich wichtig gemacht. */}
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-6">
            {page.products.map((product, i) => {
              const living = livingMedia[product.media.ref as LivingMediaId]
              const span = PRODUCT_SPAN[product.weight]
              const ratio = PRODUCT_RATIO[product.weight]
              const feature = product.weight === 'feature'

              return (
                <Reveal
                  key={product.id}
                  delay={i * 70}
                  className={cn('group/prod col-span-2', span)}
                >
                  <div className={cn('media-frame rounded-media', ratio)}>
                    <MediaStill
                      media={product.media as MediaRef}
                      sizes={
                        feature
                          ? '(min-width:1024px) 56vw, 92vw'
                          : '(min-width:1024px) 32vw, 46vw'
                      }
                      className="transition-transform duration-[900ms] ease-out group-hover/prod:scale-[1.05]"
                    />
                    <div
                      aria-hidden
                      className={cn(
                        'absolute inset-0 bg-gradient-to-t',
                        feature ? 'from-ink/85 via-ink/20 to-transparent' : 'from-ink/55 to-transparent',
                      )}
                    />
                    {living && (
                      <span className="absolute top-3 left-3 rounded-full bg-ink/75 px-2.5 py-1 font-display text-[0.625rem] font-bold tracking-[0.12em] text-on-ink uppercase backdrop-blur-md">
                        Video
                      </span>
                    )}

                    {/* Das Leitprodukt traegt seine Beschriftung im Bild. */}
                    {feature && (
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                        <h3 className="font-display text-h2 leading-[1.02] font-bold tracking-[-0.035em] text-on-ink">
                          {product.title}
                        </h3>
                        <p className="mt-2 max-w-[38ch] text-[0.9375rem] text-on-ink-soft">
                          {product.body}
                        </p>
                      </div>
                    )}
                  </div>

                  {!feature && (
                    <>
                      <h3 className="mt-4">{product.title}</h3>
                      <p className="mt-1.5 max-w-[34ch] text-[0.9375rem] text-tone-text-muted">
                        {product.body}
                      </p>
                    </>
                  )}
                </Reveal>
              )
            })}
          </div>

          {/* Formate ohne eigene Arbeit stehen als Text. Ein erfundenes
              Mockup wäre schneller gebaut und würde die Seite belügen. */}
          <Reveal className="mt-16 border-t border-tone-line pt-8">
            <p className="font-display text-[0.6875rem] font-bold tracking-[0.16em] text-tone-accent uppercase">
              Auf Anfrage
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {page.onRequest.map((format) => (
                <li
                  key={format}
                  className="rounded-full border border-tone-line-2 px-4 py-2 text-[0.9375rem] text-tone-text-soft"
                >
                  {format}
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-[54ch] text-[0.9375rem] text-tone-text-muted">
              Für diese Formate liegt noch keine eigene Arbeit vor, die wir zeigen könnten. Sprechen
              Sie uns an, dann klären wir, was möglich ist.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Ablauf */}
      <Section tone="ink" grain>
        <Container width="wide" className="relative">
          <MaskReveal
            as="h2"
            lines={[<>In vier Schritten zum <span className="text-brand">Erlebnis</span></>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 80} className="border-t-2 border-ink-line pt-5">
                <span className="font-display text-sm font-bold text-brand tabular">{step.number}</span>
                <h3 className="mt-3">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-on-ink-muted">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  )
}

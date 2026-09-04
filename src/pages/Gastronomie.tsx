import { ArrowUpRight, Clock, Eye, Flame, ImageIcon, MapPin, MessageCircle, Phone, Utensils } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { LivingMedia } from '@/components/living/LivingMedia'
import { MediaStill } from '@/components/ui/MediaStill'
import { CONTACT_PATH, CTA_PRIMARY } from '@/data/content'
import { gastronomie as page } from '@/data/pages'
import { livingMedia } from '@/data/media'
import { siteConfig } from '@/config/siteConfig'
import { useSeo } from '@/hooks/useSeo'

const benefitIcons = [Flame, Eye, ImageIcon, Utensils]
const closingIcons = [MessageCircle, Clock, MapPin]

/**
 * Die dunkelste Seite der Website. Gastronomie lebt von warmem Licht auf
 * dunklem Grund; eine helle Tonlage würde den Aufnahmen die Wärme nehmen.
 * Deshalb bleibt hier durchgehend Ink, und der Rhythmus entsteht über
 * Flächenabstufung statt über Tonwechsel.
 */
export function Gastronomie() {
  useSeo({ ...page.seo, path: '/gastronomie' })

  return (
    <>
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-ink pt-28 pb-section-tight text-on-ink grain lg:pt-36"
      >
        {/* Zwei Glühpunkte: das Gericht bekommt Licht von rechts, der
            Seitenkopf einen warmen Schleier. */}
        <div aria-hidden className="glow-warm top-[-6rem] right-[-8rem] h-[48rem] w-[48rem] opacity-45" />
        <div aria-hidden className="glow-warm bottom-[-18rem] left-[-14rem] h-[32rem] w-[32rem] opacity-20" />

        {/* Ein sehr großes, sehr leises Wort im Hintergrund. */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-16 left-1/2 hidden -translate-x-1/2 font-display text-[13rem] font-extrabold tracking-[-0.05em] text-on-ink/[0.035] select-none lg:block"
        >
          TASTE
        </span>

        <div className="relative mx-auto grid w-full max-w-[92rem] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:px-12">
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
              <p className="max-w-[42ch] text-lead text-on-ink-soft">{page.lead}</p>
            </Reveal>
            <Reveal delay={520} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button as="link" to={CONTACT_PATH} size="lg" className="w-full sm:w-auto" magnetic>
                {CTA_PRIMARY}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                as="a"
                href={`tel:${siteConfig.phoneHref}`}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                {siteConfig.phone}
              </Button>
            </Reveal>
          </div>

          {/* Hochformat neben Hochformat: die beiden Food-Videos ergeben
              zusammen mehr Wirkung als eines allein groß. */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <LivingMedia
              item={livingMedia['gastronomy-plating']}
              hint="Ansehen"
              priority
              radiusClassName="rounded-frame"
              aspectClassName="aspect-[3/4]"
              showCta={false}
              className="lg:mt-10"
            />
            <LivingMedia
              item={livingMedia['gastronomy-serving']}
              hint="Ansehen"
              radiusClassName="rounded-frame"
              aspectClassName="aspect-[3/4]"
              showCta={false}
            />
          </div>
        </div>
      </section>

      {/* Nutzen als durchgehende Leiste auf abgesetzter Fläche. */}
      <section data-tone="ink" className="relative isolate border-y border-ink-line bg-ink-2">
        <Container width="wide">
          <ul className="grid divide-y divide-ink-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {page.benefits.map((benefit, i) => {
              const Icon = benefitIcons[i]
              return (
                <Reveal
                  as="li"
                  key={benefit.title}
                  delay={i * 70}
                  className="flex gap-4 py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0"
                >
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-line-2 text-brand">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display font-bold tracking-[-0.015em] text-on-ink">
                      {benefit.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-on-ink-muted">
                      {benefit.body}
                    </span>
                  </span>
                </Reveal>
              )
            })}
          </ul>
        </Container>
      </section>

      {/* Ablauf und Arbeiten nebeneinander */}
      <Section tone="ink" grain>
        <Container width="wide" className="relative">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <MaskReveal
                as="h2"
                lines={[<>So <span className="text-brand">funktioniert&rsquo;s</span>.</>]}
                className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
              />
              <ol className="mt-10 flex flex-col">
                {page.steps.map((step, i) => (
                  <Reveal
                    as="li"
                    key={step.number}
                    delay={i * 70}
                    className="flex gap-5 border-b border-ink-line py-5 last:border-b-0"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-display text-xs font-bold text-ink tabular">
                      {step.number}
                    </span>
                    <span>
                      <span className="block font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-on-ink">
                        {step.title}
                      </span>
                      <span className="mt-1 block max-w-[44ch] text-[0.9375rem] text-on-ink-muted">
                        {step.body}
                      </span>
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div>
              <MaskReveal
                as="h2"
                lines={['Unsere Arbeiten']}
                className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
              />
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {page.works.map((work, i) => (
                  <Reveal key={work.title} delay={i * 80}>
                    <LivingMedia
                      item={livingMedia[work.media.ref as keyof typeof livingMedia]}
                      hint="Video ansehen"
                      showCta={false}
                      aspectClassName="aspect-[4/5]"
                    />
                    <p className="mt-3 font-display font-bold tracking-[-0.015em] text-on-ink">
                      {work.title}
                    </p>
                    <p className="text-[0.8125rem] text-on-ink-faint">{work.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Abschluss: dunkel, mit einem großen Gericht und warmem Licht.
          Eine vollflächig orange Sektion wirkt an dieser Stelle wie eine
          Anzeige; die Farbe trägt hier nur das Schlüsselwort, den Knopf und
          den Schein hinter dem Bild. */}
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-[oklch(0.115_0.012_45)] text-on-ink grain"
      >
        <div aria-hidden className="glow-warm top-1/2 right-[8%] h-[38rem] w-[38rem] -translate-y-1/2 opacity-55" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />

        <div className="relative mx-auto grid w-full max-w-[92rem] gap-10 px-5 py-section-tight sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-12">
          <div>
            <MaskReveal
              as="h2"
              lines={[
                ...page.closing.headlineLines,
                <span className="text-brand">{page.closing.headlineAccent}</span>,
              ]}
              className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
            />

            <ul className="mt-10 flex flex-col gap-5">
              {page.closing.points.map((point, i) => {
                const Icon = closingIcons[i]
                return (
                  <li key={point.title} className="flex gap-4">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-line-2 text-brand">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-display font-bold text-on-ink">{point.title}</span>
                      <span className="block max-w-[38ch] text-[0.9375rem] text-on-ink-muted">
                        {point.body}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ul>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button as="link" to={CONTACT_PATH} size="lg" className="w-full sm:w-auto" magnetic>
                {CTA_PRIMARY}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="inline-flex min-h-11 items-center gap-2.5 font-display font-bold text-on-ink transition-colors hover:text-brand"
              >
                <Phone className="h-4 w-4 text-brand" aria-hidden />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Ein großes Gericht als Schlussbild, randlos nach rechts. */}
          <div className="relative lg:-mr-12 lg:h-full">
            <div className="media-frame aspect-[4/3] rounded-frame lg:aspect-[3/4] lg:rounded-l-frame lg:rounded-r-none">
              <MediaStill
                media={{ kind: 'living', ref: 'gastronomy-plating' }}
                sizes="(min-width:1024px) 46vw, 100vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

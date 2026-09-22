import { ArrowUpRight, Camera, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { MediaStill } from '@/components/ui/MediaStill'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { MotionSurface } from '@/components/motion/MotionSurface'
import { LivingMedia } from '@/components/living/LivingMedia'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { CONTACT_PATH, CTA_PRIMARY } from '@/data/content'
import { fotografie as page } from '@/data/pages'
import { livingMedia } from '@/data/media'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/cn'
import { Faq } from '@/sections/Faq'
import { Process } from '@/sections/Process'
import type { MediaRef } from '@/types'

const facts = [
  { icon: Camera, title: 'Privat & Business', detail: 'Für jeden Anlass' },
  { icon: User, title: 'Persönlich', detail: 'Mit dir, für dich' },
  { icon: Clock, title: 'Im selben Termin', detail: 'Foto und Video' },
]

const works: MediaRef[] = [
  { kind: 'photo', ref: 'bridal-palace' },
  { kind: 'photo', ref: 'portrait-court-knees' },
  { kind: 'photo', ref: 'bridal-closeup' },
  { kind: 'photo', ref: 'portrait-fence' },
  { kind: 'photo', ref: 'business-portrait-01' },
  { kind: 'photo', ref: 'portrait-court-seated' },
  { kind: 'photo', ref: 'bridal-full-length' },
  { kind: 'photo', ref: 'portrait-court-full' },
  { kind: 'photo', ref: 'business-office-02' },
]

const feature = page.categories.find((c) => c.weight === 'feature')
const pair = page.categories.filter((c) => c.weight === 'pair')
const wide = page.categories.filter((c) => c.weight === 'wide')

export function Fotografie() {
  useSeo({ ...page.seo, path: '/fotografie' })

  return (
    <>
      {/* Hero: Text links, großes Medium randlos rechts, Kategorienleiste
          als schmaler Streifen daneben. */}
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-ink pt-28 pb-section-tight text-on-ink grain lg:pt-36"
      >
        <div aria-hidden className="glow-warm top-[-12rem] right-0 h-[40rem] w-[40rem] opacity-35" />

        <div className="relative mx-auto grid w-full max-w-[92rem] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:px-12">
          <div>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <MaskReveal
              as="h1"
              immediate
              delay={100}
              lines={[...page.headlineLines, <span className="text-brand">{page.headlineAccent}</span>]}
              className="mt-6 font-display text-display leading-[0.98] font-extrabold tracking-[-0.042em]"
            />
            <Reveal delay={400} className="mt-7">
              <p className="max-w-[44ch] text-lead text-on-ink-soft">{page.lead}</p>
            </Reveal>

            <Reveal delay={500} className="mt-10">
              <ul className="flex flex-wrap gap-x-8 gap-y-5">
                {facts.map(({ icon: Icon, title, detail }) => (
                  <li key={title} className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-ink-line-2 text-brand">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-[0.8125rem] leading-tight">
                      <span className="block font-semibold">{title}</span>
                      <span className="block text-on-ink-muted">{detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={600} className="mt-9">
              <Button as="link" to={CONTACT_PATH} size="lg" magnetic>
                {CTA_PRIMARY}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
            </Reveal>
          </div>

          <MotionSurface variant="hero" index={1}>
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-stretch">
              <LivingMedia
                item={livingMedia.wedding}
                hint="Foto zum Leben erwecken"
                priority
                radiusClassName="rounded-frame"
                aspectClassName="aspect-[4/5] sm:aspect-[4/3]"
              />

              {/* Kategorienleiste: zeigt die Bandbreite, ohne eine zweite
                  Überschrift zu brauchen. */}
              <ul className="snap-rail sm:flex sm:h-full sm:w-24 sm:flex-col sm:gap-3 sm:overflow-visible lg:w-28">
                {page.rail.map((entry) => (
                  <li
                    key={entry.number}
                    className="media-frame w-28 shrink-0 rounded-media sm:w-full sm:min-h-0 sm:flex-1"
                  >
                    <div className="aspect-[4/5] sm:h-full sm:aspect-auto">
                      <MediaStill media={entry.media as MediaRef} sizes="112px" />
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
                    />
                    <span className="absolute inset-x-2 bottom-2 text-center">
                      <span className="block font-display text-[0.5625rem] font-bold tracking-[0.12em] text-brand tabular">
                        {entry.number}
                      </span>
                      <span className="block text-[0.6875rem] font-semibold text-on-ink">
                        {entry.label}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionSurface>
        </div>
      </section>

      {/* Haltung: zwei Zeilen und ein Bild. Der Absatz, der hier stand,
          hat die Aussage erklärt statt sie wirken zu lassen. */}
      <Section tone="ivory" spacing="tight">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <Reveal>
              <p className="font-display text-[0.6875rem] font-bold tracking-[0.16em] text-tone-accent uppercase">
                {page.philosophy.title}
              </p>
              <p className="mt-6 max-w-[16ch] font-display text-h2 leading-[1.02] font-bold tracking-[-0.038em] text-tone-text-muted">
                {page.philosophy.lineOne}
              </p>
              <p className="mt-3 max-w-[18ch] font-display text-h2 leading-[1.02] font-bold tracking-[-0.038em] text-tone-text">
                {page.philosophy.lineTwo}
              </p>
            </Reveal>

            <MotionSurface variant="media" index={1} className="hidden lg:block">
              <div className="media-frame aspect-[4/5] rounded-frame">
                <MediaStill
                  media={page.philosophy.media as MediaRef}
                  sizes="(min-width:1024px) 34vw, 100vw"
                />
              </div>
            </MotionSurface>
          </div>
        </Container>
      </Section>

      {/* Kategorien als redaktionelle Strecke: ein breites Aufmacherfeld,
          darunter ein Paar im Hochformat, darunter zwei Querformate. Fünf
          gleich große Blöcke untereinander wären auf einer Fotografieseite
          das erwartbarste mögliche Bild. */}
      {/* spacing="none": Die Haltungssektion darüber hat dieselbe Tonlage.
          Zwei volle Innenabstände hintereinander ergäben ein leeres Feld ohne
          Kante, an der man es ablesen könnte. */}
      <Section tone="ivory" spacing="none" className="pb-section">
        <Container width="wide">
          <MaskReveal
            as="h2"
            lines={[<>Unsere <span className="text-brand">Bereiche</span></>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />

          {/* Aufmacher: randlos bis zur rechten Kante, Text darüber. */}
          {feature && (
            <Reveal className="mt-12">
              <MotionSurface variant="media">
                <div className="group/cat relative">
                  <div className="media-frame aspect-[4/5] rounded-frame sm:aspect-[16/9] lg:aspect-[21/9]">
                    <MediaStill
                      media={feature.media as MediaRef}
                      sizes="100vw"
                      className="transition-transform duration-[1100ms] ease-out group-hover/cat:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                    <span className="font-display text-sm font-bold text-brand tabular">01</span>
                    <h3 className="mt-1 text-h2 leading-[1.05] text-on-ink">{feature.title}</h3>
                    <p className="mt-3 max-w-[46ch] text-on-ink-soft">{feature.body}</p>
                  </div>
                </div>
              </MotionSurface>
            </Reveal>
          )}

          {/* Paar im Hochformat. Auf schmalen Viewports eine Wischstrecke. */}
          <div className="snap-rail mt-6 -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-8 lg:grid lg:grid-cols-2 lg:gap-6 lg:px-0">
            {pair.map((cat, i) => (
              <div key={cat.id} className="w-[76vw] max-w-[24rem] lg:w-auto lg:max-w-none">
                <Reveal delay={i * 80} className="group/cat block">
                  <MotionSurface variant="media" index={i}>
                    <div className="media-frame aspect-[4/5] rounded-frame">
                      <MediaStill
                        media={cat.media as MediaRef}
                        sizes="(min-width:1024px) 46vw, 76vw"
                        className="transition-transform duration-[1100ms] ease-out group-hover/cat:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="font-display text-sm font-bold text-tone-text-faint tabular">
                        {String(i + 2).padStart(2, '0')}
                      </span>
                      <h3>{cat.title}</h3>
                    </div>
                    <p className="mt-1.5 max-w-[40ch] text-[0.9375rem] text-tone-text-muted">
                      {cat.body}
                    </p>
                  </MotionSurface>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Zwei Querformate, versetzt. */}
          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-6">
            {wide.map((cat, i) => (
              <Reveal
                key={cat.id}
                delay={i * 80}
                className={cn('group/cat', wide.length === 1 ? 'lg:col-span-12' : i === 0 ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-16')}
              >
                <MotionSurface variant="media" index={i}>
                  <div className="media-frame aspect-[16/10] rounded-frame">
                    <MediaStill
                      media={cat.media as MediaRef}
                      sizes="(min-width:1024px) 55vw, 100vw"
                      className="transition-transform duration-[1100ms] ease-out group-hover/cat:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-tone-text-faint tabular">
                      {String(i + 4).padStart(2, '0')}
                    </span>
                    <h3>{cat.title}</h3>
                  </div>
                  <p className="mt-1.5 max-w-[44ch] text-[0.9375rem] text-tone-text-muted">
                    {cat.body}
                  </p>
                </MotionSurface>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Galerie */}
      <Section tone="ink" grain>
        <div aria-hidden className="glow-warm top-[-10rem] left-[-12rem] h-[32rem] w-[32rem] opacity-25" />
        <Container width="wide" className="relative">
          <MaskReveal
            as="h2"
            lines={[<>Ausgewählte <span className="text-brand">Arbeiten</span></>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />
          <div className="mt-12">
            <PortfolioGrid items={works} />
          </div>
        </Container>
      </Section>

      <Section tone="ivory" spacing="tight">
        <Container width="wide">
          <Eyebrow>Für die großen kleinen Momente</Eyebrow>
          <h2 className="mt-5 max-w-[20ch]">Zusammen erleben.<br />Für immer festhalten.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {page.occasions.map((occasion, index) => (
              <Reveal key={occasion.title} delay={index * 70}>
                <MotionSurface variant="soft" index={index}>
                  <article className="border-t border-tone-line-2 pt-6">
                    <span className="font-display text-sm text-tone-accent">0{index + 1}</span>
                    <h3 className="mt-5">{occasion.title}</h3>
                    <p className="mt-4 text-tone-text-muted">{occasion.body}</p>
                  </article>
                </MotionSurface>
              </Reveal>
            ))}
          </div>
          <Button as="link" to={CONTACT_PATH} className="mt-10">Euren Anlass besprechen <ArrowUpRight size={17} aria-hidden /></Button>
        </Container>
      </Section>
      <Process />
      <Faq />
    </>
  )
}

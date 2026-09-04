import { useState } from 'react'
import { ArrowUpRight, Camera, Clock, Minus, Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { MediaStill } from '@/components/ui/MediaStill'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { Parallax } from '@/components/motion/Parallax'
import { LivingMedia } from '@/components/living/LivingMedia'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { CONTACT_PATH, CTA_PRIMARY, processSteps } from '@/data/content'
import { fotografie as page } from '@/data/pages'
import { livingMedia } from '@/data/media'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/cn'
import type { MediaRef } from '@/types'

const facts = [
  { icon: Camera, title: 'Privat & Business', detail: 'Für jeden Anlass' },
  { icon: User, title: 'Persönlich', detail: 'Mit dir, für dich' },
  { icon: Clock, title: 'Im selben Termin', detail: 'Foto und Video' },
]

const works: MediaRef[] = [
  { kind: 'photo', ref: 'wedding-stairs' },
  { kind: 'photo', ref: 'portrait-court-knees' },
  { kind: 'photo', ref: 'wedding-closeup' },
  { kind: 'photo', ref: 'portrait-fence' },
  { kind: 'photo', ref: 'business-portrait-01' },
  { kind: 'photo', ref: 'portrait-court-seated' },
  { kind: 'photo', ref: 'wedding-facade' },
  { kind: 'photo', ref: 'portrait-court-full' },
  { kind: 'photo', ref: 'business-office-02' },
]

const feature = page.categories.find((c) => c.weight === 'feature')
const pair = page.categories.filter((c) => c.weight === 'pair')
const wide = page.categories.filter((c) => c.weight === 'wide')

export function Fotografie() {
  useSeo({ ...page.seo, path: '/fotografie' })
  const [openFaq, setOpenFaq] = useState<number | null>(0)

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

            <Parallax distance={44} className="hidden lg:block">
              <div className="media-frame aspect-[4/5] rounded-frame">
                <MediaStill
                  media={page.philosophy.media as MediaRef}
                  sizes="(min-width:1024px) 34vw, 100vw"
                />
              </div>
            </Parallax>
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
            </Reveal>
          )}

          {/* Paar im Hochformat. Auf schmalen Viewports eine Wischstrecke. */}
          <div className="snap-rail mt-6 -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-8 lg:grid lg:grid-cols-2 lg:gap-6 lg:px-0">
            {pair.map((cat, i) => (
              <div key={cat.id} className="w-[76vw] max-w-[24rem] lg:w-auto lg:max-w-none">
                <Reveal delay={i * 80} className="group/cat block">
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
                className={cn('group/cat', i === 0 ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-16')}
              >
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

      {/* Ablauf */}
      <Section tone="ivory">
        <Container width="wide">
          <MaskReveal
            as="h2"
            lines={[<>So läuft ein <span className="text-brand">Termin</span></>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 80} className="border-t-2 border-tone-line pt-5">
                <span className="font-display text-sm font-bold text-tone-accent tabular">
                  {step.number}
                </span>
                <h3 className="mt-3">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-tone-text-muted">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Fragen */}
      <Section tone="ivory" spacing="tight">
        <Container>
          <MaskReveal
            as="h2"
            lines={['Häufige Fragen']}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />
          <dl className="mt-10 border-t border-tone-line">
            {page.faq.map((entry, i) => {
              const open = openFaq === i
              return (
                <div key={entry.q} className="border-b border-tone-line">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-display text-[1.0625rem] font-bold tracking-[-0.02em] text-tone-text sm:text-[1.1875rem]">
                        {entry.q}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300',
                          open
                            ? 'border-brand bg-brand text-ink'
                            : 'border-tone-line-2 text-tone-text',
                        )}
                      >
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-400 ease-out',
                      open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[62ch] text-tone-text-muted">{entry.a}</span>
                    </span>
                  </dd>
                </div>
              )
            })}
          </dl>
        </Container>
      </Section>
    </>
  )
}

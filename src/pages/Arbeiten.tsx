import { useMemo, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { MotionSurface } from '@/components/motion/MotionSurface'
import { Reveal } from '@/components/motion/Reveal'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'
import { portfolio, portfolioFilters } from '@/data/content'
import { livingMedia, photos } from '@/data/media'
import type { LivingMediaId } from '@/data/media'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/cn'
import type { CategoryId, MediaRef } from '@/types'

function categoryOf(entry: MediaRef): CategoryId | undefined {
  if (entry.kind === 'photo') return photos[entry.ref as keyof typeof photos]?.category
  return livingMedia[entry.ref as LivingMediaId]?.category
}

export function Arbeiten() {
  useSeo({
    title: 'Arbeiten | Foto Panda',
    description:
      'Ausgewählte Foto- und Videoarbeiten von Foto Panda: Hochzeiten, Porträts, Gastronomie, Unternehmen und lebendige Medien.',
    path: '/arbeiten',
  })

  const [filter, setFilter] = useState<string>('alle')

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    map.set('alle', portfolio.length)
    for (const entry of portfolio) {
      const cat = categoryOf(entry)
      if (cat) map.set(cat, (map.get(cat) ?? 0) + 1)
    }
    return map
  }, [])

  const visible = useMemo(
    () => (filter === 'alle' ? portfolio : portfolio.filter((e) => categoryOf(e) === filter)),
    [filter],
  )

  /* Nur Filter anbieten, hinter denen auch etwas liegt. Ein Reiter, der eine
     leere Fläche zeigt, ist schlimmer als ein fehlender Reiter. */
  const available = portfolioFilters.filter((f) => (counts.get(f.id) ?? 0) > 0)

  return (
    <>
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-ink pt-28 pb-8 text-on-ink grain lg:pt-36 lg:pb-10"
      >
        <div aria-hidden className="glow-warm top-[-16rem] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 opacity-30" />

        <Container width="wide" className="relative">
          <Eyebrow>Portfolio</Eyebrow>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <MaskReveal
              as="h1"
              immediate
              delay={100}
              lines={['Arbeiten aus', <>dem <span className="text-brand">Alltag</span>.</>]}
              className="font-display text-display leading-[0.98] font-extrabold tracking-[-0.042em]"
            />
            <Reveal delay={400} className="lg:max-w-[36ch] lg:text-right">
              <p className="text-on-ink-muted">
                Hochzeiten, Porträts, Gerichte und Unternehmen. Antippen öffnet die große
                Ansicht; Videoarbeiten sind gekennzeichnet.
              </p>
            </Reveal>
          </div>

          {/* Filter als Wischstrecke, damit auch bei sieben Reitern nichts
              umbricht oder abgeschnitten wird. */}
          <Reveal delay={500} className="mt-10">
            <MotionSurface variant="soft">
              <div
                role="group"
                aria-label="Arbeiten filtern"
                className="snap-rail -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0"
              >
                {available.map((f) => {
                  const active = filter === f.id
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilter(f.id)}
                      aria-pressed={active}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors duration-300',
                        active
                          ? 'border-brand bg-brand text-ink'
                          : 'border-ink-line-2 text-on-ink-muted hover:border-on-ink-muted hover:text-on-ink',
                      )}
                    >
                      {f.label}
                      <span className={cn('text-xs tabular', active ? 'text-ink/60' : 'text-on-ink-faint')}>
                        {counts.get(f.id)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </MotionSurface>
          </Reveal>
        </Container>
      </section>

      <Section tone="ink" spacing="none" className="pb-section" grain>
        <Container width="wide" className="relative">
          {/* key erzwingt ein neues Raster je Filter: Die Einblendung läuft
              dadurch erneut, statt dass Kacheln stumm ausgetauscht werden. */}
          <PortfolioGrid key={filter} items={visible} />

          <p aria-live="polite" className="sr-only">
            {`${visible.length} Arbeiten werden angezeigt.`}
          </p>
        </Container>
      </Section>
    </>
  )
}

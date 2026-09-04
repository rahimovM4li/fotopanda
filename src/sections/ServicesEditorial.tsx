import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { MediaStill } from '@/components/ui/MediaStill'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { serviceEntries } from '@/data/content'
import { cn } from '@/lib/cn'
import type { MediaRef } from '@/types'

/**
 * Editorial statt Kartenraster.
 *
 * Auf Desktop dominiert ein hohes Format links, daneben stapeln sich zwei
 * Querformate, darunter laufen zwei weitere versetzt. Kein Feld hat dieselbe
 * Größe wie sein Nachbar; die Beschriftung sitzt unter dem Bild, nicht darin.
 *
 * Auf schmalen Viewports wird daraus eine Wischstrecke, bei der das nächste
 * Feld angeschnitten stehen bleibt. Eine Liste gleich hoher Karten wäre auf
 * einer Fotografieseite die langweiligste mögliche Lösung.
 */

type Entry = (typeof serviceEntries)[number]

const desktopLayout: Record<string, { col: string; media: string; sizes: string; big?: boolean }> = {
  /* Kein row-span: Ein Feld über zwei Zeilen reißt unter seiner Beschriftung
     ein totes Rechteck auf, weil der Text die zweite Zeile nicht füllt. Der
     Versatz entsteht stattdessen aus unterschiedlichen Bildformaten in
     derselben Zeile, und die Beschriftung sitzt immer direkt am Bild. */
  hochzeit: {
    col: 'lg:col-span-5',
    media: 'aspect-[4/5] lg:aspect-[3/4]',
    sizes: '(min-width:1024px) 40vw, 80vw',
    big: true,
  },
  portrait: {
    col: 'lg:col-span-7',
    media: 'aspect-[4/5] lg:aspect-[16/9]',
    sizes: '(min-width:1024px) 55vw, 80vw',
  },
  business: {
    col: 'lg:col-span-4',
    media: 'aspect-[4/5]',
    sizes: '(min-width:1024px) 30vw, 80vw',
  },
  gastronomie: {
    col: 'lg:col-span-3 lg:mt-16',
    media: 'aspect-[4/5] lg:aspect-[3/4]',
    sizes: '(min-width:1024px) 24vw, 80vw',
  },
  immobilien: {
    col: 'lg:col-span-5',
    media: 'aspect-[4/5] lg:aspect-[4/3]',
    sizes: '(min-width:1024px) 40vw, 80vw',
  },
}

function Tile({
  entry,
  mediaClass,
  sizes,
  big = false,
  className,
}: {
  entry: Entry
  mediaClass: string
  sizes: string
  big?: boolean
  className?: string
}) {
  return (
    <Link to={entry.to} className={cn('group/tile block', className)}>
      <div className={cn('media-frame rounded-media', mediaClass)}>
        <MediaStill
          media={entry.media as MediaRef}
          sizes={sizes}
          className="transition-transform duration-[900ms] ease-out group-hover/tile:scale-[1.05]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover/tile:opacity-95"
        />
      </div>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div>
          <h3
            className={cn(
              'transition-colors duration-300 group-hover/tile:text-brand',
              big && 'lg:text-[1.9rem]',
            )}
          >
            {entry.title}
          </h3>
          {/* Die Zeile schiebt sich beim Hover nach: kleine Belohnung, keine
              Information, die ohne Zeigegerät fehlen würde. */}
          <p className="mt-1.5 max-w-[34ch] text-[0.9375rem] text-tone-text-muted transition-transform duration-500 ease-out lg:group-hover/tile:translate-x-1">
            {entry.tagline}
          </p>
        </div>
        <span
          aria-hidden
          className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-tone-line-2 text-tone-text transition-all duration-400 ease-out group-hover/tile:border-brand group-hover/tile:bg-brand group-hover/tile:text-ink"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}

export function ServicesEditorial() {
  return (
    <Section tone="ivory" id="leistungen">
      <Container width="wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <MaskReveal
            as="h2"
            lines={['Fotografie für', <>Momente, die <span className="text-brand">bleiben</span>.</>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />
          <Reveal variant="fade" className="lg:max-w-[36ch] lg:text-right">
            <p className="text-tone-text-muted">
              Fünf Bereiche, für die Arbeiten vorliegen. Alles andere besprechen wir persönlich.
            </p>
          </Reveal>
        </div>

        {/* Desktop */}
        <div className="mt-16 hidden gap-x-6 gap-y-14 lg:grid lg:grid-cols-12">
          {serviceEntries.map((entry, i) => {
            const conf = desktopLayout[entry.id]
            return (
              <Reveal key={entry.id} delay={i * 70} className={conf.col}>
                <Tile entry={entry} mediaClass={conf.media} sizes={conf.sizes} big={conf.big} />
              </Reveal>
            )
          })}
        </div>

        {/* Mobil: Wischstrecke, das nächste Feld bleibt angeschnitten */}
        <div className="snap-rail mt-10 -mx-5 px-5 sm:-mx-8 sm:px-8 lg:hidden">
          {serviceEntries.map((entry) => (
            <div key={entry.id} className="w-[78vw] max-w-[22rem]">
              <Tile
                entry={entry}
                mediaClass="aspect-[4/5]"
                sizes="(min-width:640px) 22rem, 78vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

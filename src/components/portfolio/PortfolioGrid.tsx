import { useCallback, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { MediaStill } from '@/components/ui/MediaStill'
import { mediaAlt } from '@/lib/mediaAlt'
import { Reveal } from '@/components/motion/Reveal'
import { livingMedia } from '@/data/media'
import type { LivingMediaId } from '@/data/media'
import { cn } from '@/lib/cn'
import type { MediaRef } from '@/types'
import { Lightbox } from './Lightbox'

/**
 * Bewusst ungleiche Felder: Das Raster bricht, damit die Übersicht nicht wie
 * ein Katalog wirkt. Die Folge wiederholt sich alle neun Einträge und geht
 * dabei auf zwölf Spalten genau auf.
 */
const pattern = [
  { col: 'lg:col-span-5', media: 'aspect-[4/5] lg:aspect-[4/3]', sizes: '(min-width:1024px) 42vw, 48vw' },
  { col: 'lg:col-span-3', media: 'aspect-[4/5] lg:aspect-[3/4]', sizes: '(min-width:1024px) 25vw, 48vw' },
  { col: 'lg:col-span-4', media: 'aspect-[4/5]', sizes: '(min-width:1024px) 33vw, 48vw' },
  { col: 'lg:col-span-4', media: 'aspect-[4/5] lg:aspect-[1/1]', sizes: '(min-width:1024px) 33vw, 48vw' },
  { col: 'lg:col-span-3', media: 'aspect-[4/5] lg:aspect-[3/4]', sizes: '(min-width:1024px) 25vw, 48vw' },
  { col: 'lg:col-span-5', media: 'aspect-[4/5] lg:aspect-[16/10]', sizes: '(min-width:1024px) 42vw, 48vw' },
  { col: 'lg:col-span-3', media: 'aspect-[4/5] lg:aspect-[3/4]', sizes: '(min-width:1024px) 25vw, 48vw' },
  { col: 'lg:col-span-6', media: 'aspect-[4/5] lg:aspect-[16/9]', sizes: '(min-width:1024px) 50vw, 48vw' },
  { col: 'lg:col-span-3', media: 'aspect-[4/5] lg:aspect-[3/4]', sizes: '(min-width:1024px) 25vw, 48vw' },
]

export function PortfolioGrid({ items }: { items: MediaRef[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const triggers = useRef<Array<HTMLButtonElement | null>>([])

  const close = useCallback(() => {
    const last = openIndex
    setOpenIndex(null)
    if (last !== null) {
      window.requestAnimationFrame(() => triggers.current[last]?.focus())
    }
  }, [openIndex])

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5">
        {items.map((entry, index) => {
          const conf = pattern[index % pattern.length]
          const isVideo = entry.kind === 'living'
          const living = isVideo ? livingMedia[entry.ref as LivingMediaId] : null
          const label = living ? living.title : mediaAlt(entry)

          return (
            <Reveal
              as="li"
              key={`${entry.kind}-${entry.ref}-${index}`}
              delay={(index % 6) * 60}
              className={conf.col}
            >
              <button
                ref={(el) => {
                  triggers.current[index] = el
                }}
                type="button"
                onClick={() => setOpenIndex(index)}
                className="group/work media-frame block w-full cursor-pointer rounded-media text-left"
              >
                <div className={cn('relative w-full', conf.media)}>
                  <MediaStill
                    media={entry}
                    sizes={conf.sizes}
                    className="transition-transform duration-[900ms] ease-out group-hover/work:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/30 opacity-60 transition-opacity duration-500 group-hover/work:opacity-90"
                  />
                </div>

                {/* Symbol UND Text: auch ohne Farbwahrnehmung erkennbar. */}
                {isVideo && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink/75 px-2.5 py-1 font-display text-[0.625rem] font-bold tracking-[0.12em] text-on-ink uppercase backdrop-blur-md">
                    <Play className="h-2.5 w-2.5 fill-brand text-brand" strokeWidth={0} aria-hidden />
                    Video
                  </span>
                )}

                <span
                  aria-hidden
                  className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-ink/70 text-on-ink opacity-0 backdrop-blur-md transition-all duration-400 group-hover/work:opacity-100 lg:right-4 lg:bottom-4"
                >
                  <Play className="ml-0.5 h-3.5 w-3.5 fill-current" strokeWidth={0} />
                </span>

                <span className="sr-only">
                  {isVideo ? `Videoarbeit: ${label}. Große Ansicht öffnen.` : `${label}. Große Ansicht öffnen.`}
                </span>
              </button>
            </Reveal>
          )
        })}
      </ul>

      <Lightbox items={items} index={openIndex} onClose={close} onNavigate={setOpenIndex} />
    </>
  )
}

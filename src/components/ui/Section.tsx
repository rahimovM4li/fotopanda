import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type Tone = 'ink' | 'ivory'

/**
 * Eine Sektion inklusive ihrer Tonlage.
 *
 * `data-tone` schaltet die Farbvariablen um, die alle Kinder benutzen. Dadurch
 * muss keine Komponente wissen, ob sie gerade auf dunklem oder hellem Grund
 * steht: `text-tone-text` stimmt in beiden Fällen.
 *
 * Der Wechsel zwischen Ink und Ivory ist das Taktmittel der Seite. Ohne ihn
 * läuft eine lange Landingpage als eine einzige Fläche durch.
 */
export function Section({
  children,
  tone = 'ink',
  id,
  className,
  spacing = 'default',
  grain = false,
}: {
  children: ReactNode
  tone?: Tone
  id?: string
  className?: string
  spacing?: 'default' | 'tight' | 'none'
  /** Feines Korn, nur auf großen dunklen Bühnen sinnvoll */
  grain?: boolean
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        /* Die dekorativen Lichtflächen ragen absichtlich über die Kanten
           hinaus. Ohne overflow-hidden verbreitern sie das Dokument, und die
           Seite hinge daran, dass body{overflow-x:hidden} das kaschiert. */
        'relative isolate overflow-hidden',
        'bg-tone-bg text-tone-text',
        spacing === 'default' && 'py-section',
        spacing === 'tight' && 'py-section-tight',
        id && 'scroll-mt-24',
        grain && 'grain',
        className,
      )}
    >
      {children}
    </section>
  )
}

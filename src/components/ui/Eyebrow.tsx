import { cn } from '@/lib/cn'

/**
 * Die Zeile über der Hauptüberschrift einer Seite.
 *
 * Bewusst genau einmal pro Seite, direkt im Kopfbereich. Als Marke ist das
 * ein Wiedererkennungszeichen; über jeder einzelnen Sektion wiederholt wäre
 * es nur Gerüst. Die übrigen Abschnitte kommen ohne aus und trennen sich
 * über Tonlage, Größe und Komposition.
 */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 font-display text-[0.6875rem] font-bold tracking-[0.16em] text-tone-accent uppercase',
        className,
      )}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </p>
  )
}

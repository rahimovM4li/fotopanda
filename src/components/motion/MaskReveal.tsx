import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Zeilenweises Aufziehen hinter einer Maske: Jede Zeile schiebt sich von
 * unten in ihren eigenen Ausschnitt.
 *
 * Der Ausgangszustand ist sichtbar. Erst wenn der Block in den Sichtbereich
 * kommt, wird die Animation gestartet; bleibt der Beobachter aus, steht der
 * Text einfach da. Ein `opacity: 0` als Startwert hätte hier bei jedem
 * Renderer ohne Viewport eine leere Überschrift ausgeliefert.
 */
export function MaskReveal({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  stagger = 90,
  immediate = false,
}: {
  /** Eine Zeile je Eintrag. Der Umbruch ist damit gesetzt, nicht zufällig. */
  lines: ReactNode[]
  as?: ElementType
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  /** true im Hero: dort läuft der Auftritt beim Laden, nicht beim Scrollen. */
  immediate?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (immediate) {
      setRun(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [immediate])

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.09em]">
          <span
            className={cn(
              'block will-change-transform',
              run && 'motion-safe:animate-[mask-rise_900ms_var(--ease-out-expo)_both]',
              lineClassName,
            )}
            style={run ? { animationDelay: `${delay + i * stagger}ms` } : undefined}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

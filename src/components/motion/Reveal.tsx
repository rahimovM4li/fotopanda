import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'rise' | 'fade'

/**
 * Einblendung beim Scrollen, die niemals darüber entscheidet, ob etwas
 * sichtbar ist.
 *
 * Der Ausgangszustand ist vollständig sichtbar; die Animation kommt additiv
 * dazu, sobald das Element in den Sichtbereich kommt. Bleibt der Beobachter
 * aus, weil JavaScript fehlt, der Tab im Hintergrund liegt oder ein Renderer
 * ohne Viewport arbeitet, steht der Inhalt trotzdem da.
 */
export function Reveal({
  children,
  delay = 0,
  variant = 'rise',
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  variant?: Variant
  className?: string
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const anim =
    variant === 'rise'
      ? 'motion-safe:animate-[rise-in_680ms_var(--ease-out-quart)_both]'
      : 'motion-safe:animate-[fade-in_680ms_var(--ease-out-quart)_both]'

  return (
    <Tag
      ref={ref}
      className={cn(run && anim, className)}
      style={run && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

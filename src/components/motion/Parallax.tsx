import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * Verschiebt den Inhalt beim Scrollen gegen die Seitenbewegung.
 *
 * Der Ausschlag ist bewusst klein. Parallax wird dort unangenehm, wo er die
 * Leserichtung stört; hier trennt er nur Vorder- und Hintergrund.
 */
export function Parallax({
  children,
  className,
  distance = 24,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  /** Gesamtweg in Pixeln über die volle Durchlaufhöhe */
  distance?: number
  direction?: 'up' | 'down'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const sign = direction === 'up' ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [(-sign * distance) / 2, (sign * distance) / 2])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}

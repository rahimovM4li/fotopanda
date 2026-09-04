import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * Der Inhalt folgt der Maus ein Stück weit, wenn sie nah genug ist.
 *
 * Nur mit echtem Zeigegerät und nur in kleinen Ausschlägen: Ein Knopf, der
 * vor dem Klick wegläuft, ist kein Effekt, sondern ein Bedienfehler. Der
 * Ausschlag bleibt deshalb unter der halben Knopfhöhe.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  radius = 90,
}: {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 260, damping: 20, mass: 0.4 }
  const x = useSpring(mx, spring)
  const y = useSpring(my, spring)

  function onPointerMove(event: React.PointerEvent<HTMLSpanElement>) {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    const distance = Math.hypot(dx, dy)
    if (distance > radius + Math.max(rect.width, rect.height) / 2) return
    mx.set(dx * strength)
    my.set(dy * strength)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      style={{ x, y }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.span>
  )
}

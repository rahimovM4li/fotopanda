import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * Räumliche Bühne: Der Inhalt neigt sich der Maus entgegen.
 *
 * Nur auf Geräten mit echtem Zeigegerät. Auf Touch gäbe es keinen Hover, und
 * eine Neigung, die erst beim Antippen einsetzt, wäre kein Effekt, sondern
 * ein Ruckeln. `useSpring` sorgt dafür, dass die Bewegung nachläuft statt der
 * Maus zu kleben.
 *
 * Kindelemente können sich über `data-depth` unterschiedlich weit aus der
 * Ebene lösen; das erzeugt die Tiefe, die ein einzelnes gekipptes Rechteck
 * nicht hat.
 */
export function TiltStage({
  children,
  className,
  maxTilt = 7,
  perspective = 1400,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
  perspective?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 110, damping: 18, mass: 0.55 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt])
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt])

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function reset() {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn('relative', className)}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Eine Ebene innerhalb der Bühne. `depth` in Pixeln nach vorne.
 */
export function TiltLayer({
  children,
  depth = 0,
  className,
}: {
  children: ReactNode
  depth?: number
  className?: string
}) {
  return (
    <div className={className} style={{ transform: `translateZ(${depth}px)` }}>
      {children}
    </div>
  )
}

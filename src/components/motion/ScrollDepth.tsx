'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'
import { motionConfig, motionTokens } from '@/lib/motionTokens'

/**
 * Scrollgebundene Tiefe für große Bildflächen.
 *
 * Die Werte bleiben bewusst klein: Der Effekt soll wie eine Kamerafahrt
 * wirken, nicht wie ein kippendes Interface. Auf schwachen Geräten und bei
 * reduzierter Bewegung bleibt der Inhalt vollständig statisch sichtbar.
 */
export function ScrollDepth({
  children,
  className,
  contentClassName,
  distance = motionTokens.distance.md,
  tilt = 2,
  yaw = 0,
  perspective = 1500,
  mobileBoost = motionTokens.mobile.depthBoost,
  essential = false,
}: {
  children: ReactNode
  className?: string
  contentClassName?: string
  distance?: number
  tilt?: number
  yaw?: number
  perspective?: number
  mobileBoost?: number
  essential?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(query.matches)
    update()
    setEnabled(motionConfig.shouldAnimate({ essential }))
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [essential])

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [tilt, 0, -tilt])
  const rotateY = useTransform(scrollYProgress, [0, 1], [-yaw, yaw])
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [motionTokens.scale.subtle, 1, motionTokens.scale.subtle],
  )
  const mobileY = useTransform(scrollYProgress, [0, 1], [distance * mobileBoost, -distance * mobileBoost])
  const mobileRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [tilt * mobileBoost, 0, -tilt * mobileBoost],
  )
  const mobileRotateY = useTransform(scrollYProgress, [0, 1], [-yaw * mobileBoost, yaw * mobileBoost])
  const mobileScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [motionTokens.scale.mobileDepth, 1, motionTokens.scale.subtle],
  )
  const active = enabled && !reduce
  const transform = mobile
    ? { y: mobileY, rotateX: mobileRotateX, rotateY: mobileRotateY, scale: mobileScale, transformStyle: 'preserve-3d' as const }
    : { y, rotateX, rotateY, scale, transformStyle: 'preserve-3d' as const }

  return (
    <div ref={ref} className={cn('scroll-depth', className)} style={{ perspective: `${perspective}px` }}>
      <motion.div
        className={cn('scroll-depth-layer', active && 'scroll-depth-layer--active', contentClassName)}
        style={active ? transform : undefined}
      >
        {children}
      </motion.div>
    </div>
  )
}

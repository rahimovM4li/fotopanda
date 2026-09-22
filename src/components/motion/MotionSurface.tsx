import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { motionTokens } from '@/lib/motionTokens'
import { ScrollDepth } from './ScrollDepth'
import { TiltLayer, TiltStage } from './TiltStage'

type SurfaceVariant = 'hero' | 'media' | 'card' | 'soft'

const settings = {
  hero: {
    distance: motionTokens.distance.lg,
    tilt: 2.4,
    yaw: 1.4,
    mobileBoost: 2.25,
    maxTilt: 3.2,
    depth: 14,
  },
  media: {
    distance: motionTokens.distance.md,
    tilt: 1.5,
    yaw: .85,
    mobileBoost: 2.2,
    maxTilt: 2.6,
    depth: 10,
  },
  card: {
    distance: motionTokens.distance.sm,
    tilt: .9,
    yaw: .5,
    mobileBoost: 2.4,
    maxTilt: 1.8,
    depth: 7,
  },
  soft: {
    distance: motionTokens.distance.xs,
    tilt: .45,
    yaw: .2,
    mobileBoost: 1.8,
    maxTilt: .8,
    depth: 4,
  },
} as const

/** Consistent scroll depth and pointer perspective for page media and cards. */
export function MotionSurface({
  children,
  variant = 'media',
  index = 0,
  className,
  contentClassName,
}: {
  children: ReactNode
  variant?: SurfaceVariant
  index?: number
  className?: string
  contentClassName?: string
}) {
  const config = settings[variant]
  const direction = index % 2 === 0 ? 1 : -1

  return (
    <ScrollDepth
      distance={config.distance * direction}
      tilt={config.tilt}
      yaw={config.yaw * direction}
      mobileBoost={config.mobileBoost}
      className={className}
      contentClassName={cn('h-full', contentClassName)}
    >
      <TiltStage maxTilt={config.maxTilt} perspective={1600} className="h-full">
        <TiltLayer depth={config.depth} className="h-full">
          {children}
        </TiltLayer>
      </TiltStage>
    </ScrollDepth>
  )
}

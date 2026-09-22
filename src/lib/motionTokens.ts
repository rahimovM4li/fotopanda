export const motionTokens = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
    crawl: 1,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1] as const,
    sharp: [0.4, 0, 0.2, 1] as const,
    linear: [0, 0, 1, 1] as const,
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 48,
  },
  scale: {
    subtle: 0.985,
    mobileDepth: 0.965,
    press: 0.97,
    pop: 1.025,
  },
  mobile: {
    depthBoost: 1.85,
  },
} as const

export const springs = {
  snappy: { type: 'spring' as const, stiffness: 300, damping: 30 },
  gentle: { type: 'spring' as const, stiffness: 120, damping: 18, mass: 0.65 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 10 },
  instant: { type: 'spring' as const, stiffness: 600, damping: 35 },
  release: { type: 'spring' as const, stiffness: 200, damping: 20, restDelta: 0.001 },
} as const

export const motionConfig = {
  isLowEnd() {
    return typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4
  },
  prefersReduced() {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  shouldAnimate({ essential = false }: { essential?: boolean } = {}) {
    if (this.prefersReduced()) return false
    if (!essential && this.isLowEnd()) return false
    return true
  },
}

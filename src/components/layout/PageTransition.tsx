import { basePath } from '@/seo/paths'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'

/** A brief fade keeps navigation immediate and avoids a full-screen wipe. */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  return (
    <motion.div key={basePath(pathname)} initial={reduce ? false : { opacity: 0.75, transform: 'translateY(8px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

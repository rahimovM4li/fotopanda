import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'

/** A brief fade keeps navigation immediate and avoids a full-screen wipe. */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  return (
    <motion.div key={pathname} initial={reduce ? false : { opacity: 0.85 }}
      animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.2, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

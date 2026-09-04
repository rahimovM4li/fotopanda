import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'

/**
 * Seitenwechsel als kurzer Wisch.
 *
 * Eine dunkle Fläche mit warmer Oberkante fährt von unten über den Viewport
 * und wieder hinaus. Der Wechsel der Route passiert dahinter, sodass der
 * Besucher nie ein halb aufgebautes Bild sieht.
 *
 * Bewusst knapp gehalten: 520 Millisekunden für den ganzen Vorgang. Alles
 * darüber erzeugt bei jedem Klick auf die Navigation Wartezeit, wo keine ist.
 *
 * Der Inhalt selbst blendet nur, er bewegt sich nicht. Zwei gleichzeitige
 * Bewegungen an derselben Stelle lesen sich als Ruckeln.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const [wipeKey, setWipeKey] = useState<string | null>(null)

  /* Beim ersten Aufruf soll nichts wischen, nur bei echten Wechseln. */
  useEffect(() => {
    setWipeKey((current) => (current === null ? '' : pathname))
  }, [pathname])

  const ease = [0.76, 0, 0.24, 1] as const

  return (
    <>
      <AnimatePresence>
        {!reduce && wipeKey && (
          <motion.div
            key={wipeKey}
            aria-hidden
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '0%', '-100%'] }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.52, times: [0, 0.45, 1], ease }}
            className="pointer-events-none fixed inset-0 z-[65] bg-ink"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-brand to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.16, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  )
}

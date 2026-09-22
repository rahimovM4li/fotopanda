import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/siteConfig'
import { CTA_PRIMARY, CONTACT_PATH } from '@/data/content'

/**
 * Die Anfrage bleibt auf schmalen Viewports erreichbar, ohne dass etwas
 * dauerhaft im Bild klebt.
 *
 * Der Balken erscheint erst nach etwas Scrollfortschritt: Wer gerade
 * angekommen ist, hat den CTA ohnehin im Hero. Auf der Kontaktseite selbst
 * bleibt er weg, dort steht das Formular.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? scrolled / height : 0
      /* Ab einem Achtel der Seite, aber nicht ganz unten: Dort steht der
         Abschluss-CTA, ein zweiter daneben wäre Doppelung. */
      // Separate enter/leave thresholds prevent flicker near the boundary.
      setVisible((current) => current
        ? scrolled > 580 && progress < 0.92
        : scrolled > 660 && progress < 0.88)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  if (pathname === CONTACT_PATH) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-tone="ink"
          initial={{ y: reducedMotion ? 0 : 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reducedMotion ? 0 : 16, opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[40] border-t border-ink-line bg-ink/97 px-4 pt-3 xl:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-line-2 text-on-ink"
              aria-label={`Anrufen: ${siteConfig.phone}`}
            >
              <Phone className="h-4.5 w-4.5" aria-hidden />
            </a>
            <Button as="link" to={CONTACT_PATH} size="lg" className="flex-1">
              {CTA_PRIMARY}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

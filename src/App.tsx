import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { PageTransition } from '@/components/layout/PageTransition'
import { Footer } from '@/components/layout/Footer'
import { MobileCta } from '@/components/layout/MobileCta'
import { ActiveMediaProvider } from '@/components/living/ActiveMediaContext'
import { PandaMark } from '@/components/brand/PandaMark'
import { Home } from '@/pages/Home'

/* Die Startseite wird mitgeliefert, alles andere erst beim Aufruf geladen.
   Ohne diese Trennung schleppt jeder Besucher der Startseite neun weitere
   Seiten mit, von denen er in der Regel keine öffnet. */
const Fotografie = lazy(() => import('@/pages/Fotografie').then((m) => ({ default: m.Fotografie })))
const LebendigeMedien = lazy(() =>
  import('@/pages/LebendigeMedien').then((m) => ({ default: m.LebendigeMedien })),
)
const Gastronomie = lazy(() =>
  import('@/pages/Gastronomie').then((m) => ({ default: m.Gastronomie })),
)
const Unternehmen = lazy(() =>
  import('@/pages/Unternehmen').then((m) => ({ default: m.Unternehmen })),
)
const Arbeiten = lazy(() => import('@/pages/Arbeiten').then((m) => ({ default: m.Arbeiten })))
const UeberUns = lazy(() => import('@/pages/UeberUns').then((m) => ({ default: m.UeberUns })))
const Kontakt = lazy(() => import('@/pages/Kontakt').then((m) => ({ default: m.Kontakt })))
const Impressum = lazy(() => import('@/pages/Impressum').then((m) => ({ default: m.Impressum })))
const Datenschutz = lazy(() =>
  import('@/pages/Datenschutz').then((m) => ({ default: m.Datenschutz })),
)

/** Beim Routenwechsel nach oben, aber nicht bei Ankersprüngen. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => {
        const id = decodeURIComponent(hash.slice(1))
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      })
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/**
 * Platzhalter, solange ein Seitenbündel lädt.
 *
 * Bewusst eine ruhige Fläche in Seitenhöhe statt eines Spinners: Der Wechsel
 * dauert in der Regel unter 200 Millisekunden, und ein aufblitzender Spinner
 * wirkt in dieser Zeit unruhiger als gar nichts.
 */
function PageFallback() {
  return (
    <div
      data-tone="ink"
      className="grid min-h-[70vh] place-items-center bg-ink"
      aria-busy="true"
    >
      {/* Die Marke statt eines Spinners: sie sagt dasselbe ueber den Zustand
          und etwas mehr ueber die Seite. Sehr langsam pulsierend, damit sie
          bei den ueblichen 200 Millisekunden gar nicht erst auffaellt. */}
      <PandaMark className="h-12 w-12 opacity-40 motion-safe:animate-[pulse_2.4s_ease-in-out_infinite]" />
      <span className="sr-only" role="status">
        Seite wird geladen
      </span>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <PageTransition>
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/fotografie" element={<Fotografie />} />
          <Route path="/lebendige-medien" element={<LebendigeMedien />} />
          <Route path="/gastronomie" element={<Gastronomie />} />
          <Route path="/unternehmen" element={<Unternehmen />} />
          <Route path="/arbeiten" element={<Arbeiten />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </PageTransition>
  )
}

export default function App() {
  return (
    <ActiveMediaProvider>
      <ScrollToTop />
      <Header />
      <main id="inhalt">
        <AnimatedRoutes />
      </main>
      <Footer />
      <MobileCta />
    </ActiveMediaProvider>
  )
}

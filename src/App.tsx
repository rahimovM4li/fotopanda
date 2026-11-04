import { pages } from '@/seo/pages'
import { Seo } from '@/seo/Seo'
import { basePath } from '@/seo/paths'
import { NotFound } from '@/pages/NotFound'
import { useTranslation } from '@/i18n/LanguageProvider'
import { Suspense, lazy, useEffect, type ComponentType } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { PageTransition } from '@/components/layout/PageTransition'
import { Footer } from '@/components/layout/Footer'
import { MobileCta } from '@/components/layout/MobileCta'
import { ActiveMediaProvider } from '@/components/living/ActiveMediaContext'
import { PandaMark } from '@/components/brand/PandaMark'
import { Home } from '@/pages/Home'

// Keep secondary pages split into independent browser chunks.
const modules = import.meta.glob(['./pages/*.tsx', '!./pages/Home.tsx', '!./pages/NotFound.tsx'])
const routeElements = pages.map(page => {
  if (page.path === '/') return { path: page.path, element: <Home /> }
  const Component = lazy(async () => {
    const module = await modules[`./pages/${page.component}.tsx`]() as Record<string, ComponentType>
    return { default: module[page.component] }
  })
  return { path: page.path, element: <Component /> }
})

/** Beim Routenwechsel nach oben, aber nicht bei Ankersprüngen. */
function ScrollToTop() {
  const { pathname: localizedPath, hash } = useLocation()
  const pathname = basePath(localizedPath)
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
  const { t } = useTranslation()
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
      <span className="sr-only" role="status">{t("Seite wird geladen")}</span>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <PageTransition>
      <Suspense fallback={<PageFallback />}>
        <Routes location={{ ...location, pathname: basePath(location.pathname) }}>
          {routeElements.map(route => <Route key={route.path} {...route} />)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageTransition>
  )
}

export default function App() {
  return (
    <ActiveMediaProvider>
      <Seo />
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

import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Wordmark } from '@/components/Wordmark'
import { CONTACT_PATH, CTA_PRIMARY, navigation } from '@/data/content'
import { cn } from '@/lib/cn'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Die tatsächliche Headerhöhe an CSS geben, damit Ankersprünge und
     scroll-mt nicht unter der Kopfzeile landen. */
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const apply = () =>
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* Routenwechsel schließt das Menü. */
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const { body } = document
    const prevOverflow = body.style.overflow
    const prevPad = body.style.paddingRight
    const bar = window.innerWidth - document.documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (bar > 0) body.style.paddingRight = `${bar}px`

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setMenuOpen(false)
      if (e.key !== 'Tab') return
      const focusables = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    drawerRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
    const opener = menuButtonRef.current

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPad
      opener?.focus()
    }
  }, [menuOpen])

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only-focusable absolute top-3 left-3 z-[70] inline-flex min-h-11 items-center rounded-full bg-brand px-5 font-display text-sm font-bold text-ink"
      >
        Zum Inhalt springen
      </a>

      {/* Der Header liegt immer auf Ink, unabhängig von der Tonlage der
          Sektion darunter. Das hält die Navigation über die ganze Seite
          gleich lesbar, statt sie an jeder Kante umzufärben. */}
      <header
        ref={headerRef}
        data-tone="ink"
        className={cn(
          'fixed inset-x-0 top-0 z-[30] transition-[background-color,border-color,padding] duration-400 ease-out',
          scrolled
            ? 'border-b border-ink-line/80 bg-ink/80 py-2.5 backdrop-blur-xl'
            : 'border-b border-transparent py-4',
        )}
      >
        <div className="mx-auto flex w-full max-w-[92rem] items-center gap-8 px-5 sm:px-8 lg:px-12">
          <Link
            to="/"
            className="inline-flex min-h-11 shrink-0 items-center rounded-sm"
            aria-label="Foto Panda, zur Startseite"
          >
            <Wordmark showTagline={!scrolled} />
          </Link>

          <nav aria-label="Hauptnavigation" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'relative inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors duration-200',
                        isActive ? 'text-on-ink' : 'text-on-ink-muted hover:text-on-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            'absolute inset-x-3.5 bottom-1.5 h-[2px] origin-left rounded-full bg-brand transition-transform duration-400 ease-out',
                            isActive ? 'scale-x-100' : 'scale-x-0',
                          )}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Die Sichtbarkeit trägt der Wrapper: `hidden` und `inline-flex`
              sind beides Display-Utilities, und welche gewinnt, hängt an der
              Reihenfolge im Stylesheet, nicht am Klassenattribut. */}
          <div className="ml-auto hidden xl:block">
            <Button as="link" to={CONTACT_PATH} magnetic>
              {CTA_PRIMARY}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            /* Umschalter, nicht nur Oeffner: `aria-expanded` verspricht einem
               Screenreader beides. Zum Schliessen gibt es zusaetzlich das
               Kreuz im Panel und Escape. */
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-ink-line-2 text-on-ink transition-colors hover:bg-ink-2 xl:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden />
            <span className="sr-only">{menuOpen ? 'Menü schließen' : 'Menü öffnen'}</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          data-tone="ink"
          className="fixed inset-0 z-[50] xl:hidden"
        >
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Menü schließen"
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            tabIndex={-1}
          />
          <div
            ref={drawerRef}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col overflow-hidden bg-ink-2 motion-safe:animate-[drawer-in_360ms_var(--ease-out-expo)]"
          >
            <div
              aria-hidden
              className="glow-warm top-[-14rem] right-[-10rem] h-[26rem] w-[26rem] opacity-25"
            />

            <div className="relative flex items-center justify-between border-b border-ink-line px-5 py-4">
              <Wordmark />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink-line-2 text-on-ink"
              >
                <X className="h-5 w-5" aria-hidden />
                <span className="sr-only">Menü schließen</span>
              </button>
            </div>

            <nav aria-label="Navigation" className="relative flex-1 overflow-y-auto px-5 py-6">
              <ul className="flex flex-col">
                {navigation.map((item, i) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          'flex min-h-16 items-center justify-between gap-4 border-b border-ink-line font-display text-[1.375rem] font-bold tracking-[-0.025em]',
                          isActive ? 'text-brand' : 'text-on-ink',
                        )
                      }
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-[0.6875rem] font-bold tracking-[0.12em] text-on-ink-faint tabular">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item.label}
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-on-ink-faint" aria-hidden />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="relative border-t border-ink-line p-5">
              <Button as="link" to={CONTACT_PATH} size="lg" className="w-full">
                {CTA_PRIMARY}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

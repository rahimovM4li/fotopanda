import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Wordmark } from '@/components/Wordmark'
import { siteConfig } from '@/config/siteConfig'
import { CONTACT_PATH, CTA_PRIMARY, navigation } from '@/data/content'
import { cn } from '@/lib/cn'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const apply = () => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 1280px)')
    const closeOnDesktop = () => { if (breakpoint.matches) setMenuOpen(false) }
    breakpoint.addEventListener('change', closeOnDesktop)
    return () => breakpoint.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <a href="#inhalt" className="sr-only-focusable fixed top-3 left-3 z-[70] inline-flex min-h-11 items-center rounded-full bg-brand px-5 font-display text-sm font-bold text-ink">
        Zum Inhalt springen
      </a>
      <header
        ref={headerRef}
        data-tone="ink"
        className={cn('site-header fixed inset-x-0 top-0 z-[30] border-b py-3 transition-[background-color,border-color] duration-300',
          scrolled ? 'border-ink-line bg-ink/97' : 'border-white/8 bg-ink/95')}
      >
        <div className="mx-auto flex w-full max-w-[92rem] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link to="/" className="inline-flex min-h-12 shrink-0 items-center rounded-sm" aria-label="Foto Panda, zur Startseite">
            <Wordmark showTagline />
          </Link>
          <nav aria-label="Hauptnavigation" className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NavLink to={item.href} className={({ isActive }) => cn(
                    'inline-flex min-h-11 items-center rounded-full px-3 text-[0.875rem] font-medium transition-colors duration-200',
                    isActive ? 'bg-white/7 text-on-ink' : 'text-on-ink-muted hover:bg-white/4 hover:text-on-ink',
                  )}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden shrink-0 xl:block">
            <Button as="link" to={CONTACT_PATH}>
              {CTA_PRIMARY}<ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <Dialog.Trigger asChild>
            <button type="button" className="ml-auto flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-ink-line-2 px-3.5 text-on-ink transition-colors hover:bg-ink-2 xl:hidden" aria-label="Menü öffnen">
              <span className="hidden font-display text-sm font-semibold sm:inline">Menü</span>
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </Dialog.Trigger>
        </div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-backdrop fixed inset-0 z-[50] bg-black/65" />
        <Dialog.Content aria-describedby="menu-description" data-tone="ink" className="menu-panel fixed inset-y-0 right-0 z-[50] flex w-full max-w-[30rem] flex-col overflow-y-auto bg-ink px-5 text-on-ink outline-none sm:border-l sm:border-ink-line sm:px-8">
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-ink-line py-5">
            <Link to="/" onClick={() => setMenuOpen(false)} aria-label="Foto Panda, zur Startseite"><Wordmark /></Link>
            <Dialog.Close asChild>
              <button type="button" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-line-2 transition-colors hover:bg-ink-2" aria-label="Menü schließen">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>
          <p id="menu-description" className="pt-6 pb-3 text-xs font-medium tracking-[0.12em] text-on-ink-muted uppercase">Entdecken Sie Foto Panda</p>
          <nav aria-label="Mobile Hauptnavigation" className="flex-1">
            <ul>
              {navigation.map((item, i) => (
                <li key={item.href}>
                  <NavLink to={item.href} onClick={() => setMenuOpen(false)} className={({ isActive }) => cn(
                    'flex min-h-[4.25rem] items-center justify-between gap-3 border-b border-ink-line py-3 font-display text-[1.375rem] font-semibold tracking-[-0.025em] transition-colors',
                    isActive ? 'text-brand' : 'text-on-ink hover:text-brand-soft',
                  )}>
                    <span className="flex items-baseline gap-4"><span className="text-[0.6875rem] font-normal tracking-normal text-on-ink-faint tabular">{String(i + 1).padStart(2, '0')}</span>{item.label}</span>
                    <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="shrink-0 pt-7 pb-6" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
            <Button as="link" to={CONTACT_PATH} onClick={() => setMenuOpen(false)} size="lg" className="w-full">{CTA_PRIMARY}<ArrowUpRight className="h-4 w-4" aria-hidden /></Button>
            <a href={`tel:${siteConfig.phoneHref}`} className="mt-3 flex min-h-11 items-center justify-center gap-2 text-sm text-on-ink-muted hover:text-on-ink"><Phone className="h-4 w-4" aria-hidden />{siteConfig.phone}</a>
            <p className="mt-2 text-center text-xs text-on-ink-faint">{siteConfig.city} · Bundesweit für Sie unterwegs</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

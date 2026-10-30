import { useTranslation } from '@/i18n/LanguageProvider'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowUpRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Wordmark } from '@/components/Wordmark'
import { siteConfig } from '@/config/siteConfig'
import { CONTACT_PATH, CTA_PRIMARY, navigation } from '@/data/content'
import { LanguageSwitch } from './LanguageSwitch'
import { cn } from '@/lib/cn'

export function Header() {
  const { t } = useTranslation()
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
    const breakpoint = window.matchMedia('(min-width: 1400px)')
    const closeOnDesktop = () => { if (breakpoint.matches) setMenuOpen(false) }
    breakpoint.addEventListener('change', closeOnDesktop)
    return () => breakpoint.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <a href="#inhalt" className="sr-only-focusable fixed top-3 left-3 z-[70] inline-flex min-h-11 items-center rounded-full bg-brand px-5 font-display text-sm font-bold text-ink">{t("Zum Inhalt springen")}</a>
      <header
        ref={headerRef}
        data-tone="ink"
        className={cn('site-header fixed inset-x-0 top-0 z-[30] border-b py-3 transition-[background-color,border-color] duration-300',
          scrolled ? 'border-ink-line bg-ink/97' : 'border-white/8 bg-ink/95')}
      >
        <div className="mx-auto flex w-full max-w-[92rem] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link to="/" className="inline-flex min-h-12 shrink-0 items-center rounded-sm" aria-label={t("Foto Panda, zur Startseite")}>
            <Wordmark showTagline />
          </Link>
          <nav aria-label={t("Hauptnavigation")} className="ml-auto hidden min-[1400px]:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <NavLink to={item.href} className={({ isActive }) => cn(
                    'inline-flex min-h-11 items-center rounded-full px-3 text-[0.875rem] font-medium transition-colors duration-200',
                    isActive ? 'bg-white/7 text-on-ink' : 'text-on-ink-muted hover:bg-white/4 hover:text-on-ink',
                  )}>
                    {t(item.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden shrink-0 min-[1400px]:block">
            <Button as="link" to={CONTACT_PATH}>
              {t(CTA_PRIMARY)}<ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <div className="language-switch-header"><LanguageSwitch /></div>
          <Dialog.Trigger asChild>
            <button type="button" className="liquid-menu-trigger min-[1400px]:hidden" data-open={menuOpen} aria-label={t("Menü öffnen")}>
              <span className="hidden font-display text-sm font-semibold sm:inline">{t("Menü")}</span>
              <span className="liquid-burger" aria-hidden><span /><span /><span /></span>
            </button>
          </Dialog.Trigger>
        </div>
      </header>
      <Dialog.Portal>
        <Dialog.Overlay className="menu-backdrop liquid-backdrop fixed inset-0 z-[50]" />
        <Dialog.Content aria-describedby="menu-description" data-tone="ink" className="menu-panel liquid-menu-panel fixed z-[50] flex flex-col overflow-y-auto text-on-ink outline-none">
          <Dialog.Title className="sr-only">{t("Navigation")}</Dialog.Title>
          <div className="liquid-menu-top">
            <Link to="/" onClick={() => setMenuOpen(false)} aria-label={t("Foto Panda, zur Startseite")}><Wordmark /></Link>
            <Dialog.Close asChild>
              <button type="button" className="liquid-menu-trigger liquid-menu-close" data-open="true" aria-label={t("Menü schließen")}>
                <span className="liquid-burger" aria-hidden><span /><span /><span /></span>
              </button>
            </Dialog.Close>
          </div>
          <p id="menu-description" className="liquid-menu-description">{t("Entdecken Sie Foto Panda")}</p>
          <div className="liquid-menu-language"><span>{t('Sprache wählen')}</span><LanguageSwitch /></div>
          <nav aria-label={t("Mobile Hauptnavigation")} className="flex-1">
            <ul>
              {navigation.map((item, i) => (
                <li key={item.href} className="liquid-menu-item" style={{ animationDelay: `${i * 28 + 60}ms` }}>
                  <NavLink to={item.href} onClick={() => setMenuOpen(false)} className={({ isActive }) => cn(
                    'liquid-menu-link',
                    isActive ? 'is-active' : '',
                  )}>
                    <span>{t(item.label)}</span>
                    <span className="liquid-menu-arrow" aria-hidden><ArrowUpRight size={19} /></span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="liquid-menu-footer shrink-0" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
            <Button as="link" to={CONTACT_PATH} onClick={() => setMenuOpen(false)} size="lg" className="w-full">{t(CTA_PRIMARY)}<ArrowUpRight className="h-4 w-4" aria-hidden /></Button>
            <a href={`tel:${siteConfig.phoneHref}`} className="mt-3 flex min-h-11 items-center justify-center gap-2 text-sm text-on-ink-muted hover:text-on-ink"><Phone className="h-4 w-4" aria-hidden />{t(siteConfig.phone)}</a>
            <p className="mt-2 text-center text-xs text-on-ink-faint">{t(siteConfig.city)}{t(" · Bundesweit für Sie unterwegs")}</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

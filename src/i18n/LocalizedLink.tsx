import { Link as RouterLink, NavLink as RouterNavLink, type LinkProps, type NavLinkProps, type To } from 'react-router-dom'
import { useTranslation } from './LanguageProvider'
import { languagePath, type Language } from '@/seo/paths'

function localized(to: To, language: Language): To {
  if (typeof to === 'string') {
    if (!to.startsWith('/') || to.startsWith('//')) return to
    const [path, ...suffix] = to.split(/(?=[?#])/)
    return languagePath(path, language) + suffix.join('')
  }
  return to.pathname?.startsWith('/') ? { ...to, pathname: languagePath(to.pathname, language) } : to
}
export function Link({ to, ...props }: LinkProps) {
  const { language } = useTranslation()
  return <RouterLink {...props} to={localized(to, language)} />
}
export function NavLink({ to, ...props }: NavLinkProps) {
  const { language } = useTranslation()
  return <RouterNavLink {...props} to={localized(to, language)} />
}

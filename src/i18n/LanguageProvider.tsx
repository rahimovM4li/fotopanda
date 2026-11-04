import { pages } from '@/seo/pages'
/* eslint-disable react-refresh/only-export-components -- Locale context and hook form one public API. */
import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import russian from './ru.json'
import { languagePath, basePath, pathLanguage } from '@/seo/paths'

export type Language = 'de' | 'ru'
const STORAGE_KEY = 'foto-panda.language.v1'
const translations: Record<string, string> = russian
export function translate<T>(value: T, language: Language, variables?: Record<string, string | number>): T {
  if (typeof value !== 'string') return value
  const key = value.replace(/\s+/g, ' ').trim()
  let result = language === 'ru' ? (translations[key] ? `${value.match(/^\s*/)?.[0] ?? ''}${translations[key]}${value.match(/\s*$/)?.[0] ?? ''}` : value) : value
  if (variables) result = result.replace(/\{(\w+)\}/g, (match, name: string) => String(variables[name] ?? match))
  return result as T
}

const LanguageContext = createContext({ language: 'de' as Language, setLanguage: (_language: Language) => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const language = pathLanguage(location.pathname)
  const navigate = useNavigate()
  const setLanguage = useCallback((next: Language) => {
    try { localStorage.setItem(STORAGE_KEY, next) } catch { /* Storage is optional. */ }
    const params = new URLSearchParams(location.search)
    params.delete('lang')
    const path = pages.some(page => page.path === basePath(location.pathname)) ? basePath(location.pathname) : '/'
    navigate({ pathname: languagePath(path, next), search: params.toString(), hash: location.hash }, { preventScrollReset: true })
  }, [location, navigate])

  useEffect(() => {
    document.documentElement.lang = language
    // Explicit URL language wins; a saved preference never changes a crawlable URL.
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext)
  const t = useCallback(<T,>(value: T, variables?: Record<string, string | number>) => translate(value, language, variables), [language])
  return { t, language, setLanguage }
}

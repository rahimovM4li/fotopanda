/* eslint-disable react-refresh/only-export-components -- Locale context and hook form one public API. */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import russian from './ru.json'

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

function initialLanguage(): Language {
  const query = new URLSearchParams(window.location.search).get('lang')
  if (query === 'de' || query === 'ru') return query
  try { return localStorage.getItem(STORAGE_KEY) === 'ru' ? 'ru' : 'de' } catch { return 'de' }
}
const LanguageContext = createContext({ language: 'de' as Language, setLanguage: (_language: Language) => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(initialLanguage)
  const location = useLocation()
  const navigate = useNavigate()
  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next)
    const params = new URLSearchParams(location.search)
    params.set('lang', next)
    navigate({ pathname: location.pathname, search: `?${params}`, hash: location.hash }, { replace: true, preventScrollReset: true })
  }, [location, navigate])

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('lang')
    if (requested === 'de' || requested === 'ru') updateLanguage(requested)
    else if (language === 'ru') {
      const params = new URLSearchParams(location.search)
      params.set('lang', 'ru')
      navigate({ pathname: location.pathname, search: `?${params}`, hash: location.hash }, { replace: true, preventScrollReset: true })
    }
  }, [location.pathname, location.search, location.hash, navigate, language])
  useEffect(() => {
    document.documentElement.lang = language
    try { localStorage.setItem(STORAGE_KEY, language) } catch { /* Private browsing still supports switching. */ }
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext)
  const t = useCallback(<T,>(value: T, variables?: Record<string, string | number>) => translate(value, language, variables), [language])
  return { t, language, setLanguage }
}

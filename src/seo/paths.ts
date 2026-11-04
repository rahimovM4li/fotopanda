export type Language = 'de' | 'ru'
export function pathLanguage(path: string): Language {
  return /^\/ru(?:\/|$)/.test(path) ? 'ru' : 'de'
}
export function basePath(path: string): string {
  const clean = path.replace(/\/+$/, '') || '/'
  return pathLanguage(clean) === 'ru' ? clean.slice(3) || '/' : clean
}
export function languagePath(path: string, language: Language): string {
  const base = basePath(path)
  return language === 'ru' ? `/ru${base === '/' ? '' : base}` : base
}

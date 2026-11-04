import { pages } from '@/seo/pages'
import { useLocation } from 'react-router-dom'
import { languagePath, basePath } from '@/seo/paths'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from '@/i18n/LanguageProvider'

export function LanguageSwitch() {
  const { language, setLanguage, t } = useTranslation()
  const location = useLocation()
  const path = pages.some(page => page.path === basePath(location.pathname)) ? basePath(location.pathname) : '/'
  const reduce = useReducedMotion()
  return <div className="language-switch liquid-language" role="group" aria-label={t('Sprache wählen')}>
    <motion.span className="language-switch-thumb" aria-hidden="true" initial={false}
      animate={{ x: language === 'ru' ? 44 : 0 }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 30, mass: .65 }}>
      <span key={language} className="liquid-language-reflection" />
    </motion.span>
    {(['de', 'ru'] as const).map(code => <a key={code} lang={code} href={languagePath(path, code)}
      aria-label={code === 'de' ? 'Deutsch' : 'Русский'} aria-current={language === code ? 'true' : undefined}
      onClick={event => { if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); setLanguage(code) } }}><span>{code.toUpperCase()}</span></a>)}
  </div>
}

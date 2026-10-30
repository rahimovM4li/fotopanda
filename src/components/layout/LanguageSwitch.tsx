import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from '@/i18n/LanguageProvider'

export function LanguageSwitch() {
  const { language, setLanguage, t } = useTranslation()
  const reduce = useReducedMotion()
  return <div className="language-switch liquid-language" role="group" aria-label={t('Sprache wählen')}>
    <motion.span className="language-switch-thumb" aria-hidden="true" initial={false}
      animate={{ x: language === 'ru' ? 44 : 0 }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 30, mass: .65 }}>
      <span key={language} className="liquid-language-reflection" />
    </motion.span>
    {(['de', 'ru'] as const).map(code => <button key={code} type="button" lang={code}
      aria-label={code === 'de' ? 'Deutsch' : 'Русский'} aria-pressed={language === code}
      onClick={() => setLanguage(code)}><span>{code.toUpperCase()}</span></button>)}
  </div>
}

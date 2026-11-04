import { StrictMode } from 'react'
import { StaticRouter } from 'react-router-dom'
import App from '../src/App'
import { LanguageProvider } from '../src/i18n/LanguageProvider'

export function renderApp(path: string) {
  return <StrictMode><StaticRouter location={path}><LanguageProvider><App /></LanguageProvider></StaticRouter></StrictMode>
}

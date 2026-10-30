import { useSyncExternalStore } from 'react'

const query = '(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)'
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}
export function useTourMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}

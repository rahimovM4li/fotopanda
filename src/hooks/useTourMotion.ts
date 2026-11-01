import { useCallback, useSyncExternalStore } from 'react'

export function useTourMotion(includeCompact = false) {
  const query = includeCompact
    ? '(min-height: 560px) and (prefers-reduced-motion: no-preference)'
    : '(min-width: 1000px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)'
  const subscribe = useCallback((callback: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', callback)
    return () => media.removeEventListener('change', callback)
  }, [query])
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false)
}

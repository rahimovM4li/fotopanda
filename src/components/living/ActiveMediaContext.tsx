/* eslint-disable react-refresh/only-export-components -- Provider und Hook
   gehoeren zusammen; eine Trennung waere hier nur Buchhaltung. */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * Haelt fest, welche Foto-zu-Video-Einheit gerade spielt.
 * Startet der Nutzer eine zweite, pausiert die erste: das erfuellt die
 * Anforderung und verhindert nebenbei, dass mehrere Videostreams
 * gleichzeitig Bandbreite ziehen.
 */
interface ActiveMediaValue {
  activeId: string | null
  claim: (id: string) => void
  release: (id: string) => void
}

const ActiveMediaContext = createContext<ActiveMediaValue | null>(null)

export function ActiveMediaProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const claim = useCallback((id: string) => setActiveId(id), [])
  const release = useCallback(
    (id: string) => setActiveId((current) => (current === id ? null : current)),
    [],
  )

  const value = useMemo(() => ({ activeId, claim, release }), [activeId, claim, release])

  return <ActiveMediaContext.Provider value={value}>{children}</ActiveMediaContext.Provider>
}

export function useActiveMedia(): ActiveMediaValue {
  const ctx = useContext(ActiveMediaContext)
  if (!ctx) {
    throw new Error('useActiveMedia benoetigt einen ActiveMediaProvider')
  }
  return ctx
}

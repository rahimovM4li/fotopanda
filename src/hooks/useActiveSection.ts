import { useEffect, useState } from 'react'

/**
 * Ermittelt, welcher Abschnitt den sichtbaren Bereich gerade dominiert.
 * Der Beobachtungsrahmen ist oben um die Headerhoehe eingerueckt, damit der
 * Wechsel dort passiert, wo der Nutzer ihn erwartet.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      {
        rootMargin: '-88px 0px -55% 0px',
        threshold: [0.1, 0.4, 0.75],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

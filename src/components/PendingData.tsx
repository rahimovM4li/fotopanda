import { AlertTriangle } from 'lucide-react'

/**
 * Markiert eine Angabe, die noch beim Auftraggeber liegt.
 *
 * Sie bewusst sichtbar zu lassen ist der Punkt: eine erfundene Anschrift im
 * Impressum waere schlimmer als eine offene Luecke, und ein unsichtbares TODO
 * im Quelltext wuerde vor dem Livegang uebersehen.
 */
export function PendingData({ children }: { children: string }) {
  return (
    <mark className="inline-flex items-center gap-1.5 rounded-sm bg-brand/18 px-1.5 py-0.5 text-brand-soft not-italic">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span>
        <span className="sr-only">Noch zu ergänzen: </span>
        {children}
      </span>
    </mark>
  )
}

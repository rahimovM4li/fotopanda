import { PandaMark } from '@/components/brand/PandaMark'
import { siteConfig } from '@/config/siteConfig'
import { cn } from '@/lib/cn'

/**
 * Die Marke als Lockup: Blende mit Pandakopf, daneben der Schriftzug.
 *
 * Der Schriftzug ist gesetzt und nicht gezeichnet -- eine Vektorfassung der
 * Typografie liegt nicht vor. Aufbau folgt dem Original: FOTO in Textfarbe,
 * PANDA in Markenorange.
 *
 * Das Zeichen waechst mit der Zeile: ohne Claim steht es auf Zeilenhoehe,
 * mit Claim auf der Hoehe beider Zeilen. So bleibt das Lockup in Kopfzeile,
 * Fusszeile und Menue gleich proportioniert, ohne dass jede Stelle eigene
 * Werte setzt.
 */
export function Wordmark({
  showTagline = false,
  className,
}: {
  showTagline?: boolean
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <PandaMark
        className={cn('shrink-0', showTagline ? 'h-9 w-9' : 'h-7 w-7 sm:h-8 sm:w-8')}
      />
      <span className="inline-flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-extrabold tracking-[-0.05em] uppercase sm:text-[1.1875rem]">
          Foto <span className="text-brand">Panda</span>
        </span>
        {showTagline && (
          <span className="mt-1.5 font-display text-[0.5625rem] font-bold tracking-[0.19em] text-on-ink-faint uppercase">
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </span>
  )
}

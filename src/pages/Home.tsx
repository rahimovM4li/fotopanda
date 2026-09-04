import { Hero } from '@/sections/Hero'
import { LivingStory } from '@/sections/LivingStory'
import { ServicesEditorial } from '@/sections/ServicesEditorial'
import { Process } from '@/sections/Process'
import { SelectedWorks } from '@/sections/SelectedWorks'
import { WhyStrip } from '@/sections/WhyStrip'

/**
 * Die Startseite ist eine Auswahl, kein Inhaltsverzeichnis.
 *
 * Sechs Abschnitte im Wechsel von dunkel und hell: Bühne, Erzählung,
 * Lesestrecke, Bühne, Lesestrecke, Bühne. Die Tiefe liegt in den
 * Unterseiten, nicht in der Länge dieser Seite.
 */
export function Home() {
  return (
    <>
      <Hero />
      <LivingStory />
      <ServicesEditorial />
      <Process />
      <SelectedWorks />
      <WhyStrip />
    </>
  )
}

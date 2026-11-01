import { useSeo } from '@/hooks/useSeo'
import { MomentStory } from '@/sections/MomentStory'
import { Hero } from '@/sections/Hero'
import { LivingStory } from '@/sections/LivingStory'
import { ServicesEditorial } from '@/sections/ServicesEditorial'
import { Process } from '@/sections/Process'
import { SelectedWorks } from '@/sections/SelectedWorks'
import { Faq } from '@/sections/Faq'

/**
 * Die Startseite ist eine Auswahl, kein Inhaltsverzeichnis.
 *
 * Sechs Abschnitte im Wechsel von dunkel und hell: Bühne, Erzählung,
 * Lesestrecke, Bühne, Lesestrecke, Bühne. Die Tiefe liegt in den
 * Unterseiten, nicht in der Länge dieser Seite.
 */
export function Home() {
  useSeo({ title: 'Foto Panda | Professionelle Fotografie & lebendige Erinnerungen', description: 'Fotos, Videos und lebendige Medien für Hochzeiten, Unternehmen, Restaurants, Schulen und besondere Veranstaltungen. Foto Panda aus Osnabrück – bundesweit.', path: '/' })
  return (
    <>
      <Hero />
      <MomentStory />
      <ServicesEditorial />
      <SelectedWorks />
      <LivingStory />
      <Process />
      <Faq />
    </>
  )
}

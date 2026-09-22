import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { MediaStill } from '@/components/ui/MediaStill'
import { MotionSurface } from '@/components/motion/MotionSurface'
import { Reveal } from '@/components/motion/Reveal'
import { LivingStory } from '@/sections/LivingStory'
import { Process } from '@/sections/Process'
import { lebendigeMedien as page } from '@/data/pages'
import { useSeo } from '@/hooks/useSeo'

export function LebendigeMedien() {
  useSeo({ ...page.seo, path: '/lebendige-medien' })
  return <>
    <section data-tone="ink" className="bg-ink pt-32 pb-section-tight lg:pt-40">
      <Container width="wide"><div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal><div><p className="section-kicker">Print trifft digitales Erlebnis</p><h1>Ein Foto.<br />Viele Geschichten.<br /><span className="text-brand">Ein Erlebnis.</span></h1><p className="mt-7 max-w-[45ch] text-lead text-on-ink-soft">Eure Erinnerungen zum Anfassen – und zum Wiedererleben. Wir verbinden Fotobücher, Karten und Menüs mit passenden Videos und digitalen Inhalten.</p><Button as="link" to="/kontakt" size="lg" className="mt-8">Jetzt anfragen<ArrowUpRight size={18} aria-hidden /></Button></div></Reveal>
        <MotionSurface variant="hero" index={1}><figure><div className="media-frame aspect-[4/3] rounded-frame"><MediaStill media={{kind:'photo', ref:'digital-card'}} priority sizes="(min-width:1024px) 45vw, 92vw" /></div><figcaption className="mt-4 text-sm text-on-ink-muted">Ein kleines Format. Viele Möglichkeiten: Visitenkarten von Foto Panda.</figcaption></figure></MotionSurface>
      </div></Container>
    </section>
    <LivingStory />
    <Section tone="ivory" className="border-t border-ivory-line">
      <Container width="wide"><Reveal><div className="section-heading"><div><p className="section-kicker">Für Erinnerungen und neue Begegnungen</p><h2>Gedruckt. Digital.<br /><span className="text-tone-accent">Verbunden.</span></h2></div><p>Wir stimmen Gestaltung und digitale Inhalte auf euren Anlass ab.</p></div></Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <MotionSurface variant="media"><article><div className="media-frame aspect-[4/5] rounded-media"><MediaStill media={{kind:'photo',ref:'bridal-palace'}} sizes="(min-width:768px) 30vw, 90vw" /></div><h3 className="mt-5">Lebendige Fotobücher</h3><p className="mt-3 text-tone-text-muted">Die schönsten Fotos und die bewegten Momente eurer Hochzeit oder Feier. Ein Buch, zu dem ihr immer wieder zurückkehrt.</p></article></MotionSurface>
          <MotionSurface variant="media" index={1}><article><div className="media-frame aspect-[4/5] rounded-media"><MediaStill media={{kind:'living',ref:'gastronomy-kitchen'}} sizes="(min-width:768px) 30vw, 90vw" /></div><h3 className="mt-5">Lebendige Menüs</h3><p className="mt-3 text-tone-text-muted">Appetitliche Bilder, kurze Videos und Informationen zu euren Gerichten. Über einen QR-Code direkt im Browser erreichbar.</p></article></MotionSurface>
          <MotionSurface variant="media" index={2}><article><div className="media-frame aspect-[4/5] rounded-media"><MediaStill media={{kind:'photo',ref:'digital-card'}} sizes="(min-width:768px) 30vw, 90vw" /></div><h3 className="mt-5">Visitenkarten & Flyer</h3><p className="mt-3 text-tone-text-muted">Ein persönlicher erster Eindruck mit direktem Zugang zu euren Fotos, Videos oder weiteren Informationen.</p></article></MotionSurface>
        </div>
      </Container>
    </Section>
    <Process />
  </>
}

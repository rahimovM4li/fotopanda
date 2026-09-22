import { ArrowUpRight, Camera, Film, ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { LivingMedia } from '@/components/living/LivingMedia'
import { MotionSurface } from '@/components/motion/MotionSurface'
import { Reveal } from '@/components/motion/Reveal'
import { Process } from '@/sections/Process'
import { gastronomie as page } from '@/data/pages'
import { livingMedia } from '@/data/media'
import { useSeo } from '@/hooks/useSeo'

export function Gastronomie() {
  useSeo({ ...page.seo, path: '/gastronomie' })
  return <>
    <section data-tone="ink" className="bg-ink pt-32 pb-section-tight lg:pt-40">
      <Container width="wide"><div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <Reveal><div><p className="section-kicker">Gastronomie in Szene gesetzt</p><h1>Man isst zuerst<br /><span className="text-brand">mit den Augen.</span></h1><p className="mt-7 max-w-[44ch] text-lead text-on-ink-soft">Handwerk, Geschmack und die Atmosphäre Ihres Hauses. Wir erstellen appetitliche Fotos und kurze Filme für Ihre Speisekarte, Website und Social Media.</p><Button as="link" to="/kontakt" size="lg" className="mt-9">Jetzt anfragen<ArrowUpRight size={18} aria-hidden /></Button><p className="mt-6 text-sm text-on-ink-muted">Bei Ihnen vor Ort. Bundesweit.</p></div></Reveal>
        <MotionSurface variant="hero" index={1} className="mx-auto w-full max-w-[430px]"><figure><LivingMedia item={livingMedia['gastronomy-kitchen']} hint="Einen Blick in die Küche werfen" priority showCta={false} aspectClassName="aspect-[4/5]" radiusClassName="rounded-frame" /><figcaption className="mt-4 text-sm text-on-ink-muted">Vom ersten Handgriff bis zum fertigen Gericht.</figcaption></figure></MotionSurface>
      </div></Container>
    </section>
    <Section tone="ivory"><Container width="wide"><Reveal><div><p className="section-kicker">Ein Termin. Vielseitige Inhalte.</p><h2>So kommt Ihr Haus<br /><span className="text-tone-accent">zur Geltung.</span></h2></div></Reveal><div className="mt-12 grid gap-10 md:grid-cols-3">
      {[{icon:Camera,title:'Fotos, die Appetit machen',body:'Gerichte, Details und Atmosphäre – abgestimmt auf Speisekarten, Flyer und Ihre Website.'},{icon:Film,title:'Ihr Handwerk in Bewegung',body:'Kurze Filme zeigen die Zubereitung und das Anrichten. Für Social Media und Ihren digitalen Auftritt.'},{icon:ScanLine,title:'Ein Menü zum Entdecken',body:'Ein QR-Code verbindet Ihre Speisekarte mit Fotos, Videos und Informationen. Direkt im Browser Ihrer Gäste.'}].map(({icon:Icon,title,body}, index)=><MotionSurface key={title} variant="card" index={index}><article className="motion-info-card border-t border-tone-line pt-6"><Icon className="mb-6 text-tone-accent" size={26} aria-hidden /><h3>{title}</h3><p className="mt-4 text-tone-text-muted">{body}</p></article></MotionSurface>)}
    </div><Button as="link" to="/lebendige-medien" variant="outline" className="mt-10">Digitale Erlebnisse entdecken<ArrowUpRight size={18} aria-hidden /></Button></Container></Section>
    <Process />
  </>
}

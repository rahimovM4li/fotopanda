import { GastronomyFilms } from '@/sections/GastronomyFilms'
import { GastronomyTour } from '@/sections/GastronomyTour'
import { useTranslation } from '@/i18n/LanguageProvider'
import { ArrowUpRight, Camera, Film, ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Picture } from '@/components/ui/Picture'
import { LivingMedia } from '@/components/living/LivingMedia'
import { MotionSurface } from '@/components/motion/MotionSurface'
import { Reveal } from '@/components/motion/Reveal'
import { Process } from '@/sections/Process'
import { gastronomie as page } from '@/data/pages'
import { livingMedia, photos } from '@/data/media'
import { siteConfig } from '@/config/siteConfig'
import { useSeo } from '@/hooks/useSeo'

export function Gastronomie() {
  const { t } = useTranslation()
  useSeo({ ...page.seo, path: '/gastronomie' })
  return <>
    <section data-tone="ink" className="bg-ink pt-32 pb-section-tight lg:pt-40">
      <Container width="wide"><div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <div>
            <p className="section-kicker">{t(page.eyebrow)}</p>
            <h1>{t(page.headlineLines[0])}<br /><span className="text-brand">{t(page.headlineAccent)}</span></h1>
            <p className="mt-5 font-display text-[clamp(1.35rem,2.2vw,2rem)] leading-snug text-on-ink-soft">{t(page.subtitle)}</p>
            <p className="mt-7 max-w-[44ch] text-lead text-on-ink-soft">{t(page.lead)}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button as="link" to="/kontakt" size="lg">{t("Jetzt anfragen")}<ArrowUpRight size={18} aria-hidden /></Button>
              <Button as="a" href={`tel:${siteConfig.phoneHref}`} variant="outline" size="lg">{t(siteConfig.phone)}</Button>
            </div>
          </div>
        </Reveal>
        <div className="mx-auto grid w-full max-w-[640px] grid-cols-[1.1fr_.9fr] items-start gap-4 sm:gap-6">
          <MotionSurface variant="media">
            <figure>
              <a href="/assets/photos/restaurant-menu-853.jpg" target="_blank" rel="noopener noreferrer" className="media-frame block overflow-hidden rounded-media" aria-label={t("Speisekarte des Restaurants Gänsefeder in voller Größe öffnen (neuer Tab)")}>
                <Picture photo={photos['restaurant-menu']} priority sizes="(min-width:1024px) 26vw, (min-width:640px) 340px, 52vw" />
              </a>
              <figcaption className="mt-4 text-sm text-on-ink-muted">{t("Die Speisekarte.")}<br /><a href="/assets/photos/restaurant-menu-853.jpg" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-on-ink underline underline-offset-4">{t("In voller Größe ansehen")}<ArrowUpRight className="shrink-0" size={15} aria-hidden /><span className="sr-only">{t(" (neuer Tab)")}</span></a></figcaption>
            </figure>
          </MotionSurface>
          <MotionSurface variant="media" index={1} className="mt-12 sm:mt-16">
            <div>
              <LivingMedia item={livingMedia['gastro-table']} hint={t("Film ansehen")} priority fullscreenOnMobile showCta={false} showStatus={false} aspectClassName="aspect-[9/16]" radiusClassName="rounded-media" />
              <p className="mt-4 text-sm text-on-ink-muted">{t("Vom Foto zum Genuss.")}<br />{t("Antippen. Film erleben.")}</p>
            </div>
          </MotionSurface>
        </div>
      </div></Container>
    </section>
    <GastronomyTour />
    <GastronomyFilms />
    <Section tone="ivory"><Container width="wide"><Reveal><div><p className="section-kicker">{t("Ein Termin. Vielseitige Inhalte.")}</p><h2>{t("So kommt Ihr Haus")}<br /><span className="text-tone-accent">{t("zur Geltung.")}</span></h2></div></Reveal><div className="mt-12 grid gap-10 md:grid-cols-3">
      {[{icon:Camera,title:'Fotos, die Appetit machen',body:'Gerichte, Details und Atmosphäre – abgestimmt auf Speisekarten, Flyer und Ihre Website.'},{icon:Film,title:'Ihr Handwerk in Bewegung',body:'Kurze Filme zeigen die Zubereitung und das Anrichten. Für Social Media und Ihren digitalen Auftritt.'},{icon:ScanLine,title:'Ein Menü zum Entdecken',body:'Ein QR-Code verbindet Ihre Speisekarte mit Fotos, Videos und Informationen. Direkt im Browser Ihrer Gäste.'}].map(({icon:Icon,title,body}, index)=><MotionSurface key={title} variant="card" index={index}><article className="motion-info-card border-t border-tone-line pt-6"><Icon className="mb-6 text-tone-accent" size={26} aria-hidden /><h3>{t(title)}</h3><p className="mt-4 text-tone-text-muted">{t(body)}</p></article></MotionSurface>)}
    </div><Button as="link" to="/lebendige-medien" variant="outline" className="mt-10">{t("Digitale Erlebnisse entdecken")}<ArrowUpRight size={18} aria-hidden /></Button></Container></Section>
    <Process />
  </>
}

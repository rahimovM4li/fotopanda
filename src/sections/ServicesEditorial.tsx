import { useTranslation } from '@/i18n/LanguageProvider'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { MediaStill } from '@/components/ui/MediaStill'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollDepth } from '@/components/motion/ScrollDepth'
import { TiltLayer, TiltStage } from '@/components/motion/TiltStage'
import { serviceEntries } from '@/data/content'

export function ServicesEditorial() {
  const { t } = useTranslation()
  return (
    <Section tone="ivory" id="leistungen" className="service-section">
      <Container width="wide">
        <Reveal><div className="section-heading"><div><p className="section-kicker">{t("So vielseitig wie eure Ideen")}</p><h2>{t("Euer Moment.")}<br /><span className="text-tone-accent">{t("Unsere Perspektive.")}</span></h2></div><p>{t("Von der ersten Begegnung bis zum großen Auftritt. Fotos und Filme, die zu euch passen.")}</p></div></Reveal>
        <div className="service-grid">
          {serviceEntries.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 55} className="service-motion">
              <ScrollDepth distance={index % 2 === 0 ? 12 : -12} tilt={1.1} yaw={index % 2 === 0 ? .7 : -.7} mobileBoost={2.6} essential contentClassName="h-full">
                <TiltStage maxTilt={2.8} perspective={1500} className="h-full">
                  <TiltLayer depth={10} className="h-full">
                    <Link to={entry.to} className="service-tile">
                      <div className="service-photo"><MediaStill media={entry.media} sizes="(min-width:1024px) 32vw, (min-width:768px) 30vw, 90vw" /></div>
                      <div className="service-tile-title"><h3>{t(entry.title)}</h3><ArrowUpRight size={20} aria-hidden /></div>
                      <p>{t(entry.tagline)}</p>
                    </Link>
                  </TiltLayer>
                </TiltStage>
              </ScrollDepth>
            </Reveal>
          ))}
        </div>
        <div className="service-extra"><p><strong>{t("Auch die kleinen und großen Meilensteine gehören dazu.")}</strong><br />{t("Schule, Kindergarten, Tanzveranstaltung oder Abschlussball: Wir begleiten eure besonderen Tage mit Foto und Video.")}</p><Link className="text-link" to="/kontakt">{t("Euren Anlass besprechen ")}<ArrowUpRight size={18} aria-hidden /></Link></div>
      </Container>
    </Section>
  )
}

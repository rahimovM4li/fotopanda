import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { MediaStill } from '@/components/ui/MediaStill'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollDepth } from '@/components/motion/ScrollDepth'
import { TiltLayer, TiltStage } from '@/components/motion/TiltStage'
import { CONTACT_PATH, CTA_PRIMARY } from '@/data/content'

export function Hero() {
  return (
    <section id="start" data-tone="ink" className="home-hero">
      <div className="hero-composition">
        <div className="hero-copy">
          <Reveal variant="fade"><p className="section-kicker">Foto Panda · Fotografie & Film</p></Reveal>
          <Reveal delay={80}><h1>Das Foto bleibt.<br />Der Moment<br />wird <span>lebendig.</span></h1></Reveal>
          <Reveal delay={160}>
            <p className="hero-description">Für die großen Gefühle. Und die kleinen Details. Wir erzählen eure Geschichte in Fotos, Filmen und digitalen Erlebnissen.</p>
            <div className="hero-actions">
              <Button as="link" to={CONTACT_PATH} size="lg">{CTA_PRIMARY}<ArrowUpRight size={18} aria-hidden /></Button>
              <Link className="text-link" to="/arbeiten">Arbeiten entdecken <ArrowUpRight size={17} aria-hidden /></Link>
            </div>
          </Reveal>
          <div className="hero-footnote"><span>Aus Osnabrück.<br /><strong>Für euch bundesweit.</strong></span><a href="#leistungen" aria-label="Unsere Leistungen entdecken"><ArrowDown size={20} aria-hidden /></a></div>
        </div>
        <div className="hero-art">
          <ScrollDepth distance={18} tilt={1.8} yaw={1.2} mobileBoost={2.25} essential>
            <TiltStage maxTilt={3.2} perspective={1700} className="hero-tilt-stage">
              <TiltLayer>
                <figure className="hero-main-photo">
                  <MediaStill media={{ kind: 'photo', ref: 'bridal-full-length' }} priority sizes="(min-width:1024px) 56vw, 100vw" />
                  <span className="hero-photo-frame" aria-hidden="true" />
                  <figcaption>
                    <span className="hero-caption-copy"><small>Eine Hochzeitsgeschichte</small><strong>Ein Augenblick.<br />Ganz viel Gefühl.</strong></span>
                    <span className="hero-photo-label">Hochzeitsfotografie</span>
                  </figcaption>
                </figure>
              </TiltLayer>
              <TiltLayer depth={18}>
                <div className="hero-art-meta" aria-label="Bildsignatur">
                  <span className="hero-art-index">01 <i>/</i> 04</span>
                  <span>Editorial Bridal Story</span>
                  <span>Fotos. Filme. Erinnerungen.</span>
                </div>
              </TiltLayer>
            </TiltStage>
          </ScrollDepth>
        </div>
      </div>
      <div className="hero-service-line" aria-label="Unser Angebot"><span>Hochzeit & Feier</span><span>Menschen & Momente</span><span>Business & Gastronomie</span><span>Lebendige Medien</span></div>
    </section>
  )
}

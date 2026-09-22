import { ArrowUpRight, ScanLine, Smartphone, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { MediaStill } from '@/components/ui/MediaStill'
import { StoreButtons } from '@/components/StoreButtons'
import { ScrollDepth } from '@/components/motion/ScrollDepth'
import { TiltLayer, TiltStage } from '@/components/motion/TiltStage'
import { siteConfig } from '@/config/siteConfig'

/** User-controlled demonstration, with no scroll-triggered playback. */
export function LivingStory() {
  return (
    <Section tone="ivory" id="app" className="app-section">
      <Container width="wide">
        <div className="app-composition">
          <ScrollDepth distance={20} tilt={2.4} yaw={-1.6} mobileBoost={2.35} essential className="app-demo-motion">
            <TiltStage maxTilt={3} perspective={1600}>
              <TiltLayer depth={12}>
                <div className="app-demo">
                  <div className="media-frame aspect-[4/3] rounded-media"><MediaStill media={{ kind: 'photo', ref: 'school-album' }} sizes="(min-width:1024px) 45vw, 90vw" /></div>
                  <p className="mt-3 text-xs text-tone-text-muted">Fotobuch · Gestaltungsbeispiel</p>
                  <div className="app-demo-caption"><span>Gedruckt für immer.</span><strong>Erlebt im Hier und Jetzt.</strong></div>
                </div>
              </TiltLayer>
            </TiltStage>
          </ScrollDepth>
          <div className="app-copy">
            <p className="section-kicker">Lebendige Medien</p>
            <h2>Mehr als ein Foto.<br /><span className="text-tone-accent">Ein Wiedererleben.</span></h2>
            <p>Ein Fotobuch zum Blättern. Ein Film zum Eintauchen. Wir verbinden eure Fotos mit Videos – für Erinnerungen, die ihr immer wieder erleben könnt.</p>
            <ol className="app-steps">
              <li><Smartphone aria-hidden size={20} /><span>Die App <strong>{siteConfig.app.name}</strong> öffnen.</span></li>
              <li><ScanLine aria-hidden size={20} /><span>Den zugehörigen QR-Code scannen und das Bild erfassen.</span></li>
              <li><Play aria-hidden size={20} /><span>Den Moment als Video noch einmal erleben.</span></li>
            </ol>
            <StoreButtons />
            <p className="app-platform-note">Erhältlich für iPhone und Android.</p>
            <Link className="text-link" to="/lebendige-medien">Fotobücher & digitale Erlebnisse <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { CONTACT_PATH, CTA_PRIMARY, processSteps } from '@/data/content'

export function Process() {
  return (
    <Section tone="ink" id="ablauf" className="process-section">
      <Container width="wide">
        <div className="section-heading">
          <div><p className="section-kicker">Von der Idee zum Erlebnis</p><h2>So läuft ein <span className="text-brand">Termin</span></h2></div>
          <p>Persönlich besprochen.<br />Mit Sorgfalt umgesetzt.</p>
        </div>
        <ol className="process-grid">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 50}>
              <span className="process-number">{step.number}</span><h3>{step.title}</h3><p>{step.description}</p>
            </Reveal>
          ))}
        </ol>
        <div className="process-action"><Button as="link" to={CONTACT_PATH} size="lg">{CTA_PRIMARY}<ArrowUpRight size={18} aria-hidden /></Button><span>Wir freuen uns auf eure Idee.</span></div>
      </Container>
    </Section>
  )
}

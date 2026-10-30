import { useTranslation } from '@/i18n/LanguageProvider'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { CONTACT_PATH, CTA_PRIMARY, processSteps } from '@/data/content'

export function Process() {
  const { t } = useTranslation()
  return (
    <Section tone="ink" id="ablauf" className="process-section">
      <Container width="wide">
        <div className="section-heading">
          <div><p className="section-kicker">{t("Von der Idee zum Erlebnis")}</p><h2>{t("So läuft ein ")}<span className="text-brand">{t("Termin")}</span></h2></div>
          <p>{t("Persönlich besprochen.")}<br />{t("Mit Sorgfalt umgesetzt.")}</p>
        </div>
        <ol className="process-grid">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 50}>
              <span className="process-number">{t(step.number)}</span><h3>{t(step.title)}</h3><p>{t(step.description)}</p>
            </Reveal>
          ))}
        </ol>
        <div className="process-action"><Button as="link" to={CONTACT_PATH} size="lg">{t(CTA_PRIMARY)}<ArrowUpRight size={18} aria-hidden /></Button><span>{t("Wir freuen uns auf eure Idee.")}</span></div>
      </Container>
    </Section>
  )
}

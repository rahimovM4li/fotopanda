import { useTranslation } from '@/i18n/LanguageProvider'
import { Plus, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { faq, CONTACT_PATH } from '@/data/content'
import '@/faq.css'

/** Native disclosures stay keyboard accessible and never animate measured heights. */
export function Faq() {
  const { t } = useTranslation()
  return (
    <Section tone="ivory" id="fragen" className="faq-section">
      <Container width="wide">
        <div className="faq-layout">
          <div>
            <Eyebrow>{t("Gut zu wissen")}</Eyebrow>
            <h2 className="mt-5">{t("Häufige Fragen")}</h2>
            <p className="mt-6 max-w-[30ch] text-tone-text-muted">{t("Von der ersten Idee bis zum lebendigen Fotobuch. Hier findet ihr die Antworten.")}</p>
            <Button as="link" to={CONTACT_PATH} variant="outline" className="mt-8">{t("Persönlich nachfragen ")}<ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <div className="faq-list">
            {faq.map((entry, index) => (
              <details key={entry.q} className="faq-item">
                <summary>
                  <span className="faq-number" aria-hidden>{String(index + 1).padStart(2, '0')}</span>
                  <span>{t(entry.q)}</span>
                  <span className="faq-toggle" aria-hidden><Plus size={18} /></span>
                </summary>
                <div className="faq-answer"><p>{t(entry.a)}</p></div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

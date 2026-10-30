import { useTranslation } from '@/i18n/LanguageProvider'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { PortfolioGallery } from '@/sections/PortfolioGallery'

/**
 * Auf der Startseite steht nur eine Auswahl. Das vollständige Portfolio hat
 * eine eigene Seite; eine Startseite, die alles zeigt, hat keinen Grund mehr,
 * irgendwohin zu führen.
 */
export function SelectedWorks() {
  const { t } = useTranslation()
  return (
    <>
    <Section tone="ink" id="arbeiten" spacing="tight">
      <Container width="wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <MaskReveal
            as="h2"
            lines={['Augenblicke,', <>{t("die ")}<span className="text-brand">{t("erzählen.")}</span></>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />
          <Reveal variant="fade">
            <Button as="link" to="/arbeiten" variant="outline" size="lg">{t("Alle Arbeiten")}<ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </Reveal>
        </div>

      </Container>
    </Section>
    <PortfolioGallery />
    </>
  )
}

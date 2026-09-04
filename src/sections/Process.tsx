import { Camera, Clapperboard, Link2, Play } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { processSteps } from '@/data/content'

const icons = [Camera, Clapperboard, Link2, Play]

/**
 * Der Ablauf ist eine echte Reihenfolge, deshalb tragen die Schritte Nummern
 * und liegen an einer Linie. Auf schmalen Viewports kippt die Linie in die
 * Senkrechte, statt zu verschwinden.
 */
export function Process() {
  return (
    <Section tone="ink" id="ablauf" grain>
      <div aria-hidden className="glow-warm top-[-10rem] left-[-14rem] h-[34rem] w-[34rem] opacity-25" />

      <Container width="wide" className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <MaskReveal
            as="h2"
            lines={[<>So <span className="text-brand">funktioniert&rsquo;s</span>.</>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />
          <Reveal variant="fade" className="lg:max-w-[34ch] lg:text-right">
            <p className="text-on-ink-muted">
              Vier Schritte vom ersten Anruf bis zu dem Moment, in dem sich das Bild bewegt.
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
          <div
            aria-hidden
            className="absolute top-8 left-8 h-[calc(100%-5rem)] w-px bg-gradient-to-b from-ink-line-2 via-ink-line-2 to-transparent md:top-8 md:left-0 md:h-px md:w-full md:bg-gradient-to-r md:from-transparent md:via-ink-line-2 md:to-transparent"
          />

          {processSteps.map((step, i) => {
            const Icon = icons[i]
            return (
              <Reveal as="li" key={step.number} delay={i * 90} className="relative">
                <span className="relative grid h-16 w-16 place-items-center rounded-full border border-ink-line-2 bg-ink text-brand">
                  <Icon className="h-6 w-6" aria-hidden />
                  <span className="absolute -top-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full bg-brand font-display text-[0.625rem] font-bold text-ink tabular">
                    {step.number}
                  </span>
                </span>
                <h3 className="mt-6">{step.title}</h3>
                <p className="mt-2.5 max-w-[32ch] text-[0.9375rem] text-on-ink-muted">
                  {step.description}
                </p>
              </Reveal>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}

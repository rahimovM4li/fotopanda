import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { Parallax } from '@/components/motion/Parallax'
import { MediaStill } from '@/components/ui/MediaStill'
import { benefits } from '@/data/content'

/**
 * Die Gründe stehen als nummerierte Liste neben einem hohen Bild, das beim
 * Scrollen leicht gegenläuft. Vier gleich große Kärtchen mit Symbol wären an
 * dieser Stelle das erwartbarste mögliche Bild.
 */
export function WhyStrip() {
  return (
    <Section tone="ink" grain>
      <div aria-hidden className="glow-warm right-[-16rem] bottom-[-14rem] h-[36rem] w-[36rem] opacity-25" />

      <Container width="wide" className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <MaskReveal
              as="h2"
              lines={[<>Warum <span className="text-brand">Foto Panda</span>?</>]}
              className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
            />

            <dl className="mt-12 border-t border-ink-line">
              {benefits.map((benefit, i) => (
                <Reveal
                  key={benefit.title}
                  delay={i * 80}
                  className="group/row grid grid-cols-[auto_1fr] gap-x-6 border-b border-ink-line py-7 transition-colors duration-500 hover:border-brand/50"
                >
                  <span className="font-display text-sm font-bold text-on-ink-faint tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <dt className="text-h3 transition-colors duration-300 group-hover/row:text-brand">
                      {benefit.title}
                    </dt>
                    <dd className="mt-2 max-w-[52ch] text-[0.9375rem] text-on-ink-muted">
                      {benefit.description}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          <Parallax distance={70} className="hidden lg:block">
            <div className="media-frame rounded-frame aspect-[3/4]">
              <MediaStill
                media={{ kind: 'photo', ref: 'portrait-fence' }}
                sizes="(min-width:1024px) 32vw, 100vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
              />
            </div>
          </Parallax>
        </div>
      </Container>
    </Section>
  )
}

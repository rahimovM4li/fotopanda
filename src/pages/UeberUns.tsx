import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Section } from '@/components/ui/Section'
import { MaskReveal } from '@/components/motion/MaskReveal'
import { Reveal } from '@/components/motion/Reveal'
import { Parallax } from '@/components/motion/Parallax'
import { MediaStill } from '@/components/ui/MediaStill'
import { benefits, CONTACT_PATH, CTA_PRIMARY } from '@/data/content'
import { ueberUns as page } from '@/data/pages'
import { siteConfig } from '@/config/siteConfig'
import { useSeo } from '@/hooks/useSeo'

/**
 * Die ruhigste Seite der Website.
 *
 * Kein Glow, kein Grain, keine Parallaxe im Seitenkopf: Wer hier landet,
 * will wissen, mit wem er es zu tun hat, und nicht noch einmal beeindruckt
 * werden. Die Mittel sind Weissraum, Schriftgrad und ein einziges Bild.
 */
export function UeberUns() {
  useSeo({ ...page.seo, path: '/ueber-uns' })

  return (
    <>
      {/* Seitenkopf: Typografie links, das Set rechts. Das Set-Bild ist der
          einzige echte Blick auf die Arbeit, den das Material hergibt --
          ein Portraet des Fotografen liegt nicht vor und wird nicht erfunden. */}
      <section
        data-tone="ink"
        className="relative isolate overflow-hidden bg-ink pt-28 pb-section-tight text-on-ink lg:pt-36"
      >
        <div className="relative mx-auto grid w-full max-w-[92rem] items-end gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20 lg:px-12">
          <div>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <MaskReveal
              as="h1"
              immediate
              delay={100}
              lines={[...page.headlineLines, <span className="text-brand">{page.headlineAccent}</span>]}
              className="mt-6 font-display text-display leading-[0.98] font-extrabold tracking-[-0.042em]"
            />
            <Reveal delay={420} className="mt-10">
              <blockquote className="max-w-[26ch] border-l-2 border-brand pl-6 font-display text-h3 leading-[1.22] font-medium text-on-ink-soft">
                {page.quote}
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={260} className="lg:justify-self-end">
            <figure className="lg:w-[23rem]">
              <div className="media-frame aspect-[4/5] rounded-frame">
                <MediaStill
                  media={page.atWork.media}
                  sizes="(min-width:1024px) 23rem, 100vw"
                  priority
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline gap-3 text-[0.8125rem] text-on-ink-muted">
                <span className="font-display font-bold tracking-[0.14em] text-brand uppercase">
                  {page.atWork.label}
                </span>
                {page.atWork.caption}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Der Text steht allein und gross. Drei Saetze, die man zu Ende liest. */}
      <Section tone="ivory" spacing="none" className="pt-section pb-section-tight">
        <Container>
          <Reveal variant="fade">
            <p className="max-w-[24ch] font-display text-h2 leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
              {page.lead}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-12">
            {page.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={140 + i * 90}>
                <p className="max-w-[44ch] text-lead text-tone-text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={340} className="mt-12">
            <Button as="link" to={CONTACT_PATH} size="lg" magnetic>
              {CTA_PRIMARY}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Drei Arbeiten, jede mit dem Namen ihrer Gattung darunter. Die
          Beschriftung ersetzt den Absatz, der hier frueher stand. */}
      <Section tone="ivory" spacing="none" className="pb-section">
        <Container width="wide">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {page.gallery.map((item, i) => (
              <Parallax
                key={item.media.ref}
                distance={i === 1 ? 44 : 22}
                direction={i === 1 ? 'down' : 'up'}
                className={i === 2 ? 'col-span-2 lg:col-span-1' : undefined}
              >
                <figure>
                  <div
                    className={
                      i === 2
                        ? 'media-frame aspect-[16/10] rounded-frame lg:aspect-[3/4]'
                        : 'media-frame aspect-[3/4] rounded-frame'
                    }
                  >
                    <MediaStill media={item.media} sizes="(min-width:1024px) 30vw, 46vw" />
                  </div>
                  <figcaption className="mt-3 font-display text-[0.6875rem] font-bold tracking-[0.16em] text-tone-text-faint uppercase">
                    {item.label}
                  </figcaption>
                </figure>
              </Parallax>
            ))}
          </div>
        </Container>
      </Section>

      {/* Haltung als Liste, dieselbe Sprache wie auf der Startseite. */}
      <Section tone="ink">
        <Container width="wide" className="relative">
          <MaskReveal
            as="h2"
            lines={[<>Woran wir uns <span className="text-brand">halten</span></>]}
            className="font-display text-h2 leading-[1] font-bold tracking-[-0.038em]"
          />
          <dl className="mt-12 grid gap-x-12 border-t border-ink-line sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <Reveal
                key={benefit.title}
                delay={i * 80}
                className="border-b border-ink-line py-7"
              >
                <dt className="flex items-baseline gap-4 text-h3">
                  <span className="font-display text-sm font-bold text-on-ink-faint tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {benefit.title}
                </dt>
                <dd className="mt-2 max-w-[46ch] pl-10 text-[0.9375rem] text-on-ink-muted">
                  {benefit.description}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-12">
            <p className="text-on-ink-muted">
              Sie erreichen uns direkt unter{' '}
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                {siteConfig.phone}
              </a>{' '}
              oder per E-Mail an{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

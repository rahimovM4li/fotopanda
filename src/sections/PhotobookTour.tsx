import { useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'motion/react'
import { ScrollTour, type TourStageProps } from '@/components/tours/ScrollTour'
import { MediaStill } from '@/components/ui/MediaStill'
import { LivingMedia } from '@/components/living/LivingMedia'
import { livingMedia } from '@/data/media'
import { useTranslation } from '@/i18n/LanguageProvider'

const chapters = [
  { label: 'Das Buch', title: 'Eine Geschichte zum Anfassen.', body: 'Die schönsten Fotos und die bewegten Momente eurer Hochzeit oder Feier. Ein Buch, zu dem ihr immer wieder zurückkehrt.' },
  { label: 'Die Seiten', title: 'Mit jeder Seite näher.', body: 'Gedruckt für immer.' },
  { label: 'Der Film', title: 'Der Moment tritt heraus.', body: 'Eure Erinnerungen zum Anfassen – und zum Wiedererleben. Wir verbinden Fotobücher, Karten und Menüs mit passenden Videos und digitalen Inhalten.' },
]
function BookStage({ progress: p, animated }: TourStageProps) {
  const { t } = useTranslation()
  const [ready, setReady] = useState(false)
  useMotionValueEvent(p, 'change', value => setReady(value >= .66))
  const cover = useTransform(p, [.2, .4], [0, -175])
  const page = useTransform(p, [.46, .68], [0, -172])
  const rotateX = useTransform(p, [0, .65, 1], [20, 8, 0])
  const rotateZ = useTransform(p, [0, .65, 1], [-8, -3, 0])
  const leftOpacity = useTransform(p, [.2, .3], [0, 1])
  const bookScale = useTransform(p, [.15, .4], [1.45, 1])
  const x = useTransform(p, [.15, .4], ['-22%', '0%'])
  const lift = useTransform(p, [.66, 1], [0, 100])
  const scale = useTransform(p, [.66, 1], [1, 1.18])
  return <div className="book-studio"><div className="scene-watermark" aria-hidden>Memories</div><motion.div className="memory-book" style={animated ? { rotateX, rotateZ, x, scale: bookScale } : undefined}>
    <motion.div className="book-left" style={{ opacity: animated ? leftOpacity : 1 }}><MediaStill media={{ kind: 'photo', ref: 'wedding-stairs' }} sizes="35vw" /></motion.div>
    <div className="book-right" inert={animated && !ready}>
      <motion.div className="book-memory" style={animated ? { z: lift, scale } : undefined}>
        <LivingMedia active={!animated || ready} item={livingMedia.wedding} hint={t('Foto zum Leben erwecken')} showCta={false} showStatus={false} aspectClassName="aspect-[3/4]" radiusClassName="rounded-none" />
      </motion.div>
    </div>
    <motion.div className="book-leaf" style={{ rotateY: animated ? page : -172 }} aria-hidden>
      <div className="leaf-front"><MediaStill media={{ kind: 'photo', ref: 'wedding-closeup' }} sizes="35vw" /></div>
      <div className="leaf-back"><MediaStill media={{ kind: 'photo', ref: 'bridal-palace' }} sizes="35vw" /></div>
    </motion.div>
    <motion.div className="book-cover" style={{ rotateY: animated ? cover : -175 }} aria-hidden>
      <div className="cover-front"><MediaStill media={{ kind: 'photo', ref: 'bridal-palace-portrait' }} sizes="40vw" /><span>Foto Panda<br />{t('Eine Hochzeitsgeschichte')}</span></div>
      <div className="cover-back" />
    </motion.div>
  </motion.div></div>
}
export function PhotobookTour() {
  return <ScrollTour cinematic id="book-tour" title="Lebendige Fotobücher" chapters={chapters} to="/kontakt" cta="Jetzt anfragen">{props => <BookStage {...props} />}</ScrollTour>
}

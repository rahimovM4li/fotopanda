import { motion, useTransform } from 'motion/react'
import { livingMedia } from '@/data/media'
import { LivingMedia } from '@/components/living/LivingMedia'
import { MediaStill } from '@/components/ui/MediaStill'
import { ScrollTour, type TourStageProps } from '@/components/tours/ScrollTour'
import { useTranslation } from '@/i18n/LanguageProvider'


const chapters = [
  { label: 'Das Foto', title: 'Ein Bild. Alles wieder da.', body: 'Der Blick. Das Licht. Dieses eine Gefühl. Wir halten fest, was euren Tag unverwechselbar macht.' },
  { label: 'Der Film', title: 'Und plötzlich lebt es.', body: 'Das Lächeln wird Bewegung. Aus einem Augenblick wird eine Szene. Startet den Film und erlebt den Unterschied.' },
  { label: 'Das Fotobuch', title: 'Zum Anfassen. Zum Wiedererleben.', body: 'Eure Fotos als hochwertiges Fotobuch. Eure Filme über die passende App. Eine Erinnerung, zu der ihr immer wieder zurückkehrt.' },
]

/** One stable player, three physical compositions. Nothing leaves this stage. */
function PrintStage({ progress: p, animated }: TourStageProps) {
  const { t } = useTranslation()
  const scale = useTransform(p, [0, .23, .4, .61, .8, 1], [.78, .78, 1, 1, .58, .58])
  const x = useTransform(p, [0, .23, .4, .61, .8, 1], ['-5%', '-5%', '0%', '0%', '40%', '40%'])
  const y = useTransform(p, [0, .61, .8, 1], ['0%', '0%', '-8%', '-8%'])
  const rotate = useTransform(p, [0, .23, .4, .61, .8, 1], [-7, -7, 0, 0, 5, 5])
  const mat = useTransform(p, [.25, .4, .64, .8], [1, 0, 0, 1])
  const stack = useTransform(p, [.22, .37], [1, 0])
  const spread = useTransform(p, [0, .3], [0, 60])
  const bookOpacity = useTransform(p, [.64, .78], [0, 1])
  const bookY = useTransform(p, [.64, .82], [90, 0])
  const bookRotate = useTransform(p, [.64, .85], [18, -9])
  const coverRotate = useTransform(p, [.69, .9], [0, -165])
  return <div className="story-studio">
    <div className="story-stage-word" aria-hidden>Foto Panda</div>
    <motion.div className="story-contact-print story-contact-print--left" style={{ opacity: animated ? stack : 0, x: animated ? spread : 0 }} aria-hidden>
      <MediaStill media={{ kind: 'photo', ref: 'bridal-palace' }} sizes="25vw" />
      <span>01 / FOTO PANDA</span>
    </motion.div>
    <motion.div className="story-contact-print story-contact-print--right" style={{ opacity: animated ? stack : 0 }} aria-hidden>
      <MediaStill media={{ kind: 'photo', ref: 'bridal-palace-portrait' }} sizes="25vw" />
      <span>{t('Eine Hochzeitsgeschichte')}</span>
    </motion.div>
    <motion.div className="story-album" style={animated ? { opacity: bookOpacity, y: bookY, rotateZ: bookRotate } : undefined} aria-hidden>
      <div className="story-album-page story-album-page--left">
        <span className="story-album-title">{t('Für immer. Für euch.')}</span>
        <MediaStill media={{ kind: 'photo', ref: 'bridal-palace' }} sizes="30vw" />
        <span className="story-album-folio">FOTO PANDA — 01</span>
      </div>
      <div className="story-album-page story-album-page--right">
        <MediaStill media={{ kind: 'living', ref: 'wedding' }} sizes="30vw" />
        <span className="story-album-folio">{t('Ein Moment wird Erinnerung.')}</span>
      </div>
      <motion.div className="story-album-cover" style={{ rotateY: animated ? coverRotate : -165 }}>
        <span>FOTO PANDA</span><strong>{t('Unsere Geschichte.')}</strong><span>{t('Eine Hochzeitsgeschichte')}</span>
      </motion.div>
    </motion.div>
    <motion.div className="story-film" style={animated ? { scale, x, y, rotateZ: rotate } : undefined}>
      <LivingMedia item={livingMedia.wedding} showCta={false} showStatus={false} hint={t('Unseren Film erleben')} aspectClassName="aspect-[4/5]" radiusClassName="rounded-none" />
      <motion.div className="story-print-border" style={{ opacity: animated ? mat : 1 }} aria-hidden />
      <motion.span className="story-print-signature" style={{ opacity: animated ? mat : 1 }} aria-hidden>FOTO PANDA <span>{t('Ein Moment wird Erinnerung.')}</span></motion.span>
    </motion.div>
    <div className="story-studio-footer"><span>{t('Echte Momente. Eure Geschichte.')}</span><span aria-hidden>PHOTO / FILM / MEMORIES</span></div>
  </div>
}

export function MomentStory() {
  return <ScrollTour cinematic id="photo-film" title="Das Foto ist erst der Anfang." chapters={chapters} to="/kontakt" cta="Eure Geschichte mit uns planen">
    {(props) => <PrintStage {...props} />}
  </ScrollTour>
}

import { useState } from 'react'
import { motion, useMotionValueEvent, useTransform } from 'motion/react'
import { ScrollTour, type TourStageProps } from '@/components/tours/ScrollTour'
import { MediaStill } from '@/components/ui/MediaStill'
import { LivingMedia } from '@/components/living/LivingMedia'
import { livingMedia } from '@/data/media'
import { useTranslation } from '@/i18n/LanguageProvider'

const chapters = [
  { label: 'Die Küche', title: 'Hier beginnt der Geschmack.', body: 'Das Handwerk dahinter. Ein Einblick in die Küche.' },
  { label: 'Das Gericht', title: 'Ein Gericht. Alle Blicke.', body: 'Gerichte, Details und Atmosphäre – abgestimmt auf Speisekarten, Flyer und Ihre Website.' },
  { label: 'Das Menü', title: 'Vom Teller aufs Papier.', body: 'Die Speisekarte wird zur Bühne für Ihre Gerichte.' },
  { label: 'Digital', title: 'Und weiter ins Digitale.', body: 'Ein QR-Code verbindet Ihre Speisekarte mit Fotos, Videos und Informationen. Direkt im Browser Ihrer Gäste.' },
]
function GastronomyStage({ progress: p, animated }: TourStageProps) {
  const { t } = useTranslation()
  const [ready, setReady] = useState(false)
  useMotionValueEvent(p, 'change', value => setReady(value >= .8))
  const kitchenOpacity = useTransform(p, [.16, .28], [1, 0])
  const kitchenX = useTransform(p, [0, .28], ['0%', '-30%'])
  const menuOpacity = useTransform(p, [.16, .28, .7, .83], [0, 1, 1, 0])
  // The dish is a crop of the approved menu: the same pixels pull back into print.
  const menuScale = useTransform(p, [.25, .42, .62, 1], [4.5, 4.5, 1, .8])
  const menuX = useTransform(p, [.25, .42, .62, 1], ['-130%', '-130%', '0%', '-25%'])
  const menuY = useTransform(p, [.25, .42, .62], ['77%', '77%', '0%'])
  const menuClip = useTransform(p, [.25, .42, .62], ['inset(27.5% 3% 61% 60% round 2px)', 'inset(27.5% 3% 61% 60% round 2px)', 'inset(0% 0% 0% 0%)'])
  const menuRotate = useTransform(p, [.42, .62, .83], [0, -7, -14])
  const videoOpacity = useTransform(p, [.7, .83], [0, 1])
  const videoY = useTransform(p, [.7, .85], [100, 0])
  const videoScale = useTransform(p, [.7, .85], [.94, 1])
  return <div className="gastronomy-stage">
    <motion.div className="gastro-kitchen" style={animated ? { opacity: kitchenOpacity, x: kitchenX } : { display: 'none' }} aria-hidden>
      <MediaStill media={{ kind: 'living', ref: 'gastronomy-kitchen' }} sizes="(min-width:1000px) 42vw, 90vw" />
    </motion.div>
    <motion.div className="gastro-menu" style={animated ? { opacity: menuOpacity, scale: menuScale, x: menuX, y: menuY, rotateZ: menuRotate, clipPath: menuClip } : undefined}>
      <MediaStill media={{ kind: 'photo', ref: 'restaurant-menu' }} sizes="(min-width:1000px) 853px, 50vw" />
    </motion.div>
    <motion.div className="gastro-video" inert={animated && !ready} aria-hidden={animated && !ready} style={animated ? { opacity: videoOpacity, y: videoY, scale: videoScale } : undefined}>
      <LivingMedia active={!animated || ready} item={livingMedia['gastronomy-kitchen']} hint={t('Küchenvideo abspielen')} showCta={false} showStatus={false} aspectClassName="aspect-[9/16]" radiusClassName="rounded-none" />
    </motion.div>
  </div>
}
export function GastronomyTour() {
  return <ScrollTour cinematic id="menu-tour" title="Vom Gericht zum Erlebnis." chapters={chapters} to="/kontakt" cta="Jetzt anfragen">{props => <GastronomyStage {...props} />}</ScrollTour>
}

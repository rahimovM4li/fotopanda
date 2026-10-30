import { motion, useTransform } from 'motion/react'
import { livingStory } from '@/data/content'
import { livingMedia } from '@/data/media'
import { LivingMedia } from '@/components/living/LivingMedia'
import { ScrollTour, type TourStageProps } from '@/components/tours/ScrollTour'
import { useTranslation } from '@/i18n/LanguageProvider'

function PrintStage({ progress, animated }: TourStageProps) {
  const { t } = useTranslation()
  const scale = useTransform(progress, [0, .3, .7, 1], [.67, .78, 1, 1])
  const rotateZ = useTransform(progress, [0, .5, 1], [-7, 0, 0])
  const rotateY = useTransform(progress, [0, .5, 1], [-15, 0, 0])
  const frameOpacity = useTransform(progress, [.3, .68], [1, 0])
  const captionOpacity = useTransform(progress, [.2, .45], [1, 0])
  return <motion.div className="cinema-print" style={animated ? { scale, rotateZ, rotateY } : undefined}>
    <LivingMedia item={livingMedia.wedding} showCta={false} showStatus={false} hint={t('Foto zum Leben erwecken')} aspectClassName="aspect-[4/5]" radiusClassName="rounded-none" />
    <motion.div className="cinema-mat" style={{ opacity: animated ? frameOpacity : 0 }} aria-hidden />
    <motion.p className="cinema-caption" style={{ opacity: animated ? captionOpacity : 0 }} aria-hidden>Foto Panda · {t('Eine Hochzeitsgeschichte')}</motion.p>
  </motion.div>
}
export function MomentStory() {
  return <ScrollTour id="photo-film" title="Das Foto ist erst der Anfang." chapters={livingStory.steps} to={livingStory.cta.to} cta={livingStory.cta.label}>
    {(props) => <PrintStage {...props} />}
  </ScrollTour>
}

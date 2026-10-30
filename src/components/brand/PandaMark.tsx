import { useTranslation } from '@/i18n/LanguageProvider'
import { cn } from '@/lib/cn'

/** Original customer artwork: panda with camera and orange viewfinder. */
export function PandaMark({ className, title }: { className?: string; title?: string }) {
  const { t } = useTranslation()
  return (
    <img
      src="/assets/brand/panda-camera.png"
      width={680}
      height={680}
      alt={t(title ?? '')}
      aria-hidden={title ? undefined : true}
      className={cn('block shrink-0 rounded-[15%] bg-black object-contain', className)}
    />
  )
}

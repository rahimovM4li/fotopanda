import { cn } from '@/lib/cn'
import { livingMedia, photos } from '@/data/media'
import type { LivingMediaId } from '@/data/media'
import type { MediaRef } from '@/types'
import { Picture } from './Picture'

/**
 * Standbild für Übersichten: entweder ein Foto aus der Fotostrecke oder das
 * Poster eines Videos. Bewusst ohne Wiedergabesymbol, damit das Symbol dort
 * seine Bedeutung behält, wo wirklich etwas passiert.
 */
export function MediaStill({
  media,
  sizes,
  className,
  priority = false,
}: {
  media: MediaRef
  sizes: string
  className?: string
  priority?: boolean
}) {
  if (media.kind === 'photo') {
    const photo = photos[media.ref as keyof typeof photos]
    if (!photo) return null
    return (
      <Picture
        photo={photo}
        sizes={sizes}
        className={cn('h-full w-full', className)}
        priority={priority}
      />
    )
  }

  const item = livingMedia[media.ref as LivingMediaId]
  if (!item) return null

  return (
    <picture className={cn('block h-full w-full', className)}>
      <source type="image/avif" srcSet={`${item.posterBase}.avif`} />
      <source type="image/webp" srcSet={`${item.posterBase}.webp`} />
      <img
        src={`${item.posterBase}.jpg`}
        alt={item.alt}
        width={item.intrinsic.width}
        height={item.intrinsic.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={{
          objectPosition: item.objectPosition,
          backgroundImage: item.lqip ? `url("${item.lqip}")` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: item.objectPosition ?? '50% 50%',
        }}
        className="h-full w-full object-cover"
      />
    </picture>
  )
}

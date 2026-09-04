import { livingMedia, photos } from '@/data/media'
import type { LivingMediaId } from '@/data/media'
import type { MediaRef } from '@/types'

/** Alternativtext eines Verweises, für Beschriftungen und Lightbox-Titel. */
export function mediaAlt(media: MediaRef): string {
  if (media.kind === 'photo') return photos[media.ref as keyof typeof photos]?.alt ?? ''
  return livingMedia[media.ref as LivingMediaId]?.alt ?? ''
}

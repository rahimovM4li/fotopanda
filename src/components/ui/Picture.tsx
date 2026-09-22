import { cn } from '@/lib/cn'
import type { Photo } from '@/types'

interface PictureProps {
  photo: Photo
  /** `sizes`-Angabe, damit Mobilgeraete nicht die groesste Variante laden */
  sizes: string
  className?: string
  imgClassName?: string
  /** nur fuer das LCP-Bild: laedt sofort statt verzoegert */
  priority?: boolean
}

/**
 * Foto in AVIF, WebP und JPEG mit passenden Breiten.
 * Das `aspect-ratio` kommt aus den natuerlichen Massen, damit beim Laden
 * kein Layoutsprung entsteht.
 */
export function Picture({ photo, sizes, className, imgClassName, priority = false }: PictureProps) {
  const set = (ext: string) =>
    photo.widths.map((w) => `${photo.base}-${w}.${ext} ${w}w`).join(', ')

  return (
    <picture className={cn('block', className)}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`${photo.base}-${photo.widths.at(-1)}.jpg`}
        srcSet={set('jpg')}
        sizes={sizes}
        alt={photo.alt}
        width={photo.intrinsic.width}
        height={photo.intrinsic.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={{
          objectPosition: photo.objectPosition,
          backgroundImage: photo.lqip ? `url("${photo.lqip}")` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: photo.objectPosition ?? '50% 50%',
        }}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </picture>
  )
}

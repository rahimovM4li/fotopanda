import { useCallback, useEffect, useRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { LivingMedia } from '@/components/living/LivingMedia'
import { livingMedia, photos } from '@/data/media'
import type { LivingMediaId } from '@/data/media'
import type { MediaRef } from '@/types'

const SWIPE = 48

/**
 * Vollbildansicht für Fotos und Videos.
 *
 * Escape, Klick außerhalb, Fokusfalle, Fokusrückgabe und Scroll-Sperre
 * übernimmt der Radix-Dialog. Ergänzt sind Blättern per Pfeiltaste und per
 * Wischgeste.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: MediaRef[]
  index: number | null
  onClose: () => void
  onNavigate: (next: number) => void
}) {
  const startX = useRef<number | null>(null)
  const open = index !== null
  const item = index !== null ? items[index] : null

  const goPrev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  const goNext = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, goPrev, goNext])

  if (!item) return null

  const photo = item.kind === 'photo' ? photos[item.ref as keyof typeof photos] : null
  const living = item.kind === 'living' ? livingMedia[item.ref as LivingMediaId] : null
  const title = photo ? photo.alt : (living?.title ?? '')

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-md data-[state=open]:animate-[fade-in_220ms_ease-out]" />
        <Dialog.Content
          data-tone="ink"
          className="fixed inset-0 z-[70] flex flex-col outline-none"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            document.getElementById('lightbox-close')?.focus()
          }}
          onTouchStart={(e) => {
            startX.current = e.touches[0]?.clientX ?? null
          }}
          onTouchEnd={(e) => {
            const from = startX.current
            startX.current = null
            if (from === null) return
            const delta = (e.changedTouches[0]?.clientX ?? from) - from
            if (Math.abs(delta) < SWIPE) return
            if (delta > 0) goPrev()
            else goNext()
          }}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {`Arbeit ${(index ?? 0) + 1} von ${items.length}. Mit den Pfeiltasten blättern, mit Escape schließen.`}
          </Dialog.Description>

          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <p className="font-display text-sm font-bold text-on-ink/60 tabular">
              {String((index ?? 0) + 1).padStart(2, '0')}{' '}
              <span className="text-on-ink/30">/ {String(items.length).padStart(2, '0')}</span>
            </p>
            <Dialog.Close asChild>
              <button
                id="lightbox-close"
                type="button"
                className="grid h-11 w-11 place-items-center rounded-full border border-on-ink/25 text-on-ink transition-colors hover:border-brand hover:bg-brand hover:text-ink"
              >
                <X className="h-5 w-5" aria-hidden />
                <span className="sr-only">Ansicht schließen</span>
              </button>
            </Dialog.Close>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center gap-2 px-2 pb-4 sm:gap-5 sm:px-6">
            <button
              type="button"
              onClick={goPrev}
              className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-on-ink/25 text-on-ink transition-colors hover:border-brand hover:bg-brand hover:text-ink sm:grid"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              <span className="sr-only">Vorherige Arbeit</span>
            </button>

            <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">
              {photo && (
                <picture className="flex max-h-full max-w-full items-center justify-center">
                  <source type="image/avif" srcSet={`${photo.base}-1320.avif`} />
                  <source type="image/webp" srcSet={`${photo.base}-1320.webp`} />
                  <img
                    src={`${photo.base}-1320.jpg`}
                    alt={photo.alt}
                    width={photo.intrinsic.width}
                    height={photo.intrinsic.height}
                    /* Nie über die Originalauflösung hinaus vergrößern. */
                    style={{ maxWidth: `min(100%, ${photo.intrinsic.width}px)` }}
                    className="max-h-[74vh] w-auto rounded-media object-contain"
                  />
                </picture>
              )}

              {living && (
                <LivingMedia
                  key={living.id}
                  item={living}
                  hint="Video ansehen"
                  showCta={false}
                  showStatus={false}
                  aspectClassName=""
                  className="w-full max-w-4xl [&_.media-frame]:max-h-[74vh]"
                />
              )}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-on-ink/25 text-on-ink transition-colors hover:border-brand hover:bg-brand hover:text-ink sm:grid"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
              <span className="sr-only">Nächste Arbeit</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 pb-5 sm:hidden">
            <button
              type="button"
              onClick={goPrev}
              className="grid h-12 w-12 place-items-center rounded-full border border-on-ink/25 text-on-ink"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              <span className="sr-only">Vorherige Arbeit</span>
            </button>
            <p className="text-center text-xs text-on-ink/50">Wischen zum Blättern</p>
            <button
              type="button"
              onClick={goNext}
              className="grid h-12 w-12 place-items-center rounded-full border border-on-ink/25 text-on-ink"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
              <span className="sr-only">Nächste Arbeit</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

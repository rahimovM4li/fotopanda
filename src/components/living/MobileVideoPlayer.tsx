import { useEffect, useId, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { LivingMediaItem } from '@/types'
import { useActiveMedia } from './ActiveMediaContext'

type SafariVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void
  webkitExitFullscreen?: () => void
  webkitDisplayingFullscreen?: boolean
}

/** Opened only by a play click. The viewport dialog also covers browsers without native fullscreen. */
export function MobileVideoPlayer({ item, onClose, onReturnFocus }: {
  item: LivingMediaItem
  onClose: () => void
  onReturnFocus: () => void
}) {
  const [video, setVideo] = useState<SafariVideo | null>(null)
  const [failed, setFailed] = useState(false)
  const instanceId = useId()
  const { claim, release } = useActiveMedia()

  useEffect(() => {
    if (!video) return
    let disposed = false
    let enteredFullscreen = false
    const nativeFullscreen = window.matchMedia('(pointer: coarse)').matches
    const onFullscreen = () => {
      if (document.fullscreenElement === video) enteredFullscreen = true
      else if (enteredFullscreen) onClose()
    }
    const onSafariExit = () => onClose()
    const onVisibility = () => { if (document.hidden) video.pause() }
    const enterSafariFullscreen = () => {
      if (!nativeFullscreen || !video.webkitEnterFullscreen || video.webkitDisplayingFullscreen) return
      try { video.webkitEnterFullscreen() } catch { /* The viewport dialog remains available. */ }
    }

    document.addEventListener('fullscreenchange', onFullscreen)
    document.addEventListener('visibilitychange', onVisibility)
    video.addEventListener('webkitendfullscreen', onSafariExit)
    video.addEventListener('loadedmetadata', enterSafariFullscreen, { once: true })
    claim(instanceId)

    // Narrow desktop previews use the viewport dialog; touch devices use their native player.
    video.playsInline = !nativeFullscreen
    // Do not await loading/playback before requesting fullscreen: preserve the play click's activation.
    void video.play().catch(() => { if (!disposed) setFailed(true) })
    if (nativeFullscreen && video.requestFullscreen && document.fullscreenEnabled) {
      void video.requestFullscreen().catch(() => { /* Use the full viewport dialog. */ })
    } else if (video.readyState >= 1) enterSafariFullscreen()

    return () => {
      disposed = true
      document.removeEventListener('fullscreenchange', onFullscreen)
      document.removeEventListener('visibilitychange', onVisibility)
      video.removeEventListener('webkitendfullscreen', onSafariExit)
      video.removeEventListener('loadedmetadata', enterSafariFullscreen)
      video.pause()
      if (document.fullscreenElement === video) void document.exitFullscreen().catch(() => {})
      if (video.webkitDisplayingFullscreen) video.webkitExitFullscreen?.()
      release(instanceId)
    }
  }, [claim, instanceId, item.video, onClose, release, video])

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black" />
        <Dialog.Content data-tone="ink" className="fixed inset-0 z-[70] flex h-dvh flex-col bg-black text-on-ink outline-none"
          onCloseAutoFocus={(event) => { event.preventDefault(); onReturnFocus() }}>
          <Dialog.Title className="sr-only">{item.title}</Dialog.Title>
          <Dialog.Description className="sr-only">Video im Vollbild. Mit den Videosteuerungen pausieren und den Ton einschalten. Mit Schließen zur Seite zurückkehren.</Dialog.Description>
          <div className="flex shrink-0 items-center justify-between gap-4 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
            <p className="text-sm">{item.title}</p>
            <Dialog.Close asChild><button type="button" className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border border-on-ink/40" aria-label="Video schließen"><X size={22} aria-hidden /></button></Dialog.Close>
          </div>
          <video ref={setVideo} src={item.video} poster={`${item.posterBase}.jpg`} controls muted
            className="min-h-0 w-full flex-1 object-contain pb-[env(safe-area-inset-bottom)]"
            aria-label={item.title} onError={() => setFailed(true)} onPlaying={() => setFailed(false)} />
          {failed && <p role="alert" className="px-5 py-4 text-center text-sm">Das Video lässt sich gerade nicht abspielen. Bitte über die Videosteuerung erneut starten.</p>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

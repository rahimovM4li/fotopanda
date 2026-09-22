import { PandaMark } from '@/components/brand/PandaMark'
import { siteConfig } from '@/config/siteConfig'
import { cn } from '@/lib/cn'

/** Both artwork and lettering are faithful crops of the new customer logo. */
export function Wordmark({ showTagline = false, className }: {
  showTagline?: boolean
  className?: string
}) {
  return (
    <span className={cn('brand-lockup inline-flex items-center gap-3', className)}>
      <PandaMark className="h-12 w-12 sm:h-13 sm:w-13" />
      <span className="inline-flex flex-col gap-2">
        <img
          src="/assets/brand/wordmark.png"
          width={640}
          height={84}
          alt="Foto Panda"
          className="h-auto w-[148px] sm:w-[158px]"
        />
        {showTagline && (
          <span className="font-display text-[0.5625rem] font-semibold tracking-[0.13em] text-on-ink-muted uppercase">
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </span>
  )
}

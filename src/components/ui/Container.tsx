import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const widths = {
  text: 'max-w-[70ch]',
  default: 'max-w-[82rem]',
  wide: 'max-w-[92rem]',
  full: 'max-w-none',
}

export function Container({
  children,
  className,
  width = 'default',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  width?: keyof typeof widths
  as?: ElementType
}) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', widths[width], className)}>
      {children}
    </Tag>
  )
}

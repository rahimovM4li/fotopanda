import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Magnetic } from '@/components/motion/Magnetic'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline' | 'ghost' | 'onBrand'
type Size = 'md' | 'lg'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full ' +
  'font-display font-bold tracking-[-0.015em] whitespace-nowrap ' +
  'transition-[background-color,border-color,color,box-shadow] duration-250 ease-out ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  /* Ink auf Orange erreicht 5,91:1. Weiß auf Orange nur 3,33:1 und wird
     deshalb nirgends verwendet. */
  primary:
    'bg-brand text-ink hover:bg-brand-hover',
  outline: 'border border-tone-line-2 text-tone-text hover:border-tone-text-muted hover:bg-tone-surface',
  ghost: 'text-tone-text-muted hover:text-tone-text',
  onBrand: 'bg-ink text-on-ink hover:bg-ink-2',
}

const sizes: Record<Size, string> = {
  /* min-h-11 sind 44px, die Untergrenze für Touch-Ziele. */
  md: 'min-h-11 px-5 text-[0.9375rem]',
  lg: 'min-h-[3.375rem] px-7 text-[1.0625rem]',
}

interface Styling {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /** Auf Desktop folgt der Knopf der Maus ein Stück weit. */
  magnetic?: boolean
}

type ButtonProps = Styling &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & { as?: 'button' }
type AnchorProps = Styling &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children'> & { as: 'a' }
type LinkProps = Styling &
  Omit<ComponentPropsWithoutRef<typeof Link>, 'className' | 'children'> & { as: 'link' }

export function Button(props: ButtonProps | AnchorProps | LinkProps) {
  const { variant = 'primary', size = 'md', className, children, magnetic = false } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  let node: ReactNode

  if (props.as === 'a') {
    const { as, variant: _v, size: _s, className: _c, children: _ch, magnetic: _m, ...rest } = props
    void as
    void _v
    void _s
    void _c
    void _ch
    void _m
    node = (
      <a className={classes} {...rest}>
        {children}
      </a>
    )
  } else if (props.as === 'link') {
    const { as, variant: _v, size: _s, className: _c, children: _ch, magnetic: _m, ...rest } = props
    void as
    void _v
    void _s
    void _c
    void _ch
    void _m
    node = (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    )
  } else {
    const { as, variant: _v, size: _s, className: _c, children: _ch, magnetic: _m, ...rest } = props
    void as
    void _v
    void _s
    void _c
    void _ch
    void _m
    node = (
      <button className={classes} {...rest}>
        {children}
      </button>
    )
  }

  return magnetic ? <Magnetic>{node}</Magnetic> : node
}

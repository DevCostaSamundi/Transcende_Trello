'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC] disabled:opacity-50 disabled:cursor-not-allowed select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-[#0052CC] text-white hover:bg-[#0747A6] active:bg-[#0747A6] focus-visible:outline-[#0052CC]',
  secondary:
    'bg-[#F4F5F7] text-[#172B4D] border border-[#DFE1E6] hover:bg-[#EBECF0] active:bg-[#DFE1E6]',
  ghost:
    'bg-transparent text-[#0052CC] border border-[#0052CC] hover:bg-[#E9F2FF] active:bg-[#DEEBFF]',
  danger:
    'bg-[#DE350B] text-white hover:bg-[#BF2600] active:bg-[#BF2600] focus-visible:outline-[#DE350B]',
  link: 'bg-transparent text-[#0052CC] underline-offset-2 hover:underline p-0 h-auto',
}

const sizes: Record<Size, string> = {
  sm: 'h-7 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      children,
      disabled,
      className = '',
      ...props
    },
    ref,
  ) => {
    const isLink = variant === 'link'
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          base,
          variants[variant],
          !isLink && sizes[size],
          fullWidth && 'w-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading ? <Spinner /> : iconLeft}
        {children}
        {!loading && iconRight}
      </button>
    )
  },
)

Button.displayName = 'Button'
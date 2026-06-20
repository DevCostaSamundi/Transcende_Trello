'use client'

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, iconLeft, iconRight, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const hasError = Boolean(error)

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-medium text-[#172B4D]"
          >
            {label}
            {props.required && <span className="text-[#DE350B] ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {iconLeft && (
            <span className="absolute left-3 text-[#44546F] pointer-events-none flex items-center">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              'w-full h-9 rounded-md border bg-[#F4F5F7] text-sm text-[#172B4D] placeholder:text-[#8590A2]',
              'transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] focus:bg-white',
              hasError
                ? 'border-[#DE350B] focus:ring-[#DE350B] focus:border-[#DE350B]'
                : 'border-[#DFE1E6]',
              iconLeft ? 'pl-9' : 'pl-3',
              iconRight ? 'pr-9' : 'pr-3',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {iconRight && (
            <span className="absolute right-3 text-[#44546F] flex items-center">
              {iconRight}
            </span>
          )}
        </div>

        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-[#44546F]">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-[#DE350B]" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
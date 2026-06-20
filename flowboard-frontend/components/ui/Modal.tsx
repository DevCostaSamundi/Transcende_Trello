'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Prevent closing on backdrop click */
  persistent?: boolean
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  persistent = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open) {
      el.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      el.close()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // ESC key is handled natively by <dialog>
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const handler = (e: Event) => {
      e.preventDefault()
      if (!persistent) onClose()
    }
    el.addEventListener('cancel', handler)
    return () => el.removeEventListener('cancel', handler)
  }, [onClose, persistent])

  if (!open) return null

  return (
    <dialog
      ref={dialogRef}
      className={[
        'w-full rounded-xl bg-white shadow-[0_20px_60px_rgba(23,43,77,0.18)] border border-[#DFE1E6]',
        'p-0 backdrop:bg-[#172B4D]/40 backdrop:backdrop-blur-[2px]',
        sizes[size],
      ].join(' ')}
      onClick={(e) => {
        if (!persistent && e.target === dialogRef.current) onClose()
      }}
    >
      {/* Header */}
      {(title || description) && (
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-0">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-[#172B4D]">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-[#44546F] mt-0.5">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-[#44546F] hover:bg-[#F4F5F7] hover:text-[#172B4D] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.854 3.146a.5.5 0 0 0-.708 0L8 7.293 3.854 3.146a.5.5 0 1 0-.708.708L7.293 8l-4.147 4.146a.5.5 0 0 0 .708.708L8 8.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 8l4.147-4.146a.5.5 0 0 0 0-.708z" />
            </svg>
          </button>
        </div>
      )}

      {/* Body */}
      <div className="px-6 py-6">{children}</div>
    </dialog>
  )
}

/** Convenience footer row inside a Modal */
export function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 px-6 pb-6 -mt-2">
      {children}
    </div>
  )
}
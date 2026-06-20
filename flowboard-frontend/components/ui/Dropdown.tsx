'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface DropdownCtx {
  open: boolean
  setOpen: (v: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement>
}

const Ctx = createContext<DropdownCtx | null>(null)

function useDropdownCtx() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('Dropdown.* must be used within <Dropdown>')
  return ctx
}

interface DropdownProps {
  children: ReactNode
  className?: string
}

export function Dropdown({ children, className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <Ctx.Provider value={{ open, setOpen, triggerRef }}>
      <div ref={rootRef} className={`relative inline-block ${className}`}>
        {children}
      </div>
    </Ctx.Provider>
  )
}

export function DropdownTrigger({ children }: { children: ReactNode }) {
  const { open, setOpen, triggerRef } = useDropdownCtx()
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className="inline-flex items-center"
    >
      {children}
    </button>
  )
}

interface DropdownMenuProps {
  children: ReactNode
  align?: 'left' | 'right'
  width?: string
}

export function DropdownMenu({ children, align = 'left', width = 'w-56' }: DropdownMenuProps) {
  const { open } = useDropdownCtx()
  if (!open) return null

  return (
    <div
      role="menu"
      className={[
        'absolute z-20 mt-1.5 py-1.5 bg-white rounded-md border border-[#DFE1E6]',
        'shadow-[0_4px_8px_rgba(23,43,77,0.12),0_0_1px_rgba(23,43,77,0.16)]',
        'animate-[dropdownIn_0.12s_ease-out]',
        align === 'right' ? 'right-0' : 'left-0',
        width,
      ].join(' ')}
    >
      {children}
      <style jsx>{`
        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  icon?: ReactNode
  danger?: boolean
  disabled?: boolean
}

export function DropdownItem({ children, onClick, icon, danger, disabled }: DropdownItemProps) {
  const { setOpen } = useDropdownCtx()
  return (
    <button
      role="menuitem"
      disabled={disabled}
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
      className={[
        'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        danger
          ? 'text-[#DE350B] hover:bg-[#FFEBE6]'
          : 'text-[#172B4D] hover:bg-[#F4F5F7]',
      ].join(' ')}
    >
      {icon}
      {children}
    </button>
  )
}

export function DropdownDivider() {
  return <div className="my-1.5 h-px bg-[#DFE1E6]" />
}
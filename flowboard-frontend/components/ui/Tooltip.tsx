'use client'

import { ReactNode, useId, useState } from 'react'

type Side = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: string
  children: ReactNode
  side?: Side
  delay?: number
}

const positions: Record<Side, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrows: Record<Side, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-[#172B4D] border-x-transparent border-b-transparent',
  bottom:
    'bottom-full left-1/2 -translate-x-1/2 border-b-[#172B4D] border-x-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-[#172B4D] border-y-transparent border-r-transparent',
  right:
    'right-full top-1/2 -translate-y-1/2 border-r-[#172B4D] border-y-transparent border-l-transparent',
}

export function Tooltip({ content, children, side = 'top', delay = 300 }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const id = useId()

  const show = () => {
    const t = setTimeout(() => setVisible(true), delay)
    setTimer(t)
  }
  const hide = () => {
    if (timer) clearTimeout(timer)
    setVisible(false)
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>

      {visible && (
        <span
          role="tooltip"
          id={id}
          className={`absolute z-30 whitespace-nowrap pointer-events-none ${positions[side]}`}
        >
          <span className="block bg-[#172B4D] text-white text-xs font-medium rounded px-2 py-1 shadow-md">
            {content}
          </span>
          <span className={`absolute w-0 h-0 border-4 ${arrows[side]}`} />
        </span>
      )}
    </span>
  )
}
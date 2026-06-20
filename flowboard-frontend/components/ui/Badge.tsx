import { ReactNode } from 'react'

type BadgeColor =
  | 'neutral'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'purple'
  | 'teal'

interface BadgeProps {
  children: ReactNode
  color?: BadgeColor
  icon?: ReactNode
  removable?: boolean
  onRemove?: () => void
  size?: 'sm' | 'md'
}

const colors: Record<BadgeColor, string> = {
  neutral: 'bg-[#EBECF0] text-[#44546F]',
  blue: 'bg-[#DEEBFF] text-[#0052CC]',
  green: 'bg-[#E3FCEF] text-[#006644]',
  red: 'bg-[#FFEBE6] text-[#BF2600]',
  yellow: 'bg-[#FFF0B3] text-[#172B4D]',
  purple: 'bg-[#EAE6FF] text-[#403294]',
  teal: 'bg-[#E6FCFF] text-[#006C8F]',
}

const sizes = {
  sm: 'h-5 px-2 text-[11px] gap-1',
  md: 'h-6 px-2.5 text-xs gap-1.5',
}

export function Badge({
  children,
  color = 'neutral',
  icon,
  removable,
  onRemove,
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-semibold whitespace-nowrap',
        colors[color],
        sizes[size],
      ].join(' ')}
    >
      {icon}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          aria-label="Remover"
          className="ml-0.5 -mr-1 rounded-full hover:bg-black/10 p-0.5 transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
            <path d="M12.854 3.146a.5.5 0 0 0-.708 0L8 7.293 3.854 3.146a.5.5 0 1 0-.708.708L7.293 8l-4.147 4.146a.5.5 0 0 0 .708.708L8 8.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 8l4.147-4.146a.5.5 0 0 0 0-.708z" />
          </svg>
        </button>
      )}
    </span>
  )
}

/** Small colored dot used for label chips / list categories without text */
export function Dot({ color = 'neutral' as BadgeColor }: { color?: BadgeColor }) {
  const dotColors: Record<BadgeColor, string> = {
    neutral: 'bg-[#8590A2]',
    blue: 'bg-[#0052CC]',
    green: 'bg-[#00875A]',
    red: 'bg-[#DE350B]',
    yellow: 'bg-[#FFAB00]',
    purple: 'bg-[#6554C0]',
    teal: 'bg-[#00A3BF]',
  }
  return <span className={`inline-block w-2 h-2 rounded-full ${dotColors[color]}`} />
}
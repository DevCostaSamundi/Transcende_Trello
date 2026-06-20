interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  size?: 'sm' | 'md'
}

const colors = {
  blue: '#0052CC',
  green: '#00875A',
  yellow: '#FFAB00',
  red: '#DE350B',
  purple: '#6554C0',
}

const heights = {
  sm: 'h-1.5',
  md: 'h-2.5',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'blue',
  size = 'md',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs font-medium text-[#44546F]">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-[#172B4D]">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${heights[size]} bg-[#EBECF0] rounded-full overflow-hidden`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%`, background: colors[color] }}
        />
      </div>
    </div>
  )
}
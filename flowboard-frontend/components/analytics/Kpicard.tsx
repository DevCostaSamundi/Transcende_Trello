import { ReactNode } from 'react'

type Trend = 'up' | 'down' | 'flat'

interface KpiCardProps {
  label: string
  value: string | number
  icon?: ReactNode
  trend?: Trend
  trendValue?: string
  /** true = up is good (e.g. completion rate), false = up is bad (e.g. overdue cards) */
  positiveIsUp?: boolean
}

const trendColor = (trend: Trend, positiveIsUp: boolean) => {
  if (trend === 'flat') return 'text-[#44546F]'
  const isGood = positiveIsUp ? trend === 'up' : trend === 'down'
  return isGood ? 'text-[#00875A]' : 'text-[#DE350B]'
}

const TrendIcon = ({ trend }: { trend: Trend }) => {
  if (trend === 'flat') {
    return (
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
        <rect x="2" y="7" width="12" height="2" rx="1" />
      </svg>
    )
  }
  const rotate = trend === 'up' ? '' : 'rotate-180'
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={rotate}
    >
      <path d="M8 2l5.5 7H10v5H6v-5H2.5L8 2z" />
    </svg>
  )
}

export function KpiCard({
  label,
  value,
  icon,
  trend,
  trendValue,
  positiveIsUp = true,
}: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#DFE1E6] p-4 flex flex-col gap-2 min-w-[160px]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#44546F]">{label}</span>
        {icon && (
          <span className="w-7 h-7 rounded-md bg-[#DEEBFF] text-[#0052CC] flex items-center justify-center">
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-2xl font-bold text-[#172B4D] leading-none">{value}</span>
        {trend && trendValue && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${trendColor(
              trend,
              positiveIsUp,
            )}`}
          >
            <TrendIcon trend={trend} />
            {trendValue}
          </span>
        )}
      </div>
    </div>
  )
}
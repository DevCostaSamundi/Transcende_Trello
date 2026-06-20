'use client'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { BurndownPoint } from '@/lib/types/analytics'

interface BurndownChartProps {
  data: BurndownPoint[]
  loading?: boolean
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#DFE1E6] rounded-md shadow-[0_4px_8px_rgba(23,43,77,0.12)] px-3 py-2 text-xs">
      <p className="font-semibold text-[#172B4D] mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.stroke }} className="font-medium">
          {p.name}: {p.value} cards restantes
        </p>
      ))}
    </div>
  )
}

export function BurndownChart({ data, loading }: BurndownChartProps) {
  if (loading) {
    return <div className="h-[280px] w-full bg-[#F4F5F7] rounded-lg animate-pulse" />
  }

  if (!data.length) {
    return (
      <div className="h-[280px] w-full flex items-center justify-center text-sm text-[#44546F]">
        Sem dados de burndown ainda.
      </div>
    )
  }

  const isBehind = data.length > 0 && data[data.length - 1].actual > data[data.length - 1].ideal

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: '#44546F' }}
          axisLine={{ stroke: '#DFE1E6' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#44546F' }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#44546F' }} iconType="plainline" />
        <Line
          type="monotone"
          dataKey="ideal"
          name="Ideal"
          stroke="#8590A2"
          strokeDasharray="5 4"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="actual"
          name="Real"
          stroke={isBehind ? '#DE350B' : '#0052CC'}
          strokeWidth={2.5}
          dot={{ r: 3, fill: isBehind ? '#DE350B' : '#0052CC', strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { VelocityPoint } from '@/lib/types/analytics'

interface VelocityChartProps {
  data: VelocityPoint[]
  loading?: boolean
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#DFE1E6] rounded-md shadow-[0_4px_8px_rgba(23,43,77,0.12)] px-3 py-2 text-xs">
      <p className="font-semibold text-[#172B4D] mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.fill }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

export function VelocityChart({ data, loading }: VelocityChartProps) {
  if (loading) {
    return (
      <div className="h-[280px] w-full bg-[#F4F5F7] rounded-lg animate-pulse" />
    )
  }

  if (!data.length) {
    return (
      <div className="h-[280px] w-full flex items-center justify-center text-sm text-[#44546F]">
        Sem dados de velocidade ainda.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={4} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#DFE1E6" vertical={false} />
        <XAxis
          dataKey="label"
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F4F5F7' }} />
        <Legend
          wrapperStyle={{ fontSize: 12, color: '#44546F' }}
          iconType="circle"
          iconSize={8}
        />
        <Bar
          dataKey="committed"
          name="Planeado"
          fill="#DFE1E6"
          radius={[4, 4, 0, 0]}
          maxBarSize={28}
        />
        <Bar
          dataKey="completed"
          name="Concluído"
          fill="#0052CC"
          radius={[4, 4, 0, 0]}
          maxBarSize={28}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
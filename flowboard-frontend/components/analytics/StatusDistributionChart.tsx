'use client'

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { CardStatus, StatusDistribution } from '@/lib/types/analytics'

interface StatusDistributionChartProps {
  data: StatusDistribution[]
  loading?: boolean
}

const statusMeta: Record<CardStatus, { label: string; color: string }> = {
  todo: { label: 'Por fazer', color: '#8590A2' },
  doing: { label: 'Em curso', color: '#0052CC' },
  review: { label: 'Em revisão', color: '#FFAB00' },
  done: { label: 'Concluído', color: '#00875A' },
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0]
  const meta = statusMeta[p.payload.status as CardStatus]
  return (
    <div className="bg-white border border-[#DFE1E6] rounded-md shadow-[0_4px_8px_rgba(23,43,77,0.12)] px-3 py-2 text-xs">
      <p className="font-semibold" style={{ color: meta.color }}>
        {meta.label}: {p.value} cards
      </p>
    </div>
  )
}

function CustomLegend({ payload }: any) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2">
      {payload.map((entry: any) => {
        const meta = statusMeta[entry.payload.status as CardStatus]
        return (
          <li key={entry.value} className="flex items-center gap-1.5 text-xs text-[#44546F]">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: meta.color }}
            />
            {meta.label}
            <span className="font-semibold text-[#172B4D]">{entry.payload.count}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function StatusDistributionChart({ data, loading }: StatusDistributionChartProps) {
  if (loading) {
    return <div className="h-[280px] w-full bg-[#F4F5F7] rounded-lg animate-pulse" />
  }

  const total = data.reduce((acc, d) => acc + d.count, 0)

  if (!total) {
    return (
      <div className="h-[280px] w-full flex items-center justify-center text-sm text-[#44546F]">
        Ainda não há cards para distribuir.
      </div>
    )
  }

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.status} fill={statusMeta[d.status].color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label */}
      <div className="absolute top-[96px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p className="text-2xl font-bold text-[#172B4D] leading-none">{total}</p>
        <p className="text-[11px] text-[#44546F] mt-0.5">cards</p>
      </div>
    </div>
  )
}
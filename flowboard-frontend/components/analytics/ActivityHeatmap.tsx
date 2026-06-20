'use client'

import { useMemo, useState } from 'react'
import type { ActivityDay } from '@/lib/types/analytics'

interface ActivityHeatmapProps {
  data: ActivityDay[]
  loading?: boolean
  /** Number of weeks to display, ending today */
  weeks?: number
}

const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const monthLabels = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

function levelColor(count: number, max: number) {
  if (count === 0) return '#EBECF0'
  const ratio = count / Math.max(max, 1)
  if (ratio < 0.25) return '#CCE0FF'
  if (ratio < 0.5) return '#85B8FF'
  if (ratio < 0.75) return '#2684FF'
  return '#0052CC'
}

export function ActivityHeatmap({ data, loading, weeks = 16 }: ActivityHeatmapProps) {
  const [hovered, setHovered] = useState<ActivityDay | null>(null)

  const { grid, max, monthMarks } = useMemo(() => {
    const map = new Map(data.map((d) => [d.date, d.count]))
    const totalDays = weeks * 7

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    // align end to the closest Saturday so columns are full weeks
    const endOffset = 6 - today.getDay()
    const end = new Date(today)
    end.setDate(end.getDate() + endOffset)

    const start = new Date(end)
    start.setDate(start.getDate() - totalDays + 1)

    const days: ActivityDay[] = []
    const cursor = new Date(start)
    for (let i = 0; i < totalDays; i++) {
      const iso = cursor.toISOString().slice(0, 10)
      days.push({ date: iso, count: map.get(iso) ?? 0 })
      cursor.setDate(cursor.getDate() + 1)
    }

    const cols: ActivityDay[][] = []
    for (let w = 0; w < weeks; w++) {
      cols.push(days.slice(w * 7, w * 7 + 7))
    }

    const maxCount = Math.max(1, ...days.map((d) => d.count))

    const marks: { col: number; label: string }[] = []
    let lastMonth = -1
    cols.forEach((col, i) => {
      const m = new Date(col[0].date).getMonth()
      if (m !== lastMonth) {
        marks.push({ col: i, label: monthLabels[m] })
        lastMonth = m
      }
    })

    return { grid: cols, max: maxCount, monthMarks: marks }
  }, [data, weeks])

  if (loading) {
    return <div className="h-[160px] w-full bg-[#F4F5F7] rounded-lg animate-pulse" />
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1 min-w-full">
        {/* month labels */}
        <div className="flex gap-[3px] pl-7 relative h-4">
          {monthMarks.map((m) => (
            <span
              key={`${m.col}-${m.label}`}
              className="absolute text-[11px] text-[#44546F]"
              style={{ left: `${m.col * 14}px` }}
            >
              {m.label}
            </span>
          ))}
        </div>

        <div className="flex gap-[3px]">
          {/* day-of-week labels */}
          <div className="flex flex-col gap-[3px] pr-1.5">
            {dayLabels.map((d, i) => (
              <span
                key={d}
                className="text-[10px] text-[#8590A2] h-[11px] leading-[11px]"
                style={{ visibility: i % 2 === 0 ? 'visible' : 'hidden' }}
              >
                {d}
              </span>
            ))}
          </div>

          {/* weeks grid */}
          {grid.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-[3px]">
              {col.map((day) => (
                <button
                  key={day.date}
                  type="button"
                  onMouseEnter={() => setHovered(day)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(day)}
                  onBlur={() => setHovered(null)}
                  className="w-[11px] h-[11px] rounded-[2px] transition-transform hover:scale-125 focus:scale-125 focus:outline focus:outline-1 focus:outline-[#0052CC]"
                  style={{ background: levelColor(day.count, max) }}
                  aria-label={`${day.date}: ${day.count} ações`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* legend + tooltip */}
        <div className="flex items-center justify-between mt-2 pl-7">
          <span className="text-xs text-[#44546F] min-h-[16px]">
            {hovered
              ? `${hovered.count} ações em ${new Date(hovered.date).toLocaleDateString('pt-PT', {
                  day: '2-digit',
                  month: 'short',
                })}`
              : ''}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-[#8590A2]">
            <span>Menos</span>
            {[0, 0.2, 0.5, 0.8, 1].map((r, i) => (
              <span
                key={i}
                className="w-[11px] h-[11px] rounded-[2px]"
                style={{ background: levelColor(r * max, max) }}
              />
            ))}
            <span>Mais</span>
          </div>
        </div>
      </div>
    </div>
  )
}
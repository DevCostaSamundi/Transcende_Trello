'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { KpiCard } from '@/components/analytics/KpiCard'
import { VelocityChart } from '@/components/analytics/VelocityChart'
import { BurndownChart } from '@/components/analytics/BurndownChart'
import { StatusDistributionChart } from '@/components/analytics/StatusDistributionChart'
import { ActivityHeatmap } from '@/components/analytics/ActivityHeatmap'
import { ExportButton } from '@/components/analytics/ExportButton'
import { Skeleton } from '@/components/ui/Skeleton'
import { Badge } from '@/components/ui/Badge'
import { getMockAnalytics } from '@/lib/mock/analytics'

type RangeOption = 7 | 30 | 90

const ranges: { value: RangeOption; label: string }[] = [
  { value: 7, label: '7 dias' },
  { value: 30, label: '30 dias' },
  { value: 90, label: '90 dias' },
]

const CardsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3zm2 1v8h2V4H4zm4 0v8h4V4H8z" />
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.7 4.3a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L7 9.6l5.3-5.3a1 1 0 0 1 1.4 0z" />
  </svg>
)
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.75 4v4.4l3.2 1.9-.6 1-3.85-2.3V4h1.25z" />
  </svg>
)
const PeopleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM0 14c0-2.5 2.5-4.5 6-4.5s6 2 6 4.5v1H0v-1zm12.5-3.2c2.05.5 3.5 1.95 3.5 3.7v.5h-3v-1c0-1.2-.4-2.3-1.1-3.2h.6z" />
  </svg>
)
const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1l8 14H0L8 1zm0 5v4h0V6zm0 5.5a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z" />
  </svg>
)

export default function AnalyticsPage() {
  const [range, setRange] = useState<RangeOption>(30)
  // TODO: replace with real board selector once multi-board context exists
  const boardId = 'board-1'

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['analytics', boardId, range],
    queryFn: async () => {
      // Swap this line for `getBoardAnalytics({ boardId, range })`
      // once GET /boards/:id/analytics is available on the backend.
      await new Promise((r) => setTimeout(r, 400))
      return getMockAnalytics(boardId)
    },
  })

  const rangeLabel = useMemo(
    () => ranges.find((r) => r.value === range)?.label ?? '',
    [range],
  )

  return (
    <main className="min-h-screen bg-[#F4F5F7]">
      {/* Local header / nav */}
      <header className="bg-white border-b border-[#DFE1E6] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav aria-label="Navegação" className="flex items-center gap-1.5 text-xs text-[#44546F] mb-2">
            <Link href="/dashboard" className="hover:text-[#0052CC] transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#172B4D] font-medium">Analytics</span>
          </nav>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-bold text-[#172B4D]">Analytics</h1>
              <p className="text-sm text-[#44546F] mt-0.5">
                {data ? data.boardName : 'A carregar board…'}
                {data && (
                  <>
                    {' '}
                    <Badge color="blue" size="sm">
                      {rangeLabel}
                    </Badge>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Range tabs */}
              <div className="flex items-center bg-[#F4F5F7] rounded-md p-0.5 border border-[#DFE1E6]">
                {ranges.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRange(r.value)}
                    className={[
                      'h-8 px-3 rounded text-xs font-semibold transition-colors',
                      range === r.value
                        ? 'bg-white text-[#0052CC] shadow-sm'
                        : 'text-[#44546F] hover:text-[#172B4D]',
                    ].join(' ')}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {data && <ExportButton summary={data} />}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-6">
        {isError && (
          <div className="bg-[#FFEBE6] border border-[#FFBDAD] text-[#BF2600] text-sm rounded-md px-4 py-3 flex items-center justify-between">
            <span>Não foi possível carregar os dados de analytics.</span>
            <button onClick={() => refetch()} className="font-semibold underline underline-offset-2">
              Tentar novamente
            </button>
          </div>
        )}

        {/* KPI row */}
        <section
          aria-label="Indicadores principais"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {isLoading || !data ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={92} className="rounded-xl" />
            ))
          ) : (
            <>
              <KpiCard label="Total de cards" value={data.kpis.totalCards} icon={<CardsIcon />} />
              <KpiCard
                label="Concluídos"
                value={data.kpis.completedCards}
                icon={<CheckIcon />}
                trend="up"
                trendValue="+12%"
              />
              <KpiCard
                label="Taxa de conclusão"
                value={`${data.kpis.completionRate}%`}
                trend="up"
                trendValue="+4%"
              />
              <KpiCard
                label="Ciclo médio"
                value={`${data.kpis.avgCycleTimeDays}d`}
                icon={<ClockIcon />}
                trend="down"
                trendValue="-0.6d"
              />
              <KpiCard
                label="Membros ativos"
                value={data.kpis.activeMembers}
                icon={<PeopleIcon />}
                trend="flat"
                trendValue="—"
              />
              <KpiCard
                label="Cards atrasados"
                value={data.kpis.overdueCards}
                icon={<AlertIcon />}
                trend="down"
                trendValue="-1"
                positiveIsUp={false}
              />
            </>
          )}
        </section>

        {/* Velocity + Distribution */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#DFE1E6] p-5">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-[#172B4D]">Velocidade da equipa</h2>
              <Badge color="neutral" size="sm">
                Últimos 5 sprints
              </Badge>
            </div>
            <p className="text-xs text-[#44546F] mb-3">
              Comparação entre o trabalho planeado e o efetivamente concluído por sprint.
            </p>
            <VelocityChart data={data?.velocity ?? []} loading={isLoading} />
          </div>

          <div className="bg-white rounded-xl border border-[#DFE1E6] p-5">
            <h2 className="text-sm font-semibold text-[#172B4D] mb-1">
              Distribuição por estado
            </h2>
            <p className="text-xs text-[#44546F] mb-3">Cards atuais no board, por coluna.</p>
            <StatusDistributionChart data={data?.distribution ?? []} loading={isLoading} />
          </div>
        </section>

        {/* Burndown */}
        <section className="bg-white rounded-xl border border-[#DFE1E6] p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-[#172B4D]">Burndown do sprint atual</h2>
            {data && (
              <Badge
                color={
                  data.burndown.at(-1)!.actual > data.burndown.at(-1)!.ideal ? 'red' : 'green'
                }
                size="sm"
              >
                {data.burndown.at(-1)!.actual > data.burndown.at(-1)!.ideal
                  ? 'Atrás do plano'
                  : 'Dentro do plano'}
              </Badge>
            )}
          </div>
          <p className="text-xs text-[#44546F] mb-3">
            Trabalho restante real comparado com a linha ideal de progresso.
          </p>
          <BurndownChart data={data?.burndown ?? []} loading={isLoading} />
        </section>

        {/* Activity heatmap */}
        <section className="bg-white rounded-xl border border-[#DFE1E6] p-5">
          <h2 className="text-sm font-semibold text-[#172B4D] mb-1">Atividade da equipa</h2>
          <p className="text-xs text-[#44546F] mb-4">
            Ações realizadas no board (cards criados, movidos e comentados) nas últimas{' '}
            {16} semanas.
          </p>
          <ActivityHeatmap data={data?.activity ?? []} loading={isLoading} />
        </section>
      </div>
    </main>
  )
}
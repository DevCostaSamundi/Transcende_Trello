import type { AnalyticsSummary } from '@/lib/types/analytics'

/**
 * Deterministic mock data so the Analytics page is fully demonstrable
 * before the backend endpoint (GET /boards/:id/analytics) is wired up.
 * Swap usages of this for `getBoardAnalytics` once the API is ready.
 */
export function getMockAnalytics(boardId: string): AnalyticsSummary {
  const velocity = [
    { label: 'Sprint 8', committed: 18, completed: 15 },
    { label: 'Sprint 9', committed: 20, completed: 19 },
    { label: 'Sprint 10', committed: 16, completed: 16 },
    { label: 'Sprint 11', committed: 22, completed: 17 },
    { label: 'Sprint 12', committed: 19, completed: 21 },
  ]

  const burndown = Array.from({ length: 10 }, (_, i) => {
    const ideal = Math.round(40 - (40 / 9) * i)
    const wobble = Math.sin(i * 1.3) * 3
    const actual = Math.max(0, Math.round(40 - (38 / 9) * i + wobble))
    return { date: `Dia ${i + 1}`, ideal, actual }
  })

  const distribution = [
    { status: 'todo' as const, count: 12 },
    { status: 'doing' as const, count: 7 },
    { status: 'review' as const, count: 3 },
    { status: 'done' as const, count: 24 },
  ]

  const today = new Date()
  const activity = Array.from({ length: 16 * 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    // sparser on weekends, occasional bursts
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const base = isWeekend ? 0.15 : 0.55
    const count = Math.random() < base ? Math.floor(Math.random() * 9) : 0
    return { date: d.toISOString().slice(0, 10), count }
  })

  const totalCards = distribution.reduce((a, d) => a + d.count, 0)
  const completedCards = distribution.find((d) => d.status === 'done')?.count ?? 0

  return {
    boardId,
    boardName: 'Sprint Roadmap',
    rangeLabel: 'Últimos 30 dias',
    kpis: {
      totalCards,
      completedCards,
      completionRate: Math.round((completedCards / totalCards) * 100),
      avgCycleTimeDays: 3.4,
      activeMembers: 6,
      overdueCards: 2,
    },
    velocity,
    burndown,
    distribution,
    activity,
  }
}
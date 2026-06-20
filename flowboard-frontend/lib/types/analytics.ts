// Shared analytics domain types — used by all analytics components and the page.

export interface VelocityPoint {
  /** Sprint or week label, e.g. "Sprint 12" or "Sem 24" */
  label: string
  /** Story points / cards committed at the start */
  committed: number
  /** Story points / cards actually completed */
  completed: number
}

export interface BurndownPoint {
  /** Day label, e.g. "Dia 1" or an ISO date */
  date: string
  /** Ideal remaining work if progress were linear */
  ideal: number
  /** Actual remaining work */
  actual: number
}

export type CardStatus = 'todo' | 'doing' | 'review' | 'done'

export interface StatusDistribution {
  status: CardStatus
  count: number
}

export interface ActivityDay {
  /** ISO date, e.g. "2026-06-14" */
  date: string
  /** Number of actions performed that day (cards moved, created, comments, etc.) */
  count: number
}

export interface AnalyticsKpis {
  totalCards: number
  completedCards: number
  completionRate: number // 0-100
  avgCycleTimeDays: number
  activeMembers: number
  overdueCards: number
}

export interface AnalyticsSummary {
  boardId: string
  boardName: string
  rangeLabel: string
  kpis: AnalyticsKpis
  velocity: VelocityPoint[]
  burndown: BurndownPoint[]
  distribution: StatusDistribution[]
  activity: ActivityDay[]
}
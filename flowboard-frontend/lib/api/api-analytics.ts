import axios from 'axios'
import type { AnalyticsSummary } from '@/lib/types/analytics'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/api',
})

export interface AnalyticsParams {
  boardId: string
  /** number of past days to include, e.g. 30, 90 */
  range?: number
}

export async function getBoardAnalytics({
  boardId,
  range = 30,
}: AnalyticsParams): Promise<AnalyticsSummary> {
  const { data } = await api.get<AnalyticsSummary>(`/boards/${boardId}/analytics`, {
    params: { range },
  })
  return data
}
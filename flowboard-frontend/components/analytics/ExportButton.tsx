'use client'

import { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@/components/ui/Dropdown'
import { useToast } from '@/components/ui/Toast'
import type { AnalyticsSummary } from '@/lib/types/analytics'

interface ExportButtonProps {
  summary: AnalyticsSummary
  /** Called instead of the built-in CSV/PDF generation, e.g. to hit a backend endpoint */
  onExport?: (format: 'csv' | 'pdf') => Promise<void> | void
}

function toCsv(summary: AnalyticsSummary): string {
  const lines: string[] = []
  lines.push(`FlowBoard Analytics — ${summary.boardName} (${summary.rangeLabel})`)
  lines.push('')
  lines.push('KPI,Valor')
  lines.push(`Total de cards,${summary.kpis.totalCards}`)
  lines.push(`Cards concluídos,${summary.kpis.completedCards}`)
  lines.push(`Taxa de conclusão,${summary.kpis.completionRate}%`)
  lines.push(`Tempo médio de ciclo (dias),${summary.kpis.avgCycleTimeDays}`)
  lines.push(`Membros ativos,${summary.kpis.activeMembers}`)
  lines.push(`Cards atrasados,${summary.kpis.overdueCards}`)
  lines.push('')
  lines.push('Velocidade')
  lines.push('Sprint,Planeado,Concluído')
  summary.velocity.forEach((v) => lines.push(`${v.label},${v.committed},${v.completed}`))
  lines.push('')
  lines.push('Burndown')
  lines.push('Data,Ideal,Real')
  summary.burndown.forEach((b) => lines.push(`${b.date},${b.ideal},${b.actual}`))
  lines.push('')
  lines.push('Distribuição por estado')
  lines.push('Estado,Quantidade')
  summary.distribution.forEach((d) => lines.push(`${d.status},${d.count}`))
  return lines.join('\n')
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a.75.75 0 0 1 .75.75v6.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V1.75A.75.75 0 0 1 8 1zM2 13a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z" />
  </svg>
)

export function ExportButton({ summary, onExport }: ExportButtonProps) {
  const [exporting, setExporting] = useState<'csv' | 'pdf' | null>(null)
  const { show } = useToast()

  async function handleExport(format: 'csv' | 'pdf') {
    setExporting(format)
    try {
      if (onExport) {
        await onExport(format)
      } else if (format === 'csv') {
        downloadBlob(
          toCsv(summary),
          `flowboard-analytics-${summary.boardId}.csv`,
          'text/csv;charset=utf-8;',
        )
      } else {
        // Lightweight client-side "PDF": print-friendly window using the same data.
        // For a real PDF, wire this to a backend endpoint via onExport.
        const printable = window.open('', '_blank')
        if (printable) {
          printable.document.write(`
            <html>
              <head><title>FlowBoard Analytics</title></head>
              <body style="font-family: sans-serif; padding: 32px; color:#172B4D;">
                <h1>${summary.boardName}</h1>
                <p>${summary.rangeLabel}</p>
                <pre>${toCsv(summary)}</pre>
              </body>
            </html>
          `)
          printable.document.close()
          printable.print()
        }
      }
      show({
        variant: 'success',
        title: 'Exportação concluída',
        description: `Relatório ${format.toUpperCase()} gerado com sucesso.`,
      })
    } catch {
      show({
        variant: 'error',
        title: 'Falha na exportação',
        description: 'Não foi possível gerar o ficheiro. Tenta novamente.',
      })
    } finally {
      setExporting(null)
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <span className="inline-flex items-center gap-2 h-9 px-4 rounded-md border border-[#DFE1E6] bg-white text-sm font-medium text-[#172B4D] hover:bg-[#F4F5F7] transition-colors">
          <DownloadIcon />
          Exportar
        </span>
      </DropdownTrigger>
      <DropdownMenu align="right" width="w-44">
        <DropdownItem onClick={() => handleExport('csv')} disabled={exporting !== null}>
          {exporting === 'csv' ? 'A exportar…' : 'Exportar CSV'}
        </DropdownItem>
        <DropdownItem onClick={() => handleExport('pdf')} disabled={exporting !== null}>
          {exporting === 'pdf' ? 'A exportar…' : 'Exportar PDF'}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
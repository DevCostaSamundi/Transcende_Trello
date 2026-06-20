'use client'

import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

type ToastVariant = 'success' | 'error' | 'info' | 'warning'

interface ToastItem {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

interface ToastCtx {
  show: (toast: Omit<ToastItem, 'id'>) => void
}

const Ctx = createContext<ToastCtx | null>(null)

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

const variantStyles: Record<ToastVariant, { bg: string; border: string; icon: ReactNode }> = {
  success: {
    bg: 'bg-white',
    border: 'border-l-[#00875A]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="#00875A">
        <path d="M13.7 4.3a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4L7 9.6l5.3-5.3a1 1 0 0 1 1.4 0z" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-white',
    border: 'border-l-[#DE350B]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="#DE350B">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 4h2v5H7V4zm0 6h2v2H7v-2z" />
      </svg>
    ),
  },
  info: {
    bg: 'bg-white',
    border: 'border-l-[#0052CC]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="#0052CC">
        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM7 7h2v5H7V7zm0-3h2v2H7V4z" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-white',
    border: 'border-l-[#FFAB00]',
    icon: (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="#FFAB00">
        <path d="M8 1l8 14H0L8 1zm0 5v4h0V6zm0 5.5a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z" />
      </svg>
    ),
  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const show = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }, [])

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-[340px]"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const s = variantStyles[t.variant]
          return (
            <div
              key={t.id}
              role="status"
              className={`${s.bg} ${s.border} border-l-4 rounded-md shadow-[0_4px_8px_rgba(23,43,77,0.16),0_0_1px_rgba(23,43,77,0.2)] p-3.5 flex items-start gap-3 animate-[toastIn_0.18s_ease-out]`}
            >
              <span className="flex-shrink-0 mt-0.5">{s.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#172B4D]">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-[#44546F] mt-0.5">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                aria-label="Fechar notificação"
                className="flex-shrink-0 text-[#8590A2] hover:text-[#172B4D] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M12.854 3.146a.5.5 0 0 0-.708 0L8 7.293 3.854 3.146a.5.5 0 1 0-.708.708L7.293 8l-4.147 4.146a.5.5 0 0 0 .708.708L8 8.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 8l4.147-4.146a.5.5 0 0 0 0-.708z" />
                </svg>
              </button>
            </div>
          )
        })}
        <style jsx>{`
          @keyframes toastIn {
            from {
              opacity: 0;
              transform: translateX(16px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </Ctx.Provider>
  )
}
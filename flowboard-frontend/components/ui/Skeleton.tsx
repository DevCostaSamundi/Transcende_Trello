interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circle' | 'rect'
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className = '',
  variant = 'rect',
  width,
  height,
}: SkeletonProps) {
  const radius =
    variant === 'circle' ? 'rounded-full' : variant === 'text' ? 'rounded' : 'rounded-md'

  return (
    <span
      className={`block bg-[#EBECF0] animate-pulse ${radius} ${className}`}
      style={{
        width: width ?? (variant === 'text' ? '100%' : undefined),
        height: height ?? (variant === 'text' ? '0.9em' : undefined),
      }}
      aria-hidden="true"
    />
  )
}

/** Preset: skeleton for a Trello-like card */
export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-[#DFE1E6] bg-white p-3 flex flex-col gap-2">
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" width="40%" />
      <div className="flex gap-2 mt-1">
        <Skeleton variant="circle" width={24} height={24} />
        <Skeleton variant="circle" width={24} height={24} />
      </div>
    </div>
  )
}

/** Preset: skeleton for a board column with N placeholder cards */
export function ListColumnSkeleton({ cards = 3 }: { cards?: number }) {
  return (
    <div className="w-72 flex-shrink-0 bg-[#F4F5F7] rounded-xl p-2.5 flex flex-col gap-2">
      <Skeleton variant="text" width="50%" height={16} className="mb-1 ml-1" />
      {Array.from({ length: cards }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
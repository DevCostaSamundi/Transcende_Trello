'use client'

import Image from 'next/image'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string | null
  name?: string
  size?: AvatarSize
  online?: boolean
  className?: string
}

const sizes: Record<AvatarSize, { container: string; text: string; dot: string }> = {
  xs: { container: 'w-6 h-6 text-[10px]', text: '', dot: 'w-1.5 h-1.5 -bottom-px -right-px' },
  sm: { container: 'w-8 h-8 text-xs', text: '', dot: 'w-2 h-2 -bottom-0.5 -right-0.5' },
  md: { container: 'w-10 h-10 text-sm', text: '', dot: 'w-2.5 h-2.5 bottom-0 right-0' },
  lg: { container: 'w-12 h-12 text-base', text: '', dot: 'w-3 h-3 bottom-0 right-0' },
  xl: { container: 'w-16 h-16 text-xl', text: '', dot: 'w-3.5 h-3.5 bottom-0.5 right-0.5' },
}

/** Generate a deterministic pastel from a name */
function colorFromName(name: string) {
  const palette = [
    { bg: '#DEEBFF', text: '#0052CC' },
    { bg: '#E3FCEF', text: '#006644' },
    { bg: '#FFF0B3', text: '#172B4D' },
    { bg: '#FFEDEB', text: '#BF2600' },
    { bg: '#EAE6FF', text: '#403294' },
    { bg: '#E6FCFF', text: '#006C8F' },
  ]
  const idx = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % palette.length
  return palette[idx]
}

function initials(name?: string) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase()
}

export function Avatar({ src, name, size = 'md', online, className = '' }: AvatarProps) {
  const s = sizes[size]
  const color = colorFromName(name ?? '?')

  return (
    <span className={`relative inline-flex flex-shrink-0 ${className}`}>
      <span
        className={`${s.container} rounded-full overflow-hidden flex items-center justify-center font-semibold`}
        style={!src ? { background: color.bg, color: color.text } : undefined}
        title={name}
        aria-label={name}
      >
        {src ? (
          <Image src={src} alt={name ?? ''} fill className="object-cover" sizes="64px" />
        ) : (
          <span aria-hidden="true">{initials(name)}</span>
        )}
      </span>

      {online !== undefined && (
        <span
          className={`absolute ${s.dot} rounded-full border-2 border-white ${
            online ? 'bg-[#00875A]' : 'bg-[#B3BAC5]'
          }`}
          title={online ? 'Online' : 'Offline'}
          aria-label={online ? 'Online' : 'Offline'}
        />
      )}
    </span>
  )
}

/** Stack of avatars with overflow counter */
interface AvatarGroupProps {
  users: { src?: string | null; name?: string }[]
  max?: number
  size?: AvatarSize
}

export function AvatarGroup({ users, max = 4, size = 'sm' }: AvatarGroupProps) {
  const visible = users.slice(0, max)
  const overflow = users.length - max

  return (
    <div className="flex -space-x-2">
      {visible.map((u, i) => (
        <Avatar
          key={i}
          src={u.src}
          name={u.name}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {overflow > 0 && (
        <span
          className={`${sizes[size].container} rounded-full bg-[#EBECF0] text-[#44546F] ring-2 ring-white flex items-center justify-center font-semibold`}
          title={`+${overflow} membros`}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
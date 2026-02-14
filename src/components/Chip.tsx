import { cn } from '../lib/utils'

interface ChipProps {
  label: string
  selected?: boolean
  onClick?: () => void
}

export default function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      className={cn(
        'rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200',
        selected
          ? 'bg-surface-subtle text-sky-blue'
          : 'bg-canvas-contrast text-text-secondary hover:bg-surface-highlight'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

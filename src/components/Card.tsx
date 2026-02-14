import { cn } from '../lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export default function Card({ children, className, onClick, hoverable = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm',
        hoverable && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  )
}

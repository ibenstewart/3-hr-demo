import { cn } from '../lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg font-bold transition-all duration-200 inline-flex items-center justify-center',
        sizeClasses[size],
        variant === 'primary' && 'bg-sky-blue text-white hover:brightness-110 active:brightness-95',
        variant === 'secondary' && 'bg-white text-sky-blue border-2 border-sky-blue hover:bg-sky-blue/5 active:bg-sky-blue/10',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

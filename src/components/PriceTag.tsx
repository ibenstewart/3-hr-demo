import { cn } from '../lib/utils'

interface PriceTagProps {
  amount: number
  currency?: 'GBP' | 'EUR'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
}

const formatPrice = (amount: number, currency: 'GBP' | 'EUR') =>
  new Intl.NumberFormat(currency === 'GBP' ? 'en-GB' : 'en-IE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

export default function PriceTag({ amount, currency = 'GBP', className, size = 'md' }: PriceTagProps) {
  return (
    <span className={cn('font-bold text-text-primary', sizeClasses[size], className)}>
      {formatPrice(amount, currency)}
    </span>
  )
}

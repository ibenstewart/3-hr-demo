import { cn } from '../lib/utils'

interface RatingProps {
  rating: number
  reviewCount?: number
  className?: string
}

export default function Rating({ rating, reviewCount, className }: RatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const totalStars = 5

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className="text-star text-sm tracking-tight">
        {Array.from({ length: totalStars }, (_, i) => (
          <span key={i} className={i < fullStars || (i === fullStars && hasHalf) ? 'text-star' : 'text-line'}>
            ★
          </span>
        ))}
      </span>
      <span className="font-bold text-sm text-text-primary">{rating}</span>
      {reviewCount != null && (
        <span className="text-sm text-text-secondary">
          ({new Intl.NumberFormat('en-GB').format(reviewCount)} reviews)
        </span>
      )}
    </div>
  )
}

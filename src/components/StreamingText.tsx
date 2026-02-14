import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'

interface StreamingTextProps {
  children: React.ReactNode
  delay?: number
  loading?: boolean
  message?: string
  className?: string
}

export default function StreamingText({
  children,
  delay = 1500,
  loading: loadingOverride,
  message = 'Thinking...',
  className,
}: StreamingTextProps) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (loadingOverride !== undefined) return
    const timer = setTimeout(() => setDone(true), delay)
    return () => clearTimeout(timer)
  }, [delay, loadingOverride])

  const isLoading = loadingOverride !== undefined ? loadingOverride : !done

  if (isLoading) {
    return (
      <div className={cn('flex items-center gap-2 text-text-secondary', className)}>
        <span className="streaming-dots flex gap-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-blue inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-sky-blue inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-sky-blue inline-block" />
        </span>
        <span className="text-sm">{message}</span>
      </div>
    )
  }

  return <div className={cn('animate-fade-in', className)}>{children}</div>
}

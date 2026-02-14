import { useEffect } from 'react'
import { cn } from '../lib/utils'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export default function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-scrim animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 bg-white rounded-t-[1.5rem] animate-slide-up',
          'max-h-[85vh] flex flex-col'
        )}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-surface-highlight" />
        </div>

        {/* Title */}
        {title && (
          <div className="px-5 pb-3 pt-1 border-b border-line">
            <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          </div>
        )}

        {/* Content */}
        <div className="px-5 py-4 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}

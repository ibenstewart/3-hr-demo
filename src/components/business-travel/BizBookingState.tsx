import { useState, useEffect } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface BookingStep {
  id: number
  text: string
}

interface BizBookingStateProps {
  steps: BookingStep[]
  onComplete: () => void
}

export default function BizBookingState({ steps, onComplete }: BizBookingStateProps) {
  // Use React state instead of mutable closure variable — safe with StrictMode
  const [currentStep, setCurrentStep] = useState(-1)

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(
        () => setCurrentStep(s => s + 1),
        currentStep === -1 ? 400 : 700
      )
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(onComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length, onComplete])

  const progress = (Math.max(0, currentStep) / steps.length) * 100

  return (
    <div className="min-h-screen bg-haiti flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <Loader2 className="w-10 h-10 text-sky-blue mx-auto mb-4 animate-spin" />
        <h2 className="text-2xl font-bold text-white mb-2">Booking your trip</h2>
        <p className="text-white/40 text-sm mb-8">Sit tight — this usually takes about 30 seconds</p>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-8 overflow-hidden">
          <div
            className="bg-sky-blue h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3 text-left">
          {steps.map((step, i) => {
            const isCompleted = i < currentStep
            const isActive = i === currentStep

            return (
              <div
                key={step.id}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300',
                  isCompleted ? 'bg-white/5' : isActive ? 'bg-sky-blue/10' : 'opacity-20'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
                  isCompleted ? 'bg-eco text-white' : isActive ? 'bg-sky-blue' : 'bg-white/10'
                )}>
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : isActive ? (
                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-white/40" />
                  )}
                </div>
                <span className={cn(
                  'text-sm transition-colors duration-300',
                  isCompleted ? 'text-white/80' : isActive ? 'text-white font-medium' : 'text-white/30'
                )}>
                  {step.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

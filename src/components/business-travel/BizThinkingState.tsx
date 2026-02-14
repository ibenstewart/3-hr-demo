import { useState, useEffect } from 'react'
import { Sparkles, Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { TripScenario } from '../../data/business-travel'
import { companyContext } from '../../data/business-travel'

interface BizThinkingStateProps {
  scenario: TripScenario
  query: string
  onComplete: () => void
}

export default function BizThinkingState({ scenario, query, onComplete }: BizThinkingStateProps) {
  // Use React state instead of mutable closure variable — safe with StrictMode
  const [currentStep, setCurrentStep] = useState(-1)
  const steps = scenario.thinkingSteps

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(
        () => setCurrentStep(s => s + 1),
        currentStep === -1 ? 500 : 500
      )
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(onComplete, 400)
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length, onComplete])

  return (
    <div className="min-h-screen bg-haiti flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Sparkles className="w-10 h-10 text-sky-blue mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Finding your best options</h2>
          <p className="text-white/40 text-sm">{query}</p>
        </div>

        {/* Parsed intent card */}
        <div className="bg-white/5 rounded-xl p-4 mb-6 animate-fade-in-up">
          <div className="text-xs text-white/40 mb-2 font-semibold uppercase tracking-wide">Understood</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-white/40">Route</span>
              <p className="text-white font-semibold">{scenario.parsedIntent.origin} → {scenario.parsedIntent.destination}</p>
            </div>
            <div>
              <span className="text-white/40">Dates</span>
              <p className="text-white font-semibold">{scenario.parsedIntent.outboundDate}</p>
            </div>
            <div>
              <span className="text-white/40">Budget</span>
              <p className="text-white font-semibold">{scenario.parsedIntent.budget}</p>
            </div>
            <div>
              <span className="text-white/40">Purpose</span>
              <p className="text-white font-semibold">{scenario.parsedIntent.tripPurpose}</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, i) => {
            const isCompleted = i < currentStep
            const isActive = i === currentStep

            return (
              <div
                key={step.id}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300',
                  isCompleted ? 'bg-white/5' : isActive ? 'bg-sky-blue/10' : 'opacity-30'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300',
                  isCompleted ? 'bg-eco text-white' : isActive ? 'bg-sky-blue animate-pulse' : 'bg-white/10'
                )}>
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
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

        <div className="mt-6 text-center">
          <p className="text-white/20 text-xs">{companyContext.name} travel policy applied</p>
        </div>
      </div>
    </div>
  )
}

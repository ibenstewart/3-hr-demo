import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router'
import {
  Map,
  Compass,
  ShoppingBag,
  TrendingUp,
  Plane,
  Briefcase,
  Megaphone,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { journeySteps } from '../data/journey-narrative'

const iconMap: Record<string, LucideIcon> = {
  map: Map,
  compass: Compass,
  'shopping-bag': ShoppingBag,
  'trending-up': TrendingUp,
  plane: Plane,
  briefcase: Briefcase,
  megaphone: Megaphone,
}

const stepColors = [
  'bg-sky-blue',
  'bg-coral',
  'bg-eco',
  'bg-berry',
  'bg-haiti',
  'bg-sky-blue',
  'bg-coral',
]

export default function Journey() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stepParam = searchParams.get('step')
  const [step, setStep] = useState(stepParam ? parseInt(stepParam, 10) : 0)
  const [animating, setAnimating] = useState(false)

  const totalSteps = journeySteps.length
  const isFinale = step >= totalSteps

  // Sync URL with step
  useEffect(() => {
    setSearchParams({ step: String(step) }, { replace: true })
  }, [step, setSearchParams])

  const goTo = useCallback((nextStep: number) => {
    setAnimating(true)
    setTimeout(() => {
      setStep(nextStep)
      setAnimating(false)
    }, 200)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && step < totalSteps) goTo(step + 1)
      if (e.key === 'ArrowLeft' && step > 0) goTo(step - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [step, totalSteps, goTo])

  if (isFinale) {
    return <Finale onBack={() => goTo(totalSteps - 1)} />
  }

  const current = journeySteps[step]
  const Icon = iconMap[current.icon] || Map
  const color = stepColors[step]

  return (
    <div className="min-h-screen bg-haiti flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <div
          className="h-full bg-sky-blue transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / (totalSteps + 1)) * 100}%` }}
        />
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 pt-6 px-6">
        {journeySteps.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              i === step ? 'bg-sky-blue scale-125' : i < step ? 'bg-white/40' : 'bg-white/15'
            )}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
        <button
          onClick={() => goTo(totalSteps)}
          className={cn(
            'w-2.5 h-2.5 rounded-full transition-all duration-300 bg-white/15'
          )}
          aria-label="Go to finale"
        />
      </div>

      {/* Main content */}
      <div className={cn(
        'flex-1 flex flex-col items-center justify-center px-6 py-12 transition-opacity duration-200',
        animating ? 'opacity-0' : 'opacity-100'
      )}>
        <div className="max-w-lg text-center">
          {/* Step number */}
          <div className="text-white/30 text-sm font-mono mb-6">
            {step + 1} / {totalSteps}
          </div>

          {/* Icon */}
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-fade-in-up',
            color
          )}>
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 animate-fade-in-up stagger-1">
            {current.title}
          </h1>

          {/* Description */}
          <p className="text-white/60 text-lg leading-relaxed mb-10 animate-fade-in-up stagger-2">
            {current.description}
          </p>

          {/* Enter demo CTA */}
          <Link
            to={`${current.demoRoute}?journey=true&step=${step}`}
            className={cn(
              'inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all animate-fade-in-up stagger-3',
              color
            )}
          >
            Enter: {current.demoTitle}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 pb-8 max-w-lg mx-auto w-full">
        <button
          onClick={() => step > 0 ? goTo(step - 1) : undefined}
          className={cn(
            'flex items-center gap-1 text-sm font-medium transition-colors',
            step > 0 ? 'text-white/50 hover:text-white' : 'text-transparent pointer-events-none'
          )}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <button
          onClick={() => goTo(step + 1)}
          className="flex items-center gap-1 text-white/50 hover:text-white text-sm font-medium transition-colors"
        >
          Skip <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function Finale({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-haiti flex flex-col">
      {/* Full progress bar */}
      <div className="h-1 bg-sky-blue" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl text-center">
          <Sparkles className="w-12 h-12 text-sky-blue mx-auto mb-6 animate-fade-in-up" />

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 animate-fade-in-up stagger-1">
            7 products.{' '}
            <span className="text-sky-blue">3 hours.</span>
          </h1>

          <p className="text-2xl text-white/60 font-bold mb-3 animate-fade-in-up stagger-2">
            One engineer + Claude Code.
          </p>

          <p className="text-white/40 text-lg mb-12 animate-fade-in-up stagger-3">
            What could your team build in a weekend?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-4">
            <Link
              to="/stats"
              className="inline-flex items-center gap-2 bg-sky-blue text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              See the build stats <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
            >
              Explore all demos
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 pb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/50 hover:text-white text-sm font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to last demo
        </button>
      </div>
    </div>
  )
}

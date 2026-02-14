import { Check, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { FlightOption } from '../../data/business-travel'

interface BizOptionCardProps {
  option: FlightOption
  selected: boolean
  onSelect: () => void
  index: number
}

const typeColors: Record<string, string> = {
  budget: 'bg-eco',
  fastest: 'bg-sky-blue',
  flexible: 'bg-berry',
}

export default function BizOptionCard({ option, selected, onSelect, index }: BizOptionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left bg-white rounded-xl shadow-sm transition-all duration-200 overflow-hidden animate-fade-in-up',
        selected
          ? 'ring-2 ring-sky-blue shadow-md -translate-y-0.5'
          : 'hover:shadow-md hover:-translate-y-0.5'
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Type badge */}
      <div className={cn('h-1.5', typeColors[option.type] || 'bg-sky-blue')} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={cn(
              'text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full',
              option.type === 'budget' ? 'bg-success-fill text-success' :
              option.type === 'fastest' ? 'bg-surface-subtle text-sky-blue' :
              'bg-danger-fill text-berry'
            )}>
              {option.label}
            </span>
            <p className="text-text-secondary text-xs mt-1">{option.tagline}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-text-primary">{option.currency}{option.price}</p>
            <p className="text-text-secondary text-xs">return</p>
          </div>
        </div>

        {/* Outbound leg */}
        <div className="bg-canvas-contrast rounded-lg p-3 mb-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">{option.outbound.airlineLogo}</span>
              <div>
                <p className="font-semibold text-text-primary">{option.outbound.departure.time}</p>
                <p className="text-text-secondary text-xs">{option.outbound.departure.code}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-text-secondary text-xs">{option.outbound.duration}</span>
              <div className="flex items-center gap-1">
                <div className="w-12 h-px bg-line" />
                <ArrowRight className="w-3 h-3 text-text-secondary" />
              </div>
              <span className="text-text-secondary text-xs">
                {option.outbound.stops === 0 ? 'Direct' : `${option.outbound.stops} stop`}
              </span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-text-primary">{option.outbound.arrival.time}</p>
              <p className="text-text-secondary text-xs">{option.outbound.arrival.code}</p>
            </div>
          </div>
        </div>

        {/* Inbound leg (only show if it has data) */}
        {option.inbound.airline && (
          <div className="bg-canvas-contrast rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">{option.inbound.airlineLogo}</span>
                <div>
                  <p className="font-semibold text-text-primary">{option.inbound.departure.time}</p>
                  <p className="text-text-secondary text-xs">{option.inbound.departure.code}</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-text-secondary text-xs">{option.inbound.duration}</span>
                <div className="flex items-center gap-1">
                  <div className="w-12 h-px bg-line" />
                  <ArrowRight className="w-3 h-3 text-text-secondary" />
                </div>
                <span className="text-text-secondary text-xs">
                  {option.inbound.stops === 0 ? 'Direct' : `${option.inbound.stops} stop`}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-text-primary">{option.inbound.arrival.time}</p>
                <p className="text-text-secondary text-xs">{option.inbound.arrival.code}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reasoning */}
        <div className="space-y-1 mb-3">
          {option.reasoning.slice(0, 2).map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-text-secondary">
              <Check className="w-3.5 h-3.5 text-eco flex-shrink-0 mt-0.5" />
              <span>{r}</span>
            </div>
          ))}
        </div>

        {/* Tradeoff */}
        {option.tradeoffs && (
          <p className="text-xs text-warning bg-warning-fill/50 rounded-lg px-3 py-2">
            {option.tradeoffs}
          </p>
        )}

        {/* Selected indicator */}
        {selected && (
          <div className="mt-3 flex items-center justify-center gap-1 text-sky-blue text-sm font-bold">
            <Check className="w-4 h-4" /> Selected
          </div>
        )}
      </div>
    </button>
  )
}

import { useState } from 'react'
import { AlertTriangle, ArrowRight, Check, MessageSquare, Clock } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { DisruptionScenario } from '../../data/business-travel'
import { companyContext } from '../../data/business-travel'

interface BizDisruptionAlertProps {
  disruption: DisruptionScenario
  isRebooked: boolean
  onRebook: () => void
  onDismiss: () => void
  onNewSearch: () => void
}

export default function BizDisruptionAlert({
  disruption,
  isRebooked,
  onRebook,
  onDismiss,
  onNewSearch,
}: BizDisruptionAlertProps) {
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null)

  if (isRebooked) {
    const rebookedFlight = disruption.alternatives.find(a => a.id === selectedAlt) || disruption.alternatives[0]
    return (
      <div className="min-h-screen bg-canvas-contrast">
        <div className="bg-haiti text-white py-8 px-6">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-eco rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p className="text-eco font-bold text-sm uppercase tracking-wide">Rebooked</p>
            </div>
            <h1 className="text-2xl md:text-3xl font-black">You're all set</h1>
            <p className="text-white/50 mt-1">Your return flight has been updated</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
          {/* New flight */}
          <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up">
            <h3 className="font-bold text-text-primary mb-3">Updated Return Flight</h3>
            <div className="bg-canvas-contrast rounded-lg p-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{rebookedFlight.inbound.airlineLogo}</span>
                  <div>
                    <p className="font-semibold text-text-primary">{rebookedFlight.inbound.airline} {rebookedFlight.inbound.flightNumber}</p>
                    <p className="text-text-secondary text-xs">{rebookedFlight.inbound.departure.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-semibold">{rebookedFlight.inbound.departure.time}</p>
                    <p className="text-text-secondary text-xs">{rebookedFlight.inbound.departure.code}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-secondary" />
                  <div>
                    <p className="font-semibold">{rebookedFlight.inbound.arrival.time}</p>
                    <p className="text-text-secondary text-xs">{rebookedFlight.inbound.arrival.code}</p>
                  </div>
                </div>
              </div>
            </div>
            {rebookedFlight.price > 0 && (
              <p className="text-text-secondary text-xs mt-2">Additional cost: {rebookedFlight.currency}{rebookedFlight.price} (extra hotel night)</p>
            )}
          </div>

          {/* Slack notification */}
          <div className="bg-[#1a1d21] rounded-xl overflow-hidden shadow-sm animate-fade-in-up stagger-1">
            <div className="bg-[#1a1d21] border-b border-white/10 px-4 py-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-white/60" />
              <span className="text-white/80 text-sm font-semibold">#travel-approvals</span>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">travel.ai</span>
                    <span className="bg-[#4a154b]/30 text-[#e8b4e8] text-xs px-1.5 py-0.5 rounded font-medium">APP</span>
                    <span className="text-white/30 text-xs">just now</span>
                  </div>
                  <div className="mt-2 border-l-4 border-eco bg-[#222529] rounded-r-lg p-3 text-sm">
                    <p className="text-white font-semibold mb-1">Flight rebooking confirmed</p>
                    <p className="text-white/70 text-xs">
                      Ben's return flight has been changed from {disruption.originalFlight.flightNumber} to {rebookedFlight.inbound.flightNumber}.
                      New departure: {rebookedFlight.inbound.departure.time}.
                      {rebookedFlight.price > 0 && ` Additional cost: £${rebookedFlight.price}.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={onDismiss}
              className="bg-sky-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-sky-blue/90 transition-colors"
            >
              Back to confirmation
            </button>
            <button
              onClick={onNewSearch}
              className="text-text-secondary text-sm hover:text-text-primary transition-colors py-3"
            >
              New search
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Disruption alert view
  return (
    <div className="min-h-screen bg-canvas-contrast">
      <div className="bg-danger-fill py-8 px-6">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-danger" />
            <span className="text-danger font-bold text-sm uppercase tracking-wide">Flight Disruption</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-text-primary">{disruption.message}</h1>
          <p className="text-text-secondary mt-1">{disruption.impact}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        {/* Original flight */}
        <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-danger" />
            <h3 className="font-bold text-text-primary text-sm">Original Flight (Delayed)</h3>
          </div>
          <div className="bg-danger-fill/30 rounded-lg p-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{disruption.originalFlight.airlineLogo}</span>
                <span className="font-semibold text-text-primary">{disruption.originalFlight.airline} {disruption.originalFlight.flightNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="line-through text-text-secondary">{disruption.originalFlight.departure.time}</span>
                <ArrowRight className="w-3 h-3 text-text-secondary" />
                <span className="line-through text-text-secondary">{disruption.originalFlight.arrival.time}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI suggestions */}
        <div className="animate-fade-in-up stagger-1">
          <h3 className="font-bold text-text-primary mb-3">Here are your options</h3>
          <div className="space-y-3">
            {disruption.alternatives.map((alt, i) => (
              <button
                key={alt.id}
                onClick={() => setSelectedAlt(alt.id)}
                className={cn(
                  'w-full text-left bg-white rounded-xl shadow-sm p-5 transition-all duration-200',
                  selectedAlt === alt.id ? 'ring-2 ring-sky-blue shadow-md' : 'hover:shadow-md'
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className={cn(
                      'text-xs font-bold uppercase px-2 py-0.5 rounded-full',
                      alt.type === 'fastest' ? 'bg-surface-subtle text-sky-blue' :
                      alt.type === 'budget' ? 'bg-success-fill text-success' :
                      'bg-warning-fill text-warning'
                    )}>
                      {alt.label}
                    </span>
                    <p className="text-text-secondary text-xs mt-1">{alt.tagline}</p>
                  </div>
                  {alt.price > 0 && (
                    <span className="text-sm font-bold text-text-primary">+{alt.currency}{alt.price}</span>
                  )}
                  {alt.price === 0 && (
                    <span className="text-sm font-bold text-eco">Free</span>
                  )}
                </div>

                {/* Flight details */}
                <div className="bg-canvas-contrast rounded-lg p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{alt.inbound.airlineLogo}</span>
                      <span className="font-semibold text-text-primary">{alt.inbound.airline} {alt.inbound.flightNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{alt.inbound.departure.time}</span>
                      <ArrowRight className="w-3 h-3 text-text-secondary" />
                      <span className="font-semibold">{alt.inbound.arrival.time}</span>
                    </div>
                  </div>
                </div>

                {/* Reasoning */}
                <div className="mt-2 space-y-1">
                  {alt.reasoning.map((r, ri) => (
                    <div key={ri} className="flex items-start gap-1.5 text-xs text-text-secondary">
                      <Check className="w-3 h-3 text-eco flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                {selectedAlt === alt.id && (
                  <div className="mt-2 text-center text-sky-blue text-sm font-bold">
                    <Check className="w-4 h-4 inline mr-1" /> Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 animate-fade-in-up stagger-2">
          <button
            onClick={onRebook}
            disabled={!selectedAlt}
            className={cn(
              'flex-1 bg-sky-blue text-white font-bold py-3 rounded-lg transition-colors',
              selectedAlt ? 'hover:bg-sky-blue/90' : 'opacity-50 cursor-not-allowed'
            )}
          >
            Rebook now
          </button>
          <button
            onClick={onNewSearch}
            className="text-text-secondary text-sm hover:text-text-primary transition-colors px-4"
          >
            New search
          </button>
        </div>
      </div>
    </div>
  )
}

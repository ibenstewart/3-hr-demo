import { useState } from 'react'
import { Link } from 'react-router'
import { Plane, Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { cn } from '../lib/utils'
import { ancillaries, bookingDetails } from '../data/ancillaries'

function getIcon(name: string) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name]
  return Icon || Sparkles
}

export default function Ancillaries() {
  const [added, setAdded] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setAdded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const addedItems = ancillaries.filter(a => added.has(a.id))
  const total = addedItems.reduce((sum, a) => {
    const itemTotal = a.perPerson ? a.price * a.passengers : a.price
    return sum + itemTotal
  }, 0)
  const readiness = Math.min(100, Math.round((added.size / ancillaries.length) * 100))

  const separateTotal = addedItems.reduce((sum, a) => {
    const price = a.originalPrice || a.price
    return sum + (a.perPerson ? price * a.passengers : price)
  }, 0)
  const savings = separateTotal - total

  return (
    <div className="min-h-screen bg-canvas-contrast">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Trip context banner */}
        <Link
          to="/companion"
          className="block bg-sky-blue/5 border border-sky-blue/20 rounded-lg px-4 py-2.5 mb-6 hover:bg-sky-blue/10 transition-colors"
        >
          <p className="text-sm text-text-primary">
            <span className="font-semibold">Your trip companion activates on Feb 12</span>
            <span className="text-sky-blue ml-2 text-xs font-semibold">View companion →</span>
          </p>
        </Link>

        {/* Booking card */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-sky-blue rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-text-primary">Booking confirmed</h2>
              <p className="text-sm text-text-secondary">Ref: {bookingDetails.bookingRef}</p>
            </div>
            <span className="ml-auto bg-success-fill text-success text-xs font-bold px-3 py-1 rounded-full">
              Confirmed
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-text-secondary text-xs">Route</span>
              <p className="font-semibold text-text-primary">{bookingDetails.route}</p>
            </div>
            <div>
              <span className="text-text-secondary text-xs">Date</span>
              <p className="font-semibold text-text-primary">{bookingDetails.date}</p>
            </div>
            <div>
              <span className="text-text-secondary text-xs">Flight</span>
              <p className="font-semibold text-text-primary">{bookingDetails.airline} {bookingDetails.flightNumber}</p>
            </div>
            <div>
              <span className="text-text-secondary text-xs">Passengers</span>
              <p className="font-semibold text-text-primary">{bookingDetails.passengers.map(p => p.name).join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recommendations */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-sky-blue" />
              <h2 className="text-xl font-bold text-text-primary">Get ready for Barcelona</h2>
            </div>

            <div className="space-y-4">
              {ancillaries.map((item, i) => {
                const Icon = getIcon(item.icon)
                const isAdded = added.has(item.id)
                const displayPrice = item.perPerson
                  ? `£${item.price}pp × ${item.passengers}`
                  : item.currency === 'EUR' ? `€${item.price}` : `£${item.price}`
                const displayTotal = item.perPerson
                  ? `£${item.price * item.passengers}`
                  : item.currency === 'EUR' ? `€${item.price}` : `£${item.price}`

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "bg-white rounded-xl p-5 shadow-sm transition-all duration-200 animate-fade-in-up",
                      `stagger-${Math.min(i + 1, 6)}`,
                      isAdded && "ring-2 ring-success"
                    )}
                  >
                    <div className="flex gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                        isAdded ? "bg-success" : "bg-surface-subtle"
                      )}>
                        <Icon className={cn("w-5 h-5", isAdded ? "text-white" : "text-sky-blue")} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-text-primary">{item.title}</h3>
                            <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-text-primary">{displayTotal}</p>
                            {item.perPerson && (
                              <p className="text-xs text-text-secondary">{displayPrice}</p>
                            )}
                            {item.originalPrice && (
                              <p className="text-xs text-text-secondary line-through">
                                £{item.perPerson ? item.originalPrice * item.passengers : item.originalPrice}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="bg-surface-subtle rounded-lg p-3 mt-3">
                          <p className="text-xs text-text-secondary italic">
                            <Sparkles className="w-3 h-3 inline mr-1 text-sky-blue" />
                            {item.aiReasoning}
                          </p>
                        </div>
                        <button
                          onClick={() => toggle(item.id)}
                          className={cn(
                            "mt-3 px-4 py-2 rounded-lg text-sm font-bold transition-colors",
                            isAdded
                              ? "bg-success text-white hover:bg-success/90"
                              : "bg-sky-blue text-white hover:bg-sky-blue/90"
                          )}
                        >
                          {isAdded ? (
                            <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Added</span>
                          ) : (
                            'Add to trip'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bundle summary sidebar */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-blue" />
                Your trip extras
              </h3>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">Trip readiness</span>
                  <span className="font-bold text-text-primary">{readiness}%</span>
                </div>
                <div className="h-2 bg-canvas-contrast rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-blue rounded-full transition-all duration-500"
                    style={{ width: `${readiness}%` }}
                  />
                </div>
              </div>

              {/* Added items */}
              {addedItems.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {addedItems.map(item => {
                    const itemTotal = item.perPerson ? item.price * item.passengers : item.price
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-text-secondary">{item.title}</span>
                        <span className="font-semibold text-text-primary">
                          {item.currency === 'EUR' ? '€' : '£'}{itemTotal}
                        </span>
                      </div>
                    )
                  })}
                  <div className="border-t border-line pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-text-primary">£{total}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-secondary mb-4">
                  Add items above to build your trip bundle.
                </p>
              )}

              {/* Savings callout */}
              {added.size >= 3 && savings > 0 && (
                <div className="bg-success-fill text-success text-sm font-bold p-3 rounded-lg mb-4 animate-fade-in">
                  You're saving £{savings} vs buying separately
                </div>
              )}

              <button
                disabled={addedItems.length === 0}
                className={cn(
                  "w-full py-3 rounded-lg font-bold transition-colors",
                  addedItems.length > 0
                    ? "bg-sky-blue text-white hover:bg-sky-blue/90"
                    : "bg-canvas-contrast text-text-secondary cursor-not-allowed"
                )}
              >
                {addedItems.length > 0 ? `Complete your trip — £${total}` : 'Add items to continue'}
              </button>

              {/* Cross-demo link */}
              <Link
                to="/companion"
                className="mt-4 block text-center text-xs text-sky-blue hover:underline"
              >
                Already booked? Track your trip with Companion <ArrowRight className="w-3 h-3 inline" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

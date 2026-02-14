import { useState, useEffect } from 'react'
import { Shield, TrendingDown, Plane, Lock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart } from 'recharts'
import { cn } from '../lib/utils'
import { priceHistory, flightOptions, priceVerdict } from '../data/price-history'

// Backpack token values for Recharts (which needs raw color strings, not CSS vars)
const BPK_SKY_BLUE = 'rgb(0, 98, 227)'
const BPK_TEXT_SECONDARY = 'rgb(98, 105, 113)'
const BPK_LINE = 'rgb(193, 199, 207)'

function CountdownTimer({ initialSeconds }: { initialSeconds: number }) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(interval)
  }, [])

  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return (
    <span className="font-mono font-bold animate-countdown-pulse">
      {String(hours).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </span>
  )
}

export default function PriceIntelligence() {
  const [frozenFlightId, setFrozenFlightId] = useState<string | null>(null)
  const [showFreezeModal, setShowFreezeModal] = useState<string | null>(null)

  const chartData = priceHistory.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-GB', { month: 'short' }),
    price: d.price,
    predicted: d.date >= '2026-03-01' ? d.price : undefined,
  }))

  const confidenceColor =
    priceVerdict.confidence >= 70 ? 'text-success' :
    priceVerdict.confidence >= 40 ? 'text-warning' : 'text-danger'

  const verdictBg =
    priceVerdict.recommendation === 'buy' ? 'bg-success-fill border-success' :
    priceVerdict.recommendation === 'good-deal' ? 'bg-success-fill border-success' :
    'bg-warning-fill border-warning'

  const verdictLabel =
    priceVerdict.recommendation === 'buy' ? 'Buy now' :
    priceVerdict.recommendation === 'good-deal' ? 'Good deal' : 'Wait'

  return (
    <div className="min-h-screen bg-canvas-contrast">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Route search header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 animate-fade-in-up">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <Plane className="w-5 h-5 text-sky-blue" />
              <div>
                <p className="text-xs text-text-secondary">From</p>
                <p className="font-bold text-text-primary">Edinburgh (EDI)</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-canvas-contrast flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-text-secondary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">To</p>
                <p className="font-bold text-text-primary">New York (JFK)</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <p className="text-xs text-text-secondary">Dates</p>
                <p className="font-semibold text-text-primary">15 — 22 Jun 2026</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">Passengers</p>
                <p className="font-semibold text-text-primary">2 Adults</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Price chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-in-up stagger-1">
              <h2 className="font-bold text-text-primary mb-1">Price history</h2>
              <p className="text-sm text-text-secondary mb-4">Edinburgh → New York, last 12 months</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData}>
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: BPK_TEXT_SECONDARY }} />
                    <YAxis
                      tick={{ fontSize: 12, fill: BPK_TEXT_SECONDARY }}
                      tickFormatter={(v) => `£${v}`}
                      domain={['dataMin - 30', 'dataMax + 30']}
                    />
                    <Tooltip
                      formatter={(value) => [`£${value}`, 'Price']}
                      contentStyle={{
                        borderRadius: '8px',
                        border: `1px solid ${BPK_LINE}`,
                        fontSize: '14px',
                      }}
                    />
                    <ReferenceLine
                      y={priceVerdict.historicalAverage}
                      stroke={BPK_LINE}
                      strokeDasharray="4 4"
                      label={{ value: `Avg £${priceVerdict.historicalAverage}`, position: 'right', fontSize: 11, fill: BPK_TEXT_SECONDARY }}
                    />
                    <ReferenceLine
                      y={priceVerdict.currentPrice}
                      stroke={BPK_SKY_BLUE}
                      strokeDasharray="4 4"
                      label={{ value: `Now £${priceVerdict.currentPrice}`, position: 'left', fontSize: 11, fill: BPK_SKY_BLUE }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={BPK_SKY_BLUE}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 5, fill: BPK_SKY_BLUE }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-xs text-text-secondary">
                <span>Current: <span className="font-bold text-sky-blue">£{priceVerdict.currentPrice}</span></span>
                <span>Average: <span className="font-bold">£{priceVerdict.historicalAverage}</span></span>
                <span>Best seen: <span className="font-bold text-success">£{priceVerdict.bestPriceSeen}</span></span>
                <span>Predicted 30d: <span className="font-bold">£{priceVerdict.predictedMin}–£{priceVerdict.predictedMax}</span></span>
              </div>
            </div>

            {/* Flight options */}
            <div className="animate-fade-in-up stagger-2">
              <h2 className="font-bold text-text-primary mb-4">Best fares</h2>
              <div className="space-y-3">
                {flightOptions.map((flight) => {
                  const isFrozen = frozenFlightId === flight.id
                  return (
                    <div key={flight.id} className={cn(
                      "bg-white rounded-xl p-5 shadow-sm transition-all",
                      isFrozen && "ring-2 ring-sky-blue"
                    )}>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-canvas-contrast rounded-lg flex items-center justify-center">
                            <Plane className="w-5 h-5 text-text-secondary" />
                          </div>
                          <div>
                            <p className="font-bold text-text-primary">{flight.airline}</p>
                            <p className="text-sm text-text-secondary">
                              {flight.departure} → {flight.arrival} · {flight.duration}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {flight.stops === 0 ? 'Direct' : `1 stop · ${flight.stopCity}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-text-primary">£{flight.price}</p>
                          <p className="text-xs text-text-secondary">per person</p>
                          {isFrozen ? (
                            <div className="mt-2 flex items-center gap-2">
                              <Lock className="w-4 h-4 text-sky-blue" />
                              <span className="text-sm text-sky-blue font-bold">
                                <CountdownTimer initialSeconds={259172} />
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowFreezeModal(flight.id)}
                              className="mt-2 bg-sky-blue text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-sky-blue/90 transition-colors"
                            >
                              Freeze this price
                            </button>
                          )}
                        </div>
                      </div>
                      {isFrozen && (
                        <div className="mt-4 bg-surface-subtle rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-sky-blue">
                            <Shield className="w-4 h-4" />
                            <span className="font-semibold">Price locked at £{flight.price}</span>
                          </div>
                          <button className="bg-sky-blue text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-sky-blue/90">
                            Book now at £{flight.price}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* AI Verdict sidebar */}
          <div className="space-y-6">
            <div className={cn("rounded-xl p-6 border-2 animate-fade-in-up stagger-1", verdictBg)}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5 text-success" />
                <span className="font-bold text-text-primary text-lg">AI Price Verdict</span>
              </div>
              <div className="text-3xl font-black text-text-primary mb-2">{verdictLabel}</div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full"
                    style={{ width: `${priceVerdict.confidence}%` }}
                  />
                </div>
                <span className={cn("text-sm font-bold", confidenceColor)}>
                  {priceVerdict.confidence}%
                </span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {priceVerdict.explanation}
              </p>
            </div>

            {/* How freeze works */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-text-primary mb-4">How Price Freeze works</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Freeze today', desc: 'Pay a small fee to lock the current price' },
                  { step: '2', title: 'Decide in 72h', desc: 'Take your time to confirm your plans' },
                  { step: '3', title: 'Book or walk away', desc: 'If price drops, pay less. If it rises, you\'re protected.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="w-7 h-7 bg-sky-blue text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{s.title}</p>
                      <p className="text-xs text-text-secondary">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/ancillaries"
              className="block text-center text-sm text-sky-blue hover:underline"
            >
              Already booked? Add travel extras →
            </Link>
          </div>
        </div>
      </div>

      {/* Freeze Modal */}
      {showFreezeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFreezeModal(null)} />
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 animate-fade-in-up">
            <h2 className="text-xl font-black text-text-primary mb-2">
              <Lock className="w-5 h-5 inline mr-2 text-sky-blue" />
              Freeze this price
            </h2>
            {(() => {
              const flight = flightOptions.find(f => f.id === showFreezeModal)
              if (!flight) return null
              return (
                <>
                  <p className="text-text-secondary mb-6">
                    Lock <span className="font-bold text-text-primary">£{flight.price}</span> per person
                    on {flight.airline} for 72 hours.
                  </p>
                  <div className="bg-surface-subtle rounded-lg p-4 mb-6 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Freeze fee</span>
                      <span className="font-bold">£5 per passenger</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Passengers</span>
                      <span className="font-bold">2</span>
                    </div>
                    <div className="border-t border-line pt-2 flex justify-between font-bold">
                      <span>Total freeze cost</span>
                      <span className="text-sky-blue">£10</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mb-4">
                    If the price drops, you pay the lower price. If it rises, you're protected.
                    The freeze fee is non-refundable.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowFreezeModal(null)}
                      className="flex-1 border border-line rounded-lg py-3 font-bold text-text-primary hover:bg-canvas-contrast transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setFrozenFlightId(showFreezeModal)
                        setShowFreezeModal(null)
                      }}
                      className="flex-1 bg-sky-blue text-white rounded-lg py-3 font-bold hover:bg-sky-blue/90 transition-colors"
                    >
                      Freeze for £10
                    </button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

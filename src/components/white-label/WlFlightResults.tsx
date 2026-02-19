import { useState } from 'react'
import type { WlFlight } from '../../data/white-label'
import { wlFlights } from '../../data/white-label'
import { useBrandContext } from './WlBrandContext'
import { ArrowRight, Info, Snowflake, Clock, Luggage } from 'lucide-react'
import { cn } from '../../lib/utils'

interface WlFlightResultsProps {
  onSelect: (flight: WlFlight) => void
  onFreeze: (flightId: string) => void
  frozenFlights: Set<string>
}

type SortBy = 'score' | 'price' | 'duration'

function scoreColor(score: number): string {
  if (score >= 80) return '#0f9b8e'
  if (score >= 60) return '#e39d25'
  return '#e70866'
}

function scoreBg(score: number): string {
  if (score >= 80) return '#0f9b8e20'
  if (score >= 60) return '#e39d2520'
  return '#e7086620'
}

export default function WlFlightResults({ onSelect, onFreeze, frozenFlights }: WlFlightResultsProps) {
  const { brand } = useBrandContext()
  const [sortBy, setSortBy] = useState<SortBy>('score')
  const [stopsFilter, setStopsFilter] = useState<'any' | 'direct' | '1stop'>('any')
  const [hoveredScore, setHoveredScore] = useState<string | null>(null)

  const filtered = wlFlights
    .filter(f => {
      if (stopsFilter === 'direct') return f.stops === 0
      if (stopsFilter === '1stop') return f.stops <= 1
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score
      if (sortBy === 'price') return a.price - b.price
      return 0
    })

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold" style={{ color: brand.primaryColor }}>London → New York</h2>
        <p className="text-sm text-gray-500">15 Mar 2026 · 1 Adult · Economy</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-6 mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort:</span>
          {(['score', 'price', 'duration'] as SortBy[]).map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={cn(
                'text-xs px-3 py-1 rounded-full border transition-colors',
                sortBy === s ? 'text-white border-transparent' : 'text-gray-600 border-gray-300 hover:border-gray-400'
              )}
              style={sortBy === s ? { backgroundColor: brand.primaryColor } : undefined}
            >
              {s === 'score' ? 'Best Score' : s === 'price' ? 'Cheapest' : 'Fastest'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Stops:</span>
          {([['any', 'Any'], ['direct', 'Direct'], ['1stop', '1 Stop']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setStopsFilter(val)}
              className={cn(
                'text-xs px-3 py-1 rounded-full border transition-colors',
                stopsFilter === val ? 'text-white border-transparent' : 'text-gray-600 border-gray-300 hover:border-gray-400'
              )}
              style={stopsFilter === val ? { backgroundColor: brand.primaryColor } : undefined}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Flight Cards */}
      <div className="space-y-3">
        {filtered.map((flight, i) => (
          <div
            key={flight.id}
            className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all p-4 cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={() => onSelect(flight)}
          >
            <div className="flex items-center gap-4">
              {/* Airline */}
              <div className="w-16 text-center">
                <span className="text-2xl">{flight.airlineLogo}</span>
                <p className="text-xs text-gray-500 mt-1 truncate">{flight.airline}</p>
              </div>

              {/* Flight times */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-bold text-lg">{flight.departure.time}</p>
                    <p className="text-xs text-gray-500">{flight.departure.airport}</p>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="h-px flex-1 bg-gray-300" />
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {flight.duration}
                    </div>
                    <div className="h-px flex-1 bg-gray-300" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{flight.arrival.time}</p>
                    <p className="text-xs text-gray-500">{flight.arrival.airport}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  {flight.stops === 0 ? (
                    <span className="text-green-600 font-medium">Direct</span>
                  ) : (
                    <span>{flight.stops} stop via {flight.stopCity}</span>
                  )}
                  <span className="flex items-center gap-1"><Luggage className="w-3 h-3" />{flight.baggage.checked}</span>
                  <span>{flight.co2Kg}kg CO₂</span>
                </div>
              </div>

              {/* Score */}
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-xl flex flex-col items-center justify-center cursor-help"
                  style={{ backgroundColor: scoreBg(flight.score), color: scoreColor(flight.score) }}
                  onMouseEnter={() => setHoveredScore(flight.id)}
                  onMouseLeave={() => setHoveredScore(null)}
                >
                  <span className="text-lg font-bold leading-none">{flight.score}</span>
                  <span className="text-[10px] font-medium leading-none mt-0.5">score</span>
                </div>
                <Info className="absolute -top-1 -right-1 w-3.5 h-3.5 text-gray-400" />

                {/* Score Tooltip */}
                {hoveredScore === flight.id && (
                  <div className="absolute right-0 top-16 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-56 animate-fade-in-up">
                    <p className="text-xs font-bold mb-3" style={{ color: brand.primaryColor }}>Flight Score Breakdown</p>
                    {[
                      { label: 'Price', value: flight.scoreBreakdown.price, max: 30 },
                      { label: 'Duration', value: flight.scoreBreakdown.duration, max: 25 },
                      { label: 'Airline', value: flight.scoreBreakdown.airline, max: 20 },
                      { label: 'Convenience', value: flight.scoreBreakdown.convenience, max: 15 },
                      { label: 'Eco', value: flight.scoreBreakdown.eco, max: 10 },
                    ].map(factor => (
                      <div key={factor.label} className="mb-2">
                        <div className="flex justify-between text-[11px] mb-0.5">
                          <span className="text-gray-600">{factor.label}</span>
                          <span className="font-medium">{factor.value}/{factor.max}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(factor.value / factor.max) * 100}%`,
                              backgroundColor: brand.primaryColor,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price + Actions */}
              <div className="text-right w-28">
                <p className="text-2xl font-bold" style={{ color: brand.primaryColor }}>£{flight.price}</p>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onFreeze(flight.id) }}
                    className={cn(
                      'text-[10px] px-2 py-1 rounded-full border transition-colors flex items-center gap-1',
                      frozenFlights.has(flight.id) ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-300 text-gray-500 hover:border-blue-300'
                    )}
                  >
                    <Snowflake className="w-3 h-3" />
                    {frozenFlights.has(flight.id) ? 'Frozen' : 'Freeze'}
                  </button>
                  <button className="text-[10px] px-2 py-1 rounded-full text-white flex items-center gap-1" style={{ backgroundColor: brand.primaryColor }}>
                    Select <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

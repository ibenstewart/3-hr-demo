import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { TripScenario, FlightOption } from '../../data/business-travel'
import { companyContext } from '../../data/business-travel'
import BizOptionCard from './BizOptionCard'

interface BizMultiCityTabsProps {
  scenario: TripScenario
  activeLeg: number
  onChangeLeg: (leg: number) => void
  legSelections: Record<string, FlightOption>
  onSelectLegFlight: (legId: string, flight: FlightOption) => void
  onContinue: () => void
  onNewSearch: () => void
}

export default function BizMultiCityTabs({
  scenario,
  activeLeg,
  onChangeLeg,
  legSelections,
  onSelectLegFlight,
  onContinue,
  onNewSearch,
}: BizMultiCityTabsProps) {
  const legs = scenario.legs || []
  const currentLeg = legs[activeLeg]
  const allLegsSelected = legs.every(leg => legSelections[leg.id])

  const totalFlights = Object.values(legSelections).reduce((sum, f) => sum + f.price, 0)
  const totalHotels = legs.reduce((sum, leg) => sum + (leg.hotel?.totalPrice || 0), 0)

  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Header */}
      <div className="bg-haiti text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-sky-blue text-sm font-bold uppercase tracking-wide mb-1">
              {companyContext.name} · Multi-City Trip
            </p>
            <h1 className="text-2xl md:text-3xl font-black">{scenario.resultsHeader.title}</h1>
            <p className="text-white/60 mt-1">{scenario.resultsHeader.subtitle}</p>
          </div>

          {/* Leg tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto animate-fade-in-up stagger-1">
            {legs.map((leg, i) => {
              const isSelected = !!legSelections[leg.id]
              return (
                <button
                  key={leg.id}
                  onClick={() => onChangeLeg(i)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap',
                    activeLeg === i
                      ? 'bg-white text-haiti'
                      : isSelected
                        ? 'bg-white/15 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10'
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-eco" />}
                  {leg.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {currentLeg && (
          <div className="animate-fade-in">
            {/* Leg info */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-text-primary">{currentLeg.label}</h2>
                <p className="text-text-secondary text-sm">{currentLeg.date}</p>
              </div>
              {currentLeg.hotel && (
                <div className="bg-white rounded-lg shadow-sm px-4 py-2 text-sm">
                  <span className="text-text-secondary">Hotel: </span>
                  <span className="font-semibold text-text-primary">{currentLeg.hotel.name}</span>
                  <span className="text-text-secondary"> · {currentLeg.hotel.currency}{currentLeg.hotel.totalPrice}</span>
                </div>
              )}
            </div>

            {/* Flight options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {currentLeg.flightOptions.map((option, i) => (
                <BizOptionCard
                  key={option.id}
                  option={option}
                  selected={legSelections[currentLeg.id]?.id === option.id}
                  onSelect={() => onSelectLegFlight(currentLeg.id, option)}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}

        {/* Summary bar */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-5 animate-fade-in-up">
          <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
            {legs.map((leg) => {
              const selected = legSelections[leg.id]
              return (
                <div key={leg.id} className="flex items-center gap-2">
                  {selected ? (
                    <Check className="w-4 h-4 text-eco" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-line" />
                  )}
                  <span className={cn(
                    'text-sm',
                    selected ? 'text-text-primary font-semibold' : 'text-text-secondary'
                  )}>
                    {leg.originCode} → {leg.destinationCode}
                    {selected && ` — £${selected.price}`}
                  </span>
                </div>
              )
            })}
          </div>

          {allLegsSelected && (
            <div className="flex items-center justify-between border-t border-line pt-3">
              <div className="text-sm">
                <span className="text-text-secondary">Flights: £{totalFlights}</span>
                {totalHotels > 0 && <span className="text-text-secondary ml-3">Hotels: £{totalHotels}</span>}
                <span className="font-bold text-text-primary ml-3">Total: £{totalFlights + totalHotels}</span>
              </div>
              <button
                onClick={onContinue}
                className="bg-sky-blue text-white font-bold px-6 py-2.5 rounded-lg hover:bg-sky-blue/90 transition-colors"
              >
                Continue to summary
              </button>
            </div>
          )}

          {!allLegsSelected && (
            <p className="text-text-secondary text-xs border-t border-line pt-3">
              Select flights for all {legs.length} legs to continue
            </p>
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onNewSearch}
            className="text-text-secondary text-sm hover:text-text-primary transition-colors"
          >
            Start new search
          </button>
        </div>
      </div>
    </div>
  )
}

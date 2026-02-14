import { useState, useEffect, useCallback } from 'react'
import { cn } from '../lib/utils'
import type { TripScenario, FlightOption, HotelOption } from '../data/business-travel'
import {
  getScenarioByQuery,
  companyContext,
  bookingSteps,
  bookingConfirmation,
  mockDisruption,
} from '../data/business-travel'
import BizSearchInput from '../components/business-travel/BizSearchInput'
import BizThinkingState from '../components/business-travel/BizThinkingState'
import BizOptionCard from '../components/business-travel/BizOptionCard'
import BizSelectionPanel from '../components/business-travel/BizSelectionPanel'
import BizComparisonTable from '../components/business-travel/BizComparisonTable'
import BizTripSummary from '../components/business-travel/BizTripSummary'
import BizApprovalFlow from '../components/business-travel/BizApprovalFlow'
import BizBookingState from '../components/business-travel/BizBookingState'
import BizConfirmedState from '../components/business-travel/BizConfirmedState'
import BizDisruptionAlert from '../components/business-travel/BizDisruptionAlert'
import BizMultiCityTabs from '../components/business-travel/BizMultiCityTabs'

type AppState = 'search' | 'thinking' | 'results' | 'summary' | 'approval' | 'booking' | 'confirmed' | 'disruption' | 'rebooked'

export default function BusinessTravel() {
  const [state, setState] = useState<AppState>('search')
  const [scenario, setScenario] = useState<TripScenario | null>(null)
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null)
  const [selectedHotel, setSelectedHotel] = useState<HotelOption | null>(null)
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [query, setQuery] = useState('')
  // Multi-city state
  const [activeLeg, setActiveLeg] = useState(0)
  const [legSelections, setLegSelections] = useState<Record<string, FlightOption>>({})

  const reset = useCallback(() => {
    setState('search')
    setScenario(null)
    setSelectedFlight(null)
    setSelectedHotel(null)
    setViewMode('cards')
    setQuery('')
    setActiveLeg(0)
    setLegSelections({})
  }, [])

  // ESC to reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') reset()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [reset])

  const handleSearch = (q: string) => {
    setQuery(q)
    const s = getScenarioByQuery(q)
    setScenario(s)
    setState('thinking')
    // Auto-select first hotel
    if (s.hotel) setSelectedHotel(s.hotel)
  }

  const handleThinkingComplete = () => {
    setState('results')
  }

  const handleSelectFlight = (flight: FlightOption) => {
    setSelectedFlight(flight)
  }

  const handleSelectLegFlight = (legId: string, flight: FlightOption) => {
    setLegSelections(prev => ({ ...prev, [legId]: flight }))
  }

  const handleContinueToSummary = () => {
    setState('summary')
  }

  const handleChangeHotel = (hotel: HotelOption) => {
    setSelectedHotel(hotel)
  }

  const handleRequestApproval = () => {
    setState('approval')
  }

  const handleApproved = () => {
    setState('booking')
  }

  const handleBookingComplete = () => {
    setState('confirmed')
  }

  const handleTriggerDisruption = () => {
    setState('disruption')
  }

  const handleRebooked = () => {
    setState('rebooked')
  }

  const handleDismissDisruption = () => {
    setState('confirmed')
  }

  // ============ SEARCH STATE ============
  if (state === 'search') {
    return (
      <BizSearchInput onSearch={handleSearch} />
    )
  }

  // ============ THINKING STATE ============
  if (state === 'thinking' && scenario) {
    return (
      <BizThinkingState
        scenario={scenario}
        query={query}
        onComplete={handleThinkingComplete}
      />
    )
  }

  // ============ RESULTS STATE ============
  if (state === 'results' && scenario) {
    // Multi-city flow
    if (scenario.isMultiCity && scenario.legs) {
      return (
        <BizMultiCityTabs
          scenario={scenario}
          activeLeg={activeLeg}
          onChangeLeg={setActiveLeg}
          legSelections={legSelections}
          onSelectLegFlight={handleSelectLegFlight}
          onContinue={handleContinueToSummary}
          onNewSearch={reset}
        />
      )
    }

    // Single-city results
    return (
      <div className="min-h-screen bg-canvas-contrast">
        {/* Results header */}
        <div className="bg-haiti text-white py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="animate-fade-in-up">
              <p className="text-sky-blue text-sm font-bold uppercase tracking-wide mb-1">
                {companyContext.name} · Business Travel
              </p>
              <h1 className="text-2xl md:text-3xl font-black">
                {scenario.resultsHeader.title}
              </h1>
              <p className="text-white/60 mt-1">
                {scenario.resultsHeader.subtitle}
              </p>
            </div>
            {/* View toggle + new search */}
            <div className="flex items-center gap-3 mt-4 animate-fade-in-up stagger-1">
              <div className="flex bg-white/10 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('cards')}
                  className={cn(
                    'px-3 py-1.5 text-sm font-semibold rounded-md transition-colors',
                    viewMode === 'cards' ? 'bg-white text-haiti' : 'text-white/70 hover:text-white'
                  )}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={cn(
                    'px-3 py-1.5 text-sm font-semibold rounded-md transition-colors',
                    viewMode === 'table' ? 'bg-white text-haiti' : 'text-white/70 hover:text-white'
                  )}
                >
                  Compare
                </button>
              </div>
              <button
                onClick={reset}
                className="text-white/50 text-sm hover:text-white transition-colors ml-auto"
              >
                New search
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {viewMode === 'cards' ? (
            <div className="flex gap-6">
              {/* Flight option cards */}
              <div className="flex-1 min-w-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {scenario.flightOptions.map((option, i) => (
                    <BizOptionCard
                      key={option.id}
                      option={option}
                      selected={selectedFlight?.id === option.id}
                      onSelect={() => handleSelectFlight(option)}
                      index={i}
                    />
                  ))}
                </div>
              </div>

              {/* Selection panel */}
              {selectedFlight && (
                <div className="hidden lg:block w-80 flex-shrink-0">
                  <BizSelectionPanel
                    flight={selectedFlight}
                    hotel={selectedHotel}
                    alternativeHotels={scenario.alternativeHotels}
                    onChangeHotel={handleChangeHotel}
                    onContinue={handleContinueToSummary}
                    isDayTrip={!scenario.hotel}
                  />
                </div>
              )}
            </div>
          ) : (
            <BizComparisonTable
              options={scenario.flightOptions}
              selectedId={selectedFlight?.id}
              onSelect={handleSelectFlight}
            />
          )}

          {/* Mobile continue button */}
          {selectedFlight && (
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-line p-4 z-40">
              <button
                onClick={handleContinueToSummary}
                className="w-full bg-sky-blue text-white font-bold py-3 rounded-lg hover:bg-sky-blue/90 transition-colors"
              >
                Continue with {selectedFlight.label} — {selectedFlight.currency}{selectedFlight.price}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ============ SUMMARY STATE ============
  if (state === 'summary' && scenario) {
    return (
      <BizTripSummary
        scenario={scenario}
        selectedFlight={selectedFlight}
        selectedHotel={selectedHotel}
        legSelections={legSelections}
        onRequestApproval={handleRequestApproval}
        onBack={() => setState('results')}
        onNewSearch={reset}
      />
    )
  }

  // ============ APPROVAL STATE ============
  if (state === 'approval' && scenario) {
    return (
      <BizApprovalFlow
        scenario={scenario}
        selectedFlight={selectedFlight}
        selectedHotel={selectedHotel}
        legSelections={legSelections}
        onApproved={handleApproved}
        onNewSearch={reset}
      />
    )
  }

  // ============ BOOKING STATE ============
  if (state === 'booking') {
    return (
      <BizBookingState
        steps={bookingSteps}
        onComplete={handleBookingComplete}
      />
    )
  }

  // ============ CONFIRMED STATE ============
  if (state === 'confirmed' && scenario) {
    return (
      <BizConfirmedState
        scenario={scenario}
        selectedFlight={selectedFlight}
        selectedHotel={selectedHotel}
        confirmation={bookingConfirmation}
        onDisruption={handleTriggerDisruption}
        onNewSearch={reset}
      />
    )
  }

  // ============ DISRUPTION STATE ============
  if (state === 'disruption' || state === 'rebooked') {
    return (
      <BizDisruptionAlert
        disruption={mockDisruption}
        isRebooked={state === 'rebooked'}
        onRebook={handleRebooked}
        onDismiss={handleDismissDisruption}
        onNewSearch={reset}
      />
    )
  }

  return null
}

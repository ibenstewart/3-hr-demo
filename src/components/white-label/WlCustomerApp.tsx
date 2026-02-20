import { useState, useCallback, useEffect } from 'react'
import type { WlFlight } from '../../data/white-label'
import { useBrandContext } from './WlBrandContext'
import WlLandingPage from './WlLandingPage'
import WlFlightResults from './WlFlightResults'
import WlBookingFlow from './WlBookingFlow'
import WlConfirmation from './WlConfirmation'
import WlMyTrips from './WlMyTrips'

type CustomerState = 'landing' | 'results' | 'booking' | 'confirmed' | 'trips'

interface BookingInfo {
  flight: WlFlight
  ref: string
  passengerName: string
}

export default function WlCustomerApp() {
  const [state, setState] = useState<CustomerState>('landing')
  const [selectedFlight, setSelectedFlight] = useState<WlFlight | null>(null)
  const [bookings, setBookings] = useState<BookingInfo[]>([])
  const [frozenFlights, setFrozenFlights] = useState<Set<string>>(new Set())
  const { brand } = useBrandContext()

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setState('landing')
        setSelectedFlight(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const handleSearch = useCallback(() => {
    setState('results')
  }, [])

  const handleSelectFlight = useCallback((flight: WlFlight) => {
    setSelectedFlight(flight)
    setState('booking')
  }, [])

  const handleConfirmBooking = useCallback(() => {
    if (!selectedFlight) return
    const ref = 'TC-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    setBookings(prev => [...prev, { flight: selectedFlight, ref, passengerName: 'James Mitchell' }])
    setState('confirmed')
  }, [selectedFlight])

  const handleFreeze = useCallback((flightId: string) => {
    setFrozenFlights(prev => new Set(prev).add(flightId))
  }, [])

  const latestBooking = bookings[bookings.length - 1]

  return (
    <div style={{ fontFamily: `'${brand.fontFamily}', sans-serif` }}>
      {/* Customer Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <img src={brand.logo} alt={brand.name} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-bold text-lg" style={{ color: brand.primaryColor }}>{brand.name}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <button onClick={() => setState('landing')} className="hover:underline" style={{ color: brand.primaryColor }}>Search</button>
          <button onClick={() => setState('trips')} className="hover:underline" style={{ color: brand.primaryColor }}>My Trips</button>
          <span className="text-xs text-gray-400">Powered by Skyscanner</span>
        </div>
      </div>

      {frozenFlights.size > 0 && state === 'results' && (
        <div className="px-6 py-2 text-sm text-white flex items-center gap-2" style={{ backgroundColor: brand.accentColor }}>
          <span>{frozenFlights.size} flight{frozenFlights.size > 1 ? 's' : ''} frozen</span>
          <span className="opacity-80">|</span>
          <span>47h 38m remaining</span>
        </div>
      )}

      {/* State machine */}
      {state === 'landing' && <WlLandingPage onSearch={handleSearch} />}
      {state === 'results' && (
        <WlFlightResults
          onSelect={handleSelectFlight}
          onFreeze={handleFreeze}
          frozenFlights={frozenFlights}
        />
      )}
      {state === 'booking' && selectedFlight && (
        <WlBookingFlow flight={selectedFlight} onConfirm={handleConfirmBooking} onBack={() => setState('results')} />
      )}
      {state === 'confirmed' && latestBooking && (
        <WlConfirmation
          booking={latestBooking}
          onViewTrips={() => setState('trips')}
          onSearchMore={() => setState('landing')}
        />
      )}
      {state === 'trips' && (
        <WlMyTrips bookings={bookings} onSearchFlights={() => setState('landing')} />
      )}
    </div>
  )
}

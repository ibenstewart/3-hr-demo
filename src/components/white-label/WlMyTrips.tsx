import { useState } from 'react'
import type { WlFlight } from '../../data/white-label'
import { useBrandContext } from './WlBrandContext'
import { Plane, Calendar, Download, Search } from 'lucide-react'
import { cn } from '../../lib/utils'

interface BookingInfo {
  flight: WlFlight
  ref: string
  passengerName: string
}

interface WlMyTripsProps {
  bookings: BookingInfo[]
  onSearchFlights: () => void
}

const pastTrips = [
  { ref: 'MBT-X7K9P2', destination: 'Paris (CDG)', date: '22 Jan 2026', airline: '🇫🇷 Air France', price: 185 },
  { ref: 'MBT-L3M8N5', destination: 'Barcelona (BCN)', date: '8 Dec 2025', airline: '🇪🇸 Vueling', price: 124 },
]

export default function WlMyTrips({ bookings, onSearchFlights }: WlMyTripsProps) {
  const { brand } = useBrandContext()
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const [toast, setToast] = useState<string | null>(null)

  const handleDownload = (ref: string) => {
    setToast(`Downloading ticket ${ref}...`)
    setTimeout(() => setToast(null), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <h2 className="text-xl font-bold mb-6" style={{ color: brand.primaryColor }}>My Trips</h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {(['upcoming', 'past'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize',
              tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {t} {t === 'upcoming' && bookings.length > 0 && (
              <span className="ml-1 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">{bookings.length}</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'upcoming' && (
        <>
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <Plane className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">No upcoming trips yet</p>
              <button
                onClick={onSearchFlights}
                className="px-6 py-2 text-white font-medium flex items-center gap-2 mx-auto"
                style={{ backgroundColor: brand.primaryColor, borderRadius: `${brand.buttonRadius}px` }}
              >
                <Search className="w-4 h-4" /> Search Flights
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b, i) => (
                <div key={b.ref} className="bg-white rounded-xl border border-gray-200 p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{b.flight.airlineLogo}</span>
                      <div>
                        <p className="font-semibold">{b.flight.departure.airport} → {b.flight.arrival.airport}</p>
                        <p className="text-xs text-gray-500">{b.flight.airline} · {b.flight.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" />15 Mar 2026</p>
                        <p className="font-mono text-xs text-gray-400 mt-0.5">{b.ref}</p>
                      </div>
                      <button
                        onClick={() => handleDownload(b.ref)}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        title="Download ticket"
                      >
                        <Download className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'past' && (
        <div className="space-y-3">
          {pastTrips.map((trip, i) => (
            <div key={trip.ref} className="bg-white rounded-xl border border-gray-200 p-4 opacity-75 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{trip.airline.split(' ')[0]}</span>
                  <div>
                    <p className="font-semibold">London → {trip.destination}</p>
                    <p className="text-xs text-gray-500">{trip.airline.split(' ').slice(1).join(' ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{trip.date}</p>
                  <p className="font-mono text-xs text-gray-400">{trip.ref}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl animate-fade-in-up">
          {toast}
        </div>
      )}
    </div>
  )
}

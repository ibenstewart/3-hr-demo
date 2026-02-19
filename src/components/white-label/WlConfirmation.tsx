import { CheckCircle, Plane, Mail } from 'lucide-react'
import { useBrandContext } from './WlBrandContext'
import type { WlFlight } from '../../data/white-label'

interface BookingInfo {
  flight: WlFlight
  ref: string
  passengerName: string
}

interface WlConfirmationProps {
  booking: BookingInfo
  onViewTrips: () => void
  onSearchMore: () => void
}

export default function WlConfirmation({ booking, onViewTrips, onSearchMore }: WlConfirmationProps) {
  const { brand } = useBrandContext()

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 text-center">
      <div className="animate-fade-in-up">
        <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#0f9b8e' }} />
        <h2 className="text-2xl font-bold mb-2" style={{ color: brand.primaryColor }}>Booking Confirmed</h2>
        <p className="text-gray-500 mb-8">Your flight has been booked successfully</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-left animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Booking Reference</p>
            <p className="text-xl font-bold font-mono" style={{ color: brand.primaryColor }}>{booking.ref}</p>
          </div>
          <img src={brand.logo} alt={brand.name} className="w-10 h-10 rounded-full object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Passenger</p>
            <p className="font-medium">{booking.passengerName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Flight</p>
            <p className="font-medium flex items-center gap-1">
              <span className="text-lg">{booking.flight.airlineLogo}</span>
              {booking.flight.airline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
          <div className="text-center">
            <p className="font-bold text-lg">{booking.flight.departure.time}</p>
            <p className="text-xs text-gray-500">{booking.flight.departure.airport}</p>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-300" />
            <Plane className="w-4 h-4 text-gray-400" />
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="text-center">
            <p className="font-bold text-lg">{booking.flight.arrival.time}</p>
            <p className="text-xs text-gray-500">{booking.flight.arrival.airport}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold" style={{ color: brand.primaryColor }}>£{booking.flight.price}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <Mail className="w-4 h-4" />
        Confirmation sent to j.mitchell@meridianbank.co.uk
      </div>

      <div className="flex gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <button
          onClick={onViewTrips}
          className="px-6 py-2 text-white font-medium"
          style={{ backgroundColor: brand.primaryColor, borderRadius: `${brand.buttonRadius}px` }}
        >
          View My Trips
        </button>
        <button
          onClick={onSearchMore}
          className="px-6 py-2 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Search More Flights
        </button>
      </div>
    </div>
  )
}

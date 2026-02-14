import { Check, Calendar, Mail, AlertTriangle, Compass } from 'lucide-react'
import { Link } from 'react-router'
import type { TripScenario, FlightOption, HotelOption } from '../../data/business-travel'

interface BizConfirmedStateProps {
  scenario: TripScenario
  selectedFlight: FlightOption | null
  selectedHotel: HotelOption | null
  confirmation: { reference: string; email: string; calendarAdded: boolean }
  onDisruption: () => void
  onNewSearch: () => void
}

export default function BizConfirmedState({
  scenario,
  selectedFlight,
  selectedHotel,
  confirmation,
  onDisruption,
  onNewSearch,
}: BizConfirmedStateProps) {
  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Success header */}
      <div className="bg-haiti text-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-eco rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black mb-2">Trip booked!</h1>
          <p className="text-white/60">
            Confirmation #{confirmation.reference} sent to {confirmation.email}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        {/* Itinerary */}
        <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up">
          <h3 className="font-bold text-text-primary mb-4">Your Itinerary</h3>
          <div className="space-y-3 text-sm">
            {selectedFlight && (
              <>
                <div className="flex items-center justify-between py-2 border-b border-line/50">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{selectedFlight.outbound.airlineLogo}</span>
                    <div>
                      <p className="font-semibold text-text-primary">
                        {selectedFlight.outbound.departure.code} → {selectedFlight.outbound.arrival.code}
                      </p>
                      <p className="text-text-secondary text-xs">{selectedFlight.outbound.departure.date} · {selectedFlight.outbound.departure.time}</p>
                    </div>
                  </div>
                  <span className="text-text-secondary text-xs">{selectedFlight.outbound.airline} {selectedFlight.outbound.flightNumber}</span>
                </div>
                {selectedFlight.inbound.airline && (
                  <div className="flex items-center justify-between py-2 border-b border-line/50">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{selectedFlight.inbound.airlineLogo}</span>
                      <div>
                        <p className="font-semibold text-text-primary">
                          {selectedFlight.inbound.departure.code} → {selectedFlight.inbound.arrival.code}
                        </p>
                        <p className="text-text-secondary text-xs">{selectedFlight.inbound.departure.date} · {selectedFlight.inbound.departure.time}</p>
                      </div>
                    </div>
                    <span className="text-text-secondary text-xs">{selectedFlight.inbound.airline} {selectedFlight.inbound.flightNumber}</span>
                  </div>
                )}
              </>
            )}
            {selectedHotel && (
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-semibold text-text-primary">{selectedHotel.name}</p>
                  <p className="text-text-secondary text-xs">{selectedHotel.checkIn} → {selectedHotel.checkOut} · {selectedHotel.nights} nights</p>
                </div>
                <span className="font-bold text-text-primary">{selectedHotel.currency}{selectedHotel.totalPrice}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up stagger-1">
          <div className="flex items-center gap-3 text-sm text-text-secondary mb-3">
            {confirmation.calendarAdded && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-eco" />
                <span>Added to calendar</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-sky-blue" />
              <span>Confirmation emailed</span>
            </div>
          </div>
        </div>

        {/* Cross-demo link */}
        <Link
          to="/companion"
          className="block bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 animate-fade-in-up stagger-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-coral rounded-xl flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-text-primary">Heading to {scenario.parsedIntent.destination}?</p>
              <p className="text-text-secondary text-xs">See what your In-Trip Companion looks like →</p>
            </div>
          </div>
        </Link>

        {/* Disruption demo trigger */}
        <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up stagger-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-text-primary text-sm">Demo: Flight disruption</p>
              <p className="text-text-secondary text-xs">See how the agent handles a delay to your return flight</p>
            </div>
            <button
              onClick={onDisruption}
              className="bg-warning-fill text-warning px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-warning-fill/80 transition-colors flex-shrink-0"
            >
              Simulate disruption
            </button>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onNewSearch}
            className="text-sky-blue text-sm font-semibold hover:underline"
          >
            Book another trip
          </button>
        </div>
      </div>
    </div>
  )
}

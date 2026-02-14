import { Plane, Building2, ArrowRight, ArrowLeft, Calendar, AlertCircle } from 'lucide-react'
import type { TripScenario, FlightOption, HotelOption } from '../../data/business-travel'
import { companyContext } from '../../data/business-travel'

interface BizTripSummaryProps {
  scenario: TripScenario
  selectedFlight: FlightOption | null
  selectedHotel: HotelOption | null
  legSelections: Record<string, FlightOption>
  onRequestApproval: () => void
  onBack: () => void
  onNewSearch: () => void
}

export default function BizTripSummary({
  scenario,
  selectedFlight,
  selectedHotel,
  legSelections,
  onRequestApproval,
  onBack,
  onNewSearch,
}: BizTripSummaryProps) {
  const isMultiCity = scenario.isMultiCity && scenario.legs

  // Calculate total for multi-city
  const multiCityFlightTotal = isMultiCity
    ? Object.values(legSelections).reduce((sum, f) => sum + f.price, 0)
    : 0
  const multiCityHotelTotal = isMultiCity && scenario.legs
    ? scenario.legs.reduce((sum, leg) => sum + (leg.hotel?.totalPrice || 0), 0)
    : 0

  const flightTotal = isMultiCity ? multiCityFlightTotal : (selectedFlight?.price || 0)
  const hotelTotal = isMultiCity ? multiCityHotelTotal : (selectedHotel?.totalPrice || 0)
  const grandTotal = flightTotal + hotelTotal

  return (
    <div className="min-h-screen bg-canvas-contrast">
      <div className="bg-haiti text-white py-8 px-6">
        <div className="max-w-3xl mx-auto animate-fade-in-up">
          <p className="text-sky-blue text-sm font-bold uppercase tracking-wide mb-1">Trip Summary</p>
          <h1 className="text-2xl md:text-3xl font-black">Review before requesting approval</h1>
          <p className="text-white/50 mt-1">
            {companyContext.approver.name} ({companyContext.approver.title}) will receive a Slack notification
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        {/* Multi-city legs */}
        {isMultiCity && scenario.legs ? (
          scenario.legs.map((leg) => {
            const legFlight = legSelections[leg.id]
            return (
              <div key={leg.id} className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up">
                <h3 className="font-bold text-text-primary mb-3">{leg.label}</h3>
                {legFlight ? (
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-lg">{legFlight.outbound.airlineLogo}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary">
                        {legFlight.outbound.airline} {legFlight.outbound.flightNumber}
                      </p>
                      <p className="text-text-secondary text-xs">
                        {legFlight.outbound.departure.time} {legFlight.outbound.departure.code} → {legFlight.outbound.arrival.time} {legFlight.outbound.arrival.code}
                      </p>
                    </div>
                    <span className="font-bold">{legFlight.currency}{legFlight.price}</span>
                  </div>
                ) : (
                  <p className="text-text-secondary text-sm">No flight selected</p>
                )}
                {leg.hotel && (
                  <div className="mt-3 pt-3 border-t border-line flex items-center gap-4 text-sm">
                    <Building2 className="w-5 h-5 text-text-secondary" />
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary">{leg.hotel.name}</p>
                      <p className="text-text-secondary text-xs">{leg.hotel.nights} night · {leg.hotel.location}</p>
                    </div>
                    <span className="font-bold">{leg.hotel.currency}{leg.hotel.totalPrice}</span>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <>
            {/* Single-city flight */}
            {selectedFlight && (
              <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up">
                <div className="flex items-center gap-2 mb-4">
                  <Plane className="w-5 h-5 text-sky-blue" />
                  <h3 className="font-bold text-text-primary">Flights</h3>
                  <span className="ml-auto font-bold text-text-primary">{selectedFlight.currency}{selectedFlight.price}</span>
                </div>
                {/* Outbound */}
                <div className="bg-canvas-contrast rounded-lg p-4 mb-2">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-xl">{selectedFlight.outbound.airlineLogo}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary">{selectedFlight.outbound.airline} {selectedFlight.outbound.flightNumber}</p>
                      <p className="text-text-secondary text-xs">{selectedFlight.outbound.departure.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="text-right">
                        <p className="font-semibold">{selectedFlight.outbound.departure.time}</p>
                        <p className="text-text-secondary text-xs">{selectedFlight.outbound.departure.code}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-secondary" />
                      <div>
                        <p className="font-semibold">{selectedFlight.outbound.arrival.time}</p>
                        <p className="text-text-secondary text-xs">{selectedFlight.outbound.arrival.code}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Inbound */}
                {selectedFlight.inbound.airline && (
                  <div className="bg-canvas-contrast rounded-lg p-4">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-xl">{selectedFlight.inbound.airlineLogo}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-text-primary">{selectedFlight.inbound.airline} {selectedFlight.inbound.flightNumber}</p>
                        <p className="text-text-secondary text-xs">{selectedFlight.inbound.departure.date}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="text-right">
                          <p className="font-semibold">{selectedFlight.inbound.departure.time}</p>
                          <p className="text-text-secondary text-xs">{selectedFlight.inbound.departure.code}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-text-secondary" />
                        <div>
                          <p className="font-semibold">{selectedFlight.inbound.arrival.time}</p>
                          <p className="text-text-secondary text-xs">{selectedFlight.inbound.arrival.code}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hotel */}
            {selectedHotel && (
              <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up stagger-1">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-sky-blue" />
                  <h3 className="font-bold text-text-primary">Hotel</h3>
                  <span className="ml-auto font-bold text-text-primary">{selectedHotel.currency}{selectedHotel.totalPrice}</span>
                </div>
                <div className="bg-canvas-contrast rounded-lg p-4">
                  <p className="font-semibold text-text-primary">{selectedHotel.name}</p>
                  <p className="text-text-secondary text-xs mt-0.5">{selectedHotel.location} · {selectedHotel.distanceFromOffice}</p>
                  <p className="text-text-secondary text-xs mt-0.5">
                    {selectedHotel.checkIn} → {selectedHotel.checkOut} · {selectedHotel.nights} nights
                  </p>
                  <p className="text-text-secondary text-xs mt-0.5">
                    {selectedHotel.currency}{selectedHotel.pricePerNight}/night
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Calendar conflicts */}
        {scenario.calendarContext.conflicts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up stagger-2">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-warning" />
              <h3 className="font-bold text-text-primary">Calendar Conflicts</h3>
            </div>
            <div className="space-y-2">
              {scenario.calendarContext.conflicts.map((conflict, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-text-primary">{conflict.event}</p>
                    <p className="text-text-secondary text-xs">{conflict.conflictReason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total + Actions */}
        <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up stagger-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-secondary">Total trip cost</span>
            <span className="text-2xl font-black text-text-primary">£{grandTotal}</span>
          </div>
          <div className="flex items-center gap-2 mb-4 text-xs text-text-secondary">
            <AlertCircle className="w-4 h-4" />
            Requires approval from {companyContext.approver.name} ({companyContext.approver.title})
          </div>
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1 px-4 py-3 bg-canvas-contrast text-text-primary font-bold rounded-lg hover:bg-surface-highlight transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={onRequestApproval}
              className="flex-1 bg-sky-blue text-white font-bold py-3 rounded-lg hover:bg-sky-blue/90 transition-colors"
            >
              Request approval via Slack
            </button>
          </div>
          <button
            onClick={onNewSearch}
            className="w-full mt-2 text-text-secondary text-sm hover:text-text-primary transition-colors py-2"
          >
            Start new search
          </button>
        </div>
      </div>
    </div>
  )
}

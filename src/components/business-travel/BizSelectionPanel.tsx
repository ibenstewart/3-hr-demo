import { useState } from 'react'
import { Plane, Building2, ChevronDown, ChevronUp, Star, Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { FlightOption, HotelOption } from '../../data/business-travel'

interface BizSelectionPanelProps {
  flight: FlightOption
  hotel: HotelOption | null
  alternativeHotels: HotelOption[]
  onChangeHotel: (hotel: HotelOption) => void
  onContinue: () => void
  isDayTrip: boolean
}

export default function BizSelectionPanel({
  flight,
  hotel,
  alternativeHotels,
  onChangeHotel,
  onContinue,
  isDayTrip,
}: BizSelectionPanelProps) {
  const [showAlternatives, setShowAlternatives] = useState(false)

  const totalCost = flight.price + (hotel?.totalPrice || 0)

  return (
    <div className="sticky top-24 space-y-4 animate-fade-in-up">
      {/* Selected flight */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Plane className="w-4 h-4 text-sky-blue" />
          <span className="text-sm font-bold text-text-primary">Selected Flight</span>
        </div>
        <div className="bg-canvas-contrast rounded-lg p-3 text-sm">
          <p className="font-semibold text-text-primary">{flight.label}</p>
          <p className="text-text-secondary text-xs mt-0.5">
            {flight.outbound.airline} · {flight.outbound.flightNumber}
          </p>
          <p className="text-text-secondary text-xs">
            {flight.outbound.departure.time} → {flight.outbound.arrival.time}
          </p>
          {flight.inbound.airline && (
            <p className="text-text-secondary text-xs mt-1">
              Return: {flight.inbound.departure.time} → {flight.inbound.arrival.time}
            </p>
          )}
          <p className="font-bold text-text-primary mt-2">{flight.currency}{flight.price}</p>
        </div>
      </div>

      {/* Hotel selection */}
      {!isDayTrip && hotel && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-sky-blue" />
            <span className="text-sm font-bold text-text-primary">Hotel</span>
          </div>
          <div className="bg-canvas-contrast rounded-lg p-3 text-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-text-primary">{hotel.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-star fill-star" />
                  ))}
                </div>
                <p className="text-text-secondary text-xs mt-1">{hotel.location}</p>
                <p className="text-text-secondary text-xs">{hotel.distanceFromOffice}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-text-secondary text-xs">{hotel.nights} nights × {hotel.currency}{hotel.pricePerNight}</span>
              <span className="font-bold text-text-primary">{hotel.currency}{hotel.totalPrice}</span>
            </div>
            {hotel.reasoning.slice(0, 2).map((r, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-text-secondary mt-1">
                <Check className="w-3 h-3 text-eco flex-shrink-0 mt-0.5" />
                <span>{r}</span>
              </div>
            ))}
          </div>

          {/* Alternatives toggle */}
          {alternativeHotels.length > 0 && (
            <>
              <button
                onClick={() => setShowAlternatives(!showAlternatives)}
                className="flex items-center gap-1 text-sky-blue text-xs font-semibold mt-3 hover:underline"
              >
                {showAlternatives ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {showAlternatives ? 'Hide' : 'Show'} {alternativeHotels.length} other options
              </button>

              {showAlternatives && (
                <div className="mt-2 space-y-2 animate-fade-in">
                  {alternativeHotels.map((alt) => (
                    <button
                      key={alt.id}
                      onClick={() => { onChangeHotel(alt); setShowAlternatives(false) }}
                      className={cn(
                        'w-full text-left bg-canvas-contrast rounded-lg p-3 text-sm hover:bg-surface-highlight transition-colors',
                        hotel.id === alt.id && 'ring-1 ring-sky-blue'
                      )}
                    >
                      <p className="font-semibold text-text-primary text-xs">{alt.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: alt.stars }).map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-star fill-star" />
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-text-secondary text-xs">{alt.distanceFromOffice}</span>
                        <span className="font-bold text-text-primary text-xs">{alt.currency}{alt.totalPrice}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Total + Continue */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-text-secondary text-sm">Total estimated</span>
          <span className="text-xl font-black text-text-primary">
            {flight.currency}{totalCost}
          </span>
        </div>
        <button
          onClick={onContinue}
          className="w-full bg-sky-blue text-white font-bold py-3 rounded-lg hover:bg-sky-blue/90 transition-colors"
        >
          Continue to summary
        </button>
      </div>
    </div>
  )
}

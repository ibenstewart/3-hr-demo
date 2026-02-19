import { useState, useEffect } from 'react'
import type { WlFlight } from '../../data/white-label'
import { useBrandContext } from './WlBrandContext'
import { ArrowLeft, Clock, Luggage, Shield } from 'lucide-react'

interface WlBookingFlowProps {
  flight: WlFlight
  onConfirm: () => void
  onBack: () => void
}

export default function WlBookingFlow({ flight, onConfirm, onBack }: WlBookingFlowProps) {
  const { brand } = useBrandContext()
  const [confirming, setConfirming] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!confirming) return
    if (step >= 3) {
      onConfirm()
      return
    }
    const timer = setTimeout(() => setStep(s => s + 1), 600)
    return () => clearTimeout(timer)
  }, [confirming, step, onConfirm])

  const handleSubmit = () => {
    setConfirming(true)
    setStep(0)
  }

  if (confirming) {
    const steps = ['Verifying details...', 'Securing your fare...', 'Confirming booking...']
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-12 h-12 mx-auto mb-6 rounded-full animate-pulse" style={{ backgroundColor: brand.primaryColor + '30' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: brand.primaryColor }}>
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="font-semibold text-lg mb-2" style={{ color: brand.primaryColor }}>
          {steps[Math.min(step, steps.length - 1)]}
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ backgroundColor: i <= step ? brand.primaryColor : '#e5e7eb' }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to results
      </button>

      {/* Flight Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{flight.airlineLogo}</span>
            <div>
              <p className="font-semibold">{flight.airline}</p>
              <p className="text-sm text-gray-500">{flight.departure.airport} → {flight.arrival.airport}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{flight.duration}</span>
            <span className="flex items-center gap-1"><Luggage className="w-4 h-4" />{flight.baggage.checked}</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: brand.primaryColor }}>£{flight.price}</p>
            <div
              className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-1"
              style={{ backgroundColor: flight.score >= 80 ? '#0f9b8e20' : '#e39d2520', color: flight.score >= 80 ? '#0f9b8e' : '#e39d25' }}
            >
              Score: {flight.score}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Passenger Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold mb-4" style={{ color: brand.primaryColor }}>Passenger Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Full Name</label>
              <input type="text" defaultValue="James Mitchell" className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Email</label>
              <input type="email" defaultValue="j.mitchell@meridianbank.co.uk" className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Phone</label>
              <input type="tel" defaultValue="+44 7700 900123" className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-bold mb-4" style={{ color: brand.primaryColor }}>Payment</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Card Number</label>
              <input type="text" defaultValue="•••• •••• •••• 4242" className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Expiry</label>
                <input type="text" defaultValue="09/28" className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">CVV</label>
                <input type="text" defaultValue="•••" className="w-full border rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Secured with 256-bit encryption
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full mt-6 text-white font-semibold py-3 transition-transform hover:scale-[1.01]"
        style={{ backgroundColor: brand.primaryColor, borderRadius: `${brand.buttonRadius}px` }}
      >
        Confirm Booking · £{flight.price}
      </button>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Clock, Check, MessageSquare } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { TripScenario, FlightOption, HotelOption } from '../../data/business-travel'
import { companyContext } from '../../data/business-travel'

interface BizApprovalFlowProps {
  scenario: TripScenario
  selectedFlight: FlightOption | null
  selectedHotel: HotelOption | null
  legSelections: Record<string, FlightOption>
  onApproved: () => void
  onNewSearch: () => void
}

export default function BizApprovalFlow({
  scenario,
  selectedFlight,
  selectedHotel,
  legSelections,
  onApproved,
  onNewSearch,
}: BizApprovalFlowProps) {
  const [slackSent, setSlackSent] = useState(false)
  const [approved, setApproved] = useState(false)

  const isMultiCity = scenario.isMultiCity && scenario.legs
  const flightTotal = isMultiCity
    ? Object.values(legSelections).reduce((sum, f) => sum + f.price, 0)
    : (selectedFlight?.price || 0)
  const hotelTotal = isMultiCity && scenario.legs
    ? scenario.legs.reduce((sum, leg) => sum + (leg.hotel?.totalPrice || 0), 0)
    : (selectedHotel?.totalPrice || 0)
  const grandTotal = flightTotal + hotelTotal

  useEffect(() => {
    const t = setTimeout(() => setSlackSent(true), 1000)
    return () => clearTimeout(t)
  }, [])

  const handleApprove = () => {
    setApproved(true)
    setTimeout(onApproved, 1500)
  }

  return (
    <div className="min-h-screen bg-canvas-contrast">
      <div className="bg-haiti text-white py-8 px-6">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <p className="text-sky-blue text-sm font-bold uppercase tracking-wide mb-1">Awaiting Approval</p>
          <h1 className="text-2xl md:text-3xl font-black">Approval request sent</h1>
          <p className="text-white/50 mt-1">
            {companyContext.approver.name} has been notified via Slack
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traveler view */}
          <div className="bg-white rounded-xl shadow-sm p-5 animate-fade-in-up">
            <h3 className="font-bold text-text-primary mb-4">Your Request</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-line/50">
                <span className="text-text-secondary">Route</span>
                <span className="font-semibold text-text-primary">
                  {scenario.parsedIntent.origin} → {scenario.parsedIntent.destination}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-line/50">
                <span className="text-text-secondary">Dates</span>
                <span className="font-semibold text-text-primary">{scenario.parsedIntent.outboundDate}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-line/50">
                <span className="text-text-secondary">Purpose</span>
                <span className="font-semibold text-text-primary">{scenario.parsedIntent.tripPurpose}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-line/50">
                <span className="text-text-secondary">Flights</span>
                <span className="font-semibold text-text-primary">£{flightTotal}</span>
              </div>
              {hotelTotal > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-line/50">
                  <span className="text-text-secondary">Hotel</span>
                  <span className="font-semibold text-text-primary">£{hotelTotal}</span>
                </div>
              )}
              <div className="flex items-center justify-between py-2">
                <span className="font-bold text-text-primary">Total</span>
                <span className="font-black text-lg text-text-primary">£{grandTotal}</span>
              </div>
            </div>

            {/* Status */}
            <div className={cn(
              'mt-4 flex items-center gap-2 rounded-lg p-3 text-sm font-semibold',
              approved ? 'bg-success-fill text-success' : 'bg-warning-fill text-warning'
            )}>
              {approved ? (
                <><Check className="w-4 h-4" /> Approved by {companyContext.approver.name}</>
              ) : (
                <><Clock className="w-4 h-4" /> Waiting for approval...</>
              )}
            </div>
          </div>

          {/* Slack preview */}
          <div className="animate-fade-in-up stagger-1">
            <div className="bg-[#1a1d21] rounded-xl overflow-hidden shadow-sm">
              {/* Slack header */}
              <div className="bg-[#1a1d21] border-b border-white/10 px-4 py-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-white/60" />
                <span className="text-white/80 text-sm font-semibold">#travel-approvals</span>
              </div>

              <div className="p-4">
                {/* Bot message */}
                <div className={cn(
                  'transition-opacity duration-500',
                  slackSent ? 'opacity-100' : 'opacity-0'
                )}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-sm">travel.ai</span>
                        <span className="bg-[#4a154b]/30 text-[#e8b4e8] text-xs px-1.5 py-0.5 rounded font-medium">APP</span>
                        <span className="text-white/30 text-xs">just now</span>
                      </div>

                      {/* Message card */}
                      <div className="mt-2 border-l-4 border-sky-blue bg-[#222529] rounded-r-lg p-3 text-sm">
                        <p className="text-white font-semibold mb-2">
                          New travel request from Ben Stewart
                        </p>
                        <div className="space-y-1 text-white/70 text-xs">
                          <p><strong className="text-white/90">Route:</strong> {scenario.parsedIntent.origin} → {scenario.parsedIntent.destination}</p>
                          <p><strong className="text-white/90">Dates:</strong> {scenario.parsedIntent.outboundDate}</p>
                          <p><strong className="text-white/90">Purpose:</strong> {scenario.parsedIntent.tripPurpose}</p>
                          <p><strong className="text-white/90">Total:</strong> £{grandTotal}</p>
                          <p><strong className="text-white/90">Policy:</strong> <span className="text-[#2eb67d]">Within budget</span></p>
                        </div>

                        {/* Approve/Reject buttons */}
                        <div className="flex gap-2 mt-3">
                          {approved ? (
                            <div className="bg-[#2eb67d] text-white px-4 py-1.5 rounded text-sm font-semibold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Approved
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={handleApprove}
                                className="bg-[#2eb67d] text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-[#2eb67d]/80 transition-colors"
                              >
                                Approve
                              </button>
                              <button className="bg-[#e01e5a] text-white px-4 py-1.5 rounded text-sm font-semibold opacity-50 cursor-not-allowed">
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Approval message */}
                  {approved && (
                    <div className="flex items-start gap-3 mt-4 animate-fade-in">
                      <div className="w-9 h-9 bg-berry rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{companyContext.approver.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold text-sm">{companyContext.approver.name}</span>
                          <span className="text-white/30 text-xs">just now</span>
                        </div>
                        <p className="text-white/70 text-sm mt-1">Approved! Have a good trip.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-text-secondary text-xs text-center mt-3">
              Simulated Slack preview — click "Approve" to continue
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
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

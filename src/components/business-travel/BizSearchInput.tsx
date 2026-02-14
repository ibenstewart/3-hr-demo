import { useState } from 'react'
import { Search, Briefcase, Plane, Clock, TrendingDown } from 'lucide-react'
import { exampleQueries, recentTrips, suggestedDeals, companyContext } from '../../data/business-travel'

interface BizSearchInputProps {
  onSearch: (query: string) => void
}

export default function BizSearchInput({ onSearch }: BizSearchInputProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (q?: string) => {
    const finalQuery = q || query
    if (!finalQuery.trim()) return
    onSearch(finalQuery)
  }

  return (
    <div className="min-h-screen bg-haiti">
      {/* Hero search */}
      <div className="flex flex-col items-center justify-center px-6 pt-20 pb-12">
        <div className="max-w-2xl w-full text-center">
          <div className="flex items-center justify-center gap-2 mb-4 animate-fade-in-up">
            <Briefcase className="w-8 h-8 text-sky-blue" />
            <span className="text-white/40 text-sm font-medium">
              {companyContext.name}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 animate-fade-in-up stagger-1">
            Where are you heading?
          </h1>
          <p className="text-white/50 mb-8 animate-fade-in-up stagger-2">
            Tell me your trip in plain English — I'll handle flights, hotels, and approval.
          </p>

          {/* Search input */}
          <div className="relative animate-fade-in-up stagger-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Berlin next Tuesday, back Thursday evening..."
              className="w-full px-6 py-4 pr-14 rounded-2xl text-lg bg-white text-text-primary placeholder:text-text-secondary/50 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-blue"
            />
            <button
              onClick={() => handleSubmit()}
              disabled={!query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-blue rounded-xl flex items-center justify-center hover:bg-sky-blue/90 transition-colors disabled:opacity-40"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Example queries */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in-up stagger-4">
            {exampleQueries.map((eq) => (
              <button
                key={eq.short}
                onClick={() => { setQuery(eq.full); handleSubmit(eq.full) }}
                className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                {eq.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard section */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent trips */}
          <div className="bg-white/5 rounded-xl p-5 animate-fade-in-up stagger-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-white/40" />
              <h3 className="text-white/60 text-sm font-semibold">Recent Trips</h3>
            </div>
            <div className="space-y-3">
              {recentTrips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => {
                    const q = `${trip.destination} next week`
                    setQuery(q)
                    handleSubmit(q)
                  }}
                  className="w-full flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sky-blue/20 rounded-lg flex items-center justify-center">
                      <Plane className="w-4 h-4 text-sky-blue" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{trip.destination}</p>
                      <p className="text-white/40 text-xs">{trip.dates} · {trip.flightAirline}</p>
                    </div>
                  </div>
                  <span className="text-white/60 text-sm font-medium">{trip.currency}{trip.totalCost}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested deals */}
          <div className="bg-white/5 rounded-xl p-5 animate-fade-in-up stagger-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-4 h-4 text-eco" />
              <h3 className="text-white/60 text-sm font-semibold">Suggested Deals</h3>
            </div>
            <div className="space-y-3">
              {suggestedDeals.map((deal) => (
                <button
                  key={deal.id}
                  onClick={() => {
                    const q = `${deal.destination} next week`
                    setQuery(q)
                    handleSubmit(q)
                  }}
                  className="w-full flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors text-left"
                >
                  <div>
                    <p className="text-white text-sm font-semibold">{deal.destination}</p>
                    <p className="text-white/40 text-xs">{deal.tagline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-eco text-sm font-bold">from {deal.currency}{deal.priceFrom}</p>
                    <p className="text-white/30 text-xs">{deal.validUntil}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

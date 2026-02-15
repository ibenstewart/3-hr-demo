import { useState, useEffect } from 'react'
import { MapPin, Edit3, Check, X, Plane, Hotel, Sparkles, Search, Zap } from 'lucide-react'
import { cn } from '../lib/utils'
import {
  itinerary as mockItinerary,
  tripSummary as mockTripSummary,
  promptSuggestions,
} from '../data/japan-itinerary'
import type { ItineraryDay, TripSummary } from '../data/japan-itinerary'

type ViewState = 'landing' | 'loading' | 'results'

const loadingSteps = [
  'Understanding your trip...',
  'Finding the best destinations...',
  'Planning day by day...',
  'Estimating costs...',
  'Adding local recommendations...',
]

export default function TripPlanner() {
  const [view, setView] = useState<ViewState>('landing')
  const [query, setQuery] = useState('')
  const [activeDay, setActiveDay] = useState(1)
  const [editingDay, setEditingDay] = useState<number | null>(null)
  const [editedDays, setEditedDays] = useState<Set<number>>(new Set())
  const [editText, setEditText] = useState('')

  // Live AI state
  const [isLiveAI, setIsLiveAI] = useState(false)
  const [liveItinerary, setLiveItinerary] = useState<ItineraryDay[] | null>(null)
  const [liveSummary, setLiveSummary] = useState<TripSummary | null>(null)
  const [loadingStep, setLoadingStep] = useState(0)
  const [aiError, setAiError] = useState<string | null>(null)

  // Active data — mock or live
  const itinerary = isLiveAI && liveItinerary ? liveItinerary : mockItinerary
  const summary = isLiveAI && liveSummary ? liveSummary : mockTripSummary

  // Loading step animation (cosmetic, runs while API call happens)
  useEffect(() => {
    if (view !== 'loading') return
    if (loadingStep >= loadingSteps.length - 1) return
    const timer = setTimeout(() => {
      setLoadingStep(s => s + 1)
    }, 1500)
    return () => clearTimeout(timer)
  }, [view, loadingStep])

  const handleSearch = async (q?: string) => {
    const searchQuery = q || query.trim()
    if (!searchQuery) {
      const fallback = promptSuggestions[0]
      setQuery(fallback)
      setIsLiveAI(false)
      setView('loading')
      setTimeout(() => setView('results'), 1800)
      return
    }
    if (q) setQuery(q)

    // Check if it's a suggestion (mock path) or custom query (live AI path)
    const isSuggestion = promptSuggestions.includes(searchQuery)

    if (isSuggestion) {
      setIsLiveAI(false)
      setView('loading')
      setTimeout(() => setView('results'), 1800)
      return
    }

    // Live AI path
    setIsLiveAI(true)
    setAiError(null)
    setLoadingStep(0)
    setView('loading')
    setActiveDay(1)

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(err.error || `HTTP ${response.status}`)
      }

      // Read streamed text response, accumulate until complete
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let fullText = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value, { stream: true })
      }

      // Strip markdown fences if present
      let jsonText = fullText.trim()
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
      }

      const data = JSON.parse(jsonText)

      // Add Unsplash images for each day's city
      const enrichedItinerary: ItineraryDay[] = data.itinerary.map((day: ItineraryDay) => ({
        ...day,
        mapImage: day.mapImage || `https://source.unsplash.com/800x400/?${encodeURIComponent(day.city + ' city skyline')}`,
      }))

      setLiveItinerary(enrichedItinerary)
      setLiveSummary(data.summary)
      setView('results')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setAiError(message)
    }
  }

  const handleFallbackToMock = () => {
    setIsLiveAI(false)
    setAiError(null)
    setQuery(promptSuggestions[0])
    setView('loading')
    setTimeout(() => setView('results'), 1800)
  }

  const handleEdit = (day: number) => {
    setEditingDay(day)
    setEditText('')
  }

  const submitEdit = (day: number) => {
    if (!editText.trim()) return
    setEditingDay(null)
    setTimeout(() => {
      setEditedDays(prev => new Set(prev).add(day))
    }, 1000)
  }

  const currentDay = itinerary.find(d => d.day === activeDay)

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-haiti flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <Sparkles className="w-10 h-10 text-sky-blue mx-auto mb-4 animate-fade-in-up" />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 animate-fade-in-up stagger-1">
            Where do you want to go?
          </h1>
          <p className="text-white/60 mb-8 animate-fade-in-up stagger-2">
            Tell me about your dream trip and I'll plan the perfect itinerary.
          </p>
          <div className="relative animate-fade-in-up stagger-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="10 days in Japan in April, budget £4,000..."
              className="w-full px-6 py-4 pr-14 rounded-2xl text-lg bg-white text-text-primary placeholder:text-text-secondary/50 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-blue"
            />
            <button
              onClick={() => handleSearch()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-sky-blue rounded-xl flex items-center justify-center hover:bg-sky-blue/90 transition-colors disabled:opacity-40"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-6 animate-fade-in-up stagger-4">
            {promptSuggestions.map((prompt) => (
              <button
                key={prompt}
                onClick={() => { setQuery(prompt); handleSearch(prompt) }}
                className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-6 animate-fade-in-up stagger-5">
            <Zap className="w-3 h-3 inline mr-1" />
            Type your own trip for a live AI-generated itinerary
          </p>
        </div>
      </div>
    )
  }

  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-haiti flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Sparkles className="w-12 h-12 text-sky-blue mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Planning your trip...</h2>
          <p className="text-white/40 text-sm mb-8">{query}</p>

          {isLiveAI ? (
            <>
              {/* Step-by-step loading for live AI */}
              <div className="space-y-3 text-left">
                {loadingSteps.map((msg, i) => (
                  <div
                    key={msg}
                    className={cn(
                      'flex items-center gap-3 transition-all duration-300',
                      i <= loadingStep ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300',
                      i < loadingStep ? 'bg-eco' : i === loadingStep ? 'bg-sky-blue animate-pulse' : 'bg-white/10'
                    )}>
                      {i < loadingStep ? (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={cn(
                      'text-sm font-medium transition-colors duration-300',
                      i < loadingStep ? 'text-white/50' : i === loadingStep ? 'text-white' : 'text-white/30'
                    )}>
                      {msg}
                    </span>
                  </div>
                ))}
              </div>

              {isLiveAI && (
                <div className="mt-8 flex items-center justify-center gap-2 text-white/30 text-xs">
                  <Zap className="w-3 h-3" /> Live AI — powered by Claude
                </div>
              )}

              {/* Error state */}
              {aiError && (
                <div className="mt-8 animate-fade-in">
                  <div className="bg-danger-fill border border-danger/20 rounded-xl p-4 text-left mb-4">
                    <p className="text-sm text-danger font-semibold mb-1">Couldn&apos;t generate your trip</p>
                    <p className="text-xs text-text-secondary">{aiError}</p>
                  </div>
                  <button
                    onClick={handleFallbackToMock}
                    className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors"
                  >
                    Load demo itinerary instead
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="streaming-dots text-white/60 text-4xl">
              <span>·</span><span>·</span><span>·</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Summary card */}
      <div className="bg-haiti text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-start justify-between gap-4 animate-fade-in-up">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sky-blue text-sm font-bold uppercase tracking-wide">AI-Generated Itinerary</p>
                {isLiveAI && (
                  <span className="bg-eco/20 text-eco text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Live AI
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-black">{summary.destination}</h1>
              <p className="text-white/60 mt-1">{summary.dates} · {summary.totalDays} days</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {summary.tags.map(tag => (
                  <span key={tag} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-sm backdrop-blur-sm">
              <p className="text-white/60 text-xs mb-2">Estimated total</p>
              <p className="text-3xl font-black">£{summary.totalCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Day sidebar */}
          <div className="hidden md:block w-48 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <button
                onClick={() => setActiveDay(itinerary.length)}
                className="w-full bg-white rounded-lg p-3 shadow-sm mb-3 text-left hover:shadow-md transition-shadow"
              >
                <p className="text-xs text-text-secondary font-semibold">Trip total</p>
                <p className="text-lg font-black text-sky-blue">£{summary.totalCost.toLocaleString()}</p>
                <p className="text-xs text-sky-blue font-semibold mt-1">View breakdown →</p>
              </button>
              {itinerary.map(day => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-sm transition-colors",
                    activeDay === day.day
                      ? "bg-sky-blue text-white font-bold"
                      : "text-text-secondary hover:bg-white hover:text-text-primary"
                  )}
                >
                  <span className="font-bold">Day {day.day}</span>
                  <span className="block text-xs mt-0.5 opacity-70">{day.city}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile day tabs */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-line z-40 overflow-x-auto">
            <div className="flex px-4 py-2 gap-1">
              {itinerary.map(day => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={cn(
                    "flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold",
                    activeDay === day.day ? "bg-sky-blue text-white" : "text-text-secondary"
                  )}
                >
                  D{day.day}
                </button>
              ))}
            </div>
          </div>

          {/* Day content */}
          <div className="flex-1 min-w-0">
            {currentDay && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
                      Day {currentDay.day}: {currentDay.city}
                      {editedDays.has(currentDay.day) && (
                        <span className="bg-sky-blue text-white text-xs px-2 py-0.5 rounded-full font-semibold">Edited</span>
                      )}
                    </h2>
                    <p className="text-text-secondary text-sm">{currentDay.area}</p>
                  </div>
                  <button
                    onClick={() => handleEdit(currentDay.day)}
                    className="flex items-center gap-1 text-sky-blue text-sm font-semibold hover:underline"
                  >
                    <Edit3 className="w-4 h-4" /> Edit day
                  </button>
                </div>

                {/* Map image */}
                {currentDay.mapImage && (
                  <div className="rounded-xl overflow-hidden h-48 mb-6 bg-canvas-contrast relative">
                    <img
                      src={currentDay.mapImage}
                      alt={currentDay.city}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-sm font-semibold">
                      <MapPin className="w-4 h-4" /> {currentDay.city}
                    </div>
                  </div>
                )}

                {/* Edit inline */}
                {editingDay === currentDay.day && (
                  <div className="bg-surface-subtle rounded-xl p-4 mb-6 animate-fade-in">
                    <p className="text-sm font-semibold text-text-primary mb-2">
                      <Sparkles className="w-4 h-4 inline mr-1 text-sky-blue" />
                      What would you like to change?
                    </p>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitEdit(currentDay.day)}
                      placeholder="e.g., swap the shrine visit for a cooking class"
                      className="w-full px-4 py-2 rounded-lg border border-line text-sm focus:outline-none focus:ring-2 focus:ring-sky-blue"
                      autoFocus
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => submitEdit(currentDay.day)}
                        className="bg-sky-blue text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-sky-blue/90"
                      >
                        <Check className="w-4 h-4 inline mr-1" /> Apply
                      </button>
                      <button
                        onClick={() => setEditingDay(null)}
                        className="text-text-secondary text-sm font-bold px-4 py-2 rounded-lg hover:bg-white"
                      >
                        <X className="w-4 h-4 inline mr-1" /> Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="space-y-4">
                  {currentDay.activities.map((activity, i) => (
                    <div key={i} className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold",
                          activity.type === 'transport' ? 'bg-coral' :
                          activity.type === 'food' ? 'bg-berry' :
                          activity.type === 'accommodation' ? 'bg-haiti' :
                          'bg-sky-blue'
                        )}>
                          {activity.time.split(':')[0]}
                        </div>
                        {i < currentDay.activities.length - 1 && (
                          <div className="w-px flex-1 bg-line my-1" />
                        )}
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm flex-1 mb-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-secondary font-semibold">{activity.time}</span>
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full font-semibold capitalize",
                            activity.type === 'transport' ? 'bg-coral/10 text-coral' :
                            activity.type === 'food' ? 'bg-berry/10 text-berry' :
                            activity.type === 'accommodation' ? 'bg-haiti/10 text-haiti' :
                            'bg-surface-subtle text-sky-blue'
                          )}>
                            {activity.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-text-primary mt-1">{activity.title}</h3>
                        <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Daily cost */}
                <div className="mt-6 bg-white rounded-xl p-4 shadow-sm text-sm flex items-center justify-between">
                  <span className="text-text-secondary">Estimated daily cost</span>
                  <span className="font-bold text-text-primary">£{currentDay.dailyCost}</span>
                </div>
              </div>
            )}

            {/* Price summary */}
            {activeDay === itinerary.length && (
              <div className="mt-8 bg-white rounded-xl p-6 shadow-sm animate-fade-in-up">
                <h3 className="font-bold text-text-primary text-lg mb-4">Trip Cost Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-text-secondary">
                      <Plane className="w-4 h-4" /> Flights: {summary.flights.route}
                    </span>
                    <span className="font-bold">£{summary.flights.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-text-secondary">
                      <Hotel className="w-4 h-4" /> Hotels: {summary.hotels.nights} nights avg £{summary.hotels.avgPerNight}/night
                    </span>
                    <span className="font-bold">£{summary.hotels.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-text-secondary">
                      <MapPin className="w-4 h-4" /> Activities & transport
                    </span>
                    <span className="font-bold">£{summary.activities.total}</span>
                  </div>
                  <div className="border-t border-line pt-3 flex justify-between font-bold text-lg">
                    <span>Total estimated</span>
                    <span className="text-sky-blue">£{summary.totalCost.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-sky-blue text-white font-bold py-3 rounded-lg hover:bg-sky-blue/90 transition-colors">
                  Search flights on SkyVoyager
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

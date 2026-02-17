import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router'
import { MessageCircle, X, Send, MapPin, Sun, Sparkles, ArrowRight, ArrowLeft, Mountain, Clock, Footprints, Check } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from '../lib/utils'
import { tripDays as initialTripDays, chatMessages as initialChat, quickActions, type ChatMessage } from '../data/barcelona-trip'
import { barcelonaRoutes, runningChatResponse } from '../data/running-routes'
import type { RunningRoute } from '../data/running-routes'
import BottomSheet from '../components/BottomSheet'

const RouteMap = lazy(() => import('../components/RouteMap'))

const BPK_SKY_BLUE = 'rgb(0, 98, 227)'
const BPK_TEXT_SECONDARY = 'rgb(98, 105, 113)'

function getIcon(name: string) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name]
  return Icon || MapPin
}

export default function InTripCompanion() {
  const [activeDay, setActiveDay] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialChat)
  const [newMessage, setNewMessage] = useState('')
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null)
  const [days, setDays] = useState(initialTripDays)
  const [runSheetOpen, setRunSheetOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<RunningRoute | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [savedRoutes, setSavedRoutes] = useState<Set<string>>(new Set())

  const currentDay = days[activeDay]

  const handleSaveRoute = (route: RunningRoute) => {
    if (savedRoutes.has(route.id)) return
    // Save to first full day (Day 2+), not arrival day
    const targetDay = activeDay === 0 ? 1 : activeDay
    const newItem = {
      id: `run-${route.id}`,
      time: '07:00',
      type: 'run' as const,
      title: `Morning Run: ${route.name}`,
      description: `${route.distanceKm}km ${route.difficulty} run — ${route.highlights[0]}`,
      icon: 'Footprints',
      details: {
        'Distance': `${route.distanceKm} km`,
        'Elevation': `${route.elevationGainM}m gain`,
        'Est. Time': `${route.estimatedMinutes} min`,
        'Surface': route.surface,
      },
      actions: [{ label: 'View Route', variant: 'primary' as const }],
    }
    setDays(prev => prev.map((day, i) =>
      i === targetDay ? { ...day, items: [newItem, ...day.items] } : day
    ))
    setSavedRoutes(prev => new Set(prev).add(route.id))
    setToast(`Route added to Day ${targetDay + 1}`)
    setTimeout(() => setToast(null), 3000)
    setTimeout(() => {
      setRunSheetOpen(false)
      setSelectedRoute(null)
    }, 1000)
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setNewMessage('')

    // Contextual AI response based on keywords
    const lowerMsg = newMessage.toLowerCase()
    let reply = "I'll look into that for your Barcelona trip. Your next activity is coming up shortly — check your schedule above."

    if (lowerMsg.match(/restaurant|eat|food|dinner|lunch|hungry/)) {
      reply = "Great choice exploring local food! I'd recommend Can Culleretes in the Gothic Quarter — it's Barcelona's oldest restaurant, open since 1786. Amazing Catalan stew and crema catalana. It's a 10-minute walk from your hotel. Want me to add it to today's schedule?"
    } else if (lowerMsg.match(/weather|rain|forecast|cold|warm|umbrella/)) {
      reply = "Barcelona today: 16°C, partly cloudy with sunshine expected this afternoon. No rain forecast until Thursday. Perfect for walking — you won't need a jacket after midday."
    } else if (lowerMsg.match(/taxi|uber|transport|bus|metro|train|get to|how to get/)) {
      reply = "The Barcelona metro is your best bet — it's fast and covers everything. Your nearest station is Passeig de Gràcia (L2/L3/L4). A T-Casual 10-trip card is €11.35 and works on metro, bus, and tram. Taxis are reasonable too — airport to city centre is about €40."
    } else if (lowerMsg.match(/help|what can|what do you/)) {
      reply = "I can help with: restaurant recommendations, transport advice, weather updates, schedule changes, activity suggestions, and emergency info. Just ask naturally — I know your itinerary and Barcelona inside out."
    } else if (lowerMsg.match(/cancel|change|move|reschedule|skip/)) {
      reply = "No problem — I've noted that change. I'll shuffle your schedule to make the most of your free time. You could visit the Boqueria market instead, or just enjoy a coffee in Plaça Reial. Want me to suggest alternatives?"
    } else if (lowerMsg.match(/run|running|jog|5k|10k|exercise|morning run/)) {
      reply = runningChatResponse.text
    }

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, aiMsg])
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-canvas-contrast pb-20 md:pb-0">
      {/* Trip header */}
      <div className="bg-haiti text-white px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between animate-fade-in-up">
            <div>
              <p className="text-sky-blue text-xs font-bold uppercase tracking-wide">Current Trip</p>
              <h1 className="text-2xl font-black">Barcelona</h1>
              <p className="text-white/60 text-sm">12 — 16 Feb 2026 · 4 days</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-white/80">
                <Sun className="w-5 h-5 text-yellow" />
                <span className="text-lg font-bold">18°C</span>
              </div>
              <p className="text-xs text-white/50">Sunny</p>
            </div>
          </div>
        </div>
      </div>

      {/* Day tabs */}
      <div className="bg-white border-b border-line sticky top-16 z-30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {days.map((day, i) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(i)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                  activeDay === i
                    ? "bg-sky-blue text-white"
                    : "text-text-secondary hover:bg-canvas-contrast"
                )}
              >
                Day {day.day}
                <span className="block text-xs font-normal opacity-70">{day.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <h2 className="text-lg font-bold text-text-primary mb-1">
          {currentDay.label} · Day {currentDay.day}
        </h2>
        <p className="text-sm text-text-secondary mb-6">{currentDay.date}</p>

        {/* Timeline */}
        <div className="space-y-4">
          {currentDay.items.map((item, i) => {
            const Icon = getIcon(item.icon)
            const isAlert = item.type === 'alert'

            return (
              <div key={item.id} className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    isAlert ? "bg-danger" :
                    item.type === 'flight' ? "bg-sky-blue" :
                    item.type === 'hotel' ? "bg-haiti" :
                    item.type === 'food' ? "bg-berry" :
                    item.type === 'transport' ? "bg-coral" :
                    item.type === 'run' ? "bg-eco" :
                    "bg-eco"
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {i < currentDay.items.length - 1 && (
                    <div className="w-px flex-1 bg-line my-1" />
                  )}
                </div>

                <div className={cn(
                  "flex-1 rounded-xl p-4 shadow-sm mb-1",
                  isAlert ? "bg-danger-fill border-2 border-danger" : "bg-white"
                )}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary font-semibold">{item.time}</span>
                    {item.status && (
                      <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full",
                        item.status === 'on-time' ? "bg-success-fill text-success" :
                        item.status === 'delayed' ? "bg-danger-fill text-danger" :
                        "bg-warning-fill text-warning"
                      )}>
                        {item.status === 'on-time' ? 'On time' : item.status === 'delayed' ? 'Delayed' : 'Cancelled'}
                      </span>
                    )}
                  </div>
                  <h3 className={cn("font-bold mt-1", isAlert ? "text-danger" : "text-text-primary")}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">{item.description}</p>

                  {item.details && (
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(item.details).map(([key, value]) => (
                        <div key={key} className="bg-canvas-contrast rounded-lg p-2">
                          <span className="text-text-secondary">{key}</span>
                          <p className="font-semibold text-text-primary">{value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.actions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.actions.map((action) => (
                        <button
                          key={action.label}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                            action.variant === 'primary'
                              ? "bg-sky-blue text-white hover:bg-sky-blue/90"
                              : "border border-line text-text-primary hover:bg-canvas-contrast"
                          )}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick actions */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-text-primary mb-3">Quick actions</h3>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action) => {
              const Icon = getIcon(action.icon)
              const isRunning = action.id === 'running'
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    if (isRunning) {
                      setRunSheetOpen(true)
                      setActiveQuickAction(null)
                    } else {
                      setActiveQuickAction(activeQuickAction === action.id ? null : action.id)
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-semibold transition-colors",
                    (activeQuickAction === action.id || (isRunning && runSheetOpen))
                      ? "bg-sky-blue text-white"
                      : "bg-white text-text-secondary hover:bg-surface-subtle shadow-sm"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Quick action bottom sheet */}
        {activeQuickAction && (() => {
          const action = quickActions.find(a => a.id === activeQuickAction)
          if (!action) return null
          return (
            <div className="mt-4 bg-white rounded-xl p-4 shadow-sm animate-slide-up">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-text-primary">{action.label}</h4>
                <button onClick={() => setActiveQuickAction(null)} className="text-text-secondary hover:text-text-primary">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {action.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-canvas-contrast rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                      <p className="text-xs text-text-secondary">{item.detail}</p>
                    </div>
                    {item.price && (
                      <span className="text-sm font-bold text-text-primary">{item.price}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })()}

        {/* Cross-demo links */}
        <div className="mt-8 mb-4 space-y-3">
          <Link
            to="/experiences"
            className="block bg-gradient-to-r from-haiti to-sky-blue text-white rounded-xl p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">Things to do in Barcelona</p>
                <p className="text-sm text-white/70">Compare experiences from Viator, GetYourGuide & more</p>
              </div>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
          <Link
            to="/ancillaries"
            className="block bg-white rounded-xl p-4 shadow-sm border border-line hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-text-primary text-sm">Need travel insurance or airport transfer?</p>
                <p className="text-xs text-text-secondary">View smart add-ons for your trip</p>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-blue" />
            </div>
          </Link>
        </div>
      </div>

      {/* Running Routes Bottom Sheet */}
      <BottomSheet
        isOpen={runSheetOpen}
        onClose={() => { setRunSheetOpen(false); setSelectedRoute(null) }}
      >
        {selectedRoute ? (
          /* Route Detail View */
          <div className="space-y-4">
            <button
              onClick={() => setSelectedRoute(null)}
              className="flex items-center gap-1 text-sm text-sky-blue font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to routes
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-black text-text-primary">{selectedRoute.name}</h3>
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full",
                  selectedRoute.difficulty === 'easy' ? "bg-eco/20 text-eco" :
                  selectedRoute.difficulty === 'moderate' ? "bg-coral/20 text-coral" :
                  "bg-danger/20 text-danger"
                )}>
                  {selectedRoute.difficulty}
                </span>
              </div>
              <p className="text-sm text-text-secondary">{selectedRoute.description}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Distance', value: `${selectedRoute.distanceKm} km` },
                { label: 'Elevation', value: `${selectedRoute.elevationGainM}m` },
                { label: 'Time', value: `${selectedRoute.estimatedMinutes} min` },
                { label: 'Surface', value: selectedRoute.surface },
              ].map(stat => (
                <div key={stat.label} className="bg-canvas-contrast rounded-lg p-2 text-center">
                  <p className="text-xs text-text-secondary">{stat.label}</p>
                  <p className="text-sm font-bold text-text-primary">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Map */}
            <Suspense fallback={<div className="h-[200px] bg-canvas-contrast rounded-xl animate-pulse" />}>
              <RouteMap coordinates={selectedRoute.coordinates} height="200px" />
            </Suspense>

            {/* Elevation profile */}
            <div>
              <div className="flex items-center gap-1 mb-2">
                <Mountain className="w-4 h-4 text-text-secondary" />
                <h4 className="text-sm font-bold text-text-primary">Elevation Profile</h4>
              </div>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedRoute.elevationProfile}>
                    <XAxis
                      dataKey="distanceKm"
                      tick={{ fontSize: 10, fill: BPK_TEXT_SECONDARY }}
                      tickFormatter={(v) => `${v}km`}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: BPK_TEXT_SECONDARY }}
                      tickFormatter={(v) => `${v}m`}
                      domain={['dataMin - 5', 'dataMax + 10']}
                      width={40}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}m`, 'Elevation']}
                      labelFormatter={(label) => `${label} km`}
                      contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="elevationM"
                      stroke={BPK_SKY_BLUE}
                      fill={BPK_SKY_BLUE}
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {selectedRoute.highlights.map(h => (
                <span key={h} className="text-xs bg-canvas-contrast text-text-secondary px-3 py-1 rounded-full font-medium">
                  {h}
                </span>
              ))}
            </div>

            {/* UA Gear */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-text-primary">Recommended Gear</h4>
                <span className="text-xs font-bold text-text-primary tracking-wide">UNDER ARMOUR</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectedRoute.uaGear.map(gear => (
                  <div key={gear.name} className="bg-white border border-text-primary/10 rounded-xl overflow-hidden">
                    <img src={gear.image} alt={gear.name} className="w-full h-20 object-cover" />
                    <div className="p-2">
                      <p className="text-xs font-bold text-text-primary">{gear.name}</p>
                      <p className="text-xs text-text-secondary">{gear.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save button */}
            <button
              onClick={() => handleSaveRoute(selectedRoute)}
              disabled={savedRoutes.has(selectedRoute.id)}
              className={cn(
                "w-full py-3 rounded-xl text-sm font-bold transition-colors",
                savedRoutes.has(selectedRoute.id)
                  ? "bg-eco/20 text-eco cursor-default"
                  : "bg-sky-blue text-white hover:bg-sky-blue/90"
              )}
            >
              {savedRoutes.has(selectedRoute.id) ? (
                <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Saved to Day {(activeDay === 0 ? 1 : activeDay) + 1}</span>
              ) : (
                <span className="flex items-center justify-center gap-2"><Footprints className="w-4 h-4" /> Save to Day {(activeDay === 0 ? 1 : activeDay) + 1}</span>
              )}
            </button>
          </div>
        ) : (
          /* Route List View */
          <div className="space-y-4">
            {/* Co-branded header */}
            <div className="text-center pb-3 border-b border-line">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs font-bold text-text-primary tracking-wide">UNDER ARMOUR</span>
                <span className="text-xs text-text-secondary">x</span>
                <span className="text-xs font-bold text-sky-blue tracking-wide">SKYSCANNER</span>
              </div>
              <h3 className="text-lg font-black text-text-primary">Run the World</h3>
              <p className="text-xs text-text-secondary">Discover the best running routes in Barcelona</p>
            </div>

            {/* Route cards */}
            {barcelonaRoutes.map((route, i) => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className="w-full text-left bg-white rounded-xl shadow-sm border border-line overflow-hidden hover:shadow-md transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex">
                  <img src={route.image} alt={route.name} className="w-24 h-24 object-cover flex-shrink-0" />
                  <div className="p-3 flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-text-primary truncate">{route.name}</h4>
                      <span className="text-[10px] font-bold text-text-primary/60 bg-text-primary/5 px-1.5 py-0.5 rounded flex-shrink-0">UA Tested</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-secondary mb-1">
                      <span className="flex items-center gap-1"><Footprints className="w-3 h-3" />{route.distanceKm} km</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{route.estimatedMinutes} min</span>
                      <span className="flex items-center gap-1"><Mountain className="w-3 h-3" />{route.elevationGainM}m</span>
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      route.difficulty === 'easy' ? "bg-eco/20 text-eco" :
                      route.difficulty === 'moderate' ? "bg-coral/20 text-coral" :
                      "bg-danger/20 text-danger"
                    )}>
                      {route.difficulty}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            {/* Generate custom route link */}
            <button
              onClick={() => {
                setRunSheetOpen(false)
                setSelectedRoute(null)
                setChatOpen(true)
                setNewMessage('Find me a running route in Barcelona')
              }}
              className="w-full py-3 rounded-xl border-2 border-dashed border-sky-blue/30 text-sky-blue text-sm font-semibold hover:bg-sky-blue/5 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate custom route with AI
            </button>
          </div>
        )}
      </BottomSheet>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 right-6 bg-eco text-white px-4 py-3 rounded-xl shadow-lg animate-fade-in flex items-center gap-2 z-50">
          <Check className="w-4 h-4" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* Chat FAB */}
      <button
        onClick={() => setChatOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-sky-blue text-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-blue/90 transition-all z-40",
          chatOpen && "hidden"
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-96 h-[70vh] md:h-[500px] bg-white md:rounded-2xl shadow-xl z-50 flex flex-col animate-slide-up">
          {/* Chat header */}
          <div className="bg-haiti text-white px-4 py-3 md:rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-blue" />
              <span className="font-bold">Trip Assistant</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2",
                  msg.role === 'user'
                    ? "bg-sky-blue text-white rounded-br-md"
                    : "bg-canvas-contrast text-text-primary rounded-bl-md"
                )}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    msg.role === 'user' ? "text-white/60" : "text-text-secondary"
                  )}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-line p-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about your trip..."
                className="flex-1 px-4 py-2 rounded-full border border-line text-sm focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="w-10 h-10 bg-sky-blue text-white rounded-full flex items-center justify-center hover:bg-sky-blue/90 disabled:opacity-40 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

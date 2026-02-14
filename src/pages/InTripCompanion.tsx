import { useState } from 'react'
import { Link } from 'react-router'
import { MessageCircle, X, Send, MapPin, Sun, Sparkles, ArrowRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { cn } from '../lib/utils'
import { tripDays, chatMessages as initialChat, quickActions, type ChatMessage } from '../data/barcelona-trip'

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

  const currentDay = tripDays[activeDay]

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

    // Simulated AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: "I've noted that. Let me update your schedule accordingly. Is there anything else you'd like to adjust?",
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
                <Sun className="w-5 h-5 text-amber-300" />
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
            {tripDays.map((day, i) => (
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
          <div className="grid grid-cols-5 gap-2">
            {quickActions.map((action) => {
              const Icon = getIcon(action.icon)
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveQuickAction(activeQuickAction === action.id ? null : action.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-semibold transition-colors",
                    activeQuickAction === action.id
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

        {/* Cross-demo link */}
        <Link
          to="/experiences"
          className="mt-8 mb-4 block bg-gradient-to-r from-haiti to-sky-blue text-white rounded-xl p-5 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">Things to do in Barcelona</p>
              <p className="text-sm text-white/70">Compare experiences from Viator, GetYourGuide & more</p>
            </div>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>
      </div>

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

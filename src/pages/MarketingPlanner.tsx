import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  Sparkles,
  Target,
  Clock,
  BarChart3,
  Lightbulb,
  ChevronRight,
  ArrowLeft,
  Users,
  Search,
  Video,
  Rocket,
  Mail,
  Bell,
  Smartphone,
  Handshake,
  Briefcase,
  Plug,
  Mic,
  Zap,
  Wrench,
  Newspaper,
  FileText,
  Repeat,
  Linkedin,
  Pen,
  CalendarDays,
  Megaphone,
  Copy,
  Check,
  Globe,
  BookOpen,
  Share2,
  Loader2,
  Eye,
  Star,
  MapPin,
  Shield,
  ArrowRight,
  TrendingUp,
  Clock4,
  Swords,
  Hash,
  Send,
  ChevronDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { marketingPlans } from '../data/marketing-plans'
import type { MarketingPlan, Tactic, ContentPiece, ChannelCopy, ContentCalendarData, LaunchPlaybookData, CreatorProfile } from '../data/marketing-plans'
import { geoMarketsByProduct, geoSignalInsightsByProduct } from '../data/geo-markets'
import type { GeoMarket } from '../data/geo-markets'

type ViewState = 'select' | 'generating' | 'plan'

const productCards = [
  { id: 'trip-planner', label: 'AI Trip Planner', color: 'bg-sky-blue', route: '/trip-planner' },
  { id: 'companion', label: 'In-Trip Companion', color: 'bg-coral', route: '/companion' },
  { id: 'ancillaries', label: 'Smart Ancillaries', color: 'bg-eco', route: '/ancillaries' },
  { id: 'prices', label: 'Price Intelligence', color: 'bg-berry', route: '/prices' },
  { id: 'experiences', label: 'Tours & Experiences', color: 'bg-haiti', route: '/experiences' },
  { id: 'business-travel', label: 'Business Travel Agent', color: 'bg-sky-blue', route: '/business-travel' },
  { id: 'white-label', label: 'White-Label Platform', color: 'bg-eco', route: '/white-label' },
]

const channelIcons: Record<string, LucideIcon> = {
  search: Search,
  video: Video,
  users: Users,
  rocket: Rocket,
  mail: Mail,
  bell: Bell,
  smartphone: Smartphone,
  handshake: Handshake,
  briefcase: Briefcase,
  plug: Plug,
  mic: Mic,
  zap: Zap,
  wrench: Wrench,
  newspaper: Newspaper,
  target: Target,
  repeat: Repeat,
  'file-text': FileText,
  linkedin: Linkedin,
}

const generatingMessages = [
  'Analysing target audience...',
  'Selecting optimal channels...',
  'Mapping 90-day timeline...',
  'Estimating budget allocation...',
  'Ranking tactics by impact...',
  'Finalising marketing plan...',
]

export default function MarketingPlanner() {
  const [view, setView] = useState<ViewState>('select')
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [generatingStep, setGeneratingStep] = useState(0)
  const [activeTactic, setActiveTactic] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('overview')

  const plan = selectedProduct
    ? marketingPlans.find(p => p.productId === selectedProduct)
    : null

  // Safe timer pattern: useEffect keyed on step value.
  // Each step change schedules one setTimeout. Cleanup cancels it.
  // StrictMode double-fire is safe because cleanup runs between.
  useEffect(() => {
    if (view !== 'generating') return
    const delay = generatingStep < generatingMessages.length - 1 ? 600 : 800
    const timer = setTimeout(() => {
      if (generatingStep < generatingMessages.length - 1) {
        setGeneratingStep(s => s + 1)
      } else {
        setView('plan')
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [view, generatingStep])

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId)
    setGeneratingStep(0)
    setView('generating')
    setActiveTactic(null)
    setActiveSection('overview')
  }

  if (view === 'generating') {
    return (
      <div className="min-h-screen bg-haiti flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <Sparkles className="w-12 h-12 text-sky-blue mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Building marketing plan...</h2>
          <p className="text-white/40 text-sm mb-8">{plan?.productName}</p>

          <div className="space-y-3 text-left">
            {generatingMessages.map((msg, i) => (
              <div
                key={msg}
                className={cn(
                  'flex items-center gap-3 transition-all duration-300',
                  i <= generatingStep ? 'opacity-100' : 'opacity-0'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300',
                  i < generatingStep ? 'bg-eco' : i === generatingStep ? 'bg-sky-blue animate-pulse' : 'bg-white/10'
                )}>
                  {i < generatingStep ? (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className={cn(
                  'text-sm font-medium transition-colors duration-300',
                  i < generatingStep ? 'text-white/50' : i === generatingStep ? 'text-white' : 'text-white/30'
                )}>
                  {msg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (view === 'plan' && plan) {
    return (
      <PlanView
        plan={plan}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeTactic={activeTactic}
        setActiveTactic={setActiveTactic}
        onBack={() => setView('select')}
      />
    )
  }

  // Select view
  return (
    <div className="min-h-screen bg-haiti flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">
        <Sparkles className="w-10 h-10 text-sky-blue mx-auto mb-4 animate-fade-in-up" />
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 animate-fade-in-up stagger-1">
          Pick a product. Get a plan.
        </h1>
        <p className="text-white/60 mb-10 animate-fade-in-up stagger-2">
          Choose one of the six demo products and watch AI generate a full marketing strategy — channels, tactics, timeline, and budget.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in-up stagger-3">
          {productCards.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelectProduct(product.id)}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-5 text-left transition-all duration-200 hover:-translate-y-1"
            >
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', product.color)}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <p className="text-white font-bold text-sm">{product.label}</p>
              <div className="flex items-center gap-1 text-sky-blue text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Generate plan <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>

        <p className="text-white/30 text-xs mt-8 animate-fade-in-up stagger-4">
          Powered by 139 proven marketing tactics
        </p>
      </div>
    </div>
  )
}

// --- AI Generate Bar (shared by execution tabs) ---

interface AiBarProps {
  isGenerating: boolean
  hasAiData: boolean
  error: string | null
  onGenerate: () => void
  onClearAi: () => void
  label: string
}

function AiGenerateBar({ isGenerating, hasAiData, error, onGenerate, onClearAi, label }: AiBarProps) {
  if (isGenerating) {
    return (
      <div className="bg-haiti rounded-xl p-5 flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-sky-blue animate-spin" />
        <div>
          <p className="text-white text-sm font-semibold">Generating {label}...</p>
          <p className="text-white/40 text-xs">This usually takes 10–20 seconds</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-coral/10 border border-coral/20 rounded-xl p-4 flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
        <p className="text-sm text-coral">{error}</p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={onGenerate} className="text-xs font-semibold text-coral hover:text-coral/80 transition-colors">Retry</button>
          <button onClick={onClearAi} className="text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors">Use demo data</button>
        </div>
      </div>
    )
  }

  if (hasAiData) {
    return (
      <div className="flex items-center justify-between bg-eco/10 border border-eco/20 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-eco" />
          <span className="text-sm font-semibold text-eco">AI-generated content</span>
        </div>
        <div className="flex gap-3">
          <button onClick={onGenerate} className="text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors">Regenerate</button>
          <button onClick={onClearAi} className="text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors">Use demo data</button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={onGenerate}
      className="w-full bg-gradient-to-r from-haiti to-haiti/90 rounded-xl p-4 flex items-center justify-center gap-2 hover:from-haiti/90 hover:to-haiti/80 transition-all group"
    >
      <Sparkles className="w-4 h-4 text-sky-blue group-hover:animate-pulse" />
      <span className="text-white text-sm font-semibold">Generate with AI</span>
      <span className="text-white/40 text-xs ml-1 hidden sm:inline">— uses Claude to create fresh {label}</span>
    </button>
  )
}

// --- Plan view ---

const sections = [
  { id: 'overview', label: 'Overview', icon: Target, group: 'strategy' as const },
  { id: 'competitors', label: 'Competitors', icon: Swords, group: 'strategy' as const },
  { id: 'channels', label: 'Channels', icon: BarChart3, group: 'strategy' as const },
  { id: 'timeline', label: '90-Day Plan', icon: Clock, group: 'strategy' as const },
  { id: 'tactics', label: 'Top Tactics', icon: Lightbulb, group: 'strategy' as const },
  { id: 'budget', label: 'Budget Intelligence', icon: TrendingUp, group: 'strategy' as const },
  { id: 'geo-growth', label: 'Geo Growth', icon: Globe, group: 'strategy' as const },
  { id: 'copy-studio', label: 'Copy Studio', icon: Pen, group: 'execution' as const },
  { id: 'content-calendar', label: 'Content', icon: CalendarDays, group: 'execution' as const },
  { id: 'launch-playbook', label: 'Launch', icon: Megaphone, group: 'execution' as const },
]

function PlanView({
  plan,
  activeSection,
  setActiveSection,
  activeTactic,
  setActiveTactic,
  onBack,
}: {
  plan: MarketingPlan
  activeSection: string
  setActiveSection: (s: string) => void
  activeTactic: number | null
  setActiveTactic: (t: number | null) => void
  onBack: () => void
}) {
  const productCard = productCards.find(p => p.id === plan.productId)

  // AI generation state
  const [aiContent, setAiContent] = useState<{
    copyStudio: ChannelCopy[] | null
    contentCalendar: ContentCalendarData | null
    launchPlaybook: LaunchPlaybookData | null
  }>({ copyStudio: null, contentCalendar: null, launchPlaybook: null })
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const [aiError, setAiError] = useState<{ type: string; message: string } | null>(null)

  const generateAiContent = async (type: 'copy' | 'calendar' | 'launch') => {
    setAiLoading(type)
    setAiError(null)
    try {
      const res = await fetch('/api/marketing-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          productName: plan.productName,
          productContext: {
            tagline: plan.tagline,
            targetAudience: plan.targetAudience,
            positioning: plan.positioning,
          },
        }),
      })
      if (!res.ok) throw new Error(`API error: ${res.status}`)

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')

      let text = ''
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
      }

      // Strip markdown fences if present
      let jsonText = text.trim()
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
      }
      const parsed = JSON.parse(jsonText)

      if (type === 'copy') {
        setAiContent(prev => ({ ...prev, copyStudio: parsed }))
      } else if (type === 'calendar') {
        setAiContent(prev => ({ ...prev, contentCalendar: parsed }))
      } else {
        setAiContent(prev => ({ ...prev, launchPlaybook: parsed }))
      }
    } catch (err) {
      setAiError({ type, message: err instanceof Error ? err.message : 'Failed to generate' })
    } finally {
      setAiLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Header */}
      <div className="bg-haiti text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-4 animate-fade-in-up">
            <div>
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-3 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Choose another product
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-sky-blue" />
                <span className="text-sky-blue text-sm font-bold uppercase tracking-wide">AI Marketing Plan</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black">{plan.productName}</h1>
              <p className="text-white/60 mt-1 text-sm italic">&ldquo;{plan.tagline}&rdquo;</p>
            </div>
            {productCard && (
              <Link
                to={productCard.route}
                className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                View product demo <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Section nav sidebar */}
          <div className="hidden md:block w-48 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              {sections.map((section, i) => (
                <div key={section.id}>
                  {i > 0 && sections[i - 1].group !== section.group && (
                    <div className="border-t border-line my-2 pt-2">
                      <span className="text-[10px] uppercase tracking-widest text-text-secondary/50 px-4">Execution</span>
                    </div>
                  )}
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-2',
                      activeSection === section.id
                        ? 'bg-sky-blue text-white font-bold'
                        : 'text-text-secondary hover:bg-white hover:text-text-primary'
                    )}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile section tabs */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-line z-40">
            <div className="relative">
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="overflow-x-auto px-4 py-2 flex gap-1">
                {sections.map((section, i) => (
                  <div key={section.id} className="flex items-center gap-1 flex-shrink-0">
                    {i > 0 && sections[i - 1].group !== section.group && (
                      <div className="w-px h-5 bg-line mx-1 flex-shrink-0" />
                    )}
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        'flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1',
                        activeSection === section.id ? 'bg-sky-blue text-white' : 'text-text-secondary'
                      )}
                    >
                      <section.icon className="w-3 h-3" />
                      {section.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pb-20 md:pb-0">
            {activeSection === 'overview' && <OverviewSection plan={plan} />}
            {activeSection === 'competitors' && <CompetitorSection plan={plan} />}
            {activeSection === 'channels' && <ChannelsSection plan={plan} />}
            {activeSection === 'timeline' && <TimelineSection plan={plan} />}
            {activeSection === 'tactics' && (
              <TacticsSection plan={plan} activeTactic={activeTactic} setActiveTactic={setActiveTactic} />
            )}
            {activeSection === 'budget' && <BudgetIntelligenceSection plan={plan} />}
            {activeSection === 'geo-growth' && <GeoGrowthSection plan={plan} />}
            {activeSection === 'copy-studio' && (
              <CopyStudioSection
                plan={plan}
                aiData={aiContent.copyStudio}
                isGenerating={aiLoading === 'copy'}
                error={aiError?.type === 'copy' ? aiError.message : null}
                onGenerate={() => generateAiContent('copy')}
                onClearAi={() => { setAiContent(prev => ({ ...prev, copyStudio: null })); setAiError(null) }}
              />
            )}
            {activeSection === 'content-calendar' && (
              <ContentCalendarSection
                plan={plan}
                aiData={aiContent.contentCalendar}
                isGenerating={aiLoading === 'calendar'}
                error={aiError?.type === 'calendar' ? aiError.message : null}
                onGenerate={() => generateAiContent('calendar')}
                onClearAi={() => { setAiContent(prev => ({ ...prev, contentCalendar: null })); setAiError(null) }}
              />
            )}
            {activeSection === 'launch-playbook' && (
              <LaunchPlaybookSection
                plan={plan}
                aiData={aiContent.launchPlaybook}
                isGenerating={aiLoading === 'launch'}
                error={aiError?.type === 'launch' ? aiError.message : null}
                onGenerate={() => generateAiContent('launch')}
                onClearAi={() => { setAiContent(prev => ({ ...prev, launchPlaybook: null })); setAiError(null) }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Section components ---

function OverviewSection({ plan }: { plan: MarketingPlan }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="bg-sky-blue/10 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-sky-blue" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary">Positioning</h3>
            <p className="text-text-secondary text-sm mt-1">{plan.positioning}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="bg-coral/10 p-2 rounded-lg">
            <Users className="w-5 h-5 text-coral" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary">Target Audience</h3>
            <p className="text-text-secondary text-sm mt-1">{plan.targetAudience}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-berry" /> Success Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plan.kpis.map((kpi) => (
            <div key={kpi.metric} className="bg-surface-subtle rounded-lg p-4">
              <p className="text-2xl font-black text-sky-blue">{kpi.target}</p>
              <p className="text-sm font-semibold text-text-primary mt-1">{kpi.metric}</p>
              <p className="text-xs text-text-secondary">within {kpi.timeframe}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-sky-blue">AI Reasoning:</span> This plan prioritises{' '}
            {plan.channels.filter(c => c.fit === 'high').map(c => c.name.toLowerCase()).join(', ')}{' '}
            based on audience behaviour and competitive landscape. The 90-day timeline front-loads
            quick wins while building toward compounding channels.
          </div>
        </div>
      </div>
    </div>
  )
}

const efficiencyConfig = {
  efficient: { color: 'text-eco', bg: 'bg-eco/10', label: 'Efficient' },
  diminishing: { color: 'text-coral', bg: 'bg-coral/10', label: 'Diminishing' },
  saturated: { color: 'text-berry', bg: 'bg-berry/10', label: 'Saturated' },
}

function CompetitorSection({ plan }: { plan: MarketingPlan }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-text-primary mb-1">Competitive Landscape</h2>
        <p className="text-text-secondary text-sm mb-4">How competitors market in this space — and where the gaps are</p>
      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-subtle/50">
                <th className="text-left py-3 px-4 font-bold text-text-primary w-[140px]" />
                <th className="text-left py-3 px-4 font-bold text-sky-blue border-l-2 border-sky-blue/20">
                  {plan.productName}
                </th>
                {plan.competitors.slice(0, 2).map((c) => (
                  <th key={c.name} className="text-left py-3 px-4 font-bold text-text-primary">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line/20">
                <td className="py-3 px-4 text-xs font-bold uppercase tracking-wide text-text-secondary">Positioning</td>
                <td className="py-3 px-4 text-text-primary border-l-2 border-sky-blue/20 bg-sky-blue/[0.02]">{plan.positioning}</td>
                {plan.competitors.slice(0, 2).map((c) => (
                  <td key={c.name} className="py-3 px-4 text-text-secondary">{c.positioning}</td>
                ))}
              </tr>
              <tr className="border-t border-line/20">
                <td className="py-3 px-4 text-xs font-bold uppercase tracking-wide text-text-secondary">Channels</td>
                <td className="py-3 px-4 border-l-2 border-sky-blue/20 bg-sky-blue/[0.02]">
                  <div className="flex flex-wrap gap-1">
                    {plan.channels.filter(c => c.fit === 'high').map(c => (
                      <span key={c.name} className="text-xs bg-sky-blue/10 text-sky-blue px-2 py-0.5 rounded-full font-semibold">{c.name}</span>
                    ))}
                  </div>
                </td>
                {plan.competitors.slice(0, 2).map((c) => (
                  <td key={c.name} className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {c.primaryChannels.map(ch => (
                        <span key={ch} className="text-xs bg-surface-subtle text-text-secondary px-2 py-0.5 rounded-full font-medium">{ch}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-line/20">
                <td className="py-3 px-4 text-xs font-bold uppercase tracking-wide text-text-secondary">Strength</td>
                <td className="py-3 px-4 text-text-primary border-l-2 border-sky-blue/20 bg-sky-blue/[0.02]">
                  AI-native approach with real-time personalisation
                </td>
                {plan.competitors.slice(0, 2).map((c) => (
                  <td key={c.name} className="py-3 px-4 text-text-secondary">{c.strength}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Competitor cards with gaps */}
      <div className="space-y-3">
        {plan.competitors.map((comp, i) => (
          <div
            key={comp.name}
            className="bg-white rounded-xl p-5 shadow-sm animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-berry/10 flex items-center justify-center flex-shrink-0">
                <Swords className="w-5 h-5 text-berry" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-text-primary">{comp.name}</h3>
                <p className="text-sm text-text-secondary mt-1">{comp.positioning}</p>
                <div className="mt-3 p-3 rounded-lg bg-eco/5 border border-eco/20">
                  <div className="flex items-start gap-2">
                    <Target className="w-3.5 h-3.5 text-eco mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide text-eco">Opportunity</span>
                      <p className="text-sm text-text-primary mt-0.5">{comp.gap}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Reasoning */}
      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-sky-blue">Competitive Intelligence:</span>{' '}
            {plan.competitors[0]?.name} dominates through {plan.competitors[0]?.primaryChannels[0]?.toLowerCase()}, but their
            weakness in AI-driven personalisation creates a clear lane for {plan.productName}. Focus marketing on the
            gap: show what the competitors can&apos;t do, not what you do better at the same thing.
          </div>
        </div>
      </div>
    </div>
  )
}

function ChannelsSection({ plan }: { plan: MarketingPlan }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-black text-text-primary mb-2">Recommended Channels</h2>
      <p className="text-text-secondary text-sm mb-4">Ranked by fit and incrementality for {plan.productName}</p>

      {plan.channels.map((channel, i) => {
        const Icon = channelIcons[channel.icon] || Search
        const eff = efficiencyConfig[channel.efficiency]
        return (
          <div
            key={channel.name}
            className="bg-white rounded-xl p-5 shadow-sm animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                channel.fit === 'high' ? 'bg-sky-blue' : 'bg-surface-subtle'
              )}>
                <Icon className={cn('w-5 h-5', channel.fit === 'high' ? 'text-white' : 'text-text-secondary')} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-text-primary">{channel.name}</h3>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-semibold',
                    channel.fit === 'high' ? 'bg-eco/10 text-eco' : 'bg-surface-subtle text-text-secondary'
                  )}>
                    {channel.fit} fit
                  </span>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold', eff.bg, eff.color)}>
                    {eff.label}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-1">{channel.reason}</p>
                {/* ROI metrics row */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-line/30">
                  <div className="text-center">
                    <div className="text-sm font-black text-text-primary">{channel.roi}x</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-wide">ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black text-text-primary">{channel.cpa}</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-wide">CPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-black text-text-primary">{channel.incrementality}%</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-wide">Incremental</div>
                  </div>
                  {/* Mini incrementality bar */}
                  <div className="flex-1 max-w-[120px]">
                    <div className="h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', channel.incrementality > 60 ? 'bg-eco' : channel.incrementality > 40 ? 'bg-coral' : 'bg-berry')}
                        style={{ width: `${channel.incrementality}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* AI Reasoning */}
      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-sky-blue">Channel Intelligence:</span>{' '}
            Channels ranked by marketing incrementality — the percentage of conversions that wouldn&apos;t have happened without this channel.
            High-incrementality channels ({plan.channels.filter(c => c.incrementality > 70).map(c => c.name).join(', ')}) deliver truly new customers,
            while low-incrementality channels capture demand that already exists.
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineSection({ plan }: { plan: MarketingPlan }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-black text-text-primary mb-2">90-Day Marketing Timeline</h2>

      {plan.timeline.map((phase, phaseIndex) => (
        <div key={phase.phase} className="animate-fade-in-up" style={{ animationDelay: `${phaseIndex * 0.15}s` }}>
          <div className="flex items-center gap-3 mb-3">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold',
              phaseIndex === 0 ? 'bg-sky-blue' : phaseIndex === 1 ? 'bg-coral' : 'bg-eco'
            )}>
              {phaseIndex + 1}
            </div>
            <div>
              <h3 className="font-bold text-text-primary">{phase.phase}</h3>
              <p className="text-xs text-text-secondary">{phase.weeks}</p>
            </div>
          </div>
          <div className="ml-4 border-l-2 border-line pl-7 space-y-3 pb-2">
            {phase.actions.map((action, i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-text-primary">{action}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TacticsSection({
  plan,
  activeTactic,
  setActiveTactic,
}: {
  plan: MarketingPlan
  activeTactic: number | null
  setActiveTactic: (t: number | null) => void
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-black text-text-primary mb-2">Top Tactics</h2>
      <p className="text-text-secondary text-sm mb-4">
        Selected from 139 proven marketing ideas, ranked by impact for {plan.productName}
      </p>

      {plan.tactics.map((tactic, i) => (
        <TacticCard
          key={tactic.id}
          tactic={tactic}
          index={i}
          isExpanded={activeTactic === tactic.id}
          onToggle={() => setActiveTactic(activeTactic === tactic.id ? null : tactic.id)}
        />
      ))}
    </div>
  )
}

function TacticCard({
  tactic,
  index,
  isExpanded,
  onToggle,
}: {
  tactic: Tactic
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-5 flex items-start gap-4"
      >
        <div className="w-8 h-8 bg-sky-blue rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
          #{tactic.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-text-primary">{tactic.name}</h3>
            <span className="text-xs bg-surface-subtle px-2 py-0.5 rounded-full text-text-secondary font-semibold">
              {tactic.category}
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">{tactic.description}</p>
          <div className="flex gap-4 mt-3">
            <EffortImpact label="Effort" level={tactic.effort} />
            <EffortImpact label="Impact" level={tactic.impact} />
          </div>
        </div>
        <ChevronRight className={cn(
          'w-5 h-5 text-text-secondary flex-shrink-0 transition-transform duration-200',
          isExpanded && 'rotate-90'
        )} />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-line animate-fade-in">
          <div className="pt-4">
            <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-1">
              <Lightbulb className="w-4 h-4 text-sky-blue" /> First Steps
            </h4>
            <ol className="space-y-2">
              {tactic.firstSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-secondary">
                  <span className="w-5 h-5 bg-sky-blue/10 text-sky-blue rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

function EffortImpact({ label, level }: { label: string; level: 'low' | 'medium' | 'high' }) {
  const dots = level === 'low' ? 1 : level === 'medium' ? 2 : 3
  const color = label === 'Impact'
    ? level === 'high' ? 'bg-eco' : level === 'medium' ? 'bg-sky-blue' : 'bg-surface-subtle'
    : level === 'low' ? 'bg-eco' : level === 'medium' ? 'bg-sky-blue' : 'bg-coral'

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-text-secondary">{label}:</span>
      <div className="flex gap-0.5">
        {[1, 2, 3].map(i => (
          <div key={i} className={cn('w-2 h-2 rounded-full', i <= dots ? color : 'bg-line')} />
        ))}
      </div>
    </div>
  )
}

function BudgetIntelligenceSection({ plan }: { plan: MarketingPlan }) {
  const [budgetTab, setBudgetTab] = useState<'allocation' | 'roi' | 'incrementality'>('allocation')

  // Sort channels by incrementality for the reallocation insight
  const sortedByIncr = [...plan.channels].sort((a, b) => a.incrementality - b.incrementality)
  const lowest = sortedByIncr[0]
  const highest = sortedByIncr[sortedByIncr.length - 1]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-text-primary mb-1">Budget Intelligence</h2>
        <p className="text-text-secondary text-sm mb-4">Allocation, ROI, and incrementality analysis</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-surface-subtle rounded-lg p-1">
        {([
          { id: 'allocation' as const, label: 'Allocation' },
          { id: 'roi' as const, label: 'ROI & Efficiency' },
          { id: 'incrementality' as const, label: 'Incrementality' },
        ]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setBudgetTab(tab.id)}
            className={cn(
              'flex-1 px-3 py-2 rounded-md text-sm font-semibold transition-colors',
              budgetTab === tab.id
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Allocation tab (existing) */}
      {budgetTab === 'allocation' && (
        <div className="animate-fade-in">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              {plan.budget.map((item, i) => (
                <div key={item.category} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-text-primary">{item.category}</span>
                    <span className="font-bold text-text-primary">{item.percentage}%</span>
                  </div>
                  <div className="h-3 bg-surface-subtle rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-700', item.color)}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5 mt-4">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
              <div className="text-sm text-text-secondary">
                <span className="font-semibold text-sky-blue">Budget Strategy:</span> Heavy investment in{' '}
                {plan.budget[0].category.toLowerCase()} ({plan.budget[0].percentage}%) because it drives the highest
                long-term compounding returns. Paid channels kept lean at {plan.budget[plan.budget.length - 1].percentage}%
                — used primarily for retargeting warm audiences rather than cold acquisition.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROI & Efficiency tab */}
      {budgetTab === 'roi' && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-subtle/50">
                  <th className="text-left py-3 px-4 font-bold text-text-primary">Channel</th>
                  <th className="text-right py-3 px-4 font-bold text-text-primary">ROI</th>
                  <th className="text-right py-3 px-4 font-bold text-text-primary">CPA</th>
                  <th className="text-right py-3 px-4 font-bold text-text-primary">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {[...plan.channels].sort((a, b) => b.roi - a.roi).map((ch, i) => {
                  const eff = efficiencyConfig[ch.efficiency]
                  return (
                    <tr key={ch.name} className="border-t border-line/20 animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                      <td className="py-3 px-4 font-semibold text-text-primary">{ch.name}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-black text-text-primary">{ch.roi}x</span>
                      </td>
                      <td className="py-3 px-4 text-right text-text-secondary">{ch.cpa}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold', eff.bg, eff.color)}>
                          {eff.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* ROI bar chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-text-primary mb-4">Expected ROI by Channel</h3>
            <div className="space-y-3">
              {[...plan.channels].sort((a, b) => b.roi - a.roi).map((ch) => {
                const maxRoi = Math.max(...plan.channels.map(c => c.roi))
                return (
                  <div key={ch.name} className="flex items-center gap-3">
                    <span className="text-xs text-text-secondary w-28 truncate">{ch.name}</span>
                    <div className="flex-1 h-5 bg-surface-subtle rounded overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded transition-all duration-700',
                          ch.efficiency === 'efficient' ? 'bg-sky-blue' : ch.efficiency === 'diminishing' ? 'bg-coral' : 'bg-berry'
                        )}
                        style={{ width: `${(ch.roi / maxRoi) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-black text-text-primary w-10 text-right">{ch.roi}x</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
              <div className="text-sm text-text-secondary">
                <span className="font-semibold text-sky-blue">Spend Elasticity:</span>{' '}
                {plan.channels.filter(c => c.efficiency === 'efficient').map(c => c.name).join(', ')} still have room to scale —
                each additional pound spent delivers strong marginal returns. Channels marked &ldquo;Saturated&rdquo; have hit
                diminishing returns and should be capped at current spend levels.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Incrementality tab */}
      {budgetTab === 'incrementality' && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-subtle/50">
                  <th className="text-left py-3 px-4 font-bold text-text-primary">Channel</th>
                  <th className="text-right py-3 px-4 font-bold text-text-primary">Incrementality</th>
                  <th className="py-3 px-4 font-bold text-text-primary text-left pl-6">Distribution</th>
                </tr>
              </thead>
              <tbody>
                {[...plan.channels].sort((a, b) => b.incrementality - a.incrementality).map((ch, i) => (
                  <tr key={ch.name} className="border-t border-line/20 animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                    <td className="py-3 px-4 font-semibold text-text-primary">{ch.name}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-black text-text-primary">{ch.incrementality}%</span>
                    </td>
                    <td className="py-3 px-4 pl-6">
                      <div className="w-full max-w-[160px] h-2 bg-surface-subtle rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full', ch.incrementality > 60 ? 'bg-eco' : ch.incrementality > 40 ? 'bg-coral' : 'bg-berry')}
                          style={{ width: `${ch.incrementality}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-eco/5 border border-eco/20 rounded-xl p-5">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-eco mt-0.5 flex-shrink-0" />
              <div className="text-sm text-text-secondary">
                <span className="font-semibold text-eco">Reallocation Opportunity:</span>{' '}
                Shifting 10% of budget from {lowest.name} ({lowest.incrementality}% incremental) to{' '}
                {highest.name} ({highest.incrementality}% incremental) would generate an estimated{' '}
                <span className="font-bold text-text-primary">
                  {Math.round((highest.incrementality - lowest.incrementality) * 0.4)}% more incremental conversions
                </span>{' '}
                at the same total spend. {lowest.name} captures mostly organic demand that would convert anyway.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Execution tabs ---

const copyChannelIcons: Record<string, LucideIcon> = {
  target: Target,
  linkedin: Linkedin,
  mail: Mail,
  video: Video,
  'file-text': FileText,
}

// Color lookup: productCards bg class → CSS color value for gradients
const productColorValues: Record<string, string> = {
  'bg-sky-blue': 'rgb(0, 98, 227)',
  'bg-coral': 'rgb(255, 123, 89)',
  'bg-eco': 'rgb(15, 161, 169)',
  'bg-berry': 'rgb(231, 8, 102)',
  'bg-haiti': 'rgb(5, 32, 60)',
}

// Hardcoded features per product for the landing page preview
const productFeatures: Record<string, { icon: LucideIcon; title: string; description: string }[]> = {
  'trip-planner': [
    { icon: Sparkles, title: 'AI-Powered Itineraries', description: 'Get a complete day-by-day plan in seconds, tailored to your interests and budget.' },
    { icon: MapPin, title: 'Local Hidden Gems', description: 'Discover restaurants, viewpoints, and experiences that only locals know about.' },
    { icon: Clock4, title: 'Real-Time Adjustments', description: 'Plans adapt on the fly when weather changes, flights shift, or you change your mind.' },
  ],
  companion: [
    { icon: Bell, title: 'Proactive Alerts', description: 'Gate changes, delays, and disruptions — you\'ll know before the airport screens update.' },
    { icon: MapPin, title: 'Local Recommendations', description: 'Restaurants, attractions, and tips curated for exactly where you are right now.' },
    { icon: Globe, title: 'Language & Currency', description: 'Real-time translation and currency conversion without switching apps.' },
  ],
  ancillaries: [
    { icon: TrendingUp, title: 'Revenue Optimisation', description: 'ML models surface the right ancillary at the right moment in the booking flow.' },
    { icon: Zap, title: 'Personalised Bundles', description: 'Dynamic packaging based on traveller profile, route, and booking history.' },
    { icon: Shield, title: 'Transparent Pricing', description: 'No dark patterns — clear value propositions that build trust and increase attach rates.' },
  ],
  prices: [
    { icon: TrendingUp, title: 'Predictive Analytics', description: 'Know whether prices will rise or fall before your customers do.' },
    { icon: Bell, title: 'Price Alerts', description: 'Automated notifications when fares drop below target thresholds.' },
    { icon: BarChart3, title: 'Market Intelligence', description: 'Competitor pricing data across 52 markets, updated in real time.' },
  ],
  experiences: [
    { icon: Star, title: 'Curated Quality', description: 'Every experience vetted by local experts — no tourist traps, just authentic moments.' },
    { icon: MapPin, title: 'Destination-Matched', description: 'Recommendations tuned to season, weather, and local events happening during your trip.' },
    { icon: Users, title: 'Group-Friendly', description: 'Filter by group size, accessibility needs, and age range for the perfect fit.' },
  ],
  'business-travel': [
    { icon: Shield, title: 'Policy Compliance', description: 'Every booking checked against company travel policy before it\'s confirmed.' },
    { icon: Briefcase, title: 'Expense Integration', description: 'Receipts, per diems, and reports generated automatically — no manual entry.' },
    { icon: Clock4, title: '24/7 Travel Support', description: 'AI-powered rebooking and support that never sleeps, across every timezone.' },
  ],
}

function LandingPagePreview({ headlines, ctas, tagline, productName, productId, color }: {
  headlines: { text: string }[]
  ctas: { text: string }[]
  tagline: string
  productName: string
  productId: string
  color: string
}) {
  const colorValue = productColorValues[color] || productColorValues['bg-sky-blue']
  const features = productFeatures[productId] || productFeatures['trip-planner']

  return (
    <div className="animate-fade-in-up">
      {/* Section label */}
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-4 h-4 text-text-secondary" />
        <span className="text-sm font-bold text-text-secondary uppercase tracking-wide">Preview</span>
      </div>

      {/* Browser chrome frame */}
      <div className="rounded-xl overflow-hidden shadow-lg border border-line/50">
        {/* Browser top bar */}
        <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-3 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-text-secondary font-mono truncate">
            skyvoyager.com/{productId}
          </div>
        </div>

        {/* Page content */}
        <div className="bg-white">
          {/* Hero section */}
          <div
            className="px-8 py-16 text-center text-white relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colorValue} 0%, ${colorValue}dd 50%, ${colorValue}99 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
            <div className="relative z-10 max-w-lg mx-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
                {headlines[0]?.text || productName}
              </h2>
              <p className="text-white/80 text-sm mb-6">
                {tagline}
              </p>
              <button className="inline-flex items-center gap-2 bg-white text-text-primary font-bold px-6 py-3 rounded-lg text-sm shadow-lg hover:shadow-xl transition-shadow">
                {ctas[0]?.text || 'Get Started'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Features section */}
          <div className="px-8 py-12 bg-canvas-contrast">
            <h3 className="text-center text-lg font-bold text-text-primary mb-8">Why {productName}?</h3>
            <div className="grid grid-cols-3 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: `${colorValue}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: colorValue }} />
                    </div>
                    <h4 className="font-bold text-sm text-text-primary mb-1">{f.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{f.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Social proof bar */}
          <div className="px-8 py-6 flex items-center justify-center gap-8 border-y border-line/30">
            {[
              { value: '100M+', label: 'travellers' },
              { value: '4.8★', label: 'app rating' },
              { value: '52', label: 'markets' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-black text-text-primary">{stat.value}</div>
                <div className="text-xs text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Footer CTA — only shown if second headline + CTA exist */}
          {headlines[1] && ctas[1] && (
            <div className="px-8 py-12 text-center" style={{ backgroundColor: 'rgb(5, 32, 60)' }}>
              <h3 className="text-xl font-bold text-white mb-3">{headlines[1].text}</h3>
              <button
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg text-sm text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: colorValue }}
              >
                {ctas[1].text}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CopyStudioSection({ plan, aiData, isGenerating, error, onGenerate, onClearAi }: {
  plan: MarketingPlan
  aiData: ChannelCopy[] | null
  isGenerating: boolean
  error: string | null
  onGenerate: () => void
  onClearAi: () => void
}) {
  const data = aiData ?? plan.copyStudio
  const [activeChannel, setActiveChannel] = useState(data[0]?.channel ?? 'google-ads')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Reset channel selection when data source changes
  useEffect(() => {
    if (data[0] && !data.find(c => c.channel === activeChannel)) {
      setActiveChannel(data[0].channel)
    }
  }, [data, activeChannel])

  const channelData = data.find(c => c.channel === activeChannel) ?? data[0]

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-text-primary mb-1">Copy Studio</h2>
        <p className="text-text-secondary text-sm mb-4">Ready-to-use copy across 5 channels for {plan.productName}</p>
      </div>

      <AiGenerateBar
        isGenerating={isGenerating}
        hasAiData={aiData !== null}
        error={error}
        onGenerate={onGenerate}
        onClearAi={onClearAi}
        label="copy"
      />

      {/* Channel selector */}
      <div className="flex flex-wrap gap-2">
        {data.map((ch) => {
          const Icon = copyChannelIcons[ch.icon] || Globe
          return (
            <button
              key={ch.channel}
              onClick={() => setActiveChannel(ch.channel)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                activeChannel === ch.channel
                  ? 'bg-sky-blue text-white'
                  : 'bg-white text-text-secondary hover:bg-surface-subtle'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {ch.channelLabel}
            </button>
          )
        })}
      </div>

      {/* Copy items */}
      <div className="space-y-3">
        {channelData.items.map((item, i) => {
          const itemId = `${channelData.channel}-${i}`
          return (
            <div
              key={itemId}
              className="bg-white rounded-xl p-5 shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-text-secondary/60">
                      {item.type.replace('-', ' ')}
                    </span>
                    {item.variant && (
                      <span className="text-xs bg-sky-blue/10 text-sky-blue px-2 py-0.5 rounded-full font-semibold">
                        {item.variant}
                      </span>
                    )}
                  </div>
                  <p className="text-text-primary text-sm leading-relaxed whitespace-pre-line">{item.text}</p>
                </div>
                <button
                  onClick={() => handleCopy(item.text, itemId)}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-surface-subtle transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedId === itemId
                    ? <Check className="w-4 h-4 text-eco" />
                    : <Copy className="w-4 h-4 text-text-secondary" />
                  }
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Landing page preview — shown only on landing-page channel with headlines */}
      {activeChannel === 'landing-page' && channelData.items.filter(i => i.type === 'headline').length > 0 && (
        <LandingPagePreview
          headlines={channelData.items.filter(i => i.type === 'headline')}
          ctas={channelData.items.filter(i => i.type === 'cta')}
          tagline={plan.tagline}
          productName={plan.productName}
          productId={plan.productId}
          color={productCards.find(p => p.id === plan.productId)?.color || 'bg-sky-blue'}
        />
      )}

      {/* AI Reasoning */}
      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-sky-blue">Copy Strategy:</span> Travel copy converts when it&apos;s specific, not vague.
            &ldquo;7 days in Japan&rdquo; beats &ldquo;plan your dream trip&rdquo;. Each variant tests a different psychological angle
            — specificity, emotion, speed, social proof — so you can A/B test across channels.
          </div>
        </div>
      </div>
    </div>
  )
}

const formatIcons: Record<string, LucideIcon> = {
  blog: BookOpen,
  video: Video,
  social: Share2,
  email: Mail,
  infographic: BarChart3,
}

const stageColors: Record<string, string> = {
  awareness: 'bg-sky-blue/10 text-sky-blue',
  consideration: 'bg-coral/10 text-coral',
  decision: 'bg-eco/10 text-eco',
}

const typeLabels: Record<string, { label: string; color: string }> = {
  searchable: { label: 'Searchable', color: 'bg-surface-subtle text-text-secondary' },
  shareable: { label: 'Shareable', color: 'bg-berry/10 text-berry' },
  both: { label: 'Search + Share', color: 'bg-haiti/10 text-haiti' },
}

function ContentCalendarSection({ plan, aiData, isGenerating, error, onGenerate, onClearAi }: {
  plan: MarketingPlan
  aiData: ContentCalendarData | null
  isGenerating: boolean
  error: string | null
  onGenerate: () => void
  onClearAi: () => void
}) {
  const data = aiData ?? plan.contentCalendar
  const { pillars, pieces } = data
  const weekRanges = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]]
  const rangeLabels = ['Foundation', 'Growth', 'Expansion', 'Momentum', 'Authority', 'Scale']

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-text-primary mb-1">Content Calendar</h2>
        <p className="text-text-secondary text-sm mb-4">12 weeks of content mapped to pillars for {plan.productName}</p>
      </div>

      <AiGenerateBar
        isGenerating={isGenerating}
        hasAiData={aiData !== null}
        error={error}
        onGenerate={onGenerate}
        onClearAi={onClearAi}
        label="content calendar"
      />

      {/* Pillar legend */}
      <div className="flex flex-wrap gap-3">
        {pillars.map(pillar => (
          <div key={pillar.name} className="flex items-center gap-1.5">
            <div className={cn('w-2.5 h-2.5 rounded-full', pillar.color)} />
            <span className="text-xs font-semibold text-text-secondary">{pillar.name}</span>
          </div>
        ))}
      </div>

      {/* Week groups */}
      {weekRanges.map(([start, end], rangeIdx) => {
        const rangePieces = pieces.filter((p: ContentPiece) => p.week >= start && p.week <= end)
        if (rangePieces.length === 0) return null
        return (
          <div key={start} className="animate-fade-in-up" style={{ animationDelay: `${rangeIdx * 0.1}s` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-xs font-bold text-text-secondary/50 uppercase tracking-wide">
                Week {start}–{end}: {rangeLabels[rangeIdx]}
              </div>
              <div className="flex-1 h-px bg-line" />
            </div>
            <div className="space-y-3 ml-0">
              {rangePieces.map((piece: ContentPiece, i: number) => {
                const FormatIcon = formatIcons[piece.format] || FileText
                const pillar = pillars.find(p => p.name === piece.pillar)
                return (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-surface-subtle w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FormatIcon className="w-4.5 h-4.5 text-text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {pillar && <div className={cn('w-2 h-2 rounded-full flex-shrink-0', pillar.color)} />}
                          <h4 className="font-bold text-text-primary text-sm">{piece.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-surface-subtle text-text-secondary capitalize">
                            {piece.format}
                          </span>
                          <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold capitalize', stageColors[piece.buyerStage])}>
                            {piece.buyerStage}
                          </span>
                          <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold', typeLabels[piece.type].color)}>
                            {typeLabels[piece.type].label}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed">{piece.brief}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* AI Reasoning */}
      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-sky-blue">Content Strategy:</span> Every piece is either searchable (captures demand),
            shareable (creates demand), or both. The calendar front-loads searchable content to build organic traffic,
            then layers in shareable content for social amplification as the audience grows.
          </div>
        </div>
      </div>
    </div>
  )
}

const orbColors: Record<string, { bg: string; text: string; label: string }> = {
  owned: { bg: 'bg-eco', text: 'text-eco', label: 'Owned' },
  rented: { bg: 'bg-coral', text: 'text-coral', label: 'Rented' },
  borrowed: { bg: 'bg-sky-blue', text: 'text-sky-blue', label: 'Borrowed' },
}

const checkCategoryLabels: Record<string, string> = {
  'pre-launch': 'Pre-Launch',
  'launch-day': 'Launch Day',
  'post-launch': 'Post-Launch',
}

// --- Hero Action Preview Components ---

function formatSlackText(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(1, -1)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

function SlackMessagePreview({ message }: { message: { channel: string; body: string } }) {
  return (
    <div className="bg-[#1a1d21] rounded-xl overflow-hidden shadow-sm">
      <div className="border-b border-white/10 px-4 py-3 flex items-center gap-2">
        <Hash className="w-4 h-4 text-white/60" />
        <span className="text-white/80 text-sm font-semibold">{message.channel}</span>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-sky-blue rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">SkyVoyager AI</span>
              <span className="bg-[#4a154b]/30 text-[#e8b4e8] text-xs px-1.5 py-0.5 rounded font-medium">APP</span>
              <span className="text-white/30 text-xs">just now</span>
            </div>
            <div className="mt-2 text-white/80 text-sm whitespace-pre-line leading-relaxed">
              {formatSlackText(message.body)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailDraftPreview({ draft }: { draft: { to: string; subject: string; body: string } }) {
  return (
    <div className="bg-white border border-line rounded-xl overflow-hidden shadow-sm">
      <div className="bg-surface-secondary/50 border-b border-line px-4 py-3 flex items-center gap-2">
        <Mail className="w-4 h-4 text-text-secondary/60" />
        <span className="text-sm font-semibold text-text-primary">New Message</span>
        <div className="ml-auto flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-line" />
          <div className="w-2 h-2 rounded-full bg-line" />
          <div className="w-2 h-2 rounded-full bg-line" />
        </div>
      </div>
      <div className="px-4 py-3 space-y-2 text-sm border-b border-line">
        <div className="flex gap-2">
          <span className="font-semibold text-text-secondary w-16 flex-shrink-0">To:</span>
          <span className="text-text-secondary">{draft.to}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold text-text-secondary w-16 flex-shrink-0">Subject:</span>
          <span className="text-text-primary font-semibold">{draft.subject}</span>
        </div>
      </div>
      <div className="px-4 py-4 text-sm text-text-secondary whitespace-pre-line leading-relaxed">
        {draft.body}
      </div>
    </div>
  )
}

function CreatorListPreview({ creators }: { creators: CreatorProfile[] }) {
  return (
    <div className="bg-white border border-line rounded-xl overflow-hidden shadow-sm">
      <div className="bg-surface-secondary/50 border-b border-line px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-text-primary flex items-center gap-2">
          <Users className="w-4 h-4 text-text-secondary" />
          Creator Shortlist
        </span>
        <span className="text-xs text-text-secondary">{creators.length} creators identified</span>
      </div>
      <div className="divide-y divide-line">
        {creators.map((creator, i) => (
          <div
            key={i}
            className="px-4 py-3 flex items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="w-8 h-8 bg-sky-blue/10 rounded-full flex items-center justify-center text-sky-blue text-xs font-bold flex-shrink-0">
              {creator.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-text-primary">{creator.name}</span>
                <span className="text-xs text-text-secondary">{creator.handle}</span>
              </div>
              <p className="text-xs text-text-secondary">{creator.niche}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-semibold text-text-primary">{creator.followers}</div>
              <div className="flex items-center gap-1 justify-end">
                <div className="w-12 h-1.5 bg-line rounded-full overflow-hidden">
                  <div className="h-full bg-sky-blue rounded-full" style={{ width: `${creator.relevance}%` }} />
                </div>
                <span className="text-xs text-text-secondary">{creator.relevance}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const publishTargets = [
  { name: 'Slack', color: 'bg-[#4A154B]' },
  { name: 'Notion', color: 'bg-black' },
  { name: 'HubSpot', color: 'bg-[#FF7A59]' },
  { name: 'Google Docs', color: 'bg-[#4285F4]' },
]

function PublishToRow({ onPublish, heroType }: { onPublish: (service: string) => void; heroType?: string }) {
  const targets = heroType === 'slack-message'
    ? publishTargets.filter(t => t.name !== 'Slack')
    : publishTargets

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs text-text-secondary font-semibold flex items-center gap-1">
        <Send className="w-3 h-3" /> Publish to:
      </span>
      {targets.map(target => (
        <button
          key={target.name}
          onClick={() => onPublish(target.name)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-line hover:border-sky-blue/30 hover:bg-sky-blue/5 transition-colors text-text-secondary hover:text-text-primary"
        >
          <div className={cn('w-2 h-2 rounded-full', target.color)} />
          {target.name}
        </button>
      ))}
    </div>
  )
}

// --- Geo Growth Section ---

const tierConfig = {
  'launch-now': { label: 'Launch Now', border: 'border-l-eco', badge: 'bg-eco/20 text-eco' },
  'next-quarter': { label: 'Next Quarter', border: 'border-l-coral', badge: 'bg-coral/20 text-coral' },
  'watch': { label: 'Watch', border: 'border-l-line', badge: 'bg-surface-subtle text-text-secondary' },
} as const

const dimensionLabels = [
  { key: 'demand' as const, label: 'Demand' },
  { key: 'competition' as const, label: 'Competition' },
  { key: 'position' as const, label: 'Position' },
  { key: 'regulatory' as const, label: 'Regulatory' },
]

function GeoGrowthSection({ plan }: { plan: MarketingPlan }) {
  const [geoTab, setGeoTab] = useState<'prioritization' | 'signals'>('prioritization')
  const [expandedMarkets, setExpandedMarkets] = useState<Set<string>>(new Set())
  const [loadingMarkets, setLoadingMarkets] = useState<Set<string>>(new Set())
  const [expandedAdCopy, setExpandedAdCopy] = useState<Set<string>>(new Set())
  const [loadingAdCopy, setLoadingAdCopy] = useState<Set<string>>(new Set())
  const [geoToast, setGeoToast] = useState<string | null>(null)

  const markets = geoMarketsByProduct[plan.productId] ?? []
  const insights = geoSignalInsightsByProduct[plan.productId] ?? []
  const tiers: ('launch-now' | 'next-quarter' | 'watch')[] = ['launch-now', 'next-quarter', 'watch']

  const toggleMarket = (key: string) => {
    if (expandedMarkets.has(key)) {
      setExpandedMarkets(prev => { const next = new Set(prev); next.delete(key); return next })
      setExpandedAdCopy(prev => { const next = new Set(prev); next.delete(key); return next })
    } else {
      setLoadingMarkets(prev => new Set(prev).add(key))
      setTimeout(() => {
        setLoadingMarkets(prev => { const next = new Set(prev); next.delete(key); return next })
        setExpandedMarkets(prev => new Set(prev).add(key))
      }, 1500)
    }
  }

  const toggleAdCopy = (key: string) => {
    if (expandedAdCopy.has(key)) {
      setExpandedAdCopy(prev => { const next = new Set(prev); next.delete(key); return next })
    } else {
      setLoadingAdCopy(prev => new Set(prev).add(key))
      setTimeout(() => {
        setLoadingAdCopy(prev => { const next = new Set(prev); next.delete(key); return next })
        setExpandedAdCopy(prev => new Set(prev).add(key))
      }, 1500)
    }
  }

  const handleGeoPublish = (service: string) => {
    setGeoToast(`Published to ${service}`)
    setTimeout(() => setGeoToast(null), 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-text-primary mb-1">Geo Growth</h2>
        <p className="text-text-secondary text-sm mb-4">Market prioritization and entry playbooks for {plan.productName}</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-surface-subtle rounded-lg p-1">
        {([
          { id: 'prioritization' as const, label: 'Market Prioritization' },
          { id: 'signals' as const, label: 'Signal Analysis' },
        ]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setGeoTab(tab.id)}
            className={cn(
              'flex-1 px-3 py-2 rounded-md text-sm font-semibold transition-colors',
              geoTab === tab.id
                ? 'bg-white text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Market Prioritization Tab */}
      {geoTab === 'prioritization' && (
        <div className="space-y-8 animate-fade-in">
          {tiers.map((tier) => {
            const tierMarkets = markets.filter(m => m.tier === tier)
            if (tierMarkets.length === 0) return null
            const config = tierConfig[tier]
            return (
              <div key={tier}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', config.badge)}>{config.label}</span>
                  <span className="text-xs text-text-secondary">{tierMarkets.length} market{tierMarkets.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="space-y-3">
                  {tierMarkets.map((market, i) => (
                    <GeoMarketCard
                      key={market.country}
                      market={market}
                      config={config}
                      index={i}
                      isExpanded={expandedMarkets.has(market.country)}
                      isLoading={loadingMarkets.has(market.country)}
                      isAdCopyExpanded={expandedAdCopy.has(market.country)}
                      isAdCopyLoading={loadingAdCopy.has(market.country)}
                      onToggleMarket={() => toggleMarket(market.country)}
                      onToggleAdCopy={() => toggleAdCopy(market.country)}
                      onPublish={handleGeoPublish}
                      onCopyToast={(msg: string) => { setGeoToast(msg); setTimeout(() => setGeoToast(null), 3000) }}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Signal Analysis Tab */}
      {geoTab === 'signals' && (
        <GeoSignalAnalysis plan={plan} markets={markets} insights={insights} />
      )}

      {/* Toast */}
      {geoToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-eco text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up">
          <Check className="w-4 h-4" />
          <span className="text-sm font-semibold">{geoToast}</span>
        </div>
      )}
    </div>
  )
}

function GeoMarketCard({ market, config, index, isExpanded, isLoading, isAdCopyExpanded, isAdCopyLoading, onToggleMarket, onToggleAdCopy, onPublish, onCopyToast }: {
  market: GeoMarket
  config: { label: string; border: string; badge: string }
  index: number
  isExpanded: boolean
  isLoading: boolean
  isAdCopyExpanded: boolean
  isAdCopyLoading: boolean
  onToggleMarket: () => void
  onToggleAdCopy: () => void
  onPublish: (service: string) => void
  onCopyToast: (msg: string) => void
}) {
  return (
    <div
      className={cn('bg-white rounded-xl shadow-sm border-l-4 overflow-hidden animate-fade-in-up', config.border)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{market.flag}</span>
            <div>
              <h3 className="font-bold text-text-primary">{market.country}</h3>
              <p className="text-xs text-text-secondary">{market.region}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-text-primary">{market.pmfScore}</div>
            <div className="text-xs text-text-secondary">PMF Score</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
          {dimensionLabels.map((dim) => (
            <div key={dim.key} className="flex items-center gap-2">
              <span className="text-xs text-text-secondary w-20 shrink-0">{dim.label}</span>
              <div className="flex-1 h-2 bg-surface-subtle rounded-full overflow-hidden">
                <div className="h-full bg-sky-blue rounded-full transition-all duration-500" style={{ width: `${market.dimensions[dim.key]}%` }} />
              </div>
              <span className="text-xs font-semibold text-text-primary w-7 text-right">{market.dimensions[dim.key]}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-text-secondary mb-3">{market.insight}</p>

        <button
          onClick={onToggleMarket}
          disabled={isLoading}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
            isExpanded ? 'bg-sky-blue/10 text-sky-blue' : 'bg-sky-blue text-white hover:bg-sky-blue/90'
          )}
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Analyzing market...</>
          ) : isExpanded ? (
            <><ChevronDown className="w-4 h-4" />Hide entry playbook</>
          ) : (
            <><Sparkles className="w-4 h-4" />View entry playbook</>
          )}
        </button>
      </div>

      {isExpanded && (
        <GeoPlaybookExpanded
          market={market}
          isAdCopyExpanded={isAdCopyExpanded}
          isAdCopyLoading={isAdCopyLoading}
          onToggleAdCopy={onToggleAdCopy}
          onPublish={onPublish}
          onCopyToast={onCopyToast}
        />
      )}
    </div>
  )
}

function GeoPlaybookExpanded({ market, isAdCopyExpanded, isAdCopyLoading, onToggleAdCopy, onPublish, onCopyToast }: {
  market: GeoMarket
  isAdCopyExpanded: boolean
  isAdCopyLoading: boolean
  onToggleAdCopy: () => void
  onPublish: (service: string) => void
  onCopyToast: (msg: string) => void
}) {
  return (
    <div className="border-t border-line bg-surface-secondary/30 p-5 space-y-5 animate-fade-in-up">
      {/* Localized Channel Mix */}
      <div>
        <h4 className="font-bold text-text-primary text-sm mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-sky-blue" />
          Localized Channel Mix
        </h4>
        <div className="space-y-2">
          {market.playbook.channels.map((ch) => {
            const Icon = channelIcons[ch.icon] ?? Globe
            return (
              <div key={ch.name} className="flex items-center gap-3 bg-white rounded-lg p-3">
                <Icon className="w-4 h-4 text-sky-blue shrink-0" />
                <span className="font-semibold text-sm text-text-primary w-28 shrink-0">{ch.name}</span>
                <div className="flex-1 h-2 bg-surface-subtle rounded-full overflow-hidden">
                  <div className="h-full bg-sky-blue/60 rounded-full" style={{ width: `${ch.budgetPct}%` }} />
                </div>
                <span className="text-xs font-bold text-text-primary w-10 text-right">{ch.budgetPct}%</span>
                <span className="text-xs text-text-secondary hidden md:block flex-1">{ch.note}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Local Competitors */}
      <div>
        <h4 className="font-bold text-text-primary text-sm mb-3 flex items-center gap-2">
          <Swords className="w-4 h-4 text-coral" />
          Local Competitor Positioning
        </h4>
        <div className="space-y-2">
          {market.playbook.competitors.map((comp) => (
            <div key={comp.name} className="bg-white rounded-lg p-3">
              <span className="font-semibold text-sm text-text-primary">{comp.name}</span>
              <p className="text-xs text-text-secondary mb-1"><strong>Local strength:</strong> {comp.localStrength}</p>
              <p className="text-xs text-eco"><strong>Our angle:</strong> {comp.angle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Messaging Angles */}
      <div>
        <h4 className="font-bold text-text-primary text-sm mb-3 flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-berry" />
          Messaging Angles
        </h4>
        <div className="space-y-1.5">
          {market.playbook.messaging.map((msg, j) => (
            <div key={j} className="flex items-start gap-2 bg-white rounded-lg p-3">
              <span className="text-xs font-bold text-berry bg-berry/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">{j + 1}</span>
              <span className="text-sm text-text-primary">{msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Notes */}
      <div>
        <h4 className="font-bold text-text-primary text-sm mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-warning" />
          Regulatory Notes
        </h4>
        <div className="space-y-1.5">
          {market.playbook.regulatory.map((note, j) => (
            <div key={j} className="flex items-start gap-2 bg-warning/5 border border-warning/20 rounded-lg p-3">
              <span className="text-warning text-xs mt-0.5">&#9888;</span>
              <span className="text-sm text-text-primary">{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Brief */}
      <div>
        <h4 className="font-bold text-text-primary text-sm mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-sky-blue" />
          Content Brief
        </h4>
        <div className="space-y-1.5">
          {market.playbook.contentBrief.map((item, j) => (
            <div key={j} className="flex items-start gap-2 bg-white rounded-lg p-3">
              <span className="text-xs font-bold text-sky-blue bg-sky-blue/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0">{j + 1}</span>
              <span className="text-sm text-text-primary">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Action: Draft localized Google Ads copy */}
      <div>
        <button
          onClick={onToggleAdCopy}
          disabled={isAdCopyLoading}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
            isAdCopyExpanded ? 'bg-sky-blue/10 text-sky-blue' : 'bg-sky-blue text-white hover:bg-sky-blue/90'
          )}
        >
          {isAdCopyLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Drafting localized ads...</>
          ) : isAdCopyExpanded ? (
            <><ChevronDown className="w-4 h-4" />Hide ad variants</>
          ) : (
            <><Sparkles className="w-4 h-4" />Draft localized Google Ads copy</>
          )}
        </button>

        {isAdCopyExpanded && (
          <div className="mt-3 space-y-2 animate-fade-in-up">
            {market.playbook.adVariants.map((ad, j) => (
              <div key={j} className="bg-white rounded-lg p-4 border border-line">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-bold text-sky-blue text-sm mb-1">{ad.headline}</p>
                    <p className="text-sm text-text-secondary">{ad.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${ad.headline}\n${ad.description}`)
                      onCopyToast('Copied to clipboard')
                    }}
                    className="ml-3 p-1.5 rounded-md hover:bg-surface-subtle transition-colors text-text-secondary hover:text-text-primary"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-text-secondary">
                  <span className="text-eco">Ad {j + 1} of {market.playbook.adVariants.length}</span>
                  <span className="mx-1">·</span>
                  <span>Google Ads format</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Publish to row */}
      <PublishToRow onPublish={onPublish} />
    </div>
  )
}

function GeoSignalAnalysis({ plan, markets, insights }: { plan: MarketingPlan; markets: GeoMarket[]; insights: { text: string; type: string }[] }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* AI Reasoning callout */}
      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-sky-blue shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-text-primary text-sm mb-2">PMF Scoring Methodology</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              SkyVoyager&apos;s PMF score combines 4 weighted signals: <strong>Demand</strong> (search volume, travel spend, growth trajectory),
              <strong> Competition</strong> (inverse — higher means less competition), <strong>Position</strong> (SkyVoyager brand awareness and existing traffic),
              and <strong>Regulatory</strong> (ease of market entry, data laws, payment infrastructure).
              Markets scoring 75+ are recommended for immediate launch. 55-74 need preparation. Below 55 are monitoring only.
            </p>
          </div>
        </div>
      </div>

      {/* Dimension breakdown table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-line">
          <h3 className="font-bold text-text-primary">Market Dimension Breakdown</h3>
          <p className="text-xs text-text-secondary mt-1">All markets ranked by overall PMF score</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-subtle">
                <th className="text-left px-4 py-3 font-semibold text-text-secondary">Market</th>
                <th className="text-center px-3 py-3 font-semibold text-text-secondary">PMF</th>
                <th className="text-center px-3 py-3 font-semibold text-text-secondary">Demand</th>
                <th className="text-center px-3 py-3 font-semibold text-text-secondary">Competition</th>
                <th className="text-center px-3 py-3 font-semibold text-text-secondary">Position</th>
                <th className="text-center px-3 py-3 font-semibold text-text-secondary">Regulatory</th>
                <th className="text-center px-3 py-3 font-semibold text-text-secondary">Tier</th>
              </tr>
            </thead>
            <tbody>
              {[...markets].sort((a, b) => b.pmfScore - a.pmfScore).map((market, i) => {
                const config = tierConfig[market.tier]
                return (
                  <tr key={market.country} className={cn('border-b border-line last:border-0 animate-fade-in-up', i % 2 === 0 ? 'bg-white' : 'bg-surface-secondary/20')} style={{ animationDelay: `${i * 0.05}s` }}>
                    <td className="px-4 py-3 font-semibold text-text-primary">
                      <span className="mr-2">{market.flag}</span>{market.country}
                    </td>
                    <td className="text-center px-3 py-3 font-black text-text-primary">{market.pmfScore}</td>
                    {dimensionLabels.map((dim) => (
                      <td key={dim.key} className="text-center px-3 py-3">
                        <span className={cn('font-semibold', market.dimensions[dim.key] >= 80 ? 'text-eco' : market.dimensions[dim.key] >= 60 ? 'text-text-primary' : 'text-coral')}>
                          {market.dimensions[dim.key]}
                        </span>
                      </td>
                    ))}
                    <td className="text-center px-3 py-3">
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-bold', config.badge)}>{config.label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Non-obvious insights */}
      {insights.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-text-primary">Key Insights</h3>
          {insights.map((insight, i) => (
            <div
              key={i}
              className={cn(
                'rounded-xl p-4 border animate-fade-in-up',
                insight.type === 'opportunity' ? 'bg-eco/5 border-eco/20' :
                insight.type === 'caution' ? 'bg-warning/5 border-warning/20' :
                'bg-sky-blue/5 border-sky-blue/20'
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{insight.type === 'opportunity' ? '🟢' : insight.type === 'caution' ? '🟡' : '🔵'}</span>
                <p className="text-sm text-text-primary leading-relaxed">{insight.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Reasoning - launch sequence */}
      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-sky-blue shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-text-primary text-sm mb-2">Recommended Launch Sequence</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Based on signal analysis, {plan.productName} should enter {markets.filter(m => m.tier === 'launch-now').map(m => m.country).join(', ')} immediately
              where PMF scores exceed 75 and SkyVoyager has existing market presence.
              {markets.filter(m => m.tier === 'next-quarter').length > 0 && (
                <> Prepare {markets.filter(m => m.tier === 'next-quarter').map(m => m.country).join(', ')} for next quarter — these markets show strong demand but require localization or regulatory preparation.</>
              )}
              {markets.filter(m => m.tier === 'watch').length > 0 && (
                <> Monitor {markets.filter(m => m.tier === 'watch').map(m => m.country).join(', ')} for emerging signals before committing resources.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LaunchPlaybookSection({ plan, aiData, isGenerating, error, onGenerate, onClearAi }: {
  plan: MarketingPlan
  aiData: LaunchPlaybookData | null
  isGenerating: boolean
  error: string | null
  onGenerate: () => void
  onClearAi: () => void
}) {
  const data = aiData ?? plan.launchPlaybook
  const { phases, checklist, pressAngles } = data
  const checkCategories = ['pre-launch', 'launch-day', 'post-launch'] as const

  // Hero action state
  const [expandedHeroes, setExpandedHeroes] = useState<Set<string>>(new Set())
  const [loadingHeroes, setLoadingHeroes] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<string | null>(null)

  const toggleHero = (key: string) => {
    if (expandedHeroes.has(key)) {
      setExpandedHeroes(prev => { const next = new Set(prev); next.delete(key); return next })
    } else {
      setLoadingHeroes(prev => new Set(prev).add(key))
      setTimeout(() => {
        setLoadingHeroes(prev => { const next = new Set(prev); next.delete(key); return next })
        setExpandedHeroes(prev => new Set(prev).add(key))
      }, 1500)
    }
  }

  const handlePublish = (service: string) => {
    setToast(`Published to ${service}`)
    setTimeout(() => setToast(null), 3000)
  }

  // Landing page data for LP hero type
  const landingPageChannel = plan.copyStudio.find(c => c.channel === 'landing-page')
  const lpHeadlines = landingPageChannel?.items.filter(i => i.type === 'headline') ?? []
  const lpCtas = landingPageChannel?.items.filter(i => i.type === 'cta') ?? []
  const productColor = productCards.find(p => p.id === plan.productId)?.color ?? 'bg-sky-blue'

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-text-primary mb-1">Launch Playbook</h2>
        <p className="text-text-secondary text-sm mb-4">5-phase launch using the ORB framework for {plan.productName}</p>
      </div>

      <AiGenerateBar
        isGenerating={isGenerating}
        hasAiData={aiData !== null}
        error={error}
        onGenerate={onGenerate}
        onClearAi={onClearAi}
        label="launch playbook"
      />

      {/* ORB legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(orbColors).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={cn('w-2.5 h-2.5 rounded-full', val.bg)} />
            <span className="text-xs font-semibold text-text-secondary">{val.label} Channels</span>
          </div>
        ))}
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {phases.map((phase, i) => {
          const orb = orbColors[phase.channelType]
          return (
            <div
              key={phase.phase}
              className="bg-white rounded-xl p-5 shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold',
                  orb.bg
                )}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-text-primary text-sm">{phase.phase}</h3>
                    <span className="text-xs text-text-secondary">{phase.timeline}</span>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold', `${orb.bg}/10`, orb.text)}>
                      {orb.label}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary italic mb-3">&ldquo;{phase.messaging}&rdquo;</p>
                  <div className="space-y-2">
                    {phase.actions.map((action, j) => {
                      const heroKey = `${i}-${j}`

                      // Plain string action
                      if (typeof action === 'string') {
                        return (
                          <div key={j} className="flex gap-2 text-sm text-text-secondary">
                            <span className="text-text-secondary/40 flex-shrink-0">&#x2022;</span>
                            {action}
                          </div>
                        )
                      }

                      // PlaybookAction with potential hero
                      const isExpanded = expandedHeroes.has(heroKey)
                      const isLoading = loadingHeroes.has(heroKey)

                      return (
                        <div key={j} className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <span className="text-text-secondary/40 flex-shrink-0 mt-0.5">&#x2022;</span>
                            <div className="flex-1">
                              <span className="text-text-secondary">{action.text}</span>
                              {action.hero && (
                                <button
                                  onClick={() => toggleHero(heroKey)}
                                  className={cn(
                                    'ml-2 inline-flex items-center gap-1 text-xs font-semibold transition-colors',
                                    isExpanded
                                      ? 'text-text-secondary hover:text-text-primary'
                                      : 'text-sky-blue hover:text-sky-blue/80'
                                  )}
                                >
                                  {isLoading ? (
                                    <>
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                      Drafting...
                                    </>
                                  ) : isExpanded ? (
                                    <>
                                      <ChevronDown className="w-3 h-3 rotate-180 transition-transform" />
                                      Hide
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="w-3 h-3" />
                                      {action.hero.label}
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          {isExpanded && action.hero && (
                            <div className="ml-5 animate-fade-in-up space-y-3">
                              {action.hero.type === 'slack-message' && action.slackMessage && (
                                <SlackMessagePreview message={action.slackMessage} />
                              )}
                              {action.hero.type === 'email-draft' && action.emailDraft && (
                                <EmailDraftPreview draft={action.emailDraft} />
                              )}
                              {action.hero.type === 'creator-list' && action.creators && (
                                <CreatorListPreview creators={action.creators} />
                              )}
                              {action.hero.type === 'landing-page' && (
                                <div className="max-w-2xl">
                                  <LandingPagePreview
                                    headlines={lpHeadlines}
                                    ctas={lpCtas}
                                    tagline={plan.tagline}
                                    productName={plan.productName}
                                    productId={plan.productId}
                                    color={productColor}
                                  />
                                </div>
                              )}
                              <PublishToRow onPublish={handlePublish} heroType={action.hero.type} />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Launch Checklist */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-eco" /> Launch Checklist
        </h3>
        <div className="space-y-4">
          {checkCategories.map(cat => {
            const items = checklist.filter(c => c.category === cat)
            if (items.length === 0) return null
            return (
              <div key={cat}>
                <div className="text-xs font-bold uppercase tracking-wide text-text-secondary/50 mb-2">
                  {checkCategoryLabels[cat]}
                </div>
                <div className="space-y-2">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <div className="w-4 h-4 border-2 border-line rounded flex-shrink-0 mt-0.5" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Press Angles */}
      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary">
            <span className="font-semibold text-sky-blue">Press Angles:</span>
            <ul className="mt-2 space-y-1.5">
              {pressAngles.map((angle, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-sky-blue flex-shrink-0">&rsaquo;</span>
                  {angle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Publish toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-eco text-white px-4 py-3 rounded-xl shadow-lg animate-fade-in flex items-center gap-2 z-50">
          <Check className="w-4 h-4" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}
    </div>
  )
}

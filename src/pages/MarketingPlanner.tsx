import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
  Sparkles,
  Target,
  Clock,
  BarChart3,
  Lightbulb,
  PieChart,
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
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { marketingPlans } from '../data/marketing-plans'
import type { MarketingPlan, Tactic, ContentPiece } from '../data/marketing-plans'

type ViewState = 'select' | 'generating' | 'plan'

const productCards = [
  { id: 'trip-planner', label: 'AI Trip Planner', color: 'bg-sky-blue', route: '/trip-planner' },
  { id: 'companion', label: 'In-Trip Companion', color: 'bg-coral', route: '/companion' },
  { id: 'ancillaries', label: 'Smart Ancillaries', color: 'bg-eco', route: '/ancillaries' },
  { id: 'prices', label: 'Price Intelligence', color: 'bg-berry', route: '/prices' },
  { id: 'experiences', label: 'Tours & Experiences', color: 'bg-haiti', route: '/experiences' },
  { id: 'business-travel', label: 'Business Travel Agent', color: 'bg-sky-blue', route: '/business-travel' },
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

// --- Plan view ---

const sections = [
  { id: 'overview', label: 'Overview', icon: Target, group: 'strategy' as const },
  { id: 'channels', label: 'Channels', icon: BarChart3, group: 'strategy' as const },
  { id: 'timeline', label: '90-Day Plan', icon: Clock, group: 'strategy' as const },
  { id: 'tactics', label: 'Top Tactics', icon: Lightbulb, group: 'strategy' as const },
  { id: 'budget', label: 'Budget', icon: PieChart, group: 'strategy' as const },
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
            {activeSection === 'channels' && <ChannelsSection plan={plan} />}
            {activeSection === 'timeline' && <TimelineSection plan={plan} />}
            {activeSection === 'tactics' && (
              <TacticsSection plan={plan} activeTactic={activeTactic} setActiveTactic={setActiveTactic} />
            )}
            {activeSection === 'budget' && <BudgetSection plan={plan} />}
            {activeSection === 'copy-studio' && <CopyStudioSection plan={plan} />}
            {activeSection === 'content-calendar' && <ContentCalendarSection plan={plan} />}
            {activeSection === 'launch-playbook' && <LaunchPlaybookSection plan={plan} />}
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

function ChannelsSection({ plan }: { plan: MarketingPlan }) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-black text-text-primary mb-2">Recommended Channels</h2>
      <p className="text-text-secondary text-sm mb-4">Ranked by fit for {plan.productName}</p>

      {plan.channels.map((channel, i) => {
        const Icon = channelIcons[channel.icon] || Search
        return (
          <div
            key={channel.name}
            className="bg-white rounded-xl p-5 shadow-sm animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                channel.fit === 'high' ? 'bg-sky-blue' : 'bg-surface-subtle'
              )}>
                <Icon className={cn('w-5 h-5', channel.fit === 'high' ? 'text-white' : 'text-text-secondary')} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-text-primary">{channel.name}</h3>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-semibold',
                    channel.fit === 'high' ? 'bg-eco/10 text-eco' : 'bg-surface-subtle text-text-secondary'
                  )}>
                    {channel.fit} fit
                  </span>
                </div>
                <p className="text-sm text-text-secondary mt-1">{channel.reason}</p>
              </div>
            </div>
          </div>
        )
      })}
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

function BudgetSection({ plan }: { plan: MarketingPlan }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-black text-text-primary mb-2">Budget Allocation</h2>
      <p className="text-text-secondary text-sm mb-4">Recommended spend distribution for maximum ROI</p>

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

      <div className="bg-sky-blue/5 border border-sky-blue/20 rounded-xl p-5">
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

function CopyStudioSection({ plan }: { plan: MarketingPlan }) {
  const [activeChannel, setActiveChannel] = useState(plan.copyStudio[0]?.channel ?? 'google-ads')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const channelData = plan.copyStudio.find(c => c.channel === activeChannel) ?? plan.copyStudio[0]

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

      {/* Channel selector */}
      <div className="flex flex-wrap gap-2">
        {plan.copyStudio.map((ch) => {
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

function ContentCalendarSection({ plan }: { plan: MarketingPlan }) {
  const { pillars, pieces } = plan.contentCalendar
  const weekRanges = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]]
  const rangeLabels = ['Foundation', 'Growth', 'Expansion', 'Momentum', 'Authority', 'Scale']

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-text-primary mb-1">Content Calendar</h2>
        <p className="text-text-secondary text-sm mb-4">12 weeks of content mapped to pillars for {plan.productName}</p>
      </div>

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

function LaunchPlaybookSection({ plan }: { plan: MarketingPlan }) {
  const { phases, checklist, pressAngles } = plan.launchPlaybook
  const checkCategories = ['pre-launch', 'launch-day', 'post-launch'] as const

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-text-primary mb-1">Launch Playbook</h2>
        <p className="text-text-secondary text-sm mb-4">5-phase launch using the ORB framework for {plan.productName}</p>
      </div>

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
                  <div className="space-y-1.5">
                    {phase.actions.map((action, j) => (
                      <div key={j} className="flex gap-2 text-sm text-text-secondary">
                        <span className="text-text-secondary/40 flex-shrink-0">&#x2022;</span>
                        {action}
                      </div>
                    ))}
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
    </div>
  )
}

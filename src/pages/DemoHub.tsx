import { Link } from 'react-router'
import { Plane, Map, ShoppingBag, TrendingUp, Compass, Briefcase, Megaphone } from 'lucide-react'

const demos = [
  {
    to: '/trip-planner',
    icon: Map,
    title: 'AI Trip Planner',
    description: 'Conversational trip planning that replaces 10 browser tabs with one intelligent interface.',
    phase: 'Discover + Plan',
    color: 'bg-sky-blue',
  },
  {
    to: '/companion',
    icon: Compass,
    title: 'In-Trip Companion',
    description: 'A post-booking travel assistant that keeps travellers engaged during their trip.',
    phase: 'Manage + Trip',
    color: 'bg-coral',
  },
  {
    to: '/ancillaries',
    icon: ShoppingBag,
    title: 'Smart Ancillaries',
    description: 'AI-powered personalised upselling after booking. Pure margin revenue.',
    phase: 'Book → Prepare',
    color: 'bg-eco',
  },
  {
    to: '/prices',
    icon: TrendingUp,
    title: 'Price Intelligence',
    description: 'Predictive pricing guidance and price freeze. Fintech meets travel.',
    phase: 'Plan + Book',
    color: 'bg-berry',
  },
  {
    to: '/experiences',
    icon: Plane,
    title: 'Tours & Experiences',
    description: 'Activity metasearch — compare prices across Viator, GetYourGuide, and direct.',
    phase: 'Trip',
    color: 'bg-haiti',
  },
  {
    to: '/business-travel',
    icon: Briefcase,
    title: 'Business Travel Agent',
    description: 'AI-powered SMB business travel — natural language booking with Slack approvals and disruption support.',
    phase: 'Full Journey (B2B)',
    color: 'bg-sky-blue',
  },
  {
    to: '/marketing',
    icon: Megaphone,
    title: 'Marketing Planner',
    description: 'Pick any product idea and generate a full marketing plan — channels, tactics, timeline, and budget.',
    phase: 'Go-to-Market',
    color: 'bg-coral',
  },
]

export default function DemoHub() {
  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Hero */}
      <div className="bg-haiti text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 animate-fade-in-up">
            One engineer. Three hours.{' '}
            <span className="text-sky-blue">Seven products.</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Seven product demos exploring Skyscanner as a travel operating system.
          </p>
        </div>
      </div>

      {/* Strategy line */}
      <div className="max-w-3xl mx-auto px-6 -mt-4 mb-2 text-center">
        <p className="text-text-secondary text-sm py-4">
          Each demo maps to an opportunity on the New Ideas long list. Together they show what Skyscanner looks like as a travel operating system, not just a flight search box.
        </p>
      </div>

      {/* Demo Cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, i) => (
            <Link
              key={demo.to}
              to={demo.to}
              className={`group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden animate-fade-in-up stagger-${i + 1}`}
            >
              <div className={`${demo.color} h-2`} />
              <div className="p-6">
                <div className={`${demo.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <demo.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                  {demo.phase}
                </span>
                <h2 className="text-xl font-bold text-text-primary mt-1 mb-2 group-hover:text-sky-blue transition-colors">
                  {demo.title}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {demo.description}
                </p>
                <div className="mt-4 flex items-center text-sky-blue font-semibold text-sm">
                  Launch demo
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

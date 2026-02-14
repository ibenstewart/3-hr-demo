import { Link } from 'react-router'
import { Plane, Map, ShoppingBag, TrendingUp, Compass, Briefcase } from 'lucide-react'

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
]

export default function DemoHub() {
  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Hero */}
      <div className="bg-haiti text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sky-blue font-bold text-sm tracking-wide uppercase mb-4 animate-fade-in-up">
            Weekend Build Challenge
          </p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 animate-fade-in-up stagger-1">
            What if one engineer could build{' '}
            <span className="text-sky-blue">all of this</span>{' '}
            in a weekend?
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Six product prototypes that tell the story of Skyscanner as a{' '}
            <span className="text-white font-semibold">travel operating system</span> — consumer and business, not just a flight comparison site.
          </p>
        </div>
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

        {/* Narrative Arc */}
        <div className="mt-16 mb-12 text-center">
          <h3 className="text-lg font-bold text-text-primary mb-6">The Traveller Journey</h3>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="bg-sky-blue text-white px-4 py-2 rounded-full font-semibold">Discover + Plan</span>
            <span className="text-line">→</span>
            <span className="bg-berry text-white px-4 py-2 rounded-full font-semibold">Plan + Book</span>
            <span className="text-line">→</span>
            <span className="bg-eco text-white px-4 py-2 rounded-full font-semibold">Book → Prepare</span>
            <span className="text-line">→</span>
            <span className="bg-coral text-white px-4 py-2 rounded-full font-semibold">Manage + Trip</span>
            <span className="text-line">→</span>
            <span className="bg-haiti text-white px-4 py-2 rounded-full font-semibold">Trip</span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <span className="text-line">+</span>
            <span className="bg-sky-blue text-white px-4 py-2 rounded-full font-semibold">Full Journey (B2B)</span>
          </div>
          <p className="text-text-secondary text-sm mt-4 max-w-lg mx-auto">
            Together, these demos prove Skyscanner can own the entire traveller journey — consumer and business.
            One person built all six in a weekend.
          </p>
        </div>
      </div>
    </div>
  )
}

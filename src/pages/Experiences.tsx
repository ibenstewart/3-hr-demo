import { useState } from 'react'
import { Link } from 'react-router'
import { Star, Clock, ArrowRight, Map } from 'lucide-react'
import { cn } from '../lib/utils'
import { experiences, type Experience } from '../data/experiences'

const categories = ['All', 'Culture', 'Food & Drink', 'Outdoors', 'Tours', 'Nightlife', 'Family'] as const
const sortOptions = ['Recommended', 'Price: low to high', 'Price: high to low', 'Rating'] as const

function ExperienceCard({ experience }: { experience: Experience }) {
  const savings = Math.max(...experience.prices.map(p => p.price)) - experience.bestPrice
  return (
    <Link
      to={`/experiences/${experience.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden"
    >
      <div className="relative h-48 bg-canvas-contrast overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full text-text-primary">
          {experience.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-text-primary group-hover:text-sky-blue transition-colors line-clamp-2">
          {experience.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-star text-star" />
            <span className="text-sm font-bold">{experience.rating}</span>
          </div>
          <span className="text-xs text-text-secondary">({experience.reviewCount.toLocaleString()} reviews)</span>
          <span className="text-text-secondary">·</span>
          <div className="flex items-center gap-1 text-text-secondary">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{experience.duration}</span>
          </div>
        </div>
        {/* Price comparison */}
        <div className="mt-3 space-y-1">
          {experience.prices.map((p) => (
            <div key={p.provider} className={cn(
              "flex justify-between text-xs",
              p.price === experience.bestPrice ? "font-bold text-success" : "text-text-secondary"
            )}>
              <span>{p.provider}</span>
              <span>{p.currency === 'GBP' ? '£' : '€'}{p.price}</span>
            </div>
          ))}
        </div>
        {savings > 0 && (
          <div className="mt-2 bg-success-fill text-success text-xs font-bold px-2 py-1 rounded-full inline-block">
            Save £{savings} vs highest
          </div>
        )}
        <div className="mt-3 flex items-center text-sky-blue font-semibold text-sm">
          View deal <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export default function Experiences() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('Recommended')

  const filtered = experiences
    .filter(e => selectedCategory === 'All' || e.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'Price: low to high') return a.bestPrice - b.bestPrice
      if (sortBy === 'Price: high to low') return b.bestPrice - a.bestPrice
      if (sortBy === 'Rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Hero */}
      <div className="relative bg-haiti text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-haiti to-haiti/80" />
        <img
          src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&h=400&fit=crop"
          alt="Barcelona"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
            <Map className="w-4 h-4" />
            <span>Barcelona, Spain</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">Things to do in Barcelona</h1>
          <p className="text-white/70">
            Compare prices across Viator, GetYourGuide, and direct operators.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                  selectedCategory === cat
                    ? "bg-sky-blue text-white"
                    : "bg-white text-text-secondary hover:bg-surface-highlight"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-line rounded-lg px-3 py-2 text-sm text-text-primary bg-white"
            >
              {sortOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exp, i) => (
            <div key={exp.id} className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}>
              <ExperienceCard experience={exp} />
            </div>
          ))}
        </div>

        {/* Smart Suggestions */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-text-primary mb-2">Based on your Barcelona trip</h2>
          <p className="text-text-secondary text-sm mb-6">
            Since you're visiting Park Güell on Day 2, you might also like these:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Gaudí Walking Tour', note: 'Combines 3 sites, saves 2 hours vs visiting separately', price: '£45' },
              { title: 'Modernisme Architecture Tour', note: 'See Casa Batlló + Casa Milà + Hospital Sant Pau', price: '£38' },
              { title: 'Gaudí & Sagrada Família Combo', note: 'Skip-the-line for both + guide', price: '£62' },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-4 shadow-sm border border-surface-subtle">
                <h3 className="font-bold text-text-primary text-sm">{s.title}</h3>
                <p className="text-xs text-text-secondary mt-1">{s.note}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-sky-blue">{s.price}</span>
                  <span className="text-xs text-sky-blue font-semibold">View deal →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-demo banner */}
        <Link
          to="/trip-planner"
          className="mt-12 mb-8 block bg-gradient-to-r from-sky-blue to-haiti text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Planning a trip?</h3>
              <p className="text-white/80 text-sm mt-1">
                Our AI Trip Planner can add experiences to your itinerary automatically.
              </p>
            </div>
            <div className="text-white font-semibold flex items-center gap-1">
              Try it <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

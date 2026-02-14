import { useParams, Link } from 'react-router'
import { ArrowLeft, Star, Clock, MapPin, Check, X, Calendar } from 'lucide-react'
import { experiences } from '../data/experiences'

export default function ExperienceDetail() {
  const { id } = useParams()
  const experience = experiences.find(e => e.id === id)

  if (!experience) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Experience not found</h1>
        <Link to="/experiences" className="text-sky-blue font-semibold mt-4 inline-block">
          ← Back to experiences
        </Link>
      </div>
    )
  }

  const highestPrice = Math.max(...experience.prices.map(p => p.price))

  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Back nav */}
      <div className="bg-white border-b border-line">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <Link to="/experiences" className="flex items-center gap-2 text-sky-blue font-semibold text-sm hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Barcelona experiences
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="rounded-xl overflow-hidden h-72 md:h-96">
              <img src={experience.image} alt={experience.title} className="w-full h-full object-cover" />
            </div>

            {/* Title & meta */}
            <div>
              <span className="text-xs font-bold text-sky-blue uppercase tracking-wide">{experience.category}</span>
              <h1 className="text-2xl md:text-3xl font-black text-text-primary mt-1">{experience.title}</h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-star text-star" />
                  <span className="font-bold">{experience.rating}</span>
                  <span className="text-text-secondary text-sm">({experience.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-text-secondary">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{experience.duration}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-2">About this experience</h2>
              <p className="text-text-secondary leading-relaxed">{experience.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-3">Highlights</h2>
              <ul className="space-y-2">
                {experience.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Included / Not included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-bold text-text-primary mb-3">What's included</h2>
                <ul className="space-y-2">
                  {experience.included.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-text-secondary">
                      <Check className="w-4 h-4 text-success flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary mb-3">Not included</h2>
                <ul className="space-y-2">
                  {experience.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-text-secondary">
                      <X className="w-4 h-4 text-danger flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Meeting point */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-2">Meeting point</h2>
              <div className="flex items-start gap-2 text-text-secondary">
                <MapPin className="w-5 h-5 text-sky-blue mt-0.5 flex-shrink-0" />
                <span>{experience.meetingPoint}</span>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-lg font-bold text-text-primary mb-4">Reviews</h2>
              <div className="space-y-4">
                {experience.reviews.map((review, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-sky-blue rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {review.author[0]}
                        </div>
                        <span className="font-semibold text-text-primary">{review.author}</span>
                      </div>
                      <span className="text-xs text-text-secondary">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-star text-star' : 'text-line'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — Price comparison & booking */}
          <div className="space-y-6">
            {/* Price comparison */}
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-text-primary mb-4">Compare prices</h2>
              <div className="space-y-3">
                {experience.prices.map((p) => (
                  <div
                    key={p.provider}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      p.price === experience.bestPrice
                        ? 'border-success bg-success-fill'
                        : 'border-line'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-text-primary text-sm">{p.provider}</span>
                      {p.includes && (
                        <p className="text-xs text-text-secondary mt-0.5">{p.includes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${p.price === experience.bestPrice ? 'text-success' : 'text-text-primary'}`}>
                        {p.currency === 'GBP' ? '£' : '€'}{p.price}
                      </span>
                      {p.price === experience.bestPrice && p.price < highestPrice && (
                        <p className="text-xs text-success font-semibold">Best price</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-sky-blue text-white font-bold py-3 rounded-lg hover:bg-sky-blue/90 transition-colors">
                Book on {experience.bestProvider}
              </button>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-blue" />
                Availability
              </h2>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-text-secondary font-semibold py-1">{d}</div>
                ))}
                {Array.from({ length: 28 }).map((_, i) => {
                  const available = [2, 3, 5, 8, 9, 10, 12, 15, 16, 17, 19, 22, 23, 24, 26].includes(i)
                  return (
                    <div
                      key={i}
                      className={`py-1.5 rounded ${
                        available
                          ? 'bg-success-fill text-success font-semibold'
                          : 'text-text-secondary'
                      }`}
                    >
                      {i + 1}
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-text-secondary mt-3">
                <span className="inline-block w-2 h-2 bg-success-fill rounded mr-1" /> Available dates shown in green
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

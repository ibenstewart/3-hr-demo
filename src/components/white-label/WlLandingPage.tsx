import { Plane, Calendar, Users, Search } from 'lucide-react'
import { useBrandContext } from './WlBrandContext'

interface WlLandingPageProps {
  onSearch: () => void
}

const featuredRoutes = [
  { from: 'London', to: 'New York', price: 345, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop' },
  { from: 'London', to: 'Dubai', price: 289, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop' },
  { from: 'London', to: 'Tokyo', price: 485, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop' },
]

export default function WlLandingPage({ onSearch }: WlLandingPageProps) {
  const { brand } = useBrandContext()

  return (
    <div className="min-h-[calc(100vh-56px)]">
      {/* Hero */}
      <div className="relative px-6 py-16 text-center" style={{ background: `linear-gradient(135deg, ${brand.primaryColor} 0%, ${brand.primaryColor}dd 100%)` }}>
        <h1 className="text-4xl font-bold text-white mb-2">Find your perfect flight</h1>
        <p className="text-white/80 mb-8">Exclusive fares for {brand.name} customers</p>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-left">
              <label className="text-xs text-gray-500 block mb-1">From</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Plane className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">London (LHR)</span>
              </div>
            </div>
            <div className="text-left">
              <label className="text-xs text-gray-500 block mb-1">To</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Plane className="w-4 h-4 text-gray-400 rotate-90" />
                <span className="text-sm font-medium">New York (JFK)</span>
              </div>
            </div>
            <div className="text-left">
              <label className="text-xs text-gray-500 block mb-1">Dates</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">15 Mar 2026</span>
              </div>
            </div>
            <div className="text-left">
              <label className="text-xs text-gray-500 block mb-1">Passengers</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">1 Adult</span>
              </div>
            </div>
          </div>
          <button
            onClick={onSearch}
            className="w-full text-white font-semibold py-3 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: brand.primaryColor,
              borderRadius: `${brand.buttonRadius}px`,
            }}
          >
            <Search className="w-4 h-4" />
            Search Flights
          </button>
        </div>

        <div className="absolute bottom-4 right-6 text-xs text-white/50">
          Powered by Skyscanner
        </div>
      </div>

      {/* Featured Routes */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold mb-6" style={{ color: brand.primaryColor }}>Popular destinations</h2>
        <div className="grid grid-cols-3 gap-6">
          {featuredRoutes.map(route => (
            <button
              key={route.to}
              onClick={onSearch}
              className="text-left rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="h-36 overflow-hidden">
                <img src={route.image} alt={route.to} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-semibold">{route.from} → {route.to}</p>
                <p className="text-sm mt-1">
                  From <span className="font-bold" style={{ color: brand.primaryColor }}>£{route.price}</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

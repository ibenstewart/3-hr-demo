import { useState } from 'react'
import { NavLink, Link } from 'react-router'
import { cn } from '../lib/utils'

const links = [
  { to: '/trip-planner', label: 'Trip Planner' },
  { to: '/companion', label: 'Companion' },
  { to: '/ancillaries', label: 'Ancillaries' },
  { to: '/prices', label: 'Prices' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/business-travel', label: 'Biz Travel' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-haiti text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-lg tracking-tight">Skyscanner</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2',
                    isActive
                      ? 'border-white text-white'
                      : 'border-transparent text-white/70 hover:text-white'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export interface BrandConfig {
  name: string
  logo: string
  primaryColor: string
  accentColor: string
  fontFamily: string
  buttonRadius: number
}

export interface WlFlight {
  id: string
  airline: string
  airlineLogo: string
  departure: { time: string; airport: string }
  arrival: { time: string; airport: string }
  duration: string
  stops: number
  stopCity?: string
  price: number
  cabinClass: 'economy' | 'business' | 'first'
  score: number
  scoreBreakdown: {
    price: number
    duration: number
    airline: number
    convenience: number
    eco: number
  }
  co2Kg: number
  baggage: { cabin: string; checked: string }
}

export interface WlAnalyticsDay {
  date: string
  clicks: number
  bookings: number
  revenue: number
}

export interface WlWizardStep {
  id: string
  title: string
  description: string
  icon: string
}

export const defaultMeridianConfig: BrandConfig = {
  name: 'Meridian Bank Travel',
  logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=200&fit=crop',
  primaryColor: '#1B3A5C',
  accentColor: '#C9A84C',
  fontFamily: 'DM Sans',
  buttonRadius: 9999,
}

export const wlFlights: WlFlight[] = [
  {
    id: 'fl-1',
    airline: 'British Airways',
    airlineLogo: '🇬🇧',
    departure: { time: '09:15', airport: 'LHR' },
    arrival: { time: '12:45', airport: 'JFK' },
    duration: '7h 30m',
    stops: 0,
    price: 589,
    cabinClass: 'economy',
    score: 92,
    scoreBreakdown: { price: 22, duration: 24, airline: 20, convenience: 14, eco: 12 },
    co2Kg: 485,
    baggage: { cabin: '1 x 23kg', checked: '1 x 23kg' },
  },
  {
    id: 'fl-2',
    airline: 'Virgin Atlantic',
    airlineLogo: '✈️',
    departure: { time: '10:30', airport: 'LHR' },
    arrival: { time: '14:15', airport: 'JFK' },
    duration: '7h 45m',
    stops: 0,
    price: 545,
    cabinClass: 'economy',
    score: 88,
    scoreBreakdown: { price: 25, duration: 23, airline: 18, convenience: 13, eco: 9 },
    co2Kg: 510,
    baggage: { cabin: '1 x 10kg', checked: '1 x 23kg' },
  },
  {
    id: 'fl-3',
    airline: 'American Airlines',
    airlineLogo: '🦅',
    departure: { time: '11:00', airport: 'LHR' },
    arrival: { time: '14:50', airport: 'JFK' },
    duration: '7h 50m',
    stops: 0,
    price: 510,
    cabinClass: 'economy',
    score: 85,
    scoreBreakdown: { price: 26, duration: 22, airline: 17, convenience: 12, eco: 8 },
    co2Kg: 520,
    baggage: { cabin: '1 x 10kg', checked: '1 x 23kg' },
  },
  {
    id: 'fl-4',
    airline: 'Delta',
    airlineLogo: '🔺',
    departure: { time: '08:00', airport: 'LHR' },
    arrival: { time: '15:20', airport: 'JFK' },
    duration: '11h 20m',
    stops: 1,
    stopCity: 'Atlanta',
    price: 425,
    cabinClass: 'economy',
    score: 76,
    scoreBreakdown: { price: 28, duration: 15, airline: 16, convenience: 10, eco: 7 },
    co2Kg: 620,
    baggage: { cabin: '1 x 10kg', checked: '1 x 23kg' },
  },
  {
    id: 'fl-5',
    airline: 'United Airlines',
    airlineLogo: '🌐',
    departure: { time: '14:30', airport: 'LHR' },
    arrival: { time: '18:35', airport: 'EWR' },
    duration: '8h 05m',
    stops: 0,
    price: 535,
    cabinClass: 'economy',
    score: 83,
    scoreBreakdown: { price: 24, duration: 21, airline: 17, convenience: 12, eco: 9 },
    co2Kg: 505,
    baggage: { cabin: '1 x 10kg', checked: '1 x 23kg' },
  },
  {
    id: 'fl-6',
    airline: 'Aer Lingus',
    airlineLogo: '☘️',
    departure: { time: '07:15', airport: 'LHR' },
    arrival: { time: '13:55', airport: 'JFK' },
    duration: '10h 40m',
    stops: 1,
    stopCity: 'Dublin',
    price: 395,
    cabinClass: 'economy',
    score: 72,
    scoreBreakdown: { price: 29, duration: 14, airline: 14, convenience: 9, eco: 6 },
    co2Kg: 580,
    baggage: { cabin: '1 x 10kg', checked: '1 x 20kg' },
  },
  {
    id: 'fl-7',
    airline: 'Norwegian',
    airlineLogo: '🇳🇴',
    departure: { time: '13:00', airport: 'LGW' },
    arrival: { time: '17:15', airport: 'JFK' },
    duration: '8h 15m',
    stops: 0,
    price: 465,
    cabinClass: 'economy',
    score: 80,
    scoreBreakdown: { price: 27, duration: 20, airline: 15, convenience: 11, eco: 7 },
    co2Kg: 490,
    baggage: { cabin: '1 x 10kg', checked: 'Not included' },
  },
  {
    id: 'fl-8',
    airline: 'Icelandair',
    airlineLogo: '🇮🇸',
    departure: { time: '06:30', airport: 'LHR' },
    arrival: { time: '15:00', airport: 'JFK' },
    duration: '12h 30m',
    stops: 1,
    stopCity: 'Reykjavik',
    price: 345,
    cabinClass: 'economy',
    score: 65,
    scoreBreakdown: { price: 30, duration: 10, airline: 12, convenience: 7, eco: 6 },
    co2Kg: 640,
    baggage: { cabin: '1 x 10kg', checked: '1 x 23kg' },
  },
]

// Generate 30 days of analytics with upward trend
function generateAnalytics(): WlAnalyticsDay[] {
  const days: WlAnalyticsDay[] = []
  const baseDate = new Date('2026-02-19')
  for (let i = 29; i >= 0; i--) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() - i)
    const trendMultiplier = 1 + (29 - i) * 0.03
    const dayOfWeek = date.getDay()
    const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.3 : 1
    days.push({
      date: date.toISOString().split('T')[0],
      clicks: Math.round((800 + Math.random() * 400) * trendMultiplier * weekendBoost),
      bookings: Math.round((12 + Math.random() * 8) * trendMultiplier * weekendBoost),
      revenue: Math.round((4500 + Math.random() * 3000) * trendMultiplier * weekendBoost),
    })
  }
  return days
}

export const wlAnalytics: WlAnalyticsDay[] = generateAnalytics()

export const wlWizardSteps: WlWizardStep[] = [
  { id: 'brand', title: 'Brand Identity', description: 'Upload your logo and set your brand colours', icon: 'Palette' },
  { id: 'flights', title: 'Flight Configuration', description: 'Choose cabin classes and airline preferences', icon: 'Plane' },
  { id: 'pricing', title: 'Pricing & Margin', description: 'Set your markup and earning model', icon: 'PoundSterling' },
  { id: 'integrations', title: 'Integrations', description: 'Connect payment, analytics and CRM tools', icon: 'Plug' },
  { id: 'launch', title: 'Review & Launch', description: 'Review your setup and go live', icon: 'Rocket' },
]

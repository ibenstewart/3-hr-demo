export interface PriceDataPoint {
  date: string
  price: number
}

export interface FlightOption {
  id: string
  airline: string
  departure: string
  arrival: string
  duration: string
  stops: number
  stopCity?: string
  price: number
  currency: 'GBP'
}

export interface PriceVerdict {
  recommendation: 'buy' | 'wait' | 'good-deal'
  confidence: number
  explanation: string
  currentPrice: number
  historicalAverage: number
  bestPriceSeen: number
  predictedMin: number
  predictedMax: number
}

export const priceHistory: PriceDataPoint[] = [
  // 2025 — April to December
  { date: '2025-04-01', price: 468 },
  { date: '2025-04-08', price: 455 },
  { date: '2025-04-15', price: 462 },
  { date: '2025-04-22', price: 471 },
  { date: '2025-05-01', price: 489 },
  { date: '2025-05-08', price: 502 },
  { date: '2025-05-15', price: 515 },
  { date: '2025-05-22', price: 528 },
  { date: '2025-06-01', price: 545 },
  { date: '2025-06-08', price: 558 },
  { date: '2025-06-15', price: 572 },
  { date: '2025-06-22', price: 579 },
  { date: '2025-07-01', price: 585 },
  { date: '2025-07-08', price: 578 },
  { date: '2025-07-15', price: 582 },
  { date: '2025-07-22', price: 575 },
  { date: '2025-08-01', price: 568 },
  { date: '2025-08-08', price: 555 },
  { date: '2025-08-15', price: 542 },
  { date: '2025-08-22', price: 520 },
  { date: '2025-09-01', price: 498 },
  { date: '2025-09-08', price: 485 },
  { date: '2025-09-15', price: 478 },
  { date: '2025-09-22', price: 465 },
  { date: '2025-10-01', price: 458 },
  { date: '2025-10-08', price: 449 },
  { date: '2025-10-15', price: 455 },
  { date: '2025-10-22', price: 462 },
  { date: '2025-11-01', price: 445 },
  { date: '2025-11-08', price: 438 },
  { date: '2025-11-15', price: 442 },
  { date: '2025-11-22', price: 468 },
  { date: '2025-12-01', price: 495 },
  { date: '2025-12-08', price: 528 },
  { date: '2025-12-15', price: 555 },
  { date: '2025-12-22', price: 542 },
  // 2026 — January to March
  { date: '2026-01-05', price: 425 },
  { date: '2026-01-12', price: 412 },
  { date: '2026-01-19', price: 398 },
  { date: '2026-01-26', price: 405 },
  { date: '2026-02-02', price: 418 },
  { date: '2026-02-09', price: 435 },
  { date: '2026-02-16', price: 448 },
  { date: '2026-02-23', price: 462 },
  { date: '2026-03-02', price: 475 },
  { date: '2026-03-09', price: 487 },
]

export const flightOptions: FlightOption[] = [
  {
    id: 'ba-direct',
    airline: 'British Airways',
    departure: '08:40',
    arrival: '14:55',
    duration: '7h 15m',
    stops: 0,
    price: 487,
    currency: 'GBP',
  },
  {
    id: 'united-direct',
    airline: 'United Airlines',
    departure: '10:15',
    arrival: '16:20',
    duration: '7h 05m',
    stops: 0,
    price: 512,
    currency: 'GBP',
  },
  {
    id: 'norwegian-direct',
    airline: 'Norwegian',
    departure: '14:30',
    arrival: '20:45',
    duration: '7h 15m',
    stops: 0,
    price: 438,
    currency: 'GBP',
  },
  {
    id: 'klm-ams',
    airline: 'KLM',
    departure: '06:50',
    arrival: '16:10',
    duration: '10h 20m',
    stops: 1,
    stopCity: 'Amsterdam (AMS)',
    price: 395,
    currency: 'GBP',
  },
  {
    id: 'icelandair-kef',
    airline: 'Icelandair',
    departure: '11:20',
    arrival: '22:05',
    duration: '11h 45m',
    stops: 1,
    stopCity: 'Reykjavik (KEF)',
    price: 372,
    currency: 'GBP',
  },
  {
    id: 'lufthansa-fra',
    airline: 'Lufthansa',
    departure: '07:15',
    arrival: '15:40',
    duration: '9h 25m',
    stops: 1,
    stopCity: 'Frankfurt (FRA)',
    price: 425,
    currency: 'GBP',
  },
]

export const priceVerdict: PriceVerdict = {
  recommendation: 'buy',
  confidence: 78,
  explanation:
    "Prices on EDI-JFK typically climb steadily from March through June, peaking above £570 in summer. At £487, you're 4% below the 12-month average and 17% below the summer peak. January's £398 low is behind us and prices have been rising for 6 weeks. Waiting is unlikely to save you money — our model predicts a further 8-12% increase by April.",
  currentPrice: 487,
  historicalAverage: 489,
  bestPriceSeen: 372,
  predictedMin: 475,
  predictedMax: 545,
}

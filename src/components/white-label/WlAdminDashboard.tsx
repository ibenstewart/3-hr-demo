import { useState } from 'react'
import { wlAnalytics } from '../../data/white-label'
import { useBrandContext } from './WlBrandContext'
import { TrendingUp, TrendingDown, MousePointerClick, Ticket, PoundSterling, BarChart3, History, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

// Recharts needs raw RGB strings, not CSS vars
const CHART_BLUE = 'rgb(0, 98, 227)'
const CHART_ECO = 'rgb(15, 161, 169)'
const CHART_BERRY = 'rgb(231, 8, 102)'
const CHART_LINE = 'rgb(193, 199, 207)'
const CHART_TEXT = 'rgb(98, 105, 113)'

type TimeRange = '7d' | '30d' | '90d'

export default function WlAdminDashboard() {
  const { brand } = useBrandContext()
  const [timeRange, setTimeRange] = useState<TimeRange>('30d')

  const data = timeRange === '7d' ? wlAnalytics.slice(-7) : timeRange === '90d' ? wlAnalytics : wlAnalytics

  // KPI calculations
  const totalClicks = data.reduce((sum, d) => sum + d.clicks, 0)
  const totalBookings = data.reduce((sum, d) => sum + d.bookings, 0)
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0)
  const convRate = totalClicks > 0 ? ((totalBookings / totalClicks) * 100).toFixed(1) : '0'

  // Trend: compare last 7 days to previous 7 days
  const recent = wlAnalytics.slice(-7)
  const previous = wlAnalytics.slice(-14, -7)
  const recentClicks = recent.reduce((s, d) => s + d.clicks, 0)
  const prevClicks = previous.reduce((s, d) => s + d.clicks, 0)
  const clicksTrend = prevClicks > 0 ? ((recentClicks - prevClicks) / prevClicks * 100).toFixed(0) : '0'

  const recentBookings = recent.reduce((s, d) => s + d.bookings, 0)
  const prevBookings = previous.reduce((s, d) => s + d.bookings, 0)
  const bookingsTrend = prevBookings > 0 ? ((recentBookings - prevBookings) / prevBookings * 100).toFixed(0) : '0'

  const recentRevenue = recent.reduce((s, d) => s + d.revenue, 0)
  const prevRevenue = previous.reduce((s, d) => s + d.revenue, 0)
  const revenueTrend = prevRevenue > 0 ? ((recentRevenue - prevRevenue) / prevRevenue * 100).toFixed(0) : '0'

  const kpis = [
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), trend: clicksTrend, icon: MousePointerClick, color: CHART_BLUE },
    { label: 'Bookings', value: totalBookings.toLocaleString(), trend: bookingsTrend, icon: Ticket, color: CHART_ECO },
    { label: 'Revenue', value: `£${(totalRevenue).toLocaleString()}`, trend: revenueTrend, icon: PoundSterling, color: CHART_BERRY },
    { label: 'Conversion', value: `${convRate}%`, trend: '+3', icon: BarChart3, color: brand.primaryColor },
  ]

  const tooltipStyle = {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '12px',
    padding: '8px 12px',
  }

  return (
    <div>
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => {
          const positive = Number(kpi.trend) >= 0
          return (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{kpi.label}</span>
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: brand.primaryColor }}>{kpi.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {positive ? <TrendingUp className="w-3 h-3 text-green-600" /> : <TrendingDown className="w-3 h-3 text-red-500" />}
                <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-500'}`}>
                  {positive ? '+' : ''}{kpi.trend}%
                </span>
                <span className="text-xs text-gray-400">vs prev 7d</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Time Range Filter */}
      <div className="flex gap-1 mb-4">
        {(['7d', '30d', '90d'] as TimeRange[]).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              timeRange === range ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
            }`}
            style={timeRange === range ? { backgroundColor: brand.primaryColor } : undefined}
          >
            {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Clicks Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Daily Clicks</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: CHART_TEXT }}
                  tickFormatter={(v) => v.slice(5)}
                  axisLine={{ stroke: CHART_LINE }}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 10, fill: CHART_TEXT }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => [Number(value).toLocaleString(), 'Clicks']} />
                <Line type="monotone" dataKey="clicks" stroke={CHART_BLUE} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Daily Bookings</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: CHART_TEXT }}
                  tickFormatter={(v) => v.slice(5)}
                  axisLine={{ stroke: CHART_LINE }}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 10, fill: CHART_TEXT }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => [value, 'Bookings']} />
                <Bar dataKey="bookings" fill={CHART_ECO} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart - Full Width */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 col-span-2">
          <p className="text-sm font-medium text-gray-700 mb-3">Daily Revenue</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: CHART_TEXT }}
                  tickFormatter={(v) => v.slice(5)}
                  axisLine={{ stroke: CHART_LINE }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: CHART_TEXT }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`£${Number(value).toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke={CHART_BERRY} fill={CHART_BERRY} fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Platform Evolution Timeline */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5" style={{ color: brand.primaryColor }} />
          <h3 className="text-sm font-bold text-gray-900">Platform Evolution</h3>
        </div>

        <div className="relative pl-6 space-y-6">
          {/* Vertical line */}
          <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200" />

          {/* 2015 */}
          <div className="relative">
            <div className="absolute -left-6 w-[18px] h-[18px] rounded-full bg-sky-blue flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">2015</p>
              <p className="text-sm font-medium text-gray-900">Microsoft / Bing Partnership</p>
              <p className="text-xs text-gray-500 mt-0.5">First white-label at scale — flights embedded across Bing and MSN properties</p>
            </div>
          </div>

          {/* 2020 */}
          <div className="relative">
            <div className="absolute -left-6 w-[18px] h-[18px] rounded-full bg-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-2.5 h-2.5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">2020</p>
              <p className="text-sm font-medium text-gray-900">Platform Decommissioned</p>
              <p className="text-xs text-gray-500 mt-0.5">Lonely Planet, MSN, Travel Super Market offboarded. Lessons: needed self-serve onboarding, better analytics, clear lifecycle ownership</p>
            </div>
          </div>

          {/* 2026 */}
          <div className="relative">
            <div className="absolute -left-6 w-[18px] h-[18px] rounded-full bg-eco flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">2026</p>
              <p className="text-sm font-medium text-gray-900">Componentized Relaunch</p>
              <p className="text-xs text-gray-500 mt-0.5">Self-serve setup, real-time analytics, brand-native experiences — built on reusable consumer components</p>
            </div>
          </div>
        </div>

        {/* Why This Time Is Different */}
        <div className="mt-5 p-4 rounded-lg bg-gray-50 border border-gray-100">
          <p className="text-xs font-semibold text-gray-700 mb-2">Why this time is different</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Self-serve partner onboarding',
              'Real-time analytics dashboard',
              'Componentized architecture',
              'Clear lifecycle ownership',
            ].map(item => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-eco shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

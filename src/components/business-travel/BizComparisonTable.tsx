import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { FlightOption } from '../../data/business-travel'

interface BizComparisonTableProps {
  options: FlightOption[]
  selectedId?: string
  onSelect: (option: FlightOption) => void
}

const rankLabel = (rank: 1 | 2 | 3) => rank === 1 ? 'Best' : rank === 2 ? '2nd' : '3rd'
const riskColor = (risk: string) =>
  risk === 'low' ? 'text-success bg-success-fill' :
  risk === 'medium' ? 'text-warning bg-warning-fill' :
  'text-danger bg-danger-fill'

export default function BizComparisonTable({ options, selectedId, onSelect }: BizComparisonTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="text-left p-4 text-text-secondary font-semibold text-xs uppercase tracking-wide">Criteria</th>
              {options.map(opt => (
                <th key={opt.id} className="p-4 text-center min-w-[160px]">
                  <span className={cn(
                    'text-xs font-bold uppercase px-2 py-0.5 rounded-full',
                    opt.type === 'budget' ? 'bg-success-fill text-success' :
                    opt.type === 'fastest' ? 'bg-surface-subtle text-sky-blue' :
                    'bg-danger-fill text-berry'
                  )}>
                    {opt.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price */}
            <tr className="border-b border-line/50">
              <td className="p-4 text-text-secondary font-medium">Price</td>
              {options.map(opt => (
                <td key={opt.id} className="p-4 text-center">
                  <span className="font-bold text-text-primary">{opt.currency}{opt.price}</span>
                  <span className={cn(
                    'block text-xs mt-0.5 font-semibold',
                    opt.comparisonData.priceRank === 1 ? 'text-success' : 'text-text-secondary'
                  )}>
                    {rankLabel(opt.comparisonData.priceRank)}
                  </span>
                </td>
              ))}
            </tr>

            {/* Schedule */}
            <tr className="border-b border-line/50">
              <td className="p-4 text-text-secondary font-medium">Schedule</td>
              {options.map(opt => (
                <td key={opt.id} className="p-4 text-center">
                  <span className="text-text-primary">{opt.outbound.departure.time} → {opt.outbound.arrival.time}</span>
                  <span className={cn(
                    'block text-xs mt-0.5 font-semibold',
                    opt.comparisonData.timeRank === 1 ? 'text-success' : 'text-text-secondary'
                  )}>
                    {rankLabel(opt.comparisonData.timeRank)}
                  </span>
                </td>
              ))}
            </tr>

            {/* Airline */}
            <tr className="border-b border-line/50">
              <td className="p-4 text-text-secondary font-medium">Airline</td>
              {options.map(opt => (
                <td key={opt.id} className="p-4 text-center">
                  <span className="text-lg">{opt.outbound.airlineLogo}</span>
                  <span className="block text-text-primary text-xs mt-0.5">{opt.outbound.airline}</span>
                </td>
              ))}
            </tr>

            {/* Flexibility */}
            <tr className="border-b border-line/50">
              <td className="p-4 text-text-secondary font-medium">Flexibility</td>
              {options.map(opt => (
                <td key={opt.id} className="p-4 text-center">
                  <span className={cn(
                    'text-xs font-semibold',
                    opt.comparisonData.flexRank === 1 ? 'text-success' : 'text-text-secondary'
                  )}>
                    {rankLabel(opt.comparisonData.flexRank)}
                  </span>
                </td>
              ))}
            </tr>

            {/* Risk */}
            <tr className="border-b border-line/50">
              <td className="p-4 text-text-secondary font-medium">Risk</td>
              {options.map(opt => (
                <td key={opt.id} className="p-4 text-center">
                  <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full capitalize', riskColor(opt.comparisonData.riskScore))}>
                    {opt.comparisonData.riskScore}
                  </span>
                  <p className="text-text-secondary text-xs mt-1">{opt.comparisonData.riskReason}</p>
                </td>
              ))}
            </tr>

            {/* Trade-offs */}
            <tr className="border-b border-line/50">
              <td className="p-4 text-text-secondary font-medium">Trade-off</td>
              {options.map(opt => (
                <td key={opt.id} className="p-4 text-center text-xs text-text-secondary">
                  {opt.whyNot || opt.tradeoffs}
                </td>
              ))}
            </tr>

            {/* Select buttons */}
            <tr>
              <td className="p-4"></td>
              {options.map(opt => (
                <td key={opt.id} className="p-4 text-center">
                  <button
                    onClick={() => onSelect(opt)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-bold transition-colors',
                      selectedId === opt.id
                        ? 'bg-sky-blue text-white'
                        : 'bg-canvas-contrast text-text-primary hover:bg-surface-highlight'
                    )}
                  >
                    {selectedId === opt.id ? (
                      <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Selected</span>
                    ) : 'Select'}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

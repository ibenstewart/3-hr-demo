import { Link, useSearchParams } from 'react-router'
import { ArrowRight } from 'lucide-react'

export function useJourneyMode() {
  const [searchParams] = useSearchParams()
  const journeyMode = searchParams.get('journey') === 'true'
  const journeyStep = searchParams.get('step')
  return { journeyMode, journeyStep }
}

export default function JourneyButton() {
  const { journeyMode, journeyStep } = useJourneyMode()

  if (!journeyMode || journeyStep === null) return null

  const nextStep = parseInt(journeyStep, 10) + 1

  return (
    <Link
      to={`/journey?step=${nextStep}`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-sky-blue text-white pl-5 pr-4 py-3 rounded-full font-bold shadow-xl hover:brightness-110 hover:scale-105 transition-all animate-fade-in-up"
    >
      Continue Journey
      <ArrowRight className="w-4 h-4" />
    </Link>
  )
}

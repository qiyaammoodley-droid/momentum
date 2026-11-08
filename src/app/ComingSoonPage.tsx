import { useLocation } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'

const labels: Record<string, string> = {
  '/goals': 'Goals',
  '/calendar': 'Calendar',
  '/habits': 'Habits',
  '/ai-assistant': 'AI Growth Assistant',
  '/weekly-review': 'Weekly review',
}

export default function ComingSoonPage() {
  const location = useLocation()
  const title = labels[location.pathname] ?? 'Your workspace'

  return (
    <section className="coming-soon panel">
      <span className="coming-soon-icon"><Sparkles size={21} /></span>
      <span className="section-kicker">UNDER CONSTRUCTION</span>
      <h1>{title}</h1>
      <p>This part of Momentum is coming in the next build phase. The foundation is in place, and we're building each feature against the approved product requirements.</p>
      <a href="/dashboard" className="coming-back"><ArrowLeft size={15} /> Back to dashboard</a>
    </section>
  )
}

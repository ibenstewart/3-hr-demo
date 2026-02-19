import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { BrandProvider } from '../components/white-label/WlBrandContext'
import WlAdminDashboard from '../components/white-label/WlAdminDashboard'
import WlOnboardingWizard from '../components/white-label/WlOnboardingWizard'
import WlBrandConfigurator from '../components/white-label/WlBrandConfigurator'
import WlCustomerApp from '../components/white-label/WlCustomerApp'
import { cn } from '../lib/utils'
import { LayoutDashboard, Palette, Wand2, ExternalLink } from 'lucide-react'

type AdminView = 'dashboard' | 'wizard' | 'configure'

function WhiteLabelInner() {
  const location = useLocation()
  const isCustomerView = location.pathname === '/white-label/customer'
  const [adminView, setAdminView] = useState<AdminView>('dashboard')

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCustomerView) {
        setAdminView('dashboard')
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isCustomerView])

  // Customer-facing view — full brand experience
  if (isCustomerView) {
    return <WlCustomerApp />
  }

  // Admin view
  return (
    <div className="min-h-screen bg-canvas">
      {/* Admin Header */}
      <div className="bg-white border-b border-line px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-blue flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-haiti text-sm">White-Label Platform</h1>
              <p className="text-[11px] text-text-secondary">Partner Travel Product Builder</p>
            </div>
          </div>

          {/* Admin Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {([
              { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
              { id: 'configure' as const, label: 'Configure Brand', icon: Palette },
              { id: 'wizard' as const, label: 'Onboarding Wizard', icon: Wand2 },
            ]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setAdminView(tab.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                  adminView === tab.id ? 'bg-white shadow-sm text-haiti' : 'text-text-secondary hover:text-haiti'
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <a
            href="/white-label/customer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-sky-blue hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Customer View
          </a>
        </div>
      </div>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {adminView === 'dashboard' && <WlAdminDashboard />}
        {adminView === 'wizard' && <WlOnboardingWizard onComplete={() => setAdminView('dashboard')} onBack={() => setAdminView('dashboard')} />}
        {adminView === 'configure' && <WlBrandConfigurator onBack={() => setAdminView('dashboard')} />}
      </div>
    </div>
  )
}

export default function WhiteLabel() {
  return (
    <BrandProvider>
      <WhiteLabelInner />
    </BrandProvider>
  )
}

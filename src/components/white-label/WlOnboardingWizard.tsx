import { useState } from 'react'
import { useBrandContext } from './WlBrandContext'
import { wlWizardSteps } from '../../data/white-label'
import { Globe, Layers, Palette, Languages, LayoutGrid, Rocket, Check, ArrowLeft, ArrowRight, CheckCircle, Search, BarChart3, Bell, Award } from 'lucide-react'
import { cn } from '../../lib/utils'

const stepIcons = { Globe, Layers, Palette, Languages, LayoutGrid, Rocket }

interface WlOnboardingWizardProps {
  onComplete: () => void
  onBack: () => void
}

export default function WlOnboardingWizard({ onComplete, onBack }: WlOnboardingWizardProps) {
  const { brand, updateBrand } = useBrandContext()
  const [activeStep, setActiveStep] = useState(0)
  const [launched, setLaunched] = useState(false)
  const [cnameVerified, setCnameVerified] = useState(false)
  const [revenueModel, setRevenueModel] = useState<'revenue-share' | 'fixed-markup'>('revenue-share')

  const handleLaunch = () => {
    setLaunched(true)
    setTimeout(onComplete, 2000)
  }

  if (launched) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-eco/20">
          <Rocket className="w-10 h-10 text-eco" />
        </div>
        <h2 className="text-2xl font-bold text-haiti mb-2">Platform is Live!</h2>
        <p className="text-text-secondary">Redirecting to your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </button>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {wlWizardSteps.map((step, i) => {
          const Icon = stepIcons[step.icon as keyof typeof stepIcons] || Globe
          const completed = i < activeStep
          const active = i === activeStep
          return (
            <div key={step.id} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => i <= activeStep && setActiveStep(i)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0',
                  completed ? 'bg-eco text-white' : active ? 'bg-sky-blue text-white' : 'bg-gray-200 text-gray-500'
                )}
              >
                {completed ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </button>
              {i < wlWizardSteps.length - 1 && (
                <div className={cn('h-0.5 flex-1', completed ? 'bg-eco' : 'bg-gray-200')} />
              )}
            </div>
          )
        })}
      </div>

      <h3 className="text-lg font-bold text-haiti mb-1">{wlWizardSteps[activeStep].title}</h3>
      <p className="text-sm text-text-secondary mb-6">{wlWizardSteps[activeStep].description}</p>

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-line p-6 mb-6">

        {/* Step 0: Domain Setup */}
        {activeStep === 0 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-secondary block mb-1">Custom Domain</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">https://</span>
                <input
                  type="text"
                  defaultValue="travel.travelconnect.com"
                  className="flex-1 border border-line rounded-lg px-3 py-2 text-sm font-mono"
                />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-xs font-medium text-gray-700 mb-2">CNAME Configuration</p>
              <div className="font-mono text-xs bg-white border border-line rounded-lg p-3 text-gray-600">
                <p>travel.travelconnect.com  CNAME  wl.skyscanner.net</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">Add this CNAME record in your DNS provider</p>
            </div>
            <button
              onClick={() => setCnameVerified(true)}
              className={cn(
                'flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors',
                cnameVerified
                  ? 'bg-eco/10 text-eco border border-eco/20'
                  : 'bg-sky-blue text-white hover:bg-sky-blue/90'
              )}
            >
              {cnameVerified ? <CheckCircle className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              {cnameVerified ? 'Domain Verified' : 'Verify Domain'}
            </button>
          </div>
        )}

        {/* Step 1: Verticals */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'flights', label: 'Flights', icon: '✈️', desc: 'Flight search & booking', available: true },
                { id: 'car-hire', label: 'Car Hire', icon: '🚗', desc: 'Car rental comparison', available: true },
                { id: 'hotels', label: 'Hotels', icon: '🏨', desc: 'Accommodation search', available: false },
              ].map(v => (
                <label
                  key={v.id}
                  className={cn(
                    'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-colors text-center',
                    v.available
                      ? 'border-line hover:border-sky-blue/50'
                      : 'border-line/50 opacity-50 cursor-not-allowed'
                  )}
                >
                  {!v.available && (
                    <span className="absolute top-2 right-2 text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full">Coming soon</span>
                  )}
                  <span className="text-2xl">{v.icon}</span>
                  <input
                    type="checkbox"
                    defaultChecked={v.id === 'flights'}
                    disabled={!v.available}
                    className="accent-sky-blue"
                  />
                  <span className="text-sm font-medium">{v.label}</span>
                  <span className="text-[11px] text-gray-400">{v.desc}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Brand Identity */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-secondary block mb-1">Logo URL</label>
              <input
                type="text"
                value={brand.logo}
                onChange={e => updateBrand({ logo: e.target.value })}
                className="w-full border border-line rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-secondary block mb-1">Primary Colour</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brand.primaryColor}
                    onChange={e => updateBrand({ primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-line cursor-pointer"
                  />
                  <input
                    type="text"
                    value={brand.primaryColor}
                    onChange={e => updateBrand({ primaryColor: e.target.value })}
                    className="flex-1 border border-line rounded-lg px-3 py-2 text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-text-secondary block mb-1">Accent Colour</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brand.accentColor}
                    onChange={e => updateBrand({ accentColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-line cursor-pointer"
                  />
                  <input
                    type="text"
                    value={brand.accentColor}
                    onChange={e => updateBrand({ accentColor: e.target.value })}
                    className="flex-1 border border-line rounded-lg px-3 py-2 text-sm font-mono"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1">Font Family</label>
              <select
                value={brand.fontFamily}
                onChange={e => updateBrand({ fontFamily: e.target.value })}
                className="w-full border border-line rounded-lg px-3 py-2 text-sm"
              >
                <option value="DM Sans">DM Sans</option>
                <option value="Inter">Inter</option>
                <option value="Poppins">Poppins</option>
                <option value="Source Sans Pro">Source Sans Pro</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1">Button Radius: {brand.buttonRadius}px</label>
              <input
                type="range"
                min={0}
                max={24}
                value={Math.min(brand.buttonRadius, 24)}
                onChange={e => updateBrand({ buttonRadius: Number(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Square</span>
                <span>Rounded</span>
                <span>Pill</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 mt-4">
              <p className="text-xs text-gray-500 mb-2">Preview</p>
              <button
                className="px-6 py-2 text-white font-medium"
                style={{ backgroundColor: brand.primaryColor, borderRadius: `${brand.buttonRadius}px` }}
              >
                Book Now
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Languages & Markets */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-secondary block mb-2">Supported Languages</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: 'en', label: 'English', flag: '🇬🇧' },
                  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
                  { code: 'de', label: 'German', flag: '🇩🇪' },
                  { code: 'fr', label: 'French', flag: '🇫🇷' },
                  { code: 'ar', label: 'Arabic', flag: '🇦🇪' },
                  { code: 'zh', label: 'Mandarin', flag: '🇨🇳' },
                ].map(lang => (
                  <label key={lang.code} className="flex items-center gap-2 text-sm border border-line rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked={lang.code === 'en'} className="accent-sky-blue" />
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-text-secondary block mb-1">Default Market</label>
                <select className="w-full border border-line rounded-lg px-3 py-2 text-sm" defaultValue="UK">
                  <option value="UK">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="DE">Germany</option>
                  <option value="AE">UAE</option>
                  <option value="SG">Singapore</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-secondary block mb-1">Default Currency</label>
                <select className="w-full border border-line rounded-lg px-3 py-2 text-sm" defaultValue="GBP">
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="AED">AED (د.إ)</option>
                  <option value="SGD">SGD (S$)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Widget Configuration */}
        {activeStep === 4 && (
          <div className="space-y-3">
            {[
              { id: 'search', label: 'Search Bar', desc: 'Embeddable flight search with autocomplete', icon: Search, checked: true },
              { id: 'deals', label: 'Deal Cards', desc: 'Dynamic cards showing best fares from partner markets', icon: BarChart3, checked: true },
              { id: 'alerts', label: 'Price Alerts', desc: 'Email notifications when tracked routes drop in price', icon: Bell, checked: false },
              { id: 'score', label: 'Flight Score Badge', desc: 'Visual quality indicator for search results', icon: Award, checked: true },
            ].map(widget => (
              <label key={widget.id} className="flex items-center gap-4 p-4 rounded-xl border border-line cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" defaultChecked={widget.checked} className="accent-eco w-4 h-4" />
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <widget.icon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">{widget.label}</p>
                  <p className="text-xs text-gray-400">{widget.desc}</p>
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Step 5: Review & Launch */}
        {activeStep === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
              <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-bold">{brand.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: brand.primaryColor }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: brand.accentColor }} />
                  <span className="text-xs text-gray-500">{brand.fontFamily}</span>
                </div>
              </div>
              <button
                className="ml-auto px-4 py-1.5 text-white text-sm font-medium"
                style={{ backgroundColor: brand.primaryColor, borderRadius: `${brand.buttonRadius}px` }}
              >
                Sample Button
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Domain</p>
                <p className="font-medium font-mono text-xs">travel.travelconnect.com</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Verticals</p>
                <p className="font-medium">Flights</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Languages</p>
                <p className="font-medium">English</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Widgets</p>
                <p className="font-medium">Search, Deals, Score</p>
              </div>
            </div>

            {/* Revenue Model Selection */}
            <div className="border-t border-line pt-4">
              <label className="text-xs text-text-secondary block mb-2">Commercial Model</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRevenueModel('revenue-share')}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-colors',
                    revenueModel === 'revenue-share' ? 'border-eco bg-eco/5' : 'border-line hover:border-gray-300'
                  )}
                >
                  <p className="text-sm font-bold mb-1">Revenue Share</p>
                  <p className="text-xs text-gray-500">Earn a percentage of each booking. Aligned incentives — you grow when travellers book.</p>
                  {revenueModel === 'revenue-share' && (
                    <p className="text-xs text-eco font-medium mt-2">Recommended</p>
                  )}
                </button>
                <button
                  onClick={() => setRevenueModel('fixed-markup')}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-colors',
                    revenueModel === 'fixed-markup' ? 'border-eco bg-eco/5' : 'border-line hover:border-gray-300'
                  )}
                >
                  <p className="text-sm font-bold mb-1">Fixed Markup</p>
                  <p className="text-xs text-gray-500">Add a fixed amount per ticket. Predictable margins regardless of booking value.</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setActiveStep(s => s - 1)}
          className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-lg border border-line hover:bg-gray-50', activeStep === 0 && 'invisible')}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        {activeStep < 5 ? (
          <button
            onClick={() => setActiveStep(s => s + 1)}
            className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-sky-blue text-white hover:bg-sky-blue/90"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleLaunch}
            className="flex items-center gap-1 text-sm px-6 py-2 rounded-lg bg-eco text-white hover:bg-eco/90 font-medium"
          >
            <Rocket className="w-4 h-4" /> Launch Your Travel Platform
          </button>
        )}
      </div>
    </div>
  )
}

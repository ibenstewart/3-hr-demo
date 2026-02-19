import { useState } from 'react'
import { useBrandContext } from './WlBrandContext'
import { wlWizardSteps } from '../../data/white-label'
import { Palette, Plane, PoundSterling, Plug, Rocket, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

const stepIcons = { Palette, Plane, PoundSterling, Plug, Rocket }

interface WlOnboardingWizardProps {
  onComplete: () => void
  onBack: () => void
}

export default function WlOnboardingWizard({ onComplete, onBack }: WlOnboardingWizardProps) {
  const { brand, updateBrand } = useBrandContext()
  const [activeStep, setActiveStep] = useState(0)
  const [launched, setLaunched] = useState(false)

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
          const Icon = stepIcons[step.icon as keyof typeof stepIcons] || Palette
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
        {activeStep === 0 && (
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
            {/* Live Preview */}
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

        {activeStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-secondary block mb-2">Default Cabin Class</label>
              <div className="flex gap-3">
                {['Economy', 'Business', 'First'].map(c => (
                  <label key={c} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="cabin" defaultChecked={c === 'Economy'} className="accent-sky-blue" />
                    {c}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-2">Include Checked Baggage</label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="accent-sky-blue" />
                1 x 23kg checked bag included
              </label>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-2">Maximum Connections</label>
              <div className="flex gap-3">
                {['Direct only', '1 stop', 'Any'].map(c => (
                  <label key={c} className="flex items-center gap-2 text-sm">
                    <input type="radio" name="stops" defaultChecked={c === 'Any'} className="accent-sky-blue" />
                    {c}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-2">Preferred Airlines</label>
              <div className="flex flex-wrap gap-2">
                {['British Airways', 'Virgin Atlantic', 'American Airlines', 'Delta', 'United'].map(a => (
                  <label key={a} className="flex items-center gap-1.5 text-xs border border-line rounded-full px-3 py-1.5 cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" defaultChecked={a === 'British Airways' || a === 'Virgin Atlantic'} className="accent-sky-blue w-3 h-3" />
                    {a}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-secondary block mb-2">Markup Type</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="markup" defaultChecked className="accent-sky-blue" />
                  Percentage
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="markup" className="accent-sky-blue" />
                  Fixed Amount
                </label>
              </div>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1">Markup Value</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={5} className="w-24 border border-line rounded-lg px-3 py-2 text-sm" />
                <span className="text-sm text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1">Currency</label>
              <select className="border border-line rounded-lg px-3 py-2 text-sm" defaultValue="GBP">
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 mt-2">
              <p className="text-xs text-gray-500 mb-1">Example earning</p>
              <p className="text-sm">Customer pays: <span className="font-bold">£420</span> → You earn: <span className="font-bold text-eco">£21</span> per booking</p>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-4">
            {[
              { category: 'Payment', items: [{ name: 'Stripe', checked: true }, { name: 'PayPal', checked: false }, { name: 'Apple Pay', checked: false }] },
              { category: 'Analytics', items: [{ name: 'Google Analytics', checked: true }, { name: 'Mixpanel', checked: false }] },
              { category: 'CRM', items: [{ name: 'Salesforce', checked: false }, { name: 'HubSpot', checked: false }] },
              { category: 'Notifications', items: [{ name: 'Email', checked: true }, { name: 'SMS', checked: false }, { name: 'Push', checked: false }] },
            ].map(group => (
              <div key={group.category}>
                <label className="text-xs text-text-secondary block mb-2">{group.category}</label>
                <div className="flex gap-3">
                  {group.items.map(item => (
                    <label key={item.name} className="flex items-center gap-2 text-sm border border-line rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50">
                      <input type="checkbox" defaultChecked={item.checked} className="accent-eco" />
                      {item.name}
                      {item.checked && <Check className="w-3 h-3 text-eco" />}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeStep === 4 && (
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
                <p className="text-xs text-gray-500 mb-1">Cabin Class</p>
                <p className="font-medium">Economy</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Markup</p>
                <p className="font-medium">5% per booking</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Integrations</p>
                <p className="font-medium">Stripe, GA, Email</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-xs text-gray-500 mb-1">Currency</p>
                <p className="font-medium">GBP (£)</p>
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
        {activeStep < 4 ? (
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

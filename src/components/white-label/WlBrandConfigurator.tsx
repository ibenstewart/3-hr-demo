import { useBrandContext } from './WlBrandContext'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import WlLandingPage from './WlLandingPage'

interface WlBrandConfiguratorProps {
  onBack: () => void
}

export default function WlBrandConfigurator({ onBack }: WlBrandConfiguratorProps) {
  const { brand, updateBrand, resetBrand } = useBrandContext()

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Config Panel */}
      <div className="w-1/2 overflow-y-auto p-6 border-r border-line">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </button>

        <h3 className="text-lg font-bold text-haiti mb-4">Brand Configuration</h3>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary block mb-1">Brand Name</label>
            <input
              type="text"
              value={brand.name}
              onChange={e => updateBrand({ name: e.target.value })}
              className="w-full border border-line rounded-lg px-3 py-2 text-sm"
            />
          </div>

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
          </div>

          <div className="flex gap-3 pt-4 border-t border-line">
            <button
              onClick={resetBrand}
              className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg border border-line text-text-secondary hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4" /> Reset to Meridian Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="w-1/2 overflow-y-auto bg-gray-50">
        <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-line z-10">
          <p className="text-xs text-text-secondary">Live Preview — Customer View</p>
        </div>
        <div className="transform scale-[0.85] origin-top">
          <WlLandingPage onSearch={() => {}} />
        </div>
      </div>
    </div>
  )
}

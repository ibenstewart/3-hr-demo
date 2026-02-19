import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { BrandConfig } from '../../data/white-label'
import { defaultMeridianConfig } from '../../data/white-label'

interface BrandContextType {
  brand: BrandConfig
  setBrand: (config: BrandConfig) => void
  updateBrand: (partial: Partial<BrandConfig>) => void
  resetBrand: () => void
}

const BrandContext = createContext<BrandContextType | null>(null)

const STORAGE_KEY = 'white-label-config'

function applyBrandToCSS(config: BrandConfig) {
  const root = document.documentElement
  root.style.setProperty('--wl-primary', config.primaryColor)
  root.style.setProperty('--wl-accent', config.accentColor)
  root.style.setProperty('--wl-radius', `${config.buttonRadius}px`)
  root.style.setProperty('--wl-font', `'${config.fontFamily}', sans-serif`)
}

function loadFromStorage(): BrandConfig {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch { /* ignore */ }
  return defaultMeridianConfig
}

function saveToStorage(config: BrandConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch { /* ignore */ }
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<BrandConfig>(loadFromStorage)

  useEffect(() => {
    applyBrandToCSS(brand)
  }, [brand])

  const setBrand = useCallback((config: BrandConfig) => {
    setBrandState(config)
    saveToStorage(config)
    applyBrandToCSS(config)
  }, [])

  const updateBrand = useCallback((partial: Partial<BrandConfig>) => {
    setBrandState(prev => {
      const next = { ...prev, ...partial }
      saveToStorage(next)
      applyBrandToCSS(next)
      return next
    })
  }, [])

  const resetBrand = useCallback(() => {
    setBrand(defaultMeridianConfig)
  }, [setBrand])

  return (
    <BrandContext.Provider value={{ brand, setBrand, updateBrand, resetBrand }}>
      {children}
    </BrandContext.Provider>
  )
}

export function useBrandContext() {
  const ctx = useContext(BrandContext)
  if (!ctx) throw new Error('useBrandContext must be used within BrandProvider')
  return ctx
}

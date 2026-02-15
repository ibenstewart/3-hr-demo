import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Code2, Clock, Layers, Package, GitCommit, ChevronRight, Cpu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { buildStats } from '../data/build-stats'

const statIcons: LucideIcon[] = [Code2, Layers, Package, Clock]

// Animated counter hook — StrictMode safe
function useAnimatedCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started) return
    const steps = 30
    let step = 0

    const interval = setInterval(() => {
      step++
      if (step >= steps) {
        setValue(target)
        clearInterval(interval)
      } else {
        // Ease-out curve
        const progress = step / steps
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [started, target, duration])

  return value
}

function AnimatedStat({ label, target, suffix, icon: Icon, delay }: {
  label: string
  target: number
  suffix: string
  icon: LucideIcon
  delay: number
}) {
  const value = useAnimatedCounter(target)

  return (
    <div
      className="text-center animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
        <Icon className="w-7 h-7 text-sky-blue" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
        {value.toLocaleString()}{suffix && <span className="text-2xl md:text-3xl text-white/60 ml-1">{suffix}</span>}
      </div>
      <div className="text-white/50 text-sm font-medium mt-1">{label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <div className="min-h-screen bg-canvas-contrast">
      {/* Hero */}
      <div className="bg-haiti text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm text-white/70 mb-6 animate-fade-in-up">
              <Cpu className="w-4 h-4" />
              Built with Claude Code
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3 animate-fade-in-up stagger-1">
              The Build
            </h1>
            <p className="text-white/50 max-w-xl mx-auto animate-fade-in-up stagger-2">
              One engineer, one afternoon, seven products. Here&apos;s what the numbers look like.
            </p>
          </div>

          {/* Stat counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {buildStats.headline.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                label={stat.label}
                target={stat.value}
                suffix={stat.suffix}
                icon={statIcons[i]}
                delay={0.3 + i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Build Timeline */}
        <section className="animate-fade-in-up">
          <h2 className="text-xl font-black text-text-primary mb-1">Build Timeline</h2>
          <p className="text-text-secondary text-sm mb-6">February 14, 2026 — every commit timestamped</p>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-line" />

              <div className="space-y-6">
                {buildStats.timeline.map((commit, i) => (
                  <div
                    key={commit.time}
                    className="flex gap-4 items-start animate-fade-in-up"
                    style={{ animationDelay: `${0.5 + i * 0.1}s` }}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10',
                      commit.type === 'feat' ? 'bg-sky-blue' : 'bg-eco'
                    )}>
                      <GitCommit className="w-5 h-5 text-white" />
                    </div>
                    <div className="pt-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm font-bold text-text-primary">{commit.time}</span>
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full font-semibold',
                          commit.type === 'feat' ? 'bg-sky-blue/10 text-sky-blue' : 'bg-eco/10 text-eco'
                        )}>
                          {commit.type}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mt-0.5">{commit.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Code Breakdown */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-black text-text-primary mb-1">Code Breakdown</h2>
          <p className="text-text-secondary text-sm mb-6">8,341 lines across 35 files</p>

          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Stacked bar */}
            <div className="h-8 rounded-full overflow-hidden flex mb-6">
              {buildStats.codeBreakdown.map((item) => (
                <div
                  key={item.category}
                  className={cn('h-full transition-all duration-700', item.color)}
                  style={{ width: `${(item.lines / 8341) * 100}%` }}
                  title={`${item.category}: ${item.lines} lines`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {buildStats.codeBreakdown.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div className={cn('w-3 h-3 rounded-full flex-shrink-0', item.color)} />
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{item.lines.toLocaleString()}</div>
                    <div className="text-xs text-text-secondary">{item.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-black text-text-primary mb-1">Tech Stack</h2>
          <p className="text-text-secondary text-sm mb-6">Modern tooling, zero backend</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {buildStats.techStack.map((tech, i) => (
              <div
                key={tech.name}
                className="bg-white rounded-xl p-4 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${0.4 + i * 0.05}s` }}
              >
                <div className="font-bold text-text-primary text-sm">{tech.name}</div>
                <div className="text-xs text-text-secondary mt-0.5">{tech.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* What Each Demo Proves */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-black text-text-primary mb-1">What Each Demo Proves</h2>
          <p className="text-text-secondary text-sm mb-6">Technical depth behind each product concept</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buildStats.demoCapabilities.map((demo, i) => (
              <Link
                key={demo.demo}
                to={demo.route}
                className="group bg-white rounded-xl shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${0.5 + i * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn('w-2 h-2 rounded-full', demo.color)} />
                      <h3 className="font-bold text-text-primary text-sm group-hover:text-sky-blue transition-colors">
                        {demo.demo}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {demo.capabilities.map((cap) => (
                        <span key={cap} className="text-xs bg-canvas-contrast text-text-secondary px-2 py-1 rounded-md">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-secondary flex-shrink-0 mt-1 group-hover:text-sky-blue group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center py-8">
          <p className="text-text-secondary text-sm mb-4">
            Want to see the products?
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-sky-blue text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
          >
            Explore all demos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

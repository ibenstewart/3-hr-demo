---
title: React 19 StrictMode Timer Crash in Animated Step Sequences
date: 2026-02-14
category: runtime-errors
tags: [react-19, strictmode, timing-bug, closure-variables, useEffect, animation-state]
severity: high
component: BizThinkingState, BizBookingState
error_message: "undefined is not an object (evaluating 'steps[current].id')"
framework: React 19.2.0 with Vite 7.3.1
root_cause: Mutable closure variables in useEffect timer chains double-executed by StrictMode
solution_pattern: Replace mutable let variables with useState for step counter management
files_affected:
  - src/components/business-travel/BizThinkingState.tsx
  - src/components/business-travel/BizBookingState.tsx
strictmode_specific: true
---

# React 19 StrictMode Timer Crash in Animated Step Sequences

## Symptom

White screen crash after the "Finding your best options" thinking animation completes. ErrorBoundary catches: `undefined is not an object (evaluating 'steps[current].id')`. Affects both BizThinkingState and BizBookingState components — any component with an animated step sequence using timers.

## Root Cause

React 19 StrictMode double-fires effects on mount (in development). Components used mutable `let current = 0` inside useEffect with setTimeout/setInterval chains. When StrictMode ran the effect twice simultaneously, two chains executed in parallel, both incrementing the same shared variable. This caused `current` to exceed `steps.length`, resulting in an array index out-of-bounds crash.

## What Didn't Work

### Attempt 1: Ref-based timer tracking

Added `timersRef` and `cancelledRef` to cancel chained timeouts. Still crashed — refs don't prevent the double-fire from creating two competing chains. Both effect runs still create and execute their own timer chains simultaneously.

### Attempt 2: Single setInterval replacement

Replaced the setTimeout chain with a single setInterval. Same mutable `current` variable issue persisted — two intervals running in parallel, both incrementing the counter, causing index overflow.

## Working Solution

Replace mutable closure variables with React state to drive the animation sequence:

```tsx
// BROKEN — mutable closure variable corrupted by StrictMode double-fire
useEffect(() => {
  let current = 0
  const interval = setInterval(() => {
    if (current < steps.length) {
      setActiveStep(current)
      setCompletedSteps(prev => [...prev, steps[current].id])
      current++  // Two intervals increment this!
    } else {
      clearInterval(interval)
      setTimeout(onComplete, 600)
    }
  }, 700)
  return () => clearInterval(interval)
}, [steps, onComplete])

// FIXED — React state drives the sequence, one timer per render cycle
const [currentStep, setCurrentStep] = useState(-1)

useEffect(() => {
  if (currentStep < steps.length) {
    const timer = setTimeout(
      () => setCurrentStep(s => s + 1),
      currentStep === -1 ? 500 : 500
    )
    return () => clearTimeout(timer)
  } else {
    const timer = setTimeout(onComplete, 400)
    return () => clearTimeout(timer)
  }
}, [currentStep, steps.length, onComplete])
```

## Why It Works

Each step increment is a state update (`setCurrentStep`) that triggers a new render. The effect fires with a single setTimeout per render. The cleanup function always cancels exactly one timer. When StrictMode double-fires the effect, the second execution's cleanup cancels the first timer and re-runs cleanly — there's no shared mutable state being corrupted by parallel execution.

## Prevention Strategies

### The Golden Rule

> **If a variable is mutated inside a timer/effect, it must be React state (`useState`), not a `let`/`var` closure variable.**

Quick test: "Will my animation break if this effect runs twice?" If yes, use `useState`.

### Anti-patterns to avoid

- `let current = 0` inside useEffect with setTimeout/setInterval
- `array.push()` mutations inside timer callbacks
- Module-level counters referenced from useEffect

### Code review checklist for useEffect + timers

- [ ] Any mutable counters (`let`, `var`)? Replace with `useState`
- [ ] Chained timers sharing variables? Each step should read state, not closure state
- [ ] Missing cleanup return? Every timer needs `clearTimeout`/`clearInterval`

## Related Documentation

- [Multi-State Demo Page Architecture](../patterns/multi-state-demo-page-architecture.md) — Documents the state machine pattern and timer cleanup practices used across all demo pages
- [Backpack Design System Compliance](../ui-bugs/backpack-design-system-compliance-integration.md) — References mock AI delay patterns and the timer cleanup gotcha

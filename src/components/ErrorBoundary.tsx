import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-canvas-contrast flex items-center justify-center px-6">
          <div className="max-w-lg bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-danger mb-2">Something went wrong</h2>
            <pre className="text-sm text-text-secondary bg-canvas-contrast rounded-lg p-4 overflow-auto whitespace-pre-wrap">
              {this.state.error.message}
            </pre>
            <button
              onClick={() => this.setState({ error: null })}
              className="mt-4 bg-sky-blue text-white font-bold px-4 py-2 rounded-lg"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

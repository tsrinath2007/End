'use client'
import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAF7F2]">
          <div className="text-center max-w-md">
            <p className="text-4xl mb-4">⚠️</p>
            <h1 className="text-xl font-bold text-[#1e2d3d] mb-2">Something went wrong</h1>
            <p className="text-sm text-slate-500 mb-4 font-mono bg-slate-100 p-3 rounded-lg break-all">
              {this.state.error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-teal-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-teal-700"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

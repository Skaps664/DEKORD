"use client"

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Report Core Web Vitals to analytics
    const reportWebVitals = (metric: any) => {
      // Send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vital] ${metric.name}:`, metric.value)
      }
    }

    // Dynamic import of web-vitals (optional dependency)
    import('web-vitals')
      .then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(reportWebVitals)
        onFID(reportWebVitals)
        onFCP(reportWebVitals)
        onLCP(reportWebVitals)
        onTTFB(reportWebVitals)
        onINP(reportWebVitals)
      })
      .catch((err) => {
        // Gracefully handle if web-vitals is not available
        console.warn('web-vitals package not available:', err.message)
      })
  }, [])

  return null
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

"use client"

import { useEffect, useState } from "react"
import FacebookPixel from "@/components/facebook-pixel"
import GoogleAnalytics from "@/components/google-analytics"
import { PerformanceMonitor } from "@/components/performance-monitor"

export default function DeferredGlobalScripts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <PerformanceMonitor />
      <GoogleAnalytics />
      <FacebookPixel />
    </>
  )
}

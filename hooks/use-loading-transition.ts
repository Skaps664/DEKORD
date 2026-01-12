"use client"

import { useRouter } from "next/navigation"
import { useState, useCallback } from "react"

export function useLoadingTransition() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const navigate = useCallback((href: string) => {
    setIsNavigating(true)
    
    // Add slight delay for visual feedback
    setTimeout(() => {
      router.push(href)
      // Reset after navigation starts
      setTimeout(() => setIsNavigating(false), 100)
    }, 50)
  }, [router])

  return { navigate, isNavigating }
}

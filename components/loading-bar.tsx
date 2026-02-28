"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

function LoadingBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  // When pathname changes, the new route is already rendered — stop loading
  useEffect(() => {
    setProgress(100)
    const timeout = setTimeout(() => {
      setIsLoading(false)
      setProgress(0)
    }, 200)
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  // Listen to link clicks to START loading immediately
  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval> | null = null

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href && !link.target && link.origin === window.location.origin) {
        const linkUrl = new URL(link.href)
        if (linkUrl.pathname !== window.location.pathname) {
          setIsLoading(true)
          setProgress(10)
          // Simulate progress while waiting for route
          progressInterval = setInterval(() => {
            setProgress(prev => {
              if (prev >= 90) return prev
              return prev + Math.random() * 10
            })
          }, 150)
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      if (progressInterval) clearInterval(progressInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Top Loading Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9999] h-0.5 bg-neutral-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function LoadingBar() {
  return (
    <Suspense fallback={null}>
      <LoadingBarContent />
    </Suspense>
  )
}

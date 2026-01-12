"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

function LoadingBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start loading on route change
    setIsLoading(true)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 10
      })
    }, 100)

    // End loading after route is ready
    const timeout = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(0)
      }, 200)
    }, 600)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timeout)
    }
  }, [pathname, searchParams])

  // Listen to link clicks for instant feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href && !link.target && link.origin === window.location.origin) {
        // Check if it's not the same page
        const linkUrl = new URL(link.href)
        if (linkUrl.pathname !== window.location.pathname) {
          setIsLoading(true)
          setProgress(10)
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Top Loading Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-neutral-200"
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

          {/* Optional: Subtle page overlay for better feedback */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-white/50 backdrop-blur-[2px] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
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

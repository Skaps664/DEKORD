"use client"

import { Suspense, useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

function LoadingBarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[9999] h-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background track */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-neutral-300" />
          
          {/* Animated progress bar */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-black via-neutral-700 to-black"
            initial={{ x: "-100%" }}
            animate={{ 
              x: "100%",
              transition: {
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity
              }
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ 
              x: "200%",
              transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity
              }
            }}
          />
        </motion.div>
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

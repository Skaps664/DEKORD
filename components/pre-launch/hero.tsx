"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Sparkles, Bell, ArrowRight } from "lucide-react"
import { Reveal } from "../reveal"

export function PreLaunchHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 33,
    hours: 12,
    minutes: 45,
    seconds: 30
  })
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.00, 0.95])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Countdown timer - Set your launch date here
  useEffect(() => {
    setMounted(true)
    const launchDate = new Date("2026-02-15T00:00:00").getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = launchDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])



  return (
    <section ref={containerRef} className="relative w-full overflow-hidden min-h-[100svh] lg:min-h-screen flex items-center">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="relative w-full h-full">
          <picture>
            <source srcSet="/hero.webp" media="(min-width: 1024px)" />
            <Image
              src="/hero.webp"
              alt="dekord pre-launch - Premium braided charging cables coming soon"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />
        </div>
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 w-full flex flex-col items-center justify-center px-4 sm:px-6 text-center py-20 sm:py-24"
        style={{ y: contentY }}
      >
        <Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-white">Proudly Designed & Made in Pakistan 🇵🇰</span>
          </motion.div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The Future of{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
              Charging
            </span>
          </motion.h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Explore our pre-launch collection. Pre-order now and get 30% off with automatic discount.
            Limited time offer on premium charging cables.
          </p>
        </Reveal>

        {/* Countdown Timer */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8 max-w-2xl px-4">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-white/70 uppercase tracking-wider">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 w-full max-w-md sm:max-w-none">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-all duration-300 shadow-xl text-sm sm:text-base"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Shop Pre-Launch
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="/catalog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            >
              View All Products
            </motion.a>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={0.5}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 px-4"
          >
            {[
              { value: "30%", label: "Pre-Order Discount" },
              { value: "Free", label: "Shipping" },
              { value: "100%", label: "Made in Pakistan" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </Reveal>
      </motion.div>
    </section>
  )
}

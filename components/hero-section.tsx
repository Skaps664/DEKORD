"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { PackageCheck, Rocket, ShieldCheck } from "lucide-react" // Added PackageCheck, Rocket, and ShieldCheck icon imports
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { AnimatedText } from "./animated-text"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]) // Reduced hero image shrink from 15% to 5%
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const AnimatedTextInline = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Cinematic Effects */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Image
          src="/images/design-mode/u3195299943_une_vue_sur_lespace_toil_--ar_11_--sref_httpss.mj_f1cd1575-c301-46fa-8b30-665ae1ab22a0_3_bloom_subtle_6x.png.jpeg"
          alt="dekord - Premium braided charging cables engineered for durability and style"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Increase overlay opacity for stronger contrast behind text */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 h-full flex items-center justify-center" style={{ y: contentY }}>
        {/* Force visible text color to avoid theme contrast issues */}
        <div className="container-custom text-center text-white px-2 sm:px-2 md:px-3">
          <Reveal>
            <h1 className="leading-none tracking-tight mb-6 drop-shadow-2xl">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold w-full text-center">
                <AnimatedText text="WHY ORDINARY" delay={0.5} />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic mt-2 w-full text-center">
                <AnimatedText text="when you can defy-ordinary" delay={1.1} />
              </div>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Ensure paragraph also has visible color */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/90 mb-12 leading-relaxed px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Experience blazing-fast charging with dekord braided cables – engineered for durability, reliability, and style.
            </motion.p>
          </Reveal>
        </div>
      </motion.div>

      {/* Info Strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <BlurPanel className="mx-4 sm:mx-6 mb-4 sm:mb-6 px-4 sm:px-6 py-3 sm:py-4 bg-black/24 backdrop-blur-md border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-green-400" />
              <span className="text-xs sm:text-sm">100% Pure Copper</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm">Fast PD Charging</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm">Lifetime Warranty</span>
            </div>
          </div>
        </BlurPanel>
      </motion.div>
    </section>
  )
}

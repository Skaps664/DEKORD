"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { AnimatedText } from "./animated-text"
import { HeroText } from "./hero-text"


export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.00, 0.95]) // Reduced hero image shrink from 15% to 5%
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const AnimatedTextInline = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span suppressHydrationWarning>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
            suppressHydrationWarning
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {/* Background Image with intrinsic aspect ratio: width fills viewport, height adapts */}
      <motion.div
        className="relative w-full"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        suppressHydrationWarning
      >
        <div className="relative w-full" suppressHydrationWarning>
          <picture>
            <source srcSet="/banny-1.webp" media="(min-width: 1024px)" />
            <Image
              src="/test-12.webp"
              alt="dekord hero image - Premium braided charging cables"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
              priority
              sizes="100vw"
            />
          </picture>

          {/* Increase overlay opacity for stronger contrast behind text */}
          <div className="absolute inset-0  pointer-events-none" suppressHydrationWarning />
        </div>
      </motion.div>
      {/* Info strip below the text */}
      <HeroText contentY={contentY} />

    </section>
  )
}

"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"
import { AnimatedText } from "./animated-text"
import { HeroText } from "./hero-text"


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
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {/* Background Image with intrinsic aspect ratio: width fills viewport, height adapts */}
      <motion.div
        className="relative w-full"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="relative w-full">
          <picture>
            <source srcSet="/test-11.webp" media="(min-width: 1024px)" />
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
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>
      </motion.div><motion.div className="absolute inset-0 z-10 flex items-center justify-center" style={{ y: contentY }}>
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
        </div>
      </motion.div>
 
      {/* Text content moved below the hero image - uses HeroText component */}
      <HeroText contentY={contentY} />

    </section>
  )
}

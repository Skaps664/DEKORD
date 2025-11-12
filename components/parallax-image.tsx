"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  parallaxOffset?: number
}

export function ParallaxImage({ src, alt, className, parallaxOffset = 12 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Ensure the Image has a positioned parent with explicit size for `fill` to work */}
        <div className="relative w-full h-full">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </motion.div>
    </div>
  )
}

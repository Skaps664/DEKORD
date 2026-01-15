"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

const materials = [
  {
    id: "dek",
    name: "Lava Red",
    description: "Premium braided cables with reinforced connector joints",
    image: "/dek-red-5.webp",
    backgroundImage:
      "/dek-red-5.webp",
    tint: "bg-blue-50",
  },
  {
    id: "weev",
    name: "Ash White",
    description: "Hand-crafted cables with high-density braided jacket",
    image: "/dek-white-5.webp",
    backgroundImage: "/dek-white-5.webp",
    tint: "bg-gray-100",
  },
  {
    id: "featured",
    name: "Yellows",
    description: "Our best-selling cables with stable PD chipset",
    image: "/dek-yellow-5.webp",
    backgroundImage: "/dek-yellow-5.webp",
    tint: "bg-red-50",
  },
]

export function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState("dek")
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const activeMaterialData = materials.find((m) => m.id === activeMaterial) || materials[0]

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    if (isMobile) {
      return <span>{text}</span>
    }
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
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden" id="materials">
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        {materials.map((material) => (
          <motion.div
            key={material.id}
            className="absolute inset-0"
            initial={{ opacity: material.id === activeMaterial ? 1 : 0 }}
            animate={{ opacity: material.id === activeMaterial ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            suppressHydrationWarning
          >
            <Image
              src={material.backgroundImage || "/placeholder.svg"}
              alt={`${material.name} interior scene`}
              fill
              className="object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/20" suppressHydrationWarning />
      </div>

      <div className="absolute top-[80px] sm:top-[120px] left-0 right-0 z-10" suppressHydrationWarning>
        <div className="container-custom text-white px-4 sm:px-6" suppressHydrationWarning>
          <Reveal>
            <div suppressHydrationWarning>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeMaterial}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="font-bold mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
                  suppressHydrationWarning
                >
                  <AnimatedText text={activeMaterialData.name} delay={0.2} />
                </motion.h2>
              </AnimatePresence>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl break-words">
                Every cable begins with the finest materials: 100% pure copper core, high-density braided jacket, and reinforced connector joints. Engineered for durability, reliability, and style.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-10 max-w-md hidden" suppressHydrationWarning>
        <Reveal delay={0.3}>
          <blockquote className="pl-0 py-4">
            <p className="text-xl text-white leading-relaxed italic lg:text-base font-medium">
              "We make things that work better and last longer. dekord cables bring fashion and function together."
            </p>
            <footer className="mt-4 text-sm text-white/70">— dekord</footer>
          </blockquote>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10" suppressHydrationWarning>
        <div className="container-custom" suppressHydrationWarning>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3" suppressHydrationWarning>
              {materials.map((material) => (
                <motion.button
                  key={material.id}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md",
                    activeMaterial === material.id
                      ? "bg-white text-neutral-900"
                      : "bg-white/20 text-white hover:bg-white/30",
                  )}
                  onClick={() => setActiveMaterial(material.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  suppressHydrationWarning
                >
                  {material.name}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"

const collections = [
  {
    id: "dek-series",
    name: "DEK SERIES",
    image: "/duo-1.webp",
    count: "Premium Cables",
  },
  {
    id: "weev-series",
    name: "WEEV SERIES",
    image: "/duo-3.webp",
    count: "Hand Crafted",
  },
  {
    id: "featured",
    name: "FEATURED",
    image: "/duo-4.webp",
    count: "Best Sellers",
  },
  {
    id: "type-c",
    name: "USB-C CABLES",
    image: "/duo-5.webp",
    count: "60-100W PD",
  },

]

export function CollectionStrip() {
  const [containerWidth, setContainerWidth] = useState(1200)
  
  useEffect(() => {
    setContainerWidth(window.innerWidth)
    
    const handleResize = () => {
      setContainerWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  // To create the illusion of an infinite, endlessly draggable strip
  // we repeat the base `collections` array multiple times. This keeps
  // the implementation simple and avoids complex position-reset logic.
  const repeatTimes = 10 // increase for longer apparent infinity
  const displayed = Array.from({ length: collections.length * repeatTimes }).map((_, i) => collections[i % collections.length])

  const itemWidth = 320 // 320px (w-80) + 32px gap = 352px per item
  const totalWidth = displayed.length * (itemWidth + 32) - 32 // subtract last gap
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48) // add padding

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-4xl sm:text-5xl md:text-6xl font-normal break-words max-w-full mx-auto" style={{wordBreak: 'break-word', overflowWrap: 'break-word'}}>
              SHOP BY COLLECTION
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our cable collections, each engineered for specific needs - from premium DEK series to hand-crafted WEEV cables.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 px-2 sm:px-3 md:px-4"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
        >
          {displayed.map((collection, index) => (
            <motion.div
              key={`${collection.id}-${index}`}
              className="flex-shrink-0 w-80 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ filter: "blur(1px)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-center text-white"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold tracking-wider mb-2">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.count}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← Drag to explore collections →</p>
      </div>
    </section>
  )
}

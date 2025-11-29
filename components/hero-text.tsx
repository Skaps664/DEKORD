"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Cable, Truck } from "lucide-react"
import { Reveal } from "./reveal"
import { AnimatedText } from "./animated-text"

export function HeroText() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
      title: "1 Year Warranty",
    },
    {
      icon: <Cable className="w-6 h-6 text-green-400" />,
      title: "100% Pure Copper",
    },
    {
      icon: <Truck className="w-6 h-6 text-amber-400" />,
      title: "Fast Delivery",
    },
  ]

  return (
    <div className="relative flex flex-col items-center mt-12 sm:mt-16 px-4 sm:px-0">
      <div className="flex gap-6 sm:gap-10 mb-8">
        {features.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col items-center text-center bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl px-6 py-4 shadow-lg hover:scale-105 transition-transform cursor-default"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full  border border-white/20 backdrop-blur-md mb-2">
              {item.icon}
            </div>
            <p className="text-black/70  text-sm sm:text-base drop-shadow-md">
              {item.title}
            </p>
          </motion.div>
          
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center px-2 sm:px-2 md:px-3"
      >
        <div className="text-black">
          <Reveal>
            <h1 className="leading-none tracking-tight">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black/90">
                <AnimatedText text="WHY ORDINARY" delay={0.5} />
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light italic mt-2 text-black/90">
                <AnimatedText text="from design to durability, every inch defies ordinary" delay={1.1} />
              </div>
            </h1>
          </Reveal>
        </div>
      </motion.div>
    </div>
  )
}

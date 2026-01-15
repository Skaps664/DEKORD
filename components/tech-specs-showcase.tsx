"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Reveal } from "./reveal"
import { Zap, Shield, Gauge, Cable, Cpu, Battery, CheckCircle2, Activity } from "lucide-react"

const specs = [
  {
    icon: Zap,
    label: "Power Delivery",
    value: "60-65",
    unit: "W",
    description: "Maximum charging power",
    color: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/10",
    detail: "Fast charge laptops, tablets & phones"
  },
  {
    icon: Gauge,
    label: "Data Transfer",
    value: "480",
    unit: "Mbps",
    description: "Lightning-fast file transfer",
    color: "from-blue-500 to-cyan-600",
    bgGlow: "bg-blue-500/10",
    detail: "4K video in seconds"
  },
  {
    icon: Shield,
    label: "Durability",
    value: "20000",
    unit: "+",
    description: "Bend test cycles",
    color: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-500/10",
    detail: "Military-grade construction"
  },
  {
    icon: Cable,
    label: "Cable Gauge",
    value: "20",
    unit: "AWG",
    description: "Premium copper core",
    color: "from-purple-500 to-violet-600",
    bgGlow: "bg-purple-500/10",
    detail: "99.9% pure copper wiring"
  },
  {
    icon: Activity,
    label: "Signal Integrity",
    value: "99.9",
    unit: "%",
    description: "Error-free transmission",
    color: "from-pink-500 to-rose-600",
    bgGlow: "bg-pink-500/10",
    detail: "Triple-shielded technology"
  },
  {
    icon: Battery,
    label: "Charging Speed",
    value: "3",
    unit: "x",
    description: "Faster than standard",
    color: "from-teal-500 to-cyan-600",
    bgGlow: "bg-teal-500/10",
    detail: "0-50% in 30 minutes"
  },
]

const features = [
  { icon: CheckCircle2, text: "Chip Certified", gradient: "from-blue-600 to-cyan-600" },
  { icon: CheckCircle2, text: "Double-Braided Layer", gradient: "from-purple-600 to-pink-600" },
  { icon: CheckCircle2, text: "Inner Mold Housing", gradient: "from-amber-600 to-orange-600" },
  { icon: CheckCircle2, text: "Reinforced SR Joints", gradient: "from-emerald-600 to-green-600" },
  { icon: CheckCircle2, text: "Universal Compatibility", gradient: "from-rose-600 to-red-600" },
  { icon: CheckCircle2, text: "Heat-Resistant Design", gradient: "from-indigo-600 to-purple-600" },
]

function AnimatedCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""))
      motionValue.set(numericValue)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const formatted = value.includes(".") 
        ? latest.toFixed(1) 
        : Math.floor(latest).toString()
      setDisplayValue(formatted)
    })
    return unsubscribe
  }, [springValue, value])

  return <span ref={ref}>{displayValue}</span>
}

function SpecCard({ spec, index }: { spec: typeof specs[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = spec.icon

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        className="relative group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl ${spec.bgGlow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
        />
        
        <div className="relative bg-white border border-neutral-200 rounded-2xl p-6 lg:p-8 overflow-hidden">
          {/* Top gradient line */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${spec.color}`} />
          
          {/* Icon */}
          <motion.div
            className={`inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br ${spec.color} mb-4 lg:mb-6`}
            animate={{
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} />
          </motion.div>

          {/* Value */}
          <div className="mb-3 lg:mb-4">
            <div className="flex items-baseline gap-1">
              <motion.span
                className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${spec.color} bg-clip-text text-transparent`}
              >
                <AnimatedCounter value={spec.value} />
              </motion.span>
              <span className={`text-2xl lg:text-3xl font-semibold bg-gradient-to-r ${spec.color} bg-clip-text text-transparent`}>
                {spec.unit}
              </span>
            </div>
          </div>

          {/* Label */}
          <h3 className="text-lg lg:text-xl font-semibold text-neutral-900 mb-2">
            {spec.label}
          </h3>
          
          {/* Description */}
          <p className="text-sm lg:text-base text-neutral-600 mb-3">
            {spec.description}
          </p>

          {/* Detail */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs lg:text-sm text-neutral-500 pt-2 border-t border-neutral-100">
              {spec.detail}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </Reveal>
  )
}

function FeatureTag({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon
  
  return (
    <Reveal delay={0.6 + index * 0.05}>
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
          <Icon className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
        <span className="text-sm font-medium text-neutral-700">
          {feature.text}
        </span>
      </motion.div>
    </Reveal>
  )
}

export function TechSpecsShowcase() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative py-16 lg:py-28 bg-gradient-to-b from-neutral-50 via-white to-neutral-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <Reveal>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Cpu className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Technical Excellence</span>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-neutral-900 mb-4 lg:mb-6 tracking-tight">
              ENGINEERED FOR
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                PEAK PERFORMANCE
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-base lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Every dekord cable is built with precision engineering and premium materials.
              <span className="block mt-2">
                Here&apos;s what sets us apart from the competition.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {specs.map((spec, index) => (
            <SpecCard key={spec.label} spec={spec} index={index} />
          ))}
        </div>

        {/* Features Section */}
        <Reveal delay={0.5}>
          <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            />

            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 text-center">
                Premium Features Included
              </h3>
              <p className="text-neutral-400 text-center mb-8 lg:mb-10">
                Every cable comes with industry-leading technology
              </p>

              <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
                {features.map((feature, index) => (
                  <FeatureTag key={feature.text} feature={feature} index={index} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom CTA */}
        <Reveal delay={0.7}>
          <div className="text-center mt-12 lg:mt-16">
            <motion.p
              className="text-sm lg:text-base text-neutral-600 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Certified by international standards · Tested for reliability · Built to last
            </motion.p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Zap, Cable, Shield, Gauge, Cpu, Battery, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const specifications = [
  {
    category: "Performance",
    icon: Zap,
    specs: [
      { label: "Power Delivery", value: "60W (20V/3A)" },
      { label: "Data Transfer Speed", value: "480 Mbps (USB 3.2 Gen 2)" },
      { label: "Charging Protocol", value: "USB PD 3.0, USB 2.0" },
      { label: "Video Output", value: "-" },
    ]
  },
  {
    category: "Build Quality",
    icon: Shield,
    specs: [
      { label: "Cable Jacket", value: "Double-Braided Layer" },
      { label: "Conductor Material", value: "Tinned Copper (99.9% Pure)" },
      { label: "Connector Housing", value: "Inner Mold Housing" },
      { label: "Bend Lifespan", value: "20,000+ Cycles Tested" },
    ]
  },
  {
    category: "Technical Details",
    icon: Cpu,
    specs: [
      { label: "Wire Gauge", value: "20 AWG" },
      { label: "Chip", value: "Certified (PD 3.0 Compliant)" },
      { label: "Shielding", value: "Triple Layer (Al-Foil + Braided)" },
      { label: "Temperature Range", value: "-20°C to 80°C" },
    ]
  },
  {
    category: "Compatibility",
    icon: Cable,
    specs: [
      { label: "Devices", value: "iPhone 15/16, MacBook, iPad, Samsung Galaxy" },
      { label: "Ports", value: "USB-C to USB-C, USB-C to Lightning" },
      { label: "Operating Systems", value: "iOS, Android, Windows, macOS" },
      { label: "Chargers", value: "All USB-C PD Chargers" },
    ]
  },
  {
    category: "Standards",
    icon: CheckCircle2,
    specs: [
      { label: "Safety Standards", value: "UL, CE, FCC, RoHS" },
      { label: "USB-IF Standards", value: "Yes" },
      { label: "MFi Standards", value: "Yes (for Lightning variants)" },
      { label: "Environmental", value: "RoHS 2.0 Standard" },
    ]
  },
]

export function ProductSpecifications() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="container-custom py-6 sm:py-8 md:py-12">
      <div className="rounded-xl ring-1 ring-border overflow-hidden bg-card/40">
        {/* Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 sm:p-8 flex items-center justify-between hover:bg-muted/30 transition-colors duration-200"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center">
              <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h2 className="font-semibold text-lg sm:text-xl md:text-2xl">
                Technical Specifications
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-0.5">
                {isExpanded ? "Hide detailed specs" : "View complete technical details"}
              </p>
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </button>

        {/* Collapsed Preview - 3 Quick Specs */}
        <AnimatePresence mode="wait">
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-amber-600" strokeWidth={2.5} />
                    <dt className="text-xs sm:text-sm font-medium text-muted-foreground">Power Delivery</dt>
                  </div>
                  <dd className="text-base sm:text-lg font-semibold">60W Fast Charging</dd>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
                    <dt className="text-xs sm:text-sm font-medium text-muted-foreground">Data Transfer</dt>
                  </div>
                  <dd className="text-base sm:text-lg font-semibold">480 Mbps Speed</dd>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                    <dt className="text-xs sm:text-sm font-medium text-muted-foreground">Durability</dt>
                  </div>
                  <dd className="text-base sm:text-lg font-semibold">20,000+ Bends</dd>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Full Specifications */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden border-t border-border"
            >
              <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                {specifications.map((section, sectionIndex) => {
                  const Icon = section.icon
                  return (
                    <motion.div
                      key={section.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1, duration: 0.4 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-2 sm:gap-3 pb-3 border-b border-border">
                        <div className={cn(
                          "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center",
                          sectionIndex === 0 && "bg-amber-100",
                          sectionIndex === 1 && "bg-green-100",
                          sectionIndex === 2 && "bg-blue-100",
                          sectionIndex === 3 && "bg-purple-100",
                          sectionIndex === 4 && "bg-emerald-100"
                        )}>
                          <Icon className={cn(
                            "w-4 h-4 sm:w-5 sm:h-5",
                            sectionIndex === 0 && "text-amber-700",
                            sectionIndex === 1 && "text-green-700",
                            sectionIndex === 2 && "text-blue-700",
                            sectionIndex === 3 && "text-purple-700",
                            sectionIndex === 4 && "text-emerald-700"
                          )} strokeWidth={2.5} />
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg">{section.category}</h3>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {section.specs.map((spec, specIndex) => (
                          <motion.div
                            key={spec.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: sectionIndex * 0.1 + specIndex * 0.05, duration: 0.3 }}
                            className="p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200"
                          >
                            <dt className="text-xs sm:text-sm text-muted-foreground mb-1">{spec.label}</dt>
                            <dd className="text-sm sm:text-base font-medium">{spec.value}</dd>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}

                {/* Bottom Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4 sm:pt-6 border-t border-border"
                >
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">
                    All specifications are tested under controlled laboratory conditions. 
                    Actual performance may vary based on device and usage conditions.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

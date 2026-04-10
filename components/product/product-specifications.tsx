"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Gauge } from "lucide-react"
import { cn } from "@/lib/utils"
import { getIconComponent } from "@/lib/icon-map"
import type { SpecificationCategory, QuickSpec } from "@/lib/types/database"

const defaultSpecifications: SpecificationCategory[] = [
  {
    category: "Performance",
    icon: "zap",
    specs: [
      { label: "Power Delivery", value: "60W (20V/3A)" },
      { label: "Data Transfer Speed", value: "480 Mbps (USB 3.2 Gen 2)" },
      { label: "Charging Protocol", value: "USB PD 3.0, USB 2.0" },
      { label: "Video Output", value: "-" },
    ]
  },
  {
    category: "Build Quality",
    icon: "shield",
    specs: [
      { label: "Cable Jacket", value: "Double-Braided Layer" },
      { label: "Conductor Material", value: "Tinned Copper (99.9% Pure)" },
      { label: "Connector Housing", value: "Inner Mold Housing" },
      { label: "Bend Lifespan", value: "20,000+ Cycles Tested" },
    ]
  },
  {
    category: "Technical Details",
    icon: "cpu",
    specs: [
      { label: "Wire Gauge", value: "20 AWG" },
      { label: "Chip", value: "Certified (PD 3.0 Compliant)" },
      { label: "Shielding", value: "Triple Layer (Al-Foil + Braided)" },
      { label: "Temperature Range", value: "-20°C to 80°C" },
    ]
  },
  {
    category: "Compatibility",
    icon: "cable",
    specs: [
      { label: "Devices", value: "iPhone 15/16, MacBook, iPad, Samsung Galaxy" },
      { label: "Ports", value: "USB-C to USB-C, USB-C to Lightning" },
      { label: "Operating Systems", value: "iOS, Android, Windows, macOS" },
      { label: "Chargers", value: "All USB-C PD Chargers" },
    ]
  },
  {
    category: "Standards",
    icon: "check-circle",
    specs: [
      { label: "Safety Standards", value: "UL, CE, FCC, RoHS" },
      { label: "USB-IF Standards", value: "Yes" },
      { label: "MFi Standards", value: "Yes (for Lightning variants)" },
      { label: "Environmental", value: "RoHS 2.0 Standard" },
    ]
  },
]

const defaultQuickSpecs: QuickSpec[] = [
  { icon: "zap", label: "Power Delivery", value: "60W Fast Charging" },
  { icon: "gauge", label: "Data Transfer", value: "480 Mbps Speed" },
  { icon: "shield", label: "Durability", value: "20,000+ Bends" },
]

const sectionColors = [
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
]

interface ProductSpecificationsProps {
  specifications?: SpecificationCategory[]
  quickSpecs?: QuickSpec[]
}

export function ProductSpecifications({ specifications, quickSpecs }: ProductSpecificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const specs = specifications && specifications.length > 0 ? specifications : defaultSpecifications
  const qSpecs = quickSpecs && quickSpecs.length > 0 ? quickSpecs : defaultQuickSpecs

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
                {isExpanded ? "Click to collapse detailed specs" : "Click to expand detailed technical details"}
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

        {/* Collapsed Preview - Quick Specs */}
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
                {qSpecs.map((qs, idx) => {
                  const QIcon = getIconComponent(qs.icon)
                  const colorClasses = ["text-amber-600", "text-blue-600", "text-green-600"]
                  return (
                    <div key={idx} className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <QIcon className={cn("w-4 h-4", colorClasses[idx] || "text-amber-600")} strokeWidth={2.5} />
                        <dt className="text-xs sm:text-sm font-medium text-muted-foreground">{qs.label}</dt>
                      </div>
                      <dd className="text-base sm:text-lg font-semibold">{qs.value}</dd>
                    </div>
                  )
                })}
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
                {specs.map((section, sectionIndex) => {
                  const Icon = getIconComponent(section.icon)
                  const colors = sectionColors[sectionIndex % sectionColors.length]
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
                          colors.bg
                        )}>
                          <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5", colors.text)} strokeWidth={2.5} />
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

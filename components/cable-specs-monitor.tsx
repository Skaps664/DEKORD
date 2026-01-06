"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cable, Zap, Shield, Gauge, CheckCircle2, Activity } from "lucide-react"

interface DataPoint {
  value: number
  timestamp: number
  isSpike?: boolean
}

interface CableSpecData {
  transferSpeed: DataPoint[]
  signalIntegrity: DataPoint[]
  durability: DataPoint[]
  powerDelivery: DataPoint[]
  compatibility: DataPoint[]
}

interface CableModel {
  id: string
  name: string
  performance: DataPoint[]
  color: string
}

const generateDataPoint = (baseValue: number, variance: number, spikeChance = 0.05): DataPoint => {
  const isSpike = Math.random() < spikeChance
  const multiplier = isSpike ? 1.5 + Math.random() * 0.5 : 1
  const value = Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance * multiplier))

  return {
    value,
    timestamp: Date.now(),
    isSpike: isSpike && value > 70,
  }
}

const Sparkline = ({
  data,
  color = "#3b82f6",
  spikeColor = "#10b981",
  width = 80,
  height = 24,
}: {
  data: DataPoint[]
  color?: string
  spikeColor?: string
  width?: number
  height?: number
}) => {
  const pathRef = useRef<SVGPathElement>(null)

  const points = data.map((point, index) => ({
    x: (index / (data.length - 1)) * width,
    y: height - (point.value / 100) * height,
    isSpike: point.isSpike,
  }))

  const path = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`
    return `${acc} L ${point.x} ${point.y}`
  }, "")

  const hasSpikes = points.some((p) => p.isSpike)

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={hasSpikes ? spikeColor : color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={hasSpikes ? spikeColor : color} stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <motion.path
        ref={pathRef}
        d={`${path} L ${width} ${height} L 0 ${height} Z`}
        fill={`url(#gradient-${color})`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.path
        d={path}
        fill="none"
        stroke={hasSpikes ? spikeColor : color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Spike indicators */}
      {points.map((point, index) =>
        point.isSpike ? (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={2.5}
            fill={spikeColor}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * 0.05,
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          />
        ) : null,
      )}
    </svg>
  )
}

const SpecCard = ({
  icon: Icon,
  label,
  value,
  data,
  color,
  unit = "%",
}: {
  icon: any
  label: string
  value: number
  data: DataPoint[]
  color: string
  unit?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const hasSpikes = data.some((d) => d.isSpike)

  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted"
        animate={{
          backgroundColor: hasSpikes ? "#f0fdf4" : undefined,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Icon className={`w-5 h-5 ${hasSpikes ? "text-green-600" : "text-muted-foreground"}`} />
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <motion.span
            className={`text-sm font-mono font-semibold ${hasSpikes ? "text-green-600" : "text-foreground"}`}
            animate={{ color: hasSpikes ? "#16a34a" : undefined }}
          >
            {value.toFixed(1)} {unit}
          </motion.span>
        </div>
        <div className="mt-1">
          <Sparkline data={data} color={color} />
        </div>
      </div>
    </motion.div>
  )
}

const CableModelCard = ({ cableModel }: { cableModel: CableModel }) => {
  const [isHovered, setIsHovered] = useState(false)
  const currentValue = cableModel.performance[cableModel.performance.length - 1]?.value || 0
  const hasSpikes = cableModel.performance.some((d) => d.isSpike)

  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-muted/30"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: hasSpikes ? "#10b981" : cableModel.color }}
        animate={{
          scale: isHovered ? 1.3 : 1,
          backgroundColor: hasSpikes ? "#10b981" : cableModel.color,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-foreground truncate">{cableModel.name}</span>
          <motion.span
            className={`text-sm font-mono font-semibold ml-3 ${hasSpikes ? "text-green-600" : "text-foreground"}`}
            animate={{ color: hasSpikes ? "#10b981" : undefined }}
          >
            {currentValue.toFixed(0)}%
          </motion.span>
        </div>
        <div className="mt-1">
          <Sparkline data={cableModel.performance} color={cableModel.color} width={60} height={16} />
        </div>
      </div>
    </motion.div>
  )
}

export default function CableSpecsMonitor() {
  const [cableSpecData, setCableSpecData] = useState<CableSpecData>({
    transferSpeed: [],
    signalIntegrity: [],
    durability: [],
    powerDelivery: [],
    compatibility: [],
  })

  const [cableModels] = useState<CableModel[]>([
    { id: "1", name: "USB-C 3.2 Gen 2", performance: [], color: "#3b82f6" },
    { id: "2", name: "Thunderbolt 4", performance: [], color: "#8b5cf6" },
    { id: "3", name: "USB-C PD 100W", performance: [], color: "#10b981" },
    { id: "4", name: "HDMI 2.1 Ultra", performance: [], color: "#f59e0b" },
    { id: "5", name: "DisplayPort 1.4", performance: [], color: "#ec4899" },
  ])

  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCableSpecData((prev) => {
        const maxPoints = 25

        return {
          transferSpeed: [...prev.transferSpeed, generateDataPoint(85, 15, 0.12)].slice(-maxPoints),
          signalIntegrity: [...prev.signalIntegrity, generateDataPoint(92, 8, 0.15)].slice(-maxPoints),
          durability: [...prev.durability, generateDataPoint(88, 12, 0.08)].slice(-maxPoints),
          powerDelivery: [...prev.powerDelivery, generateDataPoint(78, 20, 0.1)].slice(-maxPoints),
          compatibility: [...prev.compatibility, generateDataPoint(95, 5, 0.1)].slice(-maxPoints),
        }
      })

      // Update cable model performance
      cableModels.forEach((cable) => {
        const basePerf =
          cable.id === "1" ? 85 : cable.id === "2" ? 95 : cable.id === "3" ? 90 : cable.id === "4" ? 88 : 92
        const newPoint = generateDataPoint(basePerf, 10, 0.12)
        cable.performance = [...cable.performance, newPoint].slice(-20)
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [cableModels])

  const currentTransferSpeed = cableSpecData.transferSpeed[cableSpecData.transferSpeed.length - 1]?.value || 0
  const currentSignalIntegrity = cableSpecData.signalIntegrity[cableSpecData.signalIntegrity.length - 1]?.value || 0
  const currentDurability = cableSpecData.durability[cableSpecData.durability.length - 1]?.value || 0
  const currentPowerDelivery = cableSpecData.powerDelivery[cableSpecData.powerDelivery.length - 1]?.value || 0
  const currentCompatibility = cableSpecData.compatibility[cableSpecData.compatibility.length - 1]?.value || 0

  const hasAnySpikes = [
    ...cableSpecData.transferSpeed,
    ...cableSpecData.signalIntegrity,
    ...cableSpecData.durability,
    ...cableSpecData.powerDelivery,
    ...cableSpecData.compatibility,
    ...cableModels.flatMap((c) => c.performance),
  ].some((d) => d.isSpike)

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto p-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="w-full bg-background/95 backdrop-blur-sm border border-border shadow-lg">
        <motion.div
          className="p-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: hasAnySpikes ? 360 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Cable className={`w-6 h-6 ${hasAnySpikes ? "text-green-600" : "text-muted-foreground"}`} />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold">Cable Performance Monitor</h3>
                <p className="text-sm text-muted-foreground">Real-time specification tracking</p>
              </div>
              {hasAnySpikes && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Badge variant="default" className="text-xs px-2 py-1 bg-green-600">
                    Peak Performance
                  </Badge>
                </motion.div>
              )}
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="text-muted-foreground text-xl"
            >
              ▼
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SpecCard
              icon={Gauge}
              label="Transfer Speed"
              value={currentTransferSpeed}
              data={cableSpecData.transferSpeed}
              color="#3b82f6"
              unit="Gbps"
            />
            <SpecCard
              icon={Activity}
              label="Signal Integrity"
              value={currentSignalIntegrity}
              data={cableSpecData.signalIntegrity}
              color="#10b981"
            />
            <SpecCard
              icon={Shield}
              label="Durability Rating"
              value={currentDurability}
              data={cableSpecData.durability}
              color="#f59e0b"
            />
            <SpecCard
              icon={Zap}
              label="Power Delivery"
              value={currentPowerDelivery}
              data={cableSpecData.powerDelivery}
              color="#8b5cf6"
              unit="W"
            />
            <SpecCard
              icon={CheckCircle2}
              label="Compatibility"
              value={currentCompatibility}
              data={cableSpecData.compatibility}
              color="#ec4899"
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-border">
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Cable Model Performance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cableModels.map((cable, index) => (
                      <motion.div
                        key={cable.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <CableModelCard cableModel={cable} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

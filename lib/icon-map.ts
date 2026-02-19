import {
  Zap, Shield, Cpu, Cable, CheckCircle2, Gauge, Battery,
  Truck, Star, Heart, Award, Package, Wifi, Bluetooth,
  Monitor, Smartphone, Headphones, Volume2, Thermometer,
  Droplet, Sun, Lock, RefreshCw, Layers
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  "zap": Zap,
  "shield": Shield,
  "cpu": Cpu,
  "cable": Cable,
  "check-circle": CheckCircle2,
  "gauge": Gauge,
  "battery": Battery,
  "truck": Truck,
  "star": Star,
  "heart": Heart,
  "award": Award,
  "box": Package,
  "wifi": Wifi,
  "bluetooth": Bluetooth,
  "monitor": Monitor,
  "smartphone": Smartphone,
  "headphones": Headphones,
  "volume-2": Volume2,
  "thermometer": Thermometer,
  "droplet": Droplet,
  "sun": Sun,
  "lock": Lock,
  "refresh-cw": RefreshCw,
  "layers": Layers,
}

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || Zap
}

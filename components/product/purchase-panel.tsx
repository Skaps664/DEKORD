"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ShoppingCart, Zap, Shield, Truck, Plus, Minus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const colors = [
  { 
    name: "Obsidian Black", 
    token: "bg-neutral-900", 
    ring: "ring-neutral-900", 
    overlay: "bg-neutral-900/10",
    shadow: "shadow-neutral-900/50"
  },
  { 
    name: "Ivory White", 
    token: "bg-neutral-100", 
    ring: "ring-neutral-900", 
    overlay: "bg-neutral-100/20",
    shadow: "shadow-neutral-400/50"
  },
  { 
    name: "Army Green", 
    token: "bg-green-700", 
    ring: "ring-green-700", 
    overlay: "bg-green-700/15",
    shadow: "shadow-green-700/50"
  },
  { 
    name: "Dark Blue", 
    token: "bg-blue-900", 
    ring: "ring-blue-900", 
    overlay: "bg-blue-900/15",
    shadow: "shadow-blue-900/50"
  },
  { 
    name: "Yellow", 
    token: "bg-yellow-400", 
    ring: "ring-yellow-400", 
    overlay: "bg-yellow-400/15",
    shadow: "shadow-yellow-400/50"
  },
  { 
    name: "Red", 
    token: "bg-red-600", 
    ring: "ring-red-600", 
    overlay: "bg-red-600/15",
    shadow: "shadow-red-600/50"
  },
]

const lengths = ["0.5 m", "1 m", "2 m"]

interface PurchasePanelProps {
  onColorChange?: (overlayClass: string, shadowClass: string) => void
  activeColorShadow?: string
}

export function PurchasePanel({ onColorChange, activeColorShadow }: PurchasePanelProps) {
  const [activeColor, setActiveColor] = useState(colors[0].name)
  const [activeLength, setActiveLength] = useState(lengths[1])
  const [quantity, setQuantity] = useState(1)
  const [isHovering, setIsHovering] = useState(false)
  const [showSadEmoji, setShowSadEmoji] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleColorChange = (colorName: string, overlayClass: string, shadowClass: string) => {
    setActiveColor(colorName)
    
    // Trigger the page-level color flash
    if (onColorChange) {
      onColorChange(overlayClass, shadowClass)
    }
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  const handleMouseEnter = () => {
    if (isAnimating) return
    setIsHovering(true)
    setShowSadEmoji(false)
    setIsAnimating(true)
    
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleMouseLeave = () => {
    if (isAnimating) return
    setIsHovering(false)
    setIsAnimating(true)
    
    // Show sad emoji immediately
    setShowSadEmoji(true)
    
    // Hide sad emoji and allow button to expand after it's done
    setTimeout(() => {
      setShowSadEmoji(false)
    }, 1200)
    
    // Reset animation lock
    setTimeout(() => {
      setIsAnimating(false)
    }, 1600)
  }

  return (
    <aside className={cn(
      "rounded-2xl ring-1 ring-border bg-white overflow-hidden sticky top-20 transition-shadow duration-500",
      "shadow-lg",
      activeColorShadow && activeColorShadow
    )}>
      {/* Header with Price */}
      <div className="p-6 border-b border-border bg-gradient-to-br from-neutral-50 to-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Dekord Braided USB‑C Cable</h2>
            <p className="text-sm text-neutral-600 mt-1">Premium fast charging cable</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-neutral-900">$19</p>
            <p className="text-xs text-neutral-500">Free shipping</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="p-6 space-y-4">
        {/* Color Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-neutral-900">Color</p>
            <p className="text-xs text-neutral-600">{activeColor}</p>
          </div>
          <div className="flex items-center gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                aria-label={c.name}
                onClick={() => handleColorChange(c.name, c.overlay, c.shadow)}
                className={cn(
                  "h-12 w-12 rounded-full ring-2 ring-offset-2 transition-all hover:scale-110",
                  c.token,
                  activeColor === c.name ? c.ring + " ring-offset-0" : "ring-transparent"
                )}
              />
            ))}
          </div>
        </div>

        {/* Length Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-neutral-900">Length</p>
            <p className="text-xs text-neutral-600">{activeLength}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {lengths.map((l) => (
              <button
                key={l}
                onClick={() => setActiveLength(l)}
                className={cn(
                  "h-11 rounded-lg text-sm font-medium transition-all",
                  "ring-1 ring-border hover:ring-neutral-900",
                  activeLength === l
                    ? "bg-neutral-900 text-white ring-neutral-900"
                    : "bg-white text-neutral-900"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 relative">
          {/* Quantity and Add to Cart Row */}
          <div className="flex items-center gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center gap-1 border-2 border-neutral-900 rounded-lg">
              <button
                onClick={decrementQuantity}
                className="h-12 w-10 flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="h-12 w-10 flex items-center justify-center font-semibold text-neutral-900">
                {quantity}
              </div>
              <button
                onClick={incrementQuantity}
                className="h-12 w-10 flex items-center justify-center hover:bg-neutral-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button 
              size="lg"
              variant="outline" 
              className="flex-1 h-12 text-base font-semibold border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Buy Now Button with Emoji */}
          <div className="relative pt-6">
            <Button 
              size="lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={cn(
                "w-full text-base font-semibold bg-neutral-900 hover:bg-neutral-800 transition-all duration-500 ease-out relative overflow-visible",
                isHovering || showSadEmoji ? "h-20" : "h-14"
              )}
            >
              <div className="flex items-center justify-center">
                <Zap className="w-4 h-4 mr-2" />
                Buy Now
              </div>
            </Button>
            
            {/* Emoji Container - Above button */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 pointer-events-none">
              <AnimatePresence mode="wait">
                {isHovering && (
                  <motion.div
                    key="happy"
                    initial={{ opacity: 0, scale: 0.3, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -5 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-5xl"
                  >
                    😊
                  </motion.div>
                )}
                {showSadEmoji && (
                  <motion.div
                    key="sad"
                    initial={{ opacity: 0, scale: 0.5, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.3, y: 10 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-5xl"
                  >
                    😿
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-900">60W Fast Charging</p>
              <p className="text-xs text-neutral-600">USB‑C to USB‑C Power Delivery</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-900">Lifetime Warranty</p>
              <p className="text-xs text-neutral-600">Fray-replacement guarantee</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-900">Free Shipping</p>
              <p className="text-xs text-neutral-600">Delivery in 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

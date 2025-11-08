"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ShoppingCart, Zap, Shield, Truck, Plus, Minus, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/contexts/cart-context"
import { trackAddToCart } from "@/components/facebook-pixel"
import type { Product, ProductVariant } from "@/lib/types/database"

const defaultColors = [
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

const defaultLengths = ["0.5 m", "1 m", "2 m"]

interface PurchasePanelProps {
  product?: Product
  variants?: ProductVariant[]
  onColorChange?: (overlayClass: string, shadowClass: string) => void
  activeColorShadow?: string
}

export function PurchasePanel({ product, variants, onColorChange, activeColorShadow }: PurchasePanelProps = {}) {
  // Extract unique colors and lengths from variants
  const availableColors = useMemo(() => {
    if (!variants || variants.length === 0) return defaultColors
    
    const uniqueColors = [...new Set(variants.map(v => v.color).filter((c): c is string => c !== null && c !== undefined))]
    return uniqueColors.map(colorName => {
      // Map color names to design tokens (you might want to store this in DB)
      const colorMap: Record<string, any> = {
        "Black": { name: "Black", token: "bg-neutral-900", ring: "ring-neutral-900", overlay: "bg-neutral-900/10", shadow: "shadow-neutral-900/50" },
        "White": { name: "White", token: "bg-neutral-100", ring: "ring-neutral-900", overlay: "bg-neutral-100/20", shadow: "shadow-neutral-400/50" },
        "Navy": { name: "Navy", token: "bg-blue-900", ring: "ring-blue-900", overlay: "bg-blue-900/15", shadow: "shadow-blue-900/50" },
        "Gray": { name: "Gray", token: "bg-gray-500", ring: "ring-gray-500", overlay: "bg-gray-500/15", shadow: "shadow-gray-500/50" },
        "Green": { name: "Green", token: "bg-green-700", ring: "ring-green-700", overlay: "bg-green-700/15", shadow: "shadow-green-700/50" },
        "Army Green": { name: "Army Green", token: "bg-green-700", ring: "ring-green-700", overlay: "bg-green-700/15", shadow: "shadow-green-700/50" },
        "Red": { name: "Red", token: "bg-red-600", ring: "ring-red-600", overlay: "bg-red-600/15", shadow: "shadow-red-600/50" },
        "Blue": { name: "Blue", token: "bg-blue-600", ring: "ring-blue-600", overlay: "bg-blue-600/15", shadow: "shadow-blue-600/50" },
        "Yellow": { name: "Yellow", token: "bg-yellow-400", ring: "ring-yellow-400", overlay: "bg-yellow-400/15", shadow: "shadow-yellow-400/50" },
      }
      // Return the mapped color or create a basic one with the color name
      return colorMap[colorName] || { 
        name: colorName, 
        token: "bg-gray-500", 
        ring: "ring-gray-500", 
        overlay: "bg-gray-500/15", 
        shadow: "shadow-gray-500/50" 
      }
    })
  }, [variants])

  const availableLengths = useMemo(() => {
    if (!variants || variants.length === 0) return defaultLengths
    return [...new Set(variants.map(v => v.length).filter((l): l is string => l !== null && l !== undefined))]
  }, [variants])

  const initialColor = useMemo(() => {
    return availableColors[0]?.name || defaultColors[0]?.name || "Obsidian Black"
  }, [availableColors])

  const initialLength = useMemo(() => {
    return availableLengths[0] || defaultLengths[0] || "1 m"
  }, [availableLengths])

  const [activeColor, setActiveColor] = useState(initialColor)
  const [activeLength, setActiveLength] = useState(initialLength)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  
  // Update state when initial values change
  useEffect(() => {
    setActiveColor(initialColor)
  }, [initialColor])
  
  useEffect(() => {
    setActiveLength(initialLength)
  }, [initialLength])
  
  const { addItem, isLoading } = useCart()
  const router = useRouter()
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

  // Get current color details
  const currentColorObj = availableColors.find((c) => c.name === activeColor) || availableColors[0]
  
  // Find matching variant based on color and length
  const selectedVariant = variants?.find(v => v.color === activeColor && v.length === activeLength)
  
  // Calculate price from product or variant
  const basePrice = product?.price ? (typeof product.price === 'string' ? parseFloat(product.price) : product.price) : 19
  const finalPrice = selectedVariant?.price_override 
    ? (typeof selectedVariant.price_override === 'string' ? parseFloat(selectedVariant.price_override) : selectedVariant.price_override)
    : basePrice

  const handleAddToCart = async () => {
    try {
      const colorName = currentColorObj?.name || activeColor
      const cartItem = {
        productId: product?.id || "dekord-usb-c-cable",
        productName: product?.name || "Dekord Braided USB-C Cable",
        productImage: product?.main_image || "/images/products/usb-cable.jpg",
        variantId: selectedVariant?.id,
        variantDetails: `${colorName} • ${activeLength}`,
        length: activeLength,
        color: colorName,
        price: finalPrice,
        quantity: quantity,
      }
      
      console.log('🎨 Active Color:', activeColor)
      console.log('📏 Active Length:', activeLength)
      console.log('🎨 Current Color Object:', currentColorObj)
      console.log('🛒 Adding to cart:', cartItem)
      
      await addItem(cartItem)
      
      // Track with Facebook Pixel
      trackAddToCart({
        id: product?.id || "dekord-usb-c-cable",
        name: product?.name || "Dekord Braided USB-C Cable",
        price: finalPrice,
        quantity: quantity,
      })
      console.log('📊 Facebook Pixel: AddToCart tracked for', product?.name || 'Dekord Cable')
      
      // Show success feedback
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error("❌ Failed to add to cart:", error)
    }
  }

  const handleBuyNow = async () => {
    try {
      const colorName = currentColorObj?.name || activeColor
      const cartItem = {
        productId: product?.id || "dekord-usb-c-cable",
        productName: product?.name || "Dekord Braided USB-C Cable",
        productImage: product?.main_image || "/images/products/usb-cable.jpg",
        variantId: selectedVariant?.id,
        variantDetails: `${colorName} • ${activeLength}`,
        length: activeLength,
        color: colorName,
        price: finalPrice,
        quantity: quantity,
      }
      
      await addItem(cartItem)
      
      // Track with Facebook Pixel
      trackAddToCart({
        id: product?.id || "dekord-usb-c-cable",
        name: product?.name || "Dekord Braided USB-C Cable",
        price: finalPrice,
        quantity: quantity,
      })
      
      // Redirect to cart
      router.push('/cart')
    } catch (error) {
      console.error("❌ Failed to buy now:", error)
    }
  }

  return (
    <aside className={cn(
      "rounded-2xl ring-1 ring-border bg-white overflow-hidden sticky top-20 transition-shadow duration-500",
      "shadow-lg",
      activeColorShadow && activeColorShadow
    )}>
      {/* Header with Price */}
      <div className="p-6 border-b border-border bg-gradient-to-br from-neutral-50 to-white">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{product?.name || "Dekord Braided USB‑C Cable"}</h2>
            <p className="text-sm text-neutral-600 mt-1">{product?.category || "Premium fast charging cable"}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-neutral-900">Rs. {finalPrice.toFixed(2)}</p>
            
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
            {availableColors.map((c) => (
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
            {availableLengths.map((l) => (
              <button
                key={l}
                onClick={() => l && setActiveLength(l)}
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
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              {addedToCart ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>

          {/* Buy Now Button with Emoji */}
          <div className="relative pt-6">
            <Button 
              size="lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleBuyNow}
              disabled={isLoading}
              className={cn(
                "w-full text-base font-semibold bg-neutral-900 hover:bg-neutral-800 transition-all duration-500 ease-out relative overflow-visible",
                isHovering || showSadEmoji ? "h-20" : "h-14"
              )}
            >
              <div className="flex items-center justify-center">
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Buy Now
                  </>
                )}
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
              <p className="text-sm font-medium text-neutral-900">1 Year Warranty</p>
              <p className="text-xs text-neutral-600">Fray-replacement guarantee</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neutral-900">Fast Shipping</p>
              <p className="text-xs text-neutral-600">Delivery in 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Shield, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    name: "DEK Pro USB-C Cable",
    price: 2999,
    image: "/modern-armchair-pillows.png",
    color: "Midnight Black",
    length: "2m",
    quantity: 1,
  },
  {
    id: 2,
    name: "WEEV Lightning Cable",
    price: 2499,
    image: "/modular-cushion-bench.png",
    color: "Ocean Blue",
    length: "1.5m",
    quantity: 2,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showSadEmoji, setShowSadEmoji] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = 200 // Rs. 200 flat shipping
  const discount = promoApplied ? Math.floor(subtotal * 0.1) : 0
  const total = subtotal + shipping - discount

  const applyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true)
    }
  }

  const removePromo = () => {
    setPromoApplied(false)
    setPromoCode("")
  }

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
    
    // Hide sad emoji after animation
    setTimeout(() => {
      setShowSadEmoji(false)
    }, 1200)
    
    // Reset animation lock
    setTimeout(() => {
      setIsAnimating(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background grain-texture pt-20 md:pt-24">
      <div className="container-custom py-8 sm:py-10 md:py-12 px-2 sm:px-2 md:px-3">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
            Your Cart
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} ready for checkout
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added anything yet. Start exploring our collections!
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl hover:opacity-90 transition-all duration-200"
            >
              Browse Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white rounded-xl border border-border p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex gap-3 sm:gap-4">
                        {/* Product Image */}
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted/30">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4 mb-1.5">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                            <span>Color: {item.color}</span>
                            <span>•</span>
                            <span>Length: {item.length}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-muted/20 rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 rounded-md hover:bg-muted/50 transition-colors flex items-center justify-center"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-7 text-center font-medium text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-md hover:bg-muted/50 transition-colors flex items-center justify-center"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <p className="text-base sm:text-lg font-bold text-foreground">
                                Rs. {((item.price * item.quantity) / 100).toFixed(0)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-muted-foreground">
                                  Rs. {(item.price / 100).toFixed(0)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4"
              >
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-border">
                  <Truck className="w-4 h-4 text-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">3-5 days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-border">
                  <Shield className="w-4 h-4 text-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">1 Year Warranty</p>
                    <p className="text-xs text-muted-foreground">Full protection</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 border border-border">
                  <Tag className="w-4 h-4 text-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Easy process</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl border border-border p-4 sm:p-5 shadow-lg sticky top-24"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-foreground mb-1.5 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      disabled={promoApplied}
                      className={cn(
                        "flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none",
                        promoApplied && "opacity-50"
                      )}
                    />
                    {promoApplied ? (
                      <button
                        onClick={removePromo}
                        className="px-3 py-2 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                        aria-label="Remove promo code"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={applyPromo}
                        className="px-4 py-2 text-sm rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity font-medium"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {promoApplied && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-green-600 mt-1.5 flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" />
                      10% discount applied!
                    </motion.p>
                  )}
                </div>

                <div className="border-t border-border pt-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      Rs. {(subtotal / 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">
                      Rs. 200
                    </span>
                  </div>
                  {promoApplied && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex justify-between text-sm text-green-600"
                    >
                      <span>Discount (10%)</span>
                      <span className="font-medium">
                        - Rs. {(discount / 100).toFixed(0)}
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">
                      Rs. {(total / 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Including all taxes
                  </p>
                </div>

                {/* Checkout Button with Emoji */}
                <div className="relative">
                  <button 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                      "w-full bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-all duration-500 ease-out flex items-center justify-center gap-2 shadow-lg hover:shadow-xl relative overflow-visible",
                      isHovering || showSadEmoji ? "py-5" : "py-3"
                    )}
                  >
                    Proceed to Pay
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  {/* Emoji Container - Above button */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-10 pointer-events-none">
                    <AnimatePresence mode="wait">
                      {isHovering && (
                        <motion.div
                          key="happy"
                          initial={{ opacity: 0, scale: 0.3, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5, y: -5 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="text-4xl"
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
                          className="text-4xl"
                        >
                          😢
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-3">
                  Secure checkout powered by skordl
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Continue Shopping */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}

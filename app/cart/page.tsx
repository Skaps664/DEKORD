"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Shield, X, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { getCurrentUser } from "@/lib/services/auth"
import CouponInput from "@/components/cart/coupon-input"
import type { User } from "@supabase/supabase-js"
import type { AppliedCoupon } from "@/lib/types/coupon"

export default function CartPage() {
  const router = useRouter()
  const { items: cartItems, itemCount, total: cartTotal, updateQuantity, removeItem, isLoading } = useCart()
  const [user, setUser] = useState<User | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [showSadEmoji, setShowSadEmoji] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)

  // Auto-apply coupon for pre-orders
  useEffect(() => {
    const autoApplyCouponCode = sessionStorage.getItem('autoApplyCoupon')
    if (autoApplyCouponCode && !appliedCoupon && cartItems.length > 0) {
      // Trigger coupon application
      const applyCoupon = async () => {
        try {
          const { validateCoupon } = await import('@/lib/services/coupons')
          const result = await validateCoupon(autoApplyCouponCode, user?.id || null, cartTotal)
          
          if (result.valid && result.discount_amount && result.coupon_id) {
            const coupon = {
              code: result.code!,
              discount_amount: result.discount_amount,
              discount_type: result.discount_type!,
              discount_value: result.discount_value!,
              coupon_id: result.coupon_id
            }
            setAppliedCoupon(coupon)
            sessionStorage.setItem('appliedCoupon', JSON.stringify(coupon))
          }
        } catch (error) {
          console.error('Failed to auto-apply coupon:', error)
        } finally {
          // Clear the auto-apply flag
          sessionStorage.removeItem('autoApplyCoupon')
        }
      }
      applyCoupon()
    }
  }, [cartItems.length, cartTotal, user, appliedCoupon])

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: currentUser } = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error checking user:", error)
      } finally {
        setCheckingAuth(false)
      }
    }
    checkUser()
  }, [])

  const handleUpdateQuantity = async (productId: string, variantId: string | null, newQuantity: number) => {
    if (newQuantity < 1) return
    await updateQuantity(productId, variantId, newQuantity)
  }

  const handleRemoveItem = async (productId: string, variantId: string | null) => {
    await removeItem(productId, variantId)
  }

  const subtotal = cartTotal
  const discount = appliedCoupon ? appliedCoupon.discount_amount : 0
  const total = subtotal - discount

  const handleCouponApplied = (coupon: AppliedCoupon) => {
    setAppliedCoupon(coupon)
    // Store in session storage for checkout
    sessionStorage.setItem('appliedCoupon', JSON.stringify(coupon))
  }

  const handleCouponRemoved = () => {
    setAppliedCoupon(null)
    sessionStorage.removeItem('appliedCoupon')
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

  const handleCheckout = () => {
    if (!user) {
      // Redirect to login with cart redirect
      router.push("/auth?redirect=/cart")
    } else {
      // Proceed to checkout
      router.push("/checkout")
    }
  }

  if (checkingAuth || isLoading) {
    return (
      <main className="min-h-screen bg-background grain-texture pt-20 md:pt-24">
        <div className="container-custom py-8 sm:py-10 md:py-12">
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-muted/30 pt-20 pb-16">
      <div className="container-custom max-w-7xl">
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
            {itemCount} {itemCount === 1 ? "item" : "items"} ready for checkout
          </p>
        </motion.div>

        {itemCount === 0 ? (
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
                      key={item.productId}
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
                            src={item.productImage || "/placeholder.svg"}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4 mb-1.5">
                            <h3 className="text-base sm:text-lg font-semibold text-foreground">
                              {item.productName}
                            </h3>
                            <button
                              onClick={() => handleRemoveItem(item.productId, item.variantId || null)}
                              className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Variant Details - Color and Length */}
                          {(item.variantDetails || item.color || item.length) && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {item.variantDetails ? (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-foreground border border-border">
                                  {item.variantDetails}
                                </span>
                              ) : (
                                <>
                                  {item.color && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-foreground border border-border">
                                      Color: {item.color}
                                    </span>
                                  )}
                                  {item.length && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-foreground border border-border">
                                      Length: {item.length}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 bg-muted/20 rounded-lg p-1">
                              <button
                                onClick={() => handleUpdateQuantity(item.productId, item.variantId || null, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-7 h-7 rounded-md hover:bg-muted/50 transition-colors flex items-center justify-center disabled:opacity-50"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-7 text-center font-medium text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.productId, item.variantId || null, item.quantity + 1)}
                                className="w-7 h-7 rounded-md hover:bg-muted/50 transition-colors flex items-center justify-center"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                                                            <p className="text-lg font-bold text-foreground">
                                Rs. {(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                  Rs. {item.price.toFixed(2)} each
                              </p>
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

                {/* Coupon Code Section */}
                <div className="mb-6">
                  <CouponInput
                    cartTotal={subtotal}
                    userId={user?.id || null}
                    onCouponApplied={handleCouponApplied}
                    onCouponRemoved={handleCouponRemoved}
                    appliedCoupon={appliedCoupon}
                  />
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      Rs. {subtotal.toFixed(2)}
                    </span>
                  </div>
                  
                  {appliedCoupon && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex justify-between text-sm text-green-600"
                    >
                      <span className="font-medium">Discount ({appliedCoupon.code})</span>
                      <span className="font-semibold">
                        - Rs. {discount.toFixed(2)}
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">
                      Rs. {total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Shipping calculated at checkout
                  </p>
                </div>

                {/* Checkout Button with Emoji */}
                {!user ? (
                  <div className="space-y-3">
                    <button 
                      onClick={handleCheckout}
                      className="w-full bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-all py-3 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In to Checkout
                    </button>
                    <p className="text-xs text-center text-muted-foreground">
                      Sign in to save your cart and continue
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <button 
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleCheckout}
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
                )}

                <p className="text-xs text-center text-muted-foreground mt-3">
                  Secure checkout powered by skordl
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Continue Shopping */}
        {itemCount > 0 && (
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

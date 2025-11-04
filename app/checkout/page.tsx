"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, CreditCard, MapPin, User, Phone, Loader2, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { getCurrentUser, getUserProfile, updateUserProfile } from "@/lib/services/auth"
import { createOrder } from "@/lib/services/orders"
import confetti from "canvas-confetti"
import { trackInitiateCheckout, trackPurchase } from "@/components/facebook-pixel"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const provinces = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
  "Islamabad Capital Territory"
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items: cartItems, itemCount, total: cartTotal, clearCart, isLoading: cartLoading } = useCart()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [saveInfo, setSaveInfo] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    address: "",
    city: "",
    province: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  // Check authentication and load saved shipping info
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: currentUser } = await getCurrentUser()
        if (!currentUser) {
          router.push("/auth?redirect=/checkout")
          return
        }
        setUser(currentUser)

        // Load user profile with saved shipping info
        const { data: profile } = await getUserProfile(currentUser.id)
        if (profile && profile.save_shipping_info) {
          console.log("✅ Auto-filling shipping info from profile")
          setFormData({
            fullName: profile.shipping_name || "",
            whatsappNumber: profile.shipping_phone || "",
            address: profile.shipping_address || "",
            city: profile.shipping_city || "",
            province: profile.shipping_province || "",
          })
          setSaveInfo(true)
        }
      } catch (error) {
        console.error("Error checking user:", error)
        router.push("/auth?redirect=/checkout")
      } finally {
        setCheckingAuth(false)
      }
    }

    checkUser()
  }, [router])

  // Redirect if cart is empty
  useEffect(() => {
    if (!checkingAuth && !cartLoading && cartItems.length === 0 && !orderSuccess) {
      router.push("/cart")
    }
  }, [cartItems, checkingAuth, cartLoading, orderSuccess, router])

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 5000 ? 0 : 200
  const total = subtotal + shipping

  // Track checkout initiation with Facebook Pixel
  useEffect(() => {
    if (!checkingAuth && !cartLoading && cartItems.length > 0 && !orderSuccess) {
      const items = cartItems.map(item => ({
        id: item.productId,
        name: item.productName,
        price: item.price,
        quantity: item.quantity,
      }))
      
      trackInitiateCheckout(subtotal, items)
      console.log('📊 Facebook Pixel: InitiateCheckout tracked, value:', subtotal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingAuth, cartLoading, cartItems, orderSuccess])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const fireConfetti = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      router.push("/auth?redirect=/checkout")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Prepare order items
      const orderItems = cartItems.map(item => ({
        product_id: item.productId,
        variant_id: item.variantId || undefined,
        product_name: item.productName,
        variant_details: item.variantDetails || undefined,
        unit_price: item.price,
        quantity: item.quantity,
        total_price: item.price * item.quantity
      }))

      // Create order
      const { data, error } = await createOrder({
        user_id: user.id,
        items: orderItems,
        subtotal: subtotal,
        shipping_fee: shipping,
        discount_amount: 0,
        total: total,
        payment_method: "cod",
        shipping_name: formData.fullName,
        shipping_phone: formData.whatsappNumber,
        shipping_address: formData.address,
        shipping_city: formData.city,
        shipping_province: formData.province
      })

      if (error) {
        console.error("Error creating order:", error)
        alert("Failed to place order. Please try again.")
        setIsSubmitting(false)
        return
      }

      if (data) {
        setOrderNumber(data.order_number)
        setOrderSuccess(true)
        
        // Track purchase with Facebook Pixel
        trackPurchase(total, data.order_number)
        console.log('📊 Facebook Pixel: Purchase tracked, order:', data.order_number, 'value:', total)
        
        // Save shipping info if checkbox is checked
        if (saveInfo && user) {
          try {
            await updateUserProfile(user.id, {
              shipping_name: formData.fullName,
              shipping_phone: formData.whatsappNumber,
              shipping_address: formData.address,
              shipping_city: formData.city,
              shipping_province: formData.province,
              shipping_postal_code: null,
              save_shipping_info: true,
            })
            console.log("✅ Shipping info saved to profile")
          } catch (error) {
            console.error("Error saving shipping info:", error)
          }
        }
        
        // Fire confetti!
        fireConfetti()
        
        // Clear cart
        await clearCart()
        
        // Redirect to account orders after 4 seconds
        setTimeout(() => {
          router.push("/account?tab=orders")
        }, 4000)
      }
    } catch (error) {
      console.error("Error placing order:", error)
      alert("Failed to place order. Please try again.")
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.fullName && 
                      formData.whatsappNumber && 
                      formData.address && 
                      formData.city && 
                      formData.province

  // Loading state
  if (checkingAuth || cartLoading) {
    return (
      <main className="min-h-screen bg-background grain-texture flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Loading checkout...</p>
        </div>
      </main>
    )
  }

  // Success modal
  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-background grain-texture flex items-center justify-center p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-border p-8 max-w-md w-full text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-foreground mb-3"
          >
            Order Placed! 🎉
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-2"
          >
            Thank you for your order!
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-mono bg-muted/50 rounded-lg p-3 mb-4"
          >
            Order #{orderNumber}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-muted-foreground mb-6"
          >
            We will reach out to you on WhatsApp shortly to confirm your order.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs text-muted-foreground"
          >
            Redirecting to your orders...
          </motion.div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background grain-texture pt-20 md:pt-24 pb-40 md:pb-48">
      <div className="container-custom py-8 sm:py-10 md:py-12 px-2 sm:px-2 md:px-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7">
            {/* Back to Cart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
                Checkout
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Complete your order details
              </p>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <User className="w-5 h-5 text-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Customer Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Muhammad Ahmed Khan"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsappNumber" className="block text-sm font-medium text-foreground mb-1.5">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        id="whatsappNumber"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        placeholder="+92 300 1234567"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-sm"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll send order updates via WhatsApp
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Shipping Address</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1.5">
                      Complete Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House/Flat No., Street Name, Area"
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-sm resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Lahore"
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-foreground mb-1.5">
                        Province <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Select Province</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Save Information Checkbox */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={saveInfo}
                        onChange={(e) => setSaveInfo(e.target.checked)}
                        className="mt-0.5 w-5 h-5 rounded border-2 border-border text-foreground focus:ring-2 focus:ring-foreground focus:ring-offset-2 cursor-pointer transition-all"
                      />
                      <div>
                        <span className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                          Save this information for future orders
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          We'll auto-fill these details next time to make checkout faster
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Shipping Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <Package className="w-5 h-5 text-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Shipping Method</h2>
                </div>

                <div className="p-4 rounded-lg border-2 border-foreground bg-foreground/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Standard Shipping</p>
                        <p className="text-xs text-muted-foreground">3-5 business days</p>
                      </div>
                    </div>
                    <span className="font-bold text-foreground">Rs. 200</span>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Payment Method</h2>
                </div>

                <div className="p-4 rounded-lg border-2 border-foreground bg-foreground/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-foreground flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when you receive</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>
            </form>
          </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl border border-border p-5 shadow-lg sticky top-24 self-start"
              >
                <h2 className="text-xl font-bold text-foreground mb-5">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {cartItems.map((item, index) => (
                    <div key={`${item.productId}-${index}`} className="flex gap-3 p-3 rounded-lg bg-muted/20">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted/30">
                        <Image
                          src={item.productImage || "/placeholder.svg"}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate">
                          {item.productName}
                        </h3>
                        {/* Variant Details */}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.variantDetails ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground border border-border">
                              {item.variantDetails}
                            </span>
                          ) : (
                            <>
                              {item.color && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground border border-border">
                                  {item.color}
                                </span>
                              )}
                              {item.length && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground border border-border">
                                  {item.length}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="text-sm font-bold text-foreground">
                            Rs. {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">
                      Rs. {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">
                      {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                    </span>
                  </div>
                  {subtotal >= 5000 && shipping === 0 && (
                    <p className="text-xs text-green-600">🎉 Free shipping applied!</p>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">
                      Rs. {total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Cash on Delivery</p>
                </div>

                {/* Place Order Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className={cn(
                    "w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg",
                    isFormValid && !isSubmitting
                      ? "bg-foreground text-background hover:opacity-90 hover:shadow-xl"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      Place Order - Rs. {total.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground mt-3">
                  By placing order, you agree to our terms & conditions
                </p>
              </motion.div>
            </div>
          </div>
      </div>
    </main>
  )
}

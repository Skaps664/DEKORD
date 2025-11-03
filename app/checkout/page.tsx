"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Package, CreditCard, MapPin, User, Phone, Home } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock cart items (in real app, would come from cart state/context)
const cartItems = [
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
  const [formData, setFormData] = useState({
    fullName: "",
    whatsappNumber: "",
    address: "",
    city: "",
    province: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 200
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In real app, would process order here
    console.log("Order submitted:", formData)
    setIsSubmitting(false)
  }

  const isFormValid = formData.fullName && 
                      formData.whatsappNumber && 
                      formData.address && 
                      formData.city && 
                      formData.province

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
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-muted/20">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted/30">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {item.color} • {item.length}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="text-sm font-bold text-foreground">
                            Rs. {((item.price * item.quantity) / 100).toFixed(0)}
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
                      Rs. {(subtotal / 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">Rs. 200</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-foreground">
                      Rs. {(total / 100).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Cash on Delivery</p>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
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
                      <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      Place Order
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

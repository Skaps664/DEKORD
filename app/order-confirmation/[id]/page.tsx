"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, MessageSquare, Loader2, Package, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<any>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [showQuery, setShowQuery] = useState(false)
  const [query, setQuery] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const timestamp = Date.now()
      const response = await fetch(`/api/order-details?id=${orderId}&_t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      const data = await response.json()
      
      if (data.order) {
        setOrder(data.order)
        setConfirmed(data.order.customer_confirmed || false)
      }
    } catch (error) {
      console.error("Error fetching order:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    setSubmitting(true)
    try {
      const response = await fetch("/api/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action: "confirm" })
      })
      
      const result = await response.json()
      
      if (response.ok) {
        // Refresh order data from database to ensure confirmed status persists
        await fetchOrder()
      } else {
        console.error('Failed to confirm:', result)
        alert('Failed to confirm order. Please try again.')
      }
    } catch (error) {
      console.error("Error confirming order:", error)
      alert('Error confirming order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleQuerySubmit = async () => {
    if (!query.trim()) return
    
    setSubmitting(true)
    try {
      const response = await fetch("/api/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, query })
      })
      
      if (response.ok) {
        setShowQuery(false)
        setQuery("")
        alert("Query sent! Our team will get back to you soon.")
      }
    } catch (error) {
      console.error("Error sending query:", error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-900" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Order Not Found</h1>
          <p className="text-neutral-600 mb-6">The order you're looking for doesn't exist.</p>
          <Link href="/" className="text-neutral-900 underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">
            Order Confirmed!
          </h1>
          
          <p className="text-neutral-600 mb-2">
            {order.updated_at && new Date(order.updated_at).getTime() - new Date(order.created_at).getTime() > 60000
              ? "This order has been confirmed"
              : "Thank you for confirming your order"}
          </p>
          
          <div className="bg-neutral-100 rounded-xl p-4 mb-4">
            <p className="text-sm text-neutral-600 mb-1">Order Number</p>
            <p className="text-xl font-bold text-neutral-900">{order.order_number}</p>
          </div>

          {/* Products Summary */}
          <div className="bg-white border-2 border-neutral-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs font-semibold text-neutral-600 mb-3 uppercase">Order Items:</p>
            <div className="space-y-2">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {item.quantity}x {item.product_name}
                    </p>
                    {item.variant_details && (
                      <p className="text-xs text-neutral-600 mt-0.5">
                        [{item.variant_details}]
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-neutral-900 ml-2">
                    Rs. {Number(item.total_price).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="pt-2 border-t border-neutral-200 flex justify-between">
                <p className="text-sm font-bold text-neutral-900">Total:</p>
                <p className="text-sm font-bold text-neutral-900">
                  Rs. {Number(order.total).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-neutral-600 mb-8">
            We'll process your order shortly and keep you updated via Email and WhatsApp.
          </p>
          
          <div className="flex flex-col gap-3">
            <Link
              href="/account?tab=orders"
              className="w-full bg-neutral-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2"
            >
              View Order Details
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/"
              className="w-full border-2 border-neutral-200 text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Package className="w-10 h-10 text-neutral-900" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Confirm Your Order
          </h1>
          
          <p className="text-neutral-600 text-lg">
            Please review and confirm your order details
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-neutral-50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-neutral-600 mb-1">Order Number</p>
              <p className="font-bold text-neutral-900">{order.order_number}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600 mb-1">Order Total</p>
              <p className="font-bold text-neutral-900">Rs. {Number(order.total).toLocaleString()}</p>
            </div>
          </div>

          {/* Products List */}
          <div className="border-t border-neutral-200 pt-4 mb-4">
            <p className="text-sm font-semibold text-neutral-900 mb-3">Order Items:</p>
            <div className="space-y-3">
              {order.order_items?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-start bg-white rounded-lg p-3">
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">
                      {item.quantity}x {item.product_name}
                    </p>
                    {item.variant_details && (
                      <p className="text-sm text-neutral-600 mt-1">
                        [{item.variant_details}]
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-neutral-900">
                      Rs. {Number(item.total_price).toLocaleString()}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Rs. {Number(item.unit_price).toLocaleString()} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-neutral-200 pt-4">
            <p className="text-sm text-neutral-600 mb-2">Delivering to:</p>
            <p className="font-semibold text-neutral-900">{order.shipping_name}</p>
            <p className="text-sm text-neutral-600">{order.shipping_phone}</p>
            <p className="text-sm text-neutral-600">{order.shipping_address}</p>
            <p className="text-sm text-neutral-600">{order.shipping_city}, {order.shipping_province}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {!showQuery ? (
          <div className="space-y-3">
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="w-full bg-neutral-900 text-white px-6 py-4 rounded-xl font-semibold hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Yes, Confirm My Order
                </>
              )}
            </button>
            
            <button
              onClick={() => setShowQuery(true)}
              className="w-full border-2 border-neutral-200 text-neutral-900 px-6 py-4 rounded-xl font-semibold hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              I Have a Question
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-neutral-900 mb-2">
                What's your question?
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question or concern here..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 outline-none resize-none transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleQuerySubmit}
                disabled={submitting || !query.trim()}
                className="flex-1 bg-neutral-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Query"
                )}
              </button>
              
              <button
                onClick={() => setShowQuery(false)}
                className="px-6 py-3 border-2 border-neutral-200 rounded-xl font-semibold hover:bg-neutral-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
          <p className="text-sm text-neutral-600">
            Need help?{" "}
            <a href="https://wa.me/923159870610" target="_blank" rel="noopener noreferrer" className="text-neutral-900 font-semibold underline">
              Contact Support
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

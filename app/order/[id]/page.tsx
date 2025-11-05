"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  ExternalLink,
  Loader2,
} from "lucide-react"
import { getCurrentUser } from "@/lib/services/auth"
import { getOrderById } from "@/lib/services/orders"
import type { OrderWithItems } from "@/lib/types/database"

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    title: "Order Pending",
    description: "We have received your order and it's being reviewed.",
  },
  processing: {
    icon: Package,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    title: "Processing Order",
    description: "Your order is being prepared and will soon be out for delivery.",
  },
  shipped: {
    icon: Truck,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    title: "Order Shipped",
    description: "Your order is on its way! Track your package below.",
  },
  delivered: {
    icon: CheckCircle2,
    color: "bg-green-100 text-green-800 border-green-200",
    title: "Order Delivered",
    description: "Your order has been successfully delivered. Enjoy!",
  },
  cancelled: {
    icon: XCircle,
    color: "bg-red-100 text-red-800 border-red-200",
    title: "Order Cancelled",
    description: "This order has been cancelled.",
  },
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<OrderWithItems | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    async function loadOrder() {
      try {
        // Check if user is logged in
        const { data: user, error: userError } = await getCurrentUser()
        
        if (userError || !user) {
          console.error('❌ Not logged in, redirecting to auth...')
          router.push('/auth?redirect=/account?tab=orders')
          return
        }

        setUserId(user.id)

        // Get order
        const { data: orderData, error: orderError } = await getOrderById(id)
        
        if (orderError || !orderData) {
          console.error('❌ Order not found')
          alert('Order not found')
          router.push('/account?tab=orders')
          return
        }

        // Verify this order belongs to the user
        if (orderData.user_id !== user.id) {
          console.error('❌ Unauthorized access to order')
          alert('You do not have permission to view this order')
          router.push('/account?tab=orders')
          return
        }

        setOrder(orderData)
        setLoading(false)
      } catch (err) {
        console.error('💥 Error loading order:', err)
        setLoading(false)
      }
    }

    loadOrder()
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-neutral-900 mx-auto mb-4" />
          <p className="text-neutral-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return null
  }

  const statusKey = order.status.toLowerCase() as keyof typeof statusConfig
  const config = statusConfig[statusKey] || statusConfig.pending
  const StatusIcon = config.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/account?tab=orders"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Orders</span>
        </Link>

        {/* Order Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Order {order.order_number}
              </h1>
              <div className="flex items-center gap-2 text-neutral-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-neutral-900">
                Rs. {order.total.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`border-2 rounded-xl p-6 ${config.color}`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <StatusIcon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{config.title}</h3>
                <p className="text-base opacity-90">{config.description}</p>
              </div>
            </div>
          </div>

          {/* Tracking Information (only for shipped orders) */}
          {order.status === "shipped" && order.tracking_number && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-purple-700" />
                <h3 className="text-lg font-bold text-purple-900">Tracking Information</h3>
              </div>
              <div className="space-y-3">
                {order.courier && (
                  <div>
                    <p className="text-sm font-medium text-purple-800 mb-1">Courier</p>
                    <p className="text-lg font-bold text-purple-900">{order.courier}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-purple-800 mb-1">Tracking Number</p>
                  <p className="text-lg font-mono font-bold text-purple-900">{order.tracking_number}</p>
                </div>
                {order.tracking_url && (
                  <a
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium mt-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Track Package
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6" />
            Order Items
          </h2>
          <div className="space-y-4">
            {order.items?.map((item, index) => (
              <div
                key={item.id || index}
                className="flex justify-between items-start py-4 border-b border-neutral-200 last:border-0"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 text-lg mb-1">
                    {item.product_name}
                  </h3>
                  {item.variant_details && (
                    <p className="text-neutral-600 mb-1">{item.variant_details}</p>
                  )}
                  {item.sku && (
                    <p className="text-sm text-neutral-500">SKU: {item.sku}</p>
                  )}
                  <p className="text-neutral-700 mt-2">
                    Quantity: <span className="font-semibold">{item.quantity}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-600 mb-1">Unit Price</p>
                  <p className="font-medium text-neutral-900">
                    Rs. {Number(item.unit_price).toLocaleString()}
                  </p>
                  <p className="text-lg font-bold text-neutral-900 mt-2">
                    Rs. {Number(item.total_price).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 pt-6 border-t-2 border-neutral-200 space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-neutral-700">Subtotal</span>
              <span className="font-medium text-neutral-900">
                Rs. {Number(order.subtotal).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-neutral-700">Shipping Fee</span>
              <span className="font-medium text-neutral-900">
                Rs. {Number(order.shipping_fee).toLocaleString()}
              </span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-base">
                <span className="text-neutral-700">Discount</span>
                <span className="font-medium text-green-600">
                  - Rs. {Number(order.discount_amount).toLocaleString()}
                </span>
              </div>
            )}
            {order.coupon_code && (
              <div className="flex items-center justify-between bg-green-50 -mx-2 px-2 py-2 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-green-700 font-medium">Coupon Applied</span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">
                    {order.coupon_code}
                  </span>
                </div>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold pt-3 border-t-2 border-neutral-200">
              <span className="text-neutral-900">Total</span>
              <span className="text-neutral-900">
                Rs. {Number(order.total).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Shipping Address
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-neutral-600">Name</p>
                <p className="text-base text-neutral-900">{order.shipping_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Phone</p>
                <p className="text-base text-neutral-900 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {order.shipping_phone}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-600">Address</p>
                <p className="text-base text-neutral-900">{order.shipping_address}</p>
                <p className="text-base text-neutral-900">
                  {order.shipping_city}, {order.shipping_province}
                </p>
                {order.shipping_postal_code && (
                  <p className="text-base text-neutral-900">
                    Postal Code: {order.shipping_postal_code}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Payment & Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6"
          >
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Payment & Notes</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">Payment Method</p>
                <p className="text-base font-semibold text-neutral-900 uppercase">
                  {order.payment_method === "cod" ? "Cash on Delivery" : order.payment_method}
                </p>
              </div>
              {order.customer_notes && (
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">Your Notes</p>
                  <div className="bg-neutral-50 rounded-lg p-3">
                    <p className="text-neutral-900">{order.customer_notes}</p>
                  </div>
                </div>
              )}
              {order.shipped_at && (
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">Shipped Date</p>
                  <p className="text-neutral-900">
                    {new Date(order.shipped_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
              {order.delivered_at && (
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-1">Delivered Date</p>
                  <p className="text-neutral-900">
                    {new Date(order.delivered_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

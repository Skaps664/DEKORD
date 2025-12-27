"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Loader2,
  Upload,
  X,
  FileWarning,
  Shield,
  Package,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { getCurrentUser } from "@/lib/services/auth"
import { getOrderById } from "@/lib/services/orders"
import { getClaimByOrderId, type Claim } from "@/lib/services/claims"
import type { OrderWithItems } from "@/lib/types/database"
import Image from "next/image"

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    title: "Claim Pending",
    description: "We have received your claim and it's being reviewed.",
  },
  "in-progress": {
    icon: Package,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    title: "In Progress",
    description: "Your claim is being processed by our team.",
  },
  resolved: {
    icon: CheckCircle2,
    color: "bg-green-100 text-green-800 border-green-200",
    title: "Claim Resolved",
    description: "Your claim has been successfully resolved.",
  },
  rejected: {
    icon: AlertCircle,
    color: "bg-red-100 text-red-800 border-red-200",
    title: "Claim Rejected",
    description: "Your claim could not be approved at this time.",
  },
}

export default function ClaimOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: orderId } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<OrderWithItems | null>(null)
  const [claim, setClaim] = useState<Claim | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(true) // Show confirmation first
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    city: "",
    orderNumber: "",
    claimType: "",
    message: ""
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    async function loadData() {
      try {
        const { data: user, error: userError } = await getCurrentUser()
        
        if (userError || !user) {
          router.push('/auth?redirect=/account?tab=orders')
          return
        }

        setUserId(user.id)

        const { data: orderData, error: orderError } = await getOrderById(orderId)
        
        if (orderError || !orderData) {
          alert('Order not found')
          router.push('/account?tab=orders')
          return
        }

        if (orderData.user_id !== user.id) {
          alert('You do not have permission to view this order')
          router.push('/account?tab=orders')
          return
        }

        setOrder(orderData)

        const { data: claimData, error: claimError } = await getClaimByOrderId(orderId)
        
        if (claimData) {
          setClaim(claimData)
          setShowConfirmation(false)
        } else {
          setClaim(null)
          setShowConfirmation(true)
          
          // Pre-fill form for when user proceeds
          setFormData(prev => ({
            ...prev,
            name: orderData.shipping_name || "",
            email: orderData.email || "",
            whatsappNumber: orderData.shipping_phone || "",
            city: orderData.shipping_city || "",
            orderNumber: orderData.order_number || orderId,
          }))
        }

        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }

    loadData()
  }, [orderId, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...newFiles].slice(0, 5)) // Max 5 files
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      formDataToSend.append('order_id', orderId)
      files.forEach(file => formDataToSend.append('files', file))
      
      const response = await fetch('/api/claim/submit', {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit claim')
      }
      
      setSubmitStatus('success')
      
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16 md:pt-18 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-neutral-600" />
          <p className="text-neutral-600">Loading claim information...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background pt-16 md:pt-18 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600">Order not found</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-16 md:pt-18">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/account?tab=orders"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
            {claim ? 'Claim Status' : showConfirmation ? 'Confirm Claim Submission' : 'File a Claim'}
          </h1>
          <p className="text-neutral-600 mt-2">
            Order #{order.order_number || orderId}
          </p>
        </div>

        <div className="max-w-4xl">
          {claim ? (
            // Show existing claim status
            <div className="space-y-6">
              {/* Status Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border-2 ${statusConfig[claim.status as keyof typeof statusConfig]?.color || statusConfig.pending.color}`}
              >
                <div className="flex items-start gap-4">
                  {(() => {
                    const StatusIcon = statusConfig[claim.status as keyof typeof statusConfig]?.icon || Clock
                    return <StatusIcon className="w-8 h-8 flex-shrink-0" />
                  })()}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">
                      {statusConfig[claim.status as keyof typeof statusConfig]?.title || 'Status Unknown'}
                    </h3>
                    <p className="text-sm opacity-90">
                      {statusConfig[claim.status as keyof typeof statusConfig]?.description || 'Processing your claim'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Admin Response - Show prominently */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-8 rounded-2xl border-2 ${
                  claim.resolution_notes 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-amber-50 border-amber-300'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <MessageSquare className={`w-6 h-6 flex-shrink-0 mt-1 ${
                    claim.resolution_notes ? 'text-blue-600' : 'text-amber-600'
                  }`} />
                  <h3 className={`text-xl font-bold ${
                    claim.resolution_notes ? 'text-blue-900' : 'text-amber-900'
                  }`}>
                    {claim.resolution_notes ? 'Response from dekord' : 'Awaiting Response'}
                  </h3>
                </div>
                <div className="ml-9">
                  {claim.resolution_notes ? (
                    <p className="text-blue-900 whitespace-pre-wrap leading-relaxed text-base">
                      {claim.resolution_notes}
                    </p>
                  ) : (
                    <p className="text-amber-800 text-sm">
                      Our team is reviewing your claim. You'll receive a response here once we've processed your request. 
                      We typically respond within 2-3 business days.
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Claim Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm"
              >
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Claim Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Claim Type</p>
                    <p className="font-semibold text-neutral-900">{claim.claim_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Submitted On</p>
                    <p className="font-semibold text-neutral-900">
                      {new Date(claim.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Contact Email</p>
                    <p className="font-semibold text-neutral-900">{claim.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">WhatsApp</p>
                    <p className="font-semibold text-neutral-900">{claim.whatsapp_number}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-neutral-600 mb-2">Your Message</p>
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-neutral-900 whitespace-pre-wrap">{claim.message}</p>
                  </div>
                </div>

                {claim.images && claim.images.length > 0 && (
                  <div>
                    <p className="text-sm text-neutral-600 mb-3">Attached Images</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {claim.images.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 hover:border-neutral-400 transition-colors"
                        >
                          <Image
                            src={url}
                            alt={`Claim image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          ) : showConfirmation ? (
            // Show confirmation screen before form
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 md:p-12 rounded-2xl border border-neutral-200 shadow-sm text-center"
            >
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FileWarning className="w-10 h-10 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                    Submit a Claim for This Order?
                  </h2>
                  <p className="text-neutral-600 text-lg mb-6">
                    You're about to file a claim for Order #{order.order_number || orderId}
                  </p>
                </div>

                {/* Order Summary */}
                <div className="bg-neutral-50 p-6 rounded-xl mb-8 text-left">
                  <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div key={item.id || index} className="flex justify-between text-sm">
                        <span className="text-neutral-700">
                          {item.product_name} {item.variant_details && `(${item.variant_details})`} × {item.quantity}
                        </span>
                        <span className="font-medium text-neutral-900">Rs. {item.total_price.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t border-neutral-200 pt-2 mt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>Rs. {order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-8 text-left">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Before You Proceed</h4>
                      <ul className="text-sm text-blue-800 space-y-1.5">
                        <li>• Review our Return & Refund policies carefully</li>
                        <li>• Prepare clear photos of any product issues</li>
                        <li>• Have your order details and contact information ready</li>
                        <li>• Claims are typically processed within 2-3 business days</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="px-8 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors font-semibold text-lg"
                  >
                    Yes, Continue with Claim
                  </button>
                  <Link
                    href="/account?tab=orders"
                    className="px-8 py-4 bg-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-300 transition-colors font-semibold text-lg text-center"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            // Show claim form
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm"
            >
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                  <p className="font-semibold">✓ Claim submitted successfully!</p>
                  <p className="text-sm mt-1">Redirecting to claim status...</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                  <p className="font-semibold">✗ Failed to submit claim</p>
                  <p className="text-sm mt-1">Please try again or contact support.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsappNumber" className="block text-sm font-semibold text-neutral-900 mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="whatsappNumber"
                      required
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none"
                      placeholder="+92 3XX XXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-neutral-900 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none"
                      placeholder="e.g., Peshawar"
                    />
                  </div>

                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-semibold text-neutral-900 mb-2">
                      Order Number *
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      required
                      value={formData.orderNumber}
                      readOnly
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-neutral-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="claimType" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Type of Claim *
                  </label>
                  <select
                    id="claimType"
                    required
                    value={formData.claimType}
                    onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none"
                  >
                    <option value="">Select claim type</option>
                    <option value="Return Request">Return Request - Product return & exchange</option>
                    <option value="Refund Claim">Refund Claim - Request a refund</option>
                    <option value="Warranty Claim">Warranty Claim - Product warranty service</option>
                    <option value="Complaint">Complaint - Report an issue</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Describe Your Issue *
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none resize-none"
                    placeholder="Please describe the issue you're experiencing in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Upload Images (Optional)
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-neutral-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-10 h-10 mx-auto mb-3 text-neutral-400" />
                      <p className="text-sm text-neutral-600 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-neutral-500">
                        PNG, JPG up to 10MB (Max 5 files)
                      </p>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                        >
                          <span className="text-sm text-neutral-700 truncate flex-1">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="ml-2 p-1 hover:bg-neutral-200 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-neutral-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Claim...
                    </>
                  ) : (
                    'Submit Claim'
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}

"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  User,
  Package,
  Lock,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Eye,
  Calendar,
  Truck,
  CheckCircle2,
  Clock,
  Loader2,
  Star,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { getCurrentUser, getUserProfile, updateUserProfile, updatePassword, signOut } from "@/lib/services/auth"
import { getUserOrders } from "@/lib/services/orders"
import { ReviewModal } from "@/components/review-modal"
import { canUserReviewProduct, getUserReviewForProduct } from "@/lib/services/reviews"
import { getClaimByOrderId, type Claim } from "@/lib/services/claims"
import type { OrderWithItems } from "@/lib/types/database"

type Tab = "profile" | "orders" | "password"

function AccountPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab') as Tab | null
  
  const [activeTab, setActiveTab] = useState<Tab>(tabParam || "profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [authProvider, setAuthProvider] = useState<string>('email')

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<{
    orderId: string
    productId: string
    productName: string
  } | null>(null)
  
  // Track which products have been reviewed (orderId-productId: boolean)
  const [reviewedProducts, setReviewedProducts] = useState<Record<string, boolean>>({})
  
  // Track claim status for each order (orderId: Claim)
  const [orderClaims, setOrderClaims] = useState<Record<string, Claim>>({})

  // Real user data from Supabase
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  // Saved shipping info from Supabase
  const [savedShippingInfo, setSavedShippingInfo] = useState({
    shipping_name: "",
    shipping_phone: "",
    shipping_address: "",
    shipping_city: "",
    shipping_province: "",
    save_shipping_info: false,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Real orders data from Supabase
  const [orders, setOrders] = useState<OrderWithItems[]>([])

  // Handle tab from URL parameter
  useEffect(() => {
    if (tabParam && (tabParam === "profile" || tabParam === "orders" || tabParam === "password")) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  // Load user data on mount
  useEffect(() => {
    async function loadUserData() {
      try {
        const { data: user, error: userError } = await getCurrentUser()
        
        if (userError || !user) {
          router.push('/auth')
          return
        }

        setUserId(user.id)

        const provider = user.app_metadata?.provider || 'email'
        setAuthProvider(provider)

        const { data: profile, error: profileError } = await getUserProfile(user.id)
        
        if (profile) {
          setUserData({
            name: profile.full_name || '',
            email: user.email || '',
            phone: profile.phone || '',
            address: profile.address_line1 || '',
            city: profile.city || '',
            postalCode: profile.postal_code || '',
          })
          
          setSavedShippingInfo({
            shipping_name: profile.shipping_name || '',
            shipping_phone: profile.shipping_phone || '',
            shipping_address: profile.shipping_address || '',
            shipping_city: profile.shipping_city || '',
            shipping_province: profile.shipping_province || '',
            save_shipping_info: profile.save_shipping_info || false,
          })
        } else {
          setUserData({
            name: '',
            email: user.email || '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
          })
        }

        const { data: ordersData, error: ordersError } = await getUserOrders(user.id)
        
        if (ordersData) {
          setOrders(ordersData)
          
          // Check which products have been reviewed and fetch claims
          const reviewStatus: Record<string, boolean> = {}
          const claimsData: Record<string, Claim> = {}
          
          for (const order of ordersData) {
            // Fetch claim for this order
            const { data: claim } = await getClaimByOrderId(order.id)
            if (claim) {
              claimsData[order.id] = claim
            }
            
            // Check reviews for delivered orders
            if (order.status === 'delivered' && order.items) {
              for (const item of order.items) {
                if (item.product_id) {
                  const key = `${order.id}-${item.product_id}`
                  const { data: existingReview } = await getUserReviewForProduct(user.id, item.product_id, order.id)
                  reviewStatus[key] = !!existingReview
                }
              }
            }
          }
          
          setReviewedProducts(reviewStatus)
          setOrderClaims(claimsData)
        }

        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  const handleSaveProfile = async () => {
    if (!userId) return

    setSaving(true)
    try {
      const { error } = await updateUserProfile(userId, {
        full_name: userData.name,
        phone: userData.phone,
        address_line1: userData.address,
        city: userData.city,
        postal_code: userData.postalCode,
      })

      if (error) {
        alert('Failed to save profile: ' + error)
      } else {
        setIsEditing(false)
      }
    } catch (err) {
      alert('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert("Please fill in all password fields")
      return
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match")
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }
    
    setSaving(true)
    try {
      // Update password
      const { error } = await updatePassword(passwordData.newPassword)
      
      if (error) {
        alert(`Failed to update password: ${error}`)
      } else {
        alert("Password updated successfully!")
        // Clear form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      }
    } catch (err) {
      console.error('Error updating password:', err)
      alert('Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/auth')
    } catch (err) {
      console.error('Error logging out:', err)
      router.push('/auth')
    }
  }

  const handleOpenReviewModal = (orderId: string, productId: string, productName: string) => {
    setSelectedOrderForReview({ orderId, productId, productName })
    setReviewModalOpen(true)
  }

  const handleReviewSuccess = async () => {
    // Mark product as reviewed immediately
    if (selectedOrderForReview) {
      const key = `${selectedOrderForReview.orderId}-${selectedOrderForReview.productId}`
      setReviewedProducts(prev => ({
        ...prev,
        [key]: true
      }))
    }
    
    // Reload orders to update review status
    if (userId) {
      const { data: ordersData } = await getUserOrders(userId)
      if (ordersData) {
        setOrders(ordersData)
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "processing":
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <Package className="w-5 h-5 text-neutral-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-neutral-900 mx-auto mb-4" />
          <p className="text-neutral-600">Loading your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">My Account</h1>
          <p className="text-neutral-600">Manage your profile, orders, and settings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
              <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-center">
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
                  <User className="w-10 h-10 text-neutral-900" />
                </div>
                <h2 className="text-lg font-semibold text-white">{userData.name || 'User'}</h2>
                <p className="text-neutral-300 text-sm">{userData.email}</p>
                
                {/* Auth Provider Badge */}
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                  {authProvider === 'google' ? (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Signed in with Google</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>Signed in with Email</span>
                    </>
                  )}
                </div>
              </div>

              <nav className="p-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === "profile"
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === "orders"
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">Orders</span>
                </button>
                {authProvider !== 'google' && (
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === "password"
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    <span className="font-medium">Password</span>
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Save
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          disabled={saving}
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none disabled:bg-neutral-50 disabled:text-neutral-600"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                        {authProvider === 'google' && (
                          <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                            Google
                          </span>
                        )}
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        disabled={true}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none disabled:bg-neutral-50 disabled:text-neutral-600"
                      />
                      {authProvider === 'google' && (
                        <p className="text-xs text-neutral-500 mt-1">
                          This email is linked to your Google account and cannot be changed here.
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none disabled:bg-neutral-50 disabled:text-neutral-600"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
                        <MapPin className="w-4 h-4" />
                        Address
                      </label>
                      <textarea
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        disabled={!isEditing}
                        rows={3}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none disabled:bg-neutral-50 disabled:text-neutral-600 resize-none"
                      />
                    </div>

                    {/* City & Postal Code */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">City</label>
                        <input
                          type="text"
                          value={userData.city}
                          onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none disabled:bg-neutral-50 disabled:text-neutral-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Postal Code</label>
                        <input
                          type="text"
                          value={userData.postalCode}
                          onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none disabled:bg-neutral-50 disabled:text-neutral-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Saved Shipping Information Section */}
                  {savedShippingInfo.save_shipping_info && (
                    <div className="mt-8 pt-8 border-t border-neutral-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Truck className="w-5 h-5 text-neutral-700" />
                        <h3 className="text-xl font-bold text-neutral-900">Saved Shipping Information</h3>
                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          ✓ Auto-fills at checkout
                        </span>
                      </div>
                      
                      <div className="bg-neutral-50 rounded-lg p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Full Name</label>
                            <p className="text-neutral-900 mt-1">{savedShippingInfo.shipping_name || '-'}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">WhatsApp Number</label>
                            <p className="text-neutral-900 mt-1">{savedShippingInfo.shipping_phone || '-'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Shipping Address</label>
                          <p className="text-neutral-900 mt-1">{savedShippingInfo.shipping_address || '-'}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">City</label>
                            <p className="text-neutral-900 mt-1">{savedShippingInfo.shipping_city || '-'}</p>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Province</label>
                            <p className="text-neutral-900 mt-1">{savedShippingInfo.shipping_province || '-'}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-neutral-200">
                          <p className="text-sm text-neutral-600 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            This information will automatically fill when you checkout
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Order History</h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
                      <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <p className="text-neutral-600 text-lg">No orders yet</p>
                      <Link
                        href="/catalog"
                        className="inline-block mt-4 px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                        >
                          {/* Order Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-neutral-900">{order.order_number}</h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {getStatusIcon(order.status)}
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-neutral-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(order.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                                {order.tracking_number && (
                                  <span className="flex items-center gap-1">
                                    <Truck className="w-4 h-4" />
                                    {order.tracking_number}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-neutral-600 mb-1">Total</p>
                              <p className="text-xl font-bold text-neutral-900">Rs. {order.total.toLocaleString()}</p>
                            </div>
                          </div>

                        {/* Order Items */}
                        <div className="space-y-2 mb-4">
                          {order.items?.map((item, itemIndex) => (
                            <div key={item.id || itemIndex} className="flex justify-between items-center py-2 border-t border-neutral-100">
                              <div>
                                <p className="font-medium text-neutral-900">
                                  {item.product_name}
                                  {item.variant_details && (
                                    <span className="text-sm text-neutral-500"> ({item.variant_details})</span>
                                  )}
                                </p>
                                <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-medium text-neutral-900">Rs. {item.total_price.toLocaleString()}</p>
                            </div>
                          )) || <p className="text-sm text-neutral-500 py-2">No items</p>}
                        </div>

                        {/* Order Actions */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          <Link
                            href={`/order/${order.id}`}
                            className="flex-1 min-w-[140px] px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors text-center font-medium"
                          >
                            View Details
                          </Link>
                          {order.status === "delivered" && (
                            <Link
                              href={`/claim/${order.id}`}
                              className="flex items-center gap-2 px-3 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium text-sm text-center"
                            >
                              Claim
                              {orderClaims[order.id] && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                  orderClaims[order.id].status === 'pending' 
                                    ? 'bg-yellow-500 text-yellow-900'
                                    : orderClaims[order.id].status === 'in-progress'
                                    ? 'bg-blue-500 text-blue-900'
                                    : orderClaims[order.id].status === 'resolved'
                                    ? 'bg-green-500 text-green-900'
                                    : orderClaims[order.id].status === 'rejected'
                                    ? 'bg-red-500 text-red-900'
                                    : 'bg-gray-500 text-gray-900'
                                }`}>
                                  {orderClaims[order.id].status === 'in-progress' 
                                    ? 'In Progress' 
                                    : orderClaims[order.id].status.charAt(0).toUpperCase() + orderClaims[order.id].status.slice(1)}
                                </span>
                              )}
                            </Link>
                          )}
                          {order.status === "shipped" && order.tracking_url && (
                            <a
                              href={order.tracking_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 min-w-[140px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                            >
                              Track Order
                            </a>
                          )}
                        </div>

                        {/* Review Section - Only for delivered orders */}
                        {order.status === "delivered" && order.items && order.items.length > 0 && (
                          <div className="border-t border-neutral-200 pt-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <h4 className="font-semibold text-neutral-900">Share Your Experience</h4>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {order.items.map((item) => {
                                if (!item.product_id) return null
                                
                                const reviewKey = `${order.id}-${item.product_id}`
                                const hasReviewed = reviewedProducts[reviewKey]
                                
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => !hasReviewed && item.product_id && handleOpenReviewModal(order.id, item.product_id, item.product_name)}
                                    disabled={hasReviewed}
                                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                                      hasReviewed
                                        ? 'border-green-200 bg-green-50 cursor-not-allowed'
                                        : 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-400'
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-neutral-900 truncate text-sm">
                                          {item.product_name}
                                        </p>
                                        {item.variant_details && (
                                          <p className="text-xs text-neutral-500 mt-0.5">{item.variant_details}</p>
                                        )}
                                      </div>
                                      {hasReviewed ? (
                                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium whitespace-nowrap">
                                          <CheckCircle2 className="w-4 h-4" />
                                          Reviewed
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-1 text-yellow-600 text-xs font-medium whitespace-nowrap">
                                          <MessageSquare className="w-4 h-4" />
                                          Review
                                        </div>
                                      )}
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  )}
                </div>
              )}

              {/* Password Tab */}
              {activeTab === "password" && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Change Password</h2>
                  <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
                    {/* Current Password */}
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          id="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                          }
                          className="w-full pl-11 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          {showCurrentPassword ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          id="newPassword"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full pl-11 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          {showNewPassword ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                          }
                          className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-neutral-700 mb-2">Password must contain:</p>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• At least 8 characters</li>
                        <li>• At least one uppercase letter</li>
                        <li>• At least one lowercase letter</li>
                        <li>• At least one number</li>
                      </ul>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedOrderForReview && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false)
            setSelectedOrderForReview(null)
          }}
          productId={selectedOrderForReview.productId}
          productName={selectedOrderForReview.productName}
          orderId={selectedOrderForReview.orderId}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  )
}

// Wrap in Suspense boundary for useSearchParams
export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-900 mx-auto mb-4" />
          <p className="text-neutral-600">Loading account...</p>
        </div>
      </div>
    }>
      <AccountPageContent />
    </Suspense>
  )
}

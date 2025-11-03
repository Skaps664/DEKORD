"use client"

import { useState } from "react"
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
} from "lucide-react"
import Link from "next/link"

type Tab = "profile" | "orders" | "password"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Mock user data - replace with real data from Supabase
  const [userData, setUserData] = useState({
    name: "Muhammad Sudais Khan",
    email: "sudais@dekord.online",
    phone: "+92 339 0166442",
    address: "A2 Third Floor, New Dil Jan Plaza, Achini, Peshawar",
    city: "Peshawar",
    postalCode: "25000",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Mock orders data - replace with real data from Supabase
  const orders = [
    {
      id: "ORD-001",
      date: "2025-11-01",
      status: "delivered",
      items: [
        { name: "dekord W-60 Braided Cable", quantity: 2, price: 1499 },
        { name: "dekord W-100 Power Cable", quantity: 1, price: 1999 },
      ],
      total: 4997,
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-002",
      date: "2025-10-28",
      status: "shipped",
      items: [{ name: "Type-C to Lightning Cable", quantity: 1, price: 1299 }],
      total: 1299,
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-003",
      date: "2025-10-25",
      status: "processing",
      items: [
        { name: "dekord Wall Charger 20W", quantity: 1, price: 899 },
        { name: "Micro USB Cable", quantity: 3, price: 799 },
      ],
      total: 3296,
      trackingNumber: "Pending",
    },
  ]

  const handleSaveProfile = () => {
    // TODO: Save to Supabase
    setIsEditing(false)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement password change with Supabase
    console.log("Password change:", passwordData)
  }

  const handleLogout = () => {
    // TODO: Implement logout with Supabase
    window.location.href = "/auth"
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
                <h2 className="text-lg font-semibold text-white">{userData.name}</h2>
                <p className="text-neutral-300 text-sm">{userData.email}</p>
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
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
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
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none disabled:bg-neutral-50 disabled:text-neutral-600"
                      />
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
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6">Order History</h2>
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
                              <h3 className="text-lg font-semibold text-neutral-900">{order.id}</h3>
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
                                {new Date(order.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                              {order.trackingNumber !== "Pending" && (
                                <span className="flex items-center gap-1">
                                  <Truck className="w-4 h-4" />
                                  {order.trackingNumber}
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
                          {order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex justify-between items-center py-2 border-t border-neutral-100">
                              <div>
                                <p className="font-medium text-neutral-900">{item.name}</p>
                                <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-medium text-neutral-900">Rs. {item.price.toLocaleString()}</p>
                            </div>
                          ))}
                        </div>

                        {/* Order Actions */}
                        <div className="flex gap-3">
                          <Link
                            href={`/order/${order.id}`}
                            className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors text-center font-medium"
                          >
                            View Details
                          </Link>
                          {order.status === "delivered" && (
                            <button className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium">
                              Buy Again
                            </button>
                          )}
                          {order.status === "shipped" && (
                            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                              Track Order
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
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
    </div>
  )
}

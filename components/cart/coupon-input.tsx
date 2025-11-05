"use client"

import { useState } from "react"
import { Ticket, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { validateCoupon } from "@/lib/services/coupons"
import type { AppliedCoupon } from "@/lib/types/coupon"

interface CouponInputProps {
  cartTotal: number
  userId: string | null
  onCouponApplied: (coupon: AppliedCoupon) => void
  onCouponRemoved: () => void
  appliedCoupon: AppliedCoupon | null
}

export default function CouponInput({
  cartTotal,
  userId,
  onCouponApplied,
  onCouponRemoved,
  appliedCoupon
}: CouponInputProps) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleApply = async () => {
    if (!code.trim()) {
      setError("Please enter a coupon code")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await validateCoupon(code.trim(), userId, cartTotal)

      if (result.valid && result.discount_amount && result.coupon_id) {
        onCouponApplied({
          code: result.code!,
          discount_amount: result.discount_amount,
          discount_type: result.discount_type!,
          discount_value: result.discount_value!,
          coupon_id: result.coupon_id
        })
        setSuccess(`Coupon applied! You save Rs. ${result.discount_amount.toLocaleString()}`)
        setCode("")
      } else {
        setError(result.error || "Invalid coupon code")
      }
    } catch (err) {
      setError("Failed to validate coupon. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    onCouponRemoved()
    setError("")
    setSuccess("")
    setCode("")
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Ticket className="w-5 h-5 text-neutral-600" />
        <h3 className="font-semibold text-neutral-900">Have a coupon code?</h3>
      </div>

      {appliedCoupon ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-mono font-semibold text-green-900">{appliedCoupon.code}</p>
                <p className="text-sm text-green-700">
                  {appliedCoupon.discount_type === 'percentage'
                    ? `${appliedCoupon.discount_value}% off`
                    : `Rs. ${appliedCoupon.discount_value.toLocaleString()} off`}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-2 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-green-700 font-medium">
            You're saving Rs. {appliedCoupon.discount_amount.toLocaleString()}!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 font-mono uppercase"
              disabled={loading}
            />
            <button
              onClick={handleApply}
              disabled={loading || !code.trim()}
              className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Apply"
              )}
            </button>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

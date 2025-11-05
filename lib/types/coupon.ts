export interface Coupon {
  id: string
  code: string
  description: string | null
  discount_type: 'percentage' | 'fixed_amount'
  discount_value: number
  min_purchase_amount: number
  max_discount_amount: number | null
  usage_limit: number | null
  used_count: number
  usage_limit_per_user: number
  start_date: string
  end_date: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CouponValidationResult {
  valid: boolean
  error?: string
  min_amount?: number
  coupon_id?: string
  code?: string
  discount_type?: 'percentage' | 'fixed_amount'
  discount_value?: number
  discount_amount?: number
  description?: string
}

export interface AppliedCoupon {
  code: string
  discount_amount: number
  discount_type: 'percentage' | 'fixed_amount'
  discount_value: number
  coupon_id: string
}

import { createClient } from '@/lib/supabase/client'
import type { CouponValidationResult } from '@/lib/types/coupon'

export async function validateCoupon(
  code: string,
  userId: string | null,
  cartTotal: number
): Promise<CouponValidationResult> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.rpc('validate_coupon', {
      coupon_code_input: code.toUpperCase(),
      user_id_input: userId,
      cart_total: cartTotal
    })

    if (error) {
      console.error('Coupon validation error:', error)
      return {
        valid: false,
        error: 'Failed to validate coupon'
      }
    }

    return data as CouponValidationResult
  } catch (error) {
    console.error('Coupon validation exception:', error)
    return {
      valid: false,
      error: 'An error occurred while validating the coupon'
    }
  }
}

export function calculateDiscount(
  discountType: 'percentage' | 'fixed_amount',
  discountValue: number,
  cartTotal: number,
  maxDiscountAmount?: number | null
): number {
  let discount = 0

  if (discountType === 'percentage') {
    discount = (cartTotal * discountValue) / 100
    if (maxDiscountAmount) {
      discount = Math.min(discount, maxDiscountAmount)
    }
  } else {
    discount = discountValue
  }

  // Ensure discount doesn't exceed cart total
  return Math.min(discount, cartTotal)
}

export async function recordCouponUsage(
  couponId: string,
  userId: string,
  orderId: string,
  discountAmount: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient()
    
    // Record usage in coupon_usage table
    const { error: usageError } = await supabase
      .from('coupon_usage')
      .insert({
        coupon_id: couponId,
        user_id: userId,
        order_id: orderId,
        discount_amount: discountAmount
      })

    if (usageError) {
      console.error('Error recording coupon usage:', usageError)
      return { success: false, error: 'Failed to record coupon usage' }
    }

    // Get current coupon data and increment used_count
    const { data: coupon, error: fetchError } = await supabase
      .from('coupons')
      .select('used_count')
      .eq('id', couponId)
      .single()

    if (fetchError || !coupon) {
      console.error('Error fetching coupon:', fetchError)
      return { success: false, error: 'Failed to fetch coupon data' }
    }

    const { error: updateError } = await supabase
      .from('coupons')
      .update({ 
        used_count: (coupon.used_count || 0) + 1
      })
      .eq('id', couponId)

    if (updateError) {
      console.error('Error updating coupon count:', updateError)
      return { success: false, error: 'Failed to update coupon count' }
    }

    return { success: true }
  } catch (error) {
    console.error('Coupon usage recording exception:', error)
    return { success: false, error: 'An error occurred while recording coupon usage' }
  }
}

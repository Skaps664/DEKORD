import { createClient } from '@/lib/supabase/client'

export interface Claim {
  id: string
  order_id: string | null
  user_id: string | null
  name: string
  email: string
  whatsapp_number: string
  city: string
  order_number: string
  claim_type: string
  message: string
  images: string[]
  status: string
  resolution_notes: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export async function getClaimByOrderId(orderId: string) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      return { data: null, error: error.message }
    }

    if (!data || data.length === 0) {
      return { data: null, error: null }
    }

    const claim = Array.isArray(data) ? data[0] : data
    return { data: claim as Claim, error: null }
  } catch (error) {
    return { data: null, error: 'Failed to fetch claim' }
  }
}

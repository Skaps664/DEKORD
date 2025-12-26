import { supabase } from '@/lib/supabase/client'

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
  admin_response: string | null
  created_at: string
  updated_at: string
}

export async function getClaimByOrderId(orderId: string) {
  try {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching claim:', error)
      return { data: null, error: error.message }
    }

    return { data: data as Claim | null, error: null }
  } catch (error) {
    console.error('Error fetching claim:', error)
    return { data: null, error: 'Failed to fetch claim' }
  }
}

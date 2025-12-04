// Server-side database service for Merch (for SSR/ISR)
import { createClient } from '../supabase/server'
import type { MerchWithFeatures } from '../types/database'

export async function getAllMerchServer() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('merch')
    .select(`
      *,
      features:merch_features(*)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching merch:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getMerchBySlugServer(slug: string) {
  const supabase = await createClient()

  const { data, error} = await supabase
    .from('merch')
    .select(`
      *,
      features:merch_features(*)
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error) {
    console.error('Error fetching merch:', error)
    return { data: null, error: error.message }
  }

  return { data: data as MerchWithFeatures, error: null }
}

// Database service for Merch
import { createClient } from '../supabase/client'
import type { MerchWithFeatures } from '../types/database'

export async function getAllMerch() {
  const supabase = createClient()

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

export async function getMerchBySlug(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase
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

export async function searchMerch(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('merch')
    .select(`
      *,
      features:merch_features(*)
    `)
    .eq('status', 'active')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching merch:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}
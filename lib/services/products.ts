// Database service for Products
import { createClient } from '../supabase/client'
import type { Product, ProductWithVariants, ProductVariant } from '../types/database'

export async function getAllProducts() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function getProductBySlug(slug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants(*)
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return { data: null, error: error.message }
  }
  
  return { data: data as ProductWithVariants, error: null }
}

export async function getProductsByCategory(category: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products by category:', error)
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function searchProducts(query: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error searching products:', error)
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function getProductVariants(productId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', productId)
    .eq('is_available', true)
  
  if (error) {
    console.error('Error fetching product variants:', error)
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

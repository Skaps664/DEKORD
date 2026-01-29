// Server-side database service for Products (for SSR/ISR)
import { createClient, createStaticClient } from '../supabase/server'
import type { Product, ProductWithVariants } from '../types/database'

export async function getProductBySlugServer(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants(*),
      collection_products(
        collections(name)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  
  if (error) {
    console.error('Error fetching product:', error)
    return { data: null, error: error.message }
  }
  
  // Transform data to include collection name
  const product = {
    ...data,
    collection: data.collection_products?.[0]?.collections?.name || null
  }
  
  return { data: product as ProductWithVariants, error: null }
}

export async function getAllProductsServer() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      collection_products(
        collections(name)
      )
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching products:', error)
    return { data: null, error: error.message }
  }
  
  // Transform data to include collection names
  const products = data.map(product => ({
    ...product,
    collection: product.collection_products?.[0]?.collections?.name || null
  }))
  
  return { data: products, error: null }
}

export async function getAllProductSlugs() {
  const supabase = createStaticClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .eq('status', 'active')
  
  if (error) {
    console.error('Error fetching product slugs:', error)
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

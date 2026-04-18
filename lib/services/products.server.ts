// Server-side database service for Products (for SSR/ISR)
import { createStaticClient } from '../supabase/server'
import type { Product, ProductWithVariants, ProductType } from '../types/database'

export async function getProductBySlugServer(slug: string) {
  const supabase = createStaticClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      variants:product_variants(*),
      collection_products(
        collections(name)
      ),
      product_type:product_types(*)
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  
  if (error) {
    console.error('Error fetching product:', error)
    return { data: null, error: error.message }
  }

  if (!data) {
    return { data: null, error: null }
  }
  
  // Transform data to include collection name and product type
  const product = {
    ...data,
    collection: data.collection_products?.[0]?.collections?.name || null,
    product_type: data.product_type || null,
  }
  
  return { data: product as ProductWithVariants & { product_type: ProductType | null }, error: null }
}

export async function getAllProductsServer() {
  const supabase = createStaticClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      description,
      category,
      price,
      availability,
      main_image,
      rating,
      review_count,
      created_at,
      updated_at,
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
  
  // Keep catalog payload lean for Worker CPU limits while preserving collection label.
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

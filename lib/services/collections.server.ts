// Server-side database service for Collections (for SSR/ISR)
import { createStaticClient } from '../supabase/server'
import type { Collection, CollectionWithProducts } from '../types/database'

export async function getAllCollectionsServer() {
  const supabase = createStaticClient()
  
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('status', 'active')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching collections:', error)
    return { data: null, error: error.message }
  }

  // Collections listing UI only needs collection-level fields.
  return { data: data as Collection[], error: null }
}

export async function getCollectionBySlugServer(slug: string) {
  const supabase = createStaticClient()
  
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      collection_products(
        product_id,
        sort_order,
        products(*)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  
  if (error) {
    console.error('Error fetching collection:', error)
    return { data: null, error: error.message }
  }

  if (!data) {
    return { data: null, error: null }
  }
  
  // Transform data
  const collection = {
    ...data,
    product_count: data.collection_products?.length || 0,
    products: data.collection_products
      ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((cp: any) => cp.products) || []
  }
  
  return { data: collection as CollectionWithProducts, error: null }
}

export async function getAllCollectionSlugs() {
  const supabase = createStaticClient()
  
  const { data, error } = await supabase
    .from('collections')
    .select('slug')
    .eq('status', 'active')
  
  if (error) {
    console.error('Error fetching collection slugs:', error)
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

// Server-side database service for Collections (for SSR/ISR)
import { createClient, createStaticClient } from '../supabase/server'
import type { CollectionWithProducts } from '../types/database'

export async function getAllCollectionsServer() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      collection_products(
        product_id,
        products(*)
      )
    `)
    .eq('status', 'active')
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching collections:', error)
    return { data: null, error: error.message }
  }
  
  // Transform data to include product count
  const collections = data.map((collection: any) => ({
    ...collection,
    product_count: collection.collection_products?.length || 0,
    products: collection.collection_products?.map((cp: any) => cp.products) || []
  }))
  
  return { data: collections as CollectionWithProducts[], error: null }
}

export async function getCollectionBySlugServer(slug: string) {
  const supabase = await createClient()
  
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
    .single()
  
  if (error) {
    console.error('Error fetching collection:', error)
    return { data: null, error: error.message }
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

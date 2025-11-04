// Database service for Collections
import { createClient } from '../supabase/client'
import type { Collection, CollectionWithProducts } from '../types/database'

export async function getAllCollections() {
  const supabase = createClient()
  
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

export async function getCollectionBySlug(slug: string) {
  const supabase = createClient()
  
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

export async function getProductsInCollection(collectionId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('collection_products')
    .select(`
      sort_order,
      products(*)
    `)
    .eq('collection_id', collectionId)
    .order('sort_order', { ascending: true })
  
  if (error) {
    console.error('Error fetching collection products:', error)
    return { data: null, error: error.message }
  }
  
  const products = data.map((cp: any) => cp.products)
  return { data: products, error: null }
}

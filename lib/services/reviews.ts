import { createClient } from '@/lib/supabase/client'
import type { Review, ReviewWithUser } from '@/lib/types/database'

export async function getProductReviews(productId: string) {
  const supabase = createClient()
  
  // First get reviews
  const { data: reviewsData, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
  
  if (reviewsError) {
    console.error('Error fetching reviews:', reviewsError)
    return { data: null, error: reviewsError.message }
  }

  if (!reviewsData || reviewsData.length === 0) {
    return { data: [], error: null }
  }

  // Get user profiles for the reviews
  const userIds = reviewsData.map(r => r.user_id)
  const { data: profiles } = await supabase
    .from('user_profiles')
    .select('id, full_name')
    .in('id', userIds)

  // Combine reviews with user data
  const reviewsWithUsers = reviewsData.map(review => ({
    ...review,
    user: profiles?.find(p => p.id === review.user_id) || { full_name: 'Anonymous' }
  }))
  
  return { data: reviewsWithUsers as ReviewWithUser[], error: null }
}

export async function getProductRatingStats(productId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId)
  
  if (error) {
    console.error('Error fetching rating stats:', error)
    return { data: null, error: error.message }
  }
  
  // Calculate rating distribution
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let totalRating = 0
  
  data.forEach(review => {
    ratingCounts[review.rating as keyof typeof ratingCounts]++
    totalRating += review.rating
  })
  
  const totalReviews = data.length
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0'
  
  return {
    data: {
      averageRating: parseFloat(averageRating),
      totalReviews,
      ratingCounts
    },
    error: null
  }
}

export async function canUserReviewProduct(orderId: string, productId: string) {
  const supabase = createClient()
  
  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { canReview: false, error: 'Not authenticated' }
  
  // Check if order exists and is delivered
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('status, user_id')
    .eq('id', orderId)
    .eq('user_id', user.id)
    .single()
  
  if (orderError || !order) {
    return { canReview: false, error: 'Order not found' }
  }
  
  if (order.status !== 'delivered') {
    return { canReview: false, error: 'Order must be delivered to review' }
  }
  
  // Check if review already exists
  const { data: existingReview } = await supabase
    .from('reviews')
    .select('id')
    .eq('order_id', orderId)
    .eq('product_id', productId)
    .eq('user_id', user.id)
    .single()
  
  if (existingReview) {
    return { canReview: false, error: 'You have already reviewed this product' }
  }
  
  return { canReview: true, error: null }
}

export async function createReview(data: {
  productId: string
  orderId: string
  rating: number
  title?: string
  comment: string
  images?: string[]
}) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { data: null, error: 'Not authenticated' }
  }
  
  const { data: review, error } = await supabase
    .from('reviews')
    .insert({
      product_id: data.productId,
      order_id: data.orderId,
      user_id: user.id,
      rating: data.rating,
      title: data.title || null,
      comment: data.comment,
      images: data.images || null,
      verified_purchase: true
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating review:', error)
    return { data: null, error: error.message }
  }
  
  return { data: review as Review, error: null }
}

export async function uploadReviewImage(file: File) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { data: null, error: 'Not authenticated' }
  }
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('reviews')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) {
    console.error('Error uploading image:', error)
    return { data: null, error: error.message }
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('reviews')
    .getPublicUrl(data.path)
  
  return { data: publicUrl, error: null }
}

export async function getUserReviewForProduct(orderId: string, productId: string) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: 'Not authenticated' }
  
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('order_id', orderId)
    .eq('product_id', productId)
    .eq('user_id', user.id)
    .single()
  
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user review:', error)
    return { data: null, error: error.message }
  }
  
  return { data: data as Review | null, error: null }
}

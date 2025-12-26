// Database service for Reviews
import { createClient } from '../supabase/client'
import type { Review, ReviewWithUser } from '../types/database'

export async function getProductReviews(productId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching product reviews:', error)
    console.error('Full error details:', JSON.stringify(error, null, 2))
    return { data: null, error: error.message }
  }
  
  console.log('Successfully fetched reviews:', data?.length, 'reviews')

  // Fetch user profiles separately
  if (data && data.length > 0) {
    const userIds = [...new Set(data.map(r => r.user_id))]
    const { data: users } = await supabase
      .from('user_profiles')
      .select('id, full_name')
      .in('id', userIds)
    
    // Merge user data with reviews
    const reviewsWithUsers = data.map(review => ({
      ...review,
      user: users?.find(u => u.id === review.user_id) || { full_name: 'Anonymous' }
    }))
    
    return { data: reviewsWithUsers as ReviewWithUser[], error: null }
  }

  return { data: data as ReviewWithUser[], error: null }
}

export async function getProductRatingStats(productId: string) {
  const supabase = createClient()

  // First get all reviews for this product
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId)

  if (error) {
    console.error('Error fetching product rating stats:', error)
    return { data: null, error: error.message }
  }

  if (!reviews || reviews.length === 0) {
    return {
      data: {
        averageRating: 0,
        totalReviews: 0,
        ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      },
      error: null
    }
  }

  // Calculate stats
  const totalReviews = reviews.length
  const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = sumRatings / totalReviews

  // Count ratings by star
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach(review => {
    ratingCounts[review.rating as keyof typeof ratingCounts]++
  })

  return {
    data: {
      averageRating,
      totalReviews,
      ratingCounts
    },
    error: null
  }
}

export async function createReview(review: {
  product_id: string
  order_id: string
  user_id: string
  rating: number
  title?: string
  comment: string
  images?: string[]
}) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      ...review,
      verified_purchase: true, // Assuming reviews from orders are verified
      helpful_count: 0
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating review:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function updateReviewHelpful(reviewId: string, increment: boolean = true) {
  const supabase = createClient()

  // First get current count
  const { data: currentReview, error: fetchError } = await supabase
    .from('reviews')
    .select('helpful_count')
    .eq('id', reviewId)
    .single()

  if (fetchError) {
    console.error('Error fetching review for helpful update:', fetchError)
    return { error: fetchError.message }
  }

  const newCount = increment
    ? (currentReview.helpful_count || 0) + 1
    : Math.max(0, (currentReview.helpful_count || 0) - 1)

  const { error } = await supabase
    .from('reviews')
    .update({ helpful_count: newCount })
    .eq('id', reviewId)

  if (error) {
    console.error('Error updating review helpful count:', error)
    return { error: error.message }
  }

  return { error: null }
}

export async function getUserReviewForProduct(userId: string, productId: string, orderId?: string) {
  const supabase = createClient()

  let query = supabase
    .from('reviews')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (orderId) {
    query = query.eq('order_id', orderId)
  }

  const { data, error } = await query.maybeSingle()

  if (error) {
    console.error('Error fetching user review:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function canUserReviewProduct(userId: string, productId: string, orderId: string) {
  // Check if user has already reviewed this product for this order
  const { data: existingReview } = await getUserReviewForProduct(userId, productId, orderId)
  
  if (existingReview) {
    return { canReview: false, reason: 'Already reviewed' }
  }

  // Additional checks can be added here (e.g., order status, delivery date)
  return { canReview: true, reason: null }
}

export async function uploadReviewImage(file: File): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient()

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('reviews')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading review image:', uploadError)
      return { url: null, error: uploadError.message }
    }

    const { data: urlData } = supabase.storage
      .from('reviews')
      .getPublicUrl(filePath)

    return { url: urlData.publicUrl, error: null }
  } catch (error) {
    console.error('Unexpected error uploading review image:', error)
    return { url: null, error: 'Failed to upload image' }
  }
}
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star, User, Check, Image as ImageIcon } from "lucide-react"
import { getProductReviews, getProductRatingStats } from "@/lib/services/reviews"
import type { ReviewWithUser } from "@/lib/types/database"
import Image from "next/image"

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewWithUser[]>([])
  const [stats, setStats] = useState<{
    averageRating: number
    totalReviews: number
    ratingCounts: { [key: number]: number }
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<number | null>(null)

  useEffect(() => {
    if (productId) {
      loadReviews()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  async function loadReviews() {
    setLoading(true)
    
    const [reviewsResult, statsResult] = await Promise.all([
      getProductReviews(productId),
      getProductRatingStats(productId)
    ])

    if (reviewsResult.data) {
      setReviews(reviewsResult.data)
    }

    if (statsResult.data) {
      setStats(statsResult.data)
    }

    setLoading(false)
  }

  const filteredReviews = selectedFilter
    ? reviews.filter(r => r.rating === selectedFilter)
    : reviews

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="pt-12 pb-20 bg-muted/20">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (!stats || stats.totalReviews === 0) {
    return (
      <section className="pt-12 pb-20 bg-muted/20">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Customer Reviews
            </h2>
            <p className="text-muted-foreground">
              Be the first to review this product!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Customer Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-8 bg-card border border-border rounded-3xl">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-foreground mb-2">
                    {stats.averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= Math.round(stats.averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
                  </p>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = stats.ratingCounts[rating] || 0
                    const percentage = stats.totalReviews > 0 
                      ? (count / stats.totalReviews) * 100 
                      : 0

                    return (
                      <button
                        key={rating}
                        onClick={() => setSelectedFilter(selectedFilter === rating ? null : rating)}
                        className={`w-full flex items-center gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors ${
                          selectedFilter === rating ? 'bg-muted' : ''
                        }`}
                      >
                        <span className="text-sm font-medium text-foreground min-w-[2rem]">
                          {rating} <Star className="w-3 h-3 inline fill-yellow-400 text-yellow-400" />
                        </span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground min-w-[3rem] text-right">
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {selectedFilter && (
                  <button
                    onClick={() => setSelectedFilter(null)}
                    className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No reviews with {selectedFilter} {selectedFilter === 1 ? 'star' : 'stars'} yet
                  </p>
                </div>
              ) : (
                filteredReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-card border border-border rounded-2xl hover:border-foreground/20 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">
                              {review.user?.full_name || 'Anonymous'}
                            </span>
                            {review.verified_purchase && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                                <Check className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(review.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    {review.title && (
                      <h4 className="font-semibold text-foreground mb-2">
                        {review.title}
                      </h4>
                    )}

                    {/* Comment */}
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {review.comment}
                    </p>

                    {/* Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {review.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative w-20 h-20 rounded-lg overflow-hidden border border-border hover:scale-105 transition-transform cursor-pointer group"
                          >
                            <Image
                              src={image}
                              alt={`Review image ${imgIndex + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

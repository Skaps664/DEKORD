"use client"

import { Star } from "lucide-react"

interface RatingDisplayProps {
  rating: number | null
  reviewCount: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
}

export function RatingDisplay({ 
  rating, 
  reviewCount, 
  size = "sm",
  showCount = true 
}: RatingDisplayProps) {
  if (!rating || reviewCount === 0) {
    return (
      <div className="flex items-center gap-1 text-muted-foreground">
        <Star className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`} />
        <span className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`}>
          No reviews yet
        </span>
      </div>
    )
  }

  const starSize = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className={`${textSize} text-muted-foreground font-medium`}>
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  )
}

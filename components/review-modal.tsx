"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, Upload, Loader2, Check, Image as ImageIcon } from "lucide-react"
import { createReview, uploadReviewImage } from "@/lib/services/reviews"
import Image from "next/image"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
  orderId: string
  onSuccess?: () => void
}

export function ReviewModal({
  isOpen,
  onClose,
  productId,
  productName,
  orderId,
  onSuccess
}: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (images.length + files.length > 5) {
      setError("You can upload maximum 5 images")
      return
    }

    setUploading(true)
    setError("")

    try {
      const uploadPromises = Array.from(files).map(file => uploadReviewImage(file))
      const results = await Promise.all(uploadPromises)

      const uploadedUrls = results
        .filter(result => result.data)
        .map(result => result.data!)

      setImages(prev => [...prev, ...uploadedUrls])
    } catch (err) {
      setError("Failed to upload images")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (comment.trim().length < 10) {
      setError("Please write at least 10 characters")
      return
    }

    setSubmitting(true)
    setError("")

    const { data, error } = await createReview({
      productId,
      orderId,
      rating,
      title: title.trim() || undefined,
      comment: comment.trim(),
      images: images.length > 0 ? images : undefined
    })

    if (error) {
      setError(error)
      setSubmitting(false)
      return
    }

    setSuccess(true)
    setTimeout(() => {
      onSuccess?.()
      onClose()
      // Reset form
      setRating(0)
      setTitle("")
      setComment("")
      setImages([])
      setSuccess(false)
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background border border-border rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {success ? (
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    Your review has been submitted successfully
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Write a Review</h2>
                      <p className="text-sm text-muted-foreground mt-1">{productName}</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Your Rating *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-10 h-10 transition-colors ${
                                star <= (hoveredRating || rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {rating === 1 && "Poor"}
                          {rating === 2 && "Fair"}
                          {rating === 3 && "Good"}
                          {rating === 4 && "Very Good"}
                          {rating === 5 && "Excellent"}
                        </p>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Review Title (Optional)
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Sum up your experience in one line"
                        maxLength={100}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none"
                      />
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Your Review *
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us about your experience with this product..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Minimum 5 characters ({comment.length}/5)
                      </p>
                    </div>

                    {/* Images */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Add Photos (Optional)
                      </label>
                      <div className="grid grid-cols-5 gap-3">
                        {images.map((url, index) => (
                          <div key={index} className="relative aspect-square group">
                            <Image
                              src={url}
                              alt={`Review image ${index + 1}`}
                              fill
                              className="object-cover rounded-xl"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        {images.length < 5 && (
                          <label className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-foreground/40 transition-colors group">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={uploading}
                            />
                            {uploading ? (
                              <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
                            ) : (
                              <>
                                <ImageIcon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <span className="text-xs text-muted-foreground mt-1">Upload</span>
                              </>
                            )}
                          </label>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        You can upload up to 5 images (JPG, PNG)
                      </p>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="sticky bottom-0 bg-background border-t border-border p-6 flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || rating === 0 || comment.trim().length < 5}
                      className="flex-1 px-6 py-3 bg-foreground text-background rounded-xl font-semibold hover:shadow-xl hover:shadow-foreground/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Review"
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

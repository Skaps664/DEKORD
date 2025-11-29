"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingBag, Star, Truck, Shield } from "lucide-react"

interface ProductItem {
  id: string
  name: string
  category: string
  price: string
  images: string[]
  description: string
  rating: number
  reviews: number
  badge: string
  features: string[]
}

interface ProductSectionProps {
  product: ProductItem
  addedItemId: string | null
  quantities: Record<string, number>
  currentImages: Record<string, number>
  onAddToCart: (itemId: string) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onNavigateImage: (itemId: string, direction: 'prev' | 'next') => void
  onSetCurrentImage: (itemId: string, index: number) => void
  reverse?: boolean
  backgroundColor?: string
  isLoading?: boolean
}

export function ProductSection({
  product,
  addedItemId,
  quantities,
  currentImages,
  onAddToCart,
  onUpdateQuantity,
  onNavigateImage,
  onSetCurrentImage,
  reverse = false,
  backgroundColor = "",
  isLoading = false
}: ProductSectionProps) {
  const getQuantity = (itemId: string) => quantities[itemId] || 1
  const getCurrentImageIndex = (itemId: string) => currentImages[itemId] || 0

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Bestseller":
        return "bg-foreground text-background"
      case "New Arrival":
        return "bg-green-500 text-white"
      case "Popular":
        return "bg-foreground text-background"
      case "Limited Edition":
        return "bg-orange-500 text-white"
      default:
        return "bg-foreground text-background"
    }
  }

  const getFeaturesDisplay = (features: string[]) => {
    if (features.length === 2) {
      return (
        <div className="flex gap-6 mb-4 lg:mb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            <span>{features[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>{features[1]}</span>
          </div>
        </div>
      )
    } else if (features.length === 4) {
      return (
        <div className="flex gap-8 mb-4 lg:mb-6 text-xs">
          <div>
            <div className="font-medium text-foreground mb-0.5">{features[0]}</div>
            <div className="text-muted-foreground">{features[1]}</div>
          </div>
          <div>
            <div className="font-medium text-foreground mb-0.5">{features[2]}</div>
            <div className="text-muted-foreground">{features[3]}</div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <section className={`py-12 ${backgroundColor}`}>
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square bg-muted/30 overflow-hidden group">
              {/* Smooth Image Transition Container */}
              <div className="relative w-full h-full">
                {product.images.map((image, index) => (
                  <motion.div
                    key={`${product.id}-${index}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: index === getCurrentImageIndex(product.id) ? 1 : 0,
                      scale: index === getCurrentImageIndex(product.id) ? 1 : 0.95,
                    }}
                    transition={{
                      opacity: { duration: 0.4, ease: "easeInOut" },
                      scale: { duration: 0.4, ease: "easeInOut" },
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0} // Prioritize first image
                    />
                  </motion.div>
                ))}
              </div>

              <div className="absolute top-3 left-3 bg-foreground text-background px-2 py-0.5 text-xs font-medium">
                {product.badge}
              </div>

              {/* Image Navigation Dots */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onSetCurrentImage(product.id, index)}
                    className={`transition-all duration-300 ${
                      index === getCurrentImageIndex(product.id)
                        ? "bg-foreground w-6 h-1.5 rounded-full"
                        : "bg-foreground/40 w-1.5 h-1.5 rounded-full hover:bg-foreground/60"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <motion.button
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateImage(product.id, "prev")}
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-background/80 sm:bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 text-foreground hover:bg-background shadow-lg rounded-full text-sm sm:text-base"
              >
                ‹
              </motion.button>
              <motion.button
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateImage(product.id, "next")}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-background/80 sm:bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-70 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 text-foreground hover:bg-background shadow-lg rounded-full text-sm sm:text-base"
              >
                ›
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={`space-y-4 lg:space-y-6 lg:pt-4 ${reverse ? 'order-2 lg:order-1' : ''}`}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-2 lg:mb-3 tracking-tight">
                {product.name}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 lg:mb-4">
                {product.description}
              </p>
              <div className="flex items-center gap-3 mb-4 lg:mb-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-foreground text-foreground" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
              </div>
            </div>

            {getFeaturesDisplay(product.features)}

            <div className="border-t border-border pt-4 lg:pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-2xl font-medium text-foreground">{product.price}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => onUpdateQuantity(product.id, getQuantity(product.id) - 1)}
                      className="w-8 h-8 hover:bg-muted transition-colors flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium border-x border-border">{getQuantity(product.id)}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, getQuantity(product.id) + 1)}
                      className="w-8 h-8 hover:bg-muted transition-colors flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onAddToCart(product.id)}
                    disabled={isLoading}
                    className="px-6 py-2 bg-foreground text-background font-medium transition-opacity flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addedItemId === product.id ? (
                      <>Added ✓</>
                    ) : isLoading ? (
                      <>Adding...</>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
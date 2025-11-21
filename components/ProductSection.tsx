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
  backgroundColor = ""
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
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-foreground" />
            <span className="text-sm">{features[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-foreground" />
            <span className="text-sm">{features[1]}</span>
          </div>
        </div>
      )
    } else if (features.length === 4) {
      return (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-sm">
            <strong className="block text-foreground">{features[0]}</strong>
            <span className="text-muted-foreground">{features[1]}</span>
          </div>
          <div className="text-sm">
            <strong className="block text-foreground">{features[2]}</strong>
            <span className="text-muted-foreground">{features[3]}</span>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <section className={`py-16 md:py-24 ${backgroundColor}`}>
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className={`absolute ${reverse ? '-bottom-4 -right-4' : '-top-4 -left-4'} w-24 h-24 bg-foreground/10 rounded-full blur-xl`}></div>
              <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
                <Image
                  src={product.images[getCurrentImageIndex(product.id)]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-foreground text-background px-3 py-1 rounded-full text-sm font-medium">
                  {product.badge}
                </div>
                {/* Image Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => onSetCurrentImage(product.id, index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === getCurrentImageIndex(product.id) ? "bg-white" : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => onNavigateImage(product.id, "prev")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={() => onNavigateImage(product.id, "next")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ›
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`space-y-6 ${reverse ? 'order-2 lg:order-1' : ''}`}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>

            {getFeaturesDisplay(product.features)}

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">{product.price}</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, getQuantity(product.id) - 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-border hover:border-foreground transition-colors flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="w-6 sm:w-8 text-center text-sm font-medium">{getQuantity(product.id)}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, getQuantity(product.id) + 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-border hover:border-foreground transition-colors flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart(product.id)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-foreground text-background rounded-full font-medium hover:shadow-lg transition-shadow flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                  >
                    {addedItemId === product.id ? (
                      <>Added ✓</>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
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
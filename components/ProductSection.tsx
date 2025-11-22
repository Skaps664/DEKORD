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
        <div className="flex gap-6 mb-6 text-xs text-muted-foreground">
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
        <div className="flex gap-8 mb-6 text-xs">
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
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square bg-muted/30 overflow-hidden group">
              <Image
                src={product.images[getCurrentImageIndex(product.id)]}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-foreground text-background px-2 py-0.5 text-xs font-medium">
                {product.badge}
              </div>
              {/* Image Navigation */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onSetCurrentImage(product.id, index)}
                    className={`w-1.5 h-1.5 transition-all ${
                      index === getCurrentImageIndex(product.id) ? "bg-foreground w-6" : "bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => onNavigateImage(product.id, "prev")}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
              >
                ‹
              </button>
              <button
                onClick={() => onNavigateImage(product.id, "next")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm"
              >
                ›
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className={`space-y-6 lg:pt-4 ${reverse ? 'order-2 lg:order-1' : ''}`}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3 tracking-tight">
                {product.name}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {product.description}
              </p>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-foreground text-foreground" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
              </div>
            </div>

            {getFeaturesDisplay(product.features)}

            <div className="border-t border-border pt-6">
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
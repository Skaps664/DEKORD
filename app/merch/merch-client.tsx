"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"
import InfiniteGallery from "@/components/infinite-gallery"
import { ProductSection } from "@/components/ProductSection"
import { motion } from "framer-motion"
import CreativityShowcase from "@/components/creativity-showcase"
import type { MerchWithFeatures } from "@/lib/types/database"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

interface MerchPageClientProps {
  merchItems: MerchWithFeatures[]
}

export function MerchPageClient({ merchItems }: MerchPageClientProps) {
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [currentImages, setCurrentImages] = useState<Record<string, number>>({})
  
  const { addItem, isLoading } = useCart()

  const handleAddToCart = (item: MerchWithFeatures) => {
    const quantity = quantities[item.id] || 1
    
    addItem({
      productId: undefined,
      merchId: item.id,
      productName: item.name,
      productImage: item.image_1 || '',
      variantId: null,
      variantDetails: "Default",
      color: undefined,
      length: undefined,
      price: parseFloat(item.price.toString()),
      quantity,
      itemType: 'merch'
    })

    setAddedItemId(item.id)
    setTimeout(() => setAddedItemId(null), 2000)
  }

  const updateQuantity = (id: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: quantity
    }))
  }

  const navigateImage = (id: string, direction: 'prev' | 'next', totalImages: number) => {
    setCurrentImages(prev => {
      const current = prev[id] || 0
      const newIndex = direction === 'next' 
        ? (current + 1) % totalImages
        : (current - 1 + totalImages) % totalImages
      return {
        ...prev,
        [id]: newIndex
      }
    })
  }

  const transformMerchToProduct = (item: MerchWithFeatures) => {
    const images = [item.image_1, item.image_2, item.image_3, item.image_4, item.image_5].filter(Boolean) as string[]

    return {
      id: item.id,
      name: item.name,
      category: "Merchandise",
      price: `Rs. ${item.price.toLocaleString()}`,
      images,
      description: item.description || "",
      rating: 4.8,
      reviews: 0,
      badge: item.quantity_available < 10 ? "Limited Stock" : "Available",
      features: item.features?.map(f => f.feature) || []
    }
  }

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0">
          <Image
            src="/test-4.jpg"
            alt="dekord Merchandise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              dekord Merchandise
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Express your style with premium accessories designed with the same attention to detail as our cables
            </p>
          </motion.div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 px-4 bg-secondary/10">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Designed with the Same Attention to Detail
            </h2>
            <p className="text-lg text-muted-foreground">
              Our merchandise reflects the quality and craftsmanship you&apos;ve come to expect from dekord.
              Every piece is carefully designed to complement your lifestyle.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Product Sections */}
      {merchItems.map((item, index) => {
        const product = transformMerchToProduct(item)
        const images = [item.image_1, item.image_2, item.image_3, item.image_4, item.image_5].filter(Boolean)
        
        return (
          <ProductSection
            key={item.id}
            product={product}
            reverse={index % 2 !== 0}
            onAddToCart={() => handleAddToCart(item)}
            onUpdateQuantity={(itemId: string, qty: number) => updateQuantity(itemId, qty)}
            quantities={quantities}
            currentImages={currentImages}
            onNavigateImage={(itemId: string, direction: 'prev' | 'next') => navigateImage(itemId, direction, images.length)}
            onSetCurrentImage={(itemId: string, idx: number) => setCurrentImages(prev => ({ ...prev, [itemId]: idx }))}
            addedItemId={addedItemId}
            isLoading={isLoading}
            backgroundColor={index % 2 === 0 ? "white" : "gray"}
          />
        )
      })}

      {/* Infinite Gallery */}
      <section className="py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-center mb-12">
            Gallery
          </h2>
        </Reveal>
        <InfiniteGallery
          images={merchItems.flatMap(item => 
            [item.image_1, item.image_2, item.image_3, item.image_4, item.image_5].filter(Boolean) as string[]
          )}
          speed={30}
        />
      </section>

      {/* Creativity Showcase */}
      <CreativityShowcase />
    </main>
  )
}

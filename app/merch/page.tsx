"use client"

import { useState, useEffect } from "react"
import { Reveal } from "@/components/reveal"
import InfiniteGallery from "@/components/infinite-gallery"
import { ProductSection } from "@/components/ProductSection"
import { motion } from "framer-motion"
import CreativityShowcase from "@/components/creativity-showcase"
import { getAllMerch } from "@/lib/services/merch"
import type { MerchWithFeatures } from "@/lib/types/database"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

export default function MerchPage() {
  const [merchItems, setMerchItems] = useState<MerchWithFeatures[]>([])
  const [loading, setLoading] = useState(true)
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [currentImages, setCurrentImages] = useState<Record<string, number>>({})
  
  const { addItem, isLoading } = useCart()

  useEffect(() => {
    loadMerch()
  }, [])

  async function loadMerch() {
    const { data, error } = await getAllMerch()
    if (error) {
      console.error('Failed to load merch:', error)
    } else if (data) {
      setMerchItems(data)
    }
    setLoading(false)
  }

  const handleAddToCart = async (itemId: string) => {
    const merch = merchItems.find(item => item.id === itemId)
    if (!merch) return

    try {
      console.log('🔵 Adding merch to cart:', merch.id, merch.name)
      
      await addItem({
        productId: undefined, // No product ID for merch
        merchId: merch.id, // Use merch ID
        productName: merch.name,
        productImage: merch.image_1 || '', // Use first image
        variantId: null, // Merch doesn't have variants
        variantDetails: "Default",
        color: undefined,
        length: undefined,
        price: parseFloat(merch.price.toString()),
        quantity: getQuantity(itemId),
        itemType: 'merch' // Specify this is merch
      })
      
      console.log('✅ Successfully added merch to cart')
      
      // Show success feedback
      setAddedItemId(itemId)
      setTimeout(() => setAddedItemId(null), 2000)
    } catch (error) {
      console.error("❌ Failed to add merch to cart:", error)
    }
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, quantity)
    }))
  }

  const getQuantity = (itemId: string) => {
    return quantities[itemId] || 1
  }

  const getCurrentImageIndex = (itemId: string) => {
    return currentImages[itemId] || 0
  }

  const navigateImage = (itemId: string, direction: 'prev' | 'next') => {
    const item = merchItems.find(item => item.id === itemId)
    if (!item) return

    const images = [item.image_1, item.image_2, item.image_3, item.image_4, item.image_5].filter(Boolean)
    const currentIndex = getCurrentImageIndex(itemId)
    const totalImages = images.length

    let newIndex
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1
    }

    setCurrentImages(prev => ({
      ...prev,
      [itemId]: newIndex
    }))
  }

  // Transform merch data to match ProductSection interface
  const transformMerchToProduct = (merch: MerchWithFeatures) => {
    const images = [merch.image_1, merch.image_2, merch.image_3, merch.image_4, merch.image_5].filter(Boolean) as string[]

    return {
      id: merch.id,
      name: merch.name,
      category: "Merchandise",
      price: `Rs. ${merch.price.toLocaleString()}`,
      images,
      description: merch.description || "",
      rating: 4.8, // Default rating since we don't have reviews yet
      reviews: 0, // Default review count
      badge: merch.quantity_available < 10 ? "Limited Stock" : "Available",
      features: merch.features?.map(f => f.feature) || []
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading merchandise...</p>
        </div>
      </main>
    )
  }

  if (merchItems.length === 0) {
    return (
      <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No merchandise available at the moment.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0">
          <Image
            src="/merch-hero.webp"
            alt="Dekord Merchandise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container-custom relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                dekord <span className="italic font-light">merch</span>
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-2xl">
                Express your style with dekord merchandise. Premium accessories designed with the same attention to detail as our cables.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Merch Banner */}
      <section className="relative isolate py-12 sm:py-16 lg:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-background grain-texture"
          style={{
            maskImage:
              "radial-gradient(120% 80% at 50% 40%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.35) 90%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(120% 80% at 50% 40%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.35) 90%, transparent 100%)",
          }}
        />

        <div className="container-custom relative px-2 sm:px-2 md:px-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-label text-muted-foreground text-sm sm:text-base">🎨 EXPRESS YOUR STYLE</p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-primary tracking-tight font-bold">
                    More than <span className="italic font-normal">products, </span>
                    statements.
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-prose">
                    Each piece in our collection is crafted with the same precision and attention to detail as our cables. Wear your values, carry your story.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <a
                      href="#featured-products"
                      className="inline-flex items-center rounded-[var(--radius-lg)] px-4 sm:px-5 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm sm:text-base"
                      aria-label="Explore our merchandise collection"
                    >
                      Shop Collection
                    </a>
                    <a
                      href="#creativity"
                      className="inline-flex items-center rounded-[var(--radius-lg)] px-4 sm:px-5 py-2.5 sm:py-3 border border-border text-foreground text-sm sm:text-base"
                      aria-label="Learn about our creative process"
                    >
                      Our Craft
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative h-[240px] sm:h-[300px] lg:h-[360px] rounded-[var(--radius-lg)] overflow-hidden ring-1 ring-border bg-muted"
                >
                  <Image
                    src="/merch-stickers.webp"
                    alt="Dekord sticker collection"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative h-[240px] sm:h-[360px] lg:h-[440px] rounded-[var(--radius-lg)] overflow-hidden ring-1 ring-border bg-muted"
                >
                  <Image
                    src="/merch-notebook.webp"
                    alt="Dekord hardcover notebook"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="mt-3 sm:mt-4 lg:mt-6">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Craftsmanship: Premium materials, thoughtful design, sustainable production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product - First Item */}
      {merchItems.length > 0 && (
        <ProductSection
          product={transformMerchToProduct(merchItems[0])}
          addedItemId={addedItemId}
          quantities={quantities}
          currentImages={currentImages}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={updateQuantity}
          onNavigateImage={navigateImage}
          onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
          isLoading={isLoading}
        />
      )}

      {/* Second Item */}
      {merchItems.length > 1 && (
        <ProductSection
          product={transformMerchToProduct(merchItems[1])}
          addedItemId={addedItemId}
          quantities={quantities}
          currentImages={currentImages}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={updateQuantity}
          onNavigateImage={navigateImage}
          onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
          reverse={true}
          backgroundColor="bg-muted/20"
          isLoading={isLoading}
        />
      )}

      

      {/* Third Item */}
      {merchItems.length > 2 && (
        <ProductSection
          product={transformMerchToProduct(merchItems[2])}
          addedItemId={addedItemId}
          quantities={quantities}
          currentImages={currentImages}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={updateQuantity}
          onNavigateImage={navigateImage}
          onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
          isLoading={isLoading}
        />
      )}

      {/* Fourth Item */}
      {merchItems.length > 3 && (
        <ProductSection
          product={transformMerchToProduct(merchItems[3])}
          addedItemId={addedItemId}
          quantities={quantities}
          currentImages={currentImages}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={updateQuantity}
          onNavigateImage={navigateImage}
          onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
          reverse={true}
          backgroundColor="bg-muted/20"
          isLoading={isLoading}
        />
      )}

      {/* Additional Items */}
      {merchItems.slice(4).map((item, index) => (
        <ProductSection
          key={item.id}
          product={transformMerchToProduct(item)}
          addedItemId={addedItemId}
          quantities={quantities}
          currentImages={currentImages}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={updateQuantity}
          onNavigateImage={navigateImage}
          onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
          reverse={index % 2 === 1}
          backgroundColor={index % 2 === 1 ? "bg-muted/20" : undefined}
          isLoading={isLoading}
        />
      ))}

      {/* 3D Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <Reveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Explore Our <span className="italic font-light">Universe</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Immerse yourself in the dekord aesthetic through our curated collection of moments and creations.
              </p>
            </div>
          </Reveal>

          <InfiniteGallery
            images={[
              "/feat-1.webp",
              "/feat-2.webp",
              "/feat-3.webp",
              "/feat-4.webp",
              "/duo-1.webp",
              "/duo-3.webp",
              "/her-1.webp",
              "/her-2.webp",
            ]}
            className="h-[70vh] w-full rounded-xl overflow-hidden"
            fadeSettings={{
              fadeIn: { start: 0.05, end: 0.25 },
              fadeOut: { start: 0.26, end: 0.3 },
            }}
            blurSettings={{
              blurIn: { start: 0.0, end: 0.1 },
              blurOut: { start: 0.4, end: 0.43 },
              maxBlur: 8.0,
            }}
          />
        </div>
      </section>

      {/* Creativity Showcase */}
      <CreativityShowcase />

    </main>
  )
}
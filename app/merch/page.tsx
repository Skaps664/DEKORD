"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"
import InfiniteGallery from "@/components/infinite-gallery"
import { ProductSection } from "@/components/ProductSection"
import { motion } from "framer-motion"
import CreativityShowcase from "@/components/creativity-showcase"

const merchItems = [
  {
    id: "tote-bag",
    name: "Dekord Canvas Tote",
    category: "Bags",
    price: "Rs. 1,200",
    images: ["/merch-tote.webp", "/merch-tote-2.webp", "/merch-tote-3.webp"],
    description: "Premium canvas tote with dekord logo embroidery. Perfect for carrying your essentials in style.",
    rating: 4.8,
    reviews: 24,
    badge: "Bestseller",
    features: ["Premium Canvas", "Logo Embroidery", "Reinforced Handles", "Spacious Interior"],
  },
  {
    id: "copper-mug",
    name: "Copper Accent Mug",
    category: "Mugs",
    price: "Rs. 850",
    images: ["/merch-mug.webp", "/merch-mug-2.webp", "/merch-mug-3.webp"],
    description: "Elegant ceramic mug with copper accents. Keeps your drinks hot or cold for hours.",
    rating: 4.9,
    reviews: 18,
    badge: "New Arrival",
    features: ["Ceramic Body", "Copper Accents", "Thermal Retention", "Dishwasher Safe"],
  },
  {
    id: "sticker-pack",
    name: "Vinyl Sticker Pack",
    category: "Stickers",
    price: "Rs. 350",
    images: ["/merch-stickers.webp", "/merch-stickers-2.webp", "/merch-stickers-3.webp"],
    description: "Collection of 8 vinyl stickers featuring dekord designs. Waterproof and durable.",
    rating: 4.6,
    reviews: 31,
    badge: "Popular",
    features: ["8 Unique Designs", "Waterproof Vinyl", "Easy Application", "Long-lasting"],
  },
  {
    id: "tshirt",
    name: "Dekord Essential Tee",
    category: "Apparel",
    price: "Rs. 1,500",
    images: ["/merch-tshirt.webp", "/merch-tshirt-2.webp", "/merch-tshirt-3.webp"],
    description: "Comfortable cotton t-shirt with minimalist dekord logo. Premium quality and fit.",
    rating: 4.7,
    reviews: 15,
    badge: "Limited Edition",
    features: ["100% Cotton", "Premium Fit", "Screen Printed", "Pre-shrunk"],
  },
]

export default function MerchPage() {
  const [addedItemId, setAddedItemId] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [currentImages, setCurrentImages] = useState<Record<string, number>>({})

  const handleAddToCart = (itemId: string) => {
    setAddedItemId(itemId)
    setTimeout(() => setAddedItemId(null), 2000)
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

    const currentIndex = getCurrentImageIndex(itemId)
    const totalImages = item.images.length

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

      {/* Featured Product - Tote Bag */}
      <ProductSection
        product={merchItems[0]}
        addedItemId={addedItemId}
        quantities={quantities}
        currentImages={currentImages}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={updateQuantity}
        onNavigateImage={navigateImage}
        onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
      />

      {/* Mug Section */}
      <ProductSection
        product={merchItems[1]}
        addedItemId={addedItemId}
        quantities={quantities}
        currentImages={currentImages}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={updateQuantity}
        onNavigateImage={navigateImage}
        onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
        reverse={true}
        backgroundColor="bg-muted/20"
      />

      {/* Creativity Showcase */}
      <CreativityShowcase   />

      {/* Sticker Pack Section */}
      <ProductSection
        product={merchItems[2]}
        addedItemId={addedItemId}
        quantities={quantities}
        currentImages={currentImages}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={updateQuantity}
        onNavigateImage={navigateImage}
        onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
      />

      {/* T-Shirt Section */}
      <ProductSection
        product={merchItems[3]}
        addedItemId={addedItemId}
        quantities={quantities}
        currentImages={currentImages}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={updateQuantity}
        onNavigateImage={navigateImage}
        onSetCurrentImage={(itemId, index) => setCurrentImages(prev => ({ ...prev, [itemId]: index }))}
        reverse={true}
        backgroundColor="bg-muted/20"
      />

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
    </main>
  )
}
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

const featuredProducts = [
    {
    id: "8",
    name: "basic-60 | Purr White",
    price: "Rs. 650",
    image: "/basic-60-1.webp",
    badge: "New" as const,
    statusBadge: "In Stock",
    materials: ["65 Watt PD 3.0", "Type C to C"],
    swatches: [
      { name: "Sage Green", color: "#9CAF88" },
      { name: "Forest Green", color: "#355E3B" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: [
      "/sage-copper-lounge-chair.png",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    dimensions: "W: 85cm × D: 90cm × H: 75cm",
    link: "product/basic-w-60",
  },
  {
    id: "4",
    name: "weev w-60 | Green Petals",
    price: "Rs. 1000",
    image: "/green-petals-new.webp",
    badge: "New" as const,
    statusBadge: "Limited Stock",
    materials: ["Hand Woven", "65 Watt PD 3.0", "Type C to C"],
    swatches: [
      { name: "Forest Green", color: "#355E3B" },
      { name: "Sage Green", color: "#9CAF88" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: [
      "/green-petals-new.webp",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    dimensions: "W: 180cm × D: 90cm × H: 75cm",
    link: "product/weev-w-60-green-petals",
  },
  {
    id: "7",
    name: "dek w-60 | Lava Red",
    price: "Rs. 900",
    image: "/dek-red.webp",
    badge: "New" as const,
    statusBadge: "Launching Soon",
    materials: ["Copper Frame", "Terracotta Velvet"],
    swatches: [
      { name: "Terracotta", color: "#E2725B" },
      { name: "Burnt Orange", color: "#CC5500" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: [
      "/terracotta-cloud-chair.png",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    dimensions: "W: 95cm × D: 85cm × H: 80cm",
    link: "product/dek-w-60-lava-red",
  },

]

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-32" id="featured-products">
      <div className="container-custom px-2 sm:px-2 md:px-3">
         {/* <Reveal>
          <div className="text-left mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl text-neutral-900 mb-4 lg:text-6xl">
              Featured <span className="italic font-light">Collection</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl">
              Discover our most beloved pieces, each crafted with meticulous attention to detail.
            </p>
          </div>
        </Reveal> */}

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="block md:hidden">
          <div
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide pl-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style dangerouslySetInnerHTML={{
              __html: `
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `
            }} />
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[70vw] sm:w-72"
              >
                <ProductCard product={product} onQuickLook={handleQuickLook} priority={index < 2} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <motion.div
          className="hidden md:grid md:grid-cols-3 gap-4 sm:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} priority={true} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "../reveal"
import { cn } from "@/lib/utils"
import { ArrowRight, Zap } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: "1",
    name: "w-60 | Lava Red",
    tagline: "Powerful. Vibrant. Unstoppable.",
    description: "60W fast charging with premium braided design. Perfect for iPhone, iPad, and more.",
    image: "/dek-red.webp",
    specs: ["60W Power Delivery", "1.2m Length", "Braided Nylon"],
    price: "Rs. 899",
    originalPrice: "Rs. 1,299",
    slug: "dek-w-60-lava-red"
  },
  {
    id: "2",
    name: "w-60 | Ocean Blue",
    tagline: "Cool. Calm. Powerful.",
    description: "Match your style with vibrant blue while enjoying rapid 60W charging speeds.",
    image: "/dek-blue.webp",
    specs: ["60W Power Delivery", "1.2m Length", "Braided Nylon"],
    price: "Rs. 899",
    originalPrice: "Rs. 1,299",
    slug: "dek-w-60-ocean-blue"
  },
  {
    id: "3",
    name: "w-100 | Midnight Black",
    tagline: "Maximum Power. Timeless Style.",
    description: "100W power for MacBooks and laptops. Maximum performance in classic black.",
    image: "/dek-black.webp",
    specs: ["100W Power Delivery", "2m Length", "Premium Build"],
    price: "Rs. 1,259",
    originalPrice: "Rs. 1,799",
    slug: "dek-w-100-midnight-black"
  },
  {
    id: "4",
    name: "w-100 | Arctic White",
    tagline: "Pure. Powerful. Perfect.",
    description: "100W charging power in pristine white. Charge MacBooks, iPads, and more.",
    image: "/dek-white.webp",
    specs: ["100W Power Delivery", "2m Length", "Premium Build"],
    price: "Rs. 1,259",
    originalPrice: "Rs. 1,799",
    slug: "dek-w-100-arctic-white"
  }
]

export function PreLaunchProducts() {
  return (
    <section id="products" className="py-8 sm:py-14 lg:py-18">
      <div className="container-custom px-2 sm:px-2 md:px-3">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="text-neutral-900 text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-wide">
              PRE-LAUNCH <span className="italic font-light">Collection</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
              Click any product to pre-order with 30% discount automatically applied at checkout.
            </p>
            <div className="mt-4">
              <span className="inline-block px-4 py-2 bg-green-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                🇵🇰 Made in Pakistan • Free Shipping
              </span>
            </div>
          </div>
        </Reveal>

        {/* Mobile: Horizontal scroll */}
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
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[70vw] sm:w-72"
              >
                <ProductCardPreLaunch product={product} priority={index < 2} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {products.map((product, index) => (
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
                <ProductCardPreLaunch product={product} priority={true} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProductCardPreLaunch({ product, priority = false }: {
  product: typeof products[0]
  priority?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div
        className="group relative bg-white overflow-hidden cursor-pointer flex flex-col h-full"
        style={{
          borderRadius: "24px",
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px",
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-500 text-white shadow-md">
            -30%
          </span>
        </div>

        {/* Product Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 70vw, (max-width: 1200px) 50vw, 25vw"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          {/* Name */}
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-1">
            {product.name}
          </h3>
          
          {/* Tagline */}
          <p className="text-xs sm:text-sm text-neutral-500 mb-3 italic">
            {product.tagline}
          </p>

          {/* Specs - Mobile: 2 key specs, Desktop: All */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-full font-medium">
              {product.specs[0]}
            </span>
            <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-full font-medium">
              {product.specs[1]}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg sm:text-xl font-bold text-neutral-900">
              {product.price}
            </span>
            <span className="text-sm text-neutral-400 line-through">
              {product.originalPrice}
            </span>
          </div>

          {/* Button */}
          <motion.button
            className="w-full py-2.5 sm:py-3 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors text-sm sm:text-base mt-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Pre-Order Now
          </motion.button>
        </div>
      </motion.div>
    </Link>
  )
}

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Reveal } from "../reveal"
import { cn } from "@/lib/utils"

const products = [
  {
    id: "1",
    name: "w-60 | Lava Red",
    tagline: "Powerful. Vibrant. Unstoppable.",
    image: "/feat-1.webp",
    materials: ["60W Power", "1.2m"],
    price: "Rs. 899",
    originalPrice: "Rs. 1,299",
  },
  {
    id: "2",
    name: "w-60 | Ocean Blue",
    tagline: "Cool. Calm. Powerful.",
    image: "/feat-2.webp",
    materials: ["60W Power", "1.2m"],
    price: "Rs. 899",
    originalPrice: "Rs. 1,299",
  },
  {
    id: "3",
    name: "w-100 | Midnight Black",
    tagline: "Maximum Power. Timeless Style.",
    image: "/feat-3.webp",
    materials: ["100W Power", "2m"],
    price: "Rs. 1,259",
    originalPrice: "Rs. 1,799",
  },
  {
    id: "4",
    name: "w-100 | Arctic White",
    tagline: "Pure. Powerful. Perfect.",
    image: "/feat-4.webp",
    materials: ["100W Power", "2m"],
    price: "Rs. 1,259",
    originalPrice: "Rs. 1,799",
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
              Four stunning options to match your style. Save 30% by joining our pre-launch.
            </p>
            <div className="mt-4">
              <span className="inline-block px-4 py-2 bg-green-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                🇵🇰 Made in Pakistan
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
  return (
    <motion.div
      className="group relative bg-white overflow-hidden"
      style={{
        borderRadius: "24px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
      }}
      layout
    >
      {/* Badge */}
      {/* {product.badge && (
        <div className="absolute top-4 left-4 z-20">
          <span
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm",
              product.badge === "New" && "bg-green-500/90 text-white",
              product.badge === "Back in stock" && "bg-blue-500/90 text-white",
              product.badge === "Limited" && "bg-amber-500/90 text-white",
            )}
          >
            {product.badge}
          </span>
        </div>
      )} */}

      {/* Discount Badge */}
      <div className="absolute top-4 right-4 z-20">
        <span className="px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm bg-red-500/90 text-white">
          Save 30%
        </span>
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "25/36" }}>
        <div className="relative w-full h-full">
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
            />
          </motion.div>
        </div>
      </div>

      {/* Product Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            maskImage: "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            maskImage: "linear-gradient(to top, black 0%, black 40%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 40%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-lg"
          style={{
            maskImage: "linear-gradient(to top, black 0%, black 20%, transparent 60%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, black 20%, transparent 60%)",
          }}
        />
        <div className="relative z-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1 drop-shadow-sm">{product.name}</h3>
            <p className="text-sm text-white/90 mb-2 drop-shadow-sm">{product.materials.join(", ")}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white drop-shadow-sm">{product.price}</span>
              <span className="text-sm text-white/70 line-through drop-shadow-sm">{product.originalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

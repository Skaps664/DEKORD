"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const collections = [
  {
    id: "dek-series",
    name: "DEK SERIES",
    description: "Premium braided cables with superior durability and 100W fast charging",
    image: "/modern-armchair-pillows.png",
    products: 12,
    tag: "Premium",
    color: "from-neutral-900 to-neutral-700"
  },
  {
    id: "weev-series",
    name: "WEEV SERIES",
    description: "Hand-crafted cables with unique weave patterns and lifetime warranty",
    image: "/modular-cushion-bench.png",
    products: 8,
    tag: "Hand Crafted",
    color: "from-amber-900 to-amber-700"
  },
  {
    id: "type-c",
    name: "USB-C CABLES",
    description: "60-100W Power Delivery for laptops, tablets, and phones",
    image: "/distressed-artistic-chair.png",
    products: 15,
    tag: "Fast Charging",
    color: "from-blue-900 to-blue-700"
  },
  {
    id: "lightning",
    name: "LIGHTNING",
    description: "MFi certified cables for iPhone and iPad with tangle-free design",
    image: "/green-modular-loveseat.png",
    products: 10,
    tag: "Apple Certified",
    color: "from-green-900 to-green-700"
  },
  {
    id: "braided",
    name: "BRAIDED COLLECTION",
    description: "Extra durable nylon braiding withstands 25,000+ bends",
    image: "/braided-rope-loveseat.png",
    products: 18,
    tag: "Durable",
    color: "from-purple-900 to-purple-700"
  },
  {
    id: "multi-cable",
    name: "MULTI CABLE",
    description: "3-in-1 cables with USB-C, Lightning, and Micro USB connectors",
    image: "/minimalist-boucle-loveseat.png",
    products: 6,
    tag: "Versatile",
    color: "from-red-900 to-red-700"
  },
]

export default function CollectionsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 rounded-full bg-foreground/5 backdrop-blur-sm"
            >
              <p className="text-sm font-medium text-foreground">Explore Our Collections</p>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Engineered for
              <br />
              <span className="bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
                Every Need
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From premium DEK series to versatile multi-cables, discover the perfect charging solution for your lifestyle
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredId(collection.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Link href={`/collections/${collection.id}`}>
                  <div className="group relative h-[500px] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                    {/* Image */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        scale: hoveredId === collection.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                    >
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </motion.div>

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      {/* Tag */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="mb-4"
                      >
                        <span className={cn(
                          "inline-block px-4 py-1.5 rounded-full text-xs font-medium text-white backdrop-blur-sm",
                          `bg-gradient-to-r ${collection.color}`
                        )}>
                          {collection.tag}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                        {collection.name}
                      </h2>

                      {/* Description */}
                      <p className="text-white/80 text-sm mb-4 line-clamp-2">
                        {collection.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">
                          {collection.products} Products
                        </span>
                        
                        <motion.div
                          className="flex items-center gap-2 text-white group-hover:gap-3 transition-all"
                          animate={{
                            x: hoveredId === collection.id ? 10 : 0,
                          }}
                        >
                          <span className="text-sm font-medium">Explore</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200 p-12 md:p-20 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white dark:text-neutral-900 mb-6">
              Can't find what you need?
            </h2>
            <p className="text-white/80 dark:text-neutral-700 text-lg mb-8 max-w-2xl mx-auto">
              Browse our full catalog or contact us for custom cable solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-full font-medium hover:shadow-lg transition-shadow"
                >
                  View Full Catalog
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white dark:border-neutral-900 text-white dark:text-neutral-900 rounded-full font-medium hover:bg-white/10 dark:hover:bg-neutral-900/10 transition-colors"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

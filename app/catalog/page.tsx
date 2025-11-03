"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Filter, Grid3x3, List, Search, ShoppingBag, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "DEK Pro USB-C Cable",
    price: 29.99,
    image: "/modern-armchair-pillows.png",
    rating: 4.9,
    reviews: 234,
    tag: "Bestseller",
    colors: ["Black", "White", "Gray"],
    category: "USB-C"
  },
  {
    id: 2,
    name: "WEEV Lightning Cable",
    price: 24.99,
    image: "/modular-cushion-bench.png",
    rating: 4.8,
    reviews: 189,
    tag: "Premium",
    colors: ["Black", "Navy"],
    category: "Lightning"
  },
  {
    id: 3,
    name: "Braided Multi Cable 3-in-1",
    price: 34.99,
    image: "/distressed-artistic-chair.png",
    rating: 4.7,
    reviews: 156,
    tag: "Versatile",
    colors: ["Black", "Red", "Blue"],
    category: "Multi"
  },
  {
    id: 4,
    name: "Fast Charge USB-C 100W",
    price: 39.99,
    image: "/green-modular-loveseat.png",
    rating: 5.0,
    reviews: 312,
    tag: "New",
    colors: ["Black", "Green"],
    category: "USB-C"
  },
  {
    id: 5,
    name: "Compact Lightning Cable",
    price: 19.99,
    image: "/braided-rope-loveseat.png",
    rating: 4.6,
    reviews: 98,
    tag: null,
    colors: ["Black", "White"],
    category: "Lightning"
  },
  {
    id: 6,
    name: "DEK Essential USB-C",
    price: 22.99,
    image: "/colorful-patchwork-sofa.png",
    rating: 4.8,
    reviews: 201,
    tag: null,
    colors: ["Black", "Gray", "White"],
    category: "USB-C"
  },
  {
    id: 7,
    name: "Premium Braided Bundle",
    price: 49.99,
    image: "/minimalist-boucle-loveseat.png",
    rating: 4.9,
    reviews: 267,
    tag: "Bundle",
    colors: ["Black"],
    category: "Bundle"
  },
  {
    id: 8,
    name: "Magnetic Charging Cable",
    price: 32.99,
    image: "/abstract-artistic-sofa.png",
    rating: 4.7,
    reviews: 134,
    tag: "Innovation",
    colors: ["Black", "Silver"],
    category: "Magnetic"
  },
]

const categories = ["All", "USB-C", "Lightning", "Multi", "Bundle", "Magnetic"]
const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Rating"]

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Popular")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
              Full Catalog
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our complete collection of premium charging cables and accessories
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="sticky py-4 top-16 md:top-18 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-custom py-8 md:py-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    selectedCategory === category
                      ? "bg-foreground text-background"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  )}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex gap-3 items-center flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-foreground/20 outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="flex gap-1 border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewMode === "grid" ? "bg-foreground text-background" : "text-muted-foreground"
                  )}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded transition-colors",
                    viewMode === "list" ? "bg-foreground text-background" : "text-muted-foreground"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "flex flex-col gap-4"
              )}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {viewMode === "grid" ? (
                    <Link href={`/product`}>
                      <div className="group relative bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Image */}
                        <div className="relative aspect-square bg-muted overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {product.tag && (
                            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-foreground text-background text-xs font-medium">
                              {product.tag}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-medium text-foreground mb-2 line-clamp-1">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center gap-1 mb-3">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-foreground">
                              ${product.price}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-full bg-foreground text-background hover:shadow-md transition-shadow"
                            >
                              <ShoppingBag className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link href={`/product`}>
                      <div className="group flex gap-6 bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-shadow">
                        <div className="relative w-32 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-medium text-lg text-foreground">
                                {product.name}
                              </h3>
                              {product.tag && (
                                <span className="px-3 py-1 rounded-full bg-foreground text-background text-xs font-medium">
                                  {product.tag}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="text-sm font-medium">{product.rating}</span>
                              <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                            </div>

                            <div className="flex gap-2 mb-3">
                              {product.colors.map((color) => (
                                <span key={color} className="text-xs text-muted-foreground">
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-foreground">
                              ${product.price}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-2 rounded-full bg-foreground text-background font-medium hover:shadow-md transition-shadow"
                            >
                              Add to Cart
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">No products found</p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}

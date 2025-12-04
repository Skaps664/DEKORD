"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Filter, Grid3x3, List, Search, ShoppingBag, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { RatingDisplay } from "@/components/rating-display"
import type { Collection, Product } from "@/lib/types/database"

const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Rating"]

interface CollectionPageClientProps {
  collection: Collection
  products: Product[]
}

export function CollectionPageClient({ collection, products: initialProducts }: CollectionPageClientProps) {
  const { addItem, isLoading } = useCart()
  const [products] = useState<Product[]>(initialProducts)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("Popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [addedProductId, setAddedProductId] = useState<string | null>(null)

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price
      await addItem({
        productId: product.id,
        productName: product.name,
        productImage: product.main_image,
        variantId: undefined,
        variantDetails: product.category,
        length: "1m",
        color: undefined,
        price: price,
        quantity: 1,
      })

      setAddedProductId(product.id)
      setTimeout(() => setAddedProductId(null), 2000)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    return matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return parseFloat(a.price.toString()) - parseFloat(b.price.toString())
      case "Price: High to Low":
        return parseFloat(b.price.toString()) - parseFloat(a.price.toString())
      default:
        return 0
    }
  })

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
      {/* Hero Section with Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Banner Background */}
        {collection.banner_image ? (
          <div className="absolute inset-0">
            <Image
              src={collection.banner_image}
              alt={collection.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900" />
        )}

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Back Button */}
            <Link href="/collections">
              <motion.button
                whileHover={{ x: -5 }}
                className={cn(
                  "flex items-center gap-2 mb-8 transition-colors",
                  collection.banner_image 
                    ? "text-white/80 hover:text-white" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Collections</span>
              </motion.button>
            </Link>

            {/* Collection Badge */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 rounded-full bg-foreground/10 backdrop-blur-sm"
            >
              <p className={cn(
                "text-sm font-medium",
                collection.banner_image ? "text-white" : "text-foreground"
              )}>
                Collection
              </p>
            </motion.div>
            
            {/* Title */}
            <h1 className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6",
              collection.banner_image ? "text-white" : "text-foreground"
            )}>
              {collection.name}
            </h1>
            
            {/* Description */}
            <p className={cn(
              "text-lg max-w-2xl",
              collection.banner_image ? "text-white/90" : "text-muted-foreground"
            )}>
              {collection.description}
            </p>

            {/* Product Count */}
            <div className="mt-8">
              <span className={cn(
                "text-sm font-medium",
                collection.banner_image ? "text-white/80" : "text-muted-foreground"
              )}>
                {products.length} {products.length === 1 ? 'Product' : 'Products'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* View Mode & Sort */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 p-1 rounded-lg border border-border bg-background">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "grid" ? "bg-foreground/10" : "hover:bg-foreground/5"
                  )}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "list" ? "bg-foreground/10" : "hover:bg-foreground/5"
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found matching your search.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4">
                      {product.main_image && (
                        <Image
                          src={product.main_image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      
                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={isLoading}
                        className={cn(
                          "absolute bottom-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all",
                          "opacity-0 group-hover:opacity-100",
                          addedProductId === product.id
                            ? "bg-green-500 text-white"
                            : "bg-white/90 hover:bg-white text-neutral-900"
                        )}
                      >
                        {addedProductId === product.id ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <ShoppingBag className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold">
                        Rs. {typeof product.price === 'string' ? parseFloat(product.price).toLocaleString() : product.price.toLocaleString()}
                      </p>
                      {product.average_rating && (
                        <RatingDisplay rating={product.average_rating} size="sm" />
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Link href={`/product/${product.slug}`}>
                    <div className="flex gap-6 p-4 rounded-xl border border-border hover:border-foreground/20 transition-colors">
                      {/* Image */}
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
                        {product.main_image && (
                          <Image
                            src={product.main_image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <p className="text-2xl font-bold">
                            Rs. {typeof product.price === 'string' ? parseFloat(product.price).toLocaleString() : product.price.toLocaleString()}
                          </p>
                          {product.average_rating && (
                            <RatingDisplay rating={product.average_rating} />
                          )}
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        disabled={isLoading}
                        className={cn(
                          "self-center px-6 py-3 rounded-full transition-all font-medium",
                          addedProductId === product.id
                            ? "bg-green-500 text-white"
                            : "bg-foreground text-background hover:bg-foreground/90"
                        )}
                      >
                        {addedProductId === product.id ? "Added!" : "Add to Cart"}
                      </button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

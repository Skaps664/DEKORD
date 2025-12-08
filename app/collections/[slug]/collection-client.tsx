"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Filter, Grid3x3, List, Search, ShoppingBag, Check, Bell, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { RatingDisplay } from "@/components/rating-display"
import type { Collection, Product } from "@/lib/types/database"

// Coming Soon Section Component
function ComingSoonSection({ collectionName }: { collectionName: string }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          source: `collection_${collectionName.toLowerCase().replace(/\s+/g, "_")}` 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("🎉 You're on the list! We'll notify you when products drop.")
        setEmail("")
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 3000)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Failed to subscribe. Please try again.")
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 3000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center py-20"
    >
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-2xl" />
        <Sparkles className="relative w-16 h-16 text-primary mx-auto" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {collectionName} Coming Soon
      </h2>
      
      <p className="text-lg text-muted-foreground mb-8">
        We're working on something extraordinary. Be the first to know when we launch this collection.
      </p>

      <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === "loading" || status === "success"}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />
          </div>
          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-6 py-3 rounded-xl font-semibold transition-colors",
              status === "success"
                ? "bg-green-500 text-white"
                : "bg-foreground text-background hover:bg-foreground/90",
              "disabled:opacity-50"
            )}
          >
            {status === "loading" ? "..." : status === "success" ? "✓" : "Notify Me"}
          </motion.button>
        </div>
        
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mt-4 text-sm",
              status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {message}
          </motion.p>
        )}
      </form>

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4">While you wait, check out our other collections:</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link 
            href="/collections" 
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
          >
            Browse All Collections
          </Link>
          <Link 
            href="/catalog" 
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
          >
            View All Products
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

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
            <ComingSoonSection collectionName={collection.name} />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/product/${product.slug}`}>
                    <div className="group relative bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Image */}
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        <Image
                          src={product.main_image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-medium text-foreground mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        
                        <div className="mb-3">
                          <RatingDisplay 
                            rating={product.average_rating || 0}
                            reviewCount={product.review_count || 0}
                            size="sm"
                            showCount={true}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-foreground">
                            Rs. {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={isLoading}
                            className="p-2 rounded-full bg-foreground text-background hover:shadow-md transition-shadow disabled:opacity-50"
                          >
                            {addedProductId === product.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <ShoppingBag className="w-4 h-4" />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/product/${product.slug}`}>
                    <div className="group flex gap-6 bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-shadow">
                      <div className="relative w-32 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={product.main_image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-lg mb-2 text-foreground">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                            {product.description || "Premium quality product from dekord"}
                          </p>
                          <div className="mb-3">
                            <RatingDisplay 
                              rating={product.average_rating || 0}
                              reviewCount={product.review_count || 0}
                              size="sm"
                              showCount={true}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-foreground">
                            Rs. {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={isLoading}
                            className={cn(
                              "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2",
                              addedProductId === product.id
                                ? "bg-green-500 text-white"
                                : "bg-foreground text-background hover:bg-foreground/90"
                            )}
                          >
                            {addedProductId === product.id ? (
                              <>
                                <Check className="w-4 h-4" /> Added
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-4 h-4" /> Add to Cart
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
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

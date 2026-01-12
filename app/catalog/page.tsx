"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Filter, Grid3x3, List, Search, ShoppingBag, Star, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { getAllProducts } from "@/lib/services/products"
import type { Product } from "@/lib/types/database"
import { RatingDisplay } from "@/components/rating-display"

const categories = ["All", "USB-C", "Lightning", "Multi", "Bundle", "Magnetic"]
const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Rating"]

function CatalogContent() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [addedProductId, setAddedProductId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const { addItem, isLoading } = useCart()

  // Load search query from URL on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    if (urlSearch) {
      setSearchQuery(urlSearch)
    }
  }, [searchParams])

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const { data, error } = await getAllProducts()
      if (data && !error) {
        setProducts(data)
      } else {
        console.error("Failed to fetch products:", error)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation to product page
    e.stopPropagation()
    
    try {
      await addItem({
        productId: product.id, // This is already a UUID from the database
        productName: product.name,
        productImage: product.main_image,
        variantId: undefined, // Use undefined instead of null
        variantDetails: "Default", // Default variant
        color: undefined,
        length: "1m", // Default length
        price: parseFloat(product.price.toString()),
        quantity: 1,
      })
      
      // Show success feedback
      setAddedProductId(product.id)
      setTimeout(() => setAddedProductId(null), 2000)
    } catch (error) {
      console.error("❌ Failed to add to cart:", error)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    return matchesCategory && matchesSearch
  })

  // Sort products
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

  if (loading) {
    return (
      <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
        <div className="container-custom py-20">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        {/* Background image (fills the section) */}
        <div className="absolute inset-0 ">
          <Image
            src="/test-3.jpg"
            alt="Catalog hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/70 mb-4">
              Full Catalog
            </h1>
            <p className="text-lg text-white mb-8">
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
<section className="py-4 top-16 md:top-18 z-30 bg-background/95 backdrop-blur-md border-b border-border">
  <div className="container-custom py-4 md:py-8 md:py-10">
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Categories Row */}
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
              selectedCategory === category
                ? "bg-foreground text-background"
                : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* View Controls Row - Only on Desktop inline, Mobile gets its own row */}
      <div className="flex gap-3 items-center justify-end md:absolute md:top-8 md:right-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-foreground/20 outline-none w-full md:w-auto"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {viewMode === "grid" ? (
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
                              rating={product.rating}
                              reviewCount={product.review_count || 0}
                              size="sm"
                              showCount={true}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-foreground">
                              Rs. {parseFloat(product.price.toString()).toFixed(2)}
                            </span>
                            {product.stock === 0 ? (
                              <div className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-50 rounded-full">
                                Sold Out
                              </div>
                            ) : product.stock === 99999 ? (
                              <div className="px-3 py-1 text-xs font-semibold text-purple-600 bg-purple-50 rounded-full">
                                Pre-Order
                              </div>
                            ) : (
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
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
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
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-medium text-lg text-foreground">
                                {product.name}
                              </h3>
                            </div>
                            
                            <div className="mb-2">
                              <RatingDisplay 
                                rating={product.rating}
                                reviewCount={product.review_count || 0}
                                size="sm"
                                showCount={true}
                              />
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {product.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-foreground">
                              Rs. {parseFloat(product.price.toString()).toFixed(2)}
                            </span>
                            {product.stock === 0 ? (
                              <div className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-full">
                                Sold Out
                              </div>
                            ) : product.stock === 99999 ? (
                              <div className="px-4 py-2 text-sm font-semibold text-purple-600 bg-purple-50 rounded-full">
                                Pre-Order
                              </div>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => handleAddToCart(product, e)}
                                disabled={isLoading}
                                className="px-6 py-2 rounded-full bg-foreground text-background font-medium hover:shadow-md transition-shadow disabled:opacity-50"
                              >
                                {addedProductId === product.id ? (
                                  <>
                                    <Check className="w-4 h-4 inline mr-2" />
                                    Added!
                                  </>
                                ) : (
                                  "Add to Cart"
                                )}
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {sortedProducts.length === 0 && (
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

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  )
}

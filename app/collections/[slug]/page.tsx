"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Filter, Grid3x3, List, Search, ShoppingBag, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import { getCollectionBySlug } from "@/lib/services/collections"
import { RatingDisplay } from "@/components/rating-display"
import type { Collection, Product } from "@/lib/types/database"

const sortOptions = ["Popular", "Price: Low to High", "Price: High to Low", "Rating"]

export default function CollectionPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { addItem, isLoading } = useCart()

  const [collection, setCollection] = useState<Collection | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("Popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [addedProductId, setAddedProductId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCollection() {
      try {
        const { data, error } = await getCollectionBySlug(slug)
        if (error) {
          console.error("Error fetching collection:", error)
          router.push("/collections")
        } else if (data) {
          setCollection(data)
          setProducts(data.products || [])
        }
      } catch (err) {
        console.error("Failed to fetch collection:", err)
        router.push("/collections")
      } finally {
        setLoading(false)
      }
    }

    fetchCollection()
  }, [slug, router])

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

  if (loading) {
    return (
      <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
        <div className="container-custom py-20">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-neutral-600 mx-auto mb-4" />
            <p className="text-muted-foreground">Loading collection...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!collection) {
    return (
      <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
        <div className="container-custom py-20">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Collection not found</p>
            <Link href="/collections" className="text-primary hover:underline">
              Back to Collections
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // SEO: Dynamic meta tags and JSON-LD schema (after collection is loaded)
  const metaTitle = collection.meta_title || collection.name || "dekord Collections – Premium Charging Cables"
  const metaDescription = collection.meta_description || collection.description || "Explore dekord cable collections, engineered for specific needs."
  const metaImage = collection.banner_image || "/dekord-logo-new.png"
  const canonicalUrl = `https://dekord.online/collections/${collection.slug}`

  // JSON-LD Collection schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection.name,
    "image": [metaImage],
    "description": metaDescription,
    "mainEntityOfPage": canonicalUrl
  }

  return (
    <>
      <head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      </head>
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
              className={cn(
                "inline-block mb-4 px-4 py-2 rounded-full backdrop-blur-sm",
                collection.banner_image
                  ? "bg-white/10 text-white"
                  : "bg-foreground/5 text-foreground"
              )}
            >
              <p className="text-sm font-medium">Collection</p>
            </motion.div>

            {/* Collection Title */}
            <h1 className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6",
              collection.banner_image ? "text-white" : "text-foreground"
            )}>
              {collection.name}
            </h1>

            {/* Collection Description */}
            <p className={cn(
              "text-lg mb-8",
              collection.banner_image ? "text-white/90" : "text-muted-foreground"
            )}>
              {collection.description}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5",
                collection.banner_image ? "text-neutral-400" : "text-muted-foreground"
              )} />
              <input
                type="text"
                placeholder="Search products in this collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-foreground/20 transition-all outline-none",
                  collection.banner_image
                    ? "bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                    : "bg-background border-border focus:border-foreground"
                )}
              />
            </div>

            {/* Product Count */}
            <div className={cn(
              "flex items-center gap-4 text-sm mt-6",
              collection.banner_image ? "text-white/80" : "text-muted-foreground"
            )}>
              <span>{products.length} Products</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="sticky py-4 top-16 md:top-18 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-custom py-8 md:py-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            {/* Info */}
            <div className="text-sm text-muted-foreground">
              Showing {sortedProducts.length} of {products.length} products
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
          {sortedProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">
                {searchQuery ? "No products match your search" : "No products in this collection yet"}
              </p>
            </motion.div>
          ) : (
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
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </main>
    </>
  )
}

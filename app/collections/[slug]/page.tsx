"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Loader2, ShoppingCart, Check } from "lucide-react"
import { getCollectionBySlug } from "@/lib/services/collections"
import { useCart } from "@/contexts/cart-context"
import type { Collection, Product } from "@/lib/types/database"
import { cn } from "@/lib/utils"

export default function CollectionPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const { addItem } = useCart()

  const [collection, setCollection] = useState<Collection | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({})

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

  const handleAddToCart = async (product: Product) => {
    try {
      const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price
      await addItem({
        productId: product.id,
        productName: product.name,
        productImage: product.main_image,
        variantId: undefined,
        variantDetails: product.category,
        length: "1m",
        color: "Black",
        price: price,
        quantity: 1,
      })

      setAddedToCart(prev => ({ ...prev, [product.id]: true }))
      setTimeout(() => {
        setAddedToCart(prev => ({ ...prev, [product.id]: false }))
      }, 2000)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background grain-texture flex items-center justify-center pt-16">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-600" />
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-background grain-texture flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Collection not found</p>
          <Link href="/collections" className="text-primary hover:underline">
            Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link href="/collections">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Collections</span>
              </motion.button>
            </Link>

            {/* Collection Info */}
            <div className="max-w-3xl">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-4 px-4 py-2 rounded-full bg-foreground/5 backdrop-blur-sm"
              >
                <p className="text-sm font-medium text-foreground">Collection</p>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                {collection.name}
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                {collection.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{products.length} Products</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products in this collection yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-shadow">
                    {/* Product Image */}
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                        <Image
                          src={product.main_image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-4">
                      <Link href={`/product/${product.slug}`}>
                        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-lg font-bold text-foreground">
                          Rs. {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                        </p>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className={cn(
                            "p-2 rounded-full transition-colors",
                            addedToCart[product.id]
                              ? "bg-green-500 text-white"
                              : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                          )}
                        >
                          {addedToCart[product.id] ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <ShoppingCart className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

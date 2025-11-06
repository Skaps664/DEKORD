"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { RatingDisplay } from "@/components/rating-display"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/lib/types/database"

interface ProductHeroProps {
  product?: Product
}

export function ProductHero({ product }: ProductHeroProps = {}) {
  const router = useRouter()
  const { addItem } = useCart()

  const handleBuyNow = async () => {
    if (!product) return
    
    try {
      await addItem({
        productId: product.id,
        productName: product.name,
        productImage: product.main_image,
        price: product.price,
        quantity: 1,
      })
      
      // Redirect to cart
      router.push('/cart')
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    try {
      await addItem({
        productId: product.id,
        productName: product.name,
        productImage: product.main_image,
        price: product.price,
        quantity: 1,
      })
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  const scrollToReviews = () => {
    const reviewsSection = document.querySelector('#reviews-section')
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div className="container-custom py-6 sm:py-10 md:py-12">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <div className="max-w-2xl">
            <p className="pt-10 uppercase tracking-wide text-muted-foreground text-xs md:text-sm">
              {product?.category || 'Dekord Essentials'}
            </p>
            <h1
              className={cn("pt-6 text-balance font-sans font-semibold leading-tight", "text-2xl sm:text-3xl md:text-5xl")}
            >
              {product?.name || 'Dekord Braided USB‑C Charging Cable'}
            </h1>
            <p className="text-muted-foreground mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base leading-relaxed">
              {product?.description || 'A statement cable built for speed and longevity. Premium braid, reinforced strain relief, and a satin-soft touch that complements your everyday carry.'}
            </p>
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button onClick={handleBuyNow} className="h-10 md:h-11 px-5">{"Buy now"}</Button>
              <Button onClick={handleAddToCart} variant="outline" className="h-10 md:h-11 px-5 bg-transparent">
                {"Add to cart"}
              </Button>
              <button 
                onClick={scrollToReviews}
                className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
              >
                <RatingDisplay 
                  rating={product?.rating || null} 
                  reviewCount={product?.review_count || 0}
                  size="md"
                  showCount={true}
                />
              </button>
            </div>
          </div>

          <div className="relative rounded-xl ring-1 ring-border overflow-hidden">
            <Image
              src={product?.main_image || "/placeholder.svg"}
              alt={product?.name || "Product image"}
              width={1440}
              height={720}
              className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

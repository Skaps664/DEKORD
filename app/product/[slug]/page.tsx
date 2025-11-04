"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { getProductBySlug } from "@/lib/services/products"
import type { Product, ProductVariant } from "@/lib/types/database"
import { ProductHero } from "@/components/product/product-hero"
import { ProductGallery } from "@/components/product/product-gallery"
import { PurchasePanel } from "@/components/product/purchase-panel"
import { FeatureGrid } from "@/components/product/feature-grid"
import { SpecsTable } from "@/components/product/specs-table"
import { LookbookStrip } from "@/components/product/lookbook-strip"
import { CareWarranty } from "@/components/product/care-warranty"
import ComparisonSection from "@/components/comparison-section"
import { SpecialtyShowcase } from "@/components/product/specialty-showcase"
import { ProductBanner } from "@/components/product/product-banner"
import { trackViewContent } from "@/components/facebook-pixel"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [product, setProduct] = useState<(Product & { variants?: ProductVariant[] }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [showColorFlash, setShowColorFlash] = useState(false)
  const [flashColor, setFlashColor] = useState("")
  const [activeColorData, setActiveColorData] = useState<{ overlay: string; shadow: string } | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const { data, error } = await getProductBySlug(slug)
      
      if (error || !data) {
        console.error("Failed to fetch product:", error)
        // Redirect to catalog if product not found
        router.push("/catalog")
        return
      }
      
      console.log('✅ Loaded product:', data.name)
      setProduct(data)
      setLoading(false)
    }
    
    if (slug) {
      fetchProduct()
    }
  }, [slug, router])

  // Track product view with Facebook Pixel
  useEffect(() => {
    if (product && !loading) {
      trackViewContent({
        id: product.id,
        name: product.name,
        price: product.price,
      })
      console.log('📊 Facebook Pixel: ViewContent tracked for', product.name)
    }
  }, [product, loading])

  const handleColorChange = (overlayClass: string, shadowClass: string) => {
    setFlashColor(overlayClass)
    setActiveColorData({ overlay: overlayClass, shadow: shadowClass })
    setShowColorFlash(true)
    
    setTimeout(() => {
      setShowColorFlash(false)
    }, 600)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background grain-texture pt-24">
        <div className="container-custom py-20">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return null
  }

  return (
    <main className="bg-background grain-texture text-foreground pt-16 md:pt-18 relative overflow-hidden">
      {/* Color Flash Overlay - Behind all components */}
      <AnimatePresence>
        {showColorFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn("fixed inset-0 pointer-events-none z-0", flashColor)}
          />
        )}
      </AnimatePresence>

      <ProductHero product={product} />

      <section className="container-custom py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>
          <div className="lg:col-span-5 pt-6 ">
            <PurchasePanel 
              product={product}
              variants={product.variants}
              onColorChange={handleColorChange} 
              activeColorShadow={activeColorData?.shadow}
            />
          </div>
        </div>
      </section>

      <div className="py-6 md:py-8">
        <ComparisonSection />
      </div>

      <div className="py-6 md:py-8">
        <SpecialtyShowcase />
      </div>

      <div className="py-6 md:py-8">
        <ProductBanner />
      </div>

      <div className="py-6 md:py-8">
        <FeatureGrid />
      </div>

      <div className="py-6 md:py-8">
        <SpecsTable />
      </div>

      <div className="py-6 md:py-8">
        <LookbookStrip />
      </div>

      <div className="py-6 md:py-8">
        <CareWarranty />
      </div>
    </main>
  )
}

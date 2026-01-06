"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { Product } from "@/lib/types/database"

interface ProductGalleryProps {
  product?: Product
}

export function ProductGallery({ product }: ProductGalleryProps = {}) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  // Use product images if available, otherwise fall back to placeholder images
  const images = product ? [
    product.image_2 && { src: product.image_2, alt: `${product.name} view 2` },
    product.image_3 && { src: product.image_3, alt: `${product.name} view 3` },
    product.image_4 && { src: product.image_4, alt: `${product.name} view 4` },
    product.image_5 && { src: product.image_5, alt: `${product.name} view 5` },
  ].filter((img): img is { src: string; alt: string } => img !== null && img !== undefined) : [
    { src: "/usb-c-cable-macro-braid-texture.jpg", alt: "Macro braid texture" },
    { src: "/usb-c-connector-detail-minimal-lighting.jpg", alt: "Connector detail" },
    { src: "/charging-setup-on-desk-quiet-luxury.jpg", alt: "Charging setup on desk" },
    { src: "/braided-cable-coiled-aesthetic-still.jpg", alt: "Coiled braided cable" },
  ]

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 py-6">
        {images.map((img, i) => (
          <figure 
            key={i} 
            className="group relative rounded-lg ring-1 ring-border overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              width={900}
              height={900}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority={i < 2}
            />
          </figure>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Image Container */}
            <motion.div
              className="relative w-full max-w-[90vw] sm:max-w-xl lg:max-w-2xl aspect-square"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 sm:top-2 sm:right-2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-neutral-100 transition-colors"
                aria-label="Close image"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-900" strokeWidth={2.5} />
              </button>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden bg-white w-full h-full shadow-2xl">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 672px, 768px"
                  quality={95}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

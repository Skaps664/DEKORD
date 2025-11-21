import Image from "next/image"
import type { Product } from "@/lib/types/database"

interface ProductGalleryProps {
  product?: Product
}

export function ProductGallery({ product }: ProductGalleryProps = {}) {
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
    <div className="grid grid-cols-2 gap-2 sm:gap-3 py-6">
      {images.map((img, i) => (
        <figure key={i} className="group relative rounded-lg ring-1 ring-border overflow-hidden">
          <Image
            src={img.src || "/placeholder.svg"}
            alt={img.alt}
            width={900}
            height={900}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </figure>
      ))}
    </div>
  )
}

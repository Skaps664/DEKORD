import Image from "next/image"

const images = [
  { src: "/usb-c-cable-macro-braid-texture.jpg", alt: "Macro braid texture" },
  { src: "/usb-c-connector-detail-minimal-lighting.jpg", alt: "Connector detail" },
  { src: "/charging-setup-on-desk-quiet-luxury.jpg", alt: "Charging setup on desk" },
  { src: "/braided-cable-coiled-aesthetic-still.jpg", alt: "Coiled braided cable" },
]

export function ProductGallery() {
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

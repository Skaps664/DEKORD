import Image from "next/image"
import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/lib/types/database"

const defaultItems: ShowcaseItem[] = [
  { heading: "Premium braid", text: "Soft-touch, high-density weave resists fray without sacrificing flexibility.", image: "/spec-1.webp" },
  { heading: "Reinforced neck", text: "Overmolded strain relief eliminates weak points where most cables fail.", image: "/spec-2.webp" },
  { heading: "60W PD", text: "Stable power delivery for phones, tablets, and ultrabooks—no dropouts.", image: "/spec-3.webp" },
  { heading: "Tangle‑resistant coil", text: "Balanced stiffness-to-flex ratio so it packs cleanly without memory.", image: "/spec-4.webp" },
]

interface SpecialtyShowcaseProps {
  heading?: string
  subheading?: string
  items?: ShowcaseItem[]
}

export function SpecialtyShowcase({ heading, subheading, items }: SpecialtyShowcaseProps) {
  const tiles = items && items.length > 0 ? items : defaultItems
  const title = heading || "Details that matter"
  const subtitle = subheading || "Built for the real world. Explore the craft behind each component and why it elevates daily use."

  return (
    <section className="container-custom py-6 sm:py-8 md:py-12">
      <header className="mb-4 sm:mb-6 md:mb-8">
        <h2 className={cn("text-pretty font-semibold text-xl sm:text-2xl md:text-3xl")}>{title}</h2>
        <p className="text-muted-foreground mt-2 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map((tile, i) => (
          <article key={i} className="rounded-xl ring-1 ring-border overflow-hidden bg-card/40">
            <div className="relative aspect-[4/5]">
              <Image
                src={tile.image || "/placeholder.svg"}
                alt={tile.heading}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-medium text-sm sm:text-base">{tile.heading}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {tile.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

import Image from "next/image"
import { cn } from "@/lib/utils"

export function SpecialtyShowcase() {
  return (
    <section className="container-custom py-6 sm:py-8 md:py-12">
      <header className="mb-4 sm:mb-6 md:mb-8">
        <h2 className={cn("text-pretty font-semibold text-xl sm:text-2xl md:text-3xl")}>{"Details that matter"}</h2>
        <p className="text-muted-foreground mt-2 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
          Built for the real world. Explore the craft behind each component and why it elevates daily use.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Tile 1 */}
        <article className="rounded-xl ring-1 ring-border overflow-hidden bg-card/40">
          <div className="relative aspect-[4/5]">
            <Image
              src="/placeholder.svg"
              alt="Macro of braided jacket texture"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-medium text-sm sm:text-base">Premium braid</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Soft-touch, high-density weave resists fray without sacrificing flexibility.
            </p>
          </div>
        </article>

        {/* Tile 2 */}
        <article className="rounded-xl ring-1 ring-border overflow-hidden bg-card/40">
          <div className="relative aspect-[4/5]">
            <Image
              src="/placeholder.svg"
              alt="Reinforced connector close-up"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-medium text-sm sm:text-base">Reinforced neck</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Overmolded strain relief eliminates weak points where most cables fail.
            </p>
          </div>
        </article>

        {/* Tile 3 */}
        <article className="rounded-xl ring-1 ring-border overflow-hidden bg-card/40">
          <div className="relative aspect-[4/5]">
            <Image
              src="/placeholder.svg"
              alt="USB‑C to USB‑C fast charging"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-medium text-sm sm:text-base">60W PD</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Stable power delivery for phones, tablets, and ultrabooks—no dropouts.
            </p>
          </div>
        </article>

        {/* Tile 4 */}
        <article className="rounded-xl ring-1 ring-border overflow-hidden bg-card/40">
          <div className="relative aspect-[4/5]">
            <Image
              src="/placeholder.svg"
              alt="Cable coiled neatly on desk"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-medium text-sm sm:text-base">Tangle‑resistant coil</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Balanced stiffness-to-flex ratio so it packs cleanly without memory.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

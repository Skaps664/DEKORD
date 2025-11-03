import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function ProductHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-custom py-6 sm:py-10 md:py-12">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <div className="max-w-2xl">
            <p className="pt-10 uppercase tracking-wide text-muted-foreground text-xs md:text-sm">Dekord Essentials</p>
            <h1
              className={cn("pt-6 text-balance font-sans font-semibold leading-tight", "text-2xl sm:text-3xl md:text-5xl")}
            >
              Dekord Braided USB‑C Charging Cable
            </h1>
            <p className="text-muted-foreground mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base leading-relaxed">
              A statement cable built for speed and longevity. Premium braid, reinforced strain relief, and a satin-soft
              touch that complements your everyday carry.
            </p>
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button className="h-10 md:h-11 px-5">{"Buy now"}</Button>
              <Button variant="outline" className="h-10 md:h-11 px-5 bg-transparent">
                {"Add to cart"}
              </Button>
            </div>
          </div>

          <div className="relative rounded-xl ring-1 ring-border overflow-hidden">
            <Image
              src="/placeholder.svg"
              alt="Cinematic studio shot of Dekord braided USB‑C cable"
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

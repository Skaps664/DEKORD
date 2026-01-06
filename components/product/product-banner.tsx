import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ProductBanner() {
  return (
    <section className="container-custom py-6 sm:py-8 md:py-12">
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-border">
        <div className="relative h-[28vh] sm:h-[36vh] md:h-[48vh]">
          <Image
            src="/test-6.png"
            alt="Editorial banner with USB‑C cable and phone"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/20 to-transparent" />
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6">
            <div className="max-w-xl">
              <h3 className={cn("text-white font-semibold leading-tight", "text-lg sm:text-2xl md:text-4xl")}>
                ELEVATE THE EVERYDAY
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white mt-1 sm:mt-2">
                Designed to pair with modern wardrobes and minimal workspaces—form, function, and longevity as one.
              </p>
              <div className="mt-2 sm:mt-3 md:mt-4">
                <Button className="h-9 sm:h-10 md:h-11 px-4 sm:px-5 text-xs sm:text-sm">{"Shop accessories"}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

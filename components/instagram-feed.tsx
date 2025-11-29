"use client"

import Image from "next/image"
import { Instagram, ArrowUpRight } from "lucide-react"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"
import { useLazyLoad } from "@/hooks/use-lazy-load"

type FeedItem = {
  id: string
  src: string
  alt: string
}

const FEED: FeedItem[] = [
  // square placeholders; replace with your real posts anytime
  { id: "1", src: "/dekord-usb-cable-lifestyle-shot.jpg", alt: "USB-C cable lifestyle shot" },
  { id: "2", src: "/dekord-charging-setup-on-desk.jpg", alt: "Charging setup on a clean desk" },
  { id: "3", src: "/braided-cable-macro-texture.jpg", alt: "Braided cable macro texture" },
  { id: "4", src: "/phone-charging-minimal-scene.jpg", alt: "Phone charging in a minimal scene" },
  { id: "5", src: "/cable-flatlay-quiet-luxury.jpg", alt: "Cable flatlay in quiet luxury style" },
  { id: "6", src: "/usb-c-connector-detail.jpg", alt: "USB-C connector detail" },
  { id: "7", src: "/desk-workspace-with-cables.jpg", alt: "Workspace with cables and devices" },
  { id: "8", src: "/charging-dock-and-phone.jpg", alt: "Charging dock and phone" },
]

export function InstagramFeed() {
  const handle = "@dekord.pk"
  const url = "https://instagram.com/dekord.pk"
  const { ref, isIntersecting } = useLazyLoad({ threshold: 0.1, rootMargin: '100px' })

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom px-2 sm:px-2 md:px-3">
        <Reveal>
          <header className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">Follow our journey</h2>
              <p className="text-sm md:text-base text-foreground/60">{handle}</p>
            </div>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Instagram profile dekord.pk"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
                "border-border text-foreground hover:bg-foreground hover:text-background transition-colors",
              )}
            >
              <Instagram className="h-4 w-4" />
              <span>Follow {handle}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {isIntersecting && FEED.map((item) => (
              <a
                key={item.id}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open Instagram post from ${handle}`}
                className="group relative block overflow-hidden rounded-md border border-border"
              >
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  width={640}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Reveal } from "@/components/reveal"
import { ParallaxImage } from "@/components/parallax-image"

export function CinematicBanner() {
  return (
    <section className="relative isolate py-12 sm:py-16 lg:py-28" aria-labelledby="cinematic-banner-heading">
      {/* Background layer with subtle vignette and grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background grain-texture"
        style={{
          maskImage:
            "radial-gradient(120% 80% at 50% 40%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.35) 90%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 40%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.35) 90%, transparent 100%)",
        }}
      />

      <div className="container-custom relative px-2 sm:px-2 md:px-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-label text-muted-foreground text-sm sm:text-base">⚡ CHARGE FASTER. LIVE SMARTER.</p>
                <h2
                  id="cinematic-banner-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-primary tracking-tight font-bold"
                >
                  Crafted with
                  <span className="italic font-normal"> premium braided threads, </span>
                  built to last.
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-prose">
                  Our cables are designed to withstand daily bends, twists, and pulls. Tough on the outside, stable on the inside.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <a
                    href="#materials"
                    className="inline-flex items-center rounded-[var(--radius-lg)] px-4 sm:px-5 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm sm:text-base"
                    aria-label="Explore our cable technology"
                  >
                    Discover now
                  </a>
                  <a
                    href="#featured-products"
                    className="inline-flex items-center rounded-[var(--radius-lg)] px-4 sm:px-5 py-2.5 sm:py-3 border border-border text-foreground text-sm sm:text-base"
                    aria-label="View cable collection"
                  >
                    View collection
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Visuals */}
          <div className="lg:col-span-6">
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative h-[240px] sm:h-[300px] lg:h-[360px] rounded-[var(--radius-lg)] overflow-hidden ring-1 ring-border"
              >
                {/* Use ParallaxImage with a placeholder that follows guidelines */}
                <ParallaxImage
                  src="/cine-1.webp"
                  alt="Close-up of dekord braided cable detail"
                  className="absolute inset-0"
                  parallaxOffset={14}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative h-[240px] sm:h-[360px] lg:h-[440px] rounded-[var(--radius-lg)] overflow-hidden ring-1 ring-border"
              >
                <ParallaxImage
                  src="/spec-4.webp"
                  alt="dekord USB-C cable with reinforced connector"
                  className="absolute inset-0"
                  parallaxOffset={18}
                />
              </motion.div>
            </div>
            {/* Subtle caption */}
            <div className="mt-3 sm:mt-4 lg:mt-6">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Materials: 100% pure copper core, high-density braided jacket, reinforced connector joints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

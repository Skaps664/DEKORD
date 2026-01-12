"use client"

import { Reveal } from "../reveal"

const features = [
  {
    title: "Lightning Fast Charging",
    description: "60W-100W power delivery for all your devices. Charge your MacBook, iPad, or iPhone 15 at maximum speed."
  },
  {
    title: "Military-Grade Durability",
    description: "Premium braided nylon with reinforced stress points. Built to withstand 25,000+ bends and everyday wear."
  },
  {
    title: "Premium Materials",
    description: "Aerospace-grade aluminum connectors with gold-plated contacts for superior conductivity and longevity."
  },
  {
    title: "Stunning Design",
    description: "Available in vibrant colors that match your style. Not just functional - it's a statement piece."
  },
  {
    title: "Universal Compatibility",
    description: "Works seamlessly with iPhone 15/16, Samsung Galaxy, MacBook, iPad, and all USB-C devices."
  },
  {
    title: "Exclusive Launch Perks",
    description: "Early subscribers get 30% off, free shipping, lifetime warranty, and exclusive access to new colors."
  }
]

export function PreLaunchFeatures() {
  return (
    <section className="py-8 sm:py-14 lg:py-18">
      <div className="container-custom px-2 sm:px-2 md:px-3">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="text-neutral-900 text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-wide">
              ENGINEERED FOR <span className="italic font-light">Excellence</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
              We&apos;ve reimagined every detail to create the ultimate charging experience.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-white p-6 sm:p-8 rounded-3xl transition-all duration-300"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px"
                }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 sm:mt-14 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full" style={{
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px"
            }}>
              <span className="text-2xl">🇵🇰</span>
              <p className="text-sm sm:text-base text-neutral-900 font-semibold">
                Proudly Designed & Made in Pakistan
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Reveal } from "../reveal"

const benefits = [
  {
    emoji: "👑",
    title: "VIP Early Access",
    description: "Be the first to own dekord cables before the official launch."
  },
  {
    emoji: "⚡",
    title: "30% Launch Discount",
    description: "Exclusive pre-launch pricing - save big on your first order."
  },
  {
    emoji: "🎨",
    title: "Free Premium Stickers",
    description: "Get our exclusive dekord sticker pack absolutely free with every order."
  },
  {
    emoji: "✨",
    title: "Lifetime Warranty",
    description: "Pre-launch customers get our exclusive lifetime warranty coverage."
  },
  {
    emoji: "🔔",
    title: "Priority Updates",
    description: "Get notified first about new colors, products, and special offers."
  },
  {
    emoji: "📦",
    title: "Free Shipping",
    description: "Complimentary shipping on all pre-launch orders across Pakistan."
  }
]

export function PreLaunchBenefits() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-neutral-50">
      <div className="container-custom px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-neutral-600 uppercase tracking-wider mb-4"
            >
              Exclusive Perks • Made in Pakistan 🇵🇰
            </motion.span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Early Bird Benefits
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
              Join our pre-launch and unlock incredible perks reserved only for our founding customers.
              These benefits won&apos;t last forever.
            </p>
          </div>
        </Reveal>

        {/* Benefits Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-6 sm:p-7"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px"
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Emoji */}
                    <div className="flex-shrink-0 text-3xl sm:text-4xl">
                      {benefit.emoji}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Call-out Box */}
        <Reveal delay={0.6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-3xl p-8 sm:p-12 text-center"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Star className="w-16 h-16 text-yellow-400 fill-yellow-400" />
              </motion.div>
              
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Limited Time Offer
              </h3>
              <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
                Only the first 500 pre-launch subscribers will receive all these exclusive benefits.
                Don&apos;t miss your chance to be part of something special.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">487</div>
                  <div className="text-sm text-neutral-400">Spots Remaining</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-neutral-700" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-1">13</div>
                  <div className="text-sm text-neutral-400">Spots Left Today</div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

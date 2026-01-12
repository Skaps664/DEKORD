"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Reveal } from "../reveal"
import Image from "next/image"

export function PreLaunchCTA() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl overflow-hidden"
            >
              {/* Decorative Image - Desktop only */}
              <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full opacity-10">
                <Image
                  src="/test-11.webp"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                {/* Content */}
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                      <span className="text-base">🇵🇰</span>
                      <span className="text-xs sm:text-sm font-semibold text-white">Made in Pakistan • Limited Time</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                      Ready to Upgrade?
                    </h2>
                    
                    <p className="text-sm sm:text-base lg:text-lg text-neutral-300 mb-6">
                      Get 30% off automatically when you pre-order. Premium cables with lifetime warranty.
                    </p>

                    {/* Benefits - Compact on mobile */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        "30% OFF Auto-Applied",
                        "Free Stickers",
                        "Lifetime Warranty",
                        "Free Shipping"
                      ].map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white font-medium text-xs sm:text-sm">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <motion.a
                        href="#products"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 font-bold rounded-full hover:bg-neutral-100 transition-all duration-300 shadow-xl text-sm sm:text-base"
                      >
                        Shop Pre-Order
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.a>

                      <motion.a
                        href="/catalog"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                      >
                        View Catalog
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Bottom Trust Bar - Simplified for mobile */}
          <Reveal delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
            >
              {[
                { value: "25K+", label: "Bend Tested" },
                { value: "100%", label: "Satisfaction" },
                { value: "4.9★", label: "Rating" },
                { value: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="p-4 sm:p-5 bg-white rounded-2xl border border-neutral-200"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

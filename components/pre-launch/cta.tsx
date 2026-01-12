"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Gift } from "lucide-react"
import { Reveal } from "../reveal"
import Image from "next/image"

export function PreLaunchCTA() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl overflow-hidden"
            >
              {/* Decorative Image */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <Image
                  src="/test-11.webp"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 sm:p-12 lg:p-16">
                {/* Left Content */}
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                      <span className="text-lg">🇵🇰</span>
                      <span className="text-sm font-semibold text-white">Made in Pakistan • Limited Time Offer</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                      Don&apos;t Miss Out
                    </h2>
                    
                    <p className="text-lg sm:text-xl text-neutral-300 mb-8">
                      Join 500+ smart shoppers who&apos;ve already reserved their spot. 
                      Lock in your 30% discount and exclusive perks before we sell out.
                    </p>

                    <div className="space-y-4 mb-8">
                      {[
                        "30% OFF - Save up to Rs. 540",
                        "Free Premium Stickers",
                        "Lifetime Warranty Coverage",
                        "Priority Shipping"
                      ].map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white font-medium">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <motion.a
                        href="#subscribe"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 font-bold rounded-full hover:bg-neutral-100 transition-all duration-300 shadow-xl"
                      >
                        Get Early Access
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.a>

                      <motion.a
                        href="#products"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300"
                      >
                        View Products
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right Content - Stats & Social Proof */}
                <div className="flex flex-col justify-center space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">487</div>
                        <div className="text-sm text-neutral-400">Spots Remaining</div>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "97.4%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-2">
                      97.4% claimed - Act fast!
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                  >
                    <div className="text-sm text-neutral-400 mb-3">What people are saying:</div>
                    <div className="space-y-3">
                      {[
                        { name: "Ahmed K.", text: "Can't wait! The quality looks amazing." },
                        { name: "Sara M.", text: "Finally, cables that match my vibe!" },
                        { name: "Hassan R.", text: "30% off is a steal. Just subscribed!" }
                      ].map((review, index) => (
                        <motion.div
                          key={review.name}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                            {review.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white">{review.name}</div>
                            <div className="text-xs text-neutral-400">{review.text}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-green-400">Live Updates</span>
                    </div>
                    <p className="text-sm text-white">
                      <strong>13 people</strong> joined in the last hour
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          {/* Bottom Trust Bar */}
          <Reveal delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
              {[
                { value: "25,000+", label: "Bend Tested" },
                { value: "100%", label: "Satisfaction" },
                { value: "4.9★", label: "Pre-Orders" },
                { value: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-6 bg-white rounded-2xl border border-neutral-200"
                >
                  <div className="text-3xl font-bold text-neutral-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600">
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

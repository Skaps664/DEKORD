"use client"

          import { motion } from "framer-motion"
          import { BlurPanel } from "./blur-panel"
          import { PackageCheck, Rocket, ShieldCheck } from "lucide-react"

          export function HeroText({ contentY }: { contentY?: any }) {
            return (
              <div className="relative z-10">
                {/* Info Strip moved into the header component so it appears with the header block */}
                <motion.div
                  className="flex justify-center mt-6 md:mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <BlurPanel className="mx-4 sm:mx-6 mb-4 sm:mb-6 px-4 sm:px-6 py-3 sm:py-4 bg-black/24 backdrop-blur-md border-white/20">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/90">
                      <div className="flex items-center gap-2">
                        <PackageCheck className="w-4 h-4 text-green-400" />
                        <span className="text-xs sm:text-sm">100% Pure Copper</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-amber-400" />
                        <span className="text-xs sm:text-sm">Fast PD Charging</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span className="text-xs sm:text-sm">1 Year Warranty</span>
                      </div>
                    </div>
                  </BlurPanel>
                </motion.div>
              </div>
            )
          }

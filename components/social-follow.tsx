"use client"

import { motion } from "framer-motion"
import { Reveal } from "./reveal"
import { Instagram, Facebook, Linkedin, Music } from "lucide-react"

export function SocialFollow() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" suppressHydrationWarning>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} suppressHydrationWarning />
      </div>

      <div className="container-custom px-2 sm:px-2 md:px-3 relative" suppressHydrationWarning>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center" suppressHydrationWarning>
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-neutral-900 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              suppressHydrationWarning
            >
              <Instagram className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h3
              className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Follow our journey
            </motion.h3>

            <motion.div
              className="text-xl lg:text-2xl font-semibold text-neutral-600 mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              suppressHydrationWarning
            >
              @dekord.pk
            </motion.div>

            <motion.p
              className="text-base text-neutral-500 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Follow @dekord.pk
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              suppressHydrationWarning
            >
              <a
                href="https://instagram.com/dekord.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
                suppressHydrationWarning
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
              <a
                href="https://facebook.com/dekord.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
                suppressHydrationWarning
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
              <a
                href="https://linkedin.com/company/dekord-pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
                suppressHydrationWarning
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href="https://tiktok.com/@dekord.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
                suppressHydrationWarning
              >
                <Music className="w-5 h-5" />
                TikTok
              </a>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
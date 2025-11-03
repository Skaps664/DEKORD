"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Reveal } from "./reveal"
import { ShieldCheck, Lock, Star, Truck, BadgeCheck, Search } from "lucide-react"

type Badge = {
  title: string
  icon: React.ElementType
}

const badges: Badge[] = [
  { title: "Money Back", icon: ShieldCheck },
  { title: "Secure Payments", icon: Lock },
  { title: "Premium Quality", icon: Star },
  { title: "Fast Shipping", icon: Truck },
  { title: "Guaranteed Quality", icon: BadgeCheck },
  { title: "Inspected for Quality", icon: Search },
]

export function CredibilityBadges() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        <Reveal>
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-neutral-900">
              WHAT WE OFFER
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-600">
              No need to worry. Our products and services are the best in class
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 items-start">
            {badges.map(({ title, icon: Icon }) => (
              <li key={title} className="flex flex-col items-center text-center">
                <motion.div
                  className="relative rounded-full w-28 h-28 md:w-32 md:h-32 flex items-center justify-center ring-2 ring-neutral-900 bg-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  aria-hidden="true"
                >
                  {/* inner dashed ring to evoke stamp look */}
                  <div className="absolute inset-3 rounded-full border border-dashed border-neutral-300" />
                  <Icon className="relative z-10 w-8 h-8 md:w-9 md:h-9 text-neutral-900" />
                </motion.div>
                <span className="mt-4 text-sm md:text-base font-semibold text-neutral-900">{title}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

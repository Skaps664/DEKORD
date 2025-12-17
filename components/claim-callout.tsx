"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileWarning, ArrowRight } from "lucide-react"

interface ClaimCalloutProps {
  variant?: "primary" | "secondary"
  className?: string
}

export function ClaimCallout({ variant = "primary", className = "" }: ClaimCalloutProps) {
  if (variant === "primary") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-3xl" />
        <div className="relative p-8 md:p-12 border border-border rounded-3xl bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <FileWarning className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Ready to Submit a Claim?
              </h3>
              <p className="text-muted-foreground mb-4">
                It's easy! Just click the button below and fill out our simple claim form. We'll handle the rest.
              </p>
              <Link href="/claim">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-xl font-semibold hover:shadow-xl hover:shadow-foreground/20 transition-all"
                >
                  Go to Claim Page
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`text-center ${className}`}
    >
      <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 border-2 border-dashed border-border rounded-2xl bg-muted/30 hover:border-foreground/30 hover:bg-muted/50 transition-all">
        <FileWarning className="w-6 h-6 text-foreground flex-shrink-0" />
        <p className="text-sm font-medium text-foreground">
          Need to file a claim?{" "}
          <Link href="/claim" className="underline hover:no-underline font-bold">
            Visit our Claim Page
          </Link>
          {" "}— it's quick and easy!
        </p>
      </div>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FileWarning, ArrowRight, Package, CheckCircle2 } from "lucide-react"

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
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <FileWarning className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How to Submit a Claim
            </h3>
            <div className="max-w-2xl mx-auto space-y-4 mb-8">
              <div className="flex items-start gap-3 text-left p-4 bg-background/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-foreground">Go to Your Account</p>
                  <p className="text-sm text-muted-foreground">Navigate to the Orders tab in your account</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left p-4 bg-background/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-foreground">Find Your Delivered Order</p>
                  <p className="text-sm text-muted-foreground">Locate the order you want to make a claim for</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left p-4 bg-background/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-foreground">Click "Claim" Button</p>
                  <p className="text-sm text-muted-foreground">Fill out the form with issue details and photos</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left p-4 bg-background/50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">We'll Respond in 3-5 Days</p>
                  <p className="text-sm text-muted-foreground">Our team will review and resolve your claim</p>
                </div>
              </div>
            </div>
            <Link href="/account?tab=orders">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-xl font-semibold hover:shadow-xl hover:shadow-foreground/20 transition-all"
              >
                <Package className="w-5 h-5" />
                Go to My Orders
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
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
        <Package className="w-6 h-6 text-foreground flex-shrink-0" />
        <p className="text-sm font-medium text-foreground">
          Need to file a claim?{" "}
          <Link href="/account?tab=orders" className="underline hover:no-underline font-bold">
            Go to Your Orders
          </Link>
          {" "}and click the "Claim" button on your delivered order.
        </p>
      </div>
    </motion.div>
  )
}

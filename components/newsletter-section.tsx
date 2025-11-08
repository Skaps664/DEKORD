"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Mail } from "lucide-react"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { AnimatedText } from "./animated-text"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setIsValid(false)
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          source: 'newsletter-section'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setIsValid(true)
        setEmail("")
      } else {
        setErrorMessage(data.error || 'Failed to subscribe. Please try again.')
        setIsValid(false)
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setErrorMessage('Failed to subscribe. Please try again.')
      setIsValid(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container-custom px-2 sm:px-2 md:px-3 overflow-x-hidden">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <BlurPanel className="p-8 lg:p-12 bg-white/40 backdrop-blur-md grain-texture">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                  <AnimatedText text="We send " delay={0.2} />
                  <span className="italic font-light">
                    <AnimatedText text="tasty emails." delay={0.5} />
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  Stay updated with new cable launches, tech tips, and exclusive discounts. Join the dekord community.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-full">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={20} className="text-neutral-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setIsValid(true)
                      }}
                      placeholder="Enter your email address"
                      className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border rounded-full text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 max-w-full ${
                        !isValid ? "border-red-300 focus:ring-red-500" : "border-neutral-200"
                      }`}
                    />
                  </div>

                  {!isValid && (
                    <motion.p
                      className="text-sm text-red-600 text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errorMessage || "Please enter a valid email address"}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full max-w-full bg-neutral-900 text-white py-4 rounded-full font-medium hover:bg-neutral-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Welcome to dekord</h3>
                  <p className="text-neutral-600">
                    Thank you for subscribing. You'll receive updates on new cables, tech tips, and exclusive offers.
                  </p>
                </motion.div>
              )}

              <p className="text-xs text-neutral-500 text-center mt-6">
                We respect your privacy. Unsubscribe at any time. Read our{" "}
                <a href="#" className="underline hover:text-neutral-700 transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </BlurPanel>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

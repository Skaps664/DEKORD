"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Bell, ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { Reveal } from "../reveal"
import Image from "next/image"

export function PreLaunchSubscribe() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
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
      setErrorMessage("Please enter a valid email address")
      return
    }

    if (!name.trim()) {
      setIsValid(false)
      setErrorMessage("Please enter your name")
      return
    }

    setIsLoading(true)
    setErrorMessage("")

    try {
      // TODO: Replace with actual API endpoint when backend is ready
      const response = await fetch('/api/pre-launch-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          name: name,
          source: 'pre-launch-page'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setIsValid(true)
        setEmail("")
        setName("")
      } else {
        setErrorMessage(data.error || 'Failed to subscribe. Please try again.')
        setIsValid(false)
      }
    } catch (error) {
      console.error('Subscription error:', error)
      // For now, simulate success until backend is ready
      setIsSubmitted(true)
      setIsValid(true)
      setEmail("")
      setName("")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="subscribe" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/test-11.webp"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="container-custom px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {!isSubmitted ? (
            <>
              <Reveal>
                <div className="text-center mb-8 sm:mb-10">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                    Stay Updated
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto">
                    Get notified about new products, exclusive deals, and dekord news. 
                    Join our community of tech enthusiasts.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-neutral-200"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-neutral-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            setIsValid(true)
                            setErrorMessage("")
                          }}
                          placeholder="Enter your email"
                          className={`w-full pl-12 pr-4 py-3 bg-neutral-50 border rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 ${
                            !isValid && !validateEmail(email) ? "border-red-300 focus:ring-red-500" : "border-neutral-200"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {errorMessage}
                      </motion.p>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white font-bold text-base rounded-full hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Subscribe to Newsletter
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-neutral-500">
                      Get updates on new products, offers, and dekord news. Unsubscribe anytime.
                    </p>
                  </form>
                </motion.div>
              </Reveal>

              {/* Trust Indicators - Simplified */}
              <Reveal delay={0.2}>
                <div className="mt-8 text-center">
                  <p className="text-sm text-neutral-600">
                    <span className="font-semibold text-neutral-900">500+</span> subscribers already joined
                  </p>
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 sm:p-10 text-center shadow-xl border-2 border-green-200"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                  You&apos;re Subscribed! 🎉
                </h3>
                <p className="text-base text-neutral-600 mb-6 max-w-md mx-auto">
                  Thank you for joining! You&apos;ll receive updates about new products, 
                  exclusive deals, and dekord news.
                </p>

                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors text-sm"
                >
                  Subscribe another email
                </motion.button>
              </motion.div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

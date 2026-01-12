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
    <section id="subscribe" className="py-20 lg:py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
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
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <>
              <Reveal>
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-bold">Limited Spots Available</span>
                  </motion.div>

                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                    Join the Pre-Launch
                  </h2>
                  <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
                    Be among the first 500 subscribers to unlock exclusive early bird benefits.
                    Get 30% off, free shipping, and lifetime warranty.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-neutral-200"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          setIsValid(true)
                          setErrorMessage("")
                        }}
                        placeholder="Enter your full name"
                        className={`w-full px-6 py-4 bg-neutral-50 border rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 ${
                          !isValid && !name.trim() ? "border-red-300 focus:ring-red-500" : "border-neutral-200"
                        }`}
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
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
                          placeholder="Enter your email address"
                          className={`w-full pl-14 pr-6 py-4 bg-neutral-50 border rounded-2xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all duration-200 ${
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

                    {/* Benefits List */}
                    {/* <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-neutral-900 mb-4">
                        What You&apos;ll Get:
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "30% exclusive launch discount",
                          "Free premium sticker pack",
                          "Lifetime warranty coverage",
                          "Priority shipping & updates",
                          "Early access to new colors",
                          "VIP customer support"
                        ].map((benefit) => (
                          <li key={benefit} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-neutral-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div> */}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white font-bold text-lg rounded-full hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Bell className="w-5 h-5" />
                          Reserve Your Spot Now
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-neutral-500">
                      By subscribing, you agree to receive updates about dekord products. Unsubscribe anytime.
                    </p>
                  </form>
                </motion.div>
              </Reveal>

              {/* Trust Indicators */}
              <Reveal delay={0.2}>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  {[
                    { value: "487", label: "Spots Remaining" },
                    { value: "513", label: "Already Joined" },
                    { value: "4.9★", label: "Pre-Orders Rating" }
                  ].map((stat) => (
                    <div key={stat.label} className="p-6 bg-white rounded-2xl border border-neutral-200">
                      <div className="text-3xl font-bold text-neutral-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-12 text-center shadow-2xl border-2 border-green-200"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                  You&apos;re In! 🎉
                </h3>
                <p className="text-lg text-neutral-600 mb-6 max-w-md mx-auto">
                  Welcome to the dekord family! Check your email for exclusive pre-launch details
                  and your personal discount code.
                </p>

                <div className="bg-white rounded-2xl p-6 border border-green-200 mb-6">
                  <p className="text-sm font-semibold text-neutral-700 mb-2">
                    What happens next?
                  </p>
                  <ul className="text-left space-y-2 text-neutral-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Instant confirmation email with your discount code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Priority notifications for launch day (Feb 15)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Exclusive updates and behind-the-scenes content</span>
                    </li>
                  </ul>
                </div>

                <motion.button
                  onClick={() => setIsSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
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

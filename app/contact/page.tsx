"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Send, Zap, Package, Headphones } from "lucide-react"
import { FAQsSection } from "@/components/faqs-section"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      detail: "contact@dekord.online",
      description: "24h response time",
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent"
    },
    {
      icon: Phone,
      title: "Phone + WhatsAp",
      detail: "+92 339-0166442",
      description: "Mon-Sat, 10AM-8PM",
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent"
    },
    {
      icon: MapPin,
      title: "Location",
      detail: "Peshawar, Pakistan",
      description: "Visit by appointment",
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Fast Response",
      description: "We reply within 24 hours"
    },
    {
      icon: Package,
      title: "Custom Orders",
      description: "Bulk orders & customization"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Dedicated customer care"
    }
  ]

  return (
    <main className="min-h-screen bg-background pt-16 md:pt-18">
      {/* Hero */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-background" />
        </motion.div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl blur-xl opacity-50 animate-pulse" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform">
                  <Mail className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              LET'S TALK
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Got questions? Need support? Want to place a bulk order?
              <br />
              <span className="text-foreground font-medium">We're here to help.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} rounded-3xl`} />
                <div className="relative p-8 border border-border/50 rounded-3xl bg-card/50 backdrop-blur-sm hover:border-foreground/20 transition-all duration-300">
                  <method.icon className="w-12 h-12 mb-6 text-foreground group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    {method.title}
                  </h3>
                  <p className="text-xl font-bold text-foreground mb-2">
                    {method.detail}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Send us a message
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Features */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1 space-y-8"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-lg">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-foreground/5 to-foreground/10 rounded-3xl blur-2xl" />
                  <form onSubmit={handleSubmit} className="relative space-y-6 p-8 md:p-10 border border-border rounded-3xl bg-card shadow-2xl shadow-foreground/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
                          placeholder="+92 XXX XXXXXXX"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-3">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground"
                        >
                          <option value="">Select a subject</option>
                          <option value="product">Product Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="bulk">Bulk Orders</option>
                          <option value="warranty">Warranty Claim</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-3">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none resize-none text-foreground placeholder:text-muted-foreground"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 text-center"
                      >
                        ✓ Message sent successfully! We'll get back to you soon.
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 text-center"
                      >
                        ✗ Failed to send message. Please try again or email us directly.
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-5 bg-foreground text-background rounded-2xl font-semibold hover:shadow-xl hover:shadow-foreground/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-3 border-background/30 border-t-background rounded-full"
                          />
                          Sending your message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 relative overflow-hidden bg-muted/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Visit Our Headquarters
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A2 Third Floor, Dil Jan Arcade, Achini, Ring Road, Peshawar, Pakistan
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBw5L_ijh1pzZ978gVVzjwyWsvon1IQkUc&q=33.97311804120385,71.47735625040129&zoom=15`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <FAQsSection />
    </main>
  )
}

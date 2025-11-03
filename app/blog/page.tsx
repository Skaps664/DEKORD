"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BookOpen, Calendar, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <main className="min-h-screen bg-background pt-16 md:pt-18">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 bg-background"
        />
        
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
              <div className="w-20 h-20 rounded-3xl border border-border bg-card shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                <BookOpen className="w-10 h-10 text-foreground" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              BLOG
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Stay updated with the latest news, tips, and insights from dekord
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="p-12 md:p-16 border border-border/50 rounded-3xl bg-card shadow-xl text-center">
              <div className="w-16 h-16 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We're working on bringing you valuable content about USB-C technology, charging tips, product care guides, and industry insights. Check back soon!
              </p>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:shadow-xl transition-all"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup Placeholder */}
      <section className="py-12 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Get Notified When We Launch
            </h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to be the first to know when we publish new articles
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-2xl border border-border/50 bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button className="px-6 py-3 bg-foreground text-background rounded-2xl font-semibold hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

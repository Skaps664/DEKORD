"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Heart, Zap } from "lucide-react"

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-background grain-texture pt-20 md:pt-24">
      <article className="container-custom py-12 sm:py-16 md:py-20 px-2 sm:px-2 md:px-3">
        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime="2025-11-03">November 3, 2025</time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>dekord Team</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            dekord: Where Love Meets Hard Work
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            In today's fast-paced world, it's easy to overlook the small things that keep our lives running smoothly. But at dekord, we believe that the little things matter the most.
          </p>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200">
            <Image
              src="/dekord-usb-cable-lifestyle-shot.jpg"
              alt="dekord cables"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="prose prose-lg prose-neutral max-w-none">
            {/* Introduction */}
            <div className="bg-white rounded-xl border border-border p-6 sm:p-8 mb-8 shadow-sm">
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                A simple cable might look ordinary to some, but for us, it represents dedication, precision, and care. It's not just about charging your devices — it's about creating products that you can trust, day after day.
              </p>
            </div>

            {/* Our Journey */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8" />
                Our Journey
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  dekord was built on a simple idea: <strong className="text-foreground">quality should never be compromised</strong>. We saw how countless people struggled with fragile, unreliable cables that would fray, break, or fail right when they were needed most. We knew there had to be a better way — so we decided to create it.
                </p>
                <p>
                  From the very beginning, our goal has been to design and manufacture products that combine durability, performance, and style. Every dekord product is tested against strict standards to ensure it doesn't just look good but also performs flawlessly, even under tough conditions.
                </p>
              </div>
            </section>

            {/* Built with Passion */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Heart className="w-8 h-8" />
                Built with Passion
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  For us, cables aren't just accessories — <strong className="text-foreground">they're lifelines</strong>. They power your phones, your laptops, your work, and even your memories. That's why each product we create goes through a journey of research, innovation, and careful craftsmanship.
                </p>
                <p>
                  We spend months experimenting with materials, improving designs, and testing every detail. From the strength of the connectors to the flexibility of the wire, nothing is left to chance. Every step is fueled by the love we have for what we do and the belief that our customers deserve the very best.
                </p>
              </div>
            </section>

            {/* Highlight Quote */}
            <div className="my-12 p-8 bg-foreground text-background rounded-xl shadow-lg">
              <blockquote className="text-xl sm:text-2xl font-semibold text-center italic">
                "Every detail has been carefully considered, and every product is backed by our commitment to quality."
              </blockquote>
            </div>

            {/* The Hard Work Behind the Scenes */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                The Hard Work Behind the Scenes
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  What many people don't see is the dedication that happens behind the curtain. It's the long nights spent refining prototypes, the endless hours of testing durability, and the constant search for better materials. Our team doesn't settle for "good enough." We push until every product meets the high standards that dekord stands for.
                </p>
                <p>
                  This hard work means that when you hold a dekord product in your hand, you're not just holding a cable — <strong className="text-foreground">you're holding our promise</strong>: a promise of strength, reliability, and trust.
                </p>
              </div>
            </section>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-12">
              <div className="bg-white rounded-xl border border-border p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-foreground mb-2">25,000+</div>
                <div className="text-sm text-muted-foreground">Bend Tests Passed</div>
              </div>
              <div className="bg-white rounded-xl border border-border p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-foreground mb-2">100W</div>
                <div className="text-sm text-muted-foreground">Fast Charging Power</div>
              </div>
              <div className="bg-white rounded-xl border border-border p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-foreground mb-2">1 Year</div>
                <div className="text-sm text-muted-foreground">Warranty Coverage</div>
              </div>
            </div>

            {/* Why We Do It */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why We Do It
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  At the heart of dekord is a belief: <strong className="text-foreground">technology should make life easier, not harder</strong>. Too often, customers are left disappointed by cheap products that fail quickly. That's why we put in the love and effort to ensure dekord products stand the test of time.
                </p>
                <p>
                  When you choose dekord, you're not only investing in a product — you're investing in peace of mind. You know that every detail has been carefully considered, and every product is backed by our commitment to quality.
                </p>
              </div>
            </section>

            {/* More Than Just a Brand */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                More Than Just a Brand
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  dekord is more than just a company; it's a <strong className="text-foreground">community built on passion and trust</strong>. We love hearing from our customers, learning from their experiences, and growing with their feedback. Every review, every story, and every connection inspires us to do better.
                </p>
                <p>
                  At the end of the day, our mission is simple: to create products that make a difference in your life. Products that don't just last but also earn your trust and love.
                </p>
              </div>
            </section>

            {/* Final Thoughts */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Final Thoughts
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Our products are built with love, tested with hard work, and delivered with pride. At dekord, we don't just make cables — <strong className="text-foreground">we make connections that power your world</strong>.
                </p>
                <p>
                  So the next time you plug in your dekord cable, remember: behind that product is a team that poured their heart and soul into making sure it never lets you down.
                </p>
              </div>
            </section>

            {/* Closing Statement */}
            <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl border border-border p-8 text-center">
              <p className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Because at dekord, every connection counts.
              </p>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
              >
                Explore Our Products
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Author Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-16 pt-12 border-t border-border"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-background">D</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">dekord Team</h3>
              <p className="text-muted-foreground leading-relaxed">
                The dekord team is passionate about creating high-quality tech accessories that combine durability, style, and performance. Based in Peshawar, Pakistan, we're dedicated to making technology more reliable for everyone.
              </p>
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  )
}

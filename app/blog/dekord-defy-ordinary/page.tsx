"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Shield, Zap, Award, TrendingUp, CheckCircle2, X, AlertTriangle } from "lucide-react"

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
              <time dateTime="2025-09-15">September 15, 2025</time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>dekord Team</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground text-background text-xs font-semibold">
              Brand Story
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            dekord – Defy Ordinary: Premium Charging Cables in Pakistan
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Why should Pakistan always settle for ordinary? We're building the country's first premium charging accessories brand.
          </p>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative w-full aspect-video bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center">
            <Image
              src="/premium-braided-cable-lifestyle.jpg"
              alt="dekord Premium Cables"
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
              <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
                When it comes to tech, Pakistan has always been a market of imported accessories. From cables and chargers to headphones and power banks, most products on shop shelves are either cheap, unreliable imports or overpriced branded goods.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
                At dekord, we asked a simple question:
              </p>
              <p className="text-xl sm:text-2xl font-bold text-foreground text-center py-4">
                Why should Pakistan always settle for ordinary?
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                We decided to build Pakistan's first premium charging accessories brand — one that focuses on durability, performance, and trust.
              </p>
            </div>

            {/* The Problem */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                The Problem with Ordinary Charging Cables
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                Most people in Pakistan can relate to this:
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "You buy a cable from the market, it lasts only a few weeks.",
                  "It breaks at the connector or loses charging speed.",
                  "No warranty, no return policy, no accountability."
                ].map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-red-50 rounded-lg border border-red-200 p-4"
                  >
                    <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-foreground">{problem}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-neutral-100 rounded-xl border border-border p-6">
                <p className="text-base sm:text-lg leading-relaxed text-foreground">
                  This cycle not only wastes money but also <strong>damages your devices in the long run</strong>. Modern smartphones and laptops require fast charging standards, but ordinary cables can't keep up.
                </p>
              </div>
            </section>

            {/* The dekord Difference */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-600" />
                The dekord Difference – Why We Stand Out
              </h2>
              <p className="text-lg font-semibold text-foreground mb-6">
                At dekord, every cable is built to defy ordinary.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Braided Strength", desc: "Reinforced with nylon polyester threads for durability" },
                  { title: "Pure Copper Wiring", desc: "Ensures stable current and fast charging speeds" },
                  { title: "Double Insulation", desc: "Protects against overheating and short circuits" },
                  { title: "Premium Design", desc: "Looks stylish while staying tough" },
                  { title: "Warranty Included", desc: "1-year warranty + 30-day return policy" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-white rounded-lg border border-border p-5 shadow-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-foreground mb-1">✔ {feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Product Image */}
            <div className="my-12 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full aspect-video bg-neutral-100">
                <Image
                  src="/braided-cable-coiled-aesthetic-still.jpg"
                  alt="dekord braided USB-C 60W cable"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3 italic">
                dekord braided USB-C 60W cable
              </p>
            </div>

            {/* Introducing W-60 */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8" />
                Introducing the dekord W-60
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our first product, the <strong className="text-foreground">dekord W-60</strong>, is more than just a cable.
              </p>

              <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 text-white rounded-xl p-6 sm:p-8 shadow-lg">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg"><strong>60W power delivery</strong> for smartphones, tablets, and even some laptops.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg"><strong>480 Mbps data transfer speed</strong> for quick syncing.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg"><strong>30,000+ bend test certified</strong> for durability.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-base sm:text-lg"><strong>Universal compatibility</strong> with Android, iPad, laptops, and accessories.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Our Future */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                Our Future – From Cables to Full Premium Accessories
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                We're just getting started. While our first step is premium braided cables, dekord's roadmap is ambitious:
              </p>

              <div className="space-y-4">
                <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2 text-lg">100W USB-C Cables</h4>
                  <p className="text-muted-foreground">→ For MacBooks and high-end laptops.</p>
                </div>
                <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2 text-lg">Wireless Chargers</h4>
                  <p className="text-muted-foreground">→ Fast, safe, stylish wireless charging pads.</p>
                </div>
                <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2 text-lg">Future Smart Accessories</h4>
                  <p className="text-muted-foreground">→ Designed in Pakistan, built for the world.</p>
                </div>
              </div>
            </section>

            {/* Why Different */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Why dekord is Different from Other Local Brands
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-border p-6 sm:p-8 mb-6">
                <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
                  Pakistan has brands like Ronin, Audionic, Faster — but most rely on <strong>white labeling from China</strong>. That means they don't innovate, don't control quality, and don't compete internationally.
                </p>
                <p className="text-lg sm:text-xl font-bold text-foreground">
                  dekord is built differently.
                </p>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                We design with purpose, test rigorously, and back every product with warranty. Our goal is not only to serve Pakistan but also to <strong className="text-foreground">create a global tech accessories brand from Peshawar</strong>.
              </p>
            </section>

            {/* Trust Matters */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                Trust Matters – Our Warranty Promise
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                Every dekord product comes with:
              </p>

              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-lg border-2 border-green-500 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-6 h-6 text-green-600" />
                    <h4 className="font-bold text-foreground text-lg">1-Year Flat Warranty</h4>
                  </div>
                  <p className="text-muted-foreground">Against defects and manufacturing issues.</p>
                </div>
                <div className="bg-white rounded-lg border-2 border-blue-500 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h4 className="font-bold text-foreground text-lg">30-Day Return Policy</h4>
                  </div>
                  <p className="text-muted-foreground">If you're not satisfied, return it hassle-free.</p>
                </div>
              </div>

              <div className="bg-neutral-100 rounded-xl border border-border p-6">
                <p className="text-base sm:text-lg leading-relaxed text-foreground">
                  This isn't common in Pakistan's accessory market — but we believe in <strong>standing behind what we create</strong>.
                </p>
              </div>
            </section>

            {/* Product Image 2 */}
            <div className="my-12 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full aspect-video bg-neutral-100">
                <Image
                  src="/cable-close-up-connector-detail.jpg"
                  alt="dekord cable 60 watt USB-C"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3 italic">
                dekord cable 60 watt USB-C
              </p>
            </div>

            {/* Join the Movement */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Join the Movement – Defy Ordinary
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  dekord is more than just cables. It's about <strong className="text-foreground">raising standards, building trust</strong>, and proving that Pakistan can create tech products that stand tall internationally.
                </p>
                <p className="text-lg font-semibold text-foreground">
                  We invite you to:
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 bg-white rounded-lg border border-border p-5 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground">Visit <Link href="https://dekord.online" className="font-bold hover:underline">dekord.online</Link> and explore our collection.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg border border-border p-5 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground">Follow us on social media for updates.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg border border-border p-5 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground">Be part of a journey where we <strong>defy ordinary together</strong>.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 text-white rounded-xl p-8 text-center shadow-xl">
              <p className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Defy Ordinary?
              </p>
              <p className="text-lg opacity-90 mb-6">
                Experience premium quality with the dekord W-60
              </p>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-lg font-bold text-lg hover:opacity-90 transition-all duration-200"
              >
                Explore Our Products
                <ArrowLeft className="w-5 h-5 rotate-180" />
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
                The dekord team is dedicated to bringing premium quality tech accessories to Pakistan. We're building a brand that defies ordinary and sets new standards for reliability and performance.
              </p>
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  )
}

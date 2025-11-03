"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Rocket, Zap, Shield, TrendingUp, Globe, CheckCircle2 } from "lucide-react"

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
              <time dateTime="2025-10-01">October 1, 2025</time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>dekord Team</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-foreground text-background text-xs font-semibold">
              Product Launch
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Dekord is Launching Soon
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Pakistan deserves world-class technology made right here at home. The era of cheap, unreliable cables ends now.
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
              src="/braided-cable-coiled-aesthetic-still.jpg"
              alt="Dekord W-60 Cable"
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
                At Dekord, we believe Pakistan deserves world-class technology made right here at home. For too long, our local market has been flooded with cheap, low-quality imported cables that fail quickly, damage devices, and offer no warranty or support.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-foreground font-semibold">
                That ends now.
              </p>
            </div>

            {/* Launch Announcement */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-foreground to-neutral-800 text-background rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Rocket className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                      Official Launch Announcement
                    </h2>
                    <p className="text-lg opacity-90 mb-4">
                      We are proud to announce that <strong>Dekord (SMC-Private) Limited</strong> is officially launching its first flagship product this October:
                    </p>
                    <div className="bg-background text-foreground rounded-lg p-6 mt-4">
                      <p className="text-xl font-bold">
                        👉 The Dekord W-60 — a 60W braided USB-C fast charging cable engineered to deliver durability, safety, and style.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Dekord */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8" />
                Why Dekord?
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p>
                  Every year, Pakistan imports <strong className="text-foreground">$30–50 million worth</strong> of charging cables and accessories — almost all from China. Local players either white-label cheap imports or settle for subpar quality. Very few brands invest in building premium, reliable, warranty-backed products that can compete on international standards.
                </p>
                <p className="text-xl font-bold text-foreground">
                  That's where Dekord comes in.
                </p>
                <p>
                  We're not just another accessories brand.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-border p-6 sm:p-8 my-8">
                <p className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed">
                  We're a <span className="text-blue-600">Peshawar-based tech startup</span> with a vision: to build a state-of-the-art tech manufacturing company in Pakistan that can one day compete with global leaders like Anker and Ugreen.
                </p>
              </div>
            </section>

            {/* Our Promise */}
            <section className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Our Promise
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                Our journey starts small, but with a big promise: To deliver premium charging cables that are:
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  "Built with pure copper cores (not cheap alloys)",
                  "Braided in high-strength nylon for 30,000+ bend durability",
                  "Power Delivery (PD) certified for safe 60W fast charging",
                  "Backed by a 1-year warranty and 30-day return policy — because we stand behind our product"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 bg-white rounded-lg border border-border p-4 shadow-sm"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* The Product */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                🔌 The Product: Dekord W-60
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                The Dekord W-60 isn't just another USB-C cable. It's designed for the modern lifestyle:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { title: "60W Power Delivery", desc: "Charge laptops, tablets, and phones at lightning speed" },
                  { title: "480Mbps Data Transfer", desc: "Seamless file transfers between devices" },
                  { title: "Premium Nylon Braiding", desc: "Double-layered for extra protection and tangle-free use" },
                  { title: "Universal Compatibility", desc: "Works with Samsung, Xiaomi, Realme, OnePlus, MacBook, iPad, and more" },
                  { title: "30,000+ Bends Tested", desc: "Engineered for long life and heavy daily use" },
                  { title: "1-Year Warranty", desc: "A promise no local cable brand in Pakistan offers at this price" }
                ].map((feature, index) => (
                  <div key={index} className="bg-white rounded-lg border border-border p-5 shadow-sm">
                    <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-foreground text-background rounded-xl p-6 text-center">
                <p className="text-lg mb-4">Ready to experience the difference?</p>
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-background text-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
                >
                  Check out the Dekord W-60 cable
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </section>

            {/* Launching From Peshawar */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8" />
                Launching From Peshawar to the World
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                We're not stopping at just one cable. Dekord's roadmap includes:
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-border shadow-sm">
                  <TrendingUp className="w-5 h-5 text-foreground flex-shrink-0" />
                  <span className="text-foreground">The upcoming Dekord W-100 (100W USB-C fast charging cable)</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-border shadow-sm">
                  <TrendingUp className="w-5 h-5 text-foreground flex-shrink-0" />
                  <span className="text-foreground">A line of premium wireless chargers</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-border shadow-sm">
                  <TrendingUp className="w-5 h-5 text-foreground flex-shrink-0" />
                  <span className="text-foreground">More innovative tech accessories designed with performance and aesthetics in mind</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-xl border border-border">
                <p className="text-xl font-bold text-foreground text-center">
                  Our mission is simple: Build world-class tech, starting from Peshawar, Pakistan.
                </p>
              </div>
            </section>

            {/* How to Get Yours */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                🛒 How to Get Yours
              </h2>
              <div className="bg-white rounded-xl border border-border p-6 sm:p-8 shadow-sm space-y-4">
                <p className="text-lg font-semibold text-foreground">
                  Dekord will officially launch mid-October 2025.
                </p>
                <p className="text-base text-muted-foreground">
                  Orders will be available exclusively on our website 👉 <Link href="https://dekord.online" className="text-foreground font-semibold hover:underline">https://dekord.online</Link>
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-muted-foreground">Nationwide delivery across Pakistan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-muted-foreground">Flat shipping rate of ₨200</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-muted-foreground">Secure payments (COD + prepaid options)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Be Part of the Journey */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                ✨ Be Part of the Journey
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-6">
                We're more than just a product launch — we're building a movement. A movement where Pakistan doesn't just consume imported tech, but creates its own.
              </p>
              <p className="text-lg font-semibold text-foreground mb-4">Follow us on our journey:</p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="px-6 py-3 bg-white rounded-lg border border-border hover:shadow-md transition-shadow text-foreground font-medium">
                  Dekord Instagram
                </a>
                <a href="#" className="px-6 py-3 bg-white rounded-lg border border-border hover:shadow-md transition-shadow text-foreground font-medium">
                  Dekord Facebook
                </a>
                <a href="#" className="px-6 py-3 bg-white rounded-lg border border-border hover:shadow-md transition-shadow text-foreground font-medium">
                  Dekord LinkedIn
                </a>
              </div>
              <p className="text-base text-muted-foreground mt-6">
                And don't forget to sign up for updates on <Link href="https://dekord.online" className="text-foreground font-semibold hover:underline">https://dekord.online</Link> to be the first to know when Dekord W-60 goes live.
              </p>
            </section>

            {/* Final Word */}
            <section className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Rocket className="w-8 h-8" />
                Final Word
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                <p className="text-xl font-bold text-foreground">
                  Dekord isn't just a cable — it's a statement.
                </p>
                <p>
                  A statement that Pakistan can build premium tech, designed with passion, tested with precision, and delivered with trust.
                </p>
                <p className="text-xl font-bold text-foreground">
                  This October, join us in making history.
                </p>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 text-white rounded-xl p-8 text-center shadow-xl">
              <p className="text-2xl font-bold mb-4">
                👉 Dekord W-60 launches soon — reserve yours today.
              </p>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-lg font-bold text-lg hover:opacity-90 transition-all duration-200"
              >
                Reserve Your W-60
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
                The dekord team is on a mission to build world-class tech accessories from Peshawar, Pakistan. We're committed to quality, innovation, and making technology more reliable for everyone.
              </p>
            </div>
          </div>
        </motion.div>
      </article>
    </main>
  )
}

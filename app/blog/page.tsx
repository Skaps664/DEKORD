"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BookOpen, Calendar, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    slug: "dekord-where-love-meets-hard-work",
    title: "dekord: Where Love Meets Hard Work",
    excerpt: "Every product we create is a promise. A promise that you won't have to deal with frayed cables, slow charging, or unreliable connections. We test, refine, and perfect until we're confident you'll love what we've built.",
    date: "November 3, 2025",
    author: "dekord Team",
    image: "/premium-braided-cable-lifestyle.jpg",
    category: "Brand Story"
  },
  {
    slug: "dekord-launching-soon",
    title: "Dekord is Launching Soon",
    excerpt: "At Dekord, we believe Pakistan deserves world-class technology made right here at home. We are proud to announce that Dekord (SMC-Private) Limited is officially launching its first flagship product this October.",
    date: "October 1, 2025",
    author: "dekord Team",
    image: "/braided-cable-coiled-aesthetic-still.jpg",
    category: "Product Launch"
  },
  {
    slug: "dekord-defy-ordinary",
    title: "dekord – Defy Ordinary: Premium Charging Cables in Pakistan",
    excerpt: "Why should Pakistan always settle for ordinary? We're building the country's first premium charging accessories brand — one that focuses on durability, performance, and trust.",
    date: "September 15, 2025",
    author: "dekord Team",
    image: "/premium-braided-cable-lifestyle.jpg",
    category: "Brand Story"
  }
]

export default function BlogPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
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

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative w-full aspect-video overflow-hidden bg-neutral-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-foreground text-background text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <time>{post.date}</time>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-neutral-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
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

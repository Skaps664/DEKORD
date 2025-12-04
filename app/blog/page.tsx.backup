"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BookOpen, Calendar, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getBlogPosts } from "@/lib/services/blog"
import type { BlogPost } from "@/lib/types/database"

export default function BlogPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterIsSubmitting, setNewsletterIsSubmitting] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState("")

  useEffect(() => {
    loadBlogPosts()
  }, [])

  async function loadBlogPosts() {
    try {
      const { data, error } = await getBlogPosts({ pageSize: 100 })
      if (data) {
        setBlogPosts(data)
      }
      if (error) {
        console.error('Error loading blog posts:', error)
      }
    } catch (err) {
      console.error('Failed to load blog posts:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleNewsletterSubscribe(e: React.FormEvent) {
    e.preventDefault()
    
    if (!newsletterEmail) return

    setNewsletterIsSubmitting(true)
    setNewsletterMessage("")

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail.toLowerCase(),
          source: 'blog'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setNewsletterMessage("Thank you for subscribing! You'll be notified when we publish new articles.")
        setNewsletterEmail("")
        setTimeout(() => setNewsletterMessage(""), 5000)
      } else {
        setNewsletterMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setNewsletterMessage('Failed to subscribe. Please try again.')
    } finally {
      setNewsletterIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen  grain-texture">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 "
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
      <section className="py-12">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
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
                          src={post.featured_image || '/premium-braided-cable-lifestyle.jpg'}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-foreground text-background text-xs font-semibold">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <time>
                              {post.published_at 
                                ? new Date(post.published_at).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })
                                : 'Recent'}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author_name || 'dekord Team'}</span>
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
          )}
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
            {newsletterMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 text-sm ${newsletterMessage.includes('Thank') ? 'text-green-600' : 'text-red-600'}`}
              >
                {newsletterMessage}
              </motion.p>
            )}
            <form onSubmit={handleNewsletterSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-2xl border border-border/50 bg-background focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground min-w-0"
                required
                disabled={newsletterIsSubmitting}
              />
              <button 
                type="submit"
                disabled={newsletterIsSubmitting}
                className="px-6 py-3 bg-foreground text-background rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-0"
              >
                {newsletterIsSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            <style jsx>{`
              @media (max-width: 480px) {
                form {
                  flex-direction: column !important;
                  gap: 0.5rem !important;
                }
                input, button {
                  width: 100% !important;
                  min-width: 0 !important;
                }
              }
              @media (min-width: 481px) {
                form {
                  flex-direction: row !important;
                  gap: 0.75rem !important;
                }
                input {
                  width: auto !important;
                  flex: 1 1 0% !important;
                  min-width: 0 !important;
                }
                button {
                  width: auto !important;
                  min-width: 0 !important;
                }
              }
            `}</style>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

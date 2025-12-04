"use client"

import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/lib/types/database"
import { marked } from "marked"
import DOMPurify from "dompurify"

// Configure marked options
marked.setOptions({
  breaks: false,
  gfm: true,
})

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  // Convert Markdown to HTML
  const htmlContent = useMemo(() => {
    if (!post?.content) return ''
    
    try {
      const rawHtml = marked.parse(post.content) as string
      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ADD_TAGS: ['img', 'iframe'],
        ADD_ATTR: ['target', 'loading', 'decoding'],
      })
      
      return cleanHtml
    } catch (err) {
      console.error('Error parsing markdown:', err)
      return post.content
    }
  }, [post?.content])

  return (
    <main className="min-h-screen bg-background grain-texture pt-16 md:pt-18">
      {/* Blog Post Content */}
      <article className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Category Badge */}
          {post.category && (
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-semibold">
                {post.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author_name || 'dekord Team'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
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
            {post.read_time_minutes && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.read_time_minutes} min read</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{post.view_count} views</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 bg-neutral-100"
            >
              <Image
                src={post.featured_image}
                alt={post.featured_image_alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
              {post.excerpt}
            </div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-xl prose-neutral max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-8
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-8
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-6
              prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4
              prose-p:text-xl prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground
              prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-bold
              prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 
              prose-code:rounded prose-code:text-base prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:my-8
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:text-foreground
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:my-3 prose-li:text-xl prose-li:leading-relaxed
              prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </article>

      {/* Back to Blog Footer */}
      <div className="container-custom pb-20">
        <div className="max-w-4xl mx-auto pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Posts</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

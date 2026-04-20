import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"
import { getBlogPostBySlugServer, getAllBlogSlugs } from "@/lib/services/blog.server"
import { BlogPostClient } from "./blog-post-client"
import { generateBreadcrumbSchema } from "@/lib/breadcrumb-schema"

export const revalidate = 3600 // Revalidate every hour

const getBlogPostBySlugCached = cache(async (slug: string) => {
  return getBlogPostBySlugServer(slug)
})

export async function generateStaticParams() {
  const { data: slugs } = await getAllBlogSlugs()
  if (!slugs) return []
  return slugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data: post } = await getBlogPostBySlugCached(slug)

  if (!post) {
    return {
      title: "Blog Post Not Found | dekord",
      description: "The blog post you are looking for does not exist.",
    }
  }

  const metaTitle = post.meta_title || post.title || "dekord Blog – Premium Charging Cables"
  const metaDescription = post.meta_description || post.excerpt || "Read the latest from dekord: premium charging cables, tech tips, and more."
  const metaImage = post.featured_image || "/premium-braided-cable-lifestyle.jpg"
  const canonicalUrl = `https://dekord.online/blog/${post.slug}`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "dekord",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      type: "article",
      publishedTime: post.published_at || undefined,
      authors: [post.author_name || "dekord Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: post, error } = await getBlogPostBySlugCached(slug)

  if (error || !post) {
    notFound()
  }

  // Strip inline base64 data URIs to reduce ISR page size (can be 30MB+)
  // Uses indexOf loop instead of regex to avoid stack overflow on huge strings
  const PLACEHOLDER = 'src="/placeholder-blog-image.svg" loading="lazy" data-stripped="true"'
  const MARKER = 'src="data:image/'
  let lightContent = post.content || ''
  let hasStrippedImages = false
  let idx = lightContent.indexOf(MARKER)
  while (idx !== -1) {
    const quoteEnd = lightContent.indexOf('"', idx + 5) // skip past src="
    if (quoteEnd === -1) break
    // Only strip if the data URI is actually large (>100 chars)
    if (quoteEnd - idx > 100) {
      hasStrippedImages = true
      lightContent = lightContent.substring(0, idx) + PLACEHOLDER + lightContent.substring(quoteEnd + 1)
    }
    idx = lightContent.indexOf(MARKER, idx + PLACEHOLDER.length)
  }
  const lightPost = { ...post, content: lightContent }

  const metaTitle = post.meta_title || post.title || "dekord Blog – Premium Charging Cables"
  const metaDescription = post.meta_description || post.excerpt || "Read the latest from dekord."
  const metaImage = post.featured_image || "/premium-braided-cable-lifestyle.jpg"
  const canonicalUrl = `https://dekord.online/blog/${post.slug}`

  // Breadcrumb schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` }
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": metaTitle,
            "image": [metaImage],
            "description": metaDescription,
            "author": {
              "@type": "Person",
              "name": post.author_name || "dekord Team"
            },
            "datePublished": post.published_at,
            "dateModified": post.updated_at || post.published_at,
            "publisher": {
              "@type": "Organization",
              "name": "dekord",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dekord.online/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            },
            "articleBody": post.excerpt,
            "keywords": post.tags?.join(', ') || ""
          })
        }}
      />
      <BlogPostClient post={lightPost} hasStrippedImages={hasStrippedImages} />
    </>
  )
}

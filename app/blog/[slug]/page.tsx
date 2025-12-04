import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogPostBySlugServer, getAllBlogSlugs, incrementBlogView } from "@/lib/services/blog.server"
import { BlogPostClient } from "./blog-post-client"
import { generateBreadcrumbSchema } from "@/lib/breadcrumb-schema"

export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const { data: slugs } = await getAllBlogSlugs()
  if (!slugs) return []
  return slugs
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: post } = await getBlogPostBySlugServer(params.slug)

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post, error } = await getBlogPostBySlugServer(params.slug)

  if (error || !post) {
    notFound()
  }

  // Increment view count (fire and forget - don't await)
  incrementBlogView(post.id).catch(err => console.error('Failed to increment view:', err))

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
            "wordCount": post.content?.split(/\s+/).length || 0,
            "articleBody": post.excerpt,
            "keywords": post.tags?.join(', ') || ""
          })
        }}
      />
      <BlogPostClient post={post} />
    </>
  )
}

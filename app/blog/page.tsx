import type { Metadata } from "next"
import { getBlogPostsServer } from "@/lib/services/blog.server"
import { BlogPageClient } from "./blog-client"

export const metadata: Metadata = {
  title: "Blog | dekord – Insights, Tips & Updates",
  description: "Stay updated with the latest news, tips, and insights from dekord. Learn about cable care, tech trends, and premium lifestyle accessories.",
  keywords: "dekord blog, tech blog, cable care tips, USB-C insights, tech lifestyle, premium accessories",
  openGraph: {
    title: "Blog | dekord – Insights, Tips & Updates",
    description: "Stay updated with the latest news, tips, and insights from dekord.",
    url: "https://dekord.online/blog",
    siteName: "dekord",
    images: [
      {
        url: "/premium-braided-cable-lifestyle.jpg",
        width: 1200,
        height: 630,
        alt: "dekord Blog",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | dekord",
    description: "Insights, tips, and updates from dekord.",
    images: ["/premium-braided-cable-lifestyle.jpg"],
  },
  alternates: {
    canonical: "https://dekord.online/blog",
  },
}

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const { data: blogPosts } = await getBlogPostsServer({ pageSize: 100 })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "dekord Blog",
            "description": "Stay updated with the latest news, tips, and insights from dekord.",
            "url": "https://dekord.online/blog",
            "publisher": {
              "@type": "Organization",
              "name": "dekord",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dekord.online/logo.png"
              }
            },
            "blogPost": blogPosts?.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "image": post.featured_image || "/premium-braided-cable-lifestyle.jpg",
              "datePublished": post.published_at,
              "author": {
                "@type": "Person",
                "name": post.author_name || "dekord Team"
              },
              "url": `https://dekord.online/blog/${post.slug}`
            })) || []
          })
        }}
      />
      <BlogPageClient blogPosts={blogPosts || []} />
    </>
  )
}

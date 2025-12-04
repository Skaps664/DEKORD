import { getAllProductsServer } from "../lib/services/products.server"
import { getBlogPostsServer } from "../lib/services/blog.server"
import { getAllCollectionsServer } from "../lib/services/collections.server"
import { getAllMerchServer } from "../lib/services/merch.server"
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dekord.online"

  // Static pages
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/warranty-policy",
    "/catalog",
    "/collections",
    "/blog",
    "/merch",
    "/corporate-queries",
    "/privacy-policy",
    "/terms-of-service",
    "/shipping-policy",
    "/return-policy",
    "/refund-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/catalog" || route === "/collections" ? "daily" as const : "weekly" as const,
    priority:
      route === "" ? 1.0 :
      route === "/catalog" ? 0.9 :
      route === "/collections" ? 0.9 :
      route === "/merch" ? 0.8 :
      route === "/blog" ? 0.7 :
      route.includes("policy") || route.includes("terms") ? 0.3 :
      0.6,
  }))

  // Dynamic product pages
  const { data: products } = await getAllProductsServer()
  const productRoutes = (products || []).map((product: any) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: product?.is_featured ? 0.95 : 0.85,
  }))

  // Dynamic blog pages
  const { data: blogPosts } = await getBlogPostsServer({ pageSize: 1000 })
  const blogRoutes = (blogPosts || []).map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at || new Date()),
    changeFrequency: "monthly" as const,
    priority: post?.is_featured ? 0.75 : 0.65,
  }))

  // Dynamic collection pages
  const { data: collections } = await getAllCollectionsServer()
  const collectionRoutes = (collections || []).map((collection: any) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date(collection.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  // Dynamic merch pages
  const { data: merchItems } = await getAllMerchServer()
  const merchRoutes = (merchItems || []).map((item: any) => ({
    url: `${baseUrl}/merch/${item.slug}`,
    lastModified: new Date(item.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Combine all routes
  return [
    ...staticRoutes,
    ...productRoutes,
    ...collectionRoutes,
    ...merchRoutes,
    ...blogRoutes,
  ]
}

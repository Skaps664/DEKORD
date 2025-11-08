import { getAllProducts } from "../lib/services/products"
import { getBlogPosts } from "../lib/services/blog"
import { getAllCollections } from "../lib/services/collections"

export default async function sitemap() {
  const baseUrl = "https://dekord.online"

  // Static pages
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/warranty",
    "/shop",
    "/product",
    "/collections",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changefreq: "weekly",
    priority: route === "" ? 1 : 0.8,
  }))

  // Dynamic product pages
  const { data: products } = await getAllProducts()
  const productRoutes = (products || []).map((product: any) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updated_at || new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.9,
  }))

  // Dynamic blog pages
  const { data: blogPosts } = await getBlogPosts({ pageSize: 100 })
  const blogRoutes = (blogPosts || []).map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.published_at || new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.7,
  }))

  // Dynamic collection pages
  const { data: collections } = await getAllCollections()
  const collectionRoutes = (collections || []).map((collection: any) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: collection.updated_at || new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.7,
  }))

  // Combine all routes
  return [
    ...staticRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...collectionRoutes,
  ]
}

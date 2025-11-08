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
    "/corporate-queries",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changefreq: "weekly",
    // Better priority mapping for static routes
    priority:
      route === "" ? 1.0 :
      route === "/collections" ? 0.8 :
      route === "/blog" ? 0.6 :
      0.8,
  }))

  // Dynamic product pages
  const { data: products } = await getAllProducts()
  const productRoutes = (products || []).map((product: any) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updated_at || new Date().toISOString(),
    changefreq: "weekly",
    // Assign product priority: if product has a 'featured' flag (or similar) use 0.9, else default 0.8
    priority: product?.featured ? 0.9 : 0.8,
  }))

  // Dynamic blog pages
  const { data: blogPosts } = await getBlogPosts({ pageSize: 100 })
  const blogRoutes = (blogPosts || []).map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.published_at || new Date().toISOString(),
    changefreq: "weekly",
    // Use slightly lower priority for blog posts; bump if featured
    priority: post?.featured ? 0.7 : 0.6,
  }))

  // Dynamic collection pages
  const { data: collections } = await getAllCollections()
  const collectionRoutes = (collections || []).map((collection: any) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: collection.updated_at || new Date().toISOString(),
    changefreq: "weekly",
    priority: 0.8,
  }))

  // Combine all routes
  return [
    ...staticRoutes,
    ...productRoutes,
    ...blogRoutes,
    ...collectionRoutes,
  ]
}

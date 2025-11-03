import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dekord.online'
  
  // Static pages
  const routes = [
    '',
    '/product',
    '/about',
    '/contact',
    '/shop',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // TODO: Add dynamic product pages when you have products in database
  // Example:
  // const products = await getProducts()
  // const productRoutes = products.map((product) => ({
  //   url: `${baseUrl}/product/${product.slug}`,
  //   lastModified: product.updatedAt,
  //   changeFrequency: 'daily' as const,
  //   priority: 0.9,
  // }))

  return [...routes]
}

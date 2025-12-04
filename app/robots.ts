import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/test-db',
          '/test-session',
          '/order-confirmation/', // Private order pages
          '/account', // Private account pages
          '/cart', // Dynamic cart pages
          '/checkout', // Checkout flow
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/test-db',
          '/test-session',
          '/order-confirmation/',
          '/account',
          '/cart',
          '/checkout',
        ],
      },
    ],
    sitemap: 'https://dekord.online/sitemap.xml',
  }
}

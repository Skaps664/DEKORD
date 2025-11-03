/**
 * SEO Utilities for structured data (JSON-LD)
 * Use these to enhance Google search results with rich snippets
 */

export interface ProductData {
  name: string
  description: string
  image: string
  price: number
  currency?: string
  brand?: string
  sku?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  rating?: {
    value: number
    count: number
  }
}

export function generateProductSchema(product: ProductData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'dekord',
    },
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `https://dekord.online/product/${product.sku}`,
      priceCurrency: product.currency || 'PKR',
      price: product.price,
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: 'dekord',
      },
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.value,
        reviewCount: product.rating.count,
      },
    }),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'dekord',
    image: 'https://dekord.online/logo.png',
    '@id': 'https://dekord.online',
    url: 'https://dekord.online',
    telephone: '+92-XXX-XXXXXXX', // Add your phone number
    priceRange: 'PKR 2000-15000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A2 Third Floor, New Dil Jan Plaza, Achini, Peshawar Ring Rd',
      addressLocality: 'Peshawar',
      postalCode: '25000',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0151, // Add your exact coordinates
      longitude: 71.5249,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
    sameAs: [
      'https://www.instagram.com/dekord',
      'https://www.facebook.com/dekord',
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'dekord',
    url: 'https://dekord.online',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://dekord.online/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Helper component to inject structured data into page
 */
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

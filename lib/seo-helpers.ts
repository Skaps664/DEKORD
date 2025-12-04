// SEO utility functions for structured data and meta tags

export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function generateProductAggregateRating(rating: number, reviewCount: number) {
  if (!reviewCount || reviewCount === 0) return null
  
  return {
    "@type": "AggregateRating",
    "ratingValue": rating.toFixed(1),
    "reviewCount": reviewCount,
    "bestRating": "5",
    "worstRating": "1"
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "dekord",
    "url": "https://dekord.online",
    "logo": "https://dekord.online/dekord-logo-new.png",
    "description": "Premium charging cables and tech accessories. 60W-100W power delivery cables.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A2 Third Floor, New Dil Jan Plaza, Achini, Peshawar Ring Rd",
      "addressLocality": "Peshawar",
      "postalCode": "25000",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://www.instagram.com/dekord.pk",
      "https://www.facebook.com/dekord.pk",
      "https://www.tiktok.com/@dekord.pk",
      "https://www.linkedin.com/company/dekord"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": "PK",
      "availableLanguage": ["English", "Urdu"]
    }
  }
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "dekord",
    "url": "https://dekord.online",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dekord.online/catalog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
}

// Generate canonical URL helper
export function generateCanonicalUrl(path: string): string {
  const baseUrl = 'https://dekord.online'
  // Remove trailing slash if present
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
  return `${baseUrl}${cleanPath}`
}

// Generate optimized meta description (max 160 chars)
export function truncateMetaDescription(description: string, maxLength: number = 155): string {
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength).trim() + '...'
}

// Generate meta keywords from tags
export function generateMetaKeywords(tags: string[], baseKeywords: string[] = []): string {
  const allKeywords = [...baseKeywords, ...tags].filter(Boolean)
  return allKeywords.join(', ')
}

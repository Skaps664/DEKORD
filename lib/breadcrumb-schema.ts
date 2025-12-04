// Server-side function to generate breadcrumb schema for SEO
export interface BreadcrumbItem {
  label: string
  href: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const homeItem = { label: 'Home', href: 'https://dekord.online' }
  const allItems = [homeItem, ...items.map(item => ({
    label: item.label,
    href: item.href.startsWith('http') ? item.href : `https://dekord.online${item.href}`
  }))]

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href
    }))
  }
}

import type { Metadata } from "next"
import { getAllCollectionsServer } from "@/lib/services/collections.server"
import { CollectionsPageClient } from "./collections-client"

export const metadata: Metadata = {
  title: "Collections | dekord – Premium Charging Cable Collections",
  description: "Explore dekord's curated cable collections. From premium DEK series to versatile multi-cables, discover the perfect charging solution for your lifestyle.",
  keywords: "dekord collections, charging cable collections, DEK series, WEEV series, premium cables, USB-C cables, Lightning cables",
  openGraph: {
    title: "Collections | dekord – Premium Charging Cable Collections",
    description: "Explore dekord's curated cable collections. From premium DEK series to versatile multi-cables, discover the perfect charging solution for your lifestyle.",
    url: "https://dekord.online/collections",
    siteName: "dekord",
    images: [
      {
        url: "/test-3.jpg",
        width: 1200,
        height: 630,
        alt: "dekord Collections",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Collections | dekord",
    description: "Explore dekord's curated cable collections for every need.",
    images: ["/test-3.jpg"],
  },
  alternates: {
    canonical: "https://dekord.online/collections",
  },
}

export default async function CollectionsPage() {
  const { data: collections } = await getAllCollectionsServer()

  // JSON-LD for SEO
  const collectionsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "dekord Cable Collections",
    "description": "Explore dekord's curated collections of premium charging cables",
    "url": "https://dekord.online/collections",
    "publisher": {
      "@type": "Organization",
      "name": "dekord",
      "url": "https://dekord.online"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionsSchema) }}
      />
      <CollectionsPageClient collections={collections || []} />
    </>
  )
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

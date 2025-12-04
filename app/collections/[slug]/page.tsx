import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCollectionBySlugServer, getAllCollectionSlugs } from "@/lib/services/collections.server"
import { CollectionPageClient } from "./collection-client"
import { generateBreadcrumbSchema } from "@/lib/breadcrumb-schema"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for ISR
export async function generateStaticParams() {
  const { data: collections } = await getAllCollectionSlugs()
  
  if (!collections) return []
  
  return collections.map((collection) => ({
    slug: collection.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: collection } = await getCollectionBySlugServer(slug)
  
  if (!collection) {
    return {
      title: "Collection Not Found | dekord",
      description: "The collection you're looking for doesn't exist."
    }
  }

  const metaTitle = collection.meta_title || `${collection.name} | dekord – Premium Charging Cable Collection`
  const metaDescription = collection.meta_description || collection.description || `Explore the ${collection.name} collection at dekord. Premium charging cables engineered for specific needs.`
  const metaImage = collection.banner_image || collection.image || "/dekord-logo-new.png"
  const canonicalUrl = `https://dekord.online/collections/${collection.slug}`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [collection.name, "dekord collection", "charging cables", "premium cables"].join(", "),
    authors: [{ name: "dekord" }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "dekord",
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: collection.name,
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const { data: collection, error } = await getCollectionBySlugServer(slug)
  
  if (error || !collection) {
    console.error("Failed to fetch collection:", error)
    notFound()
  }

  // Breadcrumb schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Collections', href: '/collections' },
    { label: collection.name, href: `/collections/${collection.slug}` }
  ])

  // JSON-LD Collection schema for rich snippets
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection.name,
    "description": collection.description || "",
    "url": `https://dekord.online/collections/${collection.slug}`,
    "image": collection.banner_image || collection.image,
    "numberOfItems": collection.products?.length || 0,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <CollectionPageClient collection={collection} products={collection.products || []} />
    </>
  )
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductBySlugServer, getAllProductSlugs } from "@/lib/services/products.server"
import { ProductPageClient } from "./product-client"
import { generateBreadcrumbSchema } from "@/lib/breadcrumb-schema"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for ISR
export async function generateStaticParams() {
  const { data: products } = await getAllProductSlugs()
  
  if (!products) return []
  
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data: product } = await getProductBySlugServer(slug)
  
  if (!product) {
    return {
      title: "Product Not Found | dekord",
      description: "The product you're looking for doesn't exist."
    }
  }

  const metaTitle = product.meta_title || `${product.name} | dekord – Premium Charging Cables`
  const metaDescription = product.meta_description || product.description || `Shop ${product.name} at dekord. Premium charging cables engineered for durability and style.`
  const metaImage = product.main_image || "/dekord-logo-new.png"
  const canonicalUrl = `https://dekord.online/product/${product.slug}`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [product.name, "dekord", "charging cable", "premium cable", "fast charging", product.category, ...(product.tags || [])].join(", "),
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
          alt: product.name,
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
    other: {
      "product:price:amount": product.price.toString(),
      "product:price:currency": "PKR",
    }
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const { data: product, error } = await getProductBySlugServer(slug)
  
  if (error || !product) {
    console.error("Failed to fetch product:", error)
    notFound()
  }

  // Breadcrumb schema for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Products', href: '/catalog' },
    { label: product.name, href: `/product/${product.slug}` }
  ])

  // JSON-LD Product schema for rich snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.main_image ? [product.main_image] : [],
    "description": product.description || "",
    "sku": product.sku || "",
    "brand": {
      "@type": "Brand",
      "name": "dekord"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://dekord.online/product/${product.slug}`,
      "priceCurrency": "PKR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "dekord"
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductPageClient product={product} />
    </>
  )
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600

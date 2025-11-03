/**
 * EXAMPLE: How to use SEO utilities on a product page
 * 
 * This shows how to add proper SEO to individual product pages
 * for better Google ranking and rich snippets
 */

import { Metadata } from 'next'
import { generateProductSchema, generateBreadcrumbSchema, StructuredData } from '@/lib/seo-utils'

// Example: Generate metadata for a product page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // TODO: Fetch product data from your database
  const product = {
    name: "dekord 100W USB-C Cable",
    description: "Premium braided 100W USB-C to USB-C cable. Fast charging for MacBook, iPad Pro, and more. 2m length, lifetime warranty.",
    price: 4999,
    image: "https://dekord.online/products/100w-cable.jpg"
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

// Example product page component
export default function ProductPage({ params }: { params: { slug: string } }) {
  // TODO: Fetch actual product data from database
  const product = {
    name: "dekord 100W USB-C Cable",
    description: "Premium braided 100W USB-C to USB-C cable with lifetime warranty",
    image: "https://dekord.online/products/100w-cable.jpg",
    price: 4999,
    currency: "PKR",
    sku: "DEKORD-100W-USBC",
    availability: "InStock" as const,
    rating: {
      value: 4.8,
      count: 127
    }
  }

  // Generate structured data for this product
  const productSchema = generateProductSchema(product)
  
  // Generate breadcrumb for this product
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://dekord.online" },
    { name: "Shop", url: "https://dekord.online/shop" },
    { name: "Cables", url: "https://dekord.online/shop/cables" },
    { name: product.name, url: `https://dekord.online/product/${params.slug}` }
  ])

  return (
    <>
      {/* Add structured data to page */}
      <StructuredData data={productSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      <div>
        {/* Your product page UI goes here */}
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: {product.currency} {product.price}</p>
        {/* ... rest of product page */}
      </div>
    </>
  )
}

/**
 * USAGE CHECKLIST FOR PRODUCT PAGES:
 * 
 * 1. ✅ Import generateProductSchema from @/lib/seo-utils
 * 2. ✅ Fetch your product data from database
 * 3. ✅ Generate metadata with generateMetadata()
 * 4. ✅ Add product structured data
 * 5. ✅ Add breadcrumb structured data
 * 6. ✅ Use semantic HTML (<h1>, <article>, etc.)
 * 7. ✅ Add alt text to all images
 * 8. ✅ Include customer reviews
 * 9. ✅ Add related products section
 * 10. ✅ Ensure mobile-friendly layout
 * 
 * This will help you appear in Google Shopping results
 * and get rich snippets with stars, price, and availability!
 */

import type { Metadata } from "next"
import { getAllMerchServer } from "@/lib/services/merch.server"
import { MerchPageClient } from "./merch-client"

export const metadata: Metadata = {
  title: "Merchandise | dekord – Premium Lifestyle Products",
  description: "Express your style with dekord merchandise. Premium accessories designed with the same attention to detail as our cables.",
  keywords: "dekord merch, dekord merchandise, premium accessories, lifestyle products, dekord stickers, dekord notebooks",
  openGraph: {
    title: "Merchandise | dekord – Premium Lifestyle Products",
    description: "Express your style with dekord merchandise. Premium accessories designed with the same attention to detail as our cables.",
    url: "https://dekord.online/merch",
    siteName: "dekord",
    images: [
      {
        url: "/test-4.jpg",
        width: 1200,
        height: 630,
        alt: "dekord Merchandise",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merchandise | dekord",
    description: "Premium lifestyle products from dekord.",
    images: ["/test-4.jpg"],
  },
  alternates: {
    canonical: "https://dekord.online/merch",
  },
}

export const revalidate = 3600 // Revalidate every hour

export default async function MerchPage() {
  const { data: merchItems } = await getAllMerchServer()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "dekord Merchandise",
            "description": "Express your style with dekord merchandise. Premium accessories designed with the same attention to detail as our cables.",
            "url": "https://dekord.online/merch",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": merchItems?.length || 0,
              "itemListElement": merchItems?.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": item.name,
                  "description": item.description,
                  "image": item.image_1,
                  "offers": {
                    "@type": "Offer",
                    "price": item.price,
                    "priceCurrency": "USD",
                    "availability": item.quantity_available > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                  }
                }
              })) || []
            }
          })
        }}
      />
      <MerchPageClient merchItems={merchItems || []} />
    </>
  )
}

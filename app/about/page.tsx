import type { Metadata } from "next"
import { AboutPageClient } from "./about-client"

export const metadata: Metadata = {
  title: "About dekord – Defying Ordinary Since Day One",
  description: "Learn about dekord's mission to create premium charging cables and tech accessories that blend power, durability, and style. Based in Peshawar, Pakistan, we're redefining what tech essentials should be.",
  keywords: ["about dekord", "dekord story", "premium cable manufacturer", "tech accessories Pakistan", "Peshawar tech company", "charging cable innovation"],
  alternates: {
    canonical: "https://dekord.online/about",
  },
  openGraph: {
    title: "About dekord – Defying Ordinary Since Day One",
    description: "Learn about dekord's mission to create premium charging cables and tech accessories that blend power, durability, and style.",
    url: "https://dekord.online/about",
    siteName: "dekord",
    images: [{ url: "/dekord-logo-new.png", width: 1200, height: 630, alt: "About dekord" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About dekord – Defying Ordinary Since Day One",
    description: "Learn about dekord's mission to create premium charging cables and tech accessories that blend power, durability, and style.",
    images: ["/dekord-logo-new.png"],
  },
}

export default function AboutPage() {
  // AboutPage Schema
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About dekord",
    "description": "Learn about dekord's mission to create premium charging cables and tech accessories",
    "url": "https://dekord.online/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "dekord",
      "url": "https://dekord.online",
      "logo": "https://dekord.online/dekord-logo-new.png",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Peshawar",
          "addressCountry": "Pakistan"
        }
      },
      "slogan": "Defy Ordinary",
      "description": "Premium charging cables and tech accessories that blend power, durability, and style."
    }
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutPageClient />
    </>
  )
}

import type { Metadata } from "next"
import dynamic from 'next/dynamic'
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CinematicBanner } from "@/components/cinematic-banner"
import InfiniteGallery from '@/components/infinite-gallery'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: "Defy Ordinary with dekord – Tech That Speaks Style",
  description: "Not just cables, but a vibe. dekord creates essentials that charge your life with power, durability, and style. Premium 60W-100W charging cables from Peshawar, Pakistan.",
  keywords: ["premium charging cables", "60W charging cable", "100W USB-C cable", "fast charging cables Pakistan", "dekord cables", "luxury tech accessories", "durable charging cables", "Type-C cables"],
  alternates: {
    canonical: "https://dekord.online",
  },
  openGraph: {
    title: "Defy Ordinary with dekord – Tech That Speaks Style",
    description: "Not just cables, but a vibe. dekord creates essentials that charge your life with power, durability, and style.",
    url: "https://dekord.online",
    siteName: "dekord",
    images: [{ url: "/dekord-logo-new.png", width: 1200, height: 630, alt: "dekord - Premium Charging Cables" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Defy Ordinary with dekord – Tech That Speaks Style",
    description: "Not just cables, but a vibe. dekord creates essentials that charge your life with power, durability, and style.",
    images: ["/dekord-logo-new.png"],
  },
}

// Lazy load components below the fold for better performance
const ComparisonSection = dynamic(() => import("@/components/comparison-section").then(mod => ({ default: mod.ComparisonSection })), {
  loading: () => <div className="min-h-[400px]" />
})

const CollectionStrip = dynamic(() => import("@/components/collection-strip").then(mod => ({ default: mod.CollectionStrip })), {
  loading: () => <div className="min-h-[200px]" />
})

const CredibilityBadges = dynamic(() => import("@/components/credibility-badges").then(mod => ({ default: mod.CredibilityBadges })), {
  loading: () => <div className="min-h-[300px]" />
})

const MaterialsSection = dynamic(() => import("@/components/materials-section").then(mod => ({ default: mod.MaterialsSection })), {
  loading: () => <div className="min-h-screen" />
})

const NewsletterSection = dynamic(() => import("@/components/newsletter-section").then(mod => ({ default: mod.NewsletterSection })), {
  loading: () => <div className="min-h-[400px]" />
})

const FullBleedDuo = dynamic(() => import("@/components/full-bleed-duo").then(mod => ({ default: mod.FullBleedDuo })), {
  loading: () => <div className="min-h-[600px]" />
})

const FAQsSection = dynamic(() => import("@/components/faqs-section").then(mod => ({ default: mod.FAQsSection })), {
  loading: () => <div className="min-h-[600px]" />
})

const UserVideoReviews = dynamic(() => import("@/components/user-video-reviews").then(mod => ({ default: mod.UserVideoReviews })), {
  loading: () => <div className="min-h-[400px]" />
})

const InstagramFeed = dynamic(() => import("@/components/instagram-feed").then(mod => ({ default: mod.InstagramFeed })), {
  loading: () => <div className="min-h-[400px]" />
})

const SocialFollow = dynamic(() => import("@/components/social-follow").then(mod => ({ default: mod.SocialFollow })), {
  loading: () => <div className="min-h-[200px]" />
})

export default function HomePage() {
  // FAQ Schema for homepage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes dekord cables different?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "dekord cables feature premium braided nylon construction, 60W-100W power delivery, universal compatibility, and industry-leading durability. Each cable is designed to be both functional and stylish."
        }
      },
      {
        "@type": "Question",
        "name": "Do dekord cables support fast charging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! All dekord cables support fast charging with power delivery up to 100W, compatible with iPhone 15, Samsung Galaxy, MacBook, iPad, and other USB-C devices."
        }
      },
      {
        "@type": "Question",
        "name": "Where is dekord located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "dekord is based in Peshawar, Pakistan. We ship premium charging cables and tech accessories across Pakistan and internationally."
        }
      },
      {
        "@type": "Question",
        "name": "What is your warranty policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a comprehensive warranty on all dekord products. Check our warranty policy page for full details on coverage and claims process."
        }
      }
    ]
  }
  
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
  return (
    <main className="min-h-screen">
      {/* Header removed: now provided by layout */}
      <HeroSection />
      <FeaturedProducts />
      <CinematicBanner />
      <ComparisonSection />
      <CollectionStrip />
      <CredibilityBadges />
      <MaterialsSection />
      <FAQsSection />
{/* <NewsletterSection /> */}
      <FullBleedDuo
        left={{ src: "/duo-1.webp", alt: "Minimalist oak chair" }}
        right={{ src: "/duo-3.webp", alt: "Modern walnut table" }}
      />
      <UserVideoReviews />
      {/* <InstagramFeed /> */}
      <SocialFollow />
      <SocialFollow />
      {/* Footer removed: now provided by layout */}
    </main>
  )
}

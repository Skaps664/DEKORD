"use client"
import dynamic from 'next/dynamic'
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CinematicBanner } from "@/components/cinematic-banner"

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

export default function HomePage() {
  const sampleImages = [
    { src: "/1.webp", alt: "Device hinge and button macro" },
    { src: "/2.webp", alt: "Ribbed camera bar with lens" },
    { src: "/3.webp", alt: "Minimal controller front view" },
    { src: "/4.webp", alt: "Control panel with metal knobs" },
    { src: "/5.webp", alt: "Dual thumbsticks R21 macro" },
  ]

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
      <NewsletterSection />
      <FullBleedDuo
        left={{ src: "/minimalist-oak-chair.jpg", alt: "Minimalist oak chair" }}
        right={{ src: "/modern-walnut-table.jpg", alt: "Modern walnut table" }}
        priority
      />
      <FAQsSection />
      <UserVideoReviews />
      <InstagramFeed />
      {/* Footer removed: now provided by layout */}
    </main>
  )
}

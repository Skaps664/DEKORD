"use client"
import dynamic from 'next/dynamic'
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CinematicBanner } from "@/components/cinematic-banner"
import InfiniteGallery from '@/components/infinite-gallery'
import { Reveal } from '@/components/reveal'

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
      {/* Footer removed: now provided by layout */}
    </main>
  )
}

import type { Metadata } from "next"
import { PreLaunchHero } from "@/components/pre-launch/hero"
import { PreLaunchFeatures } from "@/components/pre-launch/features"
import { PreLaunchProducts } from "@/components/pre-launch/products"
import { PreLaunchBenefits } from "@/components/pre-launch/benefits"
import { PreLaunchTimeline } from "@/components/pre-launch/timeline"
import { PreLaunchSubscribe } from "@/components/pre-launch/subscribe"
import { PreLaunchFAQ } from "@/components/pre-launch/faq"
import { PreLaunchCTA } from "@/components/pre-launch/cta"
import { TickerStripes } from "@/components/ticker-stripes"

export const metadata: Metadata = {
  title: "Pre-Launch - Be the First to Experience dekord | Exclusive Early Access",
  description: "Join the dekord revolution! Get exclusive early access to our premium charging cables, special launch discounts, and be part of something extraordinary from Peshawar, Pakistan.",
  keywords: [
    "dekord pre-launch",
    "early access charging cables",
    "pre-order dekord",
    "exclusive tech launch Pakistan",
    "premium cable pre-launch",
    "dekord waitlist",
    "first access dekord"
  ],
  openGraph: {
    title: "Pre-Launch - Be the First to Experience dekord",
    description: "Join the dekord revolution! Get exclusive early access, special launch discounts, and premium charging cables.",
    url: "https://dekord.online/pre-launch",
    siteName: "dekord",
    images: [
      {
        url: "/test-11.webp",
        width: 1200,
        height: 630,
        alt: "dekord Pre-Launch - Premium Charging Cables"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pre-Launch - Be the First to Experience dekord",
    description: "Join the dekord revolution! Get exclusive early access and special launch discounts.",
    images: ["/test-11.webp"],
  },
}

export default function PreLaunchPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <PreLaunchHero />
      <TickerStripes variant="prelaunch" />
      <PreLaunchFeatures />
      <PreLaunchProducts />
      <PreLaunchBenefits />
      <PreLaunchTimeline />
      <PreLaunchSubscribe />
      <PreLaunchFAQ />
      <PreLaunchCTA />
    </main>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import FacebookPixel from "@/components/facebook-pixel"
import { CartProvider } from "@/contexts/cart-context"
import { Analytics } from '@vercel/analytics/react'


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ['monospace'],
  adjustFontFallback: true,
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
  preload: false,
  fallback: ['serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dekord.online'),
  title: {
    default: "Defy Ordinary with dekord – Tech That Speaks Style",
    template: "%s | dekord"
  },
  description: "Not just cables, but a vibe. dekord creates essentials that charge your life with power, durability, and style. Defy Ordinary, every single day. Premium 60W-100W charging cables from Peshawar.",
  keywords: [
    "premium charging cables",
    "60W charging cable",
    "100W USB-C cable",
    "fast charging cables Pakistan",
    "dekord cables",
    "luxury tech accessories",
    "durable charging cables",
    "data cables Peshawar",
    "USB-C cables",
    "Type-C cables"
  ],
  authors: [{ name: "dekord" }],
  creator: "dekord",
  publisher: "dekord",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://dekord.online",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://dekord.online",
    siteName: "dekord",
    title: "Defy Ordinary with dekord – Tech That Speaks Style",
    description: "Not just cables, but a vibe. dekord creates essentials that charge your life with power, durability, and style. Defy Ordinary, every single day.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "dekord - Premium Charging Cables & Tech Accessories",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Defy Ordinary with dekord – Tech That Speaks Style",
    description: "Not just cables, but a vibe. dekord creates essentials that charge your life with power, durability, and style.",
    images: ["/og-image.jpg"],
    creator: "@dekord",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Structured data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "dekord",
    "url": "https://dekord.online",
    "logo": "https://dekord.online/logo.png",
    "description": "Premium charging cables and tech accessories. 60W-100W power delivery cables.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "A2 Third Floor, New Dil Jan Plaza, Achini, Peshawar Ring Rd",
      "addressLocality": "Peshawar",
      "postalCode": "25000",
      "addressCountry": "PK"
    },
    "sameAs": [
      "https://www.instagram.com/dekord",
      "https://www.facebook.com/dekord",
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": "PK",
      "availableLanguage": ["English", "Urdu"]
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden grain-texture">
        <FacebookPixel />
        <CartProvider>
          <Header />
          <main role="main">{children}</main>
          <Analytics />
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}

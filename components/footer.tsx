"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Instagram, Facebook, Linkedin, ArrowUpRight, Mail } from "lucide-react"

// TikTok icon component (Lucide doesn't have TikTok, so we'll use SVG)
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [footerEmail, setFooterEmail] = useState("")
  const [footerIsSubmitting, setFooterIsSubmitting] = useState(false)
  const [footerMessage, setFooterMessage] = useState("")

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!footerEmail) return

    setFooterIsSubmitting(true)
    setFooterMessage("")

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: footerEmail.toLowerCase(),
          source: 'footer'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setFooterMessage("Thank you for subscribing!")
        setFooterEmail("")
        setTimeout(() => setFooterMessage(""), 3000)
      } else {
        setFooterMessage(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setFooterMessage('Failed to subscribe. Please try again.')
    } finally {
      setFooterIsSubmitting(false)
    }
  }

  const footerSections = {
    "Explore": [
      { name: "Home", href: "/" },
      {name: "About Us", href: "/about"},
    ],
    SHOP: [
      { name: "Catalog", href: "/catalog" },
      { name: "Collections", href: "/collections" },
      { name: "dek series", href: "/collections" },
      { name: "weev series", href: "/collections" },
    ],
    "Quick Links": [
      { name: "Warranty Policy", href: "/warranty-policy" },
      { name: "Return Policy", href: "/return-policy" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Shipping Policy", href: "/shipping-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Legal Info", href: "/legal-info" },
    ],
    Connect: [
      { name: "Contact Us", href: "/contact" },
      { name: "Our Blog", href: "/blog" },
    ],
  }

  const socialLinks = [
    { name: "Instagram", target:"_blank", icon: Instagram, href: "https://www.instagram.com/dekord.pk" },
    { name: "TikTok", target:"_blank", icon: TikTokIcon, href: "https://www.tiktok.com/@dekord.pk" },
    { name: "Facebook", target:"_blank", icon: Facebook, href: "https://www.facebook.com/dekord.pk" },
    { name: "LinkedIn", target:"_blank", icon: Linkedin, href: "https://www.linkedin.com/company/dekord" },
  ]

  return (
    <footer className="bg-white border-t border-white/[0.02] pt-16">
      <div className="container-custom py-12 sm:py-16 lg:py-20 px-2 sm:px-2 md:px-3">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <a href="/" className="inline-flex items-center mb-4">
                <img src="/images/loogoo.png" alt="dekord logo" className="h-7 lg:h-8 w-auto" decoding="async" />
                <span className="sr-only">{"dekord"}</span>
              </a>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Not just cables, but a vibe. dekord creates essentials that charge your life with power, durability, and style. Made in Pakistan.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={18} />
                    <span className="sr-only">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {Object.entries(footerSections).map(([section, links], index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-neutral-900 mb-2 whitespace-nowrap text-sm">{section}</h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200 group flex items-center text-xs sm:text-sm"
                        >
                          {link.name}
                          <ArrowUpRight
                            size={14}
                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white/[0.03] rounded-lg mb-8 sm:mb-10 border border-white/[0.05]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div>
              <h4 className="font-semibold text-neutral-900 text-base lg:text-lg mb-1">We send tasty emails</h4>
              <p className="text-neutral-600 text-sm">Stay updated with new arrivals and stories.</p>
              {footerMessage && (
                <p className={`text-sm mt-2 ${footerMessage.includes('Thank') ? 'text-green-600' : 'text-red-600'}`}>
                  {footerMessage}
                </p>
              )}
            </div>
            <form onSubmit={handleFooterSubscribe} className="flex w-full sm:w-auto shadow-lg">
              <input
                type="email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 sm:flex-none px-4 py-2.5 sm:py-3 bg-white/[0.05] border border-white/[0.1] rounded-l text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                required
                disabled={footerIsSubmitting}
              />
              <button
                type="submit"
                disabled={footerIsSubmitting}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-neutral-900 text-white rounded-r hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail size={16} className="sm:hidden" />
                <span className="hidden sm:inline text-sm">
                  {footerIsSubmitting ? 'Subscribing...' : 'Subscribe'}
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        
      </div>
    </footer>
  )
}

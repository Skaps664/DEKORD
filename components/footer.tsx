"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Facebook, Linkedin, ArrowUpRight, Mail, ChevronDown, ArrowRight } from "lucide-react"

// Country Selector Component
function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState("Pakistan")
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // Load saved country on mount
    const saved = localStorage.getItem('selectedCountry')
    if (saved) setSelectedCountry(saved)
  }, [])

  const countries = [
    "Pakistan",
    "UAE",
    "Saudi Arabia",
    "UK",
    "Oman",
    "Qatar",
    "Kuwait",
    "Bahrain"
  ]

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setIsOpen(false)
    localStorage.setItem('selectedCountry', country)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
      >
        <span>{selectedCountry}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-3 right-0 sm:left-0 sm:right-auto bg-white border border-neutral-200 rounded-xl shadow-xl flex flex-col p-2 min-w-[160px] z-50 origin-bottom-right sm:origin-bottom-left"
          >
            <div className="max-h-[200px] overflow-y-auto no-scrollbar flex flex-col">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => handleCountryChange(country)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                    selectedCountry === country 
                      ? 'bg-neutral-100 text-neutral-900 font-medium' 
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// TikTok icon component
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
        setFooterMessage("Thanks for signing up!")
        setFooterEmail("")
        setTimeout(() => setFooterMessage(""), 5000)
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
    Explore: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Our Blog", href: "/blog" },
    ],
    SHOP: [
      { name: "Catalog", href: "/catalog" },
      { name: "Collections", href: "/collections" },
      { name: "Our Merch", href: "/merch" },
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
      { name: "Corporate Queries", href: "/corporate-queries" },
      { name: "Careers", href: "/openings" },
    ],
  }

  const socialLinks = [
    { name: "Instagram", target:"_blank", icon: Instagram, href: "https://www.instagram.com/dekord.pk" },
    { name: "TikTok", target:"_blank", icon: TikTokIcon, href: "https://www.tiktok.com/@dekord.pk" },
    { name: "Facebook", target:"_blank", icon: Facebook, href: "https://www.facebook.com/dekord.pk" },
    { name: "LinkedIn", target:"_blank", icon: Linkedin, href: "https://www.linkedin.com/company/dekord" },
  ]

  return (
    <footer className="bg-white border-t border-neutral-200 mt-12 relative overflow-hidden">
      <div className="container-custom px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl pt-20 pb-8">
        
        {/* Clean Newsletter Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 my-12">
          <div className="max-w-xl">
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl tracking-tight text-neutral-900 mb-4"
            >
              We send tasty emails.
            </motion.h4>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 text-md leading-relaxed mix-blend-multiply"
            >
              Drop your email to stay updated with new arrivals, exclusive drops, and styling stories.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full xl:w-1/3 min-w-[320px]"
          >
            <form onSubmit={handleFooterSubscribe} className="relative flex flex-col sm:flex-row items-center justify-between bg-neutral-100 rounded-[2rem] p-1.5 focus-within:shadow-[0_0_0_2px_#171717] transition-all">
              <input
                type="email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border-transparent px-6 sm:py-3.5 py-4 text-neutral-900 placeholder:text-neutral-500 outline-none text-base"
                required
                disabled={footerIsSubmitting}
              />
              <button
                type="submit"
                disabled={footerIsSubmitting}
                className="w-full sm:w-auto h-full min-h-[48px] px-8 bg-neutral-900 text-white text-base font-medium rounded-[1.8rem] hover:bg-black hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {footerIsSubmitting ? '...' : (
                  <>
                    Subscribe
                    <ArrowRight size={18} strokeWidth={2.5} className="ml-1" />
                  </>
                )}
              </button>
            </form>
            {footerMessage && (
              <p className={`text-sm mt-3 px-4 font-medium ${footerMessage.includes('Thanks') ? 'text-green-600' : 'text-red-500'}`}>
                {footerMessage}
              </p>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-200 mb-16"></div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-16">
          
          {/* Brand & Social */}
          <div className="lg:col-span-4 lg:pr-10">
            <a href="/" className="inline-block mb-6 transition-opacity hover:opacity-80">
              <img src="/images/loogoo.png" alt="dekord logo" className="h-8 w-auto mix-blend-multiply" decoding="async" />
              <span className="sr-only">dekord</span>
            </a>
            <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-sm font-medium">
              Not just cables, but a vibe. dekord creates essentials that charge your life with power, durability, and style.
            </p>
            
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-300"
                >
                  <social.icon size={18} />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerSections).map(([section, links], index) => (
              <div key={section} className="flex flex-col">
                <h4 className="font-bold text-neutral-900 mb-6 text-xs tracking-widest uppercase">{section}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200 group flex items-center text-sm font-medium w-fit"
                      >
                        {link.name}
                        <span className="ml-[2px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <ArrowUpRight size={14} strokeWidth={2.5} />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Formatted Copyright */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-neutral-400 text-sm">
            <p className="font-medium">© {currentYear} dekord. All rights reserved.</p>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
            <p className="font-medium">
              Designed & developed by <a href="https://www.skordlabs.com" target="_blank" rel="noreferrer" className="text-neutral-600 hover:text-neutral-900 font-semibold transition-colors duration-200">Skord Labs</a>
            </p>
          </div>
          
          <CountrySelector />
        </div>

      </div>
    </footer>
  )
}

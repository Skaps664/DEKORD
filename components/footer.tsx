"use client"
import { motion } from "framer-motion"
import { Instagram, Twitter, Facebook, ArrowUpRight, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = {
    "ABOUT US": [
      { name: "Home", href: "#" },
      { name: "Catalog", href: "#" },
      { name: "Collections", href: "#" },
    ],
    SHOP: [
      { name: "Search", href: "#" },
      { name: "dek series", href: "#" },
      { name: "weev series", href: "#" },
    ],
    "Quick Links": [
      { name: "Warranty Claim", href: "#" },
      { name: "Return Policy", href: "#" },
      { name: "Refund Policy", href: "#" },
      { name: "Shipping Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Legal Info", href: "#" },
    ],
    Connect: [
      { name: "Contact Us", href: "#" },
      { name: "Our Blog", href: "#" },
    ],
  }

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
  ]

  return (
    <footer className="bg-white/[0.02] border-t border-white/[0.02] pt-8">
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
              <a href="#" className="inline-flex items-center mb-4">
                <img src="/images/new-logo.png" alt="dekord logo" className="h-7 lg:h-8 w-auto" decoding="async" />
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
            </div>
            <form className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:flex-none px-4 py-2.5 sm:py-3 bg-white/[0.05] border border-white/[0.1] rounded-l text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                required
              />
              <button
                type="submit"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-neutral-900 text-white rounded-r hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center"
              >
                <Mail size={16} className="sm:hidden" />
                <span className="hidden sm:inline text-sm">Subscribe</span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="pt-6 sm:pt-8 border-t border-neutral-200/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs sm:text-sm text-neutral-600">
            <p>© {currentYear} dekord, Powered by skordl</p>
            <div className="flex items-center gap-2">
              <a href="#" className="hover:text-neutral-900 transition-colors">
                <Instagram size={16} />
                <span className="sr-only">Instagram</span>
              </a>
              <span className="text-neutral-400">@dekord.pk</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

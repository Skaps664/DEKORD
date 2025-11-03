"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, ShoppingBag, X } from "lucide-react"
import CartDropPanel from "./cart-drop-panel"
import { TopDropMenu } from "./top-drop-menu"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Always use black icons for better visibility
  const iconColor = "text-neutral-900 hover:text-neutral-700"
  const badgeColor = "bg-neutral-900 text-white"

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "backdrop-blur-md border-b",
          isScrolled ? "bg-white/15 border-neutral-200" : "bg-white/80 border-white/20",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-16 md:h-18 px-2 sm:px-3 md:px-4">
            {/* Menu icon on left */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((v) => !v)
                setCartOpen(false)
              }}
              className="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 -ml-1 md:-ml-0.5"
            >
              {menuOpen ? (
                <X className={cn("w-5 h-5 md:w-6 md:h-6 transition-colors", iconColor)} aria-hidden="true" />
              ) : (
                <Menu className={cn("w-5 h-5 md:w-6 md:h-6 transition-colors", iconColor)} aria-hidden="true" />
              )}
            </button>

            {/* Logo centered */}
            <motion.div
              className="flex-1 flex justify-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <a href="/" className="inline-flex items-center" aria-label="dekord | defy-ordinary">
                <img src="/images/loogoo.png" alt="dekord logo" className="h-6 sm:h-7 md:h-8 w-auto" decoding="async" />
                <span className="sr-only">dekord</span>
              </a>
            </motion.div>

            {/* Cart icon with badge on right */}
            <button
              type="button"
              aria-label={cartOpen ? "Close cart" : "Open cart"}
              aria-expanded={cartOpen}
              onClick={() => {
                setCartOpen((v) => !v)
                setMenuOpen(false)
              }}
              className="flex-shrink-0 relative inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 -mr-1 md:-mr-0.5"
            >
              <ShoppingBag className={cn("w-5 h-5 md:w-6 md:h-6 transition-colors", iconColor)} aria-hidden="true" />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -top-0.5 -right-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] leading-none font-medium",
                  badgeColor,
                )}
              >
                0
              </span>
              <span className="sr-only">Cart items: 0</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Top drop menu that slides from top, sits above header */}
      <TopDropMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* Floating cart dropdown panel */}
      <CartDropPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

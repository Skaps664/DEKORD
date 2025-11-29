"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, ShoppingBag, X } from "lucide-react"
import CartDropPanel from "./cart-drop-panel"
import { TopDropMenu } from "./top-drop-menu"
import { useCart } from "@/contexts/cart-context"
import { getCurrentUser } from "@/lib/services/auth"
import { createClient } from "@/lib/supabase/client"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { itemCount } = useCart()
  const [prevItemCount, setPrevItemCount] = useState(0)

  // Check if user is logged in and listen for auth state changes
  useEffect(() => {
    checkAuthStatus()
    
    // Listen for auth state changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth state changed:', event, !!session?.user)
      setIsLoggedIn(!!session?.user)
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function checkAuthStatus() {
    const { data: user } = await getCurrentUser()
    setIsLoggedIn(!!user)
  }

  // Trigger shake animation when item is added
  useEffect(() => {
    if (itemCount > prevItemCount && itemCount > 0) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
    }
    setPrevItemCount(itemCount)
  }, [itemCount, prevItemCount])

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
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          "backdrop-blur-md",
          isScrolled ? "bg-white/15 border-neutral-200" : "bg-white/15",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ pointerEvents: 'auto', isolation: 'isolate' }}
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
              className="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 -ml-1 md:-ml-0.5 rounded-full hover:bg-neutral-100 transition-colors"
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

            {/* Right side icons */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* User/Account Icon */}
              <a
                href={isLoggedIn ? "/account" : "/auth"}
                onClick={(e) => {
                  if (!isLoggedIn) {
                    // Store current page URL for redirect after login
                    localStorage.setItem('auth_redirect', window.location.pathname + window.location.search)
                  }
                }}
                className="flex-shrink-0 inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label={isLoggedIn ? "Account" : "Login"}
              >
                <svg 
                  className={cn("w-5 h-5 md:w-6 md:h-6 transition-colors", iconColor)}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </a>

              {/* Cart icon with badge */}
              <button
                type="button"
                aria-label={cartOpen ? "Close cart" : "Open cart"}
                aria-expanded={cartOpen}
                onClick={() => {
                  setCartOpen((v) => !v)
                  setMenuOpen(false)
                }}
                className={cn(
                  "flex-shrink-0 relative inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 -mr-1 md:-mr-0.5 rounded-full hover:bg-neutral-100 transition-colors",
                  isShaking && "animate-shake"
                )}
              >
                <ShoppingBag className={cn("w-5 h-5 md:w-6 md:h-6 transition-colors", iconColor)} aria-hidden="true" />
                {itemCount > 0 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-0.5 -right-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] leading-none font-medium rounded-full hover:bg-neutral-100 transition-colors",
                      badgeColor,
                    )}
                  >
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Cart items: {itemCount}</span>
              </button>
            </div>
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

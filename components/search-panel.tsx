"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { searchProducts } from "@/lib/services/products"
import type { Product } from "@/lib/types/database"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SearchPanelProps {
  open: boolean
  onClose: () => void
}

export function SearchPanel({ open, onClose }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when panel opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [open, onClose])

  // Search functionality with debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([])
      return
    }

    const delaySearch = setTimeout(async () => {
      setIsSearching(true)
      const { data } = await searchProducts(searchQuery)
      if (data) {
        setSearchResults(data.slice(0, 3)) // Show max 3 results
      }
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(delaySearch)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`)
      onClose()
      setSearchQuery("")
    }
  }

  const handleProductClick = () => {
    onClose()
    setSearchQuery("")
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <button
          aria-label="Close search overlay"
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-foreground/5 backdrop-blur-sm transition-opacity"
          style={{ top: 0 }}
        />
      )}

      {/* Search Panel */}
      <div className="fixed left-0 right-0 top-0 z-[101] flex justify-center" style={{ pointerEvents: 'none' }}>
        <div
          aria-hidden={!open}
          id="search-panel"
          style={{ pointerEvents: open ? 'auto' : 'none' }}
          className={cn(
            "w-full mx-3 sm:mx-4 md:mx-5 rounded-b-2xl border border-neutral-200 bg-white/95 shadow-lg backdrop-blur transition-all duration-300",
            "ring-1 ring-neutral-200",
            open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
            searchQuery.trim().length >= 2 && searchResults.length > 0 ? "h-auto max-h-[500px] py-4 px-4 md:px-6" : "h-30 md:h-36 px-4 md:px-6 flex items-center justify-center"
          )}
        >
              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto w-full mb-4">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-4 pr-20 py-2.5 text-base border border-neutral-300 rounded-full focus:border-neutral-400 focus:outline-none transition-colors"
                  />
                  <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-neutral-600" />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="p-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
                      aria-label="Search"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Search Results */}
              <AnimatePresence>
                {searchQuery.trim().length >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-2xl mx-auto w-full"
                  >
                    {isSearching ? (
                      <div className="text-center py-6 text-neutral-500 text-sm">
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="space-y-2">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={handleProductClick}
                            className="flex items-center gap-3 p-2.5 hover:bg-neutral-50 rounded-lg transition-colors group border border-neutral-100"
                          >
                            <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-neutral-100">
                              {product.main_image && (
                                <Image
                                  src={product.main_image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-neutral-900 truncate group-hover:text-neutral-700">
                                {product.name}
                              </h4>
                              <p className="text-xs text-neutral-600">
                                Rs. {product.price.toLocaleString()}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0" />
                          </Link>
                        ))}
                        <button
                          onClick={handleSearch}
                          className="w-full py-2.5 text-center text-xs text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors border border-neutral-100 font-medium"
                        >
                          View all results →
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-neutral-500 text-sm">
                        No products found for "{searchQuery}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
        </div>
      </div>
    </>
  )
}

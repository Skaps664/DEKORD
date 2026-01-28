"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { X, ArrowRight } from "lucide-react"
import { useEffect } from "react"

type TopDropMenuProps = {
  open: boolean
  onClose: () => void
  className?: string
}

export function TopDropMenu({ open, onClose, className }: TopDropMenuProps) {
  // Auto-close on ESC key only
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  // Prevent body scroll when open (optional)
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Overlay - sits below header */}
      {open && (
        <button
          aria-label="Close menu overlay"
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-foreground/5 backdrop-blur-sm transition-opacity"
          style={{ top: 0 }}
        />
      )}

      {/* Floating panel - container should not block anything */}
      <div className="fixed left-0 right-0 top-0 z-[101] flex justify-center" style={{ pointerEvents: 'none' }}>
        <div
          aria-hidden={!open}
          id="menu-drop-panel"
          style={{ pointerEvents: open ? 'auto' : 'none' }}
          className={cn(
            "w-full mx-3 sm:mx-4 md:mx-5 rounded-b-2xl border border-(--ring) bg-background/95 shadow-lg backdrop-blur transition-all duration-300",
            "ring-1 ring-border",
            open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
            // Mobile: tall/vertical layout
            "h-auto py-4 md:py-0 md:h-36 px-4 md:px-6",
            className,
          )}
        >
          {/* Desktop Layout (horizontal) */}
          <div className="hidden md:flex h-full items-center justify-between">
            <div className="flex min-w-0 flex-col">
              <h3 className="text-sm md:text-base font-medium text-foreground text-pretty">Navigation</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Browse collections • Explore catalog</p>
            </div>

            <div className="flex items-center gap-3 ml-4 flex-shrink-0 ">
              <nav className="flex items-center gap-4 md:gap-6 ml-8">
                <Link
                  href="/"
                  onClick={onClose}
                  className="text-sm md:text-base font-medium text-foreground hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Home
                </Link>
                {/* <Link
                  href="/pre-launch"
                  onClick={onClose}
                  className="text-sm md:text-base font-medium text-foreground hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Pre-Launch
                </Link> */}
                <Link
                  href="/catalog"
                  onClick={onClose}
                  className="text-sm md:text-base font-medium text-foreground hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Catalog
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="text-sm md:text-base font-medium text-foreground hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Contact
                </Link>
                <Link
                  href="/blog"
                  onClick={onClose}
                  className="text-sm md:text-base font-medium text-foreground hover:opacity-70 transition-opacity whitespace-nowrap mr-8 md:mr-16"
                >
                  Blog
                </Link>
              </nav>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex p-1 text-foreground/80 hover:text-foreground transition-colors flex-shrink-0"
                aria-label="Close menu panel"
              >
                <X className="size-5 md:size-6" />
              </button>
            </div>
          </div>

          {/* Mobile Layout (vertical) */}
          <div className="flex md:hidden flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex min-w-0 flex-col">
                <h3 className="text-base font-medium text-foreground">Navigation</h3>
                <p className="text-xs text-muted-foreground">Browse • Explore</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex p-1 text-foreground/80 hover:text-foreground transition-colors flex-shrink-0"
                aria-label="Close menu panel"
              >
                <X className="size-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={onClose}
                className="text-base font-medium text-foreground hover:opacity-70 transition-opacity py-2 text-center"
              >
                Home
              </Link>
              {/* <Link
                href="/pre-launch"
                onClick={onClose}
                className="text-base font-medium text-foreground hover:opacity-70 transition-opacity py-2 text-center"
              >
                Pre-Launch
              </Link> */}
              <Link
                href="/catalog"
                onClick={onClose}
                className="text-base font-medium text-foreground hover:opacity-70 transition-opacity py-2 text-center"
              >
                Catalog
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="text-base font-medium text-foreground hover:opacity-70 transition-opacity py-2 text-center"
              >
                Contact
              </Link>
              <Link
                href="/blog"
                onClick={onClose}
                className="text-base font-medium text-foreground hover:opacity-70 transition-opacity py-2 text-center"
              >
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

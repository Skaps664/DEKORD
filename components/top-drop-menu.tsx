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
  // Auto-close on scroll / wheel / touch or ESC
  useEffect(() => {
    if (!open) return
    const handleClose = () => onClose()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("scroll", handleClose, { passive: true })
    window.addEventListener("wheel", handleClose, { passive: true })
    window.addEventListener("touchmove", handleClose, { passive: true })
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("scroll", handleClose)
      window.removeEventListener("wheel", handleClose)
      window.removeEventListener("touchmove", handleClose)
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
      {open ? (
        <button
          aria-label="Close menu overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-foreground/5 backdrop-blur-sm transition-opacity data-[state=open]:opacity-100"
          style={{ top: 0 }}
        />
      ) : null}

      {/* Floating panel */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
        <div
          aria-hidden={!open}
          id="menu-drop-panel"
          className={cn(
            "pointer-events-auto w-full mx-3 sm:mx-4 md:mx-5 rounded-b-2xl border border-(--ring) bg-background/95 shadow-lg backdrop-blur transition-all duration-300",
            "ring-1 ring-border",
            open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
            "h-30 md:h-36 px-4 md:px-6",
            className,
          )}
        >
          <div className="flex h-full items-center justify-between">
            <div className="flex min-w-0 flex-col">
              <h3 className="text-sm md:text-base font-medium text-foreground text-pretty">Navigation</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Browse collections • Explore catalog</p>
            </div>

            <div className="flex items-center gap-3 ml-4 flex-shrink-0">
              <nav className="flex items-center gap-4 md:gap-6">
                <Link
                  href="/"
                  onClick={onClose}
                  className="text-sm md:text-base font-medium text-foreground hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Home
                </Link>
                <Link
                  href="/collections"
                  onClick={onClose}
                  className="text-sm md:text-base font-medium text-foreground hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Collections
                </Link>
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
        </div>
      </div>
    </>
  )
}

"use client"

import * as React from "react"
import { X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type CartDropPanelProps = {
  open: boolean
  onClose: () => void
  className?: string
  // Optional: approximate panel height so our overlay can start below header+panel
  // If you adjust this, also tweak the overlay's inline style below.
  panelHeight?: number // in px
}

export default function CartDropPanel({
  open,
  onClose,
  className,
  panelHeight = 92, // ~ h-20 to h-24 depending on density
}: CartDropPanelProps) {
  // Auto-close on scroll / wheel / touch or ESC
  React.useEffect(() => {
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

  // Prevent body scroll when open (optional, gentle)
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Overlay - sits below header (which should have a higher z-index).
          Using z-40 so header stays interactive above it. */}
      {open ? (
        <button
          aria-label="Close cart overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-foreground/5 backdrop-blur-sm transition-opacity data-[state=open]:opacity-100"
          style={{ top: 0 }}
        />
      ) : null}

      {/* Floating panel */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
        <div
          aria-hidden={!open}
          id="cart-drop-panel"
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
              <h3 className="text-sm md:text-base font-medium text-foreground text-pretty">Cart preview</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Recently added items • Secure checkout</p>
            </div>

            <div className="flex items-center gap-3 ml-4 flex-shrink-0">
              <a
                href="/cart"
                className="group inline-flex items-center gap-1 text-sm md:text-base font-medium text-foreground whitespace-nowrap"
                aria-label="Go to cart"
              >
                View cart
                <ArrowRight
                  className="size-4 md:size-5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex p-1 text-foreground/80 hover:text-foreground transition-colors flex-shrink-0"
                aria-label="Close cart panel"
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

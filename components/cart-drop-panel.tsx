"use client"

import * as React from "react"
import { X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"

type CartDropPanelProps = {
  open: boolean
  onClose: () => void
  className?: string
  panelHeight?: number
}

export default function CartDropPanel({
  open,
  onClose,
  className,
  panelHeight = 92,
}: CartDropPanelProps) {
  const { itemCount, total } = useCart()
  // Auto-close on ESC key only
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
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
          Using z-[90] so header stays interactive above it. */}
      {open && (
        <button
          aria-label="Close cart overlay"
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-foreground/5 backdrop-blur-sm transition-opacity"
          style={{ top: 0 }}
        />
      )}

      {/* Floating panel - container should not block anything */}
      <div className="fixed left-0 right-0 top-0 z-[101] flex justify-center" style={{ pointerEvents: 'none' }}>
        <div
          aria-hidden={!open}
          id="cart-drop-panel"
          style={{ pointerEvents: open ? 'auto' : 'none' }}
          className={cn(
            "w-full mx-3 sm:mx-4 md:mx-5 rounded-b-2xl border border-(--ring) bg-background/95 shadow-lg backdrop-blur transition-all duration-300",
            "ring-1 ring-border",
            open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
            "h-30 md:h-36 px-4 md:px-6",
            className,
          )}
        >
          <div className="flex h-full items-center justify-between">
            <div className="flex min-w-0 flex-col">
              <h3 className="text-sm md:text-base font-medium text-foreground text-pretty">Cart preview</h3>
              {itemCount === 0 ? (
                <p className="text-xs md:text-sm text-muted-foreground">Your cart is empty</p>
              ) : (
                <p className="text-xs md:text-sm text-muted-foreground">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} • Rs. {total.toFixed(2)}
                </p>
              )}
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

"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    fbq: any
    _fbq: any
  }
}

export default function FacebookPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

  useEffect(() => {
    if (!pixelId) {
      console.warn('Facebook Pixel ID not found in environment variables')
      return
    }

    // Initialize Facebook Pixel
    if (!window.fbq) {
      // Load Facebook Pixel script
      const script = document.createElement('script')
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      `
      
      script.onerror = () => {
        console.warn('⚠️ Facebook Pixel blocked by ad blocker or privacy extension. This is normal during development. Pixel will work in production for users without ad blockers.')
      }
      
      document.head.appendChild(script)

      // Initialize after script loads
      const checkFbq = setInterval(() => {
        if (window.fbq) {
          clearInterval(checkFbq)
          window.fbq('init', pixelId)
          window.fbq('track', 'PageView')
          console.log('✅ Facebook Pixel initialized:', pixelId)
        }
      }, 100)

      // Cleanup after 5 seconds if not loaded
      setTimeout(() => {
        clearInterval(checkFbq)
        if (!window.fbq) {
          console.warn('⚠️ Facebook Pixel not loaded. Likely blocked by ad blocker. Disable ad blocker to test Pixel tracking.')
        }
      }, 5000)
    } else {
      // Already loaded, just track page view
      window.fbq('track', 'PageView')
    }
  }, [pixelId])

  useEffect(() => {
    // Track page views on route change
    if (pixelId && typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
      console.log('📊 PageView tracked:', pathname)
    }
  }, [pathname, searchParams, pixelId])

  if (!pixelId) {
    return null
  }

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  )
}

// Helper functions to track custom events
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data)
  }
}

export const trackCustomEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, data)
  }
}

// Common e-commerce events
export const trackAddToCart = (product: { id: string; name: string; price: number; quantity: number }) => {
  trackEvent('AddToCart', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'PKR',
  })
}

export const trackInitiateCheckout = (cartValue: number, items: any[]) => {
  trackEvent('InitiateCheckout', {
    content_ids: items.map((item) => item.id),
    num_items: items.length,
    value: cartValue,
    currency: 'PKR',
  })
}

export const trackPurchase = (orderValue: number, orderId: string) => {
  trackEvent('Purchase', {
    value: orderValue,
    currency: 'PKR',
    content_type: 'product',
    order_id: orderId,
  })
}

export const trackViewContent = (product: { id: string; name: string; price: number }) => {
  trackEvent('ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'PKR',
  })
}

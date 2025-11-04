// Facebook Pixel Tracking Utilities
// Use these functions throughout your website to track user actions

declare global {
  interface Window {
    fbq: any
  }
}

// Generic event tracking
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

// E-commerce tracking functions

export const trackAddToCart = (product: {
  id: string
  name: string
  price: number
  quantity?: number
}) => {
  trackEvent('AddToCart', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: 'PKR',
    quantity: product.quantity || 1,
  })
}

export const trackViewContent = (product: {
  id: string
  name: string
  price: number
  category?: string
}) => {
  trackEvent('ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    content_category: product.category,
    value: product.price,
    currency: 'PKR',
  })
}

export const trackInitiateCheckout = (params: {
  cartValue: number
  items: Array<{ id: string; name: string; quantity: number }>
}) => {
  trackEvent('InitiateCheckout', {
    content_ids: params.items.map((item) => item.id),
    contents: params.items,
    num_items: params.items.length,
    value: params.cartValue,
    currency: 'PKR',
  })
}

export const trackPurchase = (params: {
  orderValue: number
  orderId: string
  items?: Array<{ id: string; name: string; quantity: number }>
}) => {
  trackEvent('Purchase', {
    value: params.orderValue,
    currency: 'PKR',
    content_type: 'product',
    contents: params.items,
    order_id: params.orderId,
  })
}

export const trackAddPaymentInfo = () => {
  trackEvent('AddPaymentInfo')
}

export const trackAddToWishlist = (product: {
  id: string
  name: string
  price: number
}) => {
  trackEvent('AddToWishlist', {
    content_ids: [product.id],
    content_name: product.name,
    value: product.price,
    currency: 'PKR',
  })
}

export const trackSearch = (searchQuery: string) => {
  trackEvent('Search', {
    search_string: searchQuery,
  })
}

export const trackLead = () => {
  trackEvent('Lead')
}

export const trackCompleteRegistration = () => {
  trackEvent('CompleteRegistration')
}

// Usage Examples:
/*

// On product page load:
trackViewContent({
  id: 'W60-USB-C-1M',
  name: 'dekord W-60 USB-C Cable',
  price: 2500,
  category: 'Cables'
})

// When user clicks "Add to Cart":
trackAddToCart({
  id: 'W60-USB-C-1M',
  name: 'dekord W-60 USB-C Cable',
  price: 2500,
  quantity: 1
})

// When user initiates checkout:
trackInitiateCheckout({
  cartValue: 5000,
  items: [
    { id: 'W60-USB-C-1M', name: 'dekord W-60 USB-C Cable', quantity: 2 }
  ]
})

// After successful order:
trackPurchase({
  orderValue: 5000,
  orderId: 'ORD-001',
  items: [
    { id: 'W60-USB-C-1M', name: 'dekord W-60 USB-C Cable', quantity: 2 }
  ]
})

// On search:
trackSearch('usb c cable')

// On signup:
trackCompleteRegistration()

*/

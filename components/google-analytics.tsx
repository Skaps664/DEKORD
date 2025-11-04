'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Google Analytics 4 Component
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views when route changes
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + searchParams.toString();
    
    // Send pageview event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  // Don't render if no measurement ID
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: Missing NEXT_PUBLIC_GA_MEASUREMENT_ID');
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

// E-commerce Event Tracking Functions

interface ProductData {
  id: string;
  name: string;
  price: number;
  category?: string;
  variant?: string;
  quantity?: number;
}

interface PurchaseData {
  transaction_id: string;
  value: number;
  currency: string;
  items: ProductData[];
  shipping?: number;
  tax?: number;
}

// Track Product View
export function trackProductView(product: ProductData) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'view_item', {
    currency: 'PKR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || 'Uncategorized',
      item_variant: product.variant,
      price: product.price,
      quantity: 1,
    }],
  });
}

// Track Add to Cart
export function trackAddToCart(product: ProductData) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'add_to_cart', {
    currency: 'PKR',
    value: product.price * (product.quantity || 1),
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || 'Uncategorized',
      item_variant: product.variant,
      price: product.price,
      quantity: product.quantity || 1,
    }],
  });
}

// Track Begin Checkout
export function trackBeginCheckout(items: ProductData[], value: number) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'begin_checkout', {
    currency: 'PKR',
    value: value,
    items: items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category || 'Uncategorized',
      item_variant: item.variant,
      price: item.price,
      quantity: item.quantity || 1,
    })),
  });
}

// Track Purchase
export function trackPurchase(data: PurchaseData) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'purchase', {
    transaction_id: data.transaction_id,
    value: data.value,
    currency: data.currency,
    shipping: data.shipping || 0,
    tax: data.tax || 0,
    items: data.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      item_category: item.category || 'Uncategorized',
      item_variant: item.variant,
      price: item.price,
      quantity: item.quantity || 1,
    })),
  });
}

// Track Search
export function trackSearch(searchTerm: string) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', 'search', {
    search_term: searchTerm,
  });
}

// Track Custom Event
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', eventName, eventParams);
}

export default GoogleAnalytics;

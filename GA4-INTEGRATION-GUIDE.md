# 📊 Google Analytics 4 - Integration Examples

How to use GA4 tracking in your components.

---

## ✅ Already Implemented

### **1. Automatic Page View Tracking**

Every time a user visits a page, it's automatically tracked!

Location: `components/google-analytics.tsx`

No code needed - works automatically! ✅

---

## 🛍️ E-commerce Event Integration

Add these tracking calls to your existing components:

---

### **1. Track Product Views**

**File:** `app/product/[slug]/page.tsx`

Add tracking when user views a product:

```typescript
import { trackProductView } from '@/components/google-analytics';

// Inside your product page component, after fetching product data:
useEffect(() => {
  if (product) {
    trackProductView({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.collection_id || 'Uncategorized',
      variant: selectedColor || selectedLength || undefined,
    });
  }
}, [product, selectedColor, selectedLength]);
```

---

### **2. Track Add to Cart**

**File:** Where you have "Add to Cart" button (product page, catalog, quick-view)

Add tracking on successful cart addition:

```typescript
import { trackAddToCart } from '@/components/google-analytics';

// Inside your handleAddToCart function:
const handleAddToCart = async () => {
  // ... your existing add to cart logic ...
  
  // After successfully adding to cart:
  trackAddToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.collection_id,
    variant: `${selectedColor} - ${selectedLength}`,
    quantity: 1,
  });
  
  // ... rest of your code (toast notification, etc.)
};
```

---

### **3. Track Begin Checkout**

**File:** `app/checkout/page.tsx`

Add tracking when checkout page loads:

```typescript
import { trackBeginCheckout } from '@/components/google-analytics';

// Inside your checkout page component:
useEffect(() => {
  if (cartItems && cartItems.length > 0) {
    const items = cartItems.map(item => ({
      id: item.product_id,
      name: item.product.name,
      price: item.product.price,
      category: item.product.collection_id,
      variant: `${item.selected_color} - ${item.selected_length}`,
      quantity: item.quantity,
    }));
    
    const totalValue = cartItems.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
    
    trackBeginCheckout(items, totalValue);
  }
}, [cartItems]);
```

---

### **4. Track Purchase (Most Important!)**

**File:** Where you handle successful order placement

After order is successfully created:

```typescript
import { trackPurchase } from '@/components/google-analytics';

// After successful order creation:
const handlePlaceOrder = async () => {
  // ... your existing order placement logic ...
  
  // After order is successfully created:
  if (orderSuccess) {
    trackPurchase({
      transaction_id: order.order_number, // e.g., "ORD-00001"
      value: totalAmount,
      currency: 'PKR',
      shipping: shippingCost || 0,
      tax: 0, // Add if you calculate tax
      items: cartItems.map(item => ({
        id: item.product_id,
        name: item.product.name,
        price: item.product.price,
        category: item.product.collection_id,
        variant: `${item.selected_color} - ${item.selected_length}`,
        quantity: item.quantity,
      })),
    });
  }
  
  // ... rest of your code (confetti, redirect, etc.)
};
```

---

### **5. Track Search (Optional)**

**File:** If you have a search feature

```typescript
import { trackSearch } from '@/components/google-analytics';

// When user searches:
const handleSearch = (searchTerm: string) => {
  trackSearch(searchTerm);
  // ... your search logic ...
};
```

---

## 🎯 Real Implementation Examples

### **Example 1: Product Page**

```typescript
'use client';

import { useEffect } from 'react';
import { trackProductView } from '@/components/google-analytics';

export default function ProductPage({ product }) {
  // Track product view when page loads
  useEffect(() => {
    if (product) {
      trackProductView({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.collection?.name || 'Uncategorized',
        variant: product.variants?.[0]?.name,
      });
    }
  }, [product]);

  return (
    <div>
      {/* Your product page UI */}
    </div>
  );
}
```

---

### **Example 2: Add to Cart Button**

```typescript
'use client';

import { trackAddToCart } from '@/components/google-analytics';
import { toast } from 'sonner';

export function AddToCartButton({ product, selectedColor, selectedLength }) {
  const handleAddToCart = async () => {
    try {
      // Add to cart logic
      await addToCart({...});
      
      // Track in GA4
      trackAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.collection?.name,
        variant: `${selectedColor} - ${selectedLength}`,
        quantity: 1,
      });
      
      // Show success message
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

---

### **Example 3: Checkout Success**

```typescript
'use client';

import { useEffect } from 'react';
import { trackPurchase } from '@/components/google-analytics';

export function CheckoutSuccess({ order, items }) {
  useEffect(() => {
    // Track purchase once when page loads
    trackPurchase({
      transaction_id: order.order_number,
      value: order.total_amount,
      currency: 'PKR',
      shipping: 0, // Add if you have shipping costs
      tax: 0,
      items: items.map(item => ({
        id: item.product_id,
        name: item.product_name,
        price: item.price,
        category: item.category,
        variant: item.variant,
        quantity: item.quantity,
      })),
    });
  }, []); // Empty dependency array - run once

  return (
    <div>
      {/* Order confirmation UI */}
    </div>
  );
}
```

---

## 🔧 Setup Instructions

### **1. Add GA4 Measurement ID to Environment**

**File:** `.env.local`

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Get your Measurement ID:**
1. Go to: https://analytics.google.com
2. Admin → Data Streams → Your stream
3. Copy the Measurement ID (starts with `G-`)

---

### **2. Deploy to Production**

```bash
cd /home/skaps/dekord/website

# Commit changes
git add .
git commit -m "Add Google Analytics 4 tracking"
git push

# Update Vercel environment variable:
# 1. Go to Vercel dashboard
# 2. Project Settings → Environment Variables
# 3. Add: NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
# 4. Click "Save"
# 5. Redeploy (automatic on next push)
```

---

### **3. Verify Tracking Works**

**Install GA Debugger:**
- Chrome: https://chrome.google.com/webstore/detail/google-analytics-debugger/

**Test:**
1. Open https://dekord.online
2. Open Chrome DevTools (F12)
3. Go to Console tab
4. Enable GA Debugger
5. Refresh page
6. Should see GA events in console

**Check Real-time Report:**
1. Go to GA4 dashboard
2. Click "Reports" → "Real-time"
3. Visit your site in another tab
4. Should see your visit in real-time!

---

## 📊 What You'll See in GA4

### **Automatic Events:**
- ✅ `page_view` - Every page load
- ✅ `session_start` - User starts session
- ✅ `first_visit` - First time visitor
- ✅ `scroll` - User scrolls page
- ✅ `click` - Outbound link clicks

### **E-commerce Events (After Integration):**
- 🛍️ `view_item` - Product page views
- 🛒 `add_to_cart` - Items added to cart
- 💳 `begin_checkout` - Checkout started
- ✅ `purchase` - Order completed

### **Revenue Tracking:**
- Total revenue in PKR
- Average order value
- Products purchased
- Conversion rate
- Revenue by product

---

## 🎯 Key Metrics to Track

### **In GA4 Dashboard:**

**Traffic:**
- Users (daily, weekly, monthly)
- Sessions
- Page views
- Bounce rate
- Average session duration

**E-commerce:**
- Total revenue
- Transactions
- Average order value
- Product performance
- Cart abandonment rate

**Acquisition:**
- Traffic sources (Google, Facebook, Direct, etc.)
- Campaign performance
- Referral sources

**User Behavior:**
- Most viewed products
- Popular pages
- User flow through checkout
- Time on site by page

---

## 🔍 Debugging Tips

### **GA4 Not Working?**

**Check 1: Measurement ID**
```bash
# Verify env variable is set:
cat .env.local | grep GA_MEASUREMENT_ID

# Should show: NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Check 2: Script Loading**
1. Open site
2. Open DevTools → Network tab
3. Filter: "gtag"
4. Should see gtag.js loading

**Check 3: Console Warnings**
1. Open DevTools → Console
2. Look for GA warnings
3. Fix any missing parameters

**Check 4: Real-time Report**
- Visit site in incognito mode
- Check GA4 Real-time report
- Should see event within 30 seconds

---

## 📈 Advanced: Custom Events

Track custom user actions:

```typescript
import { trackEvent } from '@/components/google-analytics';

// Newsletter signup
trackEvent('newsletter_signup', {
  method: 'footer_form'
});

// Video play
trackEvent('video_play', {
  video_title: 'Product Demo'
});

// Filter usage
trackEvent('filter_applied', {
  filter_type: 'color',
  filter_value: 'black'
});

// Wishlist add
trackEvent('add_to_wishlist', {
  product_id: product.id,
  product_name: product.name
});
```

---

## 🆘 Need Help?

Let me know if you need:
1. Help getting GA4 Measurement ID
2. Help integrating tracking in specific components
3. Custom event tracking for specific actions
4. Help reading GA4 reports
5. Conversion funnel setup

---

**Once you have your GA4 Measurement ID, add it to `.env.local` and the tracking will start working automatically!** 🚀

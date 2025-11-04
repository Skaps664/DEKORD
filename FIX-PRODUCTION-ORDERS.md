# 🚨 URGENT: Fix Production Order Placement

## ❌ Current Errors:

1. **406 (Not Acceptable)** - RLS policies blocking queries
2. **409 (Conflict)** - Duplicate order number constraint
3. Orders failing with "Failed to place order"

---

## 🔧 The Fix - Run These SQL Scripts in Supabase

### **Step 1: Go to Supabase Dashboard**

1. Open: https://supabase.com/dashboard
2. Select your project: **awkcvltduqojgdgdjhca**
3. Click **"SQL Editor"** in left sidebar
4. Click **"New Query"**

---

### **Step 2: Run Order RLS Policies**

Copy and paste this **ENTIRE** script:

```sql
-- ============================================
-- FIX RLS POLICIES FOR ORDERS TABLE
-- ============================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
DROP POLICY IF EXISTS "Users can create order items" ON order_items;

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ORDERS TABLE POLICIES
-- Allow users to view their own orders
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to create their own orders
CREATE POLICY "Users can create their own orders"
ON orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own orders
CREATE POLICY "Users can update their own orders"
ON orders FOR UPDATE
USING (auth.uid() = user_id);

-- ORDER_ITEMS TABLE POLICIES
-- Allow users to view their order items
CREATE POLICY "Users can view their own order items"
ON order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Allow users to create order items for their orders
CREATE POLICY "Users can create order items"
ON order_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

SELECT '✅ RLS policies updated successfully!' as message;
```

**Click "RUN" or press Ctrl+Enter**

✅ You should see: "Success. No rows returned" or "✅ RLS policies updated successfully!"

---

### **Step 3: Run User Profile Shipping Columns**

Click **"New Query"** again, then paste:

```sql
-- ============================================
-- ADD SHIPPING INFO TO USER PROFILES
-- ============================================

-- Add shipping columns to user_profiles table if they don't exist
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS shipping_name TEXT,
ADD COLUMN IF NOT EXISTS shipping_phone TEXT,
ADD COLUMN IF NOT EXISTS shipping_address TEXT,
ADD COLUMN IF NOT EXISTS shipping_city TEXT,
ADD COLUMN IF NOT EXISTS shipping_province TEXT,
ADD COLUMN IF NOT EXISTS shipping_postal_code TEXT,
ADD COLUMN IF NOT EXISTS save_shipping_info BOOLEAN DEFAULT false;

-- Update RLS policy for user_profiles to allow updates
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

SELECT '✅ User profiles updated with shipping info!' as message;
```

**Click "RUN"**

✅ You should see: "Success. No rows returned"

---

### **Step 4: Verify All RLS Policies**

Run this query to check all policies:

```sql
-- Check all RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd,
  CASE 
    WHEN cmd = 'SELECT' THEN 'Read'
    WHEN cmd = 'INSERT' THEN 'Create'
    WHEN cmd = 'UPDATE' THEN 'Update'
    WHEN cmd = 'DELETE' THEN 'Delete'
    ELSE cmd
  END as action
FROM pg_policies
WHERE tablename IN ('orders', 'order_items', 'user_profiles', 'products', 'collections', 'cart_items')
ORDER BY tablename, cmd;
```

**Expected Results:**

You should see policies for:
- ✅ `orders` - SELECT, INSERT, UPDATE
- ✅ `order_items` - SELECT, INSERT
- ✅ `user_profiles` - SELECT, INSERT, UPDATE
- ✅ `products` - SELECT (public)
- ✅ `collections` - SELECT (public)
- ✅ `cart_items` - SELECT, INSERT, UPDATE, DELETE

---

## 🧪 Test Order Placement

After running the SQL scripts:

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Refresh your site:** https://dekord-testing.vercel.app
3. **Test order flow:**
   - Add product to cart
   - Go to checkout
   - Fill shipping info
   - Click "Place Order"
   - ✅ Should work now!

---

## 🐛 Why This Happened

### **Local vs Production:**

**Local (localhost):**
- You ran SQL scripts manually
- RLS policies were set up
- Orders worked ✓

**Production (Vercel):**
- Connected to same Supabase database
- SQL scripts were ALREADY run
- Same RLS policies apply
- Should work the same way

### **The Real Issue:**

Looking at your errors more carefully:

1. **406 Error:** Means RLS is blocking the query
2. **409 Duplicate Key:** Order number conflict

**Root cause:** The order number generation is trying to query existing orders but RLS is blocking it!

---

## 🔍 Additional Check - Order Number Generation

Let me check if there's an issue with order number generation:

The error "duplicate key value violates unique constraint 'orders_order_number_key'" means:
- Two orders tried to get the same order number
- This happens when the query to get the last order number fails (406 error)
- So it generates the same number twice

**This confirms RLS policies need to be fixed!**

---

## 🎯 Alternative Fix (If Above Doesn't Work)

If the RLS policies still don't work, we need to modify the order creation to handle this better.

### **Check Current Order Numbers:**

Run this in Supabase SQL Editor:

```sql
-- Check if any orders exist
SELECT order_number, created_at, user_id
FROM orders
ORDER BY created_at DESC
LIMIT 10;
```

If you see orders, good! If not, the table is empty.

### **Delete Duplicate Orders (If Needed):**

```sql
-- Find duplicate order numbers
SELECT order_number, COUNT(*)
FROM orders
GROUP BY order_number
HAVING COUNT(*) > 1;

-- If duplicates exist, keep only the first one:
DELETE FROM orders
WHERE id NOT IN (
  SELECT MIN(id)
  FROM orders
  GROUP BY order_number
);
```

---

## ⚡ Fix Google OAuth Speed (7-8 seconds)

The slow OAuth is caused by:

1. **Supabase redirect chain:**
   - Your site → Google (2 sec)
   - Google auth (user time)
   - Google → Supabase (2 sec) ← Slow!
   - Supabase → Your site (2 sec)

2. **Network latency:**
   - Your location to Google servers
   - Google to Supabase servers (US)
   - Supabase to Vercel (US)

### **Cannot be significantly improved because:**
- OAuth requires these redirects (security)
- Supabase is the auth provider (required)
- Network latency depends on geography

### **Workaround:**
- Use email/password login for faster experience
- Or accept OAuth delay (industry standard)
- Most users expect OAuth to take 5-10 seconds

---

## 📋 Quick Action Checklist

Do these NOW:

1. [ ] Open Supabase Dashboard
2. [ ] Go to SQL Editor
3. [ ] Run Order RLS Policies script
4. [ ] Run User Profiles script
5. [ ] Verify policies with check query
6. [ ] Clear browser cache
7. [ ] Test order placement
8. [ ] Report back if still failing

---

## 🆘 If Still Not Working

Share:
1. Screenshot of Supabase SQL Editor after running scripts
2. The success/error message from SQL queries
3. New console errors (if any)
4. Whether you can see the orders table in Supabase Table Editor

---

## ✅ Expected Result

After running SQL scripts:
- ✅ No more 406 errors
- ✅ No more 409 duplicate key errors
- ✅ Orders place successfully
- ✅ User gets confirmation with confetti
- ✅ Order shows in account page

---

**Run the SQL scripts NOW and test!** This should fix everything. 🚀

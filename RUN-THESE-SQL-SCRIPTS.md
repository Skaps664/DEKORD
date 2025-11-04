# 🚨 IMPORTANT: Run These SQL Scripts in Supabase

Your order placement is currently failing with a **403 Forbidden** error because of missing Row Level Security (RLS) policies and database columns.

## ⚡ Quick Fix - Run These Scripts Now

### Step 1: Fix RLS Policies (CRITICAL - Orders Won't Work Without This!)

1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Go to your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy **ALL** the content from `FIX-ORDERS-RLS.sql` 
6. Paste it into the SQL Editor
7. Click **RUN** button
8. ✅ You should see: "Success. No rows returned"

### Step 2: Add Shipping Information Storage

1. Still in **SQL Editor**, click **New Query** again
2. Copy **ALL** the content from `ADD-SHIPPING-TO-PROFILES.sql`
3. Paste it into the SQL Editor
4. Click **RUN** button
5. ✅ You should see: "Success. No rows returned"

## 🎯 What These Scripts Do

### FIX-ORDERS-RLS.sql
- Fixes the **403 Forbidden error** when placing orders
- Allows users to create, view, and update their own orders
- Enables order items to be created with orders
- **Without this, NO ORDERS CAN BE PLACED!**

### ADD-SHIPPING-TO-PROFILES.sql
- Adds columns to save shipping information in user profiles
- Enables "Save for future orders" checkbox feature
- Allows auto-fill of shipping info on next checkout
- Makes checkout faster for returning customers

## ✨ Features You'll Get After Running These

1. ✅ **Orders will work!** - No more 403 errors
2. ✅ **Save shipping info** - Checkbox to save address for future
3. ✅ **Auto-fill checkout** - Saved info pre-fills the form
4. ✅ **Faster checkout** - Returning customers can order in seconds
5. ✅ **View saved info** - See saved shipping details in account page

## 🧪 Test After Running Scripts

1. Go to your website
2. Add a product to cart
3. Click "Proceed to Checkout"
4. Fill in all shipping information
5. ✅ Check the **"Save this information for future orders"** checkbox
6. Click "Place Order"
7. 🎉 Order should be placed successfully with confetti!
8. You'll be redirected to your account orders page
9. Try adding another product and go to checkout
10. ✅ Your shipping info should be auto-filled!

## 🔍 How to Verify Success

### After Step 1 (RLS Fix):
In Supabase Dashboard → Authentication → Policies:
- You should see policies for `orders` table
- You should see policies for `order_items` table

### After Step 2 (Shipping Columns):
In Supabase Dashboard → Table Editor → user_profiles:
- Click on the table
- Look at the columns
- You should see new columns: `shipping_name`, `shipping_phone`, `shipping_address`, etc.

## ❓ Troubleshooting

### If orders still don't work:
1. Check browser console (F12) for errors
2. Make sure you're logged in
3. Verify both SQL scripts ran successfully
4. Try logging out and logging back in

### If auto-fill doesn't work:
1. Place one order with the "Save info" checkbox checked
2. The second order should have auto-fill
3. Check your account page to see if shipping info saved

### If you see SQL errors:
- Make sure you copied the **entire** SQL file content
- Run them in order: RLS first, then Profiles
- If a script fails, read the error message carefully

## 📝 What Changed in Your Code

✅ **Checkout page** - Now saves and auto-fills shipping info
✅ **User profile types** - Added shipping information fields
✅ **Database policies** - Fixed RLS to allow order creation
✅ **Order flow** - Links orders to logged-in users properly

## 🎯 Next Steps After Running Scripts

Once both scripts are run successfully:
1. Test the complete order flow
2. Verify the "Save info" checkbox works
3. Check that auto-fill works on second order
4. Review your orders in the account page

---

**Need Help?** If you see any errors, share them and I'll help fix them immediately!

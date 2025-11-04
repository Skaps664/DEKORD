# 🚀 Deploy dekord to Vercel - Complete Guide

Your domain: **https://dekord-testing.vercel.app/**

---

## 📋 Step-by-Step Deployment

### **Step 1: Add Environment Variables to Vercel**

1. **Go to Vercel Dashboard:**
   - Open: https://vercel.com/dashboard
   - Find your `dekord-testing` project
   - Click on it

2. **Go to Settings → Environment Variables:**
   - Click "Settings" tab
   - Click "Environment Variables" in left sidebar

3. **Add These Variables:**

   **Variable 1:**
   ```
   Name:  NEXT_PUBLIC_SUPABASE_URL
   Value: https://awkcvltduqojgdgdjhca.supabase.co
   ```
   - Select: ✅ Production ✅ Preview ✅ Development
   - Click "Save"

   **Variable 2:**
   ```
   Name:  NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [Copy from your .env.local file]
   ```
   - Open `/home/skaps/dekord/website/.env.local`
   - Copy the long key after `NEXT_PUBLIC_SUPABASE_ANON_KEY=`
   - Paste it in Vercel
   - Select: ✅ Production ✅ Preview ✅ Development
   - Click "Save"

   **Variable 3 (Optional - if you have Facebook Pixel):**
   ```
   Name:  NEXT_PUBLIC_FACEBOOK_PIXEL_ID
   Value: [Your Facebook Pixel ID if you have one]
   ```
   - Select: ✅ Production ✅ Preview ✅ Development
   - Click "Save"

---

### **Step 2: Update Google OAuth Redirect URL**

1. **Go to Google Cloud Console:**
   - Open: https://console.cloud.google.com/
   - Make sure you're in the correct project

2. **Navigate to OAuth Credentials:**
   - Click "APIs & Services" → "Credentials"
   - Find your OAuth 2.0 Client ID
   - Click on it to edit

3. **Add Authorized Redirect URIs:**
   
   Keep the existing Supabase one and ADD these:
   
   ```
   https://awkcvltduqojgdgdjhca.supabase.co/auth/v1/callback
   ```
   ☝️ Keep this one (already there)
   
   **Don't add your Vercel domain here!** Google OAuth goes:
   - User clicks Google button
   - Google authenticates
   - Redirects to Supabase (above URL)
   - Supabase handles it and redirects to your site
   
   So you **only need the Supabase URL** in Google Console.

4. **Add Authorized JavaScript Origins:**
   
   Add these domains:
   ```
   https://dekord-testing.vercel.app
   http://localhost:3000
   ```

5. **Click "SAVE"**

6. **Wait 5-10 minutes** for changes to propagate

---

### **Step 3: Update Supabase Auth Settings**

1. **Go to Supabase Dashboard:**
   - Open: https://supabase.com/dashboard
   - Go to your project
   - Click "Authentication" → "URL Configuration"

2. **Update Site URL:**
   ```
   https://dekord-testing.vercel.app
   ```

3. **Update Redirect URLs:**
   
   Add these to "Redirect URLs" (one per line):
   ```
   https://dekord-testing.vercel.app/auth/callback
   http://localhost:3000/auth/callback
   ```

4. **Click "Save"**

---

### **Step 4: Deploy to Vercel**

Now push your code to trigger deployment:

```bash
cd /home/skaps/dekord/website

# Make sure all changes are committed
git add .
git commit -m "Deploy with database and auth"
git push
```

**Vercel will automatically:**
- Detect the push
- Build your project
- Deploy to: https://dekord-testing.vercel.app
- Use the environment variables you set

---

### **Step 5: Verify Deployment**

After deployment completes (2-3 minutes):

1. **Test Home Page:**
   - Visit: https://dekord-testing.vercel.app
   - ✅ Should load without errors

2. **Test Database Connection:**
   - Visit: https://dekord-testing.vercel.app/test-db
   - ✅ Should show "Connected!"
   - ✅ Should list tables

3. **Test Products:**
   - Visit: https://dekord-testing.vercel.app/catalog
   - ✅ Should show products from database

4. **Test Sign Up:**
   - Visit: https://dekord-testing.vercel.app/auth
   - ✅ Create a test account
   - ✅ Check if it works

5. **Test Google OAuth:**
   - Visit: https://dekord-testing.vercel.app/auth
   - ✅ Click "Continue with Google"
   - ✅ Should authenticate and redirect back

6. **Test Cart & Checkout:**
   - Add product to cart
   - Go to checkout
   - Place order
   - ✅ Should work completely

---

## 🐛 Troubleshooting

### **Issue 1: "Supabase connection failed"**

**Cause:** Environment variables not set

**Fix:**
1. Go to Vercel → Settings → Environment Variables
2. Make sure both variables are added
3. Redeploy: Vercel → Deployments → Click "..." → "Redeploy"

---

### **Issue 2: Google OAuth shows error**

**Cause:** Redirect URL not configured

**Fix:**
1. Check Google Console has Supabase URL in redirect URIs
2. Check Supabase has your Vercel URL in redirect URLs
3. Wait 5-10 minutes for changes to propagate
4. Clear browser cache and try again

---

### **Issue 3: "redirect_uri_mismatch"**

**Cause:** Google OAuth redirect URL mismatch

**Fix:**
1. The error will show the exact URL Google received
2. Copy that URL
3. Go to Google Console → Credentials → Your OAuth Client
4. Add that exact URL to "Authorized redirect URIs"
5. Click Save
6. Wait 5 minutes and try again

---

### **Issue 4: Products not showing**

**Cause:** Database tables empty or RLS policies blocking

**Fix:**
1. Make sure you ran the SQL scripts in Supabase
2. Make sure you have products in the database
3. Use the seed script to add test products
4. Check RLS policies allow public read access to products

---

### **Issue 5: Orders failing with 403**

**Cause:** RLS policies not updated

**Fix:**
1. Run `FIX-ORDERS-RLS.sql` in Supabase SQL Editor
2. Run `ADD-SHIPPING-TO-PROFILES.sql` in Supabase SQL Editor
3. Test order placement again

---

## 📝 Environment Variables Checklist

On Vercel, you should have:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ⚪ `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` (optional)

---

## 🔐 OAuth Configuration Checklist

### Google Cloud Console:
- ✅ Authorized redirect URIs has: `https://awkcvltduqojgdgdjhca.supabase.co/auth/v1/callback`
- ✅ Authorized JavaScript origins has: `https://dekord-testing.vercel.app`

### Supabase Dashboard:
- ✅ Site URL: `https://dekord-testing.vercel.app`
- ✅ Redirect URLs has: `https://dekord-testing.vercel.app/auth/callback`
- ✅ Google OAuth enabled
- ✅ Client ID and Secret configured

---

## 🎯 Quick Deployment Commands

```bash
# Navigate to website folder
cd /home/skaps/dekord/website

# Check current status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Deploy with full database integration"

# Push to trigger Vercel deployment
git push

# Watch deployment in Vercel dashboard
# https://vercel.com/dashboard
```

---

## 🔍 How to Check Deployment Status

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Click on your project

2. **Check Deployments Tab:**
   - See build status
   - See build logs
   - See any errors

3. **If Build Fails:**
   - Click on the failed deployment
   - Check "Build Logs"
   - Look for error messages
   - Usually it's missing env variables

---

## 🌐 OAuth Flow Explained

**The complete flow:**

```
User clicks "Continue with Google"
         ↓
Google login page opens
         ↓
User selects Google account
         ↓
Google redirects to:
https://awkcvltduqojgdgdjhca.supabase.co/auth/v1/callback
         ↓
Supabase processes OAuth response
         ↓
Supabase redirects to:
https://dekord-testing.vercel.app/auth/callback
         ↓
Your app processes the session
         ↓
User redirected to:
https://dekord-testing.vercel.app/account
         ↓
✅ User is logged in!
```

**Important:** Only the Supabase URL needs to be in Google Console!

---

## 📊 Post-Deployment Testing Checklist

After deployment, test these:

- [ ] Home page loads
- [ ] Products page shows items from database
- [ ] Collections page works
- [ ] Individual product pages work
- [ ] Sign up with email works
- [ ] Sign in with email works
- [ ] Google OAuth works
- [ ] Add to cart works
- [ ] View cart works
- [ ] Checkout works
- [ ] Place order works
- [ ] View orders in account works
- [ ] Saved shipping info works
- [ ] Password change works
- [ ] Forgot password works
- [ ] Images load correctly
- [ ] Mobile responsive works
- [ ] No console errors

---

## 🎉 Success Indicators

You'll know it's working when:

1. ✅ Site loads at https://dekord-testing.vercel.app
2. ✅ Products show from database
3. ✅ Can sign up and log in
4. ✅ Google OAuth works
5. ✅ Can add to cart
6. ✅ Can place orders
7. ✅ Orders show in account
8. ✅ No errors in browser console
9. ✅ No 500/404 errors

---

## 🔄 Future Deployments

After initial setup, deploying is easy:

```bash
# Make changes to your code
# Then:
git add .
git commit -m "Your change description"
git push
```

Vercel automatically deploys every push! 🚀

---

## 💡 Pro Tips

1. **Use Vercel Analytics:**
   - Already installed in your project
   - Free traffic analytics
   - Real user monitoring

2. **Preview Deployments:**
   - Every branch/PR gets a preview URL
   - Test before merging to main

3. **Environment Variables:**
   - Can be different per environment
   - Production, Preview, Development

4. **Logs:**
   - Vercel → Project → Logs
   - See real-time application logs
   - Debug production issues

5. **Domains:**
   - Can add custom domain later
   - Automatic SSL certificates
   - Easy DNS configuration

---

## 🚨 Important Notes

1. **Never commit `.env.local` to git!**
   - It's in `.gitignore` (good!)
   - Only add variables through Vercel dashboard

2. **Supabase RLS Policies:**
   - Make sure all SQL scripts are run
   - Users can only access their own data
   - Public can view products/collections

3. **OAuth Callback URLs:**
   - Always use HTTPS in production
   - Never use HTTP (except localhost)

4. **Test Before Announcing:**
   - Do a complete test run
   - Place a real test order
   - Check all features work

---

## 📞 Need Help?

If something doesn't work:

1. Check Vercel build logs
2. Check browser console (F12)
3. Check Supabase logs
4. Verify environment variables
5. Verify OAuth settings
6. Clear browser cache
7. Try incognito mode

---

## ✅ Deployment Complete!

Once everything is set up:
- ✅ Your site is live at https://dekord-testing.vercel.app
- ✅ Database connected
- ✅ OAuth working
- ✅ All features functional
- ✅ Ready to take orders!

**You're live!** 🎊

---

## 🎯 Next Steps After Deployment

1. **Add Real Products:**
   - Use admin panel or seed script
   - Upload product images
   - Set correct prices

2. **Configure Payment:**
   - Choose: COD, JazzCash, or Stripe
   - Set up payment gateway

3. **Add Analytics:**
   - Google Analytics
   - Facebook Pixel
   - Vercel Analytics (already added)

4. **Start Marketing:**
   - Share on social media
   - Update Instagram bio
   - Email customers

5. **Monitor:**
   - Check orders daily
   - Respond to customers
   - Update inventory

**Happy selling!** 💰

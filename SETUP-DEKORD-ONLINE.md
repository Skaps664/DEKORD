# 🌐 Complete Setup Guide for dekord.online

You've successfully moved OAuth to production! Now let's configure everything for your new domain.

---

## ✅ What You've Already Done

- ✅ Changed email to dekord.online in Supabase
- ✅ Updated redirect URLs in Supabase
- ✅ Moved OAuth from Testing → Production in Google Console
- ✅ Updated authorized domains in Google Console

---

## 🔧 What You Need to Do Now

### **1. Vercel Domain Setup**

#### **A. Add Custom Domain to Vercel Project**

1. **Go to Vercel Dashboard:**
   - Open: https://vercel.com/dashboard
   - Select your project: **dekord-testing** (or whatever it's called)

2. **Add Domain:**
   - Click **"Settings"** tab
   - Click **"Domains"** in left sidebar
   - Click **"Add Domain"**
   - Enter: `dekord.online`
   - Click **"Add"**

3. **Configure DNS Records:**
   
   Vercel will show you DNS records to add. Go to your domain registrar (where you bought dekord.online) and add these:

   **Option A - Using A Record (Recommended):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 3600
   ```

   **Option B - Using CNAME (Alternative):**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

4. **Add www Subdomain (Optional but Recommended):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

5. **Wait for DNS Propagation:**
   - Usually takes 5-60 minutes
   - Check status in Vercel dashboard
   - ✅ Will show green checkmark when ready

#### **B. Configure SSL Certificate**

Vercel automatically provisions SSL certificate once DNS is verified.
- Wait for "Certificate issued" status
- This can take up to 24 hours but usually < 1 hour

---

### **2. Update Supabase Configuration**

#### **A. Site URL**

1. **Go to Supabase Dashboard:**
   - Open: https://supabase.com/dashboard
   - Select project: **awkcvltduqojgdgdjhca**

2. **Update Site URL:**
   - Click **"Authentication"** in left sidebar
   - Click **"URL Configuration"**
   - Change **Site URL** from:
     ```
     https://dekord-testing.vercel.app
     ```
     To:
     ```
     https://dekord.online
     ```
   - Click **"Save"**

#### **B. Redirect URLs (Already Done?)**

Verify these are set in **Authentication → URL Configuration → Redirect URLs**:

```
https://dekord.online/auth/callback
https://dekord.online/account
https://dekord.online
https://localhost:3000/auth/callback
https://localhost:3000/account
http://localhost:3000/auth/callback
http://localhost:3000/account
```

**Keep localhost** for local development!

#### **C. Additional Redirect URLs**

Add these for better coverage:
```
https://www.dekord.online/auth/callback
https://www.dekord.online/account
https://www.dekord.online
```

---

### **3. Update Google Cloud Console**

#### **A. Authorized JavaScript Origins**

1. **Go to Google Cloud Console:**
   - Open: https://console.cloud.google.com/apis/credentials
   - Select your OAuth 2.0 Client ID

2. **Update Authorized JavaScript origins:**
   
   **Add these:**
   ```
   https://dekord.online
   https://www.dekord.online
   ```

   **Keep these for development:**
   ```
   http://localhost:3000
   https://awkcvltduqojgdgdjhca.supabase.co
   ```

#### **B. Authorized Redirect URIs**

**Should already have:**
```
https://awkcvltduqojgdgdjhca.supabase.co/auth/v1/callback
http://localhost:3000/auth/callback
```

**No need to add dekord.online here** - Google redirects to Supabase, then Supabase redirects to your site.

#### **C. OAuth Consent Screen**

Update these fields (if not already done):

1. **App Information:**
   - App name: `dekord` or `Dekord`
   - User support email: `your-email@dekord.online`
   - App logo: Upload your logo (120x120 px minimum)

2. **App Domain:**
   - Application home page: `https://dekord.online`
   - Application privacy policy: `https://dekord.online/privacy-policy`
   - Application terms of service: `https://dekord.online/terms-of-service`

3. **Authorized Domains:**
   ```
   dekord.online
   supabase.co
   ```

4. **Developer Contact:**
   - Add your email: `your-email@dekord.online`

5. **Publishing Status:**
   - ✅ Should already be **"In Production"** (you said you moved it)

6. **Save Changes**

---

### **4. Update Vercel Environment Variables**

No changes needed! Your Supabase URLs stay the same:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://awkcvltduqojgdgdjhca.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(your key)
```

These environment variables are **database URLs**, not your website URL, so they don't change.

---

### **5. Update Facebook Pixel Domain (If Using Pixel)**

If you're using Facebook Pixel for tracking:

1. **Go to Facebook Events Manager:**
   - Open: https://business.facebook.com/events_manager2
   - Select your Pixel: **25319178191018029**

2. **Add Domain:**
   - Click **"Settings"**
   - Click **"Add Events"** → **"From a New Website"**
   - Enter: `dekord.online`
   - Click **"Continue"**

3. **Verify Domain (Optional but Recommended):**
   - Download verification file
   - Add to `website/public/` folder
   - Upload to Vercel

---

### **6. Test Everything**

#### **A. Wait for DNS Propagation**

Check if domain is live:
```bash
# Test DNS resolution
nslookup dekord.online

# Test HTTPS
curl -I https://dekord.online
```

Or use online tools:
- https://dnschecker.org
- Enter: `dekord.online`
- Check if it resolves to Vercel's IP

#### **B. Test Website Loading**

1. Open: https://dekord.online
2. Should load your site (same as dekord-testing.vercel.app)
3. Check SSL certificate (green padlock in browser)

#### **C. Test OAuth Login**

1. Go to: https://dekord.online/auth
2. Click **"Continue with Google"**
3. Should show **"dekord"** app name (not Supabase URL)
4. After login, should redirect back to dekord.online
5. Check account page: https://dekord.online/account

#### **D. Test Order Placement**

1. Add product to cart
2. Go to checkout
3. Place test order
4. Should work without 406/409 errors

---

## 📋 Complete Checklist

### **Domain & Hosting:**
- [ ] Add dekord.online to Vercel project
- [ ] Configure DNS records at domain registrar
- [ ] Add www.dekord.online subdomain
- [ ] Wait for SSL certificate (automatic)
- [ ] Verify site loads at https://dekord.online

### **Supabase:**
- [ ] Update Site URL to https://dekord.online
- [ ] Verify redirect URLs include dekord.online
- [ ] Add www.dekord.online redirect URLs
- [ ] Keep localhost URLs for development

### **Google Cloud Console:**
- [ ] Add dekord.online to Authorized JavaScript origins
- [ ] Add www.dekord.online to Authorized JavaScript origins
- [ ] Update OAuth Consent Screen with dekord.online URLs
- [ ] Verify app is "In Production" status
- [ ] Update support email to dekord.online
- [ ] Add dekord.online to Authorized domains

### **Facebook Pixel (Optional):**
- [ ] Add dekord.online domain to Pixel settings
- [ ] Verify domain ownership

### **Testing:**
- [ ] Test site loads at dekord.online
- [ ] Test OAuth shows "dekord" branding
- [ ] Test order placement works
- [ ] Test checkout flow
- [ ] Test cart functionality

---

## 🚨 Important Notes

### **DNS Propagation Time:**
- Minimum: 5 minutes
- Average: 30-60 minutes
- Maximum: 24-48 hours (rare)
- Check status: https://dnschecker.org

### **Keep Old Domain Active:**
Don't delete `dekord-testing.vercel.app` yet! Vercel keeps it as an alias automatically. Users with bookmarks will still work.

### **Redirect www to non-www (or vice versa):**
Vercel handles this automatically. Both will work:
- https://dekord.online → Primary
- https://www.dekord.online → Redirects to primary

### **OAuth Branding Update Time:**
After updating Google Console:
- Changes appear: 5-10 minutes
- Full propagation: 1-2 hours
- Clear browser cache if not updating

---

## 🔍 Troubleshooting

### **Problem 1: Site Not Loading at dekord.online**

**Check:**
1. DNS records configured correctly?
2. DNS propagated? (use dnschecker.org)
3. SSL certificate issued? (check Vercel dashboard)

**Solution:**
- Wait longer (DNS can take time)
- Verify A record: `76.76.21.21`
- Clear browser cache: Ctrl+Shift+Delete

---

### **Problem 2: OAuth Shows Wrong Domain**

**Check:**
1. Google Console Authorized domains includes `dekord.online`?
2. OAuth Consent Screen updated with dekord.online URLs?
3. App published (not in Testing mode)?

**Solution:**
- Update OAuth Consent Screen
- Wait 10 minutes
- Clear browser cache
- Try incognito mode

---

### **Problem 3: Redirect After Login Goes to Wrong URL**

**Check:**
1. Supabase Site URL set to `https://dekord.online`?
2. Redirect URLs include `https://dekord.online/auth/callback`?

**Solution:**
- Update Supabase Site URL
- Add all dekord.online redirect URLs
- Clear browser cookies
- Try login again

---

### **Problem 4: SSL Certificate Not Issued**

**Check:**
1. DNS records pointing to Vercel?
2. Waited at least 1 hour?

**Solution:**
- Verify DNS with `nslookup dekord.online`
- Contact Vercel support if > 24 hours
- Try removing and re-adding domain

---

## 🎯 Expected Final State

### **URLs Working:**
- ✅ https://dekord.online (primary)
- ✅ https://www.dekord.online (redirects)
- ✅ https://dekord-testing.vercel.app (alias)

### **OAuth Branding:**
- ✅ Shows "dekord" app name
- ✅ Shows your logo
- ✅ Shows dekord.online URLs
- ✅ No Supabase URL visible

### **Functionality:**
- ✅ All pages load correctly
- ✅ OAuth login works
- ✅ Cart functionality works
- ✅ Checkout works
- ✅ Orders place successfully
- ✅ Account page shows user data

---

## 📞 Need Help?

If stuck:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Check Supabase logs (Authentication → Logs)
4. Share error messages for troubleshooting

---

**Start with Step 1 (Vercel Domain Setup) and work through the checklist!** 🚀

Let me know when you've added the domain to Vercel and I'll help with the next steps.

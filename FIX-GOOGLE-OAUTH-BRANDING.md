# 🎨 Fix Google OAuth Branding - Show "dekord" Instead of Supabase URL

## The Problem You're Seeing:
- ❌ Shows: "Sign in to awkcvltduqojgdgdjhca.supabase.co"
- ✅ Should show: "Sign in with dekord" or "Continue to dekord"

## Why This Happens:
Google OAuth is using the OAuth Consent Screen configuration from Google Cloud Console. If not properly configured, it shows the redirect URI (Supabase URL) instead of your app name.

---

## 🔧 Complete Fix - Step by Step

### **Step 1: Go to Google Cloud Console**

1. Open: https://console.cloud.google.com/
2. Select your project (the one with the OAuth credentials)
3. Make sure you're in the correct project (check top bar)

---

### **Step 2: Configure OAuth Consent Screen**

1. **Navigate to OAuth Consent Screen:**
   - In the left menu, click **"APIs & Services"**
   - Click **"OAuth consent screen"**

2. **Choose User Type:**
   - If you see options: **External** or **Internal**
   - Select: **External** (for public website)
   - Click **"EDIT APP"** or **"CREATE"**

---

### **Step 3: Fill in App Information**

#### **Page 1: OAuth consent screen**

**Required Fields:**

1. **App name:** 
   ```
   dekord
   ```

2. **User support email:**
   ```
   [Your email - select from dropdown]
   ```

3. **App logo (Optional but HIGHLY RECOMMENDED):**
   - Click "Choose File"
   - Upload your dekord logo (120x120px minimum)
   - **Formats:** PNG, JPG (max 1MB)
   - **Best size:** 512x512px or 1024x1024px
   - Make sure it's square!

4. **Application home page:**
   ```
   https://dekord-testing.vercel.app
   ```

5. **Application privacy policy link:**
   ```
   https://dekord-testing.vercel.app/privacy-policy
   ```

6. **Application terms of service link:**
   ```
   https://dekord-testing.vercel.app/terms-of-service
   ```

7. **Authorized domains:**
   Click **"+ ADD DOMAIN"** and add:
   ```
   vercel.app
   supabase.co
   ```
   
   Then add these one by one:
   ```
   dekord-testing.vercel.app
   ```
   
   **Note:** You may need to verify domain ownership. Google will guide you.

8. **Developer contact information:**
   Add your email addresses (at least one):
   ```
   [Your email address]
   ```

9. Click **"SAVE AND CONTINUE"**

---

#### **Page 2: Scopes**

1. Click **"ADD OR REMOVE SCOPES"**

2. Select these scopes (filter by "userinfo"):
   - ✅ `.../auth/userinfo.email` - View your email address
   - ✅ `.../auth/userinfo.profile` - See your personal info
   - ✅ `openid` - Associate you with your personal info

3. Click **"UPDATE"**

4. Click **"SAVE AND CONTINUE"**

---

#### **Page 3: Test users (if app is in Testing mode)**

If your app is in **"Testing"** publishing status:

1. Click **"+ ADD USERS"**
2. Add email addresses of users who can test (including yours):
   ```
   your-email@gmail.com
   ```
3. Click **"ADD"**
4. Click **"SAVE AND CONTINUE"**

---

#### **Page 4: Summary**

1. Review all information
2. Click **"BACK TO DASHBOARD"**

---

### **Step 4: Publish Your App (IMPORTANT!)**

**If your app is still in "Testing" mode:**

1. On the OAuth consent screen page, you'll see:
   ```
   Publishing status: Testing
   ```

2. Click **"PUBLISH APP"** button

3. A warning will appear - Click **"CONFIRM"**

4. Status should change to:
   ```
   Publishing status: In production
   ```

**Why publish?**
- ⚠️ If in "Testing" mode, only test users can log in
- ⚠️ Users see scary warning: "This app hasn't been verified"
- ✅ Once published, all users can log in
- ✅ Shows your app name and logo properly

**Note about verification:**
- For most apps, you DON'T need Google verification
- Verification is only needed if you request sensitive scopes
- Basic scopes (email, profile) don't require verification

---

### **Step 5: Update Credentials (if needed)**

1. Go to **"Credentials"** in the left menu
2. Click on your **OAuth 2.0 Client ID**
3. Verify these settings:

   **Authorized JavaScript origins:**
   ```
   https://dekord-testing.vercel.app
   http://localhost:3000
   ```

   **Authorized redirect URIs:**
   ```
   https://awkcvltduqojgdgdjhca.supabase.co/auth/v1/callback
   ```

4. Click **"SAVE"**

---

### **Step 6: Wait for Changes to Propagate**

⏰ **Important:** Changes take 5-10 minutes to take effect!

- Clear your browser cache
- Try incognito mode
- Wait a few minutes and try again

---

## 🎨 Creating Your Logo (if you don't have one)

### **Requirements:**
- Square image (1:1 ratio)
- Minimum: 120x120px
- Recommended: 512x512px or 1024x1024px
- Format: PNG or JPG
- Max size: 1MB
- Transparent background recommended

### **Quick Tools:**
1. **Canva:** https://www.canva.com
   - Search "Logo"
   - Use square canvas (1024x1024)
   - Download as PNG

2. **Figma:** https://www.figma.com
   - Create 1024x1024 frame
   - Export as PNG

3. **Free Logo Makers:**
   - https://www.freelogodesign.org/
   - https://www.canva.com/create/logos/

---

## 🧪 Testing After Changes

### **Test 1: Check Consent Screen**
1. Log out from your site
2. Go to: https://dekord-testing.vercel.app/auth
3. Click "Continue with Google"
4. You should now see:
   ```
   ✅ "Sign in with dekord"
   ✅ Your logo (if uploaded)
   ✅ "dekord wants to access your Google Account"
   ```

### **Test 2: Check Branding**
- App name should be "dekord"
- Should show your logo
- Should NOT show "awkcvltduqojgdgdjhca.supabase.co"

---

## 🐛 Troubleshooting

### Issue 1: Still showing Supabase URL
**Cause:** Changes not propagated or app not published

**Fix:**
1. Make sure app is **Published** (not Testing)
2. Clear browser cache
3. Wait 10-15 minutes
4. Try in incognito window

---

### Issue 2: "This app hasn't been verified" warning
**Cause:** App is in Testing mode OR requesting sensitive scopes

**Fix:**
1. Click **"PUBLISH APP"** in OAuth consent screen
2. Only use basic scopes (email, profile)
3. Most apps don't need verification

---

### Issue 3: "Error 400: redirect_uri_mismatch"
**Cause:** Redirect URI not configured

**Fix:**
1. Go to Credentials → Your OAuth Client
2. Add to **Authorized redirect URIs:**
   ```
   https://awkcvltduqojgdgdjhca.supabase.co/auth/v1/callback
   ```
3. Save and wait 5 minutes

---

### Issue 4: Can't add authorized domain
**Cause:** Domain ownership not verified

**Fix:**
1. Google will provide verification methods:
   - Add TXT record to DNS
   - Upload HTML file to website
   - Add meta tag to homepage
2. Follow Google's instructions
3. Verification may take 24-48 hours

---

### Issue 5: Logo not showing
**Cause:** Image too large, wrong format, or not square

**Fix:**
1. Make sure image is square (1:1 ratio)
2. Resize to 512x512px or 1024x1024px
3. Convert to PNG
4. Compress to under 1MB
5. Re-upload

---

## 📋 Quick Checklist

Before testing, make sure you've done:

- [ ] Set App name to "dekord"
- [ ] Uploaded dekord logo (square, PNG)
- [ ] Added application home page URL
- [ ] Added privacy policy URL
- [ ] Added terms of service URL
- [ ] Added authorized domains (vercel.app, supabase.co)
- [ ] Added required scopes (email, profile, openid)
- [ ] **Published the app** (changed from Testing to Production)
- [ ] Verified authorized redirect URIs in Credentials
- [ ] Waited 10 minutes for changes to propagate
- [ ] Cleared browser cache
- [ ] Tested in incognito mode

---

## 🎯 Expected Result

After completing all steps, when you click "Continue with Google":

**Before (Current):**
```
❌ Choose an account
❌ to continue to awkcvltduqojgdgdjhca.supabase.co
```

**After (Fixed):**
```
✅ [Your Logo]
✅ Sign in with Google
✅ Continue to dekord
✅ dekord wants to access your Google Account
```

---

## 🚀 Speed Issues You Mentioned

### Why OAuth is slow:
1. **First redirect:** Your site → Google
2. **Google authentication:** User selects account
3. **Second redirect:** Google → Supabase
4. **Third redirect:** Supabase → Your site

This is normal for OAuth! Usually takes 3-5 seconds total.

### To make it faster:
- ✅ Already using Vercel (fast servers)
- ✅ Supabase is fast
- ✅ Google OAuth is optimized
- The delay is mostly from Google's authentication page
- Can't be significantly improved (it's the OAuth standard)

---

## 📞 Need Help?

If you're still stuck:

1. **Screenshot what you see in:**
   - Google Cloud Console → OAuth consent screen
   - The current publishing status
   - Your OAuth credentials page

2. **Check these:**
   - Is app published? (not in Testing mode)
   - Did you wait 10 minutes after changes?
   - Is logo uploaded and showing in console?

---

## ✅ Summary

**Main fix:** Publish your app in Google Cloud Console!

1. Go to OAuth consent screen
2. Fill in app name "dekord"
3. Upload logo
4. Add URLs
5. **Click "PUBLISH APP"** ← Most important!
6. Wait 10 minutes
7. Test again

The Supabase URL will disappear and your app name will show! 🎉

---

**Let me know when you've made these changes and we'll test it together!**

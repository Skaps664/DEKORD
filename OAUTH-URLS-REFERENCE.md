# 🔐 OAuth Configuration Quick Reference

## Your Production Domain:
```
https://dekord-testing.vercel.app
```

---

## 📍 Google Cloud Console Settings

### **Location:** https://console.cloud.google.com/apis/credentials

### **Authorized JavaScript Origins:**
Add these domains:
```
https://dekord-testing.vercel.app
http://localhost:3000
```

### **Authorized Redirect URIs:**
Add ONLY this Supabase URL:
```
https://awkcvltduqojgdgdjhca.supabase.co/auth/v1/callback
```

**❌ DO NOT add your Vercel domain here!**
OAuth flow: Google → Supabase → Your site

---

## 📍 Supabase Dashboard Settings

### **Location:** https://supabase.com/dashboard/project/awkcvltduqojgdgdjhca/auth/url-configuration

### **Site URL:**
```
https://dekord-testing.vercel.app
```

### **Redirect URLs:**
Add both:
```
https://dekord-testing.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

---

## 📍 Vercel Environment Variables

### **Location:** https://vercel.com/[your-username]/dekord-testing/settings/environment-variables

### **Required Variables:**

**1. NEXT_PUBLIC_SUPABASE_URL**
```
https://awkcvltduqojgdgdjhca.supabase.co
```

**2. NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
[Your anon key from .env.local file]
```

**3. NEXT_PUBLIC_FACEBOOK_PIXEL_ID** (Optional)
```
[Your pixel ID if you have one]
```

Select for ALL environments: ✅ Production ✅ Preview ✅ Development

---

## 🔄 OAuth Flow Diagram

```
User clicks "Continue with Google"
         ↓
Google Login Page
         ↓
User authenticates
         ↓
Google redirects to:
https://awkcvltduqojgdgdjhca.supabase.co/auth/v1/callback
         ↓
Supabase processes OAuth
         ↓
Supabase redirects to:
https://dekord-testing.vercel.app/auth/callback
         ↓
Your app sets session
         ↓
Redirects to:
https://dekord-testing.vercel.app/account
         ↓
✅ User logged in!
```

---

## ✅ Checklist

Before testing OAuth:

- [ ] Added environment variables in Vercel
- [ ] Updated Supabase Site URL
- [ ] Updated Supabase Redirect URLs
- [ ] Updated Google Authorized JavaScript Origins
- [ ] Verified Google has Supabase callback URL
- [ ] Waited 5-10 minutes for Google changes
- [ ] Deployed to Vercel (git push)
- [ ] Cleared browser cache

---

## 🧪 Test OAuth

1. Go to: https://dekord-testing.vercel.app/auth
2. Click "Continue with Google"
3. Select Google account
4. Should redirect to /account
5. ✅ User should be logged in

---

## 🐛 Common Issues

### "redirect_uri_mismatch"
- Check Google Console has correct Supabase URL
- Wait 10 minutes after changing settings
- Clear browser cache

### OAuth just spins/nothing happens
- Check Vercel env variables are set
- Check Supabase Site URL is correct
- Check browser console for errors

### Redirects to wrong URL
- Check Supabase Redirect URLs
- Should have your Vercel domain + /auth/callback

---

## 📝 Save This File!

Keep this as reference when configuring OAuth.

All URLs and settings in one place! 🎯

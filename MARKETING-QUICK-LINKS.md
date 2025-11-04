# 🔗 Marketing & Analytics - Quick Links

All the dashboards and tools you need, in one place!

---

## 🎯 Main Dashboards

| Platform | URL | What It Does |
|----------|-----|--------------|
| **Google Search Console** | https://search.google.com/search-console | SEO, indexing, search performance |
| **Google Analytics 4** | https://analytics.google.com | Website traffic & behavior analytics |
| **Google Business Profile** | https://business.google.com | Local business listing on Maps |
| **Facebook Business Manager** | https://business.facebook.com | Manage Facebook/Instagram/Ads |
| **Facebook Events Manager** | https://business.facebook.com/events_manager2 | Pixel & conversion tracking |
| **Meta Business Suite** | https://business.facebook.com | Unified FB/IG dashboard |
| **Google Tag Manager** | https://tagmanager.google.com | Tag management (optional) |

---

## 🔧 Setup & Configuration

| Task | URL | Status |
|------|-----|--------|
| **Add GA4 Property** | https://analytics.google.com/analytics/web/#/a/property/create | ⏳ Todo |
| **Verify Search Console** | https://search.google.com/search-console/welcome | ⏳ Todo |
| **Create Facebook Page** | https://www.facebook.com/pages/creation | ⏳ Todo |
| **Create Instagram Business** | Instagram App → Profile → Settings | ⏳ Todo |
| **Create Facebook Pixel** | https://business.facebook.com/events_manager2/list | ⏳ Todo |
| **Google OAuth Console** | https://console.cloud.google.com/apis/credentials | ✅ Done |

---

## 📱 Testing Tools

| Tool | URL / Extension | Purpose |
|------|-----------------|---------|
| **GA Debugger** | [Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/) | Test GA4 events |
| **Facebook Pixel Helper** | [Chrome Extension](https://chrome.google.com/webstore/detail/facebook-pixel-helper/) | Test Pixel events |
| **DNS Checker** | https://dnschecker.org | Check DNS propagation |
| **PageSpeed Insights** | https://pagespeed.web.dev | Test site speed |
| **Mobile-Friendly Test** | https://search.google.com/test/mobile-friendly | Test mobile usability |
| **Rich Results Test** | https://search.google.com/test/rich-results | Test structured data |

---

## 📊 Analytics Dashboards

### **Google Analytics 4**

| Report | URL | What It Shows |
|--------|-----|---------------|
| **Real-time** | GA4 → Reports → Real-time | Live visitors right now |
| **Overview** | GA4 → Reports → Overview | Key metrics summary |
| **E-commerce** | GA4 → Reports → Monetization → E-commerce purchases | Revenue, transactions, products |
| **Acquisition** | GA4 → Reports → Acquisition | Traffic sources |
| **User** | GA4 → Reports → User → Demographics | User info (age, gender, location) |

### **Facebook Events Manager**

| Section | What It Shows |
|---------|---------------|
| **Test Events** | Real-time event testing |
| **Overview** | Pixel event summary (last 7 days) |
| **Data Sources** | All pixels & conversions API |
| **Aggregated Events** | iOS 14+ event prioritization |

---

## 🛍️ E-commerce Platforms

| Platform | URL | Status |
|----------|-----|--------|
| **Facebook Shop** | https://www.facebook.com/commerce_manager | ⏳ Optional |
| **Instagram Shopping** | Instagram → Profile → Edit Profile → Shopping | ⏳ Optional |
| **Google Shopping** | https://merchants.google.com | ⏳ Optional |

---

## 📝 Content Management

| Platform | URL | Purpose |
|----------|-----|---------|
| **Meta Business Suite** | https://business.facebook.com | Post to FB/IG from one place |
| **Facebook Page** | https://www.facebook.com/your-page | Your Facebook page |
| **Instagram** | https://www.instagram.com | Instagram mobile/web |

---

## 💰 Advertising

| Platform | URL | Purpose |
|----------|-----|---------|
| **Facebook Ads Manager** | https://adsmanager.facebook.com | Create & manage FB/IG ads |
| **Google Ads** | https://ads.google.com | Create Google ads (optional) |
| **Facebook Ad Library** | https://www.facebook.com/ads/library | See competitors' ads |

---

## 📖 Documentation & Help

| Resource | URL |
|----------|-----|
| **GA4 Setup Guide** | `/website/GA4-INTEGRATION-GUIDE.md` |
| **Complete Marketing Setup** | `/website/CONNECT-MARKETING-ANALYTICS.md` |
| **Domain Setup Guide** | `/website/SETUP-DEKORD-ONLINE.md` |
| **OAuth Branding Guide** | `/website/FIX-GOOGLE-OAUTH-BRANDING.md` |
| **Vercel Dashboard** | https://vercel.com/dashboard |
| **Supabase Dashboard** | https://supabase.com/dashboard |

---

## 🔑 Environment Variables Needed

Add these to `.env.local` and Vercel:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Facebook Pixel (Update with new ID)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345

# Already Have (Don't Change)
NEXT_PUBLIC_SUPABASE_URL=https://awkcvltduqojgdgdjhca.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=882515784910-...
```

---

## ✅ Setup Checklist

### **Week 1 - Analytics Foundation**
- [ ] Create Google Search Console property
- [ ] Verify domain ownership
- [ ] Submit sitemap
- [ ] Create Google Analytics 4 property
- [ ] Get GA4 Measurement ID
- [ ] Add to .env.local and Vercel
- [ ] Test GA4 with debugger

### **Week 2 - Social Media**
- [ ] Create Facebook Business Manager
- [ ] Create Facebook Page
- [ ] Create Instagram Business account
- [ ] Connect Instagram to Facebook
- [ ] Create Facebook Pixel
- [ ] Update Pixel ID in .env.local
- [ ] Verify domain in Facebook
- [ ] Test Pixel with Pixel Helper

### **Week 3 - Local Presence**
- [ ] Create Google Business Profile
- [ ] Add photos and details
- [ ] Verify business
- [ ] Complete profile
- [ ] Monitor reviews

### **Week 4 - Advertising**
- [ ] Create Facebook Ad Account
- [ ] Set up payment method
- [ ] Create first test ad campaign
- [ ] Monitor performance
- [ ] Optimize based on results

---

## 🎯 Priority Order

**Do These First (Critical):**
1. ⭐ Google Analytics 4 - Track all visitors
2. ⭐ Google Search Console - SEO essentials
3. ⭐ Facebook Pixel - Track conversions

**Do These Next (Important):**
4. Facebook Business Manager - Required for ads
5. Facebook Page - Social presence
6. Instagram Business - Additional channel

**Do These Later (Optional):**
7. Google Business Profile - Local presence
8. Google Tag Manager - Tag management
9. Google Ads - Additional advertising

---

## 🆘 Support & Resources

| Need Help With | Contact |
|----------------|---------|
| **Google Analytics** | https://support.google.com/analytics |
| **Facebook Business** | https://www.facebook.com/business/help |
| **Domain Issues** | Your domain registrar support |
| **Vercel Issues** | https://vercel.com/support |
| **Code Issues** | Ask me! |

---

## 📊 KPIs to Track

### **Website Performance:**
- Daily visitors (GA4)
- Page views per session (GA4)
- Bounce rate (GA4)
- Average session duration (GA4)

### **E-commerce:**
- Conversion rate (Orders ÷ Visitors)
- Average order value (Total revenue ÷ Orders)
- Cart abandonment rate (GA4)
- Revenue per visitor (GA4)

### **Marketing:**
- Cost per acquisition (Ad spend ÷ Conversions)
- Return on ad spend (Revenue ÷ Ad spend)
- Click-through rate (Clicks ÷ Impressions)
- Pixel events (Facebook Events Manager)

### **SEO:**
- Organic impressions (Search Console)
- Average position (Search Console)
- Click-through rate (Search Console)
- Indexed pages (Search Console)

---

## 🎓 Learning Resources

### **Free Courses:**
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Facebook Blueprint](https://www.facebook.com/business/learn)
- [Google Digital Garage](https://learndigital.withgoogle.com/digitalgarage)

### **YouTube Channels:**
- Measure School (GA4 tutorials)
- Facebook Ads Mastery
- Neil Patel (Digital marketing)

---

**Bookmark this page for quick access to all your marketing tools!** 🚀

Next step: Get your GA4 Measurement ID and add it to `.env.local`!

# dekord SEO Migration Checklist

## ✅ COMPLETED: Technical SEO Setup

### 1. Metadata & Meta Tags
- ✅ Configured proper title templates
- ✅ Added comprehensive meta descriptions
- ✅ Set up OpenGraph tags for social sharing
- ✅ Configured Twitter Card metadata
- ✅ Added keywords and author information
- ✅ Set canonical URLs

### 2. Structured Data (JSON-LD)
- ✅ Organization schema
- ✅ Product schema utilities
- ✅ Breadcrumb schema
- ✅ LocalBusiness schema
- ✅ Website search schema

### 3. Technical Files
- ✅ `sitemap.ts` - Dynamic sitemap generation
- ✅ `robots.txt` - Crawler configuration
- ✅ `next.config.mjs` - SEO optimizations
- ✅ `/lib/seo-utils.tsx` - Reusable SEO functions

### 4. Performance & Security
- ✅ Image optimization (AVIF, WebP)
- ✅ Compression enabled
- ✅ Security headers configured
- ✅ DNS prefetching

---

## 🔜 TODO BEFORE LAUNCH

### 1. Google Search Console Setup
```bash
# Steps:
1. Go to: https://search.google.com/search-console
2. Add property: dekord.online
3. Get verification code
4. Add code to app/layout.tsx (already prepared - line with "your-google-verification-code")
5. Verify ownership
6. Submit sitemap: https://dekord.online/sitemap.xml
```

### 2. OpenGraph Images
Create a 1200x630px image for social sharing:
- **Location**: `/public/og-image.jpg`
- **Dimensions**: 1200 x 630 pixels
- **Format**: JPG or PNG
- **Content**: dekord branding + product showcase
- **File size**: < 1MB

Tools to create:
- Canva: https://www.canva.com (1200x630 template)
- Figma: Export frame as 1200x630
- Photoshop/GIMP

### 3. Logo Files
Create and add to `/public/`:
- `logo.png` - Full color logo (512x512px)
- `favicon.ico` - 32x32px favicon
- `apple-touch-icon.png` - 180x180px iOS icon

### 4. Update Contact Information
In `/app/layout.tsx` line 60-65, add:
- Your actual phone number
- Exact GPS coordinates (use Google Maps)
- Social media URLs

In `/lib/seo-utils.tsx` line 68-75:
- Your phone number
- Exact coordinates
- Opening hours

### 5. Domain Migration from Shopify to Vercel

#### A. Prepare Shopify Redirects
In `next.config.mjs`, add your old Shopify URLs:
```javascript
async redirects() {
  return [
    {
      source: '/collections/cables',
      destination: '/shop',
      permanent: true,
    },
    {
      source: '/products/:slug',
      destination: '/product/:slug',
      permanent: true,
    },
    // Add ALL your Shopify product URLs here
  ]
}
```

#### B. Export Shopify Data
1. Export all product URLs from Shopify
2. Export customer data (if needed)
3. Download all product images
4. Save all blog posts/content

#### C. DNS Change Process
**⚠️ CRITICAL: Follow this exact order to avoid downtime**

1. **Deploy to Vercel first**
   ```bash
   vercel --prod
   ```

2. **Add domain in Vercel**
   - Go to Vercel Dashboard
   - Project Settings → Domains
   - Add: dekord.online

3. **Get Vercel DNS records**
   - Note the CNAME/A records provided

4. **In Shopify domain settings:**
   - Keep domain connected until Vercel is ready
   - Don't remove until step 6

5. **Update DNS at your registrar:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel IP)
   TTL: 300

   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   TTL: 300
   ```

6. **Wait for DNS propagation (1-48 hours)**
   Check: https://dnschecker.org

7. **After propagation, remove from Shopify**

#### D. Post-Migration SEO Tasks

1. **Submit URL change in Google Search Console**
   - Property Settings → Change of Address
   - Old: yourstore.myshopify.com
   - New: dekord.online

2. **Request re-indexing**
   - Submit all important pages for re-crawling
   - Submit sitemap.xml

3. **Update Google Business Profile**
   - Change website URL to new domain
   - Update all social media links

4. **Set up 301 redirects in Shopify**
   - In Shopify admin, add redirect:
   - From: yourstore.myshopify.com/*
   - To: https://dekord.online/$1

5. **Monitor for 2-4 weeks**
   - Check Google Analytics for traffic
   - Monitor Search Console for errors
   - Check for broken links
   - Monitor rankings

---

## 📊 SEO Monitoring Tools

### Free Tools to Use:
1. **Google Search Console** - Monitor indexing & rankings
2. **Google Analytics** - Track traffic
3. **PageSpeed Insights** - Performance monitoring
4. **Mobile-Friendly Test** - Mobile optimization

### Weekly Checks:
- [ ] Search Console coverage report
- [ ] Core Web Vitals scores
- [ ] Mobile usability issues
- [ ] Sitemap submission status

---

## 🚀 Performance Optimization

Already implemented:
- ✅ Next.js Image optimization
- ✅ AVIF/WebP image formats
- ✅ Compression enabled
- ✅ Security headers

Additional recommendations:
- Use Vercel Analytics for real user monitoring
- Implement lazy loading for below-fold content
- Minimize JavaScript bundle size
- Use CDN for static assets

---

## 📱 Social Media & Marketing

Update links everywhere:
- [ ] Instagram bio link
- [ ] Facebook page
- [ ] Google Business Profile
- [ ] Email signatures
- [ ] Business cards
- [ ] Product packaging
- [ ] WhatsApp Business profile

---

## 🔍 Keywords to Target

Primary:
- "premium charging cables Pakistan"
- "100W USB-C cable"
- "fast charging cables Peshawar"
- "dekord cables"

Long-tail:
- "best 100W charging cable Pakistan"
- "durable USB-C cable for MacBook"
- "luxury tech accessories Peshawar"
- "60W to 100W power delivery cable"

---

## 💡 Content Strategy for SEO

Create these pages:
1. `/blog` - Tech tips, cable care guides
2. `/about` - Brand story
3. `/warranty` - Trust signals
4. `/shipping` - Clear policies
5. `/reviews` - Customer testimonials

Each product page should have:
- Unique descriptions (no duplicates)
- Technical specifications
- Usage scenarios
- Customer reviews
- Related products

---

## ⚠️ Common Migration Mistakes to Avoid

1. ❌ Changing URLs without redirects
2. ❌ Removing old site before new one is indexed
3. ❌ Not updating Google Search Console
4. ❌ Forgetting to test mobile version
5. ❌ Not monitoring 404 errors after launch
6. ❌ Ignoring page speed after migration
7. ❌ Not updating social media links

---

## 📞 Need Help?

If you see traffic drops or indexing issues:
1. Check Google Search Console for errors
2. Verify all redirects are working
3. Ensure sitemap is accessible
4. Check robots.txt isn't blocking pages
5. Confirm DNS is fully propagated

---

**Remember**: SEO takes time. After migration, allow 2-4 weeks for Google to re-index and rankings to stabilize. Initial drops are normal and temporary.

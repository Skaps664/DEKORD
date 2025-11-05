# Blog Database Setup - Complete Guide

## Overview
Your blog page has been updated to pull real data from the Supabase database instead of using hardcoded data.

## What Was Changed

### 1. **Blog Page (`/app/blog/page.tsx`)**
- ✅ Removed hardcoded blog posts array
- ✅ Added `getBlogPosts()` service call
- ✅ Added loading state
- ✅ Added empty state handling
- ✅ Now displays real data from database with proper date formatting
- ✅ Shows category, author name, excerpt, and featured image from database

### 2. **SQL Script Created (`INSERT-BLOG-POSTS.sql`)**
- Contains all 3 existing blog posts with full content
- Proper HTML formatting with headings, paragraphs, lists
- Categories: "Brand Story" and "Product Launch"
- Tags included for each post
- Published dates set correctly

## How to Set Up (Run Once)

### Step 1: Run the SQL Script

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Open the file: `/website/INSERT-BLOG-POSTS.sql`
4. Copy the entire SQL content
5. Paste it into the SQL Editor
6. Click **Run** or press `Ctrl+Enter`

### Step 2: Verify the Data

After running the script, you should see:
```
✅ 3 rows inserted/updated
```

The verification query at the end will show:
- dekord: Where Love Meets Hard Work
- Dekord is Launching Soon
- dekord – Defy Ordinary

### Step 3: Refresh Your Website

1. Go to your website's blog page: `http://localhost:3000/blog`
2. You should now see the 3 blog posts loaded from the database
3. They should display:
   - Title
   - Excerpt
   - Category badge
   - Published date (formatted nicely)
   - Author name
   - Featured image
   - "Read More" link

## Blog Posts Included

### 1. **dekord: Where Love Meets Hard Work**
- **Date:** November 3, 2025
- **Category:** Brand Story
- **Featured:** Yes
- **Content:** Full article about quality, trust, and building process

### 2. **Dekord is Launching Soon**
- **Date:** October 1, 2025
- **Category:** Product Launch
- **Featured:** Yes
- **Content:** Launch announcement and product details

### 3. **dekord – Defy Ordinary**
- **Date:** September 15, 2025
- **Category:** Brand Story
- **Featured:** No
- **Content:** Brand philosophy and market positioning

## How to Add New Blog Posts

### Option 1: Through Admin Panel
1. Go to your admin panel: `http://localhost:3000/admin/blog`
2. Click "Create New Post"
3. Fill in all fields (title, content, excerpt, category, etc.)
4. Set status to "Published"
5. Click "Save"

### Option 2: Through SQL
```sql
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  featured_image,
  author_id,
  author_name,
  category,
  tags,
  status,
  featured,
  published_at
) VALUES (
  'Your Blog Title',
  'your-blog-slug',
  'Short excerpt...',
  '<h2>Full Content</h2><p>Your article...</p>',
  '/your-image.jpg',
  (SELECT id FROM auth.users LIMIT 1),
  'dekord Team',
  'Category Name',
  ARRAY['tag1', 'tag2'],
  'published',
  false,
  NOW()
);
```

## Troubleshooting

### Issue: Blog page shows "No blog posts found"
**Solution:** 
1. Check if SQL script ran successfully
2. Verify data in Supabase: `SELECT * FROM blog_posts WHERE status = 'published';`
3. Check browser console for errors

### Issue: Images not loading
**Solution:**
1. Ensure images exist in `/public/` folder
2. Or upload images to Supabase Storage
3. Update `featured_image` path in database

### Issue: Individual blog post pages not working
**Solution:**
The individual blog post pages (like `/blog/dekord-launching-soon/page.tsx`) are still hardcoded. 
To make them dynamic:
1. Create a dynamic route: `/app/blog/[slug]/page.tsx`
2. Use `getBlogPostBySlug()` service
3. Render content from database

## Database Schema Reference

```typescript
interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string              // HTML content
  featured_image: string | null
  author_id: string | null
  author_name: string | null
  category: string | null      // Simple string, not relation
  tags: string[]              // Array of strings
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  view_count: number
  like_count: number
  featured: boolean
  created_at: string
  updated_at: string
}
```

## Next Steps (Optional)

1. **Create Dynamic Blog Post Pages**
   - Replace hardcoded post pages with `[slug]` dynamic route
   - Pull content from database

2. **Add Blog Search**
   - Use `getBlogPosts()` with search parameters
   - Filter by category or tags

3. **Add Blog Comments**
   - Create comments table
   - Link to blog posts

4. **Add Blog SEO**
   - Use `meta_title` and `meta_description` fields
   - Generate Open Graph tags

## Status

✅ Blog listing page pulling from database  
✅ SQL script ready with 3 posts  
✅ Service functions working  
⏳ Individual blog post pages (still hardcoded - optional to convert)  
⏳ Admin blog management (already exists in admin panel)

---

**You're all set!** Just run the SQL script in Supabase and your blog will display real data! 🎉

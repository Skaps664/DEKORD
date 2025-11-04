-- ============================================
-- ADD SEO FIELDS & BLOG FUNCTIONALITY
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. ENSURE SEO FIELDS EXIST ON PRODUCTS
-- ============================================
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT; -- Custom Open Graph image for social sharing

-- Create index for better SEO performance
CREATE INDEX IF NOT EXISTS idx_products_meta_title ON products(meta_title);

COMMENT ON COLUMN products.meta_title IS 'SEO meta title for product page (50-60 chars)';
COMMENT ON COLUMN products.meta_description IS 'SEO meta description for product page (150-160 chars)';
COMMENT ON COLUMN products.og_image IS 'Custom Open Graph image URL for social sharing';

-- ============================================
-- 2. ENSURE SEO FIELDS EXIST ON COLLECTIONS
-- ============================================
ALTER TABLE collections 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT;

CREATE INDEX IF NOT EXISTS idx_collections_meta_title ON collections(meta_title);

COMMENT ON COLUMN collections.meta_title IS 'SEO meta title for collection page (50-60 chars)';
COMMENT ON COLUMN collections.meta_description IS 'SEO meta description for collection page (150-160 chars)';
COMMENT ON COLUMN collections.og_image IS 'Custom Open Graph image URL for social sharing';

-- ============================================
-- 3. CREATE BLOG POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Content
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT, -- Short summary (150-200 chars)
  content TEXT NOT NULL, -- Full blog post content (Markdown or HTML)
  
  -- Featured image
  featured_image TEXT,
  featured_image_alt TEXT,
  
  -- Author (optional - link to user)
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT, -- Fallback if not using user system
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT, -- Custom Open Graph image
  
  -- Categorization
  category TEXT, -- 'tech', 'lifestyle', 'tutorials', etc.
  tags TEXT[], -- Array of tags ['usb-c', 'charging', 'tips']
  
  -- Status
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  published_at TIMESTAMPTZ,
  
  -- Engagement metrics
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  
  -- Display order
  featured BOOLEAN DEFAULT false, -- Show on homepage?
  sort_order INTEGER DEFAULT 0,
  
  -- Reading time (auto-calculated or manual)
  read_time_minutes INTEGER, -- e.g., "5 min read"
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for blog posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags); -- For tag searches

COMMENT ON TABLE blog_posts IS 'Blog posts and articles for content marketing';
COMMENT ON COLUMN blog_posts.excerpt IS 'Short summary shown in blog listing (150-200 chars)';
COMMENT ON COLUMN blog_posts.meta_title IS 'SEO meta title (50-60 chars, defaults to title if empty)';
COMMENT ON COLUMN blog_posts.meta_description IS 'SEO meta description (150-160 chars, defaults to excerpt if empty)';
COMMENT ON COLUMN blog_posts.featured IS 'Show this post on homepage or featured sections';
COMMENT ON COLUMN blog_posts.read_time_minutes IS 'Estimated reading time in minutes';

-- ============================================
-- 4. BLOG CATEGORIES TABLE (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0, -- Cache count for performance
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

COMMENT ON TABLE blog_categories IS 'Blog post categories for organization';

-- ============================================
-- 5. BLOG TAGS TABLE (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  post_count INTEGER DEFAULT 0, -- Cache count
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_tags_slug ON blog_tags(slug);

COMMENT ON TABLE blog_tags IS 'Blog post tags for filtering and SEO';

-- ============================================
-- 6. ROW LEVEL SECURITY FOR BLOG
-- ============================================

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

-- Public can read published blog posts
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Public can read all categories
CREATE POLICY "Public can view blog categories"
  ON blog_categories FOR SELECT
  USING (true);

-- Public can read all tags
CREATE POLICY "Public can view blog tags"
  ON blog_tags FOR SELECT
  USING (true);

-- ============================================
-- 7. TRIGGERS FOR BLOG
-- ============================================

-- Auto-update updated_at on blog posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-update published_at when status changes to published
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_set_published_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION set_published_at();

-- ============================================
-- 8. HELPER FUNCTIONS
-- ============================================

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_blog_view(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET view_count = view_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate reading time (based on word count)
CREATE OR REPLACE FUNCTION calculate_reading_time(content_text TEXT)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER;
  reading_time INTEGER;
BEGIN
  -- Average reading speed: 200 words per minute
  word_count := array_length(regexp_split_to_array(content_text, '\s+'), 1);
  reading_time := CEIL(word_count::NUMERIC / 200);
  
  -- Minimum 1 minute
  IF reading_time < 1 THEN
    reading_time := 1;
  END IF;
  
  RETURN reading_time;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. SEED DATA FOR BLOG
-- ============================================

-- Insert blog categories
INSERT INTO blog_categories (name, slug, description, meta_title, meta_description) VALUES
('Tech Tips', 'tech-tips', 'Technology tips and tricks', 'Tech Tips | dekord Blog', 'Latest technology tips and charging cable tricks'),
('Lifestyle', 'lifestyle', 'Lifestyle and productivity', 'Lifestyle | dekord Blog', 'Lifestyle tips and productivity hacks'),
('Product Reviews', 'product-reviews', 'In-depth product reviews', 'Product Reviews | dekord Blog', 'Honest reviews of tech accessories and gadgets'),
('Tutorials', 'tutorials', 'How-to guides and tutorials', 'Tutorials | dekord Blog', 'Step-by-step guides for using tech accessories')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog post
INSERT INTO blog_posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image,
  category,
  tags,
  status,
  published_at,
  meta_title,
  meta_description,
  featured,
  read_time_minutes
) VALUES (
  'How to Choose the Right USB-C Cable for Fast Charging',
  'how-to-choose-usb-c-cable-fast-charging',
  'Not all USB-C cables are created equal. Learn how to pick the perfect cable for your device and charging needs.',
  'When it comes to charging your devices quickly and safely, choosing the right USB-C cable is crucial. Here''s what you need to know...',
  '/blog/usb-c-cables-guide.jpg',
  'tech-tips',
  ARRAY['usb-c', 'charging', 'cables', 'tips'],
  'published',
  NOW(),
  'How to Choose the Right USB-C Cable | dekord',
  'Learn how to pick the perfect USB-C cable for fast charging. Expert tips on wattage, quality, and compatibility.',
  true,
  5
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 10. VERIFICATION QUERIES
-- ============================================

-- Check products have SEO fields
SELECT 
  'Products SEO Fields' as check_name,
  COUNT(*) as total_products,
  COUNT(meta_title) as with_meta_title,
  COUNT(meta_description) as with_meta_description
FROM products;

-- Check collections have SEO fields
SELECT 
  'Collections SEO Fields' as check_name,
  COUNT(*) as total_collections,
  COUNT(meta_title) as with_meta_title,
  COUNT(meta_description) as with_meta_description
FROM collections;

-- Check blog posts table exists
SELECT 
  'Blog Posts Table' as check_name,
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE status = 'published') as published_posts,
  COUNT(*) FILTER (WHERE featured = true) as featured_posts
FROM blog_posts;

-- List all blog categories
SELECT name, slug, post_count FROM blog_categories ORDER BY sort_order;

-- ============================================
-- ✅ COMPLETE!
-- ============================================

SELECT '✅ SEO fields and blog schema added successfully!' as message;

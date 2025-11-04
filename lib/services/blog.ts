import { supabase } from '../supabase/client'
import type { BlogPost, BlogCategory, BlogTag } from '../types/database'

// ============================================
// BLOG POSTS
// ============================================

/**
 * Get all published blog posts with pagination
 */
export async function getBlogPosts(options: {
  page?: number
  pageSize?: number
  category?: string
  tag?: string
  featured?: boolean
} = {}) {
  const { page = 1, pageSize = 10, category, tag, featured } = options
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('blog_posts')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  if (tag) {
    query = query.contains('tags', [tag])
  }

  if (featured) {
    query = query.eq('featured', true)
  }

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error('Error fetching blog posts:', error)
    return { data: null, error: error.message, count: 0 }
  }

  return { data, error: null, count: count || 0 }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return { data: null, error: error.message }
  }

  // Increment view count (fire and forget)
  supabase.rpc('increment_blog_view', { post_id: data.id }).then()

  return { data, error: null }
}

/**
 * Get featured blog posts for homepage
 */
export async function getFeaturedBlogPosts(limit: number = 3) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured posts:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

/**
 * Get related blog posts (same category or tags)
 */
export async function getRelatedBlogPosts(postId: string, limit: number = 3) {
  // First get the current post's category and tags
  const { data: currentPost, error: fetchError } = await supabase
    .from('blog_posts')
    .select('category, tags')
    .eq('id', postId)
    .single()

  if (fetchError || !currentPost) {
    return { data: null, error: fetchError?.message || 'Post not found' }
  }

  // Get posts with same category or overlapping tags
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .neq('id', postId)
    .or(`category.eq.${currentPost.category},tags.ov.{${currentPost.tags?.join(',') || ''}}`)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related posts:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(query: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order('published_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error searching blog posts:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// ============================================
// BLOG CATEGORIES
// ============================================

/**
 * Get all blog categories
 */
export async function getBlogCategories() {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching blog categories:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

/**
 * Get a blog category by slug
 */
export async function getBlogCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog category:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// ============================================
// BLOG TAGS
// ============================================

/**
 * Get all blog tags
 */
export async function getBlogTags() {
  const { data, error } = await supabase
    .from('blog_tags')
    .select('*')
    .order('post_count', { ascending: false })

  if (error) {
    console.error('Error fetching blog tags:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

/**
 * Get popular tags (with most posts)
 */
export async function getPopularBlogTags(limit: number = 10) {
  const { data, error } = await supabase
    .from('blog_tags')
    .select('*')
    .order('post_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching popular tags:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

// ============================================
// SEO HELPERS
// ============================================

/**
 * Generate meta tags for a blog post
 */
export function generateBlogMeta(post: BlogPost) {
  return {
    title: post.meta_title || `${post.title} | dekord Blog`,
    description: post.meta_description || post.excerpt || post.title,
    ogImage: post.og_image || post.featured_image || '/dekord-logo-new.png',
    ogType: 'article',
    publishedTime: post.published_at,
    tags: post.tags,
    category: post.category,
  }
}

/**
 * Generate meta tags for a blog category
 */
export function generateCategoryMeta(category: BlogCategory) {
  return {
    title: category.meta_title || `${category.name} | dekord Blog`,
    description: category.meta_description || category.description || `Read about ${category.name}`,
  }
}

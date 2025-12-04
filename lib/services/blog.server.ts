// Server-side database service for Blog (for SSR/ISR)
import { createClient, createStaticClient } from '../supabase/server'
import type { BlogPost } from '../types/database'

export async function getBlogPostsServer(options: {
  page?: number
  pageSize?: number
  category?: string
  tag?: string
  featured?: boolean
} = {}) {
  const { page = 1, pageSize = 10, category, tag, featured } = options
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const supabase = await createClient()
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

export async function getBlogPostBySlugServer(slug: string) {
  const supabase = await createClient()
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

  return { data, error: null }
}

export async function getAllBlogSlugs() {
  const supabase = createStaticClient()
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
  
  if (error) {
    console.error('Error fetching blog slugs:', error)
    return { data: null, error: error.message }
  }
  
  return { data, error: null }
}

export async function incrementBlogView(postId: string) {
  const supabase = await createClient()
  await supabase.rpc('increment_blog_view', { post_id: postId })
}

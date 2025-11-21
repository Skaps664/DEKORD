// Database Types for dekord E-commerce

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  category: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'archived'
  main_image: string
  image_2: string | null
  image_3: string | null
  image_4: string | null
  image_5: string | null
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  rating: number | null
  review_count: number
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  length: string | null
  color: string | null
  sku: string
  price_override: number | null
  stock: number
  variant_image: string | null
  is_available: boolean
  created_at: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  banner_image: string | null
  status: 'active' | 'draft'
  sort_order: number
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  created_at: string
  updated_at: string
}

export interface CollectionProduct {
  id: string
  collection_id: string
  product_id: string
  sort_order: number
  created_at: string
}

export interface UserProfile {
  id: string
  full_name: string | null
  phone: string | null
  address_line1: string | null
  address_line2: string | null
  city: string | null
  province: string | null
  postal_code: string | null
  marketing_emails: boolean
  // Saved shipping information
  shipping_name: string | null
  shipping_phone: string | null
  shipping_address: string | null
  shipping_city: string | null
  shipping_province: string | null
  shipping_postal_code: string | null
  save_shipping_info: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  user_id: string | null
  user_email: string | null
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_method: string
  subtotal: number
  shipping_fee: number
  discount_amount: number
  total: number
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  shipping_city: string
  shipping_province: string
  shipping_postal_code: string | null
  courier: string | null
  tracking_number: string | null
  tracking_url: string | null
  customer_notes: string | null
  admin_notes: string | null
  coupon_code: string | null
  created_at: string
  updated_at: string
  shipped_at: string | null
  delivered_at: string | null
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  variant_id: string | null
  product_name: string
  variant_details: string | null
  sku: string | null
  unit_price: number
  quantity: number
  total_price: number
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string | null
  merch_id: string | null
  variant_id: string | null
  quantity: number
  created_at: string
  updated_at: string
}

// Blog types

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  featured_image_alt: string | null
  author_id: string | null
  author_name: string | null
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  category: string | null
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  view_count: number
  like_count: number
  featured: boolean
  sort_order: number
  read_time_minutes: number | null
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string | null
  meta_title: string | null
  meta_description: string | null
  sort_order: number
  post_count: number
  created_at: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  post_count: number
  created_at: string
}

// Extended types with relations

export interface ProductWithVariants extends Product {
  variants?: ProductVariant[]
}

export interface CollectionWithProducts extends Collection {
  products?: Product[]
  product_count?: number
}

export interface OrderWithItems extends Order {
  items?: OrderItem[]
}

export interface CartItemWithProduct extends CartItem {
  product?: Product
  variant?: ProductVariant
}

export interface CartItemWithMerch extends CartItem {
  merch?: MerchWithFeatures
}

export interface CartItemWithDetails extends CartItem {
  product?: Product
  variant?: ProductVariant
  merch?: MerchWithFeatures
}

export interface BlogPostWithAuthor extends BlogPost {
  author?: {
    full_name: string | null
  }
}

export interface Review {
  id: string
  product_id: string
  order_id: string
  user_id: string
  rating: number
  title: string | null
  comment: string
  images: string[] | null
  verified_purchase: boolean
  helpful_count: number
  created_at: string
  updated_at: string
}

export interface ReviewWithUser extends Review {
  user?: {
    full_name: string | null
  }
}

export interface Merch {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  sku: string | null
  status: 'active' | 'draft' | 'archived'
  quantity_available: number
  meta_title: string | null
  meta_description: string | null
  image_1: string | null
  image_2: string | null
  image_3: string | null
  image_4: string | null
  image_5: string | null
  created_at: string
  updated_at: string
}

export interface MerchFeature {
  id: string
  merch_id: string
  feature: string
  sort_order: number
  created_at: string
}

export interface MerchWithFeatures extends Merch {
  features: MerchFeature[]
}

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  page_size: number
  total_pages: number
}

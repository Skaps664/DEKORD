// Database service for Cart
import { createClient } from '../supabase/client'
import type { CartItem, CartItemWithProduct } from '../types/database'

export async function getCartItems(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products(*),
      variant:product_variants(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching cart items:', error)
    return { data: null, error: error.message }
  }
  
  return { data: data as CartItemWithProduct[], error: null }
}

export async function addToCart(userId: string, productId: string, variantId?: string, quantity: number = 1) {
  const supabase = createClient()
  
  // Check if item already exists in cart
  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .eq('variant_id', variantId || null)
    .single()
  
  if (existing) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating cart item:', error)
      return { data: null, error: error.message }
    }
    
    return { data: data as CartItem, error: null }
  } else {
    // Insert new item
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        user_id: userId,
        product_id: productId,
        variant_id: variantId || null,
        quantity,
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error adding to cart:', error)
      return { data: null, error: error.message }
    }
    
    return { data: data as CartItem, error: null }
  }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  const supabase = createClient()
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    return removeFromCart(cartItemId)
  }
  
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating cart item quantity:', error)
    return { data: null, error: error.message }
  }
  
  return { data: data as CartItem, error: null }
}

export async function removeFromCart(cartItemId: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)
  
  if (error) {
    console.error('Error removing from cart:', error)
    return { error: error.message }
  }
  
  return { error: null }
}

export async function clearCart(userId: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
  
  if (error) {
    console.error('Error clearing cart:', error)
    return { error: error.message }
  }
  
  return { error: null }
}

export async function getCartTotal(userId: string) {
  const { data: cartItems, error } = await getCartItems(userId)
  
  if (error || !cartItems) {
    return { total: 0, itemCount: 0, error }
  }
  
  const total = cartItems.reduce((sum, item) => {
    const price = item.variant?.price_override || item.product?.price || 0
    return sum + (price * item.quantity)
  }, 0)
  
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  
  return { total, itemCount, error: null }
}

// Database service for Orders
import { createClient } from '../supabase/client'
import type { Order, OrderWithItems, OrderItem } from '../types/database'

export async function getUserOrders(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching user orders:', error)
    return { data: null, error: error.message }
  }
  
  return { data: data as OrderWithItems[], error: null }
}

export async function getOrderById(orderId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('id', orderId)
    .single()
  
  if (error) {
    console.error('Error fetching order:', error)
    return { data: null, error: error.message }
  }
  
  return { data: data as OrderWithItems, error: null }
}

export async function getOrderByNumber(orderNumber: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('order_number', orderNumber)
    .single()
  
  if (error) {
    console.error('Error fetching order:', error)
    return { data: null, error: error.message }
  }
  
  return { data: data as OrderWithItems, error: null }
}

interface CreateOrderData {
  user_id?: string
  user_email?: string
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
  shipping_postal_code?: string
  customer_notes?: string
  items: Array<{
    product_id: string
    variant_id?: string
    product_name: string
    variant_details?: string
    sku?: string
    unit_price: number
    quantity: number
    total_price: number
  }>
}

export async function createOrder(orderData: CreateOrderData) {
  const supabase = createClient()
  
  // Generate order number
  const { data: lastOrder } = await supabase
    .from('orders')
    .select('order_number')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  
  let orderNumber = 'ORD-001'
  if (lastOrder && lastOrder.order_number) {
    const lastNum = parseInt(lastOrder.order_number.split('-')[1])
    orderNumber = `ORD-${String(lastNum + 1).padStart(3, '0')}`
  }
  
  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: orderData.user_id,
      user_email: orderData.user_email,
      payment_method: orderData.payment_method,
      subtotal: orderData.subtotal,
      shipping_fee: orderData.shipping_fee,
      discount_amount: orderData.discount_amount,
      total: orderData.total,
      shipping_name: orderData.shipping_name,
      shipping_phone: orderData.shipping_phone,
      shipping_address: orderData.shipping_address,
      shipping_city: orderData.shipping_city,
      shipping_province: orderData.shipping_province,
      shipping_postal_code: orderData.shipping_postal_code,
      customer_notes: orderData.customer_notes,
      status: 'pending',
    })
    .select()
    .single()
  
  if (orderError) {
    console.error('Error creating order:', orderError)
    return { data: null, error: orderError.message }
  }
  
  // Create order items
  const orderItems = orderData.items.map(item => ({
    ...item,
    order_id: order.id,
  }))
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)
  
  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    // Rollback order creation?
    return { data: null, error: itemsError.message }
  }
  
  return { data: order as Order, error: null }
}

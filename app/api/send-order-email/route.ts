import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface OrderEmailData {
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  total: number
  items: Array<{ product_name: string; quantity: number; unit_price: number }>
  trackingNumber?: string
  trackingUrl?: string
  courier?: string
}

function getEmailContent(type: string, data: OrderEmailData) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dekord.online'
  
  switch (type) {
    case 'placed':
      return {
        subject: `Order Confirmation #${data.orderNumber} - dekord`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .order-details { background: #fff; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .item { padding: 10px 0; border-bottom: 1px solid #eee; }
    .total { font-size: 20px; font-weight: bold; margin-top: 20px; }
    .button { display: inline-block; background: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Order!</h1>
    </div>
    <div class="content">
      <p>Hi ${data.customerName},</p>
      <p>We've received your order and will send you a confirmation on WhatsApp shortly.</p>
      
      <div class="order-details">
        <h2>Order #${data.orderNumber}</h2>
        ${data.items.map(item => `
          <div class="item">
            <strong>${item.product_name}</strong> x ${item.quantity}
            <span style="float: right;">Rs. ${item.unit_price.toFixed(2)}</span>
          </div>
        `).join('')}
        <div class="total">Total: Rs. ${data.total.toFixed(2)}</div>
      </div>
      
      <p><strong>Please confirm your order via WhatsApp within 24 hours.</strong></p>
      
      <a href="${baseUrl}/account/orders" class="button">View Order Status</a>
      
      <p>If you have any questions, reply to this email or contact us.</p>
    </div>
    <div class="footer">
      <p>dekord | Premium Charging Cables</p>
      <p>team@dekord.online</p>
    </div>
  </div>
</body>
</html>
        `
      }
      
    case 'processing':
      return {
        subject: `Order Processing #${data.orderNumber} - dekord`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .status-box { background: #fff; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
    .button { display: inline-block; background: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📦 Your Order is Being Prepared</h1>
    </div>
    <div class="content">
      <p>Hi ${data.customerName},</p>
      
      <div class="status-box">
        <h2>Order #${data.orderNumber}</h2>
        <p style="font-size: 18px; color: #4CAF50;">✓ Confirmed & Processing</p>
        <p>We're carefully preparing your items for shipment.</p>
      </div>
      
      <p>You'll receive tracking information once your order ships.</p>
      
      <a href="${baseUrl}/account/orders" class="button">Track Your Order</a>
    </div>
    <div class="footer">
      <p>dekord | Premium Charging Cables</p>
      <p>team@dekord.online</p>
    </div>
  </div>
</body>
</html>
        `
      }
      
    case 'shipped':
      return {
        subject: `Order Shipped #${data.orderNumber} - dekord`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; }
    .tracking-box { background: #fff; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .button { display: inline-block; background: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚚 Your Order is On Its Way!</h1>
    </div>
    <div class="content">
      <p>Hi ${data.customerName},</p>
      <p>Great news! Your order has been shipped and is on its way to you.</p>
      
      <div class="tracking-box">
        <h2>Order #${data.orderNumber}</h2>
        ${data.courier ? `<p><strong>Courier:</strong> ${data.courier}</p>` : ''}
        ${data.trackingNumber ? `<p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>` : ''}
        ${data.trackingUrl ? `<a href="${data.trackingUrl}" class="button">Track Your Shipment</a>` : ''}
      </div>
      
      <p>You should receive your order within 3-5 business days.</p>
    </div>
    <div class="footer">
      <p>dekord | Premium Charging Cables</p>
      <p>team@dekord.online</p>
    </div>
  </div>
</body>
</html>
        `
      }
      
    case 'delivered':
      return {
        subject: `Order Delivered #${data.orderNumber} - Thank You! - dekord`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 30px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; text-align: center; }
    .thank-you { font-size: 24px; margin: 20px 0; }
    .button { display: inline-block; background: #000; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Delivered Successfully!</h1>
    </div>
    <div class="content">
      <p>Hi ${data.customerName},</p>
      <p class="thank-you">Thank you for trusting dekord!</p>
      
      <p>Your order #${data.orderNumber} has been delivered.</p>
      <p>We hope you love your new charging cables!</p>
      
      <a href="${baseUrl}/account/orders?review=${data.orderId}" class="button">Leave a Review</a>
      
      <p>Your feedback helps us improve and helps other customers make informed decisions.</p>
      
      <p>If you have any issues, please contact us immediately.</p>
    </div>
    <div class="footer">
      <p>dekord | Premium Charging Cables</p>
      <p>team@dekord.online</p>
    </div>
  </div>
</body>
</html>
        `
      }
      
    default:
      throw new Error('Invalid email type')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, orderId } = body

    console.log('📧 Email API called with:', { type, orderId, fullBody: body })

    if (!type || !orderId) {
      console.error('❌ Missing required parameters:', { type, orderId })
      return NextResponse.json({ error: 'Missing type or orderId' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const supabase = await createClient()

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const emailData: OrderEmailData = {
      orderId: order.id,
      orderNumber: order.order_number,
      customerName: order.shipping_name,
      customerEmail: order.user_email,
      total: order.total,
      items: order.order_items,
      trackingNumber: order.tracking_number,
      trackingUrl: order.tracking_url,
      courier: order.courier
    }

    const { subject, html } = getEmailContent(type, emailData)

    // Send email via Resend
    const { data: emailResult, error: emailError } = await resend.emails.send({
      from: 'dekord <team@dekord.online>',
      to: emailData.customerEmail,
      subject,
      html
    })

    if (emailError) {
      console.error('Email error:', emailError)
      
      // Log failure
      await supabase.from('notification_logs').insert({
        order_id: orderId,
        type: 'email',
        channel: type,
        recipient: emailData.customerEmail,
        status: 'failed',
        error_message: emailError.message
      })
      
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    // Log success
    await supabase.from('notification_logs').insert({
      order_id: orderId,
      type: 'email',
      channel: type,
      recipient: emailData.customerEmail,
      status: 'sent',
      message_id: emailResult?.id
    })

    return NextResponse.json({ success: true, data: emailResult }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  } catch (error: any) {
    console.error('Send email error:', error)
    return NextResponse.json({ error: error.message }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}

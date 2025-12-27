import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Twilio } from 'twilio'

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER!

interface WhatsAppMessageData {
  orderId: string
  orderNumber: string
  customerName: string
  phone: string
  total: number
  trackingNumber?: string
  trackingUrl?: string
  courier?: string
  items?: Array<{
    product_name: string
    variant_details?: string
    quantity: number
    unit_price: number
    total_price: number
  }>
}

function getMessage(type: string, data: WhatsAppMessageData) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dekord.online'
  const confirmUrl = `${baseUrl}/order-confirmation/${data.orderId}`
  const accountUrl = `${baseUrl}/account?tab=orders`
  
  // Build items list with variants
  let itemsList = ''
  if (data.items && data.items.length > 0) {
    itemsList = data.items.map((item: any) => {
      const variantText = item.variant_details ? ` [${item.variant_details}]` : ''
      return `  • ${item.quantity}x ${item.product_name}${variantText} - Rs. ${Number(item.unit_price).toLocaleString()}`
    }).join('\n')
  }
  
  switch (type) {
    case 'placed':
      return `🎉 *Thank You for Your Order!*

Hi ${data.customerName}! 👋

Thank you so much for placing your order with *dekord*!

📦 *Order Details:*
Order Number: *#${data.orderNumber}*

*Items:*
${itemsList}

💰 *Total: Rs. ${Number(data.total).toLocaleString()}*

⚠️ *IMPORTANT - Please Confirm Your Order*
To proceed with your order, please confirm by clicking the link below:

👉 ${confirmUrl}

- Team dekord`

    case 'processing':
      return `📦 *Your Order is Being Processed*

Hi ${data.customerName}! 👋

Great news! Your order has been *confirmed by you* and we are now processing it.

✅ *Order #${data.orderNumber}*
Status: *Confirmed & Processing*

We're carefully preparing your items for shipment. You'll receive tracking information as soon as your order ships (usually within 1-2 business days).

Track your order status here:
${accountUrl}

Thank you for your patience! ⏳
- Team dekord`

    case 'shipped':
      return `🚚 *Your Order is On Its Way!*

Hi ${data.customerName}! 👋

Excellent news! Your order has been *shipped* and is on its way to you! 🎉

📦 *Order #${data.orderNumber}*
${data.courier ? `🏢 *Courier:* ${data.courier}\n` : ''}${data.trackingNumber ? `📍 *Tracking Number:* ${data.trackingNumber}\n` : ''}
📅 *Estimated Delivery:* 3-5 business days

${data.trackingUrl ? `🔍 *Track your shipment in real-time:*\n${data.trackingUrl}\n` : ''}
We'll notify you when your order is delivered. If you have any concerns, please reach out!

- Team dekord`

    case 'delivered':
      return `🎉 *Order Delivered Successfully!*

Hi ${data.customerName}! 👋

*THANK YOU!* 💚

Your order *#${data.orderNumber}* has been delivered successfully! We hope you love your new *dekord* charging cables!

🌟 *We'd Love Your Feedback!*
Your review means the world to us and helps other customers make informed decisions.

Share your experience here:
${accountUrl}

If you have any issues with your order, please contact us immediately and we'll make it right.

Thank you for trusting *dekord*! 🙏❤️
- Team dekord`

    default:
      throw new Error('Invalid message type')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, orderId } = body

    if (!type || !orderId) {
      console.error('❌ Missing required parameters:', { type, orderId })
      return NextResponse.json({ error: 'Missing type or orderId' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get order details with items
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          product_name,
          variant_details,
          quantity,
          unit_price,
          total_price
        )
      `)
      .eq('id', orderId)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Get phone number
    const phone = order.shipping_phone
    if (!phone) {
      return NextResponse.json({ error: 'No phone number' }, { status: 400 })
    }

    // Format phone number (remove spaces, dashes, etc.)
    let formattedPhone = phone.replace(/[\s\-\(\)]/g, '')
    
    // Add country code if not present (assuming India)
    if (!formattedPhone.startsWith('+')) {
      if (formattedPhone.startsWith('91')) {
        formattedPhone = '+' + formattedPhone
      } else if (formattedPhone.length === 10) {
        formattedPhone = '+91' + formattedPhone
      }
    }

    const messageData: WhatsAppMessageData = {
      orderId: order.id,
      orderNumber: order.order_number,
      customerName: order.shipping_name,
      phone: formattedPhone,
      total: order.total,
      trackingNumber: order.tracking_number,
      trackingUrl: order.tracking_url,
      courier: order.courier,
      items: order.order_items || []
    }

    const message = getMessage(type, messageData)

    // Send via Twilio WhatsApp
    const result = await twilioClient.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`,
      body: message
    })

    // Log success
    await supabase.from('notification_logs').insert({
      order_id: orderId,
      type: 'whatsapp',
      channel: type,
      recipient: formattedPhone,
      status: 'sent',
      message_id: result.sid
    })

    return NextResponse.json({ success: true, data: result })
  } catch (error: any) {
    console.error('WhatsApp error:', error)
    
    // Log failure
    try {
      const { orderId } = await request.json()
      const supabase = await createClient()
      await supabase.from('notification_logs').insert({
        order_id: orderId,
        type: 'whatsapp',
        channel: 'unknown',
        recipient: 'unknown',
        status: 'failed',
        error_message: error.message
      })
    } catch {}
    
    return NextResponse.json({ error: error.message }, { 
      status: 500
    })
  }
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204
  })
}

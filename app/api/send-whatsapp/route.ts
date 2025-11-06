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
}

function getMessage(type: string, data: WhatsAppMessageData) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dekord.online'
  const confirmUrl = `${baseUrl}/api/confirm-order?id=${data.orderId}`
  
  switch (type) {
    case 'placed':
      return `Hi ${data.customerName}, we've received your order #${data.orderNumber} totaling ${data.total.toFixed(2)}

Shall we confirm it now?

👉 Confirm Order: ${confirmUrl}

Or reply with any queries you have.

- dekord team`

    case 'processing':
      return `📦 *Order Processing*

Hi ${data.customerName}!

Great news! Your order #${data.orderNumber} is being prepared for shipment.

We're carefully packing your premium cables and will ship them soon.

Track your order: ${baseUrl}/account/orders

- dekord team`

    case 'shipped':
      return `🚚 *Order Shipped!*

Hi ${data.customerName}!

Your order #${data.orderNumber} is on its way!

${data.courier ? `*Courier:* ${data.courier}\n` : ''}${data.trackingNumber ? `*Tracking:* ${data.trackingNumber}\n` : ''}${data.trackingUrl ? `Track here: ${data.trackingUrl}\n` : ''}
Expected delivery: 3-5 business days

- dekord team`

    case 'delivered':
      return `🎉 *Order Delivered!*

Hi ${data.customerName}!

Your order #${data.orderNumber} has been delivered successfully!

We hope you love your new dekord cables! 💚

*Please share your feedback:*
${baseUrl}/account/orders?review=${data.orderId}

Your review helps us improve!

Thank you for trusting dekord! 🙏`

    default:
      throw new Error('Invalid message type')
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, orderId } = body

    console.log('📱 WhatsApp API called with:', { type, orderId, fullBody: body })

    if (!type || !orderId) {
      console.error('❌ Missing required parameters:', { type, orderId })
      return NextResponse.json({ error: 'Missing type or orderId' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
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
      courier: order.courier
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

    return NextResponse.json({ success: true, data: result }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
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

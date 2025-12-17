import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'
import { 
  getOrderPlacedEmail, 
  getOrderProcessingEmail, 
  getOrderShippedEmail, 
  getOrderDeliveredEmail 
} from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface OrderEmailData {
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  total: number
  items: Array<{ 
    product_name: string
    variant_details?: string
    quantity: number
    unit_price: number
  }>
  trackingNumber?: string
  trackingUrl?: string
  courier?: string
}

function getEmailContent(type: string, data: OrderEmailData) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dekord.online';
  const confirmUrl = `${baseUrl}/order-confirmation/${data.orderId}`;

  switch (type) {
    case 'placed':
      return getOrderPlacedEmail(data, confirmUrl)
      
    case 'processing':
      return getOrderProcessingEmail(data, baseUrl)
      
    case 'shipped':
      return getOrderShippedEmail(data)
      
    case 'delivered':
      return getOrderDeliveredEmail(data, baseUrl)
      
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
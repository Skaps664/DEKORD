import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID!

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      console.error('❌ No order ID provided')
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Telegram not configured:', { 
        hasToken: !!TELEGRAM_BOT_TOKEN, 
        hasChatId: !!TELEGRAM_CHAT_ID 
      })
      return NextResponse.json({ error: 'Telegram not configured' }, { status: 500 })
    }

    const supabase = await createClient()

    // Get order details
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
      console.error('❌ Order not found:', orderError)
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Build items list
    const itemsList = order.order_items?.map((item: any) => {
      const variantText = item.variant_details ? ` [${item.variant_details}]` : ''
      return `  • ${item.quantity}x ${item.product_name}${variantText} - Rs. ${Number(item.unit_price).toLocaleString()}`
    }).join('\n') || ''

    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://admin.dekord.online'

    // Create beautiful Telegram message with emojis
    const message = `🔔 *NEW ORDER RECEIVED!*

📦 *Order #${order.order_number}*

👤 *Customer Information:*
• Name: ${order.shipping_name}
• Phone: ${order.shipping_phone}
• Email: ${order.user_email}

📍 *Delivery Address:*
${order.shipping_address}
${order.shipping_city}, ${order.shipping_province}

🛒 *Order Items:*
${itemsList}

💰 *Total Amount: Rs. ${Number(order.total).toLocaleString()}*

💳 *Payment Method:* ${order.payment_method.toUpperCase()}

⏰ *Order Time:* ${new Date(order.created_at).toLocaleString('en-PK', { 
  timeZone: 'Asia/Karachi',
  dateStyle: 'medium',
  timeStyle: 'short'
})}

[View Order in Admin Panel](${adminUrl}/orders/${order.id})

━━━━━━━━━━━━━━━━━━━━
*dekord* | Order Management System`

    // Send message to Telegram with retries and timeout (fixes transient ETIMEDOUT in dev)
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    async function sendTelegramWithRetry(payload: any) {
      const maxRetries = 3
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const controller = new AbortController()
        const timeoutMs = 15000 // 15s per attempt
        const timeout = setTimeout(() => controller.abort(), timeoutMs)
        try {
          const resp = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
          })
          clearTimeout(timeout)
          // Try to parse body as json/text for better logging
          let bodyText: string | null = null
          try { bodyText = await resp.text() } catch (e) { bodyText = null }
          if (!resp.ok) {
            console.error(`Telegram API responded with status ${resp.status}`, { body: bodyText })
            throw new Error(`Telegram API ${resp.status}: ${bodyText}`)
          }
          // parse json if possible
          try { return JSON.parse(bodyText || '{}') } catch (e) { return bodyText }
        } catch (err: any) {
          clearTimeout(timeout)
          // Distinguish abort vs network errors
          if (err?.name === 'AbortError') {
            console.error(`Telegram attempt ${attempt + 1} aborted due to timeout`) 
          } else {
            console.error(`Telegram send attempt ${attempt + 1} failed:`, err?.message || err)
          }
          // If last attempt rethrow
          if (attempt === maxRetries) throw err
          // Exponential backoff before retrying
          const backoffMs = 1000 * Math.pow(2, attempt)
          await new Promise((r) => setTimeout(r, backoffMs))
        }
      }
    }

    // ensure result is in outer scope so we can return it
    let result: any = null
    try {
      result = await sendTelegramWithRetry({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: false
      })
    } catch (err: any) {
      console.error('❌ Telegram notification error:', err?.message || err)
      return NextResponse.json({ error: 'Failed to send Telegram notification', details: String(err) }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      messageId: result?.result?.message_id ?? null,
      raw: result
    })

  } catch (error: any) {
    console.error('❌ Telegram notification error:', error)
    return NextResponse.json({ 
      error: error.message 
    }, { 
      status: 500 
    })
  }
}

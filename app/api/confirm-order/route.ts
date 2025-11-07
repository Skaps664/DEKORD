import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { orderId, query, action } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
    }

    const supabase = await createClient()

    if (action === 'confirm') {
      // Confirm order
      console.log('Confirming order in DB:', orderId)
      const { data, error } = await supabase
        .from('orders')
        .update({
          customer_confirmed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()

      if (error) {
        console.error('DB update error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      console.log('DB update result:', data)

      return NextResponse.json({ success: true, message: 'Order confirmed', data })
    } else if (query) {
      // Save customer query
      const { error } = await supabase
        .from('orders')
        .update({
          customer_confirmed: false,
          confirmation_query: query,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, message: 'Query saved' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

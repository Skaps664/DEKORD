import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email, source = 'website' } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from('email_subscriptions')
      .select('id, is_active')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      if (existing.is_active) {
        return NextResponse.json(
          { message: 'Email already subscribed' },
          { status: 200 }
        )
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('email_subscriptions')
          .update({
            is_active: true,
            unsubscribed_at: null,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)

        if (updateError) {
          console.error('Error reactivating subscription:', updateError)
          return NextResponse.json(
            { error: 'Failed to reactivate subscription' },
            { status: 500 }
          )
        }

        return NextResponse.json(
          { message: 'Subscription reactivated successfully' },
          { status: 200 }
        )
      }
    }

    // Get current user if logged in
    const { data: { user } } = await supabase.auth.getUser()

    // Insert new subscription
    const { data, error } = await supabase
      .from('email_subscriptions')
      .insert({
        email: email.toLowerCase(),
        source,
        user_id: user?.id || null,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Error subscribing:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully subscribed', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in subscribe API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

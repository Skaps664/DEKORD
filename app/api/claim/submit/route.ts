import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const whatsappNumber = formData.get('whatsappNumber') as string
    const city = formData.get('city') as string
    const orderNumber = formData.get('orderNumber') as string
    const orderId = formData.get('order_id') as string | null
    const claimType = formData.get('claimType') as string
    const message = formData.get('message') as string
    
    // Extract files
    const files = formData.getAll('files') as File[]
    
    // Validate required fields
    if (!name || !email || !whatsappNumber || !city || !orderNumber || !claimType || !message) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    // Get current user if logged in
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || null
    const imageUrls: string[] = []

    // Upload images if provided
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.size > 0) { // Check if file is not empty
          const fileExt = file.name.split('.').pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
          const filePath = `claims/${fileName}`

          // Try to upload to storage bucket (claims or product-images)
          const { error: uploadError } = await supabase.storage
            .from('claims') // Use 'claims' bucket (create this in Supabase Storage)
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            })

          if (uploadError) {
            console.error('Error uploading file:', uploadError)
            // Continue without images if storage fails
          } else {
            const { data: urlData } = supabase.storage
              .from('claims')
              .getPublicUrl(filePath)
            
            imageUrls.push(urlData.publicUrl)
          }
        }
      }
    }

    // Get request metadata
    const userAgent = request.headers.get('user-agent') || ''
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Insert claim into database
    const { data: claim, error: insertError } = await supabase
      .from('claims')
      .insert({
        name,
        email,
        whatsapp_number: whatsappNumber,
        city,
        order_number: orderNumber,
        order_id: orderId || null,
        user_id: userId,
        claim_type: claimType,
        message,
        images: imageUrls,
        user_agent: userAgent,
        ip_address: ipAddress,
        status: 'pending'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting claim:', insertError)
      return NextResponse.json(
        { error: 'Failed to submit claim. Please try again.' },
        { status: 500 }
      )
    }

    // Send notification email to admin
    try {
      const claimTypeDisplay = claimType.charAt(0).toUpperCase() + claimType.slice(1).replace('_', ' ')
      
      const imagesHtml = imageUrls.length > 0 
        ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-bottom: 10px;">Attached Images:</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${imageUrls.map(url => `
                <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; width: 150px;">
                  <img src="${url}" alt="Claim image" style="width: 100%; height: 150px; object-fit: cover;" />
                  <a href="${url}" target="_blank" style="display: block; padding: 5px; text-align: center; background: #f5f5f5; color: #1a1a1a; text-decoration: none; font-size: 12px;">View Full Size</a>
                </div>
              `).join('')}
            </div>
          </div>
        `
        : '<p style="color: #666; font-style: italic;">No images attached</p>'

      await resend.emails.send({
        from: 'dekord Claims <noreply@dekord.online>',
        to: 'support@dekord.online',
        replyTo: email,
        subject: `🚨 New Claim Submitted: ${claimTypeDisplay} - Order #${orderNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">🚨 New Claim Submitted</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Requires immediate attention</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e5e5e5; border-top: none;">
              <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 5px 0; color: #dc2626; font-size: 18px;">${claimTypeDisplay}</h2>
                <p style="margin: 0; color: #991b1b; font-size: 14px;">Order Number: <strong>#${orderNumber}</strong></p>
              </div>

              <div style="margin: 25px 0;">
                <h3 style="color: #1a1a1a; margin-bottom: 15px; font-size: 16px; border-bottom: 2px solid #000; padding-bottom: 8px;">Customer Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>WhatsApp:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a;">${whatsappNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>City:</strong></td>
                    <td style="padding: 8px 0; color: #1a1a1a;">${city}</td>
                  </tr>
                </table>
              </div>

              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="margin-top: 0; color: #1a1a1a; font-size: 16px;">Claim Details:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6; color: #374151; margin: 0;">${message}</p>
              </div>

              ${imagesHtml}

              <div style="margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 15px 0; color: #374151; font-size: 14px;">Manage this claim in admin panel:</p>
                <a href="https://admin.dekord.online/claims" style="display: inline-block; background: #1a1a1a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">View in Admin Panel</a>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                <p style="color: #6b7280; font-size: 12px; margin: 5px 0;">Submission Details:</p>
                <p style="color: #9ca3af; font-size: 11px; margin: 5px 0;">IP: ${ipAddress}</p>
                <p style="color: #9ca3af; font-size: 11px; margin: 5px 0;">User Agent: ${userAgent}</p>
                <p style="color: #9ca3af; font-size: 11px; margin: 5px 0;">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })}</p>
              </div>
            </div>

            <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">This claim was submitted via dekord.online</p>
              <p style="margin: 5px 0 0 0; color: #9ca3af; font-size: 11px;">Reply directly to this email to respond to the customer</p>
            </div>
          </div>
        `,
      })

      console.log('✅ Claim notification email sent to admin')
    } catch (emailError) {
      console.error('❌ Error sending claim notification email:', emailError)
      // Don't fail the request if email fails - claim is already saved
    }

    return NextResponse.json({
      success: true,
      claim,
      message: 'Claim submitted successfully'
    })

  } catch (error) {
    console.error('Error processing claim submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

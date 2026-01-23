import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const {
      job_id,
      full_name,
      email,
      phone,
      city,
      qualifications,
      short_about,
      resume_url,
      portfolio_url,
      website_url,
      why_consider,
      most_interesting_thing,
      fun_moment_story
    } = body

    if (!job_id || !full_name || !email || !phone || !city || !qualifications || !short_about || !why_consider || !most_interesting_thing || !fun_moment_story) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify job exists and is active
    const { data: job, error: jobError } = await supabase
      .from('job_openings')
      .select('id, status')
      .eq('id', job_id)
      .eq('status', 'active')
      .single()

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job not found or not accepting applications' }, { status: 404 })
    }

    const { data: application, error } = await supabase
      .from('job_applications')
      .insert({
        job_id,
        full_name,
        email,
        phone,
        city,
        qualifications,
        short_about,
        resume_url,
        portfolio_url,
        website_url,
        why_consider,
        most_interesting_thing,
        fun_moment_story,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating application:', error)
      return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error in job-applications API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { createStaticClient } from '@/lib/supabase/server'

export const revalidate = 300

export async function GET() {
  try {
    const supabase = createStaticClient()

    const { data: jobs, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching jobs:', error)
      return NextResponse.json({ error: 'Failed to fetch jobs', details: error.message }, { status: 500 })
    }

    return NextResponse.json(jobs || [], {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error in jobs API:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 })
  }
}

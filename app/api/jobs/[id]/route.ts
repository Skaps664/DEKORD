import { createStaticClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const revalidate = 300

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createStaticClient()
    
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('id', id)
      .eq('status', 'active')
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job' },
      { status: 500 }
    )
  }
}

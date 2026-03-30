import { Metadata } from "next"
import { notFound } from "next/navigation"
import JobApplicationPage from "./job-application-client"
import { createStaticClient } from '@/lib/supabase/server'

export const dynamicParams = true
export const revalidate = 300

export async function generateStaticParams() {
  const supabase = createStaticClient()

  const { data } = await supabase
    .from('job_openings')
    .select('id')
    .eq('status', 'active')

  return (data || []).map((job: { id: string }) => ({ id: job.id }))
}

async function getJob(id: string) {
  try {
    const supabase = createStaticClient()
    
    const { data, error } = await supabase
      .from('job_openings')
      .select('*')
      .eq('id', id)
      .eq('status', 'active')
      .single()

    if (error || !data) {
      console.error('Error fetching job:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const job = await getJob(id)
  
  if (!job) {
    return {
      title: 'Job Not Found'
    }
  }

  return {
    title: `Apply for ${job.title} | Dekord Careers`,
    description: job.description
  }
}

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getJob(id)

  if (!job) {
    notFound()
  }

  return <JobApplicationPage job={job} />
}

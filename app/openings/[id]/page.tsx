import { Metadata } from "next"
import { notFound } from "next/navigation"
import JobApplicationPage from "./job-application-client"

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0

async function getJob(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/jobs/${id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
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

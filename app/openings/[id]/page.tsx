import { Metadata } from "next"
import { notFound } from "next/navigation"
import JobApplicationPage from "./job-application-client"

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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const job = await getJob(params.id)
  
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

export default async function JobPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)

  if (!job) {
    notFound()
  }

  return <JobApplicationPage job={job} />
}

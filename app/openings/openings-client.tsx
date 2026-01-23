"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import type { JobOpening } from "@/lib/types/database"

export default function OpeningsClient() {
  const [jobs, setJobs] = useState<JobOpening[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedJob, setExpandedJob] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      if (response.ok) {
        const data = await response.json()
        console.log('Jobs fetched:', data)
        setJobs(data)
      } else {
        console.error('Failed to fetch jobs:', response.status, await response.text())
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-neutral-400 to-neutral-600 opacity-20 animate-pulse" />
          <Loader2 className="relative w-12 h-12 animate-spin text-neutral-900" />
        </div>
        <p className="mt-6 text-neutral-600 font-medium">Loading opportunities...</p>
      </motion.div>
    )
  }

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-2 border-dashed border-neutral-300 bg-gradient-to-br from-neutral-50 to-white">
          <CardContent className="text-center py-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 blur-2xl bg-neutral-300 opacity-50" />
                <Briefcase className="relative w-20 h-20 text-neutral-400" strokeWidth={1.5} />
              </div>
            </motion.div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-3">No Openings Available</h3>
            <p className="text-neutral-600 max-w-md mx-auto mb-6">
              We don't have any open positions right now, but great things are coming! 
              Check back soon for new opportunities to join our team.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
              <Clock className="w-4 h-4" />
              <span>Updated regularly</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card 
              className="group hover:shadow-2xl transition-all duration-300 border-neutral-200 hover:border-neutral-900 bg-gradient-to-br from-white to-neutral-50 overflow-hidden cursor-pointer"
              onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neutral-900/5 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <CardTitle className="text-2xl md:text-3xl mb-3 group-hover:text-neutral-900 transition-colors">
                        {job.title}
                      </CardTitle>
                    </motion.div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white hover:bg-neutral-800">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.department}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-900 hover:bg-neutral-200">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </Badge>
                      <Badge variant="outline" className="capitalize px-3 py-1 border-neutral-300">
                        {job.type.replace('-', ' ')}
                      </Badge>
                      {job.salary_range && (
                        <Badge variant="outline" className="px-3 py-1 border-neutral-300 font-semibold">
                          {job.salary_range}
                        </Badge>
                      )}
                    </div>
                    
                    {job.application_deadline && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-100 rounded-lg px-3 py-2 w-fit">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        <span className="font-medium">
                          Apply by: {new Date(job.application_deadline).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <motion.div
                    animate={{ rotate: expandedJob === job.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-neutral-400 group-hover:text-neutral-900 transition-colors"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </div>
                
                <CardDescription className="text-base mt-3 leading-relaxed text-neutral-700">
                  {job.description}
                </CardDescription>
              </CardHeader>

              <motion.div
                initial={false}
                animate={{ height: expandedJob === job.id ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <CardContent className="pt-0 space-y-6 pb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                  
                  {job.requirements.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: expandedJob === job.id ? 1 : 0, y: expandedJob === job.id ? 0 : -10 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <div className="w-1 h-6 bg-neutral-900 rounded-full" />
                        Requirements
                      </h4>
                      <ul className="space-y-2 text-neutral-700">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {job.responsibilities.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: expandedJob === job.id ? 1 : 0, y: expandedJob === job.id ? 0 : -10 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <div className="w-1 h-6 bg-neutral-900 rounded-full" />
                        Responsibilities
                      </h4>
                      <ul className="space-y-2 text-neutral-700">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {job.benefits.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: expandedJob === job.id ? 1 : 0, y: expandedJob === job.id ? 0 : -10 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <div className="w-1 h-6 bg-neutral-900 rounded-full" />
                        Benefits
                      </h4>
                      <ul className="space-y-2 text-neutral-700">
                        {job.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: expandedJob === job.id ? 1 : 0, y: expandedJob === job.id ? 0 : 10 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/openings/${job.id}`)
                      }}
                      className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Apply for this Position
                    </Button>
                  </motion.div>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  )
}
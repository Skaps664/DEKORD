"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Briefcase, MapPin, Clock, Send, Loader2, CheckCircle2, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { JobOpening } from "@/lib/types/database"

interface JobApplicationPageProps {
  job: JobOpening
}

export default function JobApplicationPage({ job }: JobApplicationPageProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    qualifications: "",
    short_about: "",
    resume_url: "",
    portfolio_url: "",
    website_url: "",
    why_consider: "",
    most_interesting_thing: "",
    fun_moment_story: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/job-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: job.id,
          ...formData
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error(data.error || 'Failed to submit application')
      }
    } catch (error) {
      toast.error('Failed to submit application')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-green-400 opacity-30 animate-pulse" />
                <CheckCircle2 className="relative w-24 h-24 text-green-600" strokeWidth={1.5} />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
            >
              Thank You for Applying!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              We've received your application for the <span className="font-semibold text-neutral-900">{job.title}</span> position. 
              Our team will carefully review your submission and get back to you soon.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 mb-8 max-w-2xl mx-auto"
            >
              <h3 className="font-semibold text-lg text-neutral-900 mb-3">What's Next?</h3>
              <ul className="text-left space-y-2 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                  <span>We'll review your application within 5-7 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                  <span>If your profile matches our requirements, we'll reach out for an interview</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                  <span>Check your email regularly for updates from our team</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <Button
                onClick={() => router.push('/openings')}
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-6 text-lg font-semibold"
                size="lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to All Openings
              </Button>

              <div className="pt-6 border-t border-neutral-200">
                <p className="text-sm text-neutral-600 mb-3">Have questions about your application?</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                  <a 
                    href="mailto:careers@dekord.com" 
                    className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">info@dekord.online</span>
                  </a>
                  <span className="hidden sm:block text-neutral-300">|</span>
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">+92 3390166442</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.push('/openings')}
            className="hover:bg-neutral-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Openings
          </Button>
        </motion.div>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-neutral-400 opacity-20" />
              <Briefcase className="relative w-12 h-12 text-neutral-900" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white hover:bg-neutral-800">
                  <Briefcase className="w-3.5 h-3.5" />
                  {job.department}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="capitalize px-3 py-1.5">
                  {job.type.replace('-', ' ')}
                </Badge>
                {job.salary_range && (
                  <Badge variant="outline" className="px-3 py-1.5 font-semibold">
                    {job.salary_range}
                  </Badge>
                )}
              </div>

              {job.application_deadline && (
                <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 rounded-lg px-3 py-2 w-fit">
                  <Clock className="w-4 h-4" />
                  <span>Apply by: {new Date(job.application_deadline).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            {job.description}
          </p>

          
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
            Submit Your Application
          </h2>
          <p className="text-neutral-600 mb-8">
            Fill out the form below and we'll get back to you soon. Fields marked with * are required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-neutral-900 rounded-full" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name" className="text-sm font-medium">Full Name *</Label>
                  <Input
                    id="full_name"
                    required
                    className="mt-1.5"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="mt-1.5"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    className="mt-1.5"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                  <Input
                    id="city"
                    required
                    className="mt-1.5"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-neutral-900 rounded-full" />
                Professional Background
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="qualifications" className="text-sm font-medium">Qualifications *</Label>
                  <Input
                    id="qualifications"
                    required
                    className="mt-1.5"
                    placeholder="e.g., Bachelor's in Computer Science, 5 years experience..."
                    value={formData.qualifications}
                    onChange={(e) => setFormData(prev => ({ ...prev, qualifications: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="resume_url" className="text-sm font-medium">Resume URL</Label>
                    <Input
                      id="resume_url"
                      type="url"
                      className="mt-1.5"
                      placeholder="https://..."
                      value={formData.resume_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, resume_url: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="portfolio_url" className="text-sm font-medium">Portfolio URL</Label>
                    <Input
                      id="portfolio_url"
                      type="url"
                      className="mt-1.5"
                      placeholder="https://..."
                      value={formData.portfolio_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, portfolio_url: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="website_url" className="text-sm font-medium">Website URL</Label>
                    <Input
                      id="website_url"
                      type="url"
                      className="mt-1.5"
                      placeholder="https://..."
                      value={formData.website_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* About You */}
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-neutral-900 rounded-full" />
                Tell Us About Yourself
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="short_about" className="text-sm font-medium">Brief Introduction *</Label>
                  <Textarea
                    id="short_about"
                    required
                    rows={3}
                    className="mt-1.5 resize-none"
                    placeholder="Tell us a bit about yourself..."
                    value={formData.short_about}
                    onChange={(e) => setFormData(prev => ({ ...prev, short_about: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="why_consider" className="text-sm font-medium">Why should we consider you? *</Label>
                    <Textarea
                      id="why_consider"
                      required
                      rows={3}
                      className="mt-1.5 resize-none"
                      placeholder="What makes you a great fit for this role?"
                      value={formData.why_consider}
                      onChange={(e) => setFormData(prev => ({ ...prev, why_consider: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="most_interesting_thing" className="text-sm font-medium">What's most interesting about you? *</Label>
                    <Textarea
                      id="most_interesting_thing"
                      required
                      rows={3}
                      className="mt-1.5 resize-none"
                      placeholder="Share something unique about yourself..."
                      value={formData.most_interesting_thing}
                      onChange={(e) => setFormData(prev => ({ ...prev, most_interesting_thing: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="fun_moment_story" className="text-sm font-medium">Share a recent fun moment *</Label>
                  <Textarea
                    id="fun_moment_story"
                    required
                    rows={3}
                    className="mt-1.5 resize-none"
                    placeholder="Tell us in form of a story a fun moment you recently experienced..."
                    value={formData.fun_moment_story}
                    onChange={(e) => setFormData(prev => ({ ...prev, fun_moment_story: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-neutral-200">
              <Button 
                type="submit" 
                disabled={submitting}
                className="w-full md:w-auto bg-neutral-900 hover:bg-neutral-800 text-white px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-3">Questions About This Role?</h3>
            <p className="text-neutral-300 mb-6">We're here to help! Reach out to us anytime.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="mailto:info@dekord.online" 
                className="flex items-center gap-2 hover:text-neutral-300 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">info@dekord.online</span>
              </a>
              <span className="hidden sm:block text-neutral-600">|</span>
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 hover:text-neutral-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">+92 3259327819</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

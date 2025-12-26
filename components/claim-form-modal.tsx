"use client"

import { useState } from "react"
import { X, Upload, FileWarning, Shield, Package, MessageSquare, Loader2 } from "lucide-react"

interface ClaimFormModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
  orderNumber?: string
  defaultEmail?: string
  defaultName?: string
}

export function ClaimFormModal({ isOpen, onClose, orderId, orderNumber, defaultEmail, defaultName }: ClaimFormModalProps) {
  const [formData, setFormData] = useState({
    name: defaultName || "",
    email: defaultEmail || "",
    whatsappNumber: "",
    city: "",
    orderNumber: orderNumber || "",
    claimType: "",
    message: ""
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...newFiles].slice(0, 5)) // Max 5 files
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      files.forEach(file => formDataToSend.append('files', file))
      
      const response = await fetch('/api/claim/submit', {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit claim')
      }
      
      setSubmitStatus('success')
      
      // Close modal after 2 seconds on success
      setTimeout(() => {
        onClose()
        setFormData({ name: "", email: "", whatsappNumber: "", city: "", orderNumber: "", claimType: "", message: "" })
        setFiles([])
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Error submitting claim:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">File a Claim</h2>
            <p className="text-sm text-neutral-600 mt-1">Submit your claim request for order {orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-neutral-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
              <p className="font-semibold">✓ Claim submitted successfully!</p>
              <p className="text-sm mt-1">We'll review your claim and get back to you within 24-48 hours.</p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
              <p className="font-semibold">✗ Failed to submit claim</p>
              <p className="text-sm mt-1">Please try again or contact support.</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="claim-name" className="block text-sm font-semibold text-neutral-900 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="claim-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none text-neutral-900"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label htmlFor="claim-email" className="block text-sm font-semibold text-neutral-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="claim-email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none text-neutral-900"
                placeholder="your@email.com"
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label htmlFor="claim-whatsapp" className="block text-sm font-semibold text-neutral-900 mb-2">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                id="claim-whatsapp"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none text-neutral-900"
                placeholder="+92 3XX XXXXXXX"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label htmlFor="claim-city" className="block text-sm font-semibold text-neutral-900 mb-2">
                City *
              </label>
              <input
                type="text"
                id="claim-city"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none text-neutral-900"
                placeholder="e.g., Peshawar"
              />
            </div>

            {/* Order Number - Pre-filled */}
            <div>
              <label htmlFor="claim-order" className="block text-sm font-semibold text-neutral-900 mb-2">
                Order Number *
              </label>
              <input
                type="text"
                id="claim-order"
                required
                value={formData.orderNumber}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-neutral-50 text-neutral-900 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Claim Type */}
          <div>
            <label htmlFor="claim-type" className="block text-sm font-semibold text-neutral-900 mb-2">
              Type of Claim *
            </label>
            <select
              id="claim-type"
              required
              value={formData.claimType}
              onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none text-neutral-900"
            >
              <option value="">Select claim type</option>
              <option value="Return Request">Return Request - Product return & exchange</option>
              <option value="Refund Claim">Refund Claim - Request a refund</option>
              <option value="Warranty Claim">Warranty Claim - Product warranty service</option>
              <option value="Complaint">Complaint - Report an issue</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="claim-message" className="block text-sm font-semibold text-neutral-900 mb-2">
              Describe Your Issue *
            </label>
            <textarea
              id="claim-message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900 transition-all outline-none text-neutral-900 resize-none"
              placeholder="Please describe the issue you're experiencing in detail..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Upload Images (Optional)
            </label>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-neutral-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="claim-file-upload"
              />
              <label htmlFor="claim-file-upload" className="cursor-pointer">
                <Upload className="w-10 h-10 mx-auto mb-3 text-neutral-400" />
                <p className="text-sm text-neutral-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-neutral-500">
                  PNG, JPG up to 10MB (Max 5 files)
                </p>
              </label>
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <span className="text-sm text-neutral-700 truncate flex-1">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 p-1 hover:bg-neutral-200 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors font-semibold"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Claim'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

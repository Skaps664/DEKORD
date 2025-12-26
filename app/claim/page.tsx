"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FileWarning, Shield, Package, MessageSquare, Upload, X } from "lucide-react"

export default function ClaimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsappNumber: "",
    city: "",
    orderNumber: "",
    claimType: "",
    message: ""
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

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
      setFormData({ name: "", email: "", whatsappNumber: "", city: "", orderNumber: "", claimType: "", message: "" })
      setFiles([])
    } catch (error) {
      console.error('Error submitting claim:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const claimTypes = [
    {
      icon: Package,
      title: "Return Request",
      description: "Product return & exchange",
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent"
    },
    {
      icon: FileWarning,
      title: "Refund Claim",
      description: "Request a refund",
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent"
    },
    {
      icon: Shield,
      title: "Warranty Claim",
      description: "Product warranty service",
      gradient: "from-green-500/10 via-green-500/5 to-transparent"
    },
    {
      icon: MessageSquare,
      title: "Complaint",
      description: "Report an issue",
      gradient: "from-red-500/10 via-red-500/5 to-transparent"
    }
  ]

  return (
    <main className="min-h-screen bg-background pt-16 md:pt-18">
      {/* Hero */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-background" />
        </motion.div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              SUBMIT A CLAIM
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Need to return a product, request a refund, or file a warranty claim?
              <br />
              <span className="text-foreground font-medium">We're here to make it right.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Trust & Policy Section */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Your Satisfaction, Our Priority
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fair process. Transparent timeline. Professional care.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 border border-border/50 rounded-2xl bg-card hover:border-foreground/20 transition-all duration-300">
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Fair & Just</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every claim is reviewed carefully with transparency and fairness at the core of our process.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 border border-border/50 rounded-2xl bg-card hover:border-foreground/20 transition-all duration-300">
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">3-5 Business Days</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Claims are processed efficiently within 3-5 business days. We'll keep you updated throughout.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 border border-border/50 rounded-2xl bg-card hover:border-foreground/20 transition-all duration-300">
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-green-600 to-green-500 flex items-center justify-center">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Expert Support</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our dedicated team is here to assist you every step of the way. You're in good hands.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Policy Links */}
            
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                File Your Claim
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below with your order details and we'll process your request within 24-48 hours
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-foreground/5 to-foreground/10 rounded-3xl blur-2xl" />
              <form onSubmit={handleSubmit} className="relative space-y-6 p-8 md:p-10 border border-border rounded-3xl bg-card shadow-2xl shadow-foreground/10">
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label htmlFor="whatsappNumber" className="block text-sm font-semibold text-foreground mb-3">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="whatsappNumber"
                      required
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
                      placeholder="+92 3XX XXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-foreground mb-3">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
                      placeholder="e.g., Peshawar"
                    />
                  </div>

                  {/* Order Number */}
                  <div>
                    <label htmlFor="orderNumber" className="block text-sm font-semibold text-foreground mb-3">
                      Order Number *
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      required
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground placeholder:text-muted-foreground"
                      placeholder="e.g., DKD-12345"
                    />
                  </div>
                </div>

                {/* Claim Type */}
                <div>
                  <label htmlFor="claimType" className="block text-sm font-semibold text-foreground mb-3">
                    Type of Claim *
                  </label>
                  <select
                    id="claimType"
                    required
                    value={formData.claimType}
                    onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none text-foreground"
                  >
                    <option value="">Select claim type</option>
                    <option value="return">Return Request</option>
                    <option value="refund">Refund Claim</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-3">
                    Describe Your Issue *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-background/50 focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all outline-none resize-none text-foreground placeholder:text-muted-foreground"
                    placeholder="Please provide details about your claim, including any relevant information about the product, purchase date, and the issue you're experiencing..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Upload Images (Optional)
                  </label>
                  <p className="text-xs text-muted-foreground mb-4">
                    Add photos of the product, packaging, or issue (Max 5 files, 5MB each)
                  </p>
                  
                  <div className="space-y-4">
                    {/* Upload Button */}
                    <label className="relative block">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={files.length >= 5}
                      />
                      <div className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-border/50 rounded-2xl bg-background/50 hover:border-foreground/30 hover:bg-muted/20 transition-all cursor-pointer">
                        <Upload className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {files.length >= 5 ? 'Maximum files reached' : 'Click to upload images'}
                        </span>
                      </div>
                    </label>

                    {/* File Preview */}
                    {files.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {files.map((file, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <div className="aspect-square rounded-xl overflow-hidden border border-border/50 bg-muted/20">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <p className="mt-2 text-xs text-muted-foreground truncate">
                              {file.name}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-600 text-center"
                  >
                    ✓ Claim submitted successfully! We'll contact you within 24-48 hours.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 text-center"
                  >
                    ✗ Failed to submit claim. Please try again or contact us directly.
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-5 bg-foreground text-background rounded-2xl font-semibold hover:shadow-xl hover:shadow-foreground/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Submit Claim
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting this form, you agree to our{" "}
                  <a href="/return-policy" className="text-foreground hover:underline">Return Policy</a>,{" "}
                  <a href="/refund-policy" className="text-foreground hover:underline">Refund Policy</a>, and{" "}
                  <a href="/warranty-policy" className="text-foreground hover:underline">Warranty Policy</a>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Claim Types */}
      <section className="py-20 relative bg-gradient-to-b from-transparent to-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Can Help With</h2>
            <p className="text-muted-foreground">Choose the type of claim that best fits your situation</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} rounded-3xl`} />
                <div className="relative p-6 border border-border/50 rounded-3xl bg-card/50 backdrop-blur-sm hover:border-foreground/20 transition-all duration-300">
                  <type.icon className="w-10 h-10 mb-4 text-foreground group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6">What Happens Next?</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Review", desc: "We review your claim within 24-48 hours" },
                { step: "2", title: "Contact", desc: "We'll reach out via email or phone for any clarifications" },
                { step: "3", title: "Resolution", desc: "We process your request and provide a solution" }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-foreground text-background rounded-full flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
      </section>
      <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="p-8 md:p-10 border border-border/50 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Review Our Policies</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand your rights and our commitments before submitting your claim
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/warranty-policy" 
                    className="group px-6 py-3 border border-border/50 rounded-xl font-medium text-foreground bg-background/50 hover:bg-foreground hover:text-background transition-all duration-300 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Warranty Policy
                  </a>
                  <a 
                    href="/return-policy" 
                    className="group px-6 py-3 border border-border/50 rounded-xl font-medium text-foreground bg-background/50 hover:bg-foreground hover:text-background transition-all duration-300 flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Return Policy
                  </a>
                  <a 
                    href="/refund-policy" 
                    className="group px-6 py-3 border border-border/50 rounded-xl font-medium text-foreground bg-background/50 hover:bg-foreground hover:text-background transition-all duration-300 flex items-center gap-2"
                  >
                    <FileWarning className="w-4 h-4" />
                    Refund Policy
                  </a>
                </div>
              </div>
            </motion.div>
    </main>
  )
}

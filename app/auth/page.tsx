"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Loader2, ArrowLeft, Zap } from "lucide-react"
import Link from "next/link"
import { signUp, signIn, signInWithGoogle } from "@/lib/services/auth"

export default function AuthPage() {
  const router = useRouter()
  const [isSignIn, setIsSignIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📝 Form submitted:', { isSignIn, formData: { ...formData, password: '***' } })
    
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (isSignIn) {
        // Sign In
        console.log('🔵 Starting sign in flow...')
        console.log('🔵 About to call signIn function...')
        const result = await signIn(formData.email, formData.password)
        console.log('🔵 signIn function returned:', result)
        
        const { data, error } = result
        console.log('🔵 Sign in result:', { hasData: !!data, error })
        
        if (error) {
          console.error('❌ Sign in error:', error)
          setError(error)
        } else if (data) {
          console.log('✅ Sign in successful!')
          setSuccess("Successfully signed in! Redirecting...")
          setTimeout(() => {
            console.log('🔵 Redirecting to /account...')
            router.push("/account")
          }, 1500)
        } else {
          console.warn('⚠️ No data and no error returned from signIn')
          setError("Sign in failed - no response from server")
        }
      } else {
        // Sign Up
        console.log('🔵 Starting sign up flow...')
        
        if (formData.password !== formData.confirmPassword) {
          console.error('❌ Passwords do not match')
          setError("Passwords do not match")
          setLoading(false)
          return
        }

        if (formData.password.length < 6) {
          console.error('❌ Password too short')
          setError("Password must be at least 6 characters")
          setLoading(false)
          return
        }

        console.log('🔵 About to call signUp function...')
        const result = await signUp(formData.email, formData.password, formData.name)
        console.log('🔵 signUp function returned:', result)
        
        const { data, error } = result
        console.log('🔵 Sign up result:', { hasData: !!data, error })
        
        if (error) {
          console.error('❌ Sign up error:', error)
          setError(error)
        } else if (data) {
          console.log('✅ Sign up successful!')
          setSuccess("Account created! Please check your email to verify your account.")
        } else {
          console.warn('⚠️ No data and no error returned from signUp')
          setError("Sign up failed - no response from server")
        }
      }
    } catch (err) {
      console.error('💥 EXCEPTION in handleSubmit:', err)
      console.error('💥 Error type:', typeof err)
      console.error('💥 Error details:', err instanceof Error ? err.message : String(err))
      console.error('💥 Stack:', err instanceof Error ? err.stack : 'No stack')
      setError(`An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      console.log('🔵 Setting loading to false')
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    console.log('🔵 Google sign in button clicked')
    
    setError(null)
    setLoading(true)

    try {
      console.log('🔵 About to call signInWithGoogle...')
      const result = await signInWithGoogle()
      console.log('🔵 signInWithGoogle function returned:', result)
      
      const { error } = result
      console.log('🔵 Google sign in result:', { error })
      
      if (error) {
        console.error('❌ Google sign in error:', error)
        setError(error)
        setLoading(false)
      } else {
        console.log('✅ Google OAuth initiated, user will be redirected...')
        // Don't set loading to false - user is being redirected
      }
    } catch (err) {
      console.error('💥 EXCEPTION in handleGoogleSignIn:', err)
      console.error('💥 Error details:', err instanceof Error ? err.message : String(err))
      console.error('💥 Stack:', err instanceof Error ? err.stack : 'No stack')
      setError(`Failed to sign in with Google: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 p-4 lg:p-8">
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex flex-col-reverse lg:flex-row bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Left Side - Brand/Visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        >
          <img
            src="/auth-imagee.webp"
            alt="dekord signup page background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10 flex flex-col justify-between px-12 py-12 w-full h-full">
            {/* Top Section - Defy Ordinary */}
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Defy Ordinary</span>
              </div>
            </motion.div>

            {/* Bottom Section - Footer */}
            <motion.div
              className="text-white text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              © 2025 dekord. All rights reserved.
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-16 bg-white">
          <motion.div
            layout
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, layout: { duration: 0.28, ease: [0.22, 0.8, 0.2, 1] } }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo with Gradient */}
            <motion.div
              className="lg:hidden flex items-center gap-3 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-700 rounded-full">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-sm font-bold text-white">defy ordinary</span>
              </div>
            </motion.div>

            {/* Header with Mobile Animation */}
            <motion.div
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2 text-balance">
                {isSignIn ? "Welcome Back" : "Join dekord"}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                {isSignIn ? "Sign in to access your dekord account" : "Create your account and defy ordinary"}
              </p>
            </motion.div>

            {/* Error/Success Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Sign In */}
            <motion.button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6 sm:hover:scale-105"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-slate-700" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-700">Continue with Google</span>
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-500 font-medium">OR</span>
              </div>
            </div>

            {/* Form */}
            <motion.form
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, layout: { duration: 0.28, ease: [0.22, 0.8, 0.2, 1] } }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <motion.div
                layout
                initial={false}
                animate={isSignIn ? { height: 0, opacity: 0, marginBottom: 0 } : { height: "auto", opacity: 1, marginBottom: 16 }}
                style={{ overflow: "hidden" }}
                transition={{ duration: 0.28 }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400 text-base"
                  placeholder="Full Name"
                  required={!isSignIn}
                />
              </motion.div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400 text-base"
                placeholder="Email"
                required
              />

              <motion.div
                layout
                initial={false}
                animate={isSignIn ? { height: 0, opacity: 0, marginBottom: 0 } : { height: "auto", opacity: 1, marginBottom: 16 }}
                style={{ overflow: "hidden" }}
                transition={{ duration: 0.28 }}
              >
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400 text-base"
                  placeholder="Phone Number"
                  required={!isSignIn}
                />
              </motion.div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400 text-base"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <motion.div
                layout
                initial={false}
                animate={isSignIn ? { height: 0, opacity: 0, marginBottom: 0 } : { height: "auto", opacity: 1, marginBottom: 16 }}
                style={{ overflow: "hidden" }}
                transition={{ duration: 0.28 }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400 text-base"
                  placeholder="Confirm Password"
                  required={!isSignIn}
                />
              </motion.div>

              {isSignIn && (
                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Processing..." : isSignIn ? "Sign In" : "Create Account"}
                </motion.button>
              </motion.form>

            {/* Toggle with Mobile Spacing */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-slate-600 text-sm">
                {isSignIn ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsSignIn(!isSignIn)
                  setError(null)
                  setSuccess(null)
                }}
                className="text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors hover:underline"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </motion.div>

            {/* Back Link with Mobile Optimization */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
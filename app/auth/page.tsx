"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white mb-1"
            >
              {isSignIn ? "Welcome Back" : "Join dekord"}
            </motion.h1>
            <p className="text-neutral-300 text-sm">
              {isSignIn ? "Sign in to continue your journey" : "Create an account to get started"}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${
                isSignIn
                  ? "text-neutral-900 border-b-2 border-neutral-900 bg-neutral-50"
                  : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-4 text-center font-medium transition-all duration-300 ${
                !isSignIn
                  ? "text-neutral-900 border-b-2 border-neutral-900 bg-neutral-50"
                  : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm"
              >
                {success}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.form
                key={isSignIn ? "signin" : "signup"}
                initial={{ opacity: 0, x: isSignIn ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isSignIn ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name - Sign Up Only */}
                {!isSignIn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                        placeholder="Enter your full name"
                        required={!isSignIn}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone - Sign Up Only */}
                {!isSignIn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                        placeholder="+92 300 1234567"
                        required={!isSignIn}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-12 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password - Sign Up Only */}
                {!isSignIn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all outline-none"
                        placeholder="Confirm your password"
                        required={!isSignIn}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Forgot Password - Sign In Only */}
                {isSignIn && (
                  <div className="flex justify-end">
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Processing..." : (isSignIn ? "Sign In" : "Create Account")}
                </motion.button>
              </motion.form>
            </AnimatePresence>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral-500">or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-neutral-700">Google</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-4"
        >
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// Database service for Authentication
import { createClient } from '../supabase/client'
import type { UserProfile } from '../types/database'

export async function signUp(email: string, password: string, fullName?: string) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    
    if (error) {
      console.error('❌ Error signing up:', error)
      return { data: null, error: error.message }
    }
    
    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: data.user.id,
          full_name: fullName || null,
        })
      
      if (profileError) {
        console.error('⚠️ Error creating user profile:', profileError)
      }
    }
    
    return { data, error: null }
  } catch (err) {
    console.error('💥 EXCEPTION in signUp:', err)
    console.error('💥 Error details:', err instanceof Error ? err.message : String(err))
    console.error('💥 Stack:', err instanceof Error ? err.stack : 'No stack')
    return { data: null, error: err instanceof Error ? err.message : 'Unknown error in signUp' }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('❌ Error signing in:', error)
      return { data: null, error: error.message }
    }
    
    return { data, error: null }
  } catch (err) {
    console.error('💥 EXCEPTION in signIn:', err)
    console.error('💥 Error details:', err instanceof Error ? err.message : String(err))
    console.error('💥 Stack:', err instanceof Error ? err.stack : 'No stack')
    return { data: null, error: err instanceof Error ? err.message : 'Unknown error in signIn' }
  }
}

export async function signInWithGoogle() {
  try {
    const supabase = createClient()
    
    const redirectUrl = `${window.location.origin}/auth/callback`
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    
    if (error) {
      console.error('❌ Error signing in with Google:', error)
      return { data: null, error: error.message }
    }
    
    return { data, error: null }
  } catch (err) {
    console.error('💥 EXCEPTION in signInWithGoogle:', err)
    console.error('💥 Error details:', err instanceof Error ? err.message : String(err))
    console.error('💥 Stack:', err instanceof Error ? err.stack : 'No stack')
    return { data: null, error: err instanceof Error ? err.message : 'Unknown error in signInWithGoogle' }
  }
}

export async function signOut() {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
    return { error: error.message }
  }
  
  return { error: null }
}

export async function resetPassword(email: string) {
  const supabase = createClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  
  if (error) {
    console.error('Error resetting password:', error)
    return { error: error.message }
  }
  
  return { error: null }
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  
  if (error) {
    console.error('Error updating password:', error)
    return { error: error.message }
  }
  
  return { error: null }
}

export async function getCurrentUser() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error getting current user:', error)
    return { data: null, error: error.message }
  }
  
  return { data: user, error: null }
}

export async function getUserProfile(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error getting user profile:', error)
    return { data: null, error: error.message }
  }
  
  return { data: data as UserProfile, error: null }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const supabase = createClient()
  
  // First check if profile exists
  const { data: existingProfile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('id', userId)
    .single()
  
  if (!existingProfile) {
    // Profile doesn't exist, create it with upsert
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        ...updates
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating user profile:', error)
      return { data: null, error: error.message }
    }
    
    return { data: data as UserProfile, error: null }
  } else {
    // Profile exists, update it
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating user profile:', error)
      return { data: null, error: error.message }
    }
    
    return { data: data as UserProfile, error: null }
  }
}

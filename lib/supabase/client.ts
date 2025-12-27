import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }

    const client = createBrowserClient(supabaseUrl, supabaseAnonKey)
    return client
  } catch (err) {
    console.error('Error creating Supabase client')
    throw err
  }
}

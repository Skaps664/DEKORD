import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  try {
    console.log('🔵 createClient called')
    
    // In the browser, Next.js injects these at build time
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log('🔵 Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      url: supabaseUrl,
      keyLength: supabaseAnonKey?.length || 0
    })

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('💥 Missing Supabase environment variables!')
      console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : '❌ Missing')
      console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : '❌ Missing')
      throw new Error('Missing Supabase environment variables')
    }

    console.log('🔵 Creating browser client...')
    const client = createBrowserClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ Browser client created successfully')
    
    return client
  } catch (err) {
    console.error('💥 EXCEPTION in createClient:', err)
    console.error('💥 Error details:', err instanceof Error ? err.message : String(err))
    throw err
  }
}

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Allowed origins for CORS - SECURITY: Only our own domains
const ALLOWED_ORIGINS = [
  'https://dekord.online',
  'https://www.dekord.online',
  'https://dekord-admin.vercel.app/',
  'https://www.dekord-admin.vercel.app/',
  // Development origins
  'http://localhost:3000',
  'http://localhost:3001',
]

export async function middleware(request: NextRequest) {
  // Handle CORS for API routes
  const origin = request.headers.get('origin')
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/')

  // Create response with CORS headers if needed
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Add CORS headers for API routes from allowed origins
  if (isApiRoute && origin) {
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin)
    
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Credentials', 'true')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    }
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      if (isAllowedOrigin) {
        return new NextResponse(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        })
      } else {
        return new NextResponse(null, { status: 403 })
      }
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    // Match API routes for CORS handling
    '/api/:path*',
    // Match all other routes except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// Disable Edge Runtime for middleware (use Node.js runtime)
export const runtime = 'nodejs'

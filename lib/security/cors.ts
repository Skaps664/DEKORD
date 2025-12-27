// CORS Security Configuration
// Only allow requests from our own domains

const ALLOWED_ORIGINS = [
  'https://dekord.online',
  'https://www.dekord.online',
  'https://admin.dekord.online',
  // Add localhost for development
  ...(process.env.NODE_ENV === 'development' 
    ? ['http://localhost:3000', 'http://localhost:3001'] 
    : []
  ),
]

export function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return false
  return ALLOWED_ORIGINS.includes(origin)
}

export function getCorsHeaders(origin: string | null): Record<string, string> {
  if (!isOriginAllowed(origin)) {
    return {}
  }

  return {
    'Access-Control-Allow-Origin': origin!,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  }
}

export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  return isOriginAllowed(origin)
}

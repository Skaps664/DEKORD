/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Suppress hydration warnings caused by browser extensions
  reactStrictMode: true,
  images: {
    unoptimized: false, // Set to true if images still don't work
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'dekord.online',
      },
      {
        protocol: 'https',
        hostname: 'awkcvltduqojgdgdjhca.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
  },
  // Enable compression
  compress: true,
  
  // SEO: Trailing slash consistency
  trailingSlash: false,
  
  // Performance: Enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-accordion', '@supabase/supabase-js'],
    // Enable partial prerendering for better performance
    ppr: false, // Set to true when stable
  },
  
  // Performance: Optimize production builds
  productionBrowserSourceMaps: false,
  
  // Performance: Configure webpack for better chunking
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimize client-side bundle
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // Common components chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
    return config
  },
  
  // Security headers
  async headers() {
    return [
      // CORS headers for API routes (must come first!)
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Redirects for SEO (add your Shopify URL redirects here when migrating)
  async redirects() {
    return [
      // Example: Redirect old Shopify URLs to new URLs
      // {
      //   source: '/products/:slug',
      //   destination: '/product/:slug',
      //   permanent: true,
      // },
    ]
  },
}

export default nextConfig


import Link from "next/link"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center px-4 pt-20">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-neutral-900 leading-none mb-4">
            404
          </h1>
          <div className="w-32 h-1 bg-neutral-900 mx-auto rounded-full" />
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-neutral-500">
            It might have been moved or deleted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-900 border-2 border-neutral-900 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
          >
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">Quick Links:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/catalog" className="text-neutral-700 hover:text-neutral-900 text-sm hover:underline">
              Catalog
            </Link>
            <Link href="/collections" className="text-neutral-700 hover:text-neutral-900 text-sm hover:underline">
              Collections
            </Link>
            <Link href="/cart" className="text-neutral-700 hover:text-neutral-900 text-sm hover:underline">
              Cart
            </Link>
            <Link href="/account" className="text-neutral-700 hover:text-neutral-900 text-sm hover:underline">
              Account
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-neutral-900 text-sm hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

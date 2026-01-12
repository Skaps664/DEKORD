import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Product Header Skeleton */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-3xl animate-pulse" style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px"
              }} />
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-white rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="space-y-6">
              <div className="h-10 bg-white rounded-xl animate-pulse w-3/4" />
              <div className="h-8 bg-white rounded-xl animate-pulse w-1/3" />
              <div className="space-y-3">
                <div className="h-4 bg-white rounded-lg animate-pulse w-full" />
                <div className="h-4 bg-white rounded-lg animate-pulse w-5/6" />
                <div className="h-4 bg-white rounded-lg animate-pulse w-4/6" />
              </div>
              <div className="h-16 bg-white rounded-2xl animate-pulse" />
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="w-10 h-10 text-neutral-900 animate-spin mx-auto" />
              <p className="text-neutral-600 font-medium">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

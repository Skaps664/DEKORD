import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-12">
            <div className="h-12 bg-white rounded-xl animate-pulse w-64 mb-4" />
            <div className="h-6 bg-white rounded-lg animate-pulse w-96" />
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl animate-pulse" style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px"
              }}>
                <div className="aspect-[25/36] bg-neutral-200 rounded-t-3xl" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-neutral-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-neutral-200 rounded-lg w-1/2" />
                  <div className="h-7 bg-neutral-200 rounded-lg w-1/3" />
                </div>
              </div>
            ))}
          </div>

          {/* Loading indicator */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="w-10 h-10 text-neutral-900 animate-spin mx-auto" />
              <p className="text-neutral-600 font-medium">Loading collection...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

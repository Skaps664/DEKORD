import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Cart Header Skeleton */}
          <div className="mb-12">
            <div className="h-12 bg-white rounded-xl animate-pulse w-48 mb-4" />
          </div>

          {/* Cart Items Skeleton */}
          <div className="space-y-6 mb-12">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 animate-pulse" style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px"
              }}>
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-neutral-200 rounded-2xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-neutral-200 rounded-lg w-3/4" />
                    <div className="h-4 bg-neutral-200 rounded-lg w-1/2" />
                    <div className="h-8 bg-neutral-200 rounded-lg w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Skeleton */}
          <div className="bg-white rounded-3xl p-8 animate-pulse" style={{
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px"
          }}>
            <div className="space-y-4">
              <div className="h-6 bg-neutral-200 rounded-lg w-1/3" />
              <div className="h-4 bg-neutral-200 rounded-lg w-full" />
              <div className="h-4 bg-neutral-200 rounded-lg w-full" />
              <div className="h-12 bg-neutral-200 rounded-2xl w-full mt-6" />
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="w-10 h-10 text-neutral-900 animate-spin mx-auto" />
              <p className="text-neutral-600 font-medium">Loading cart...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

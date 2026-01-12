import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Skeleton */}
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-neutral-100 to-neutral-50">
        <div className="container-custom px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-16 bg-white/50 rounded-2xl animate-pulse w-3/4 mx-auto" />
            <div className="h-8 bg-white/40 rounded-xl animate-pulse w-2/3 mx-auto" />
            <div className="h-14 bg-white/50 rounded-full animate-pulse w-64 mx-auto mt-8" />
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="container-custom px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-8 animate-pulse" style={{
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px"
              }}>
                <div className="h-6 bg-neutral-200 rounded-lg w-3/4 mb-3" />
                <div className="h-4 bg-neutral-200 rounded-lg w-full mb-2" />
                <div className="h-4 bg-neutral-200 rounded-lg w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 text-neutral-900 animate-spin mx-auto" />
          <p className="text-neutral-600 font-medium">Loading pre-launch...</p>
        </div>
      </div>
    </div>
  )
}

import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-neutral-50">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-neutral-900 animate-spin mx-auto" />
        <p className="text-neutral-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}

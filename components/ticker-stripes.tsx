"use client"

interface TickerStripesProps {
  variant?: "default" | "prelaunch"
}

export function TickerStripes({ variant = "default" }: TickerStripesProps) {
  const topMessages = [
    "60W-100W Power Delivery",
    "PD 3.0 High-Speed Charging",
    "Bend Tested 20,000 Times",
    "Gold-Plated Connectors",
    "Braided Nylon Jacket",
    "Universal Compatibility",
  ]

  const bottomMessages = [
    "Fast Charging Technology",
    "Premium Build Quality",
    "Durable & Long-Lasting",
    "Multi-Device Support",
    "Tangle-Free Design",
    "Water Resistant Coating",
  ]

  // Duplicate messages for seamless loop
  const topTicker = [...topMessages, ...topMessages, ...topMessages]
  const bottomTicker = [...bottomMessages, ...bottomMessages, ...bottomMessages]

  // Color variants
  const colors = variant === "prelaunch" 
    ? {
        top: "from-purple-900 via-purple-800 to-purple-900",
        topText: "text-white",
        bottom: "from-slate-900 via-slate-800 to-slate-900",
        bottomText: "text-white"
      }
    : {
        top: "from-green-600 via-green-500 to-green-600",
        topText: "text-white",
        bottom: "from-yellow-500 via-yellow-400 to-yellow-500",
        bottomText: "text-gray-900"
      }

  return (
    <div className="w-full overflow-hidden py-8">
      {/* Top Stripe */}
      <div className={`relative mb-4 overflow-hidden bg-gradient-to-r ${colors.top} py-6 -rotate-2 transform`}>
        <div className="flex animate-scroll-left whitespace-nowrap">
          {topTicker.map((message, index) => (
            <span
              key={index}
              className={`mx-8 text-3xl ${colors.topText} md:text-4xl lg:text-5xl`}
            >
              {message}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Stripe */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${colors.bottom} py-6 rotate-2 transform`}>
        <div className="flex animate-scroll-right whitespace-nowrap">
          {bottomTicker.map((message, index) => (
            <span
              key={index}
              className={`mx-8 text-3xl ${colors.bottomText} md:text-4xl lg:text-5xl`}
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

export function TickerStripes() {
  const topMessages = [
    "Defy Ordinary",
    "Tech That Speaks Style",
    "Premium Quality",
    "60W-100W Power Delivery",
    "Built to Last",
    "Fast Charging Essentials",
  ]

  const bottomMessages = [
    "Charge Your Life",
    "Style Meets Performance",
    "Braided for Durability",
    "Universal Compatibility",
    "Designed in Peshawar",
    "Not Just Cables, A Vibe",
  ]

  // Duplicate messages for seamless loop
  const topTicker = [...topMessages, ...topMessages, ...topMessages]
  const bottomTicker = [...bottomMessages, ...bottomMessages, ...bottomMessages]

  return (
    <div className="w-full overflow-hidden py-8">
      {/* Top Stripe - Green */}
      <div className="relative mb-4 overflow-hidden bg-gradient-to-r from-green-600 via-green-500 to-green-600 py-6 -rotate-2 transform">
        <div className="flex animate-scroll-left whitespace-nowrap">
          {topTicker.map((message, index) => (
            <span
              key={index}
              className="mx-8 text-3xl text-white md:text-4xl lg:text-5xl"
            >
              {message}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Stripe - Yellow */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 py-6 rotate-2 transform">
        <div className="flex animate-scroll-right whitespace-nowrap">
          {bottomTicker.map((message, index) => (
            <span
              key={index}
              className="mx-8 text-3xl text-gray-900 md:text-4xl lg:text-5xl"
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

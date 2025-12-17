"use client"

export function BottomTicker() {
  const messages = [
    "ELEVATE YOUR TECH GAME",
    "PREMIUM CRAFTSMANSHIP",
    "POWER MEETS STYLE",
    "UNSTOPPABLE CHARGING",
    "DEKORD IS A LIFESTYLE",
    "WHERE QUALITY LIVES",
    "CHARGE WITH CONFIDENCE",
    "DESIGNED FOR EXCELLENCE",
  ]

  // Duplicate messages for seamless loop
  const ticker = [...messages, ...messages, ...messages]

  return (
    <div className="w-full overflow-hidden py-8">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 py-6">
        <div className="flex animate-scroll-left whitespace-nowrap">
          {ticker.map((message, index) => (
            <span
              key={index}
              className="mx-8 text-3xl text-white md:text-4xl lg:text-5xl tracking-wider"
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

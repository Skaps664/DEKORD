"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Reveal } from "./reveal"
import { Mail, Play } from "lucide-react"

export function UserVideoReviews() {
  const [containerWidth, setContainerWidth] = useState(1200)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    setContainerWidth(window.innerWidth)
    
    const handleResize = () => {
      setContainerWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const videoReviews = [
  {
    id: 1,
    name: "Hamza Bhatti",
    role: "Tech YouTuber – HB Tech Reviews",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Bhai honestly, cable quality next level hai. Fast charging bhi stable and build bhi solid.",
    timestamp: "2 weeks ago",
  },
  {
    id: 2,
    name: "Ayesha Khan",
    role: "Content Creator – Lahore",
    videoSrc: "https://www.youtube.com/embed/jNQXAC9IVRw",
    quote: "Finally ek premium cable mili jo look bhi classy hai aur performance bhi zabardast.",
    timestamp: "1 week ago",
  },
  {
    id: 3,
    name: "Bilal Siddiqui",
    role: "Senior Engineer – Jazz Pakistan",
    videoSrc: "https://www.youtube.com/embed/9bZkp7q19f0",
    quote: "Network testing ke dauran hum bohat heavy usage karte hain. Yeh cable surprisingly durable nikli.",
    timestamp: "3 days ago",
  },
  {
    id: 4,
    name: "Hira Shah",
    role: "Minimal Lifestyle Influencer",
    videoSrc: "https://www.youtube.com/embed/tYzMGcUty6s",
    quote: "Simple, clean, and reliable. Mujhe aesthetics matter karte hain and this fits perfectly.",
    timestamp: "1 day ago",
  },
  {
    id: 5,
    name: "Faizan Ch.",
    role: "Founder – FZ Gadgets Store",
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote: "Daily sales ke liye display pe rakhi hoti hain. Customers ka feedback bhi top-notch hai.",
    timestamp: "5 days ago",
  },
  {
    id: 6,
    name: "Rimsha Rehman",
    role: "Entrepreneur – Karachi",
    videoSrc: "https://www.youtube.com/embed/jNQXAC9IVRw",
    quote: "Main ne itne cables try kiye, but yeh wali literally long-lasting hain. Worth the price.",
    timestamp: "1 week ago",
  },
];


  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  const itemWidth = 340 // width + gap
  const totalWidth = videoReviews.length * itemWidth - 32
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48)

  // To create the illusion of an infinite, endlessly draggable strip
  // we repeat the base `videoReviews` array multiple times. This keeps
  // the implementation simple and avoids complex position-reset logic.
  const repeatTimes = 10 // increase for longer apparent infinity
  const displayedReviews = Array.from({ length: videoReviews.length * repeatTimes }).map((_, i) => videoReviews[i % videoReviews.length])

  const updatedTotalWidth = displayedReviews.length * itemWidth - 32
  const updatedMaxDrag = Math.max(0, updatedTotalWidth - containerWidth + 48)

  return (
    <section ref={containerRef} className="w-full py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container-custom" suppressHydrationWarning>
        {/* Header */}
        <Reveal>
          <div className="mb-8 sm:mb-10 md:mb-12 text-center" suppressHydrationWarning>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-foreground mb-3">
              Customer Stories
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              See how our community uses dekord in their everyday lives.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Scrolling Row */}
      <div className="relative" suppressHydrationWarning>
        <motion.div
          className="flex gap-6 px-2 sm:px-3 md:px-4"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -updatedMaxDrag, right: 0 }}
          dragElastic={0.1}
          suppressHydrationWarning
        >
          {displayedReviews.map((review, index) => (
            <motion.div
              key={`${review.id}-${index}`}
              className="flex-shrink-0 w-80 group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              suppressHydrationWarning
            >
              <div className="h-[600px] flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-foreground/30 transition-all duration-300 shadow-lg" suppressHydrationWarning>
                {/* Video Placeholder - Instagram story style (9:16) */}
                <div className="relative flex-1 bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden flex items-center justify-center" suppressHydrationWarning>
                  {/* Play Button */}
                  <motion.div
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                    transition={{ duration: 0.2 }}
                    suppressHydrationWarning
                  >
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  </motion.div>
                  
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" suppressHydrationWarning />
                  
                  {/* Video label */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm" suppressHydrationWarning>
                    <p className="text-xs text-white font-medium">Video Review</p>
                  </div>
                </div>

                {/* Review Info */}
                <div className="flex flex-col p-5 bg-card" suppressHydrationWarning>
                  {/* Quote */}
                  <p className="text-sm text-foreground mb-3 italic line-clamp-2">"{review.quote}"</p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between" suppressHydrationWarning>
                    <div suppressHydrationWarning>
                      <p className="text-sm font-medium text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                    {/* <p className="text-xs text-muted-foreground/70">{review.timestamp}</p> */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Drag Hint */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">← Drag to see more stories →</p>
      </div>

      {/* CTA */}
      {/* <Reveal delay={0.2}>
        <div className="container-custom mt-12 sm:mt-14 md:mt-16 text-center" suppressHydrationWarning>
          <p className="text-sm text-muted-foreground mb-4">Share your dekord story with us</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity duration-200" suppressHydrationWarning>
            <Mail size={18} />
            <span className="text-sm font-medium">Send us your video</span>
          </button>
        </div>
      </Reveal> */}
    </section>
  )
}

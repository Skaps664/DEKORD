"use client"

import { Reveal } from "../reveal"

const timeline = [
  {
    number: "01",
    title: "Pre-Launch Phase",
    date: "Now - Feb 10, 2026",
    description: "Subscribe now to secure your spot and unlock exclusive early bird pricing.",
    status: "active"
  },
  {
    number: "02",
    title: "Pre-Launch Shipping",
    date: "Feb 15-20, 2026",
    description: "Early bird orders ship out to our first supporters. Track your premium package in real-time.",
    status: "upcoming"
  },
  {
    number: "03",
    title: "Official Launch",
    date: "Feb 25, 2026",
    description: "dekord cables officially launch to the public. General availability begins nationwide.",
    status: "upcoming"
  },
  {
    number: "04",
    title: "We're in Motion",
    date: "March 2026 & Beyond",
    description: "Full production, ongoing delivery, and expanding our premium cable lineup across Pakistan.",
    status: "upcoming"
  }
]

export function PreLaunchTimeline() {
  return (
    <section className="py-8 sm:py-14 lg:py-18">
      <div className="container-custom px-2 sm:px-2 md:px-3">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10 lg:mb-16">
            <h2 className="text-neutral-900 text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-wide">
              YOUR <span className="italic font-light">Journey</span>
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
              From pre-launch to delivery. Every step planned for the best experience.
            </p>
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto px-4">
          {/* Timeline Container */}
          <div className="relative">
            {/* Central Line - Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 -translate-x-1/2" />
            
            {/* Central Line - Mobile */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200" />

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-12">
              {timeline.map((phase, index) => {
                const isEven = index % 2 === 0
                
                return (
                  <Reveal key={phase.number} delay={index * 0.1}>
                    <div className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Content Card */}
                      <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'} pl-16 md:pl-0`}>
                        <div
                          className="bg-white p-6 rounded-2xl"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px"
                          }}
                        >
                          {/* Status Badge */}
                          {phase.status === "active" && (
                            <div className="mb-3">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Active Now
                              </span>
                            </div>
                          )}
                          
                          {/* Title & Date */}
                          <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-1">
                            {phase.title}
                          </h3>
                          <p className="text-sm text-neutral-500 font-medium mb-3">
                            {phase.date}
                          </p>
                          
                          {/* Description */}
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            {phase.description}
                          </p>
                        </div>
                      </div>

                      {/* Center Dot */}
                      <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                        <div className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${
                          phase.status === 'active' 
                            ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                            : 'bg-neutral-300'
                        }`}>
                          <span className="text-white text-xs font-bold">
                            {phase.number}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Notice */}
        <Reveal delay={0.5}>
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full" style={{
              boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 24px"
            }}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-neutral-900">
                Pre-Launch is Live Now
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

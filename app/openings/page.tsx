import { Metadata } from 'next'
import OpeningsClient from './openings-client'

export const metadata: Metadata = {
  title: 'Careers & Openings | Dekord',
  description: 'Join the Dekord team. Explore current job openings and opportunities.',
}

export default function OpeningsPage() {
  return (
    <main className="min-h-screen  pt-18">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 bg-neutral-100 rounded-full px-6 py-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-neutral-700">We're Hiring</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tight">
            Join Our <span className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">Team</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We're looking for talented individuals who are passionate about creating exceptional products. 
            Be part of something extraordinary and help us{' '}
            <span className="font-semibold text-neutral-900">Defy Ordinary</span>.
          </p>
        </div>
        
        <OpeningsClient />

        <h1 className="text-center text-4xl md:text-6xl font-bold text-neutral-900 mb-6 tracking-tight pt-12">
            Lets Work <span className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">Together</span>
          </h1>
          
        <p className="text-center text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We collaborate with people who love building things from scratch and pushing ideas forward. Join us and be part of work that challenges the {' '}
          <span className="font-semibold text-neutral-900">Ordinary</span>.
        </p>

      </div>
    </main>
  )
}

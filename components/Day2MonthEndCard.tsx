'use client'

import { CalendarDays, MapPinned } from 'lucide-react'
import Image from 'next/image'

const Day2MonthEndCard = () => {
  const step = {
    title: 'Day 2 month-end close. Always.',
    subtitle: 'Always closed by Day 2. No exceptions.',
    description: "Because decisions can't wait until the 20th of the month.",
    color: '#9333ea',
  }

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* Left Side - Image */}
          <div className="lg:col-span-1 flex relative z-0">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200 overflow-hidden w-full h-full relative">
              <Image 
                src="/images/day2.png" 
                alt="Day 2 month-end close" 
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:col-span-2 flex relative z-0">
             <CalendarDays  className="md:w-40 md:h-60 w-16 h-16 absolute md:top-[-100px] top-[-30px] md:right-10 right-5 text-purple-600" />
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200 p-6 md:p-8 flex flex-col w-full h-full">
              {/* Title and Subtitle */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-4">
                  {step.subtitle}
                </p>
              </div>

              {/* Description - Quote Style */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative max-w-2xl">
                  {/* Opening Quote Mark */}
                  <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6">
                    <svg 
                      className="w-12 h-12 md:w-16 md:h-16 text-purple-400 opacity-60" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.608l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.608l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  
                  {/* Quote Text */}
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 text-center leading-relaxed italic px-8 md:px-12 py-4">
                    {step.description}
                  </blockquote>
                  
                  {/* Closing Quote Mark */}
                  <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6">
                    <svg 
                      className="w-12 h-12 md:w-16 md:h-16 text-purple-400 opacity-60 rotate-180" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.608l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.608l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Day2MonthEndCard


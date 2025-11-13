'use client'

import { useState, useEffect } from 'react'
import { DollarSign, UtensilsCrossed, Users, TrendingUp, MapIcon, PinIcon, MapPin, MapPinned } from 'lucide-react'

const flowSteps = [
  {
    id: 'revenue',
    label: 'Revenue',
    icon: DollarSign,
    info: 'Track all income streams from each location, including dine-in, takeout, and delivery orders.',
    color: '#2563eb',
  },
  {
    id: 'food-cost',
    label: 'Food Cost',
    icon: UtensilsCrossed,
    info: 'Monitor ingredient costs, waste, and inventory to optimize your food cost percentage.',
    color: '#9333ea',
  },
  {
    id: 'labor',
    label: 'Labor',
    icon: Users,
    info: 'Analyze labor costs, scheduling efficiency, and productivity metrics per location.',
    color: '#16a34a',
  },
  {
    id: 'net-profit',
    label: 'Net Profit',
    icon: TrendingUp,
    info: 'See the bottom line with clear visibility into profitability by location.',
    color: '#ea580c',
  },
]

const WeeklyLocationPLCard = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-animate through blocks
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % flowSteps.length
        return next
      })
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Pause auto-play on hover/click
  const handleInteraction = (index: number) => {
    setIsAutoPlaying(false)
    setActiveStep(index)
    
    // Resume auto-play after 5 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  const currentStep = flowSteps[activeStep]
  const CurrentIcon = currentStep?.icon || DollarSign

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch relative">
          {/* Connection line from active node to right card */}
          <div 
            className="hidden lg:block absolute pointer-events-none z-10"
            style={{
              left: 'calc(66.666% + 0.5rem)',
              right: 'calc(33.333% + 0.5rem)',
              top: '50%',
              height: '2px',
              transform: 'translateY(-50%)',
            }}
          >
            <div 
              className="w-full h-full relative"
              style={{
                background: currentStep.color,
              }}
            >
              {/* Arrow head */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `8px solid ${currentStep.color}`,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                }}
              />
            </div>
          </div>

          {/* Left Side - Blocks with arrows */}
          <div className="lg:col-span-2 flex relative z-0">
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-8 flex flex-col w-full">
              <MapPinned  className="md:w-40 md:h-60 w-16 h-16 absolute md:top-[-100px] top-[-30px] md:right-10 right-5 text-red-600" />
              {/* Title and Subtitle inside left block */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Weekly location P&Ls
                </h2>
                <p className="text-base md:text-lg text-gray-700">
                  Know how every location performed — every week.
                </p>
              </div>

              {/* Blocks Container - Vertical on mobile, Horizontal on desktop */}
              <div className="flex-1 flex flex-col md:flex-row flex-nowrap items-center justify-center gap-2 md:gap-4 overflow-x-auto min-h-[80px] md:min-h-[120px] w-full">
                {flowSteps.map((step, index) => {
                  const StepIcon = step.icon
                  const isActive = index === activeStep
                  const isPast = index < activeStep
                  
                  return (
                    <div key={step.id} className="flex flex-col md:flex-row items-center gap-1.5 md:gap-3 flex-shrink-0 w-auto md:w-auto">
                      {/* Block */}
                      <div
                        className={`
                          flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-3 py-2 md:py-3 rounded-lg border-2 cursor-pointer transition-all duration-300 min-w-[100px] max-w-[200px] md:min-w-[100px] md:w-auto h-[50px] md:h-[70px]
                          ${isActive 
                            ? 'shadow-md scale-105' 
                            : isPast
                            ? 'shadow-sm'
                            : 'hover:scale-102'
                          }
                        `}
                        style={{
                          background: isActive || isPast ? `${step.color}10` : 'white',
                          borderColor: isActive || isPast ? step.color : '#e5e7eb',
                          boxShadow: isActive 
                            ? `0 4px 12px ${step.color}40` 
                            : isPast 
                            ? `0 2px 6px ${step.color}20`
                            : '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                        onMouseEnter={() => handleInteraction(index)}
                        onClick={() => handleInteraction(index)}
                      >
                        <StepIcon 
                          className="w-3.5 h-3.5 md:w-5 md:h-5 flex-shrink-0" 
                          style={{ color: step.color }} 
                        />
                        <span 
                          className="text-xs md:text-base font-semibold whitespace-nowrap"
                          style={{ color: isActive || isPast ? step.color : '#6b7280' }}
                        >
                          {step.label}
                        </span>
                      </div>

                      {/* Custom Arrow - Vertical on mobile, Horizontal on desktop */}
                      {index < flowSteps.length - 1 && (
                        <div className="relative flex items-center justify-center">
                          {/* Arrow line - Vertical on mobile, Horizontal on desktop */}
                          <div
                            className="w-0.5 md:w-[30px] h-4 md:h-0.5"
                            style={{
                              background: isPast ? flowSteps[index + 1].color : '#d1d5db',
                              transition: 'all 0.3s ease',
                            }}
                          />
                          {/* Arrow head - Down on mobile, Right on desktop */}
                          <div
                            className="md:hidden"
                            style={{
                              width: 0,
                              height: 0,
                              borderTop: `4px solid ${isPast ? flowSteps[index + 1].color : '#d1d5db'}`,
                              borderLeft: '2px solid transparent',
                              borderRight: '2px solid transparent',
                              transition: 'all 0.3s ease',
                            }}
                          />
                          <div
                            className="hidden md:block"
                            style={{
                              width: 0,
                              height: 0,
                              borderLeft: `8px solid ${isPast ? flowSteps[index + 1].color : '#d1d5db'}`,
                              borderTop: '4px solid transparent',
                              borderBottom: '4px solid transparent',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Info Panel */}
          <div className="lg:col-span-1 flex relative z-0">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6 md:p-8 flex flex-col w-full h-full">
              {/* Icon */}
              <div className="mb-6 transition-all duration-500">
                <div
                  key={activeStep}
                  className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${currentStep.color}, ${currentStep.color}dd)`,
                    transform: 'rotate(-8deg)',
                  }}
                >
                  <CurrentIcon 
                    className="w-8 h-8 text-white transition-all duration-500" 
                    style={{ transform: 'rotate(8deg)' }} 
                  />
                </div>
              </div>

              {/* Step Info */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-600 mb-2 transition-all duration-500">
                  Step {activeStep + 1} of {flowSteps.length}
                </div>
                <h3
                  key={activeStep}
                  className="text-2xl md:text-3xl font-bold mb-4 transition-all duration-500"
                  style={{ color: currentStep.color }}
                >
                  {currentStep.label}
                </h3>
              </div>

              {/* Info Text */}
              <p 
                key={activeStep}
                className="text-gray-700 leading-relaxed flex-1 transition-all duration-500"
              >
                {currentStep.info}
              </p>

              {/* Progress Indicator */}
              <div className="mt-6 flex gap-2">
                {flowSteps.map((_, index) => (
                  <div
                    key={index}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: index === activeStep ? '32px' : '8px',
                      background: index <= activeStep ? currentStep.color : '#d1d5db',
                      opacity: index <= activeStep ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeeklyLocationPLCard

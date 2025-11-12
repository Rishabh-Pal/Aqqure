'use client'

import { motion, useInView } from 'framer-motion'
import { AlertTriangle, TrendingDown, FileQuestion, MessageSquare, DollarSign, Calendar } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const TheProblem = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const problems = [
    {
      icon: TrendingDown,
      text: 'Food and labor costs move every week, but reporting shows up once a month',
    },
    {
      icon: DollarSign,
      text: "Toast, DoorDash & Uber Eats deposits don't match sales",
    },
    {
      icon: FileQuestion,
      text: 'Your CPA focuses on taxes, not day-to-day finance ops',
    },
    {
      icon: MessageSquare,
      text: 'Managers text receipts, invoices, and POS screenshots from 4 different apps',
    },
    {
      icon: AlertTriangle,
      text: "You know one location is leaking cash - but can't see where",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const problemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const bottomTextVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] py-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={titleVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                Running a restaurant is hard.
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Running multiple locations without real-time financial visibility is chaos.
              </span>
            </h2>
          </motion.div>

          {/* CTA Text */}
          <motion.div
            variants={ctaVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <p className="text-xl md:text-2xl text-blue-400 font-semibold">
              If this is you, we should talk:
            </p>
          </motion.div>

          {/* Problems List */}
          <motion.div
            variants={containerVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="space-y-6 mb-16"
          >
            {problems.map((problem, index) => {
              const Icon = problem.icon
              
              return (
                <motion.div
                  key={index}
                  variants={problemVariants}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div className="flex items-start gap-4 p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 hover:border-red-500/30 transition-all duration-300">
                    {/* Bullet/Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 group-hover:scale-125 transition-transform duration-300" />
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                    </div>

                    {/* Text */}
                    <p className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                      {problem.text}
                    </p>

                    {/* Hover glow effect */}
                    <div className="absolute -inset-1 bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-300" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom Statement */}
          <motion.div
            variants={bottomTextVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-2xl border border-blue-500/30 p-8 md:p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Restaurants operate daily, not monthly.
              </h3>
              <p className="text-xl md:text-2xl text-blue-400 font-semibold">
                Your accounting should too.
              </p>
              
              {/* Animated border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl opacity-20 blur-xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TheProblem


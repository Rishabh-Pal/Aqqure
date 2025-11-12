'use client'

import { motion, useInView } from 'framer-motion'
import { Calendar, Clock, Zap, CheckCircle2 } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const AqqruePromise = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cards = [
    {
      icon: Calendar,
      title: 'Weekly location P&Ls',
      subtitle: 'Know how every location performed — every week.',
      description: 'Revenue → Food cost → Labor → Net profit, by location.',
      color: 'blue',
    },
    {
      icon: Clock,
      title: 'Day 2 month-end close. Always.',
      subtitle: 'Always closed by Day 2. No exceptions.',
      description: "Because decisions can't wait until the 20th of the month.",
      color: 'purple',
    },
    {
      icon: Zap,
      title: '5 minute average response time.',
      subtitle: "Finance questions shouldn't take days.",
      description: 'Your dedicated controller responds within 5 minutes.',
      color: 'green',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
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

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  }

  const guaranteeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-blue-600',
      glow: 'bg-blue-500/20',
      border: 'border-blue-500/30',
      icon: 'text-blue-400',
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      glow: 'bg-purple-500/20',
      border: 'border-purple-500/30',
      icon: 'text-purple-400',
    },
    green: {
      gradient: 'from-green-500 to-green-600',
      glow: 'bg-green-500/20',
      border: 'border-green-500/30',
      icon: 'text-green-400',
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] py-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              The Aqqrue Promise
            </span>
          </motion.h2>
          <motion.p
            variants={subtitleVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
          >
            Clarity. Speed. Accountability.{' '}
            <span className="text-blue-400 font-semibold">Every single day.</span>
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial={isMounted ? "hidden" : false}
          animate={isMounted && isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {cards.map((card, index) => {
            const Icon = card.icon
            const colors = colorClasses[card.color as keyof typeof colorClasses]
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div className="relative h-full bg-[#1a1a1a] rounded-2xl border border-gray-800 p-8 hover:border-gray-700 transition-all duration-300">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colors.gradient} mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-lg text-gray-300 mb-3 font-medium">
                    {card.subtitle}
                  </p>
                  <p className="text-base text-gray-400 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Hover glow effect */}
                  <div className={`absolute -inset-1 ${colors.glow} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity duration-300`} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Guarantee Section */}
        <motion.div
          variants={guaranteeVariants}
          initial={isMounted ? "hidden" : false}
          animate={isMounted && isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-2xl border border-blue-500/30 p-8 md:p-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              If we miss the mark - the month is free.
            </h3>
            <p className="text-xl text-gray-300 font-medium">
              No fine print.
            </p>
            
            {/* Animated border glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl opacity-20 blur-xl -z-10 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AqqruePromise


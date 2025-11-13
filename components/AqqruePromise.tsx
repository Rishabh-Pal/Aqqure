'use client'

import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import WeeklyLocationPLCard from './WeeklyLocationPLCard'
import Day2MonthEndCard from './Day2MonthEndCard'
import ResponseTimeCard from './ResponseTimeCard'

const AqqruePromise = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isMounted, setIsMounted] = useState(false)
  const [showClarity, setShowClarity] = useState(false)
  const [showSpeed, setShowSpeed] = useState(false)
  const [showAccountability, setShowAccountability] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isInView && isMounted) {
      // Show Clarity after subtitle animation
      const timer1 = setTimeout(() => setShowClarity(true), 800)
      // Show Speed after Clarity
      const timer2 = setTimeout(() => setShowSpeed(true), 1400)
      // Show Accountability after Speed
      const timer3 = setTimeout(() => setShowAccountability(true), 2000)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [isInView, isMounted])

  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
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
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  const sparkleVariants = {
    initial: { scale: 0, rotate: 0 },
    animate: {
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white py-12 sm:py-16 md:py-20"
    >
      {/* Animated Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-600/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-600/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-green-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating particles - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-600/40 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
            }}
            animate={{
              y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0],
              x: [null, typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            variants={titleVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="relative inline-block"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 relative px-4 sm:px-0">
              {/* Subtle blue radial gradient background */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-30 blur-2xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
                }}
              />
              <span className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                The Aqqrue Promise
              </span>
              {/* Sparkle effect */}
              <motion.div
                variants={sparkleVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
              </motion.div>
            </h2>
          </motion.div>
          <motion.p
            variants={subtitleVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto px-4 sm:px-0 flex flex-wrap items-center justify-center gap-2"
          >
            {/* Clarity */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={showClarity ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Clarity.
            </motion.span>

            {/* Speed */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={showSpeed ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Speed.
            </motion.span>

            {/* Accountability */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={showAccountability ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Accountability.
            </motion.span>

            {' '}
            <motion.span
              className="text-blue-600 font-semibold inline-block"
              animate={{
                textShadow: [
                  "0 0 0px rgba(37, 99, 235, 0)",
                  "0 0 20px rgba(37, 99, 235, 0.3)",
                  "0 0 0px rgba(37, 99, 235, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              Every single day.
            </motion.span>
          </motion.p>
        </div>

        {/* Weekly Location P&Ls Card */}
        <WeeklyLocationPLCard />

        {/* Day 2 Month-End Close Card */}
        <Day2MonthEndCard />

        {/* 5 Minute Response Time Card */}
        <ResponseTimeCard />

       
      </div>
    </section>
  )
}

export default AqqruePromise


'use client'

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { Calendar, Clock, Zap, CheckCircle2, Sparkles } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const AqqruePromise = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] py-12 sm:py-16 md:py-20"
    >
      {/* Animated Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-green-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Floating particles - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
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
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                The Aqqrue Promise
              </span>
              {/* Sparkle effect */}
              <motion.div
                variants={sparkleVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
              </motion.div>
            </h2>
          </motion.div>
          <motion.p
            variants={subtitleVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-4 sm:px-0"
          >
            Clarity. Speed. Accountability.{' '}
            <motion.span
              className="text-blue-400 font-semibold inline-block"
              animate={{
                textShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0px rgba(59, 130, 246, 0)",
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

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial={isMounted ? "hidden" : false}
          animate={isMounted && isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12"
        >
          {cards.map((card, index) => {
            const Icon = card.icon
            const colors = colorClasses[card.color as keyof typeof colorClasses]

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -15,
                  rotateY: 5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group perspective-1000"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  className="relative h-full bg-[#1a1a1a] rounded-2xl border border-gray-800 p-8 hover:border-gray-700 transition-all duration-300 overflow-hidden"
                  animate={{
                    borderColor: hoveredCard === index ? 'rgba(107, 114, 128, 0.5)' : 'rgba(31, 41, 55, 1)',
                  }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0`}
                    animate={{
                      opacity: hoveredCard === index ? 0.05 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon with animation */}
                  <motion.div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colors.gradient} mb-6 relative`}
                    animate={{
                      scale: hoveredCard === index ? 1.1 : 1,
                      rotate: hoveredCard === index ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-8 h-8 text-white" />

                    {/* Icon glow effect */}
                    <motion.div
                      className={`absolute inset-0 ${colors.glow} rounded-xl blur-md -z-10`}
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0,
                        scale: hoveredCard === index ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.h3
                    className="text-2xl font-bold text-white mb-3"
                    animate={{
                      x: hoveredCard === index ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    className="text-lg text-gray-300 mb-3 font-medium"
                    animate={{
                      x: hoveredCard === index ? 5 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {card.subtitle}
                  </motion.p>
                  <motion.p
                    className="text-base text-gray-400 leading-relaxed"
                    animate={{
                      x: hoveredCard === index ? 5 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {card.description}
                  </motion.p>

                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute -inset-1 ${colors.glow} rounded-2xl blur-xl -z-10`}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{
                      x: hoveredCard === index ? '100%' : '-100%',
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
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
          <motion.div
            className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-2xl border border-blue-500/30 p-8 md:p-12 text-center overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  style={{
                    top: `${20 + i * 20}%`,
                    left: 0,
                    right: 0,
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <motion.div
              className="flex items-center justify-center mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </motion.div>

            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #fff, #60a5fa, #fff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              If we miss the mark - the month is free.
            </motion.h3>

            <motion.p
              className="text-xl text-gray-300 font-medium"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              No fine print.
            </motion.p>

            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl opacity-20 blur-xl -z-10"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Corner accents */}
            <motion.div
              className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-400/50 rounded-tl-2xl"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-400/50 rounded-br-2xl"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AqqruePromise


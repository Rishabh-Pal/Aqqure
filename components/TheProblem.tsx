'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { AlertTriangle, TrendingDown, FileQuestion, MessageSquare, DollarSign, Calendar, Flame } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const TheProblem = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredProblem, setHoveredProblem] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const problemVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -15 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  const bottomTextVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  }

  const iconFloatVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
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
          style={{ y }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/3 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-red-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/3 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-red-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Floating warning icons - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              opacity: [0, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <AlertTriangle className="w-4 h-4 text-red-400/20" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={titleVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="text-center mb-10 sm:mb-12 md:mb-16 relative"
          >
            {/* Flame icon animation */}
            <motion.div
              className="flex justify-center mb-4 sm:mb-6"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Flame className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-red-500" />
              </motion.div>
            </motion.div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
              <motion.span
                className="block bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              >
                Running a restaurant is hard.
              </motion.span>
              <br />
              <motion.span
                className="block bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              >
                Running multiple locations without real-time financial visibility is chaos.
              </motion.span>
            </h2>

            {/* Decorative lines */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </motion.div>

          {/* CTA Text */}
          <motion.div
            variants={ctaVariants}
            initial={isMounted ? "hidden" : false}
            animate={isMounted && isInView ? 'visible' : 'hidden'}
            className="text-center mb-12"
          >
            <motion.p
              className="text-xl md:text-2xl text-blue-400 font-semibold inline-block"
              animate={{
                textShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.6)",
                  "0 0 0px rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              If this is you, we should talk:
            </motion.p>
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
                  whileHover={{
                    x: 15,
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  onHoverStart={() => setHoveredProblem(index)}
                  onHoverEnd={() => setHoveredProblem(null)}
                  className="group relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="flex items-start gap-4 p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 transition-all duration-300 overflow-hidden"
                    animate={{
                      borderColor: hoveredProblem === index ? 'rgba(239, 68, 68, 0.3)' : 'rgba(31, 41, 55, 1)',
                    }}
                  >
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5"
                      animate={{
                        opacity: hoveredProblem === index ? 1 : 0,
                        x: hoveredProblem === index ? ['0%', '100%'] : '0%',
                      }}
                      transition={{
                        opacity: { duration: 0.3 },
                        x: { duration: 1.5, repeat: hoveredProblem === index ? Infinity : 0 }
                      }}
                    />

                    {/* Bullet/Icon with pulse */}
                    <div className="flex-shrink-0 mt-1 relative">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                        animate={{
                          scale: hoveredProblem === index ? [1, 1.3, 1] : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: hoveredProblem === index ? Infinity : 0,
                        }}
                      />
                      {/* Pulse ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-red-500"
                        animate={{
                          scale: hoveredProblem === index ? [1, 2, 2] : 1,
                          opacity: hoveredProblem === index ? [0.5, 0, 0] : 0,
                        }}
                        transition={{
                          duration: 1,
                          repeat: hoveredProblem === index ? Infinity : 0,
                        }}
                      />
                    </div>

                    {/* Icon with animation */}
                    <motion.div
                      className="flex-shrink-0"
                      animate={{
                        rotate: hoveredProblem === index ? [0, -10, 10, 0] : 0,
                        scale: hoveredProblem === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`w-6 h-6 transition-colors duration-300 ${
                        hoveredProblem === index ? 'text-red-300' : 'text-red-400'
                      }`} />
                    </motion.div>

                    {/* Text with slide animation */}
                    <motion.p
                      className="text-lg leading-relaxed transition-colors duration-300 relative z-10"
                      animate={{
                        color: hoveredProblem === index ? '#ffffff' : '#d1d5db',
                        x: hoveredProblem === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {problem.text}
                    </motion.p>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute -inset-1 bg-red-500/10 rounded-xl blur-xl -z-10"
                      animate={{
                        opacity: hoveredProblem === index ? 1 : 0,
                        scale: hoveredProblem === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{
                        x: hoveredProblem === index ? '100%' : '-100%',
                      }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Corner accent */}
                    <motion.div
                      className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-400/0 rounded-tr-xl"
                      animate={{
                        borderColor: hoveredProblem === index ? 'rgba(248, 113, 113, 0.5)' : 'rgba(248, 113, 113, 0)',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
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
            <motion.div
              className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-2xl border border-blue-500/30 p-8 md:p-12 text-center overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background grid */}
              <div className="absolute inset-0 opacity-5">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`h-${i}`}
                    className="absolute h-px bg-blue-400 left-0 right-0"
                    style={{ top: `${i * 10}%` }}
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`v-${i}`}
                    className="absolute w-px bg-purple-400 top-0 bottom-0"
                    style={{ left: `${i * 10}%` }}
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="flex items-center justify-center gap-3 mb-4"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <Calendar className="w-8 h-8 text-blue-400" />
              </motion.div>

              <motion.h3
                className="text-2xl md:text-3xl font-bold text-white mb-2"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #fff, #60a5fa, #a78bfa, #fff)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Restaurants operate daily, not monthly.
              </motion.h3>

              <motion.p
                className="text-xl md:text-2xl text-blue-400 font-semibold"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 30px rgba(59, 130, 246, 0.8)",
                    "0 0 0px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Your accounting should too.
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

              {/* Orbiting particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i * 120 * Math.PI) / 180) * 100, 0],
                    y: [0, Math.sin((i * 120 * Math.PI) / 180) * 100, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                  }}
                />
              ))}

              {/* Corner decorations */}
              <motion.div
                className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-blue-400/30 rounded-tl-2xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-purple-400/30 rounded-br-2xl"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TheProblem


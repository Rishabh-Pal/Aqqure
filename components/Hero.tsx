'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp, DollarSign, Calendar, BarChart3, AlertCircle, Lightbulb, Target, Zap, Bot, MessageCircle, Send } from 'lucide-react'
import { useState, useMemo, useEffect, useRef } from 'react'
import RotatingText from './RotatingText'
import AnimatedFinancialTable from './AnimatedFinancialTable'

type DashboardView = 'financial' | 'insights' | 'forecast' | 'alerts'
type AnimationPhase = 'locations' | 'ai-bot' | 'table'

const Hero = () => {
  const [activeLocation, setActiveLocation] = useState('Downtown Austin')
  const [dashboardView, setDashboardView] = useState<DashboardView>('financial')
  const [isMounted, setIsMounted] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('locations')
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0)
  const [clickingLocation, setClickingLocation] = useState<string | null>(null)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const locations = ['Downtown Austin', 'South Congress', 'Domain Northside']

  // AI Bot conversation messages
  const aiConversations = {
    'Downtown Austin': [
      { role: 'user', text: 'Show me this week\'s performance' },
      { role: 'assistant', text: 'Revenue is up 7.4% this week! Labor costs increased slightly due to overtime hours.' },
      { role: 'user', text: 'Any recommendations?' },
      { role: 'assistant', text: 'Consider adjusting Friday-Saturday schedules to reduce overtime while maintaining service quality.' },
    ],
    'South Congress': [
      { role: 'user', text: 'How are we doing this week?' },
      { role: 'assistant', text: 'Excellent! Revenue up 6.7% with strong weekend performance. Peak hours show 45% higher revenue.' },
      { role: 'user', text: 'What should we focus on?' },
      { role: 'assistant', text: 'Extending operating hours on weekends could maximize your peak traffic potential.' },
    ],
    'Domain Northside': [
      { role: 'user', text: 'Weekly report please' },
      { role: 'assistant', text: 'Great news! Food waste reduced by 8% and net profit increased 44% this week.' },
      { role: 'user', text: 'Any concerns?' },
      { role: 'assistant', text: 'Weekday dinner traffic is lower than expected. Consider weekday promotions to boost evening revenue.' },
    ],
  }

  // Animation loop effect
  useEffect(() => {
    if (!isMounted) return

    let isRunning = true

    const sequence = async () => {
      while (isRunning) {
        // Phase 1: Cycle through locations with click animations
        setAnimationPhase('locations')
        
        for (let i = 0; i < locations.length; i++) {
          if (!isRunning) break
          
          setCurrentLocationIndex(i)
          setClickingLocation(locations[i])
          
          // Wait a bit before "clicking"
          await new Promise(resolve => setTimeout(resolve, 800))
          
          if (!isRunning) break
          setActiveLocation(locations[i])
          setClickingLocation(null)
          
          // Show location for 2 seconds
          await new Promise(resolve => setTimeout(resolve, 2000))
        }

        if (!isRunning) break

        // Phase 2: Show AI Bot (use the last location from the cycle)
        const lastLocation = locations[locations.length - 1]
        setAnimationPhase('ai-bot')
        setCurrentMessageIndex(0)
        
        // Small delay to ensure state updates
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const currentConversation = aiConversations[lastLocation as keyof typeof aiConversations]
        
        // Animate through messages
        for (let i = 0; i < currentConversation.length; i++) {
          if (!isRunning) break
          setCurrentMessageIndex(i)
          await new Promise(resolve => setTimeout(resolve, 2000))
        }

        if (!isRunning) break

        // Keep bot visible for additional 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000))

        if (!isRunning) break

        // Phase 3: Show table
        setAnimationPhase('table')
        
        // Show table for 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Reset for next cycle
        setCurrentMessageIndex(0)
      }
    }

    sequence()

    return () => {
      isRunning = false
    }
  }, [isMounted])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Scroll progress tracking for smooth background transition
  useEffect(() => {
    let rafId: number | null = null
    
    const handleScroll = () => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) {
          rafId = null
          return
        }

        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Start transition immediately when user starts scrolling
        // Calculate progress based on how much of the section has scrolled past viewport top
        const sectionTop = rect.top
        const sectionHeight = rect.height
        const sectionBottom = rect.bottom
        
        // Transition starts when section is fully visible and completes when section exits viewport
        // Use a longer transition range for smoother effect
        const transitionRange = sectionHeight * 0.8 // Use 80% of section height for transition
        
        // Calculate progress: 0 when section bottom is at viewport bottom, 1 when section top is at viewport top
        let progress = 0
        
        if (sectionBottom <= windowHeight && sectionTop >= 0) {
          // Section is in viewport - calculate progress based on scroll position
          const scrolled = windowHeight - sectionBottom
          progress = Math.min(1, Math.max(0, scrolled / transitionRange))
        } else if (sectionTop < 0) {
          // Section has scrolled past
          progress = 1
        }
        
        // Apply easing for smoother transition
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
        
        setScrollProgress(easedProgress)
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Interpolate colors based on scroll progress
  const interpolateColor = (start: number[], end: number[], progress: number): string => {
    const r = Math.round(start[0] + (end[0] - start[0]) * progress)
    const g = Math.round(start[1] + (end[1] - start[1]) * progress)
    const b = Math.round(start[2] + (end[2] - start[2]) * progress)
    return `rgb(${r}, ${g}, ${b})`
  }

  // Background colors: dark to white
  const bgFrom = useMemo(() => interpolateColor([10, 10, 10], [255, 255, 255], scrollProgress), [scrollProgress])
  const bgVia = useMemo(() => interpolateColor([15, 15, 15], [255, 255, 255], scrollProgress), [scrollProgress])
  const bgTo = useMemo(() => interpolateColor([10, 10, 10], [255, 255, 255], scrollProgress), [scrollProgress])
  
  // Text colors: light to dark (for contrast on white)
  const textColorLight = useMemo(() => interpolateColor([255, 255, 255], [17, 24, 39], scrollProgress), [scrollProgress])
  const textColorGray = useMemo(() => interpolateColor([156, 163, 175], [75, 85, 99], scrollProgress), [scrollProgress])
  const textColorDark = useMemo(() => interpolateColor([107, 114, 128], [55, 65, 81], scrollProgress), [scrollProgress])
  
  // Dashboard/Table colors: dark to light
  const dashboardBg = useMemo(() => interpolateColor([26, 26, 26], [255, 255, 255], scrollProgress), [scrollProgress])
  const dashboardBorder = useMemo(() => interpolateColor([55, 65, 81], [229, 231, 235], scrollProgress), [scrollProgress])
  const tableBg = useMemo(() => interpolateColor([17, 24, 39], [249, 250, 251], scrollProgress), [scrollProgress])
  const tableBorder = useMemo(() => interpolateColor([55, 65, 81], [209, 213, 219], scrollProgress), [scrollProgress])
  const textInTable = useMemo(() => interpolateColor([209, 213, 219], [17, 24, 39], scrollProgress), [scrollProgress])
  const textInTableLight = useMemo(() => interpolateColor([156, 163, 175], [107, 114, 128], scrollProgress), [scrollProgress])

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  // Location-specific data
  const locationData = {
    'Downtown Austin': {
      dashboardData: [
        { category: 'Revenue', amount: '$45,230', lastWeek: '$42,100', vsLastWeek: '+7.4%', vsLastMonth: '+12.3%', trend: 'up' as const },
        { category: 'Food Costs', amount: '$18,092', lastWeek: '$17,500', vsLastWeek: '+3.4%', vsLastMonth: '+5.2%', trend: 'up' as const },
        { category: 'Labor Costs', amount: '$12,450', lastWeek: '$11,900', vsLastWeek: '+4.6%', vsLastMonth: '+8.1%', trend: 'up' as const },
        { category: 'Operating Expenses', amount: '$8,200', lastWeek: '$8,000', vsLastWeek: '+2.5%', vsLastMonth: '+3.8%', trend: 'up' as const },
        { category: 'Net Profit', amount: '$6,488', lastWeek: '$4,700', vsLastWeek: '+38.0%', vsLastMonth: '+25.4%', trend: 'up' as const },
      ],
      aiInsight: 'Labor costs increased 4.6% due to overtime hours on Friday and Saturday.',
    },
    'South Congress': {
      dashboardData: [
        { category: 'Revenue', amount: '$52,180', lastWeek: '$48,900', vsLastWeek: '+6.7%', vsLastMonth: '+15.2%', trend: 'up' as const },
        { category: 'Food Costs', amount: '$20,350', lastWeek: '$19,200', vsLastWeek: '+6.0%', vsLastMonth: '+8.5%', trend: 'up' as const },
        { category: 'Labor Costs', amount: '$14,200', lastWeek: '$13,100', vsLastWeek: '+8.4%', vsLastMonth: '+12.1%', trend: 'up' as const },
        { category: 'Operating Expenses', amount: '$9,500', lastWeek: '$9,200', vsLastWeek: '+3.3%', vsLastMonth: '+5.1%', trend: 'up' as const },
        { category: 'Net Profit', amount: '$8,130', lastWeek: '$7,400', vsLastWeek: '+9.9%', vsLastMonth: '+18.7%', trend: 'up' as const },
      ],
      aiInsight: 'Peak hours show 45% higher revenue. Consider extending operating hours on weekends.',
    },
    'Domain Northside': {
      dashboardData: [
        { category: 'Revenue', amount: '$38,950', lastWeek: '$36,200', vsLastWeek: '+7.6%', vsLastMonth: '+9.8%', trend: 'up' as const },
        { category: 'Food Costs', amount: '$15,580', lastWeek: '$15,000', vsLastWeek: '+3.9%', vsLastMonth: '+4.2%', trend: 'up' as const },
        { category: 'Labor Costs', amount: '$10,800', lastWeek: '$10,500', vsLastWeek: '+2.9%', vsLastMonth: '+6.5%', trend: 'up' as const },
        { category: 'Operating Expenses', amount: '$7,100', lastWeek: '$6,900', vsLastWeek: '+2.9%', vsLastMonth: '+3.5%', trend: 'up' as const },
        { category: 'Net Profit', amount: '$5,470', lastWeek: '$3,800', vsLastWeek: '+44.0%', vsLastMonth: '+22.1%', trend: 'up' as const },
      ],
      aiInsight: 'Food waste reduced by 8% this week. Continue current inventory management practices.',
    },
  }

  // Get current location data
  const currentLocationData = useMemo(() => {
    return locationData[activeLocation as keyof typeof locationData] || locationData['Downtown Austin']
  }, [activeLocation])

  // Location-specific insights
  const locationInsights = {
    'Downtown Austin': [
      {
        id: 1,
        type: 'optimization',
        icon: Lightbulb,
        title: 'Cost Optimization Opportunity',
        message: 'Reducing food waste by 5% could save $2,100 monthly. Top waste items: lettuce (12%), tomatoes (8%), bread (6%).',
        color: 'yellow',
      },
      {
        id: 2,
        type: 'performance',
        icon: Target,
        title: 'Peak Performance Window',
        message: 'Friday-Saturday 7-9 PM shows 40% higher revenue. Consider extending happy hour or adding staff during these hours.',
        color: 'green',
      },
      {
        id: 3,
        type: 'efficiency',
        icon: Zap,
        title: 'Labor Efficiency Alert',
        message: 'Labor costs increased 4.6% due to overtime hours on Friday and Saturday. Consider scheduling adjustments.',
        color: 'orange',
      },
      {
        id: 4,
        type: 'alert',
        icon: AlertCircle,
        title: 'Inventory Alert',
        message: 'Food cost percentage is 2.3% above target. Review supplier pricing and portion control measures.',
        color: 'red',
      },
    ],
    'South Congress': [
      {
        id: 1,
        type: 'performance',
        icon: Target,
        title: 'High Traffic Period',
        message: 'Weekend traffic is 60% higher than weekdays. Consider increasing staff capacity on Saturdays and Sundays.',
        color: 'green',
      },
      {
        id: 2,
        type: 'optimization',
        icon: Lightbulb,
        title: 'Menu Optimization',
        message: 'Top 3 menu items account for 45% of revenue. Consider promoting these items more prominently.',
        color: 'yellow',
      },
      {
        id: 3,
        type: 'efficiency',
        icon: Zap,
        title: 'Labor Efficiency',
        message: 'Labor hours 15% above average. Review scheduling to optimize staff allocation during peak hours.',
        color: 'orange',
      },
      {
        id: 4,
        type: 'alert',
        icon: AlertCircle,
        title: 'Revenue Opportunity',
        message: 'Happy hour revenue increased 25% this week. Consider extending happy hour duration.',
        color: 'green',
      },
    ],
    'Domain Northside': [
      {
        id: 1,
        type: 'optimization',
        icon: Lightbulb,
        title: 'Waste Reduction Success',
        message: 'Food waste reduced by 8% this week. Continue current inventory management practices for maximum efficiency.',
        color: 'green',
      },
      {
        id: 2,
        type: 'performance',
        icon: Target,
        title: 'Lunch Rush Optimization',
        message: 'Lunch hours (11 AM - 2 PM) show highest efficiency. Consider expanding lunch menu options.',
        color: 'green',
      },
      {
        id: 3,
        type: 'efficiency',
        icon: Zap,
        title: 'Cost Control',
        message: 'Operating expenses well below target. Excellent cost management this period.',
        color: 'green',
      },
      {
        id: 4,
        type: 'alert',
        icon: AlertCircle,
        title: 'Growth Opportunity',
        message: 'Weekday dinner traffic lower than expected. Consider weekday promotions to boost evening revenue.',
        color: 'yellow',
      },
    ],
  }

  const insights = useMemo(() => {
    return locationInsights[activeLocation as keyof typeof locationInsights] || locationInsights['Downtown Austin']
  }, [activeLocation])

  const forecastData = [
    { metric: 'Next Week Revenue', value: '$48,500', change: '+7.2%', confidence: 'High' },
    { metric: 'Expected Labor Cost', value: '$12,800', change: '+2.8%', confidence: 'Medium' },
    { metric: 'Projected Profit', value: '$7,200', change: '+11.0%', confidence: 'High' },
    { metric: 'Cash Flow (30 days)', value: '$185,000', change: '+15.3%', confidence: 'High' },
  ]

  const alerts = [
    { type: 'warning', message: 'Food cost variance detected - review needed', time: '2 hours ago' },
    { type: 'info', message: 'Monthly P&L report ready for review', time: '5 hours ago' },
    { type: 'success', message: 'All locations on track for weekly targets', time: '1 day ago' },
    { type: 'warning', message: 'South Congress location: labor hours 15% above average', time: '2 days ago' },
  ]

  const dashboardViews = [
    { id: 'financial' as DashboardView, label: 'Financial', icon: DollarSign },
    { id: 'insights' as DashboardView, label: 'Insights', icon: Lightbulb },
    { id: 'forecast' as DashboardView, label: 'Forecast', icon: TrendingUp },
    { id: 'alerts' as DashboardView, label: 'Alerts', icon: AlertCircle },
  ]

  if (!isMounted) {
    return (
      <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-16 md:pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="h-48 md:h-64 bg-gray-900/20 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-64 md:h-96 bg-gray-900/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 pb-12 md:pb-16"
      style={{
        background: `linear-gradient(to bottom, ${bgFrom}, ${bgVia}, ${bgTo})`,
        transition: 'background 0.1s ease-out',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ opacity: 1 - scrollProgress * 0.8 }}
          transition={{ duration: 0.1 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ opacity: 1 - scrollProgress * 0.8 }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8">
            <motion.div variants={itemVariants}>
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="block"
                  style={{
                    color: textColorLight,
                  }}
                >
                  Grow Your Restaurants
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="block"
                  style={{
                    color: scrollProgress < 0.5 
                      ? interpolateColor([96, 165, 250], [30, 64, 175], scrollProgress * 2)
                      : interpolateColor([30, 64, 175], [30, 58, 138], (scrollProgress - 0.5) * 2),
                  }}
                >
                  Without Losing Financial Control
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg leading-relaxed min-h-[3rem] sm:min-h-[3.5rem] flex items-center w-full mb-4"
              style={{
                color: textColorGray,
              }}
            >
              <RotatingText
                texts={[
                  'The finance team that runs at the speed of your operations.',
                  'Real-time insights that drive smarter restaurant decisions.',
                  'Financial clarity across all your locations, instantly.',
                ]}
                interval={4000}
                speed={50}
                className="w-full"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-3 mb-4"
            >
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                  style={{ color: textColorGray }}
                >
                  <Calendar 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" 
                    style={{
                      color: scrollProgress < 0.5 ? '#3b82f6' : '#1e40af'
                    }}
                  />
                  <span>Weekly P&Ls by location</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                  style={{ color: textColorGray }}
                >
                  <TrendingUp 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" 
                    style={{
                      color: scrollProgress < 0.5 ? '#3b82f6' : '#1e40af'
                    }}
                  />
                  <span>Daily cash flow visibility</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                  style={{ color: textColorGray }}
                >
                  <DollarSign 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" 
                    style={{
                      color: scrollProgress < 0.5 ? '#3b82f6' : '#1e40af'
                    }}
                  />
                  <span className="line-clamp-2 sm:line-clamp-1">Actionable insights on food and labor costs</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium text-sm sm:text-base overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book a consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 sm:px-6 py-2.5 sm:py-3 border-2 rounded-lg font-medium text-sm sm:text-base hover:border-blue-500 hover:text-blue-400 transition-colors w-full sm:w-auto text-center"
                style={{
                  borderColor: scrollProgress < 0.5 ? 'rgb(55, 65, 81)' : 'rgb(209, 213, 219)',
                  color: textColorGray,
                  transition: 'border-color 0.1s ease-out, color 0.1s ease-out',
                }}
              >
                <span className="hidden sm:inline">View sample weekly location P&L</span>
                <span className="sm:hidden">View sample P&L</span>
              </motion.button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm italic text-center sm:text-left"
              style={{
                color: textColorDark,
              }}
            >
              Scale Your Restaurants with Confidence.
            </motion.p>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <motion.div
            variants={itemVariants}
            className="relative order-first lg:order-last"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative rounded-xl md:rounded-2xl border shadow-2xl p-3 sm:p-4 md:p-6 backdrop-blur-sm"
              style={{
                backgroundColor: dashboardBg,
                borderColor: dashboardBorder,
                transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out',
              }}
            >
              {/* Location Tabs */}
              <div 
                className="flex gap-1 sm:gap-2 mb-3 sm:mb-4 border-b pb-3 sm:pb-4 overflow-x-auto scrollbar-hide"
                style={{
                  borderColor: dashboardBorder,
                  transition: 'border-color 0.1s ease-out',
                }}
              >
                {locations.map((location, index) => (
                  <motion.button
                    key={location}
                    onClick={() => setActiveLocation(location)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: clickingLocation === location ? 0.95 : 1,
                      backgroundColor: 
                        activeLocation === location
                          ? 'rgba(37, 99, 235, 1)'
                          : clickingLocation === location
                          ? 'rgba(55, 65, 81, 0.8)'
                          : 'transparent',
                    }}
                    transition={{ duration: 0.2 }}
                    className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      activeLocation === location
                        ? 'bg-blue-600 text-white'
                        : scrollProgress < 0.5 
                        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    <span className="hidden sm:inline">{location}</span>
                    <span className="sm:hidden">{location.split(' ')[0]}</span>
                  </motion.button>
                ))}
              </div>

              {/* Dashboard View Tabs */}
              <div 
                className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 border-b pb-3 sm:pb-4 overflow-x-auto scrollbar-hide"
                style={{
                  borderColor: dashboardBorder,
                  transition: 'border-color 0.1s ease-out',
                }}
              >
                {dashboardViews.map((view) => {
                  const Icon = view.icon
                  return (
                    <button
                      key={view.id}
                      onClick={() => setDashboardView(view.id)}
                      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                        dashboardView === view.id
                          ? 'bg-blue-600 text-white'
                          : scrollProgress < 0.5 
                          ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{view.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Dynamic Content Based on View */}
              <AnimatePresence mode="wait">
                {/* Financial Table View - Always show when dashboardView is financial */}
                {dashboardView === 'financial' && (
                  <motion.div
                    key={`financial-${activeLocation}-${animationPhase}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* AI Insight */}
                    <motion.div
                      key={`insight-${activeLocation}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-6 p-4 rounded-lg border"
                      style={{
                        backgroundColor: scrollProgress < 0.5 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                        borderColor: scrollProgress < 0.5 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                        transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <p 
                            className="text-sm font-medium mb-1"
                            style={{
                              color: scrollProgress < 0.5 ? 'rgb(147, 197, 253)' : 'rgb(37, 99, 235)',
                              transition: 'color 0.1s ease-out',
                            }}
                          >
                            AI Insight
                          </p>
                          <p 
                            className="text-sm"
                            style={{
                              color: textInTable,
                              transition: 'color 0.1s ease-out',
                            }}
                          >
                            {currentLocationData.aiInsight}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Animated Financial Table and Charts */}
                    <div 
                      className="relative w-full rounded-lg overflow-hidden p-3 border"
                      style={{
                        backgroundColor: tableBg,
                        borderColor: tableBorder,
                        transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out',
                      }}
                    >
                      <AnimatedFinancialTable 
                        data={currentLocationData.dashboardData} 
                        location={activeLocation}
                        scrollProgress={scrollProgress}
                        textColor={textInTable}
                        textColorLight={textInTableLight}
                        textColorHeader={textInTableLight}
                        borderColor={tableBorder}
                      />
                    </div>
                  </motion.div>
                )}

                {dashboardView === 'insights' && (
                  <motion.div
                    key={`insights-${activeLocation}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {insights.map((insight, index) => {
                      const Icon = insight.icon
                      const colorClasses = {
                        yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
                        green: 'bg-green-500/10 border-green-500/20 text-green-400',
                        orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
                        red: 'bg-red-500/10 border-red-500/20 text-red-400',
                      }
                      return (
                        <motion.div
                          key={insight.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 border rounded-lg ${colorClasses[insight.color as keyof typeof colorClasses]}`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium mb-1">{insight.title}</p>
                              <p 
                                className="text-sm"
                                style={{
                                  color: textInTable,
                                  transition: 'color 0.1s ease-out',
                                }}
                              >
                                {insight.message}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}

                {dashboardView === 'forecast' && (
                  <motion.div
                    key={`forecast-${activeLocation}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div 
                      className="p-4 rounded-lg border mb-4"
                      style={{
                        backgroundColor: scrollProgress < 0.5 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.05)',
                        borderColor: scrollProgress < 0.5 ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.15)',
                        transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-purple-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-purple-300 font-medium mb-1">AI Forecast</p>
                          <p 
                            className="text-sm"
                            style={{
                              color: textInTable,
                              transition: 'color 0.1s ease-out',
                            }}
                          >
                            Based on historical data and current trends, here's what to expect next week.
                          </p>
                        </div>
                      </div>
                    </div>
                    {forecastData.map((item, index) => (
                      <motion.div
                        key={item.metric}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border rounded-lg"
                        style={{
                          backgroundColor: scrollProgress < 0.5 ? 'rgba(31, 41, 55, 0.5)' : 'rgba(249, 250, 251, 0.5)',
                          borderColor: tableBorder,
                          transition: 'background-color 0.1s ease-out, border-color 0.1s ease-out',
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            className="text-sm"
                            style={{
                              color: textInTable,
                              transition: 'color 0.1s ease-out',
                            }}
                          >
                            {item.metric}
                          </span>
                          <span 
                            className="text-sm font-semibold"
                            style={{
                              color: textColorLight,
                              transition: 'color 0.1s ease-out',
                            }}
                          >
                            {item.value}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-xs"
                            style={{
                              color: textInTableLight,
                              transition: 'color 0.1s ease-out',
                            }}
                          >
                            Confidence: {item.confidence}
                          </span>
                          <span className="text-sm text-green-400 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {item.change}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {dashboardView === 'alerts' && (
                  <motion.div
                    key={`alerts-${activeLocation}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {alerts.map((alert, index) => {
                      const alertColors = {
                        warning: 'border-yellow-500/30 bg-yellow-500/5',
                        info: 'border-blue-500/30 bg-blue-500/5',
                        success: 'border-green-500/30 bg-green-500/5',
                      }
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 border rounded-lg ${alertColors[alert.type as keyof typeof alertColors]}`}
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircle className={`w-5 h-5 mt-0.5 ${
                              alert.type === 'warning' ? 'text-yellow-400' :
                              alert.type === 'info' ? 'text-blue-400' :
                              'text-green-400'
                            }`} />
                            <div className="flex-1">
                              <p 
                                className="text-sm mb-1"
                                style={{
                                  color: textInTable,
                                  transition: 'color 0.1s ease-out',
                                }}
                              >
                                {alert.message}
                              </p>
                              <p 
                                className="text-xs"
                                style={{
                                  color: textInTableLight,
                                  transition: 'color 0.1s ease-out',
                                }}
                              >
                                {alert.time}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Decorative glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-xl -z-10" />

            {/* Floating Chatbot Icon */}
            <AnimatePresence>
              {animationPhase !== 'ai-bot' && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-blue-500/50 transition-shadow"
                >
                  <Bot className="w-6 h-6 text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* AI Bot Overlay - Appears when animationPhase is 'ai-bot' */}
            <AnimatePresence>
              {animationPhase === 'ai-bot' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0 bg-[#1a1a1a] rounded-xl md:rounded-2xl border border-gray-800 shadow-2xl p-4 md:p-6 z-50 backdrop-blur-sm flex flex-col overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700 flex-shrink-0">
                    <div className="relative">
                      <Bot className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
                      <p 
                        className="text-xs"
                        style={{
                          color: textInTableLight,
                          transition: 'color 0.1s ease-out',
                        }}
                      >
                        Analyzing {activeLocation} data...
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto pr-2 min-h-0">
                    <AnimatePresence mode="wait">
                      {aiConversations[activeLocation as keyof typeof aiConversations]
                        .slice(0, currentMessageIndex + 1)
                        .map((message, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20, y: 10 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.role === 'user'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-800 text-gray-200 border border-gray-700'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {message.role === 'assistant' && (
                                  <Bot className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                )}
                                {message.role === 'user' && (
                                  <MessageCircle className="w-4 h-4 text-white/80 mt-0.5 flex-shrink-0" />
                                )}
                                <p className="text-sm leading-relaxed">{message.text}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Typing indicator when waiting for next message */}
                    {currentMessageIndex < aiConversations[activeLocation as keyof typeof aiConversations].length - 1 && 
                     aiConversations[activeLocation as keyof typeof aiConversations][currentMessageIndex]?.role === 'user' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              className="w-2 h-2 bg-blue-400 rounded-full"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                              className="w-2 h-2 bg-blue-400 rounded-full"
                            />
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                              className="w-2 h-2 bg-blue-400 rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input Box */}
                  <div className="mt-4 pt-4 border-t border-gray-700 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2.5 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero


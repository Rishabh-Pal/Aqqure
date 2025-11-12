'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp, DollarSign, Calendar, BarChart3, AlertCircle, Lightbulb, Target, Zap } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import RotatingText from './RotatingText'
import AnimatedFinancialTable from './AnimatedFinancialTable'

type DashboardView = 'financial' | 'insights' | 'forecast' | 'alerts'

const Hero = () => {
  const [activeLocation, setActiveLocation] = useState('Downtown Austin')
  const [dashboardView, setDashboardView] = useState<DashboardView>('financial')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const locations = ['Downtown Austin', 'South Congress', 'Domain Northside']

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-16 md:pt-20">
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] pt-16 md:pt-20 pb-12 md:pb-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
                  className="block bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent"
                >
                  Grow Your Restaurants
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                >
                  Without Losing Financial Control
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed min-h-[3rem] sm:min-h-[3.5rem] flex items-center w-full mb-4"
            >
              <RotatingText
                texts={[
                  'The finance team that runs at the speed of your operations.',
                  'Real-time insights that drive smarter restaurant decisions.',
                  'Financial clarity across all your locations, instantly.',
                ]}
                interval={4000}
                speed={50}
                className="text-gray-400 w-full"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-3 mb-4"
            >
              <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                  <span>Weekly P&Ls by location</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                  <span>Daily cash flow visibility</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                  className="flex items-center gap-1.5 sm:gap-2"
                >
                  <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
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
                className="px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-700 text-gray-300 rounded-lg font-medium text-sm sm:text-base hover:border-blue-500 hover:text-blue-400 transition-colors w-full sm:w-auto text-center"
              >
                <span className="hidden sm:inline">View sample weekly location P&L</span>
                <span className="sm:hidden">View sample P&L</span>
              </motion.button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-sm text-gray-500 italic text-center sm:text-left"
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
              className="bg-[#1a1a1a] rounded-xl md:rounded-2xl border border-gray-800 shadow-2xl p-3 sm:p-4 md:p-6 backdrop-blur-sm"
            >
              {/* Location Tabs */}
              <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4 border-b border-gray-800 pb-3 sm:pb-4 overflow-x-auto scrollbar-hide">
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => setActiveLocation(location)}
                    className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      activeLocation === location
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <span className="hidden sm:inline">{location}</span>
                    <span className="sm:hidden">{location.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Dashboard View Tabs */}
              <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 border-b border-gray-800 pb-3 sm:pb-4 overflow-x-auto scrollbar-hide">
                {dashboardViews.map((view) => {
                  const Icon = view.icon
                  return (
                    <button
                      key={view.id}
                      onClick={() => setDashboardView(view.id)}
                      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                        dashboardView === view.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
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
                {dashboardView === 'financial' && (
                  <motion.div
                    key={`financial-${activeLocation}`}
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
                      className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-300 font-medium mb-1">AI Insight</p>
                          <p className="text-sm text-gray-300">
                            {currentLocationData.aiInsight}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Animated Financial Table and Charts */}
                    <div className="relative w-full rounded-lg overflow-hidden bg-gray-900/50 border border-gray-700 p-3">
                      <AnimatedFinancialTable 
                        data={currentLocationData.dashboardData} 
                        location={activeLocation}
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
                              <p className="text-sm text-gray-300">{insight.message}</p>
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
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-4">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-purple-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-purple-300 font-medium mb-1">AI Forecast</p>
                          <p className="text-sm text-gray-300">
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
                        className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">{item.metric}</span>
                          <span className="text-sm font-semibold text-white">{item.value}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Confidence: {item.confidence}</span>
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
                              <p className="text-sm text-gray-300 mb-1">{alert.message}</p>
                              <p className="text-xs text-gray-500">{alert.time}</p>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero


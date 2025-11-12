'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Ensure minimum loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Logo or spinner */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
            
            {/* Loading bar */}
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-blue-600"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader


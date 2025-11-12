'use client'

import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              FinTech
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              About
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm hover:from-blue-500 hover:to-blue-600 transition-all"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-800"
          >
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


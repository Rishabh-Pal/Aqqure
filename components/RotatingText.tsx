'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface RotatingTextProps {
  texts: string[]
  interval?: number
  speed?: number
  className?: string
}

const RotatingText = ({ texts, interval = 4000, speed = 50, className = '' }: RotatingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const currentText = texts[currentIndex]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let currentCharIndex = 0

    // Reset when text changes
    setDisplayedText('')
    setIsTyping(true)
    setIsComplete(false)
    currentCharIndex = 0

    const typeText = () => {
      if (currentCharIndex < currentText.length) {
        setDisplayedText(currentText.slice(0, currentCharIndex + 1))
        currentCharIndex++
        timeoutId = setTimeout(typeText, speed)
      } else {
        setIsTyping(false)
        setIsComplete(true)
        // Wait before switching to next text
        timeoutId = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }, interval - (currentText.length * speed))
      }
    }

    const startTimeout = setTimeout(() => {
      typeText()
    }, 100)

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(timeoutId)
    }
  }, [currentText, speed, interval, texts.length])

  if (!isMounted) {
    return (
      <div className={`relative w-full ${className}`}>
        <div className="relative w-full text-left">
          <span className="inline-block opacity-0">{texts[0]}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full text-left">
        <span className="inline-block">
          {displayedText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-0.5 h-4 bg-blue-500 ml-1 align-middle"
            />
          )}
        </span>
      </div>
    </div>
  )
}

export default RotatingText


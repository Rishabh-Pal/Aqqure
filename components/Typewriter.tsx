'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

const Typewriter = ({ text, speed = 50, delay = 0, className = '' }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let currentIndex = 0

    const startTyping = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
        timeoutId = setTimeout(startTyping, speed)
      } else {
        setIsComplete(true)
      }
    }

    const initialTimeout = setTimeout(() => {
      startTyping()
    }, delay)

    return () => {
      clearTimeout(initialTimeout)
      clearTimeout(timeoutId)
    }
  }, [text, speed, delay])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-5 bg-blue-500 ml-1"
        />
      )}
    </span>
  )
}

export default Typewriter


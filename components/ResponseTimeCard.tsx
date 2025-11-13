'use client'

import { useState, useEffect, useRef } from 'react'
import { Zap, MessageCircle, User, MapPinned, Bot } from 'lucide-react'

const ResponseTimeCard = () => {
  const step = {
    icon: Zap,
    title: '5 minute average response time.',
    subtitle: "Finance questions shouldn't take days.",
    description: '98% of queries answered in under 5 minutes. Real-time insights, instant clarity, zero waiting.',
    color: '#16a34a',
  }

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<number[]>([])
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  const chatMessages = [
    {
      sender: 'user',
      text: "What's our food cost % this week?",
      time: '2:34 PM',
    },
    {
      sender: 'controller',
      text: 'Your food cost is 28.5% this week, down from 30.2% last week. Great improvement!',
      time: '2:35 PM',
    },
    {
      sender: 'user',
      text: 'Why did labor costs spike at the downtown location?',
      time: '2:36 PM',
    },
    {
      sender: 'controller',
      text: 'Downtown had 15 extra hours due to a catering event. The $450 increase is expected and within budget.',
      time: '2:37 PM',
    },
    {
      sender: 'user',
      text: 'Can we close the books early this month?',
      time: '2:38 PM',
    },
    {
      sender: 'controller',
      text: 'Yes! We\'re on track for Day 2 close. All reconciliations are complete.',
      time: '2:39 PM',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayedMessages.length < chatMessages.length) {
        setDisplayedMessages((prev) => [...prev, prev.length])
      } else {
        // Reset after showing all messages
        setTimeout(() => {
          setDisplayedMessages([])
        }, 3000)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [displayedMessages.length, chatMessages.length])

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [displayedMessages])

  const StepIcon = step.icon

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Side - Big Text Block (2/3) */}
          <div className="lg:col-span-2 flex relative z-0">
             <Bot  className="md:w-40 md:h-60 w-16 h-16 absolute md:top-[-100px] top-[-30px] md:right-10 right-5 text-green-600" />
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 md:p-8 flex flex-col w-full" style={{ height: '300px' }}>
              {/* Title and Subtitle */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
                    }}
                  >
                    <StepIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-700">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Big Text Block */}
              <div className="flex-1 flex items-center justify-center">
                <p className="text-base md:text-lg lg:text-xl font-mono font-semibold text-gray-800 text-center leading-relaxed max-w-2xl">
                  {step.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Chatbot Conversation (1/3) */}
          <div className="lg:col-span-1 flex relative z-0">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-4 md:p-6 flex flex-col w-full" style={{ height: '300px' }}>
              {/* Chat Interface */}
              <div className="flex flex-col bg-white rounded-xl border border-green-200 overflow-hidden h-full">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-2.5 flex items-center gap-2 flex-shrink-0">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm truncate">Finance Controller</div>
                    <div className="text-green-100 text-xs">Online • 5 min</div>
                  </div>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse flex-shrink-0"></div>
                </div>

                {/* Chat Messages Container with Scroll */}
                <div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
                  <div 
                    ref={chatContainerRef}
                    className="overflow-y-auto p-3 space-y-3 chat-scroll"
                    style={{ 
                      scrollBehavior: 'smooth',
                      flex: 1
                    }}
                  >
                    {displayedMessages.map((index) => {
                      const message = chatMessages[index]
                      const isUser = message.sender === 'user'
                      
                      return (
                        <div
                          key={index}
                          className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                          style={{
                            animation: 'fadeInUp 0.3s ease-out',
                          }}
                        >
                          {!isUser && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <MessageCircle className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          <div className={`max-w-[85%] ${isUser ? 'order-2' : ''}`}>
                            <div
                              className={`rounded-xl px-3 py-2 ${
                                isUser
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p className="text-xs leading-relaxed">{message.text}</p>
                            </div>
                            <div className={`text-[10px] text-gray-500 mt-0.5 ${isUser ? 'text-right' : 'text-left'}`}>
                              {message.time}
                            </div>
                          </div>
                          {isUser && (
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-3.5 h-3.5 text-gray-600" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Typing Indicator */}
                  {displayedMessages.length < chatMessages.length && (
                    <div className="px-3 pb-2 pt-1 flex-shrink-0 bg-white border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="ml-1 truncate">Typing...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <style jsx global>{`
        /* Custom scrollbar for chat */
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 10px;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
      `}</style>
    </section>
  )
}

export default ResponseTimeCard


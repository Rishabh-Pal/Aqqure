'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FinancialRow {
  category: string
  amount: string
  lastWeek: string
  vsLastWeek: string
  vsLastMonth: string
  trend: 'up' | 'down'
}

interface AnimatedFinancialTableProps {
  data: FinancialRow[]
  location: string
}

const AnimatedFinancialTable = ({ data, location }: AnimatedFinancialTableProps) => {
  const [animatedData, setAnimatedData] = useState(data)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setAnimatedData(data)
  }, [data])

  // Calculate max value for bar chart
  const maxAmount = Math.max(
    ...data.map((row) => parseFloat(row.amount.replace(/[^0-9.]/g, '')))
  )

  // Different visualization styles for each location
  const getVisualizationType = () => {
    if (location === 'Downtown Austin') return 'compact-table'
    if (location === 'South Congress') return 'bar-chart'
    return 'mini-chart'
  }

  const vizType = getVisualizationType()

  if (!isMounted) {
    return <div className="h-64 w-full bg-gray-900/50 rounded-lg animate-pulse" />
  }

  // Compact Table View for Downtown Austin
  if (vizType === 'compact-table') {
    return (
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-2 px-2 font-semibold text-gray-400">Category</th>
                <th className="text-right py-2 px-2 font-semibold text-gray-400">Amount</th>
                <th className="text-right py-2 px-2 font-semibold text-gray-400">Δ Week</th>
                <th className="text-right py-2 px-2 font-semibold text-gray-400">Δ Month</th>
              </tr>
            </thead>
            <tbody>
              {animatedData.map((row, index) => (
                <motion.tr
                  key={row.category}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-2 px-2 text-gray-300">{row.category}</td>
                  <td className="py-2 px-2 text-right font-semibold text-white">{row.amount}</td>
                  <td className="py-2 px-2 text-right">
                    <span className={`flex items-center justify-end gap-0.5 text-[10px] ${
                      row.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {row.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {row.vsLastWeek}
                    </span>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <span className={`flex items-center justify-end gap-0.5 text-[10px] ${
                      row.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {row.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {row.vsLastMonth}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Bar Chart View for South Congress
  if (vizType === 'bar-chart') {
    return (
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-gray-400 mb-2">Financial Overview</h4>
        <div className="space-y-2">
          {animatedData.map((row, index) => {
            const amountValue = parseFloat(row.amount.replace(/[^0-9.]/g, ''))
            const percentage = (amountValue / maxAmount) * 100
            const isProfit = row.category === 'Net Profit'
            
            return (
              <motion.div
                key={row.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="space-y-0.5"
              >
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span className="truncate">{row.category}</span>
                  <span className="font-semibold text-white ml-2">{row.amount}</span>
                </div>
                <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.6, delay: index * 0.08 + 0.1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      isProfit
                        ? 'bg-gradient-to-r from-green-500 to-green-400'
                        : row.category === 'Revenue'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-400'
                        : 'bg-gradient-to-r from-orange-500 to-orange-400'
                    }`}
                  />
                </div>
                <div className="flex items-center justify-end gap-2 text-[10px] text-gray-500">
                  <span className={row.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {row.vsLastWeek}
                  </span>
                  <span className={row.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {row.vsLastMonth}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  // Mini Chart View for Domain Northside
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold text-gray-400">Week Comparison</h4>
      <div className="flex items-end justify-between gap-3 h-32">
        {animatedData.map((row, index) => {
          const currentValue = parseFloat(row.amount.replace(/[^0-9.]/g, ''))
          const lastWeekValue = parseFloat(row.lastWeek.replace(/[^0-9.]/g, ''))
          const maxValue = Math.max(...data.map(r => parseFloat(r.amount.replace(/[^0-9.]/g, ''))))
          const currentHeight = (currentValue / maxValue) * 100
          const lastWeekHeight = (lastWeekValue / maxValue) * 100
          
          return (
            <motion.div
              key={row.category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex-1 flex flex-col items-center gap-2 min-w-0"
            >
              <div className="relative w-full h-24 flex items-end justify-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${lastWeekHeight}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="w-[45%] bg-gray-600/70 rounded-t min-h-[2px]"
                />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${currentHeight}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className={`w-[45%] rounded-t min-h-[2px] ${
                    row.category === 'Net Profit'
                      ? 'bg-green-500'
                      : row.category === 'Revenue'
                      ? 'bg-blue-500'
                      : 'bg-orange-500'
                  }`}
                />
              </div>
              <div className="text-center w-full">
                <div className="text-[10px] text-gray-300 font-semibold truncate">{row.amount}</div>
                <div className="text-[9px] text-gray-500 truncate leading-tight mt-0.5">{row.category.split(' ')[0]}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default AnimatedFinancialTable


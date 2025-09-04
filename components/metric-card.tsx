"use client"

const TrendingUp = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TrendingDown = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
)

const Minus = () => (
  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
)

interface MetricCardProps {
  title: string
  value: number
  expected: number
  minimum: number
  trend: Record<string, string>
  selectedMonth: string
}

export function MetricCard({ value, expected, minimum, trend, selectedMonth }: MetricCardProps) {
  const getPerformanceStatus = () => {
    if (value >= expected) return { status: "excellent", color: "text-green-600", bg: "bg-green-50" }
    if (value >= minimum) return { status: "good", color: "text-amber-600", bg: "bg-amber-50" }
    return { status: "needs improvement", color: "text-red-600", bg: "bg-red-50" }
  }

  const getTrendDirection = () => {
    const months = Object.keys(trend)
    const currentIndex = months.indexOf(selectedMonth)
    if (currentIndex <= 0) return null

    const previousMonth = months[currentIndex - 1]
    const currentValue = Number.parseFloat(trend[selectedMonth]) || 0
    const previousValue = Number.parseFloat(trend[previousMonth]) || 0

    if (currentValue > previousValue) return "up"
    if (currentValue < previousValue) return "down"
    return "stable"
  }

  const { status, color, bg } = getPerformanceStatus()
  const trendDirection = getTrendDirection()

  return (
    <div className={`p-3 rounded-lg ${bg} border`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${color} ${bg}`}>{status.toUpperCase()}</div>
          {trendDirection && (
            <div className="flex items-center">
              {trendDirection === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
              {trendDirection === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
              {trendDirection === "stable" && <Minus className="h-3 w-3 text-slate-500" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

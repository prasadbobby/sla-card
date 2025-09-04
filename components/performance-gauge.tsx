"use client"

interface PerformanceGaugeProps {
  value: number
  expected: number
  minimum: number
  size?: "small" | "medium" | "large"
}

export function PerformanceGauge({ value, expected, minimum, size = "medium" }: PerformanceGaugeProps) {
  const getColor = () => {
    if (value >= expected) return "#10b981" // green
    if (value >= minimum) return "#f59e0b" // amber
    return "#ef4444" // red
  }

  const getSize = () => {
    switch (size) {
      case "small":
        return { width: 60, height: 60, strokeWidth: 4 }
      case "medium":
        return { width: 80, height: 80, strokeWidth: 6 }
      case "large":
        return { width: 120, height: 120, strokeWidth: 8 }
    }
  }

  const { width, height, strokeWidth } = getSize()
  const radius = (width - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const percentage = Math.min(Math.max(value, 0), 100)
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-bold text-slate-900 dark:text-slate-100 ${
            size === "small" ? "text-xs" : size === "medium" ? "text-sm" : "text-lg"
          }`}
        >
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

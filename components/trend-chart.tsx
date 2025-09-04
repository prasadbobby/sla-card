"use client"

interface TrendChartProps {
  data: any[]
  selectedMonth: string
}

export function TrendChart({ data }: TrendChartProps) {
  const months = [
    "Jan'24",
    "Feb'24",
    "Mar'24",
    "Apr'24",
    "May'24",
    "Jun'24",
    "Jul'24",
    "Aug'24",
    "Sep'24",
    "Oct'24",
    "Nov'24",
    "Dec'24",
    "Jan'25",
    "Feb'25",
    "Mar'25",
    "Apr'25",
    "May'25",
    "Jun'25",
    "Jul'25",
  ]

  const chartData = months.map((month) => {
    const monthData: any = { month: month.replace("'", "") }

    data.slice(0, 5).forEach((item, index) => {
      const rawValue = item[month] || "0"
      const value = Number.parseFloat(rawValue.toString().replace("%", "")) || 0
      monthData[`metric${index + 1}`] = value
    })

    return monthData
  })

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
  const width = 800
  const height = 300
  const padding = 60

  // Calculate scales
  const maxValue = Math.max(
    ...chartData.flatMap((d) =>
      Object.keys(d)
        .filter((k) => k.startsWith("metric"))
        .map((k) => d[k]),
    ),
    100, // Ensure minimum range
  )
  const minValue = Math.min(
    ...chartData.flatMap((d) =>
      Object.keys(d)
        .filter((k) => k.startsWith("metric"))
        .map((k) => d[k]),
    ),
    0, // Ensure minimum range
  )

  const valueRange = maxValue - minValue
  const safeRange = valueRange === 0 ? 100 : valueRange

  const xScale = (index: number) => padding + (index * (width - 2 * padding)) / Math.max(chartData.length - 1, 1)
  const yScale = (value: number) => {
    if (isNaN(value) || value === null || value === undefined) return height - padding
    return height - padding - ((value - minValue) * (height - 2 * padding)) / safeRange
  }

  const yAxisLabels = []
  for (let i = 0; i <= 4; i++) {
    const value = minValue + (i * safeRange) / 4
    yAxisLabels.push(Math.round(value * 10) / 10) // Round to 1 decimal place
  }

  return (
    <div className="h-80 w-full">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Y-axis labels */}
        {yAxisLabels.map((value) => (
          <g key={value}>
            <line
              x1={padding}
              y1={yScale(value)}
              x2={width - padding}
              y2={yScale(value)}
              stroke="#e2e8f0"
              strokeWidth="1"
              opacity="0.5"
            />
            <text
              x={padding - 10}
              y={yScale(value)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="12"
              fill="#64748b"
            >
              {value}%
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {chartData.map((d, index) => (
          <text
            key={index}
            x={xScale(index)}
            y={height - padding + 20}
            textAnchor="middle"
            fontSize="10"
            fill="#64748b"
            transform={`rotate(-45 ${xScale(index)} ${height - padding + 20})`}
          >
            {d.month}
          </text>
        ))}

        {/* Data lines */}
        {data.slice(0, 5).map((item, metricIndex) => {
          const points = chartData
            .map((d, index) => {
              const yValue = d[`metric${metricIndex + 1}`] || 0
              return {
                x: xScale(index),
                y: yScale(yValue),
              }
            })
            .filter((point) => !isNaN(point.x) && !isNaN(point.y)) // Filter out NaN points

          if (points.length === 0) return null // Skip if no valid points

          const pathData = points.reduce((path, point, index) => {
            return index === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`
          }, "")

          return (
            <g key={metricIndex}>
              <path d={pathData} fill="none" stroke={colors[metricIndex]} strokeWidth="2" />
              {points.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r="3" fill={colors[metricIndex]} />
              ))}
            </g>
          )
        })}

        {/* Legend */}
        {data.slice(0, 5).map((item, index) => (
          <g key={index}>
            <rect x={width - 200} y={20 + index * 20} width="12" height="2" fill={colors[index]} />
            <text x={width - 180} y={20 + index * 20 + 6} fontSize="10" fill="#64748b">
              {item.description.substring(0, 25)}...
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

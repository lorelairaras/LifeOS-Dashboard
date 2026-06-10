interface ProgressRingProps {
  value: number
  size?: number
  stroke?: number
  colorClass?: string
  trackClass?: string
}

export default function ProgressRing({
  value,
  size = 80,
  stroke = 6,
  colorClass = 'text-os-cyan',
  trackClass = 'text-os-border',
}: ProgressRingProps) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(100, value))
  const offset = circumference - (pct / 100) * circumference

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="-rotate-90"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={stroke}
        className={`stroke-current ${trackClass}`}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={`stroke-current ${colorClass} transition-[stroke-dashoffset] duration-700 ease-out`}
      />
    </svg>
  )
}

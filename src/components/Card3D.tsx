import { useRef, useCallback } from 'react'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export default function Card3D({ children, className, intensity = 10 }: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      ref.current.style.transform =
        `perspective(800px) rotateY(${x * intensity}deg) rotateX(${y * -intensity}deg) scale(1.02)`
    },
    [prefersReducedMotion, intensity],
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

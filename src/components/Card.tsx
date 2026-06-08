interface CardProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export default function Card({ children, className = '', as: Tag = 'div' }: CardProps) {
  return (
    <Tag className={`rounded-xl bg-surface-800 p-6 shadow-md ${className}`}>
      {children}
    </Tag>
  )
}

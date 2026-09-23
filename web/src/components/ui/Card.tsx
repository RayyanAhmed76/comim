import { cn } from '@/lib/cn'

export function Card({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <div
      className={cn('rounded-2xl border border-slate-200/80 bg-panel shadow-sm', className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick()
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}

export function StatCard({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string | number
  valueClassName?: string
}) {
  return (
    <Card className="px-5 py-4">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">{label}</div>
      <div className={cn('mt-2 text-3xl font-bold tracking-tight text-ink', valueClassName)}>{value}</div>
    </Card>
  )
}

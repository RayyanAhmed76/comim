import { Link } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useTranslation } from 'react-i18next'

export function TrainingShell({
  badge,
  right,
  children,
  onLogout,
  backTo,
  backLabel,
  /** When false: light gray page body (PDF course menu / catalog). Header stays navy. */
  dark = true,
}: {
  badge: string
  right?: React.ReactNode
  children: React.ReactNode
  onLogout?: () => void
  /** PDF exercise chrome: “← Course menu” on the right */
  backTo?: string
  backLabel?: string
  dark?: boolean
}) {
  const { t } = useTranslation()

  return (
    <div className={cn('min-h-screen overflow-x-hidden', dark ? 'grid-blueprint text-white' : 'bg-[#F4F7F9] text-ink')}>
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#0A1633] px-3 py-3 text-white sm:px-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Logo compact light />
          <div className="hidden h-6 w-px bg-white/20 sm:block" />
          <span className="hidden text-sm font-semibold text-white sm:inline">{t('common.training')}</span>
          <span className="max-w-[140px] truncate rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-200 ring-1 ring-white/15 sm:max-w-none sm:px-3 sm:text-xs">
            {badge}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          <LanguageSwitch variant="dark" />
          <span className="hidden md:inline-flex">{right}</span>
          {backTo && (
            <Link
              to={backTo}
              className="text-[11px] font-semibold text-sky-300 hover:text-white sm:text-xs"
            >
              ← {backLabel ?? t('student.courseMenuBack')}
            </Link>
          )}
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white ring-1 ring-white/10 hover:bg-white/15 sm:gap-2 sm:px-3 sm:text-sm"
            >
              <X className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('common.logOut')}</span>
            </button>
          )}
        </div>
      </header>
      {children}
    </div>
  )
}

export function EngineRoomBadge() {
  const { t } = useTranslation()
  return (
    <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-white/15">
      {t('student.engineRoom')}
    </span>
  )
}

export function BackPill({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full bg-navy-800/90 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 hover:bg-navy-700"
    >
      {label}
    </Link>
  )
}

import { Link } from 'react-router-dom'
import { Battery, Headphones } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { useTranslation } from 'react-i18next'

export function VrStatusBar() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-navy-950/90 px-3 py-2.5 text-xs sm:px-5 sm:py-3 sm:text-sm">
      <div className="flex items-center gap-2 text-slate-300">
        <Headphones className="h-4 w-4 shrink-0" />
        <span className="truncate">
          {t('vr.headset')} <span className="font-semibold text-white">#A-04</span>
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSwitch variant="dark" />
        <div className="flex items-center gap-1.5 text-slate-300 sm:gap-2">
          <Battery className="h-4 w-4 shrink-0 text-green-400" />
          <span className="hidden min-[400px]:inline">{t('vr.handController')}</span>
          <span className="font-semibold text-white">68%</span>
        </div>
      </div>
    </div>
  )
}

export function VrHintBar({ hints }: { hints: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 border-t border-white/10 bg-navy-950/90 px-3 py-2.5 sm:px-4 sm:py-3">
      {hints.map((h) => (
        <span
          key={h}
          className="rounded-full bg-navy-700/80 px-3 py-1.5 text-[11px] font-semibold text-slate-200 ring-1 ring-white/10 sm:px-4 sm:text-xs"
        >
          {h}
        </span>
      ))}
    </div>
  )
}

export function VrShell({
  badge,
  children,
  hints,
  backTo,
  backLabel,
}: {
  badge: string
  children: React.ReactNode
  hints?: string[]
  backTo?: string
  backLabel?: string
}) {
  const { t } = useTranslation()
  return (
    <div className="grid-blueprint flex min-h-screen flex-col overflow-x-hidden text-white">
      <VrStatusBar />
      <header className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Logo compact />
          <span className="max-w-[120px] truncate rounded-full bg-navy-700 px-2.5 py-1 text-[11px] font-semibold sm:max-w-none sm:px-3 sm:text-xs">
            {badge}
          </span>
        </div>
        {backTo && (
          <Link
            to={backTo}
            className="shrink-0 text-[11px] font-semibold text-sky-300 hover:text-white sm:text-xs"
          >
            ← {backLabel ?? t('common.back')}
          </Link>
        )}
      </header>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      {hints && hints.length > 0 && <VrHintBar hints={hints} />}
    </div>
  )
}

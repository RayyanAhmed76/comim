import { cn } from '@/lib/cn'
import { useTranslation } from 'react-i18next'
import { Lightbulb, Minus, Plus } from 'lucide-react'

const parts = [
  {
    id: 'SEPARATOR TANK',
    h: 'h-52 sm:h-64 md:h-80',
    w: 'w-[4.5rem] sm:w-28 md:w-40',
    labelKey: 'machine.separatorTank',
  },
  {
    id: 'EVAPORATOR',
    h: 'h-44 sm:h-56 md:h-64',
    w: 'w-16 sm:w-24 md:w-36',
    labelKey: 'machine.evaporator',
  },
  {
    id: 'CONDENSER',
    h: 'h-44 sm:h-56 md:h-64',
    w: 'w-16 sm:w-24 md:w-36',
    labelKey: 'machine.condenser',
  },
  {
    id: 'EJECTOR',
    h: 'h-36 sm:h-44 md:h-52',
    w: 'w-16 sm:w-24 md:w-36',
    labelKey: 'machine.ejector',
  },
] as const

export type SchematicPartId = (typeof parts)[number]['id']

export function MachineSchematic({
  highlight = 'EVAPORATOR',
  callout,
  gauges,
  onShowHint,
  hintLabel = 'Show hint',
  footerLabel,
  className,
}: {
  highlight?: SchematicPartId | string
  callout?: { title: string; subtitle: string }
  gauges?: React.ReactNode
  onShowHint?: () => void
  hintLabel?: string
  /** Bottom bar text — updates when the active step changes */
  footerLabel?: string
  className?: string
}) {
  const { t } = useTranslation()
  const panelText = footerLabel ?? t('machine.controlPanel')

  return (
    <div
      className={cn(
        'relative flex h-full min-h-[360px] flex-col p-3 sm:min-h-[440px] sm:p-5 md:min-h-[520px]',
        className,
      )}
    >
      <svg
        className="pointer-events-none absolute inset-4 z-0 opacity-30 sm:inset-6 sm:opacity-40"
        viewBox="0 0 800 420"
        fill="none"
        aria-hidden
      >
        <path
          d="M40 40 V360 H120 M120 360 H680 M680 360 V80"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M200 200 H320 M420 200 H540" stroke="#38bdf8" strokeWidth="2" opacity="0.5" />
      </svg>

      <div className="relative z-10 flex flex-1 items-end justify-center gap-1.5 overflow-x-auto pt-12 pb-3 sm:gap-3 sm:pt-14 sm:pb-4 md:gap-4">
        {parts.map((p) => {
          const active = p.id === highlight || (highlight === 'EJECTOR' && p.id === 'EJECTOR')
          return (
            <div key={p.id} className="relative flex shrink-0 flex-col items-center">
              {active && callout && (
                <div className="absolute -top-12 left-1/2 z-20 w-36 -translate-x-1/2 rounded-xl bg-white px-2.5 py-1.5 text-ink shadow-xl sm:-top-14 sm:w-48 sm:px-3 sm:py-2">
                  <div className="text-[11px] font-bold sm:text-xs">{callout.title}</div>
                  <div className="text-[10px] text-muted sm:text-[11px]">{callout.subtitle}</div>
                  <div className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-white" />
                </div>
              )}
              <div
                className={cn(
                  'relative rounded-xl border px-1.5 pt-2 shadow-lg sm:rounded-2xl sm:px-3 sm:pt-3',
                  p.h,
                  p.w,
                  'bg-gradient-to-b from-[#1c3558] to-[#0f1f38]',
                  active
                    ? 'border-orange-400/70 ring-2 ring-orange-400/30'
                    : 'border-sky-400/25',
                )}
              >
                <span className="block text-left text-[8px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[10px]">
                  {t(p.labelKey)}
                </span>
                <span
                  className={cn(
                    'absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-3.5 sm:w-3.5',
                    active
                      ? 'bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.9)]'
                      : 'bg-sky-300 shadow-[0_0_12px_rgba(125,211,252,0.7)]',
                  )}
                />
              </div>
            </div>
          )
        })}
      </div>

      {gauges && (
        <div className="relative z-10 mb-3 flex flex-wrap justify-center gap-2 sm:gap-3">{gauges}</div>
      )}

      {/* Footer — stacks on very small screens */}
      <div className="relative z-10 mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex items-center gap-2 sm:contents">
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950/70 text-white ring-1 ring-white/15 backdrop-blur"
              aria-label="Zoom in"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950/70 text-white ring-1 ring-white/15 backdrop-blur"
              aria-label="Zoom out"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>

          {onShowHint ? (
            <button
              type="button"
              onClick={onShowHint}
              className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full border border-orange-400/80 bg-navy-950/80 px-3 py-2 text-xs font-semibold text-orange-400 backdrop-blur hover:bg-orange-500/10 sm:order-3 sm:ml-0 sm:px-4 sm:text-sm"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="hidden min-[360px]:inline">{hintLabel}</span>
            </button>
          ) : (
            <div className="hidden w-[72px] shrink-0 sm:order-3 sm:block" aria-hidden />
          )}
        </div>

        <div
          key={panelText}
          className="min-w-0 flex-1 rounded-2xl border border-sky-400/25 bg-gradient-to-b from-[#1c3558] to-[#0f1f38] px-3 py-2.5 text-center text-[10px] font-bold uppercase tracking-wide text-slate-200 transition-all sm:order-2 sm:py-3 sm:text-[11px]"
        >
          <span className="block truncate">{panelText}</span>
        </div>
      </div>
    </div>
  )
}

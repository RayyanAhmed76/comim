import { BookOpen, Check, Wrench } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useTranslation } from 'react-i18next'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'

export function ProcedureSidebar({
  title,
  currentStep,
  totalSteps,
  steps,
  tools,
  hint,
  hintVisible,
  onContinue,
  continueLabel,
}: {
  title: string
  currentStep: number
  totalSteps: number
  steps: string[]
  tools?: { label: string; icon?: 'wrench' | 'book' }[]
  hint?: string
  hintVisible?: boolean
  onContinue?: () => void
  continueLabel?: string
}) {
  const { t } = useTranslation()
  const toolkit = tools ?? [
    { label: t('student.maintenanceTool'), icon: 'wrench' as const },
    { label: t('student.referenceSheet'), icon: 'book' as const },
  ]
  const progress = (currentStep / totalSteps) * 100

  return (
    <aside className="flex w-full flex-col border-t border-white/10 bg-[#0c1a2e]/95 text-white lg:w-[360px] lg:border-t-0 lg:border-l">
      <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-300">
          {t('student.stepOf', { current: currentStep, total: totalSteps })} · {title}
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-xs text-slate-400">{Math.round(progress)}%</span>
        </div>
        <div className="mt-2">
          <ProgressBar
            value={progress}
            className="h-3 bg-white/15"
            fillClassName="bg-[#5BA3E8]"
          />
        </div>
      </div>

      <ol className="min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-4">
        {steps.map((step, i) => {
          const n = i + 1
          const done = n < currentStep
          const active = n === currentStep
          return (
            <li
              key={step}
              className={cn(
                'flex items-start gap-3 rounded-xl px-2 py-2.5 text-sm',
                active && 'bg-white/5',
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  done && 'bg-success-600 text-white',
                  active && 'bg-brand-600 text-white',
                  !done && !active && 'bg-white/10 text-slate-400',
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : n}
              </span>
              <span
                className={cn(
                  'leading-snug',
                  done && 'text-slate-400',
                  active && 'font-semibold text-white',
                  !done && !active && 'text-slate-400',
                )}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ol>

      {hintVisible && hint && (
        <div className="mx-4 mb-3 rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2.5 text-sm text-orange-200">
          <span className="font-semibold">{t('student.hintLabel')}</span> {hint}
        </div>
      )}

      <div className="border-t border-white/10 px-5 py-4">
        <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {t('student.toolkit')}
        </div>
        <div className="space-y-2">
          {toolkit.map((tool) => (
            <button
              key={tool.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-slate-100 hover:bg-white/10"
            >
              {tool.icon === 'book' ? (
                <BookOpen className="h-4 w-4 text-sky-300" />
              ) : (
                <Wrench className="h-4 w-4 text-sky-300" />
              )}
              {tool.label}
            </button>
          ))}
        </div>
        {onContinue && (
          <Button
            className="mt-4 w-full bg-[#5BA3E8] hover:bg-[#4a92d6]"
            onClick={onContinue}
          >
            {continueLabel ?? t('common.confirm')}
          </Button>
        )}
      </div>
    </aside>
  )
}

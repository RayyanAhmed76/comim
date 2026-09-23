import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Check, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EngineRoomBadge, TrainingShell } from '@/components/training/TrainingShell'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { finalQuizQuestions } from '@/data/mock'
import { cn } from '@/lib/cn'

const TOTAL_QUESTIONS = 20

export default function FinalQuiz() {
  const { t } = useTranslation()
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const { logout } = useAuth()
  const navigate = useNavigate()

  // Cycle through available question bank while showing 1–20 progress like the PDF
  const q = finalQuizQuestions[qIndex % finalQuizQuestions.length]
  const displayNumber = Math.min(qIndex + 1, TOTAL_QUESTIONS)
  const progressFilled = useMemo(() => displayNumber, [displayNumber])

  const toggle = (idx: number) => {
    if (q.multi) {
      setSelected((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]))
    } else {
      setSelected([idx])
    }
  }

  const continueQuiz = () => {
    if (displayNumber >= TOTAL_QUESTIONS) {
      navigate('/student/results/final-quiz')
      return
    }
    setQIndex((i) => i + 1)
    setSelected([])
  }

  const themeColor =
    q.theme === 'Safety' ? 'text-red-600' : q.theme === 'Procedure' ? 'text-brand-600' : 'text-sky-700'
  const themeDot =
    q.theme === 'Safety' ? 'bg-red-500' : q.theme === 'Procedure' ? 'bg-brand-600' : 'bg-sky-500'

  return (
    <TrainingShell
      badge={t('student.finalQuiz')}
      right={<EngineRoomBadge />}
      onLogout={() => {
        logout()
        navigate('/')
      }}
      dark={false}
    >
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-[#718096]">
              {t('student.questionProgress', { current: displayNumber, total: TOTAL_QUESTIONS })}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    'h-1.5 w-4 rounded-full sm:w-5',
                    i < progressFilled ? 'bg-[#0A1633]' : 'bg-slate-200',
                  )}
                />
              ))}
            </div>
          </div>
          <div className={cn('flex items-center gap-2 text-sm font-semibold', themeColor)}>
            <span className={cn('h-2 w-2 rounded-full', themeDot)} />
            {q.theme === 'Safety'
              ? t('student.safetyTheme')
              : q.theme === 'Procedure'
                ? t('student.procedureTheme')
                : t('student.componentsTheme')}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#0A1633]">{q.q}</h2>
            <p className="mt-1 text-sm text-[#718096]">
              {q.multi ? t('student.oneOrMore') : t('student.selectOne')}
            </p>

            <div className="mt-6 space-y-3">
              {q.options.map((opt, idx) => {
                const on = selected.includes(idx)
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle(idx)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition',
                      on
                        ? 'border-brand-600 bg-sky-50 text-[#0A1633]'
                        : 'border-slate-200 bg-white text-[#1A202C] hover:border-slate-300',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                        on ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300',
                      )}
                    >
                      {on && <Check className="h-3.5 w-3.5" />}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center text-[#718096]">
            <Box className="mb-3 h-10 w-10 text-slate-400" />
            <div className="text-sm font-semibold">{q.media ?? '3D — Combined ejector'}</div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            className="rounded-full px-6"
            disabled={selected.length === 0}
            onClick={continueQuiz}
          >
            {t('common.confirm')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </TrainingShell>
  )
}

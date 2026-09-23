import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EngineRoomBadge, TrainingShell } from '@/components/training/TrainingShell'
import { useAuth } from '@/context/AuthContext'
import { attempts } from '@/data/mock'
import { cn } from '@/lib/cn'

export default function AttemptDetail() {
  const { id } = useParams<{ id: string }>()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const attempt = attempts.find((a) => a.id === id) ?? attempts.find((a) => a.id === 'a3')!

  return (
    <TrainingShell
      badge={t('teacher.attemptDetail')}
      right={<EngineRoomBadge />}
      onLogout={() => {
        logout()
        navigate('/')
      }}
      dark={false}
    >
      <div className="mx-auto max-w-3xl px-6 py-8">
        <Link
          to="/student/results"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A90E2] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('student.backToMyResults')}
        </Link>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-[#0A1633]">
            {attempt.exercise} · {t('teacher.attempt')} {attempt.attempt}
          </h1>
          <p className="mt-1 text-sm text-[#718096]">
            <span className={cn('font-semibold', attempt.score >= 70 ? 'text-[#2E7D32]' : 'text-[#E65100]')}>
              {attempt.score}%
            </span>
            {' · '}
            {attempt.date.split(' · ')[0]}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {attempt.questions.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-muted">
              {t('teacher.noQuestionBreakdown')}
            </div>
          ) : (
            attempt.questions.map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-[#0A1633]">{item.q}</h3>
                  {item.correct ? (
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#2E7D32]">
                      <Check className="h-4 w-4" />
                      {t('common.correct')}
                    </span>
                  ) : (
                    <span className="shrink-0 text-sm font-semibold text-[#E65100]">
                      {t('common.incorrect')}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-[#718096]">
                  {t('teacher.answerGiven')}: {item.given}
                </p>
                {!item.correct && item.expected && (
                  <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-[#1A202C]">
                    {t('teacher.expectedAnswer')}: {item.expected}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </TrainingShell>
  )
}

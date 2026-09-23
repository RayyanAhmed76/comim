import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EngineRoomBadge, TrainingShell } from '@/components/training/TrainingShell'
import { useAuth } from '@/context/AuthContext'
import { finalQuizReview } from '@/data/mock'

export default function FinalQuizDetail() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <TrainingShell
      badge={t('student.finalQuizDetail')}
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

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-[#0A1633]">{t('student.attemptHistory')}</h2>
          <p className="mt-1 text-sm text-[#718096]">{t('student.finalQuizAttemptsHint')}</p>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <span className="text-sm font-medium text-[#1A202C]">
              {t('teacher.attempt')} 1 · Sep 15, 2026
            </span>
            <span className="text-sm font-bold text-[#2E7D32]">82%</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-[#0A1633]">
            {t('student.finalQuiz')} · {t('teacher.attempt')} 1
          </h1>
          <p className="mt-1 text-sm text-[#718096]">
            <span className="font-semibold text-[#2E7D32]">82%</span>
            {' · '}
            {t('common.passed')} ({t('student.passingThreshold').toLowerCase()} 70%)
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {finalQuizReview.map((item, i) => (
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
          ))}
        </div>
      </div>
    </TrainingShell>
  )
}

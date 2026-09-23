import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EngineRoomBadge, TrainingShell } from '@/components/training/TrainingShell'
import { useAuth } from '@/context/AuthContext'
import { attempts } from '@/data/mock'
import { cn } from '@/lib/cn'

function scoreClass(score: number) {
  return score >= 70 ? 'text-[#2E7D32]' : 'text-[#E65100]'
}

const byExercise: { key: string; label: string; items: { attempt: number; score: number; id?: string }[] }[] = [
  {
    key: 'identification',
    label: 'IDENTIFICATION',
    items: [
      { attempt: 1, score: 58 },
      { attempt: 2, score: 74, id: 'a5' },
    ],
  },
  {
    key: 'startup',
    label: 'STARTUP PROCEDURE',
    items: [
      { attempt: 1, score: 62 },
      { attempt: 2, score: 78, id: 'a3' },
      { attempt: 3, score: 91, id: 'a1' },
    ],
  },
  {
    key: 'repair',
    label: 'REPAIR',
    items: [{ attempt: 1, score: 69, id: 'a2' }],
  },
]

export default function MyResults() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <TrainingShell
      badge={t('student.myResults')}
      right={<EngineRoomBadge />}
      onLogout={() => {
        logout()
        navigate('/')
      }}
      dark={false}
    >
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0A1633]">{t('student.myResultsTitle')}</h1>
          <p className="mt-2 text-sm text-[#718096]">
            {user?.name ?? 'Yassine Bakkali'} · 2A Marine Mechanics
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0A1633]">{t('student.resultsByExercise')}</h2>

          <div className="mt-5 space-y-6">
            {byExercise.map((group) => (
              <div key={group.key}>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#A0AEC0]">
                  {group.label}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const row = (
                      <div className="flex items-center justify-between rounded-xl px-2 py-3 transition hover:bg-slate-50">
                        <span className="text-sm font-medium text-[#1A202C]">
                          {t('teacher.attempt')} {item.attempt}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className={cn('text-sm font-bold', scoreClass(item.score))}>
                            {item.score}%
                          </span>
                          <ChevronRight className="h-4 w-4 text-[#A0AEC0]" />
                        </div>
                      </div>
                    )
                    const detailId =
                      item.id && attempts.find((a) => a.id === item.id && a.questions.length > 0)?.id
                    if (detailId) {
                      return (
                        <Link key={`${group.key}-${item.attempt}`} to={`/student/attempt/${detailId}`}>
                          {row}
                        </Link>
                      )
                    }
                    return <div key={`${group.key}-${item.attempt}`}>{row}</div>
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#0A1633]">{t('student.gradedExam')}</h2>
              <p className="mt-0.5 text-sm text-[#718096]">{t('student.finalQuizLabelShort')}</p>
            </div>
            <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-bold text-[#2E7D32]">
              {t('common.passed')}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 px-4 py-4">
              <div className="text-xs font-medium uppercase tracking-wide text-[#718096]">
                {t('teacher.score')}
              </div>
              <div className="mt-1 text-3xl font-bold text-[#0A1633]">82%</div>
            </div>
            <div className="rounded-xl border border-slate-200 px-4 py-4">
              <div className="text-xs font-medium uppercase tracking-wide text-[#718096]">
                {t('student.passingThreshold')}
              </div>
              <div className="mt-1 text-3xl font-bold text-[#0A1633]">70%</div>
            </div>
          </div>

          <Link
            to="/student/results/final-quiz"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#0A1633] hover:bg-slate-50"
          >
            <Eye className="h-4 w-4" />
            {t('student.viewDetail')}
          </Link>
        </div>
      </div>
    </TrainingShell>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  Lock,
  Map,
  Search,
  Wrench,
  Boxes,
  PlayCircle,
} from 'lucide-react'
import { EngineRoomBadge, TrainingShell } from '@/components/training/TrainingShell'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/cn'
import { useTranslation } from 'react-i18next'

function statusClass(status: string | null) {
  if (status === 'Completed') return 'bg-[#E8F5E9] text-[#2E7D32]'
  if (status === 'Locked') return 'bg-[#EEEEEE] text-[#757575]'
  if (status === '91%') return 'bg-[#E8F5E9] text-[#2E7D32]'
  if (status === '74%') return 'bg-[#E3F2FD] text-[#1565C0]'
  if (status === '69%') return 'bg-[#FFF3E0] text-[#E65100]'
  return ''
}

export default function CourseMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const firstName = user?.name.split(' ')[0] ?? 'Yassine'

  const modules = [
    {
      label: t('student.guidedTour'),
      desc: t('student.guidedTourDesc'),
      to: '/student/guided-tour',
      status: 'Completed' as const,
      icon: Map,
    },
    {
      label: t('student.identification'),
      desc: t('student.identificationDesc'),
      to: '/student/identification',
      status: '74%' as const,
      icon: Search,
    },
    {
      label: t('student.startup'),
      desc: t('student.startupDesc'),
      to: '/student/startup',
      status: '91%' as const,
      icon: PlayCircle,
    },
    {
      label: t('student.repair'),
      desc: t('student.repairDesc'),
      to: '/student/repair',
      status: '69%' as const,
      icon: Wrench,
    },
    {
      label: t('student.finalQuiz'),
      desc: t('student.finalQuizDesc'),
      to: '/student/final-quiz',
      status: 'Locked' as const,
      icon: ClipboardList,
      // Still navigable for demo — badge shows Locked but tap opens the quiz
    },
    {
      label: t('student.myResults'),
      desc: t('student.myResultsDesc'),
      to: '/student/results',
      status: null,
      icon: BookOpen,
    },
    {
      label: t('student.catalog'),
      desc: t('student.catalogDesc'),
      to: '/student/catalog',
      status: null,
      icon: Boxes,
    },
  ]

  return (
    <TrainingShell
      badge={t('student.courseMenu')}
      right={<EngineRoomBadge />}
      onLogout={() => {
        logout()
        navigate('/')
      }}
      dark={false}
    >
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A1633]">
            {t('student.hello', { name: firstName })}
          </h1>
          <p className="mt-2 text-sm text-[#718096]">{t('student.classLine')}</p>
        </div>

        <div className="space-y-3">
          {modules.map((m) => {
            const Icon = m.icon
            const inner = (
              <div
                className={cn(
                  'flex items-center gap-4 rounded-2xl border border-[#E0E4E8] bg-white px-5 py-4 shadow-sm transition',
                  'flex items-center gap-4 rounded-2xl border border-[#E0E4E8] bg-white px-5 py-4 shadow-sm transition hover:border-sky-300 hover:shadow-md',
                )}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EBF2FF]">
                  <Icon className="h-5 w-5 text-[#4A90E2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-semibold text-[#1A202C]">{m.label}</div>
                  <div className="text-sm text-[#718096]">{m.desc}</div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {m.status === 'Completed' && (
                    <span className={cn('rounded-full px-3 py-1 text-xs font-bold', statusClass(m.status))}>
                      {t('common.completed')}
                    </span>
                  )}
                  {m.status === 'Locked' && (
                    <span className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold', statusClass(m.status))}>
                      <Lock className="h-3 w-3" />
                      {t('common.locked')}
                    </span>
                  )}
                  {m.status && m.status !== 'Completed' && m.status !== 'Locked' && (
                    <span className={cn('rounded-full px-3 py-1 text-xs font-bold', statusClass(m.status))}>
                      {m.status}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-[#A0AEC0]" />
                </div>
              </div>
            )

            return (
              <Link key={m.label} to={m.to}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </TrainingShell>
  )
}

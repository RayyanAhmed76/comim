import { Link } from 'react-router-dom'
import { ChevronRight, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { VrShell } from '@/pages/vr/VrChrome'
import { cn } from '@/lib/cn'

type ModuleStatus = 'Completed' | 'In Progress' | 'Locked' | 'Open'

function moduleStatusLabel(status: ModuleStatus, t: (k: string) => string) {
  if (status === 'Completed') return t('common.completed')
  if (status === 'Locked') return t('common.locked')
  if (status === 'Open') return t('common.open')
  if (status === 'In Progress') return t('common.inProgress')
  return status
}

export default function VrMenu() {
  const { t } = useTranslation()

  const modules: {
    label: string
    to: string
    status: ModuleStatus
    progress: number | null
    locked?: boolean
  }[] = [
    { label: t('student.guidedTour'), to: '/vr/guided-tour', status: 'Completed', progress: 100 },
    { label: t('student.identification'), to: '/vr/identification', status: 'In Progress', progress: 74 },
    { label: t('student.startup'), to: '/vr/startup', status: 'In Progress', progress: 91 },
    { label: t('student.repair'), to: '/vr/repair', status: 'In Progress', progress: 69 },
    { label: t('student.finalQuiz'), to: '/vr/final-quiz', status: 'Locked', progress: 0, locked: true },
    { label: t('student.explodedView'), to: '/vr/exploded', status: 'Open', progress: null },
  ]

  return (
    <VrShell
      badge={t('vr.vrCourseMenu')}
      backTo="/vr"
      backLabel={t('vr.onboarding')}
      hints={[t('vr.pinchSelect'), t('vr.gripToGrab')]}
    >
      <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
        <h1 className="text-3xl font-bold">{t('student.hello', { name: 'Yassine' })}</h1>
        <p className="mt-1 text-slate-300">{t('vr.vrModulesSubtitle')}</p>

        <div className="mt-8 space-y-3">
          {modules.map((mod) => (
            <Link
              key={mod.label}
              to={mod.locked ? '#' : mod.to}
              onClick={(e) => mod.locked && e.preventDefault()}
              className={cn(
                'flex items-center justify-between rounded-2xl border px-5 py-4 transition',
                mod.locked
                  ? 'cursor-not-allowed border-white/5 bg-navy-900/40 opacity-60'
                  : 'border-white/10 bg-navy-900/60 hover:border-sky-400/30',
              )}
            >
              <div className="flex items-center gap-3">
                {mod.locked && <Lock className="h-4 w-4 text-slate-400" />}
                <span className="font-semibold">{mod.label}</span>
              </div>
              <div className="flex items-center gap-4">
                {mod.progress !== null && mod.progress > 0 && (
                  <div className="hidden w-28 sm:block">
                    <ProgressBar
                      value={mod.progress}
                      className="bg-white/20"
                      fillClassName="bg-sky-400"
                    />
                  </div>
                )}
                {(mod.status === 'Completed' || mod.status === 'Locked') && (
                  <Badge tone={mod.status === 'Completed' ? 'green' : 'gray'}>
                    {moduleStatusLabel(mod.status, t)}
                  </Badge>
                )}
                {!mod.locked && <ChevronRight className="h-5 w-5 text-slate-400" />}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </VrShell>
  )
}

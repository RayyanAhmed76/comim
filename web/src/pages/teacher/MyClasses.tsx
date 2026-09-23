import { useNavigate } from 'react-router-dom'
import { CalendarDays, ChevronRight, LayoutGrid } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Card, StatCard } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { classes, CURRENT_YEAR } from '@/data/mock'
import { useTranslation } from 'react-i18next'

function statusTone(status: string): 'blue' | 'green' | 'gray' {
  if (status === 'Advanced') return 'green'
  if (status === 'Starting') return 'gray'
  return 'blue'
}

function statusLabel(status: string, t: (k: string) => string) {
  if (status === 'Advanced') return t('common.advanced')
  if (status === 'Starting') return t('common.starting')
  return t('common.inProgress')
}

export function MyClasses() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <AppShell breadcrumb={t('teacher.myClasses')}>
      <div className="space-y-6">
        <div className="flex items-center gap-2 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          {t('teacher.schoolYear', { year: CURRENT_YEAR })}
        </div>

        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink">{t('teacher.myClasses')}</h1>
              <p className="mt-1 text-sm text-muted">{t('teacher.myClassesSubtitle')}</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink"
            >
              <CalendarDays className="h-4 w-4" />
              {t('teacher.year', { year: CURRENT_YEAR })}
            </button>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label={t('teacher.activeClasses')} value={4} />
          <StatCard label={t('teacher.studentsTracked')} value={82} />
          <StatCard label={t('teacher.averageProgress')} value="51%" />
          <StatCard label={t('teacher.quizzesToOpen')} value={6} />
        </div>

        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-bold text-ink">{t('teacher.classes')}</h2>
            <div className="flex gap-2">
              <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                <option>{t('teacher.track')}</option>
                <option>Mechanics</option>
                <option>Deck Officer</option>
                <option>Electrotechnics</option>
              </select>
              <input
                type="search"
                placeholder={t('common.search')}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-6 py-3">{t('teacher.className')}</th>
                  <th className="px-4 py-3">{t('teacher.track')}</th>
                  <th className="px-4 py-3">{t('teacher.headcount')}</th>
                  <th className="px-4 py-3">{t('teacher.assignedContent')}</th>
                  <th className="px-4 py-3">{t('common.progress')}</th>
                  <th className="px-4 py-3">{t('common.status')}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr
                    key={cls.id}
                    onClick={() => navigate(`/teacher/classes/${cls.id}`)}
                    className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-navy-800">
                          <LayoutGrid className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-ink">{cls.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted">{cls.track}</td>
                    <td className="px-4 py-4 text-muted">
                      {cls.headcount} {t('common.students').toLowerCase()}
                    </td>
                    <td className="px-4 py-4 text-muted">{cls.assignedContent}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <ProgressBar value={cls.progress} className="max-w-[120px]" />
                        <span className="text-xs font-semibold text-muted">{cls.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge tone={statusTone(cls.status)} dot>
                        {statusLabel(cls.status, t)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 text-sm text-muted">
            <span>
              {t('teacher.showingClasses', { from: 1, to: classes.length, total: classes.length })}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-lg border border-slate-200 px-2 py-1">
                ‹
              </button>
              <button type="button" className="rounded-lg border border-slate-200 bg-navy-900 px-3 py-1 text-white">
                1
              </button>
              <button type="button" className="rounded-lg border border-slate-200 px-2 py-1">
                ›
              </button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

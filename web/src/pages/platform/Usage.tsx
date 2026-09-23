import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, ChevronDown, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Card, StatCard } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

type Period = 'thisMonth' | 'lastMonth' | 'last90' | 'thisYear'

const periodStats: Record<
  Period,
  { users: number; sessions: number; exercises: number; passRate: string }
> = {
  thisMonth: { users: 336, sessions: 1172, exercises: 3547, passRate: '76%' },
  lastMonth: { users: 298, sessions: 980, exercises: 2890, passRate: '74%' },
  last90: { users: 412, sessions: 3420, exercises: 9810, passRate: '75%' },
  thisYear: { users: 1284, sessions: 6940, exercises: 21450, passRate: '77%' },
}

const detailByPeriod: Record<
  Period,
  { id: string; name: string; users: number; sessions: number; exercises: number }[]
> = {
  thisMonth: [
    { id: 'imc', name: 'Institut Maritime de Casablanca', users: 148, sessions: 612, exercises: 1940 },
    { id: 'lma', name: "Lycée Maritime d'Agadir", users: 96, sessions: 410, exercises: 1205 },
    { id: 'imt', name: 'Institut Maritime de Tanger', users: 34, sessions: 150, exercises: 402 },
    { id: 'cfa', name: 'CFA Maritime de Safi', users: 58, sessions: 0, exercises: 0 },
  ],
  lastMonth: [
    { id: 'imc', name: 'Institut Maritime de Casablanca', users: 140, sessions: 540, exercises: 1680 },
    { id: 'lma', name: "Lycée Maritime d'Agadir", users: 88, sessions: 320, exercises: 980 },
    { id: 'imt', name: 'Institut Maritime de Tanger', users: 30, sessions: 120, exercises: 230 },
    { id: 'cfa', name: 'CFA Maritime de Safi', users: 40, sessions: 0, exercises: 0 },
  ],
  last90: [
    { id: 'imc', name: 'Institut Maritime de Casablanca', users: 162, sessions: 1680, exercises: 5200 },
    { id: 'lma', name: "Lycée Maritime d'Agadir", users: 110, sessions: 1120, exercises: 3100 },
    { id: 'imt', name: 'Institut Maritime de Tanger', users: 48, sessions: 420, exercises: 990 },
    { id: 'cfa', name: 'CFA Maritime de Safi', users: 92, sessions: 200, exercises: 520 },
  ],
  thisYear: [
    { id: 'imc', name: 'Institut Maritime de Casablanca', users: 180, sessions: 3200, exercises: 9800 },
    { id: 'lma', name: "Lycée Maritime d'Agadir", users: 120, sessions: 2100, exercises: 6400 },
    { id: 'imt', name: 'Institut Maritime de Tanger', users: 55, sessions: 980, exercises: 2900 },
    { id: 'cfa', name: 'CFA Maritime de Safi', users: 90, sessions: 660, exercises: 2350 },
  ],
}

type SortKey = 'name' | 'users' | 'sessions' | 'exercises'

export default function Usage() {
  const { t } = useTranslation()
  const [period, setPeriod] = useState<Period>('thisMonth')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortAsc, setSortAsc] = useState(true)

  const stats = periodStats[period]

  const rows = useMemo(() => {
    const list = [...detailByPeriod[period]]
    list.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av)
      }
      return sortAsc ? Number(av) - Number(bv) : Number(bv) - Number(av)
    })
    return list
  }, [period, sortKey, sortAsc])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v)
    else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const periodLabel =
    period === 'thisMonth'
      ? t('platform.thisMonth')
      : period === 'lastMonth'
        ? t('platform.lastMonth')
        : period === 'last90'
          ? t('platform.last90Days')
          : t('platform.thisYear')

  return (
    <AppShell breadcrumb={t('platform.usageTitle')}>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink">{t('platform.usageTitle')}</h1>
              <p className="mt-1 text-sm text-muted">{t('platform.usageSubtitle')}</p>
            </div>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as Period)}
                className="h-10 appearance-none rounded-xl border border-slate-200 bg-white py-2 pr-9 pl-9 text-sm font-semibold text-ink shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                aria-label={periodLabel}
              >
                <option value="thisMonth">{t('platform.thisMonth')}</option>
                <option value="lastMonth">{t('platform.lastMonth')}</option>
                <option value="last90">{t('platform.last90Days')}</option>
                <option value="thisYear">{t('platform.thisYear')}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label={t('platform.activeUsers')} value={stats.users.toLocaleString()} />
          <StatCard
            label={t('platform.sessions')}
            value={stats.sessions.toLocaleString()}
            valueClassName="text-brand-600"
          />
          <StatCard
            label={t('platform.exercisesCompleted')}
            value={stats.exercises.toLocaleString()}
          />
          <StatCard label={t('platform.quizPassRate')} value={stats.passRate} />
        </div>

        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-bold text-ink">{t('platform.detailByEstablishment')}</h2>
            <p className="mt-1 text-sm text-muted">{t('platform.detailByEstablishmentHint')}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-muted">
                  {(
                    [
                      ['name', t('platform.establishmentCol')],
                      ['users', t('platform.usersCol')],
                      ['sessions', t('platform.sessions')],
                      ['exercises', t('platform.exercisesCol')],
                    ] as [SortKey, string][]
                  ).map(([key, label]) => (
                    <th key={key} className="px-6 py-3">
                      <button
                        type="button"
                        onClick={() => toggleSort(key)}
                        className="inline-flex items-center gap-1 hover:text-ink"
                      >
                        {label}
                        <ChevronsUpDown
                          className={cn(
                            'h-3.5 w-3.5',
                            sortKey === key ? 'text-brand-600' : 'text-slate-300',
                          )}
                        />
                      </button>
                    </th>
                  ))}
                  <th className="w-10 px-4 py-3" aria-hidden />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80">
                    <td className="px-6 py-4">
                      <Link
                        to={`/platform/establishments/${row.id}`}
                        className="font-semibold text-ink hover:text-brand-600"
                      >
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      <span className="font-medium text-ink">{row.users}</span>{' '}
                      {t('platform.activeSuffix')}
                    </td>
                    <td className="px-6 py-4 text-muted">
                      <span className="font-medium text-ink">{row.sessions.toLocaleString()}</span>{' '}
                      {t('platform.sessionsSuffix')}
                    </td>
                    <td className="px-6 py-4 text-muted">
                      <span className="font-medium text-ink">{row.exercises.toLocaleString()}</span>{' '}
                      {t('platform.exercisesSuffix')}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        to={`/platform/establishments/${row.id}`}
                        className="inline-flex text-slate-300 hover:text-brand-600"
                        aria-label={t('platform.detail')}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

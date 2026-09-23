import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Archive,
  CalendarDays,
  Pencil,
  PauseCircle,
  Play,
  Plus,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { Card, StatCard } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  CustomKpiChart,
  DailyExercisesChart,
  ThresholdBarChart,
} from '@/components/charts/KpiCharts'
import { establishments } from '@/data/mock'
import { cn } from '@/lib/cn'

const fieldClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20'

const defaultFeatures = [
  { id: 'vr', labelKey: 'platform.featVrModule', enabled: true },
  { id: 'web', labelKey: 'platform.featWebModule', enabled: true },
  { id: 'exploded', labelKey: 'platform.featExplodedView', enabled: true },
  { id: 'quiz', labelKey: 'platform.featConfigurableQuiz', enabled: true },
  { id: 'csv', labelKey: 'platform.featCsvExport', enabled: false },
]

const dailyExercises = [
  { day: 'Mon', value: 112 },
  { day: 'Tue', value: 145 },
  { day: 'Wed', value: 98 },
  { day: 'Thu', value: 167 },
  { day: 'Fri', value: 203 },
  { day: 'Sat', value: 54 },
  { day: 'Sun', value: 21 },
]

const byClass = [
  { label: '2A — Marine Mech.', value: 48 },
  { label: '2B — Deck Off.', value: 55 },
  { label: '3A — Electrotech.', value: 82 },
  { label: '3B — Boilermaking', value: 28 },
]

const byTeacher = [
  { label: 'Mounia Ferhat', value: 58 },
  { label: 'Karim Alaoui', value: 52 },
]

const byYear = [
  { label: '2026–2027', value: 61 },
  { label: '2025–2026', value: 74 },
]

const usageById: Record<string, { users: number; sessions: number; exercises: number; passRate: string }> = {
  imc: { users: 148, sessions: 612, exercises: 1940, passRate: '79%' },
  lma: { users: 96, sessions: 410, exercises: 1205, passRate: '74%' },
  imt: { users: 34, sessions: 150, exercises: 402, passRate: '71%' },
  cfa: { users: 58, sessions: 0, exercises: 0, passRate: '—' },
}

const DEFAULT_SQL = `SELECT date_trunc('week', completed_at) AS week, count(*) AS attempts
FROM exercise_attempts WHERE establishment_id = :id
GROUP BY 1 ORDER BY 1;`

export default function EstablishmentDetail() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const est = establishments.find((e) => e.id === id) ?? establishments[0]
  const usage = usageById[est.id] ?? usageById.imc

  const [plan, setPlan] = useState(est.plan)
  const [seats, setSeats] = useState(String(est.seats))
  const [expiry, setExpiry] = useState(est.expiry)
  const [admin, setAdmin] = useState(est.admin)
  const [features, setFeatures] = useState(defaultFeatures)
  const [showSql, setShowSql] = useState(true)
  const [sql, setSql] = useState(DEFAULT_SQL)
  const [saved, setSaved] = useState(false)
  const [customChart, setCustomChart] = useState<number[] | null>(null)
  const [status, setStatus] = useState(est.status)

  const toggleFeature = (fid: string) => {
    setFeatures((prev) => prev.map((f) => (f.id === fid ? { ...f, enabled: !f.enabled } : f)))
  }

  return (
    <AppShell breadcrumb={`${t('platform.establishments')} / ${est.name}`}>
      <div className="space-y-6">
        <Link
          to="/platform/establishments"
          className="inline-flex text-sm font-semibold text-brand-600 hover:underline"
        >
          ← {t('platform.backToEstablishments')}
        </Link>

        {/* Header */}
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink">{est.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span>{est.plan}</span>
                <span>—</span>
                <Badge tone={status === 'Active' ? 'green' : 'orange'} dot>
                  {status === 'Active' ? t('common.active') : t('common.suspended')}
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" className="rounded-full">
                <Pencil className="h-4 w-4" />
                {t('platform.edit')}
              </Button>
              <Button
                variant="orange"
                className="rounded-full"
                onClick={() => setStatus((s) => (s === 'Active' ? 'Suspended' : 'Active'))}
              >
                <PauseCircle className="h-4 w-4" />
                {status === 'Active' ? t('platform.suspend') : t('platform.reactivate')}
              </Button>
              <Button
                variant="danger"
                className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <Archive className="h-4 w-4" />
                {t('platform.archive')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label={t('platform.activeUsers')} value={usage.users} />
          <StatCard
            label={t('platform.sessions')}
            value={usage.sessions.toLocaleString()}
            valueClassName="text-brand-600"
          />
          <StatCard
            label={t('platform.exercisesCompleted')}
            value={usage.exercises.toLocaleString()}
          />
          <StatCard label={t('platform.quizPassRate')} value={usage.passRate} />
        </div>

        {/* Plan + Features */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink">{t('platform.planLicense')}</h2>
            <p className="mt-1 text-sm text-muted">{t('platform.planLicenseHint')}</p>

            <div className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-ink">
                {t('platform.plan')}
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className={fieldClass}
                >
                  <option value="Discovery">{t('platform.discovery')}</option>
                  <option value="Establishment">{t('platform.establishmentPlan')}</option>
                  <option value="Custom">{t('platform.custom')}</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-ink">
                {t('platform.numberOfSeats')}
                <input
                  type="number"
                  min={1}
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                {t('platform.licenseExpiry')}
                <div className="relative">
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className={cn(fieldClass, 'pr-10')}
                  />
                  <CalendarDays className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </label>
              <label className="block text-sm font-medium text-ink">
                {t('platform.firstClientAdminLabel')}
                <input
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                  className={fieldClass}
                />
              </label>
            </div>

            <Button
              className="mt-6"
              onClick={() => {
                setSaved(true)
                window.setTimeout(() => setSaved(false), 2500)
              }}
            >
              {t('common.save')}
            </Button>
            {saved && (
              <span className="ml-3 text-sm font-medium text-success-600">{t('platform.saved')}</span>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink">{t('platform.enabledFeatures')}</h2>
            <p className="mt-1 text-sm text-muted">{t('platform.enabledFeaturesHint')}</p>
            <ul className="mt-5 space-y-4">
              {features.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-4 text-sm">
                  <span className="font-medium text-ink">{t(f.labelKey)}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={f.enabled}
                    onClick={() => toggleFeature(f.id)}
                    className={cn(
                      'relative h-7 w-12 shrink-0 rounded-full transition',
                      f.enabled ? 'bg-brand-600' : 'bg-slate-300',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition',
                        f.enabled ? 'left-[22px]' : 'left-0.5',
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* KPIs */}
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-ink">{t('platform.establishmentKpis')}</h2>
              <p className="mt-1 text-sm text-muted">{t('platform.establishmentKpisHint')}</p>
            </div>
            <Button variant="secondary" onClick={() => setShowSql((v) => !v)}>
              <Plus className="h-4 w-4" />
              {t('platform.customKpi')}
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              {t('platform.exercisesPerDay')}
            </h3>
            <div className="mt-4">
              <DailyExercisesChart
                labels={dailyExercises.map((d) => d.day)}
                values={dailyExercises.map((d) => d.value)}
                highlightIndex={4}
              />
            </div>
          </div>

          {customChart && (
            <div className="mt-8">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                {t('platform.customKpiResult')}
              </h3>
              <div className="mt-4">
                <CustomKpiChart values={customChart} />
              </div>
            </div>
          )}

          <div className="mt-10 grid gap-8 sm:gap-6 lg:grid-cols-3">
            <ThresholdBarChart
              title={t('platform.byClass')}
              labels={byClass.map((i) => i.label)}
              values={byClass.map((i) => i.value)}
            />
            <ThresholdBarChart
              title={t('platform.byTeacher')}
              labels={byTeacher.map((i) => i.label)}
              values={byTeacher.map((i) => i.value)}
            />
            <ThresholdBarChart
              title={t('platform.bySchoolYear')}
              labels={byYear.map((i) => i.label)}
              values={byYear.map((i) => i.value)}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              ≥ 70%
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
              40–69%
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              &lt; 40%
            </span>
          </div>

          {showSql && (
            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
                  {t('platform.newCustomKpi')}
                </h3>
                <Button
                  onClick={() => setCustomChart([42, 58, 61, 73, 69, 80, 77])}
                >
                  <Play className="h-3.5 w-3.5" />
                  {t('platform.run')}
                </Button>
              </div>
              <textarea
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                rows={4}
                spellCheck={false}
                className="w-full rounded-xl border border-slate-700 bg-[#0A1633] px-4 py-3 font-mono text-sm leading-relaxed text-sky-100 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
              <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-muted">
                {t('platform.customKpiNote')}
              </p>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  )
}

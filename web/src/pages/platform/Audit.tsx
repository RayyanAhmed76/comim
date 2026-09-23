import { useMemo, useState } from 'react'
import {
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronsUpDown,
  Monitor,
  Search,
  Settings2,
  Shield,
  UserRound,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { establishments } from '@/data/mock'
import { cn } from '@/lib/cn'

type Origin = 'COMIM' | 'School'

type AuditRow = {
  id: string
  author: string
  origin: Origin
  action: string
  detail: string
  timestamp: string
  establishmentId: string
  profile: string
  screen: string
  date: string // ISO-ish for filtering
}

const auditLog: AuditRow[] = [
  {
    id: '1',
    author: 'Rania Amrani',
    origin: 'COMIM',
    action: 'Establishment suspension',
    detail: 'CFA Maritime de Safi',
    timestamp: 'Sep 17, 2026 · 08:30',
    establishmentId: 'cfa',
    profile: 'Platform Admin',
    screen: 'Establishments',
    date: '2026-09-17',
  },
  {
    id: '2',
    author: 'Rania Amrani',
    origin: 'COMIM',
    action: 'License change',
    detail: 'Institut Maritime de Casablanca — Discovery → Establishment',
    timestamp: 'Sep 10, 2026 · 15:02',
    establishmentId: 'imc',
    profile: 'Platform Admin',
    screen: 'Licenses',
    date: '2026-09-10',
  },
  {
    id: '3',
    author: 'Souhail Ouabi',
    origin: 'School',
    action: 'User creation',
    detail: 'Institut Maritime de Casablanca — Yassine Bakkali (student)',
    timestamp: 'Sep 05, 2026 · 10:12',
    establishmentId: 'imc',
    profile: 'Client Admin',
    screen: 'Users',
    date: '2026-09-05',
  },
  {
    id: '4',
    author: 'Mounia Ferhat',
    origin: 'School',
    action: 'Score adjustment',
    detail: 'Institut Maritime de Casablanca — Final Quiz — Nada Amrani',
    timestamp: 'Sep 03, 2026 · 16:40',
    establishmentId: 'imc',
    profile: 'Teacher',
    screen: 'Student profile',
    date: '2026-09-03',
  },
  {
    id: '5',
    author: 'Youssef Kabbaj',
    origin: 'COMIM',
    action: 'Establishment creation',
    detail: 'Institut Maritime de Casablanca',
    timestamp: 'Sep 02, 2026 · 09:44',
    establishmentId: 'imc',
    profile: 'Platform Admin',
    screen: 'Establishments',
    date: '2026-09-02',
  },
  {
    id: '6',
    author: 'Rania Amrani',
    origin: 'COMIM',
    action: 'Feature activation',
    detail: 'Institut Maritime de Casablanca — Exploded View',
    timestamp: 'Aug 28, 2026 · 11:10',
    establishmentId: 'imc',
    profile: 'Platform Admin',
    screen: 'Licenses',
    date: '2026-08-28',
  },
  {
    id: '7',
    author: 'Fatima Zahra Idrissi',
    origin: 'School',
    action: 'User creation',
    detail: "Lycée Maritime d'Agadir — Karim Tazi (teacher)",
    timestamp: 'Sep 12, 2026 · 11:20',
    establishmentId: 'lma',
    profile: 'Client Admin',
    screen: 'Users',
    date: '2026-09-12',
  },
  {
    id: '8',
    author: 'Rania Amrani',
    origin: 'COMIM',
    action: 'Plan upgrade',
    detail: "Lycée Maritime d'Agadir — Discovery → Establishment",
    timestamp: 'Sep 12, 2026 · 16:45',
    establishmentId: 'lma',
    profile: 'Platform Admin',
    screen: 'Licenses',
    date: '2026-09-12',
  },
]

const pillClass =
  'inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 text-sm font-medium text-ink shadow-sm hover:bg-slate-50'

type SortKey = 'author' | 'origin' | 'action' | 'detail' | 'timestamp'

export default function PlatformAudit() {
  const { t } = useTranslation()
  const [establishmentId, setEstablishmentId] = useState('imc')
  const [query, setQuery] = useState('')
  const [user, setUser] = useState('all')
  const [profile, setProfile] = useState('all')
  const [origin, setOrigin] = useState('all')
  const [screen, setScreen] = useState('all')
  const [range, setRange] = useState('7d')
  const [sortKey, setSortKey] = useState<SortKey>('timestamp')
  const [sortAsc, setSortAsc] = useState(false)

  const authors = useMemo(
    () => Array.from(new Set(auditLog.map((r) => r.author))).sort(),
    [],
  )
  const profiles = useMemo(
    () => Array.from(new Set(auditLog.map((r) => r.profile))).sort(),
    [],
  )
  const screens = useMemo(
    () => Array.from(new Set(auditLog.map((r) => r.screen))).sort(),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const cutoff = (() => {
      if (range === '30d') return '2026-08-18'
      if (range === '90d') return '2026-06-20'
      if (range === 'all') return '2000-01-01'
      return '2026-09-10' // last 7 days relative to Sep 17 demo
    })()

    let rows = auditLog.filter((r) => {
      // PDF: school selector keeps COMIM platform actions visible alongside that school's events
      if (establishmentId !== 'all' && r.establishmentId !== establishmentId && r.origin !== 'COMIM') {
        return false
      }
      if (user !== 'all' && r.author !== user) return false
      if (profile !== 'all' && r.profile !== profile) return false
      if (origin !== 'all' && r.origin !== origin) return false
      if (screen !== 'all' && r.screen !== screen) return false
      if (r.date < cutoff) return false
      if (!q) return true
      return (
        r.author.toLowerCase().includes(q) ||
        r.action.toLowerCase().includes(q) ||
        r.detail.toLowerCase().includes(q)
      )
    })

    rows = [...rows].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = String(av).localeCompare(String(bv))
      return sortAsc ? cmp : -cmp
    })
    return rows
  }, [establishmentId, query, user, profile, origin, screen, range, sortKey, sortAsc])

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v)
    else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <AppShell breadcrumb={t('platform.auditTitle')}>
      <div className="space-y-5">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold text-ink">{t('platform.auditTitle')}</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t('platform.auditSubtitleFull')}
              </p>
            </div>
            <div className="relative">
              <Building2 className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={establishmentId}
                onChange={(e) => setEstablishmentId(e.target.value)}
                className="h-10 max-w-[280px] appearance-none rounded-xl border border-slate-200 bg-white py-2 pr-9 pl-9 text-sm font-semibold text-ink shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                <option value="all">{t('platform.allEstablishmentsFilter')}</option>
                {establishments.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </Card>

        {/* PDF filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.search')}
              className={cn(pillClass, 'w-[140px] pr-3 pl-8 focus:outline-none focus:ring-2 focus:ring-brand-500/20')}
            />
          </div>

          <FilterSelect
            icon={<UserRound className="h-3.5 w-3.5 text-slate-400" />}
            value={user}
            onChange={setUser}
            label={t('platform.filterUser')}
            options={[
              { value: 'all', label: t('platform.allUsers') },
              ...authors.map((a) => ({ value: a, label: a })),
            ]}
          />

          <FilterSelect
            icon={<Shield className="h-3.5 w-3.5 text-slate-400" />}
            value={profile}
            onChange={setProfile}
            label={t('platform.filterProfile')}
            options={[
              { value: 'all', label: t('platform.allProfiles') },
              ...profiles.map((p) => ({ value: p, label: p })),
            ]}
          />

          <FilterSelect
            icon={<Settings2 className="h-3.5 w-3.5 text-slate-400" />}
            value={origin}
            onChange={setOrigin}
            label={t('platform.origin')}
            options={[
              { value: 'all', label: t('platform.allOrigins') },
              { value: 'COMIM', label: t('platform.originComim') },
              { value: 'School', label: t('platform.originSchool') },
            ]}
          />

          <FilterSelect
            icon={<Monitor className="h-3.5 w-3.5 text-slate-400" />}
            value={screen}
            onChange={setScreen}
            label={t('platform.filterScreen')}
            options={[
              { value: 'all', label: t('platform.allScreens') },
              ...screens.map((s) => ({ value: s, label: s })),
            ]}
          />

          <FilterSelect
            icon={<CalendarDays className="h-3.5 w-3.5 text-slate-400" />}
            value={range}
            onChange={setRange}
            label={t('platform.last7Days')}
            options={[
              { value: '7d', label: t('platform.last7Days') },
              { value: '30d', label: t('platform.last30Days') },
              { value: '90d', label: t('platform.last90Days') },
              { value: 'all', label: t('platform.allTime') },
            ]}
            showSelectedLabel
          />
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-muted">
                  {(
                    [
                      ['author', t('admin.author')],
                      ['origin', t('platform.origin')],
                      ['action', t('admin.action')],
                      ['detail', t('platform.detail')],
                      ['timestamp', t('admin.timestamp')],
                    ] as [SortKey, string][]
                  ).map(([key, label]) => (
                    <th key={key} className="px-5 py-3">
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
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted">
                      {t('platform.noAuditMatches')}
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-4 font-semibold text-ink">{row.author}</td>
                      <td className="px-5 py-4">
                        <Badge tone={row.origin === 'COMIM' ? 'blue' : 'gray'}>
                          {row.origin === 'COMIM'
                            ? t('platform.originComim')
                            : t('platform.originSchool')}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 font-semibold text-ink">{row.action}</td>
                      <td className="px-5 py-4 text-muted">{row.detail}</td>
                      <td className="px-5 py-4 whitespace-nowrap text-muted">{row.timestamp}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

function FilterSelect({
  icon,
  value,
  onChange,
  label,
  options,
  showSelectedLabel,
}: {
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  label: string
  options: { value: string; label: string }[]
  showSelectedLabel?: boolean
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2">{icon}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          pillClass,
          'min-w-[7.5rem] appearance-none pr-8 pl-8 focus:outline-none focus:ring-2 focus:ring-brand-500/20',
        )}
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {showSelectedLabel
              ? o.label
              : o.value === 'all'
                ? label
                : o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  )
}

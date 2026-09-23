import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, ChevronDown, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EngineRoomBadge, TrainingShell } from '@/components/training/TrainingShell'
import { useAuth } from '@/context/AuthContext'
import { components } from '@/data/mock'

export default function Catalog() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return components
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.definition.toLowerCase().includes(q) ||
        c.note.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <TrainingShell
      badge={t('student.catalog')}
      right={<EngineRoomBadge />}
      onLogout={() => {
        logout()
        navigate('/')
      }}
      dark={false}
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
            <h1 className="text-xl font-bold text-ink">{t('student.catalog')}</h1>
            <div className="relative min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('student.searchComponent')}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-muted"
              />
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-6 py-3">
                    <span className="inline-flex items-center gap-1">
                      {t('student.name')}
                      <span className="text-[10px] opacity-60">⇅</span>
                    </span>
                  </th>
                  <th className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      {t('student.definition')}
                      <span className="text-[10px] opacity-60">⇅</span>
                    </span>
                  </th>
                  <th className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      {t('student.technicalNote')}
                      <span className="text-[10px] opacity-60">⇅</span>
                    </span>
                  </th>
                  <th className="px-4 py-3">
                    <span className="inline-flex items-center gap-1">
                      {t('student.view3d')}
                      <span className="text-[10px] opacity-60">⇅</span>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.name} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-5 font-bold text-ink">{c.name}</td>
                    <td className="px-4 py-5 text-slate-700">{c.definition}</td>
                    <td className="px-4 py-5 text-muted">{c.note}</td>
                    <td className="px-4 py-5">
                      <Link
                        to="/student/exploded"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Box className="h-3.5 w-3.5" />
                        3D
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TrainingShell>
  )
}

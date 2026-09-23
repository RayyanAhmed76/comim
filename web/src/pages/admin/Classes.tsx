import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { classes as initialClasses, CURRENT_YEAR, type ClassRow } from '@/data/mock'

function statusTone(status: string): 'blue' | 'green' | 'gray' {
  if (status === 'Advanced') return 'green'
  if (status === 'Starting') return 'gray'
  return 'blue'
}

function classStatusLabel(status: string, t: (k: string) => string) {
  if (status === 'Advanced') return t('common.advanced')
  if (status === 'Starting') return t('common.starting')
  return t('common.inProgress')
}

export function Classes() {
  const { t } = useTranslation()
  const [classList, setClassList] = useState<ClassRow[]>(initialClasses)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [track, setTrack] = useState('Mechanics')
  const [teacher, setTeacher] = useState('Mounia Ferhat')

  function addClass(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    const id = name.toLowerCase().replace(/\s+/g, '-').slice(0, 6)
    setClassList((prev) => [
      ...prev,
      {
        id,
        name: name.trim(),
        track,
        headcount: 0,
        assignedContent: 'Guided Tour',
        progress: 0,
        status: 'Starting',
        teacher,
        schoolYear: CURRENT_YEAR,
      },
    ])
    setName('')
    setShowForm(false)
  }

  return (
    <AppShell breadcrumb={t('admin.classesTitle')}>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink">{t('admin.classesTitle')}</h1>
              <p className="mt-1 text-sm text-muted">
                {t('admin.manageClassesYear', { year: CURRENT_YEAR })}
              </p>
            </div>
            <Button onClick={() => setShowForm((v) => !v)}>
              <Plus className="h-4 w-4" />
              {t('admin.newClass')}
            </Button>
          </div>
        </Card>

        {showForm && (
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-bold text-ink">{t('admin.createClass')}</h2>
            <form onSubmit={addClass} className="grid gap-4 md:grid-cols-4">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">{t('admin.className')}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 2C — Marine Mechanics"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">{t('teacher.track')}</span>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                >
                  <option>Mechanics</option>
                  <option>Deck Officer</option>
                  <option>Electrotechnics</option>
                  <option>Boilermaking</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">{t('common.teacher')}</span>
                <select
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                >
                  <option>Mounia Ferhat</option>
                  <option>Karim Alaoui</option>
                </select>
              </label>
              <div className="flex items-end gap-2">
                <Button type="submit" className="flex-1">
                  {t('common.create')}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                  {t('common.cancel')}
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-6 py-3">{t('admin.classesTitle')}</th>
                  <th className="px-4 py-3">{t('teacher.track')}</th>
                  <th className="px-4 py-3">{t('common.teacher')}</th>
                  <th className="px-4 py-3">{t('admin.headcount')}</th>
                  <th className="px-4 py-3">{t('common.progress')}</th>
                  <th className="px-4 py-3">{t('common.status')}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {classList.map((cls) => (
                  <tr key={cls.id} className="border-b border-slate-100">
                    <td className="px-6 py-4 font-semibold text-ink">{cls.name}</td>
                    <td className="px-4 py-4 text-muted">{cls.track}</td>
                    <td className="px-4 py-4 text-muted">{cls.teacher}</td>
                    <td className="px-4 py-4 text-muted">{cls.headcount}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={cls.progress} className="max-w-[100px]" />
                        <span className="text-xs font-semibold">{cls.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge tone={statusTone(cls.status)} dot>
                        {classStatusLabel(cls.status, t)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Link to={`/admin/classes/${cls.id}/edit`}>
                        <ChevronRight className="h-4 w-4 text-muted" />
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

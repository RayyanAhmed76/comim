import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Plus, UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, StatCard } from '@/components/ui/Card'
import { demoUsers, students } from '@/data/mock'

type UserRow = {
  id: string
  name: string
  email: string
  role: string
  initials: string
  classLabel?: string
}

function formatClassIds(ids?: string[]) {
  if (!ids?.length) return undefined
  return ids.map((id) => id.toUpperCase()).join(', ')
}

export function Users() {
  const { t } = useTranslation()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('student')
  const [extraUsers, setExtraUsers] = useState<UserRow[]>([])

  const teachers = demoUsers.filter((u) => u.role === 'teacher')
  const studentRows: UserRow[] = students.map((s) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    role: 'student',
    initials: s.initials,
    classLabel: s.classId.toUpperCase(),
  }))
  const teacherRows: UserRow[] = teachers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: 'teacher',
    initials: user.initials,
    classLabel: formatClassIds(user.classIds),
  }))
  const allUsers = [...teacherRows, ...studentRows, ...extraUsers]

  function addUser(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    const initials = name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
    setExtraUsers((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role,
        initials,
        classLabel: role === 'student' ? '2A' : undefined,
      },
    ])
    setName('')
    setEmail('')
    setRole('student')
    setShowForm(false)
  }

  return (
    <AppShell breadcrumb={t('admin.users')}>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink">{t('admin.users')}</h1>
              <p className="mt-1 text-sm text-muted">
                Institut Maritime de Casablanca · {t('admin.usersSubtitle')}
              </p>
            </div>
            <Button onClick={() => setShowForm((v) => !v)}>
              <UserPlus className="h-4 w-4" />
              {t('admin.newUser')}
            </Button>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label={t('admin.teachers')} value={6} />
          <StatCard label={t('admin.students')} value={148} />
          <StatCard label={t('admin.accountsThisMonth')} value={12} valueClassName="text-brand-600" />
          <StatCard label={t('admin.seatsAvailable')} value={32} />
        </div>

        {showForm && (
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
              <Plus className="h-4 w-4" />
              {t('admin.createUser')}
            </h2>
            <form onSubmit={addUser} className="grid gap-4 md:grid-cols-4">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">{t('admin.fullName')}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">{t('admin.email')}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  required
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">{t('admin.role')}</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                >
                  <option value="student">{t('common.student')}</option>
                  <option value="teacher">{t('common.teacher')}</option>
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
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 px-6 py-4">
            <div>
              <h2 className="text-lg font-bold text-ink">{t('admin.allUsers')}</h2>
              <p className="mt-0.5 text-sm text-muted">{t('admin.allUsersHint')}</p>
            </div>
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-ink"
            >
              {t('common.search')}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-6 py-3">{t('admin.name')}</th>
                  <th className="px-4 py-3">{t('admin.role')}</th>
                  <th className="px-4 py-3">{t('admin.email')}</th>
                  <th className="px-4 py-3">{t('admin.classLabel')}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                          {user.initials}
                        </span>
                        <span className="font-semibold text-ink">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge tone={user.role === 'teacher' ? 'green' : 'gray'}>
                        {user.role === 'teacher' ? t('common.teacher') : t('common.student')}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-muted">{user.email}</td>
                    <td className="px-4 py-4 font-medium text-ink">{user.classLabel ?? '—'}</td>
                    <td className="px-4 py-4">
                      <Link to={`/admin/users/${user.id}/edit`}>
                        <ChevronRight className="h-4 w-4 text-muted" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 text-sm text-muted">
            <span>{t('admin.showingUsers', { from: 1, to: allUsers.length, total: 154 })}</span>
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-lg border border-slate-200 px-2 py-1">
                ‹
              </button>
              <button type="button" className="rounded-lg border border-slate-200 bg-navy-900 px-3 py-1 text-white">
                1
              </button>
              <button type="button" className="rounded-lg border border-slate-200 px-2 py-1">
                2
              </button>
              <button type="button" className="rounded-lg border border-slate-200 px-2 py-1">
                3
              </button>
              <span className="px-1">…</span>
              <button type="button" className="rounded-lg border border-slate-200 px-2 py-1">
                39
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

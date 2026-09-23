import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { classes, demoUsers, students } from '@/data/mock'

export function UserEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const student = students.find((s) => s.id === id) ?? students[0]
  const demoStudent = demoUsers.find((u) => u.name === 'Yassine Bakkali')

  const [name, setName] = useState(student.name)
  const [email, setEmail] = useState(student.email)
  const [classId, setClassId] = useState(student.classId)
  const [enabled, setEnabled] = useState(true)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    navigate('/admin/users')
  }

  return (
    <AppShell breadcrumb={`Edit User / ${name}`}>
      <div className="mx-auto max-w-xl space-y-6">
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </Link>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 text-sm font-bold text-white">
              {student.initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink">Edit student</h1>
              <p className="text-sm text-muted">Student account · {demoStudent?.email ?? email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Full name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Class</span>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="rounded border-slate-300"
              />
              Account enabled
            </label>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/admin/users')}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  )
}

import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { classes, headsets } from '@/data/mock'

export function HeadsetEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const decodedId = id ? decodeURIComponent(id) : headsets[0].id
  const headset = headsets.find((h) => h.id === decodedId) ?? headsets[0]

  const [status, setStatus] = useState(headset.status)
  const [assignedClass, setAssignedClass] = useState(headset.assignedClass)
  const [location, setLocation] = useState(headset.location ?? '')
  const [student, setStudent] = useState(headset.student ?? '')

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    navigate('/admin/headsets')
  }

  return (
    <AppShell breadcrumb={`Edit Headset / ${headset.id}`}>
      <div className="mx-auto max-w-xl space-y-6">
        <Link
          to="/admin/headsets"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to headsets
        </Link>

        <Card className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-ink">{headset.id}</h1>
            <Badge tone={status === 'Connected' ? 'green' : 'gray'} dot>
              {status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted">Last connected: {headset.lastConnected}</p>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Connected' | 'Offline')}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              >
                <option value="Connected">Connected</option>
                <option value="Offline">Offline</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Assigned class</span>
              <select
                value={assignedClass}
                onChange={(e) => setAssignedClass(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              >
                <option value="Unassigned">Unassigned</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Location</span>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. VR Room · Station 4"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Assigned student</span>
              <input
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                placeholder="Optional student name"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              />
            </label>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/admin/headsets')}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  )
}

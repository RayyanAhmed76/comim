import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { classes, CURRENT_YEAR } from '@/data/mock'

export function ClassEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const cls = classes.find((c) => c.id === id) ?? classes[0]

  const [name, setName] = useState(cls.name)
  const [track, setTrack] = useState(cls.track)
  const [teacher, setTeacher] = useState(cls.teacher)
  const [headcount, setHeadcount] = useState(String(cls.headcount))
  const [schoolYear, setSchoolYear] = useState(cls.schoolYear)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    navigate('/admin/classes')
  }

  return (
    <AppShell breadcrumb={`Edit Class / ${name}`}>
      <div className="mx-auto max-w-xl space-y-6">
        <Link
          to="/admin/classes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to classes
        </Link>

        <Card className="p-6">
          <h1 className="text-2xl font-bold text-ink">Edit class</h1>
          <p className="mt-1 text-sm text-muted">Class ID: {cls.id}</p>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Class name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Track</span>
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
              <span className="mb-1 block font-medium text-muted">Teacher</span>
              <select
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              >
                <option>Mounia Ferhat</option>
                <option>Karim Alaoui</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Headcount</span>
              <input
                type="number"
                min={0}
                value={headcount}
                onChange={(e) => setHeadcount(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">School year</span>
              <select
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              >
                <option>{CURRENT_YEAR}</option>
                <option>2025–2026</option>
              </select>
            </label>
            <div className="flex gap-3 pt-2">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/admin/classes')}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  )
}

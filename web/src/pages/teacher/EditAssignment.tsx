import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { assignments } from '@/data/mock'

export function EditAssignment() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const assignment = assignments.find((a) => a.id === id) ?? assignments[0]
  const [target, setTarget] = useState(assignment.target)
  const [dueDate, setDueDate] = useState('2026-09-22')
  const [unassigned, setUnassigned] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/teacher/classes/${assignment.classId}`)
  }

  function handleUnassign() {
    setUnassigned(true)
  }

  if (unassigned) {
    return (
      <AppShell breadcrumb="Edit Assignment">
        <Card className="p-6 text-center">
          <p className="text-muted">Assignment &quot;{assignment.content}&quot; has been unassigned.</p>
          <Link to={`/teacher/classes/${assignment.classId}`} className="mt-4 inline-block">
            <Button>Back to class</Button>
          </Link>
        </Card>
      </AppShell>
    )
  }

  return (
    <AppShell breadcrumb={`Edit Assignment / ${assignment.content}`}>
      <div className="mx-auto max-w-xl space-y-6">
        <Link
          to={`/teacher/classes/${assignment.classId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to class
        </Link>

        <Card className="p-6">
          <h1 className="text-2xl font-bold text-ink">{assignment.content}</h1>
          <p className="mt-1 text-sm text-muted">Class {assignment.classId.toUpperCase()}</p>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Target</span>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              >
                <option>Whole class (24)</option>
                <option>8 targeted students</option>
                <option>Individual student</option>
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-muted">Due date</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
              />
            </label>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="button" variant="danger" onClick={handleUnassign}>
                Unassign
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  )
}

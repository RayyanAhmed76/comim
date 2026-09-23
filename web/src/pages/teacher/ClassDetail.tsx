import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  assignments as initialAssignments,
  classes,
  quizBank,
  rubricSteps,
  students,
  type Assignment,
} from '@/data/mock'
import { cn } from '@/lib/cn'

type Tab = 'students' | 'assignments' | 'rubric' | 'quiz'

const contentOptions = ['Guided Tour', 'Identification', 'Startup Procedure', 'Repair', 'Graded Exam']
const targetOptions = ['Whole class (24)', '8 targeted students', 'Individual student']

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

function finalQuizLabel(status: string, t: (k: string) => string) {
  if (status === 'Completed') return t('common.completed')
  if (status === 'Locked') return t('common.locked')
  return t('common.open')
}

export function ClassDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const cls = classes.find((c) => c.id === id) ?? classes[0]
  const [tab, setTab] = useState<Tab>('students')
  const [classAssignments, setClassAssignments] = useState(
    initialAssignments.filter((a) => a.classId === cls.id),
  )
  const [newContent, setNewContent] = useState(contentOptions[0])
  const [newTarget, setNewTarget] = useState(targetOptions[0])
  const [newDueDate, setNewDueDate] = useState('')
  const [weights, setWeights] = useState(() =>
    rubricSteps.map(() => Math.round(100 / rubricSteps.length)),
  )
  const [quizScope, setQuizScope] = useState('Whole class')
  const [quizMode, setQuizMode] = useState('Random from bank')
  const [quizTimeLimit, setQuizTimeLimit] = useState('45')
  const [allowSkip, setAllowSkip] = useState(false)

  const classStudents = students.filter((s) => s.classId === cls.id)
  const totalWeight = weights.reduce((sum, w) => sum + w, 0)

  function addAssignment(e: React.FormEvent) {
    e.preventDefault()
    if (!newDueDate) return
    const next: Assignment = {
      id: `as-${Date.now()}`,
      classId: cls.id,
      content: newContent,
      target: newTarget,
      progress: '0 / 24 completed',
      dueDate: newDueDate,
    }
    setClassAssignments((prev) => [...prev, next])
    setNewDueDate('')
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'students', label: t('teacher.studentsTab') },
    { id: 'assignments', label: t('teacher.assignmentsTab') },
    { id: 'rubric', label: t('teacher.rubricTab') },
    { id: 'quiz', label: t('teacher.finalQuizTab') },
  ]

  return (
    <AppShell breadcrumb={`${t('teacher.classDetail')} / ${cls.name}`}>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink">{cls.name}</h1>
              <p className="mt-1 text-sm text-muted">
                {cls.track} · {t('teacher.headcountStudents', { count: cls.headcount })} · {cls.teacher}
              </p>
            </div>
            <Badge tone={statusTone(cls.status)} dot>
              {classStatusLabel(cls.status, t)}
            </Badge>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <ProgressBar value={cls.progress} className="max-w-xs flex-1" />
            <span className="text-sm font-semibold">{cls.progress}%</span>
          </div>
        </Card>

        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-1">
          {tabs.map((tabItem) => (
            <button
              key={tabItem.id}
              type="button"
              onClick={() => setTab(tabItem.id)}
              className={cn(
                'rounded-xl px-4 py-2 text-sm font-semibold transition',
                tab === tabItem.id ? 'bg-navy-900 text-white' : 'text-muted hover:bg-slate-100',
              )}
            >
              {tabItem.label}
            </button>
          ))}
        </div>

        {tab === 'students' && (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-muted">
                    <th className="px-6 py-3">{t('common.student')}</th>
                    <th className="px-4 py-3">{t('teacher.lastActivity')}</th>
                    <th className="px-4 py-3">{t('common.progress')}</th>
                    <th className="px-4 py-3">{t('teacher.finalQuiz')}</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {classStudents.map((student) => (
                    <tr key={student.id} className="border-b border-slate-100">
                      <td className="px-6 py-4">
                        <Link
                          to={`/teacher/students/${student.id}`}
                          className="flex items-center gap-3 font-semibold text-ink hover:text-brand-600"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                            {student.initials}
                          </span>
                          {student.name}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-muted">{student.lastActivity}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <ProgressBar value={student.progress} className="max-w-[100px]" />
                          <span className="text-xs font-semibold">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge
                          tone={
                            student.finalQuiz === 'Completed'
                              ? 'green'
                              : student.finalQuiz === 'Locked'
                                ? 'gray'
                                : 'blue'
                          }
                        >
                          {finalQuizLabel(student.finalQuiz, t)}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Link to={`/teacher/students/${student.id}`}>
                          <ChevronRight className="h-4 w-4 text-muted" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {tab === 'assignments' && (
          <div className="space-y-6">
            <Card className="divide-y divide-slate-100">
              {classAssignments.map((a) => (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                  <div>
                    <div className="font-semibold text-ink">{a.content}</div>
                    <div className="mt-1 text-sm text-muted">
                      {a.target} · {t('teacher.due', { date: a.dueDate })}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted">{a.progress}</span>
                    <Link to={`/teacher/assignments/${a.id}/edit`}>
                      <Button variant="secondary">{t('common.edit')}</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
                <Plus className="h-4 w-4" />
                {t('teacher.newAssignment')}
              </h3>
              <form onSubmit={addAssignment} className="grid gap-4 md:grid-cols-4">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-muted">{t('teacher.content')}</span>
                  <select
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  >
                    {contentOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-muted">{t('teacher.target')}</span>
                  <select
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  >
                    {targetOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-muted">{t('teacher.dueDate')}</span>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                    required
                  />
                </label>
                <div className="flex items-end">
                  <Button type="submit" className="w-full">
                    {t('teacher.addAssignment')}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {tab === 'rubric' && (
          <Card className="p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-ink">{t('teacher.rubricWeightsTitle')}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {t('teacher.total')}: {totalWeight}%
                </span>
                {totalWeight !== 100 && (
                  <Badge tone="orange">{t('teacher.weightsMustTotal')}</Badge>
                )}
              </div>
            </div>
            <div className="space-y-3">
              {rubricSteps.map((step, i) => (
                <div key={step} className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-100 px-4 py-3">
                  <span className="flex-1 text-sm font-medium text-ink">
                    {i + 1}. {step}
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={weights[i]}
                      onChange={(e) => {
                        const next = [...weights]
                        next[i] = Number(e.target.value)
                        setWeights(next)
                      }}
                      className="w-20 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    />
                    <span className="text-sm text-muted">%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === 'quiz' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="font-bold text-ink">{t('teacher.questionBank')}</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {quizBank.map((q) => (
                  <div key={q.id} className="px-6 py-4">
                    <Badge tone="blue" className="mb-2">
                      {q.theme}
                    </Badge>
                    <p className="text-sm text-ink">{q.question}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 text-lg font-bold text-ink">{t('teacher.playRules')}</h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                }}
              >
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-muted">{t('teacher.scope')}</span>
                  <select
                    value={quizScope}
                    onChange={(e) => setQuizScope(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  >
                    <option>{t('teacher.wholeClass')}</option>
                    <option>{t('teacher.selectedStudents')}</option>
                    <option>{t('teacher.individualRetry')}</option>
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-muted">{t('teacher.mode')}</span>
                  <select
                    value={quizMode}
                    onChange={(e) => setQuizMode(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  >
                    <option>{t('teacher.randomFromBank')}</option>
                    <option>{t('teacher.fixedSet')}</option>
                    <option>{t('teacher.adaptive')}</option>
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium text-muted">{t('teacher.timeLimit')}</span>
                  <input
                    type="number"
                    value={quizTimeLimit}
                    onChange={(e) => setQuizTimeLimit(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  />
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={allowSkip}
                    onChange={(e) => setAllowSkip(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                  {t('teacher.allowSkipQuestions')}
                </label>
                <Button type="submit">{t('teacher.savePlayRule')}</Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  )
}

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { attempts, classes, students } from '@/data/mock'
import { cn } from '@/lib/cn'

type Tab = 'training' | 'exam'

function finalQuizLabel(status: string, t: (k: string) => string) {
  if (status === 'Completed') return t('common.completed')
  if (status === 'Locked') return t('common.locked')
  return t('common.open')
}

function attemptStatusLabel(status: string, t: (k: string) => string) {
  if (status === 'Passed') return t('common.passed')
  if (status === 'Needs Review') return t('common.needsReview')
  return status
}

export function StudentProfile() {
  const { studentId } = useParams<{ studentId: string }>()
  const { t } = useTranslation()
  const student = students.find((s) => s.id === studentId) ?? students[0]
  const cls = classes.find((c) => c.id === student.classId)
  const studentAttempts = attempts.filter((a) => a.studentId === student.id)
  const [tab, setTab] = useState<Tab>('training')

  const trainingAttempts = studentAttempts.filter((a) => a.exercise !== 'Graded Exam')
  const examAttempts = studentAttempts.filter((a) => a.exercise === 'Graded Exam')
  const displayed = tab === 'training' ? trainingAttempts : examAttempts

  return (
    <AppShell breadcrumb={`${student.name} / ${cls?.name ?? student.classId}`}>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-lg font-bold text-white">
                {student.initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-ink">{student.name}</h1>
                <p className="mt-1 text-sm text-muted">
                  {cls?.name ?? student.classId} · {student.email}
                </p>
                <p className="text-sm text-muted">
                  {t('teacher.lastActivity')}: {student.lastActivity}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <Badge
                tone={
                  student.finalQuiz === 'Completed'
                    ? 'green'
                    : student.finalQuiz === 'Locked'
                      ? 'gray'
                      : 'blue'
                }
              >
                {t('teacher.finalQuizStatus', { status: finalQuizLabel(student.finalQuiz, t) })}
              </Badge>
              <Link to={`/teacher/live/${student.id}`}>
                <Button variant="secondary">
                  <Monitor className="h-4 w-4" />
                  {t('teacher.viewLive')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <ProgressBar value={student.progress} className="max-w-xs flex-1" />
            <span className="text-sm font-semibold">
              {student.progress}% {t('teacher.overallProgress')}
            </span>
          </div>
        </Card>

        <div className="flex gap-2 border-b border-slate-200 pb-1">
          {(
            [
              { id: 'training' as Tab, label: t('teacher.trainingResults') },
              { id: 'exam' as Tab, label: t('teacher.gradedExam') },
            ] as const
          ).map((tabItem) => (
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

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-6 py-3">{t('teacher.exercise')}</th>
                  <th className="px-4 py-3">{t('teacher.attempt')}</th>
                  <th className="px-4 py-3">{t('teacher.date')}</th>
                  <th className="px-4 py-3">{t('teacher.score')}</th>
                  <th className="px-4 py-3">{t('common.status')}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {displayed.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted">
                      {t('teacher.noAttemptsYet')}
                    </td>
                  </tr>
                ) : (
                  displayed.map((attempt) => (
                    <tr key={attempt.id} className="border-b border-slate-100">
                      <td className="px-6 py-4 font-semibold text-ink">{attempt.exercise}</td>
                      <td className="px-4 py-4 text-muted">#{attempt.attempt}</td>
                      <td className="px-4 py-4 text-muted">{attempt.date}</td>
                      <td className="px-4 py-4 font-semibold">{attempt.score}%</td>
                      <td className="px-4 py-4">
                        <Badge tone={attempt.status === 'Passed' ? 'green' : 'orange'}>
                          {attemptStatusLabel(attempt.status, t)}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          to={`/teacher/attempts/${attempt.id}`}
                          className="inline-flex items-center gap-1 text-brand-600 hover:underline"
                        >
                          {t('teacher.view')}
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </td>
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

import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { attempts, classes, students } from '@/data/mock'

function attemptStatusLabel(status: string, t: (k: string) => string) {
  if (status === 'Passed') return t('common.passed')
  if (status === 'Needs Review') return t('common.needsReview')
  return status
}

export function AttemptDetail() {
  const { attemptId } = useParams<{ attemptId: string }>()
  const { t } = useTranslation()
  const attempt = attempts.find((a) => a.id === attemptId) ?? attempts.find((a) => a.questions.length > 0)!
  const student = students.find((s) => s.id === attempt.studentId)
  const cls = classes.find((c) => c.id === student?.classId)

  return (
    <AppShell
      breadcrumb={`${t('teacher.attemptDetail')} / ${cls?.name.split(' ')[0] ?? ''} · ${student?.name ?? ''} · ${attempt.exercise}`}
    >
      <div className="space-y-6">
        <Link
          to={`/teacher/students/${attempt.studentId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('teacher.backToStudentProfile')}
        </Link>

        <Card className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink">
                {attempt.exercise} · {t('teacher.attempt')} {attempt.attempt}
              </h1>
              <p className="mt-1 text-sm text-muted">
                {student?.name} · {cls?.name} · {attempt.date}
              </p>
            </div>
            <Badge tone={attempt.status === 'Passed' ? 'green' : 'orange'} dot>
              {attempt.score}% · {attemptStatusLabel(attempt.status, t)}
            </Badge>
          </div>
        </Card>

        {attempt.questions.length === 0 ? (
          <Card className="p-6 text-center text-muted">{t('teacher.noQuestionBreakdown')}</Card>
        ) : (
          <div className="space-y-4">
            {attempt.questions.map((q, i) => (
              <Card key={i} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="flex-1 font-semibold text-ink">{q.q}</h3>
                  <Badge tone={q.correct ? 'green' : 'orange'}>
                    {q.correct ? (
                      <>
                        <Check className="mr-1 inline h-3 w-3" />
                        {t('common.correct')}
                      </>
                    ) : (
                      <>
                        <X className="mr-1 inline h-3 w-3" />
                        {t('common.incorrect')}
                      </>
                    )}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-muted">
                  {t('teacher.answerGiven')}: <span className="font-medium text-ink">{q.given}</span>
                </p>
                {!q.correct && q.expected && (
                  <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm">
                    <span className="font-semibold text-muted">{t('teacher.expectedAnswer')}:</span>{' '}
                    <span className="text-ink">{q.expected}</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

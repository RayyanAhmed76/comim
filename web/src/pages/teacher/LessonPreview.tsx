import { Link } from 'react-router-dom'
import {
  BookOpen,
  Box,
  ClipboardCheck,
  PlaySquare,
  Search,
  Wrench,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/Card'

export function LessonPreview() {
  const { t } = useTranslation()

  const lessons = [
    {
      title: t('student.guidedTour'),
      description: t('student.guidedTourDesc'),
      icon: BookOpen,
      to: '/student/guided-tour?preview=1',
    },
    {
      title: t('student.explodedView'),
      description: t('student.catalogDesc'),
      icon: Box,
      to: '/teacher/preview/exploded',
    },
    {
      title: t('student.identification'),
      description: t('student.identificationDesc'),
      icon: Search,
      to: '/student/identification?preview=1',
    },
    {
      title: t('student.startup'),
      description: t('student.startupDesc'),
      icon: PlaySquare,
      to: '/student/startup?preview=1',
    },
    {
      title: t('student.repair'),
      description: t('student.repairDesc'),
      icon: Wrench,
      to: '/student/repair?preview=1',
    },
    {
      title: t('student.finalQuiz'),
      description: t('student.finalQuizDesc'),
      icon: ClipboardCheck,
      to: '/student/final-quiz?preview=1',
    },
  ]

  return (
    <AppShell breadcrumb={t('teacher.lessonPreviewTitle')}>
      <div className="space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-ink">{t('teacher.lessonPreviewTitle')}</h1>
          <p className="mt-1 text-sm text-muted">{t('teacher.lessonPreviewNoScores')}</p>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => {
            const Icon = lesson.icon
            return (
              <Link key={lesson.title} to={lesson.to}>
                <Card className="h-full p-5 transition hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-ink">{lesson.title}</h2>
                  <p className="mt-2 text-sm text-muted">{lesson.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
                    {t('teacher.openPreview')}
                  </span>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}

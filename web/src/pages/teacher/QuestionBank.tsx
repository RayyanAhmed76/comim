import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { quizBank as initialBank } from '@/data/mock'

type Question = { id: string; question: string; theme: string }

export function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>(initialBank)
  const [type, setType] = useState('Single choice')
  const [theme, setTheme] = useState('Procedure')
  const [questionText, setQuestionText] = useState('')
  const [answers, setAnswers] = useState(['', '', '', ''])

  function addQuestion(e: React.FormEvent) {
    e.preventDefault()
    if (!questionText.trim()) return
    setQuestions((prev) => [
      ...prev,
      {
        id: `q-${Date.now()}`,
        question: questionText.trim(),
        theme,
      },
    ])
    setQuestionText('')
    setAnswers(['', '', '', ''])
  }

  function updateAnswer(i: number, value: string) {
    setAnswers((prev) => {
      const next = [...prev]
      next[i] = value
      return next
    })
  }

  return (
    <AppShell breadcrumb="Question Bank">
      <div className="space-y-6">
        <Link
          to="/admin/settings"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to settings
        </Link>

        <Card className="p-6">
          <h1 className="text-2xl font-bold text-ink">Question Bank</h1>
          <p className="mt-1 text-sm text-muted">Add and manage final quiz questions for your establishment.</p>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
              <Plus className="h-4 w-4" />
              Add question
            </h2>
            <form onSubmit={addQuestion} className="space-y-4">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">Type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                >
                  <option>Single choice</option>
                  <option>Multiple choice</option>
                  <option>True / False</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">Theme</span>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                >
                  <option>Procedure</option>
                  <option>Safety</option>
                  <option>Components</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-muted">Question</span>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5"
                  placeholder="Enter the question text…"
                  required
                />
              </label>
              <div className="space-y-2">
                <span className="block text-sm font-medium text-muted">Answer options</span>
                {answers.map((a, i) => (
                  <input
                    key={i}
                    type="text"
                    value={a}
                    onChange={(e) => updateAnswer(i, e.target.value)}
                    placeholder={`Answer ${i + 1}`}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                  />
                ))}
              </div>
              <Button type="submit">Add to bank</Button>
            </form>
          </Card>

          <Card className="overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
              <h2 className="font-bold text-ink">{questions.length} questions</h2>
            </div>
            <div className="max-h-[520px] divide-y divide-slate-100 overflow-y-auto">
              {questions.map((q) => (
                <div key={q.id} className="px-6 py-4">
                  <Badge tone="blue" className="mb-2">
                    {q.theme}
                  </Badge>
                  <p className="text-sm text-ink">{q.question}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VrShell } from '@/pages/vr/VrChrome'
import { finalQuizQuestions } from '@/data/mock'
import { cn } from '@/lib/cn'

export default function VrFinalQuiz() {
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const [confirmed, setConfirmed] = useState(false)
  const navigate = useNavigate()

  const q = finalQuizQuestions[qIndex]
  const isMulti = q.multi

  const toggle = (idx: number) => {
    if (confirmed) return
    if (isMulti) {
      setSelected((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]))
    } else {
      setSelected([idx])
    }
  }

  return (
    <VrShell
      badge="Final Quiz"
      backTo="/vr/menu"
      backLabel="Course menu"
      hints={['Pinch to select', 'Pinch Confirm when ready']}
    >
      <div className="mx-auto max-w-xl flex-1 px-6 py-8">
        <div className="rounded-2xl bg-white p-6 text-ink shadow-xl">
          <div className="flex items-center justify-between">
            <Badge tone="blue">{q.theme}</Badge>
            <span className="text-sm text-muted">
              {qIndex + 1} / {finalQuizQuestions.length}
            </span>
          </div>
          <h2 className="mt-4 text-lg font-bold">{q.q}</h2>
          {isMulti && <p className="mt-1 text-sm text-muted">Select all that apply</p>}
          <div className="mt-4 space-y-2">
            {q.options.map((opt, idx) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(idx)}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition',
                  selected.includes(idx)
                    ? 'border-success-600 bg-success-50 text-success-600'
                    : 'border-slate-200 hover:bg-slate-50',
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            {!confirmed ? (
              <Button disabled={selected.length === 0} onClick={() => setConfirmed(true)}>
                Confirm
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (qIndex < finalQuizQuestions.length - 1) {
                    setQIndex((i) => i + 1)
                    setSelected([])
                    setConfirmed(false)
                  } else {
                    navigate('/vr/menu')
                  }
                }}
              >
                {qIndex < finalQuizQuestions.length - 1 ? 'Next' : 'Finish'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </VrShell>
  )
}

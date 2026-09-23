import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Check, ChevronRight, Mail, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

const DEFAULT_TRACKS = ['Mechanics', 'Deck Officer', 'Electrotechnics', 'Boilermaking']

export function Settings() {
  const { t } = useTranslation()
  const [name, setName] = useState('Institut Maritime de Casablanca')
  const [contact, setContact] = useState('contact@imc-maritime.ma')
  const [address, setAddress] = useState('Port de Casablanca, Morocco')
  const [allowStudentCreation, setAllowStudentCreation] = useState(true)
  const [tracks, setTracks] = useState(DEFAULT_TRACKS)
  const [newTrack, setNewTrack] = useState('')

  function removeTrack(track: string) {
    setTracks((prev) => prev.filter((tr) => tr !== track))
  }

  function addTrack(e: React.FormEvent) {
    e.preventDefault()
    const value = newTrack.trim()
    if (!value || tracks.includes(value)) return
    setTracks((prev) => [...prev, value])
    setNewTrack('')
  }

  return (
    <AppShell breadcrumb={t('admin.settingsTitle')}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">{t('admin.settingsTitle')}</h1>
          <p className="mt-1 text-sm text-muted">{t('admin.settingsPocSubtitle')}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Establishment — PDF layout */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink">{t('admin.establishment')}</h2>
            <p className="mt-0.5 text-sm text-muted">{t('admin.establishmentCardHint')}</p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-950 text-sm font-bold text-white">
                IMC
              </div>
              <p className="text-sm text-muted">{t('admin.logoHint')}</p>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-muted">{t('admin.establishmentName')}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-ink"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-muted">{t('admin.contact')}</span>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-ink"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-muted">{t('admin.address')}</span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-ink"
                />
              </label>
            </div>
          </Card>

          {/* License — PDF layout */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink">{t('admin.license')}</h2>
            <p className="mt-0.5 text-sm text-muted">{t('admin.licenseHint')}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-muted">{t('admin.plan')}</div>
                <div className="mt-1 text-lg font-bold text-ink">Establishment</div>
              </div>
              <div className="rounded-xl border border-slate-200 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-muted">{t('admin.seats')}</div>
                <div className="mt-1 text-lg font-bold text-ink">180</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted">{t('admin.licenseChangeNote')}</p>

            <Button variant="secondary" className="mt-5">
              <Mail className="h-4 w-4" />
              {t('admin.contactComim')}
            </Button>
          </Card>
        </div>

        {/* Accounts & access */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink">{t('admin.accountsAccess')}</h2>
          <p className="mt-0.5 text-sm text-muted">{t('admin.accountsAccessHint')}</p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 px-4 py-4">
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-ink">{t('admin.studentCreation')}</div>
              <p className="mt-1 text-sm text-muted">{t('admin.studentCreationHint')}</p>
            </div>
            <button
              type="button"
              onClick={() => setAllowStudentCreation((v) => !v)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold',
                allowStudentCreation
                  ? 'bg-success-50 text-success-600 ring-1 ring-green-200'
                  : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
              )}
            >
              {allowStudentCreation ? <Check className="h-4 w-4" /> : null}
              {allowStudentCreation ? t('admin.enabled') : t('admin.disabled')}
            </button>
          </div>
        </Card>

        {/* Tracks */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink">{t('admin.tracks')}</h2>
          <p className="mt-0.5 text-sm text-muted">{t('admin.tracksHint')}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tracks.map((track) => (
              <span
                key={track}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-ink"
              >
                {track}
                <button
                  type="button"
                  onClick={() => removeTrack(track)}
                  className="rounded-full p-0.5 text-muted hover:bg-slate-200 hover:text-ink"
                  aria-label={`Remove ${track}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={addTrack} className="mt-4 flex flex-wrap gap-2">
            <input
              value={newTrack}
              onChange={(e) => setNewTrack(e.target.value)}
              placeholder={t('admin.newTrackPlaceholder')}
              className="min-w-[200px] flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            />
            <Button type="submit">+ {t('common.add')}</Button>
          </form>
        </Card>

        {/* Learning content / Question bank */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink">{t('admin.learningContent')}</h2>
          <p className="mt-0.5 text-sm text-muted">{t('admin.learningContentHint')}</p>

          <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-slate-100 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-brand-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-ink">{t('teacher.questionBank')}</div>
                <p className="text-sm text-muted">{t('admin.questionBankManage')}</p>
              </div>
            </div>
            <Link to="/teacher/question-bank">
              <Button variant="secondary">
                {t('admin.openQuestionBank')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

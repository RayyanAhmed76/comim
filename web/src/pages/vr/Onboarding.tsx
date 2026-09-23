import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/Button'
import { VrStatusBar } from '@/pages/vr/VrChrome'
import { cn } from '@/lib/cn'

export default function VrOnboarding() {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    { title: t('vr.putOnHeadset'), text: t('vr.putOnHeadsetDesc') },
    { title: t('vr.holdControllers'), text: t('vr.holdControllersDesc') },
    { title: t('vr.findPlayArea'), text: t('vr.findPlayAreaDesc') },
    { title: t('vr.readyToTrain'), text: t('vr.readyToTrainDesc') },
  ]

  const isLast = step >= steps.length - 1

  return (
    <div className="grid-blueprint min-h-screen text-white">
      <VrStatusBar />
      <header className="border-b border-white/10 px-6 py-4">
        <Logo />
      </header>

      <main className="mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
          {t('vr.vrTraining')}
        </div>
        <h1 className="mt-3 text-2xl font-bold">{t('vr.gettingStarted')}</h1>

        <div className="mt-10 w-full rounded-2xl border border-white/10 bg-navy-900/70 p-8">
          <div className="mb-4 flex justify-center gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn('h-2 w-8 rounded-full transition', i <= step ? 'bg-brand-500' : 'bg-white/15')}
              />
            ))}
          </div>
          <h2 className="text-xl font-bold">{steps[step].title}</h2>
          <p className="mt-4 text-slate-300">{steps[step].text}</p>
        </div>

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <Button variant="dark" onClick={() => setStep((s) => s - 1)}>
              {t('common.back')}
            </Button>
          )}
          <Button
            onClick={() => {
              if (isLast) navigate('/vr/menu')
              else setStep((s) => s + 1)
            }}
          >
            {isLast ? t('vr.start') : t('common.next')}
          </Button>
        </div>
      </main>
    </div>
  )
}

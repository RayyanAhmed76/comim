import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TrainingShell } from '@/components/training/TrainingShell'
import { MachineSchematic } from '@/components/training/MachineSchematic'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useAuth } from '@/context/AuthContext'

const segments = [
  {
    highlight: 'SEPARATOR TANK' as const,
    title: 'Welcome',
    text: 'You are in the engine room aboard a training ship. This freshwater generator produces potable water from seawater.',
    footer: 'CONTROL PANEL — ENGINE ROOM, LOWER DECK',
  },
  {
    highlight: 'SEPARATOR TANK' as const,
    title: 'Separator tank',
    text: 'The largest volume on the unit. Evaporation and separation take place here under vacuum.',
    footer: 'SEPARATOR TANK — VACUUM SEPARATION ZONE',
  },
  {
    highlight: 'EVAPORATOR' as const,
    title: 'Evaporator',
    text: 'Heated plates where seawater turns into vapor. Jacket water supplies the heat on the hot side.',
    footer: 'EVAPORATOR — JACKET WATER HEATING',
  },
  {
    highlight: 'CONDENSER' as const,
    title: 'Condenser',
    text: 'Cooled plates where vapor turns back into liquid freshwater. Seawater cools this side.',
    footer: 'CONDENSER — SEAWATER COOLING SIDE',
  },
  {
    highlight: 'EVAPORATOR' as const,
    title: 'Demister',
    text: 'Between evaporator and condenser, a demister screen retains seawater droplets from the vapor stream.',
    footer: 'DEMISTER — VAPOR PATH BETWEEN PLATES',
  },
  {
    highlight: 'EJECTOR' as const,
    title: 'Combined ejector',
    text: 'Discharges brine and gases while maintaining the vacuum required for distillation.',
    footer: 'COMBINED EJECTOR — BRINE & GAS EXTRACTION',
  },
  {
    highlight: 'EJECTOR' as const,
    title: 'Salinometer',
    text: 'The salinometer measures salt content of produced water — the only instrument tied to the automatic quality valve.',
    footer: 'SALINOMETER — PRODUCT WATER QUALITY',
  },
  {
    highlight: 'SEPARATOR TANK' as const,
    title: 'Control panel',
    text: 'Instruments and valves are operated from the control panel on the lower deck.',
    footer: 'CONTROL PANEL — ENGINE ROOM, LOWER DECK',
  },
  {
    highlight: 'EVAPORATOR' as const,
    title: 'Tour complete',
    text: 'You have completed the guided tour. Continue with Identification to test your knowledge of components.',
    footer: 'CONTROL PANEL — TOUR COMPLETE',
  },
]

export default function GuidedTour() {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const seg = segments[step]
  const isLast = step >= segments.length - 1

  return (
    <TrainingShell
      badge={t('student.guidedTour')}
      backTo="/student"
      backLabel={t('student.courseMenuBack')}
      onLogout={() => {
        logout()
        navigate('/')
      }}
    >
      <div className="flex min-h-[calc(100vh-57px)] flex-col lg:flex-row">
        <div className="relative min-h-[520px] flex-1 pb-8">
          <MachineSchematic
            highlight={seg.highlight}
            callout={{
              title: seg.title,
              subtitle: t('student.segment', { current: step + 1, total: segments.length }),
            }}
            footerLabel={seg.footer}
          />
        </div>
        <aside className="flex w-full flex-col justify-between border-l border-white/10 bg-[#0c1a2e]/95 p-6 text-white lg:w-[380px]">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-300">
              {t('student.narration')}
            </div>
            <h2 className="mt-2 text-xl font-bold">{seg.title}</h2>
            <p className="mt-4 leading-relaxed text-slate-300">{seg.text}</p>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-slate-400">
                <span>{t('student.segment', { current: step + 1, total: segments.length })}</span>
                <span className="font-semibold text-sky-300">
                  {Math.round(((step + 1) / segments.length) * 100)}%
                </span>
              </div>
              <ProgressBar
                value={((step + 1) / segments.length) * 100}
                className="h-3 bg-white/15"
                fillClassName="bg-[#5BA3E8]"
              />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end gap-3">
            <Button
              className="bg-[#5BA3E8] hover:bg-[#4a92d6]"
              onClick={() => {
                if (isLast) navigate('/student/identification')
                else setStep((s) => s + 1)
              }}
            >
              {isLast ? t('student.finish') : t('common.next')}
            </Button>
          </div>
        </aside>
      </div>
    </TrainingShell>
  )
}

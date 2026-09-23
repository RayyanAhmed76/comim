import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TrainingShell } from '@/components/training/TrainingShell'
import { MachineSchematic } from '@/components/training/MachineSchematic'
import { ProcedureSidebar } from '@/components/training/ProcedureSidebar'
import { useAuth } from '@/context/AuthContext'
import { startupSteps } from '@/data/mock'
import { startupMeta } from '@/data/procedureMeta'

export default function StartupProcedure() {
  const [hintVisible, setHintVisible] = useState(false)
  const [stepIndex, setStepIndex] = useState(5)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const currentStep = stepIndex + 1
  const meta = startupMeta[stepIndex] ?? startupMeta[0]

  const advance = () => {
    if (stepIndex >= startupSteps.length - 1) {
      navigate('/student')
      return
    }
    setStepIndex((i) => i + 1)
    setHintVisible(false)
  }

  return (
    <TrainingShell
      badge={t('student.startup')}
      backTo="/student"
      backLabel={t('student.courseMenuBack')}
      onLogout={() => {
        logout()
        navigate('/')
      }}
    >
      <div className="flex min-h-[calc(100vh-57px)] flex-col lg:flex-row">
        <div className="relative min-h-[520px] flex-1 pb-16">
          <MachineSchematic
            highlight={meta.highlight}
            callout={{
              title: meta.callout,
              subtitle: meta.subtitle,
            }}
            footerLabel={meta.footer}
            gauges={
              <>
                <div className="rounded-xl border border-white/10 bg-navy-950/70 px-4 py-2 text-center text-xs text-white backdrop-blur">
                  <div className="text-slate-400">{t('student.vacuumLevel')}</div>
                  <div className="font-bold">{meta.vacuum ?? '—'}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-navy-950/70 px-4 py-2 text-center text-xs text-white backdrop-blur">
                  <div className="text-slate-400">{t('student.suctionValve')}</div>
                  <div className="font-bold text-emerald-400">{meta.valve ?? t('student.open')}</div>
                </div>
              </>
            }
            onShowHint={() => setHintVisible(true)}
            hintLabel={t('common.showHint')}
          />
        </div>
        <ProcedureSidebar
          title={t('student.startup').toUpperCase()}
          currentStep={currentStep}
          totalSteps={startupSteps.length}
          steps={startupSteps}
          tools={[
            { label: t('student.serviceWrench'), icon: 'wrench' },
            { label: t('student.referenceSheet'), icon: 'book' },
          ]}
          hint={t('student.startupHint')}
          hintVisible={hintVisible}
          onContinue={advance}
          continueLabel={t('common.confirm')}
        />
      </div>
    </TrainingShell>
  )
}

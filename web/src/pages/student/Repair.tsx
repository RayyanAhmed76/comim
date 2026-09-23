import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TrainingShell } from '@/components/training/TrainingShell'
import { MachineSchematic } from '@/components/training/MachineSchematic'
import { ProcedureSidebar } from '@/components/training/ProcedureSidebar'
import { useAuth } from '@/context/AuthContext'
import { repairSteps } from '@/data/mock'
import { repairMeta } from '@/data/procedureMeta'

export default function Repair() {
  const [hintVisible, setHintVisible] = useState(false)
  const [stepIndex, setStepIndex] = useState(3)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const currentStep = stepIndex + 1
  const meta = repairMeta[stepIndex] ?? repairMeta[0]

  const advance = () => {
    if (stepIndex >= repairSteps.length - 1) {
      navigate('/student')
      return
    }
    setStepIndex((i) => i + 1)
    setHintVisible(false)
  }

  return (
    <TrainingShell
      badge={t('student.repair')}
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
            onShowHint={() => setHintVisible(true)}
            hintLabel={t('common.showHint')}
          />
        </div>
        <ProcedureSidebar
          title={t('student.repair').toUpperCase()}
          currentStep={currentStep}
          totalSteps={repairSteps.length}
          steps={repairSteps}
          hint={t('student.repairHint')}
          hintVisible={hintVisible}
          onContinue={advance}
          continueLabel={t('common.confirm')}
        />
      </div>
    </TrainingShell>
  )
}

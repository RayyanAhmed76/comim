import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MachineSchematic } from '@/components/training/MachineSchematic'
import { ProcedureSidebar } from '@/components/training/ProcedureSidebar'
import { VrShell } from '@/pages/vr/VrChrome'
import { repairSteps } from '@/data/mock'
import { repairMeta } from '@/data/procedureMeta'

export default function VrRepair() {
  const [hintVisible, setHintVisible] = useState(false)
  const [stepIndex, setStepIndex] = useState(3)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const currentStep = stepIndex + 1
  const meta = repairMeta[stepIndex] ?? repairMeta[0]

  const advance = () => {
    if (stepIndex >= repairSteps.length - 1) {
      navigate('/vr/menu')
      return
    }
    setStepIndex((i) => i + 1)
    setHintVisible(false)
  }

  return (
    <VrShell
      badge={t('student.repair')}
      backTo="/vr/menu"
      backLabel={t('student.courseMenuBack')}
      hints={[t('vr.pinchSelect'), t('vr.pickUp')]}
    >
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="relative min-h-[480px] flex-1 pb-16">
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
    </VrShell>
  )
}

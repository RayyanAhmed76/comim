import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TrainingShell } from '@/components/training/TrainingShell'
import { MachineSchematic } from '@/components/training/MachineSchematic'
import {
  IdentificationQuizPanel,
  identificationSteps,
  questionLetter,
} from '@/components/training/IdentificationQuizPanel'
import { useAuth } from '@/context/AuthContext'

export default function Identification() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string | null>(null)
  const [hintVisible, setHintVisible] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const step = identificationSteps[stepIndex]
  const total = identificationSteps.length
  const letter = questionLetter(stepIndex)

  const advance = () => {
    if (stepIndex >= total - 1) {
      navigate('/student')
      return
    }
    setStepIndex((i) => i + 1)
    setSelected(null)
    setHintVisible(false)
  }

  return (
    <TrainingShell
      badge={t('student.identification')}
      backTo="/student"
      backLabel={t('student.courseMenuBack')}
      onLogout={() => {
        logout()
        navigate('/')
      }}
    >
      <div className="flex min-h-[calc(100vh-57px)] flex-col lg:flex-row">
        <div className="relative min-h-[480px] flex-1 pb-16">
          <MachineSchematic
            highlight={step.highlight}
            callout={{
              title: step.calloutTitle,
              subtitle: step.calloutSubtitle,
            }}
            footerLabel={step.footer}
            onShowHint={() => setHintVisible(true)}
            hintLabel={t('common.showHint')}
          />
        </div>

        <aside className="z-10 w-full shrink-0 p-3 sm:p-4 lg:w-[420px] lg:py-6 lg:pr-6 lg:pl-2">
          <IdentificationQuizPanel
            stepIndex={stepIndex}
            total={total}
            questionLabel={t('student.questionLetterPartName', { letter })}
            question={step.question}
            options={step.options}
            selected={selected}
            onSelect={setSelected}
            hintVisible={hintVisible}
            hint={step.hint}
            confirmLabel={t('common.confirm')}
            onConfirm={advance}
            partOfLabel={t('student.partOf', { current: stepIndex + 1, total })}
          />
        </aside>
      </div>
    </TrainingShell>
  )
}

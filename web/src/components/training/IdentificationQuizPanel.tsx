import { cn } from '@/lib/cn'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import type { SchematicPartId } from '@/components/training/MachineSchematic'

export type IdStep = {
  highlight: SchematicPartId
  question: string
  options: string[]
  correct: string
  hint: string
  footer: string
  calloutTitle: string
  calloutSubtitle: string
}

export const identificationSteps: IdStep[] = [
  {
    highlight: 'EVAPORATOR',
    question: 'What is the name of the highlighted part?',
    options: ['Evaporator plates', 'Condenser plates', 'Demister', 'Separator tank'],
    correct: 'Evaporator plates',
    hint: 'Heated by jacket water — look for the fitting on the hot side of the unit.',
    footer: 'EVAPORATOR — JACKET WATER HEATING',
    calloutTitle: 'Selected part',
    calloutSubtitle: 'Highlighted marker',
  },
  {
    highlight: 'CONDENSER',
    question: 'What is the name of the highlighted part?',
    options: ['Evaporator plates', 'Condenser plates', 'Demister', 'Separator tank'],
    correct: 'Condenser plates',
    hint: 'Cooled by seawater — opposite temperature direction to the evaporator.',
    footer: 'CONDENSER — SEAWATER COOLING SIDE',
    calloutTitle: 'Selected part',
    calloutSubtitle: 'Highlighted marker',
  },
  {
    highlight: 'SEPARATOR TANK',
    question: 'What is the name of the highlighted part?',
    options: ['Evaporator plates', 'Condenser plates', 'Demister', 'Separator tank'],
    correct: 'Separator tank',
    hint: 'The largest volume — vapor/liquid evaporation and separation happen here.',
    footer: 'SEPARATOR TANK — VACUUM SEPARATION ZONE',
    calloutTitle: 'Selected part',
    calloutSubtitle: 'Highlighted marker',
  },
  {
    highlight: 'EJECTOR',
    question: 'What is the name of the highlighted part?',
    options: ['Combined ejector', 'Salinometer', 'Demister', 'Condenser plates'],
    correct: 'Combined ejector',
    hint: 'Two functions at once — liquid and gas extraction.',
    footer: 'COMBINED EJECTOR — BRINE & GAS EXTRACTION',
    calloutTitle: 'Selected part',
    calloutSubtitle: 'Highlighted marker',
  },
  {
    highlight: 'EVAPORATOR',
    question: 'Which part sits in the vapor path between evaporator and condenser?',
    options: ['Demister', 'Salinometer', 'Separator tank', 'Combined ejector'],
    correct: 'Demister',
    hint: 'Located between the evaporator and the condenser, in the path of the vapor.',
    footer: 'DEMISTER — VAPOR PATH BETWEEN PLATES',
    calloutTitle: 'Selected part',
    calloutSubtitle: 'Between the plates',
  },
  {
    highlight: 'EJECTOR',
    question: 'What instrument measures salt content of produced water?',
    options: ['Salinometer', 'Pressure gauge', 'Thermometer', 'Flow meter'],
    correct: 'Salinometer',
    hint: 'The only instrument monitored by the automatic quality valve.',
    footer: 'SALINOMETER — PRODUCT WATER QUALITY',
    calloutTitle: 'Selected part',
    calloutSubtitle: 'Quality monitoring',
  },
  {
    highlight: 'CONDENSER',
    question: 'Which plates are cooled by seawater?',
    options: ['Condenser plates', 'Evaporator plates', 'Demister', 'Separator tank'],
    correct: 'Condenser plates',
    hint: 'Opposite temperature direction to the evaporator.',
    footer: 'CONDENSER — SEAWATER COOLING SIDE',
    calloutTitle: 'Selected part',
    calloutSubtitle: 'Highlighted marker',
  },
  {
    highlight: 'SEPARATOR TANK',
    question: 'Where do evaporation and separation take place under vacuum?',
    options: ['Separator tank', 'Evaporator plates', 'Combined ejector', 'Control panel'],
    correct: 'Separator tank',
    hint: 'The largest volume on the freshwater generator.',
    footer: 'SEPARATOR TANK — VACUUM SEPARATION ZONE',
    calloutTitle: 'Selected part',
    calloutSubtitle: 'Highlighted marker',
  },
]

export function questionLetter(index: number) {
  return String.fromCharCode(65 + (index % 26))
}

export function IdentificationQuizPanel({
  stepIndex,
  total,
  questionLabel,
  question,
  options,
  selected,
  onSelect,
  hintVisible,
  hint,
  confirmLabel,
  onConfirm,
  partOfLabel,
}: {
  stepIndex: number
  total: number
  questionLabel: string
  question: string
  options: string[]
  selected: string | null
  onSelect: (opt: string) => void
  hintVisible: boolean
  hint: string
  confirmLabel: string
  onConfirm: () => void
  partOfLabel: string
}) {
  const progress = ((stepIndex + 1) / total) * 100

  return (
    <div className="flex h-full max-h-none w-full flex-col overflow-hidden rounded-2xl bg-white text-[#0A1633] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-slate-200/80 lg:max-h-[calc(100vh-80px)] lg:max-w-[400px]">
      <div className="shrink-0 border-b border-slate-100 px-4 py-3 sm:px-5 sm:py-4">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1d5ed8]">
          {questionLabel}
        </div>
        <h2 className="mt-2 text-base font-bold leading-snug text-[#0A1633] sm:text-lg">{question}</h2>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-500">{partOfLabel}</p>
          <span className="text-xs font-semibold tabular-nums text-[#1d5ed8]">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="mt-2">
          <ProgressBar
            value={progress}
            className="h-3 bg-slate-200"
            fillClassName="bg-[#1d5ed8]"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-5 py-4">
        {options.map((opt) => {
          const on = selected === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={cn(
                'flex w-full items-center gap-3 rounded-full border px-4 py-3 text-left text-sm font-medium transition',
                on
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-white text-[#0A1633] hover:border-slate-300 hover:bg-slate-50',
              )}
            >
              <span
                className={cn(
                  'h-4 w-4 shrink-0 rounded-full border-2',
                  on ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300',
                )}
              />
              {opt}
            </button>
          )
        })}

        {hintVisible && (
          <p className="px-1 pt-2 text-sm font-medium leading-relaxed text-orange-500">{hint}</p>
        )}
      </div>

      <div className="shrink-0 border-t border-slate-100 px-5 py-4">
        <Button
          className="w-full rounded-xl bg-[#5BA3E8] py-3 text-white hover:bg-[#4a92d6] disabled:bg-slate-200 disabled:text-slate-400"
          disabled={!selected}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </div>
  )
}

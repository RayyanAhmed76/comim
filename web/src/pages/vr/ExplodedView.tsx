import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { VrShell } from '@/pages/vr/VrChrome'
import { components } from '@/data/mock'
import { cn } from '@/lib/cn'

const positions = [
  { x: -120, y: -80 },
  { x: 100, y: -100 },
  { x: -80, y: 60 },
  { x: 120, y: 40 },
  { x: -140, y: 120 },
  { x: 60, y: 130 },
]

export default function VrExplodedView() {
  const [active, setActive] = useState<number | null>(null)
  const [assembled, setAssembled] = useState(false)
  const navigate = useNavigate()

  return (
    <VrShell
      badge="Exploded View"
      backTo="/vr/menu"
      backLabel="Course menu"
      hints={['Pinch component for info', 'Grip to move parts']}
    >
      <div className="relative flex flex-1 flex-col">
        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-8">
          <div className="relative h-[380px] w-full max-w-3xl">
            {components.map((c, i) => {
              const pos = assembled ? { x: 0, y: i * 8 - 20 } : positions[i]
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActive(i)}
                  style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
                  className={cn(
                    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                    'rounded-2xl border border-sky-400/30 bg-navy-800/90 px-4 py-3 text-sm font-semibold shadow-lg',
                    'transition-all duration-700 ease-in-out',
                    active === i && 'ring-2 ring-orange-400',
                  )}
                >
                  {c.name}
                  {active === i && (
                    <div className="absolute -bottom-2 left-1/2 z-20 w-52 -translate-x-1/2 translate-y-full rounded-xl bg-white p-3 text-left text-xs font-normal text-ink shadow-xl">
                      <div className="font-bold">{c.name}</div>
                      <p className="mt-1 text-muted">{c.definition}</p>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-4 text-center">
          <Button
            variant="dark"
            onClick={() => {
              setAssembled((v) => !v)
              setActive(null)
            }}
          >
            {assembled ? 'Explode again' : 'Reassemble'}
          </Button>
          <Button variant="ghost" className="ml-3 text-white" onClick={() => navigate('/vr/menu')}>
            Done
          </Button>
        </div>
      </div>
    </VrShell>
  )
}

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/cn'
import { useTranslation } from 'react-i18next'

const DEMO_EMAIL = 'y.bakkali@eleves.imc-maritime.ma'

export default function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState('••••••••')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (login(email, password || 'demo')) {
      navigate('/student')
    } else {
      setError(t('student.fillDemo'))
    }
  }

  const fillDemo = () => {
    setEmail(DEMO_EMAIL)
    setPassword('demo')
    setError('')
  }

  return (
    <div className="grid-blueprint-glow flex min-h-screen flex-col text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <Logo />
        <LanguageSwitch variant="dark" />
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">COMIM Training</div>
            <h1 className="mt-2 text-2xl font-bold">{t('student.webModule')}</h1>
            <p className="mt-2 text-sm text-slate-400">{t('student.signIn')}</p>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-navy-900/70 p-6 shadow-xl backdrop-blur">
            {error && (
              <div className="mb-4 rounded-xl bg-orange-500/15 px-3 py-2 text-sm text-orange-200 ring-1 ring-orange-400/30">
                {error}
              </div>
            )}

            <label className="block text-sm font-medium text-slate-300">
              {t('student.email')}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'mt-1.5 w-full rounded-xl border border-white/15 bg-navy-950/80 px-4 py-2.5',
                  'text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30',
                )}
                placeholder="you@school.ma"
                required
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-slate-300">
              {t('student.password')}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  'mt-1.5 w-full rounded-xl border border-white/15 bg-navy-950/80 px-4 py-2.5',
                  'text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30',
                )}
                placeholder="••••••••"
                required
              />
            </label>

            <Button type="submit" className="mt-6 w-full">
              {t('student.signIn')}
            </Button>

            <button
              type="button"
              onClick={fillDemo}
              className="mt-3 w-full text-center text-xs text-sky-300 hover:text-sky-200"
            >
              {t('student.fillDemo')}
            </button>

            <Link to="#" className="mt-4 block text-center text-sm text-slate-400 hover:text-white">
              {t('student.forgotPassword')}
            </Link>
          </form>

          <Link to="/" className="mt-6 block text-center text-sm text-slate-400 hover:text-white">
            ← {t('student.backToRoles')}
          </Link>
        </div>
      </main>
    </div>
  )
}

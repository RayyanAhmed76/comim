import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, Headphones, Shield, UserCog, Users } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { LanguageSwitch } from '@/components/LanguageSwitch'
import { useAuth } from '@/context/AuthContext'
import type { Role } from '@/data/mock'
import { cn } from '@/lib/cn'
import { useTranslation } from 'react-i18next'

const roleMeta: {
  role: Role
  name: string
  roleKey: string
  icon: React.ComponentType<{ className?: string }>
  home: string
}[] = [
  { role: 'teacher', name: 'Mounia Ferhat', roleKey: 'roles.teacher', icon: GraduationCap, home: '/teacher' },
  { role: 'admin', name: 'Souhail Ouabi', roleKey: 'roles.admin', icon: UserCog, home: '/admin/users' },
  { role: 'platform', name: 'Rania Amrani', roleKey: 'roles.platform', icon: Shield, home: '/platform' },
  { role: 'student', name: 'Yassine Bakkali', roleKey: 'roles.student', icon: Users, home: '/student' },
]

export default function Home() {
  const { loginAs } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const enter = (role: Role, home: string) => {
    loginAs(role)
    navigate(home)
  }

  return (
    <div className="grid-blueprint-glow min-h-screen text-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5">
        <Logo />
        <LanguageSwitch variant="dark" />
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('home.title')}</h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">{t('home.subtitle')}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {roleMeta.map(({ role, name, roleKey, icon: Icon, home }) => (
            <button
              key={role}
              type="button"
              onClick={() => enter(role, home)}
              className={cn(
                'rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition',
                'hover:border-brand-500/50 hover:shadow-md hover:ring-2 hover:ring-brand-500/20',
              )}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
                  <Icon className="h-6 w-6 text-sky-500" />
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-bold text-navy-900">{name}</div>
                  <div className="text-sm text-slate-500">{t(roleKey)}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            to="/student/sign-in"
            className={cn(
              'inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold',
              'ring-1 ring-white/15 hover:bg-white/15',
            )}
          >
            {t('home.studentSignIn')}
          </Link>
          <Link
            to="/vr"
            className={cn(
              'inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 font-semibold',
              'shadow-lg hover:bg-brand-700',
            )}
          >
            <Headphones className="h-4 w-4" />
            {t('home.vrDemo')}
          </Link>
        </div>
      </main>
    </div>
  )
}

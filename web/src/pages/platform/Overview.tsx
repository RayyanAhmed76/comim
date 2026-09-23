import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Card, StatCard } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { establishments } from '@/data/mock'

const recentActivity = [
  { action: 'License renewed', target: 'Institut Maritime de Casablanca', time: 'Sep 17, 2026 · 14:22', author: 'Rania Amrani' },
  { action: 'New establishment', target: 'CFA Maritime de Safi', time: 'Sep 15, 2026 · 09:10', author: 'Rania Amrani' },
  { action: 'Plan upgrade', target: "Lycée Maritime d'Agadir → Establishment", time: 'Sep 12, 2026 · 16:45', author: 'Rania Amrani' },
  { action: 'Usage report exported', target: 'Q3 2026 — all establishments', time: 'Sep 10, 2026 · 11:30', author: 'Rania Amrani' },
]

const expiring = establishments.filter((e) => e.expiry.includes('2026')).slice(0, 3)

export default function PlatformOverview() {
  const { t } = useTranslation()

  return (
    <AppShell title={t('platform.overview')} breadcrumb={t('platform.platformOverview')}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={t('platform.establishments')} value={14} />
        <StatCard label={t('platform.studentsStat')} value="1,284" />
        <StatCard label={t('platform.licensesExpiring')} value={3} valueClassName="text-warning-600" />
        <StatCard label={t('platform.sessionsMonth')} value="6,940" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold">{t('platform.licensesExpiringSoon')}</h2>
            <p className="text-sm text-muted">{t('platform.expiringLicenses90')}</p>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-muted">
              <tr>
                <th className="px-5 py-2">{t('platform.establishments')}</th>
                <th className="px-5 py-2">{t('platform.plan')}</th>
                <th className="px-5 py-2">{t('platform.licenseExpiry')}</th>
              </tr>
            </thead>
            <tbody>
              {expiring.map((e) => (
                <tr key={e.id} className="border-t border-slate-100">
                  <td className="px-5 py-3">
                    <Link to={`/platform/establishments/${e.id}`} className="font-medium text-brand-600 hover:underline">
                      {e.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{e.plan}</td>
                  <td className="px-5 py-3">
                    <Badge tone="orange">{e.expiry}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-bold">{t('platform.recentActivity')}</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {recentActivity.map((a) => (
              <li key={a.time} className="px-5 py-3 text-sm">
                <div className="font-medium">{a.action}</div>
                <div className="text-muted">{a.target}</div>
                <div className="mt-1 text-xs text-slate-400">
                  {a.author} · {a.time}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  )
}

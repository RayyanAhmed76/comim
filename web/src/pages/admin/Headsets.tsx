import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Badge } from '@/components/ui/Badge'
import { Card, StatCard } from '@/components/ui/Card'
import { headsets } from '@/data/mock'

function headsetStatusLabel(status: string, t: (k: string) => string) {
  if (status === 'Connected') return t('common.connected')
  if (status === 'Offline') return t('common.offline')
  return status
}

export function Headsets() {
  const { t } = useTranslation()
  const connected = headsets.filter((h) => h.status === 'Connected').length
  const offline = headsets.filter((h) => h.status === 'Offline').length

  return (
    <AppShell breadcrumb={t('admin.headsetsTitle')}>
      <div className="space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-ink">{t('admin.headsetsTitle')}</h1>
          <p className="mt-1 text-sm text-muted">{t('admin.headsetsSubtitle')}</p>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label={t('common.connected')} value={connected} valueClassName="text-success-600" />
          <StatCard label={t('common.offline')} value={offline} valueClassName="text-muted" />
          <StatCard label={t('admin.total')} value={headsets.length} />
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-6 py-3">{t('admin.headsetId')}</th>
                  <th className="px-4 py-3">{t('common.status')}</th>
                  <th className="px-4 py-3">{t('admin.assignedClass')}</th>
                  <th className="px-4 py-3">{t('admin.lastConnected')}</th>
                  <th className="px-4 py-3">{t('admin.locationStudent')}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {headsets.map((headset) => (
                  <tr key={headset.id} className="border-b border-slate-100">
                    <td className="px-6 py-4 font-semibold text-ink">{headset.id}</td>
                    <td className="px-4 py-4">
                      <Badge tone={headset.status === 'Connected' ? 'green' : 'gray'} dot>
                        {headsetStatusLabel(headset.status, t)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-muted">{headset.assignedClass}</td>
                    <td className="px-4 py-4 text-muted">{headset.lastConnected}</td>
                    <td className="px-4 py-4 text-muted">
                      {headset.location ?? headset.student ?? '—'}
                    </td>
                    <td className="px-4 py-4">
                      <Link to={`/admin/headsets/${encodeURIComponent(headset.id)}`}>
                        <ChevronRight className="h-4 w-4 text-muted" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

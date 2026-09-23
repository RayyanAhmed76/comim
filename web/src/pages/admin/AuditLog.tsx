import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/Card'
import { auditSchool } from '@/data/mock'

export function AuditLog() {
  const { t } = useTranslation()

  return (
    <AppShell breadcrumb={t('admin.auditTitle')}>
      <div className="space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-ink">{t('admin.auditTitle')}</h1>
          <p className="mt-1 text-sm text-muted">
            Institut Maritime de Casablanca · {t('admin.auditSubtitle')}
          </p>
        </Card>

        {/* No PDF filter pills (Search / User / Profile / Class / Screen / Date) by design */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-muted">
                  <th className="px-6 py-3">{t('admin.author')}</th>
                  <th className="px-4 py-3">{t('admin.action')}</th>
                  <th className="px-4 py-3">{t('admin.target')}</th>
                  <th className="px-4 py-3">{t('admin.timestamp')}</th>
                </tr>
              </thead>
              <tbody>
                {auditSchool.map((entry, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-ink">{entry.author}</div>
                      <div className="text-xs text-muted">{entry.role}</div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-ink">{entry.action}</td>
                    <td className="px-4 py-4 text-muted">{entry.target}</td>
                    <td className="px-4 py-4 text-muted">{entry.time}</td>
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

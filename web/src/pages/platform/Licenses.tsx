import { useTranslation } from 'react-i18next'
import { AppShell } from '@/components/layout/AppShell'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

export default function Licenses() {
  const { t } = useTranslation()

  const plans = [
    {
      name: t('platform.discovery'),
      description: t('platform.discoveryDesc'),
      features: [
        { label: t('platform.featureWebModule'), included: true },
        { label: t('platform.featureVrModule'), included: false },
        { label: t('platform.featureLiveMonitoring'), included: false },
        { label: t('platform.featureTeacherDashboard'), included: true },
        { label: t('platform.featureBasicReports'), included: true },
        { label: t('platform.featureExtendedAudit'), included: false },
      ],
    },
    {
      name: t('platform.establishmentPlan'),
      description: t('platform.establishmentDesc'),
      features: [
        { label: t('platform.featureWebModule'), included: true },
        { label: t('platform.featureVrModule'), included: true },
        { label: t('platform.featureLiveMonitoring'), included: true },
        { label: t('platform.featureTeacherDashboard'), included: true },
        { label: t('platform.featureBasicReports'), included: true },
        { label: t('platform.featureExtendedAudit'), included: true },
      ],
    },
    {
      name: t('platform.custom'),
      description: t('platform.customDesc'),
      features: [
        { label: t('platform.featureWebModule'), included: true },
        { label: t('platform.featureVrModule'), included: true },
        { label: t('platform.featureLiveMonitoring'), included: true },
        { label: t('platform.featureTeacherDashboard'), included: true },
        { label: t('platform.featureBasicReports'), included: true },
        { label: t('platform.featureExtendedAudit'), included: true },
        { label: t('platform.featureCustomApi'), included: true },
        { label: t('platform.featureDedicatedSla'), included: true },
      ],
    },
  ]

  return (
    <AppShell title={t('platform.licensesTitle')} breadcrumb={t('platform.licensesTitle')}>
      <p className="mb-6 text-sm text-muted">{t('platform.comparePlans')}</p>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col p-6">
            <Badge tone="blue" className="w-fit">
              {plan.name}
            </Badge>
            <p className="mt-3 text-sm text-muted">{plan.description}</p>
            <ul className="mt-6 flex-1 space-y-2 text-sm">
              {plan.features.map((f) => (
                <li key={f.label} className="flex items-center gap-2">
                  <span
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded text-xs font-bold',
                      f.included ? 'bg-success-50 text-success-600' : 'bg-slate-100 text-slate-400',
                    )}
                  >
                    {f.included ? '✓' : '—'}
                  </span>
                  <span className={!f.included ? 'text-muted' : undefined}>{f.label}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </AppShell>
  )
}

import { Server, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { MetricCards } from '../core-components/metric-cards';

const metrics = [
  { id: 'total', title: 'Total de VMs', value: 150, icon: Server, trend: { value: '5%' } },
  { id: 'active', title: 'VMs Ativas', value: 142, icon: Activity, trend: { value: '98%' } },
  {
    id: 'warning',
    title: 'Com Alertas',
    value: 5,
    icon: AlertTriangle,
    trend: { value: '-2%', isPositive: false }
  },
  { id: 'healthy', title: 'Estáveis', value: 137, icon: CheckCircle, trend: { value: 'Estável' } }
];

export function Metrics() {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {metrics.map((metric) => (
        <MetricCards
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          trend={metric.trend}
        />
      ))}
    </section>
  );
}

import type { LucideIcon } from 'lucide-react';
import { Card } from '../components/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardsProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export function MetricCards({ title, value, icon: Icon, trend }: MetricCardsProps) {
  return (
    <Card className="flex justify-around md:justify-center items-center gap-4 w-full">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-action-primary flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-2 md:gap-0 md:flex-col">
        <span className="text-xs font-medium text-text-secondary">{title}</span>
        <span className="text-2xl font-bold text-text-primary leading-tight mt-0.5">{value}</span>
        {/* Indicador / Tendência opcional */}
        {trend && (
          <div
            className={`flex items-center gap-1 text-[11px] font-medium mt-1 ${
              trend.isPositive !== false ? 'text-status-success' : 'text-status-error'
            }`}
          >
            {trend.isPositive !== false ? (
              <ArrowUpRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

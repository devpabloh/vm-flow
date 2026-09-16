import { Card } from '../components/card';
import { Text } from '../components/text';
import { Button } from '../components/button';
import { Play, AlertTriangle, PowerOff, PlusCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ActivityType = 'started' | 'warning' | 'stopped' | 'created';

interface Activity {
  id: string;
  description: string;
  timestamp: string;
  type: ActivityType;
}

const activityConfig: Record<ActivityType, { icon: LucideIcon; bg: string; text: string }> = {
  started: {
    icon: Play,
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400'
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    text: 'text-amber-600 dark:text-amber-400'
  },
  stopped: {
    icon: PowerOff,
    bg: 'bg-red-500/10 dark:bg-red-500/20',
    text: 'text-red-600 dark:text-red-400'
  },
  created: {
    icon: PlusCircle,
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400'
  }
};

const latestUpdates: Activity[] = [
  {
    id: '1',
    description: 'VM web-server-01 foi iniciada',
    timestamp: 'há 12 minutos',
    type: 'started'
  },
  {
    id: '2',
    description: 'VM banco-dados-02 teve alta no uso de CPU',
    timestamp: 'há 28 minutos',
    type: 'warning'
  },
  {
    id: '3',
    description: 'VM api-gateway foi parada',
    timestamp: 'há 1 hora',
    type: 'stopped'
  },
  {
    id: '4',
    description: 'VM storage-01 foi criada',
    timestamp: 'há 2 horas',
    type: 'created'
  }
];

export function RecentActivities() {
  return (
    <Card className="w-full p-5 gap-2">
      <div className="flex items-center justify-between pb-4 border-b border-border-default">
        <Text variant="h2">Últimas atividades</Text>
        <Button variant="link" className="text-xs">
          Ver todos
        </Button>
      </div>

      <div className="divide-y">
        {latestUpdates.map((update) => {
          const Config = activityConfig[update.type];
          const Icon = Config.icon;
          return (
            <div
              key={update.id}
              className="flex items-center justify-between gap-4 py-3.5 first:pt-4 last:pb-0"
            >
              <div className="flex justify-between items-center gap-3 w-full">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${Config.bg} ${Config.text}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <Text
                    as="span"
                    variant="body-sm"
                    className="text-sm text-text-primary font-medium truncate"
                  >
                    {update.description}
                  </Text>
                </div>
                <Text
                  as="span"
                  variant="body-sm"
                  className="text-sm text-text-primary font-medium truncate"
                >
                  {update.timestamp}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

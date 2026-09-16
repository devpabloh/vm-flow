import { Button } from '../components/button';
import { Text } from '../components/text';
import { Plus } from 'lucide-react';

interface HeaderMonitoringProps{
  onNewVm: () => void;
}

export function HeaderMonitoring({onNewVm}:HeaderMonitoringProps) {
  return (
    <header className="p-4 flex items-center justify-between">
      <div>
        <Text as="h2" variant="h2">
          Monitoramento
        </Text>
        <Text as="span" variant="caption">
          Gerencie e visualize suas máquinas virtuais
        </Text>
      </div>
      <Button icon={Plus} className="text-white" onClick={onNewVm}>
        Virtual Machine
      </Button>
    </header>
  );
}

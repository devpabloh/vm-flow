import { Button } from '../components/button';
import { Text } from '../components/text';
import { Plus } from 'lucide-react';

export function HeaderMonitoring() {
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
      <Button icon={Plus} className="text-white">
        Virtual Machine
      </Button>
    </header>
  );
}

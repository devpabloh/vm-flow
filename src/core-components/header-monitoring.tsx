
import { Text } from '../components/text';

export function HeaderMonitoring() {
  return (
    <header className="px-8 py-6 flex items-center justify-between">
      <div>
        <Text as="h2" variant="h2">
          Monitoramento
        </Text>
        <Text as="span" variant="caption">
          Gerencie e visualize suas máquinas virtuais
        </Text>
      </div>
    </header>
  );
}

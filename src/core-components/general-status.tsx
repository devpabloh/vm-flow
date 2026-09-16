import { GaugeMeter } from '../components/GaugeMeter';
import { Card } from '../components/card';
import { Text } from '../components/text';

interface ResourceStatus {
  id: string;
  label: string;
  percentage: number;
  color: string; // Cor da barra ativa
  trackColor?: string; // Fundo da barra (trilha)
}

const resources: ResourceStatus[] = [
  {
    id: 'cpu',
    label: 'CPU',
    percentage: 42,
    color: '#0066FF', // Azul vibrante
    trackColor: '#E0EFFF' // Azul bem clarinho (ou via classe Tailwind)
  },
  {
    id: 'memory',
    label: 'Memória',
    percentage: 68,
    color: '#00D084', // Verde esmeralda
    trackColor: '#D7F8EC' // Verde bem clarinho
  },
  {
    id: 'storage',
    label: 'Armazenamento',
    percentage: 55,
    color: '#8B5CF6', // Roxo
    trackColor: '#EDE9FE' // Roxo bem clarinho
  }
];

export function GeneralStatus() {
  return (
    <Card className="w-full p-5 flex flex-col justify-between">
      {/* Cabeçalho alinhado à esquerda */}
      <div className="pb-4 border-b border-border-default">
        <Text as="h2" variant="h2" className="text-base font-bold text-text-primary">
          Status geral do ambiente
        </Text>
      </div>

      {/* Área dos Medidores com distribuição proporcional */}
      <div className="flex-1 grid grid-cols-3 items-center justify-items-center gap-2 py-6">
        {resources.map((item) => (
          <GaugeMeter
            key={item.id}
            label={item.label}
            percentage={item.percentage}
            color={item.color}
            trackColor={item.trackColor}
          />
        ))}
      </div>
    </Card>
  );
}

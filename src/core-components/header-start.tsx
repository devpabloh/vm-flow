import { useUser } from '../context/user-context';
import { Text } from '../components/text';
import { Skeleton } from '../components/skeleton';
import iconMachine from '../assets/virtual-machine.png';

export function HeaderStart() {
  const { user, loading } = useUser();

  if (loading) {
    return <Skeleton variant="title" />;
  }

  return (
    <header className="flex items-center justify-between">
      <div className="flex-1">
        <Text variant="h2">Olá, {user?.name}</Text>
        <Text variant="h3">Bem-vindo ao sistema de monitoramento de Máquinas Virtuais</Text>
        <Text variant="caption">Bem-vindo ao sistema de monitoramento de Máquinas Virtuais</Text>
      </div>
      <img src={iconMachine} alt="iconMachine" className="h-25 w-auto text-brand-primary" />
    </header>
  );
}

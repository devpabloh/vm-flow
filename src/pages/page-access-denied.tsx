import { useNavigate } from 'react-router';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { Text } from '../components/text';
import { Button } from '../components/button';
import { useUser } from '../context/user-context';
import { getRoleLabel } from '../auth/roles';

export function PageAccessDenied() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] p-8 gap-6 text-center max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-status-error/10 text-status-error flex items-center justify-center">
        <ShieldAlert className="w-8 h-8" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2">
        <Text as="h2" variant="h2">
          Acesso negado
        </Text>
        <Text variant="caption">
          {user ? `${user.name}, sua conta` : 'Sua conta'} não tem permissão para acessar esta
          área. Se você precisa desse acesso, fale com o administrador do sistema.
        </Text>
        {user && user.roles.length > 0 && (
          <Text variant="explanation">
            Seu perfil atual: {user.roles.map(getRoleLabel).join(', ')}
          </Text>
        )}
      </div>

      <Button icon={ArrowLeft} className="text-white" onClick={() => navigate('/')}>
        Voltar para o Início
      </Button>
    </section>
  );
}

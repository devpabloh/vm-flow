import { useUser } from '../context/user-context';
import { Skeleton } from '../components/skeleton';

interface ProfileFieldProps {
  id: string;
  label: string;
  value?: string;
  type?: 'text' | 'email';
}

// Campo somente leitura: os dados vêm do Entra ID e são editados lá, não aqui
function ProfileField({ id, label, value, type = 'text' }: ProfileFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-medium text-text-primary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value || 'Não informado'}
        readOnly
        className="w-full px-3 py-2 text-xs bg-background-primary border border-border-default rounded-lg text-text-secondary cursor-default focus:outline-none focus:ring-2 focus:ring-action-primary"
      />
    </div>
  );
}

export function TeamDashboard() {
  const { loading, user } = useUser();

  if (loading) {
    return (
      <div className="bg-background-secondary border border-border-default rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-border-default">
          <Skeleton variant="circular" className="w-16 h-16" />
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" className="w-40" />
            <Skeleton variant="text" className="w-28" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-14" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Junta só o que existir, para não mostrar "undefined • undefined"
  const subtitle = [user.jobTitle, user.department].filter(Boolean).join(' • ');

  return (
    <div className="bg-background-secondary border border-border-default rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-4 pb-6 border-b border-border-default">
        {user.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-action-primary flex items-center justify-center text-white text-xl font-bold shrink-0">
            {user.initials}
          </div>
        )}

        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-base font-semibold text-text-primary truncate">{user.name}</h3>
          {subtitle && <p className="text-xs text-text-secondary truncate">{subtitle}</p>}

          {user.roles.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {user.roles.map((role) => (
                <span
                  key={role}
                  className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-action-primary/10 text-action-primary border border-action-primary/20"
                >
                  {role}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileField id="profile-name" label="Nome Completo" value={user.name} />
        <ProfileField
          id="profile-email"
          label="E-mail Profissional"
          type="email"
          value={user.email}
        />
        <ProfileField id="profile-job-title" label="Cargo" value={user.jobTitle} />
        <ProfileField id="profile-department" label="Departamento" value={user.department} />
      </div>

      <p className="text-[11px] text-text-secondary">
        Esses dados vêm da sua conta Microsoft (Entra ID). Para alterá-los, fale com o
        administrador do seu tenant.
      </p>

      {/* Painel da Equipe */}
      <div className="p-4 bg-background-primary rounded-xl border border-border-default space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-text-primary">
            Cota de Recursos da Equipe (GSA)
          </span>
          <span className="text-[11px] text-action-primary font-medium">82% Utilizado</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-action-primary w-[82%]" />
        </div>
        <div className="flex justify-between text-[11px] text-text-secondary">
          <span>32 de 40 vCPUs alocadas</span>
          <span>128 GB de 160 GB RAM</span>
        </div>
      </div>
    </div>
  );
}

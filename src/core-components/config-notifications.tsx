import { useUser } from '../context/user-context';

export function ConfigNotifications() {
  const { user } = useUser();

  const notificationsData = [
    { id: 'n1', label: 'Alerta quando CPU da VM ultrapassar 90%', defaultChecked: true },
    { id: 'n2', label: 'Notificar no Slack quando uma nova VM for criada', defaultChecked: true },
    {
      id: 'n3',
      label: 'Receber relatório semanal de consumo de recursos por e-mail',
      description: user?.email ? `Enviado para ${user.email}` : undefined,
      defaultChecked: false
    }
  ];

  return (
    <div className="bg-background-secondary border border-border-default rounded-xl p-6 space-y-4 flex flex-col">
      <div>
        <h2 className="text-base font-semibold text-text-primary">Alertas e Notificações</h2>
        <p className="text-xs text-text-secondary">Defina quando a equipe deve ser alertada.</p>
      </div>
      {notificationsData.map((notification) => (
        <label
          key={notification.id}
          className="flex items-center gap-3 p-3 border border-border-default rounded-lg cursor-pointer bg-background-primary/30 hover:"
        >
          <input
            type="checkbox"
            defaultChecked={notification.defaultChecked}
            className="w-4 h-4 rounded text-action-primary focus:ring-action-primary"
          />
          <span className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-text-primary">{notification.label}</span>
            {notification.description && (
              <span className="text-[11px] text-text-secondary">{notification.description}</span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
}

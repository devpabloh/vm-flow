export function DefaultsVirtualMachines() {
  const defaultRegions = [
    { value: '', label: 'Selecione...' },
    { value: 'sa-east-1', label: 'São Paulo (Latin America)' }
  ];

  const defaultSystemOperacional = [
    { value: '', label: 'Selecione...' },
    { value: 'ubuntu-24.04', label: 'Ubuntu 24.04 LTS (x86_64)' },
    { value: 'debian-12', label: 'Debian 12 Bookworm' },
    { value: 'alpine-3.20', label: 'Alpine Linux 3.20' },
    { value: 'rocky-9', label: 'Rocky Linux 9' }
  ];

  return (
    <div className="bg-background-secondary border border-border-default rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-text-primary">preset de provisionamento</h2>
        <p className="text-xs text-text-secondary">
          configurações pré-selecionas ao instanciar uma nova máquina virtual na equipe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-text-primary">Região Padrão</label>
          <select className="w-full px-3 py-2 text-xs bg-background-primary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary">
            {defaultRegions.map((defaultRegion) => (
              <option value={defaultRegion.value}>{defaultRegion.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-text-primary">
            Sistema Operacional Padrão
          </label>
          <select className="w-full px-3 py-2 text-xs bg-background-primary border border-border-default rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary">
            {defaultSystemOperacional.map((defaultSystemOperacional) => (
              <option value={defaultSystemOperacional.value}>
                {defaultSystemOperacional.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Text } from '../components/text';
import type { VirtualMachine, ServiceItem, ServiceType, VmStatus } from '../types/topology';
import {
  X,
  Plus,
  Trash2,
  Server,
  Layers,
  Link2,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react';

interface EditVmModalProps {
  vm: VirtualMachine | null;
  availableVms?: VirtualMachine[];
  onClose: () => void;
  onSave: (vm: VirtualMachine) => void;
}

const SERVICE_TYPE_OPTIONS: { value: ServiceType; label: string; defaultName: string; defaultDesc: string }[] = [
  { value: 'redis', label: 'Redis (Cache)', defaultName: 'Redis Cache', defaultDesc: 'Porta 6379' },
  { value: 'database', label: 'PostgreSQL (Banco)', defaultName: 'PostgreSQL', defaultDesc: 'Porta 5432' },
  { value: 'api', label: 'API / Microserviço', defaultName: 'Node.js API', defaultDesc: 'Express Backend' },
  { value: 'custom', label: 'Outro Serviço', defaultName: 'Serviço Customizado', defaultDesc: 'Porta 8080' }
];

export function EditVmModal({ vm, availableVms = [], onClose, onSave }: EditVmModalProps) {
  const isEditing = Boolean(vm);

  const [name, setName] = useState(vm?.name ?? '');
  const [status, setStatus] = useState<VmStatus>(vm?.status ?? 'running');
  const [cpu, setCpu] = useState(vm?.cpu ?? 10);
  const [memory, setMemory] = useState(vm?.memory ?? 16);
  const [disk, setDisk] = useState(vm?.disk ?? 50);
  const [services, setServices] = useState<ServiceItem[]>(
    vm?.services ? JSON.parse(JSON.stringify(vm.services)) : []
  );

  // Outras VMs disponíveis para interligação (exclui a própria máquina)
  const otherVms = availableVms.filter((v) => v.id !== vm?.id);

  function handleAddService() {
    const defaultOption = SERVICE_TYPE_OPTIONS[0];
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      name: defaultOption.defaultName,
      type: defaultOption.value,
      description: defaultOption.defaultDesc,
      connectedVmIds: []
    };
    setServices((prev) => [...prev, newService]);
  }

  function handleUpdateService<K extends keyof ServiceItem>(index: number, field: K, value: ServiceItem[K]) {
    setServices((prev) => {
      const updated = [...prev];
      const current = updated[index];

      if (field === 'type') {
        const option = SERVICE_TYPE_OPTIONS.find((opt) => opt.value === value);
        updated[index] = {
          ...current,
          type: value as ServiceType,
          name: option ? option.defaultName : current.name,
          description: option ? option.defaultDesc : current.description
        };
      } else {
        updated[index] = {
          ...current,
          [field]: value
        };
      }
      return updated;
    });
  }

  function handleRemoveService(index: number) {
    setServices((prev) => prev.filter((_, i) => i !== index));
  }

  function handleToggleConnection(serviceIndex: number, targetVmId: string) {
    if (!targetVmId) return;

    setServices((prev) => {
      const updated = [...prev];
      const service = updated[serviceIndex];
      const currentConnections = service.connectedVmIds || [];

      const exists = currentConnections.includes(targetVmId);
      const newConnections = exists
        ? currentConnections.filter((id) => id !== targetVmId)
        : [...currentConnections, targetVmId];

      updated[serviceIndex] = {
        ...service,
        connectedVmIds: newConnections
      };
      return updated;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const vmData: VirtualMachine = {
      id: vm?.id ?? crypto.randomUUID(),
      ip: vm?.ip || `10.0.1.${Math.floor(Math.random() * 200 + 10)}`,
      status,
      name: name.trim() || 'Nova VM',
      cpu,
      memory,
      disk,
      services
    };

    onSave(vmData);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] bg-background-secondary rounded-2xl border border-border-default shadow-2xl flex flex-col overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="p-5 border-b border-border-default flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-action-primary/10 text-action-primary">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <Text as="h2" variant="h4" className="font-bold">
                {isEditing ? 'Editar Máquina Virtual' : 'Nova Máquina Virtual'}
              </Text>
              <Text as="p" variant="caption" className="text-xs">
                {isEditing
                  ? `Atualize as configurações e serviços de ${vm?.name}`
                  : 'Preencha os recursos e serviços para cadastrar'}
              </Text>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário com rolagem interna */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Seção 1: Informações Gerais */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-text-secondary">
                  Nome da Máquina Virtual
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: web-server-01, api-gateway"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 text-sm rounded-lg border border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-action-primary transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary">Status Inicial</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as VmStatus)}
                  className="w-full mt-1.5 px-3 py-2 text-sm rounded-lg border border-border-default bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary transition-all"
                >
                  <option value="running">Em Execução</option>
                  <option value="stopped">Desligada</option>
                  <option value="maintenance">Manutenção</option>
                </select>
              </div>
            </div>

            {/* Seção 2: Recursos (CPU, Memória, Disco) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5" htmlFor="cpu">
                  <Cpu className="w-3.5 h-3.5 text-action-primary" />
                  CPU (%)
                </label>
                <input
                  id="cpu"
                  type="number"
                  min="0"
                  max="100"
                  value={cpu}
                  onChange={(e) => setCpu(Number(e.target.value))}
                  className="w-full mt-1.5 px-3 py-2 text-sm rounded-lg border border-border-default bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5" htmlFor="memory">
                  <Layers className="w-3.5 h-3.5 text-action-primary" />
                  Memória (GB)
                </label>
                <input
                  id="memory"
                  type="number"
                  min="1"
                  value={memory}
                  onChange={(e) => setMemory(Number(e.target.value))}
                  className="w-full mt-1.5 px-3 py-2 text-sm rounded-lg border border-border-default bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary flex items-center gap-1.5" htmlFor="disk">
                  <HardDrive className="w-3.5 h-3.5 text-action-primary" />
                  Disco (GB)
                </label>
                <input
                  id="disk"
                  type="number"
                  min="1"
                  value={disk}
                  onChange={(e) => setDisk(Number(e.target.value))}
                  className="w-full mt-1.5 px-3 py-2 text-sm rounded-lg border border-border-default bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Seção 3: Serviços e Topologia */}
          <div className="space-y-3 pt-3 border-t border-border-default">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-action-primary" />
                  <label className="text-xs font-bold text-text-primary">
                    Serviços & Conexões da VM
                  </label>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-action-primary/10 text-action-primary">
                    {services.length}
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Defina os serviços desta máquina e suas conexões remotas com outras VMs
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddService}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-action-primary hover:text-white hover:bg-action-primary border border-action-primary/30 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar Serviço
              </button>
            </div>

            {/* Lista de serviços cadastrados */}
            {services.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 border border-dashed border-border-default rounded-xl bg-background-primary/30 text-center">
                <Layers className="w-8 h-8 text-text-secondary/40 mb-2" />
                <p className="text-xs font-medium text-text-secondary">
                  Nenhum serviço configurado nesta máquina virtual.
                </p>
                <p className="text-[11px] text-text-secondary/70 mt-1">
                  Clique em "+ Adicionar Serviço" para vincular bancos, caches ou APIs à topologia.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {services.map((service, index) => {
                  const connectedIds = service.connectedVmIds || [];

                  return (
                    <div
                      key={service.id || index}
                      className="p-3.5 rounded-xl border border-border-default bg-background-primary/60 dark:bg-white/[0.02] space-y-3 transition-all hover:border-border-default/80"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-1">
                          <select
                            value={service.type}
                            onChange={(e) => handleUpdateService(index, 'type', e.target.value as ServiceType)}
                            className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border-default bg-background-primary text-text-primary focus:outline-none focus:ring-1 focus:ring-action-primary"
                          >
                            {SERVICE_TYPE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>

                          <input
                            type="text"
                            placeholder="Nome do serviço (ex: Redis Cache)"
                            value={service.name}
                            onChange={(e) => handleUpdateService(index, 'name', e.target.value)}
                            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-action-primary"
                          />
                        </div>

                        <button
                          type="button"
                          title="Remover serviço"
                          onClick={() => handleRemoveService(index)}
                          className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="text-[10px] font-semibold text-text-secondary block mb-1">
                            Descrição / Porta
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Porta 6379, Express API"
                            value={service.description ?? ''}
                            onChange={(e) => handleUpdateService(index, 'description', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-action-primary"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-semibold text-text-secondary flex items-center gap-1 mb-1">
                            <Link2 className="w-3 h-3 text-action-primary" />
                            Interligar com outra VM
                          </label>
                          <select
                            value=""
                            onChange={(e) => handleToggleConnection(index, e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-border-default bg-background-primary text-text-primary focus:outline-none focus:ring-1 focus:ring-action-primary"
                          >
                            <option value="">+ Conectar a uma VM...</option>
                            {otherVms.map((otherVm) => {
                              const isConnected = connectedIds.includes(otherVm.id);
                              return (
                                <option key={otherVm.id} value={otherVm.id}>
                                  {isConnected ? `✓ ${otherVm.name} (Conectada)` : otherVm.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>

                      {/* Tags de VMs interligadas a este serviço */}
                      {connectedIds.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-text-secondary">Conectado a:</span>
                          {connectedIds.map((targetId) => {
                            const targetVm = availableVms.find((v) => v.id === targetId);
                            return (
                              <span
                                key={targetId}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                              >
                                {targetVm ? targetVm.name : `VM #${targetId}`}
                                <button
                                  type="button"
                                  title="Remover conexão"
                                  onClick={() => handleToggleConnection(index, targetId)}
                                  className="hover:text-red-500 ml-0.5 font-bold cursor-pointer"
                                >
                                  ×
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Rodapé com botões de ação */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-border-default">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-action-primary hover:bg-action-primary/90 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Máquina'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

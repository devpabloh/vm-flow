import { useState } from 'react';
import { Card } from '../components/card';
import { Button } from '../components/button';
import { Text } from '../components/text';
import { VMTable } from './vm-table';
import { Plus, Network, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import type { Application, VirtualMachine } from '../types/topology';

interface ApplicationCardProps {
  application: Application;
  onAddVm: (applicationId: string) => void;
  onViewRamifications: (application: Application) => void;
  onEditVm: (applicationId: string, vm: VirtualMachine) => void;
  onDeleteVm: (applicationId: string, vm: VirtualMachine) => void;
}

export function ApplicationCard({
  application,
  onAddVm,
  onViewRamifications,
  onEditVm,
  onDeleteVm,
}: ApplicationCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="flex flex-col gap-3 p-4 border border-border-default/80">
      {/* Cabeçalho da Aplicação */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border-default/60">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer text-text-secondary"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          <div className="p-2 rounded-lg bg-action-primary/10 text-action-primary">
            <Layers className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Text as="h3" variant="h3" className="font-semibold text-text-primary text-base">
                {application.name}
              </Text>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-white/10 text-text-secondary">
                {application.vms.length} {application.vms.length === 1 ? 'VM' : 'VMs'}
              </span>
            </div>
            {application.description && (
              <Text as="p" variant="caption" className="text-xs text-text-secondary">
                {application.description}
              </Text>
            )}
          </div>
        </div>

        {/* Botões de Ação da Aplicação */}
        <div className="flex items-center gap-2">
          {/* Botão para Visualizar as Ramificações da Aplicação */}
          <Button
            type="button"
            icon={Network}
            className="text-xs py-1.5 px-3 bg-slate-100 dark:bg-white/10 text-text-primary hover:bg-slate-200 dark:hover:bg-white/15"
            onClick={() => onViewRamifications(application)}
          >
            Ramificações
          </Button>

          {/* Botão para Adicionar VM a esta Aplicação */}
          <Button
            type="button"
            icon={Plus}
            className="text-xs py-1.5 px-3 text-white"
            onClick={() => onAddVm(application.id)}
          >
            Adicionar VM
          </Button>
        </div>
      </div>

      {/* Conteúdo: Tabela de VMs ou Estado Vazio */}
      {isOpen && (
        <div>
          {application.vms.length > 0 ? (
            <VMTable
              vms={application.vms}
              onEdit={(vm) => onEditVm(application.id, vm)}
              onDelete={(vm) => onDeleteVm(application.id, vm)}
            />
          ) : (
            <div className="py-8 text-center border border-dashed border-border-default rounded-xl">
              <Text as="p" variant="caption" className="text-text-secondary mb-3">
                Nenhuma VM associada a esta aplicação ainda.
              </Text>
              <Button
                icon={Plus}
                className="text-xs text-white"
                onClick={() => onAddVm(application.id)}
              >
                Criar primeira VM
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

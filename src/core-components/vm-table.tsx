import { useState } from 'react';
import { EditVmModal } from './edit-vm-modal';
import { type VirtualMachine, mockVMs } from '../types/topology';

import {
  Pencil,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsRight
} from 'lucide-react';
import { Card } from '../components/card';
import { Text } from '../components/text';

interface VMTableProps {
  vms?: VirtualMachine[];
  onEdit: (vm: VirtualMachine) => void;
  onDelete: (vm: VirtualMachine) => void;
}

export function VMTable({ onEdit, onDelete, vms = mockVMs }: VMTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingVm, setEditingVm] = useState<VirtualMachine | null>(null);

  // Selecionar todos os checkboxes
  function handleSelectAll(checked: boolean) {
    if (checked) {
      setSelectedIds(vms.map((vm) => vm.id));
    } else {
      setSelectedIds([]);
    }
  }

  // Alternar checkbox individual
  function handleSelectOne(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const isAllSelected = vms.length > 0 && selectedIds.length === vms.length;

  function handleCloseEditModal() {
    setEditingVm(null);
  }

  return (
    <Card className="w-full overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          {/* Cabeçalho da Tabela */}
          <thead>
            <tr className="border-b border-border-default text-xs font-semibold text-text-secondary">
              <th className="py-3.5 pl-5 pr-3 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border-default text-action-primary focus:ring-action-primary cursor-pointer w-4 h-4"
                />
              </th>
              <th className="py-3.5 px-4 font-semibold text-text-secondary">Nome</th>
              <th className="py-3.5 px-4 font-semibold text-text-secondary">IP</th>
              <th className="py-3.5 px-4 font-semibold text-text-secondary">Status</th>
              <th className="py-3.5 px-4 font-semibold text-text-secondary">CPU</th>
              <th className="py-3.5 px-4 font-semibold text-text-secondary">Memória</th>
              <th className="py-3.5 px-4 font-semibold text-text-secondary">Disco</th>
              <th className="py-3.5 px-4 text-center font-semibold text-text-secondary">Ações</th>
              <th className="py-3.5 pr-5 pl-2 text-right">
                <button type="button" className="text-text-secondary hover:text-text-primary">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </th>
            </tr>
          </thead>

          {/* Linhas da Tabela */}
          <tbody className="divide-y border-border-default/60 text-sm">
            {vms.map((vm) => {
              const isChecked = selectedIds.includes(vm.id);
              const isRunning = vm.status === 'running';

              return (
                <tr
                  key={vm.id}
                  className={`transition-colors hover:bg-slate-50/70 dark:hover:bg-white/5 ${
                    isChecked ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <td className="py-3.5 pl-5 pr-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSelectOne(vm.id)}
                      className="rounded border-border-default text-action-primary focus:ring-action-primary cursor-pointer w-4 h-4"
                    />
                  </td>

                  <td className="py-3.5 px-4 font-medium text-text-primary whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ring-4 ${
                          isRunning
                            ? 'bg-emerald-500 ring-emerald-500/20'
                            : 'bg-red-500 ring-red-500/20'
                        }`}
                      />
                      <span>{vm.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">{vm.ip}</td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isRunning
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isRunning ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                      />
                      {isRunning ? 'Em execução' : 'Desligada'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">{vm.cpu}%</td>

                  <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">
                    {vm.memory}%
                  </td>

                  <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">{vm.disk}%</td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-3 text-text-secondary">
                      <button
                        type="button"
                        title="Visualizar Topologia"
                        className="hover:text-red-400 transition-colors cursor-pointer"
                        onClick={() => onDelete?.(vm)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Excluir VM"
                        className="hover:text-action-primary transition-colors cursor-pointer"
                        onClick={() => onEdit(vm)}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 pr-5 pl-2 text-right whitespace-nowrap">
                    <button
                      type="button"
                      title="Mais opções"
                      className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border-default">
        <Text as="span" variant="caption" className="text-xs text-text-secondary">
          Mostrando {vms.length} VMs
        </Text>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="p-1.5 rounded-lg border border-border-default text-text-secondary hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
              currentPage === 1
                ? 'bg-action-primary text-white shadow-sm'
                : 'text-text-secondary hover:bg-slate-50 dark:hover:bg-white/5'
            }`}
          >
            1
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
              currentPage === 2
                ? 'bg-action-primary text-white shadow-sm'
                : 'text-text-secondary hover:bg-slate-50 dark:hover:bg-white/5'
            }`}
          >
            2
          </button>

          <button
            type="button"
            className="p-1.5 rounded-lg border border-border-default text-text-secondary hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="p-1.5 rounded-lg border border-border-default text-text-secondary hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      {editingVm && (
        <EditVmModal
          vm={editingVm}
          availableVms={vms}
          onClose={handleCloseEditModal}
          onSave={(updatedVm) => {
            console.log('dados atualizados', updatedVm);
            handleCloseEditModal();
          }}
        />
      )}
    </Card>
  );
}

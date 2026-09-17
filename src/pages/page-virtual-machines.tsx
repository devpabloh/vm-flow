import { HeaderMonitoring } from '../core-components/header-monitoring';
import { VMTable } from '../core-components/vm-table';
import { useState } from 'react';
import { type VirtualMachine, mockVMs } from '../types/topology';
import { EditVmModal } from '../core-components/edit-vm-modal';
import { TopologyModal } from '../core-components/topology-modal';

export function PageVirtualMachines() {
  const [vms, setVms] = useState<VirtualMachine[]>(mockVMs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVm, setSelectedVm] = useState<VirtualMachine | null>(null);
  const [topologyVm, setTopologyVm] = useState<VirtualMachine | null>(null);

  function handleOpenCreate() {
    setSelectedVm(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(vm: VirtualMachine) {
    setSelectedVm(vm);
    setIsModalOpen(true);
  }

  function handleClose() {
    setIsModalOpen(false);
    setSelectedVm(null);
  }

  function handleSave(vmData: VirtualMachine) {
    if (selectedVm) {
      setVms((prev) => prev.map((v) => (v.id === vmData.id ? vmData : v)));
    } else {
      setVms((prev) => [vmData, ...prev]);
    }
    handleClose();
  }

  return (
    <div className="flex flex-col gap-4">
      <HeaderMonitoring onNewVm={handleOpenCreate} />
      <main className="p-4 pt-0">
        <VMTable
          vms={vms}
          onEdit={handleOpenEdit}
          onViewTopology={setTopologyVm}
        />
      </main>

      {isModalOpen && (
        <EditVmModal
          vm={selectedVm}
          availableVms={vms}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}

      {topologyVm && (
        <TopologyModal
          vm={topologyVm}
          allVms={vms}
          onClose={() => setTopologyVm(null)}
        />
      )}
    </div>
  );
}

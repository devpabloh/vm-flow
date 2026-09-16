import { HeaderMonitoring } from '../core-components/header-monitoring';
import { VMTable } from '../core-components/vm-table';
import {useState} from 'react';
import type {VirtualMachine} from '../core-components/vm-table';
import { EditVmModal } from '../core-components/edit-vm-modal';


export function PageVirtualMachines() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVm, setSelectedVm] = useState<VirtualMachine | null>(null);

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
      console.log('Editando VM existente:', vmData);
      
    } else {
      console.log('Cadastrando nova VM:', vmData);
     
    }
    handleClose();
  }


  return (
      <div className="flex flex-col gap-4">
      
      <HeaderMonitoring onNewVm={handleOpenCreate} />
      <main className="p-4 pt-0">
        
        <VMTable onEdit={handleOpenEdit} />
      </main>
      
      {isModalOpen && (
        <EditVmModal
          vm={selectedVm}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

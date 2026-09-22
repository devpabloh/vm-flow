import { useState } from 'react';
import { HeaderMonitoring } from '../core-components/header-monitoring';
import { ApplicationCard } from '../core-components/application-card';
import { EditVmModal } from '../core-components/edit-vm-modal';
import { TopologyModal } from '../core-components/topology-modal';
import { type Application, type VirtualMachine, mockApplications } from '../types/topology';

export function PageVirtualMachines() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetAppId, setTargetAppId] = useState<string | null>(null);
  const [selectedVm, setSelectedVm] = useState<VirtualMachine | null>(null);
  const [selectedAppForTopology, setSelectedAppForTopology] = useState<Application | null>(null);

  // Exemplo de chamada à API quando você tiver a rota pronta:
  /*
  useEffect(() => {
    async function fetchApps() {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data);
    }
    fetchApps();
  }, []);
  */

  // Abrir modal para adicionar nova VM em uma aplicação específica
  function handleOpenCreateVm(applicationId: string) {
    setTargetAppId(applicationId);
    setSelectedVm(null);
    setIsModalOpen(true);
  }

  // Abrir modal para editar uma VM
  function handleOpenEditVm(applicationId: string, vm: VirtualMachine) {
    setTargetAppId(applicationId);
    setSelectedVm(vm);
    setIsModalOpen(true);
  }

  // Deletar VM
  function handleDeleteVm(applicationId: string, vm: VirtualMachine) {
    if (confirm(`Deseja realmente excluir a máquina ${vm.name}?`)) {
      setApplications((prev) =>
        prev.map((app) => {
          if (app.id !== applicationId) return app;
          return {
            ...app,
            vms: app.vms.filter((item) => item.id !== vm.id)
          };
        })
      );
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedVm(null);
    setTargetAppId(null);
  }

  // Salvar VM (criar ou editar) na aplicação correspondente
  function handleSaveVm(vmData: VirtualMachine) {
    if (!targetAppId) return;

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== targetAppId) return app;

        const vmExists = app.vms.some((v) => v.id === vmData.id);
        const updatedVms = vmExists
          ? app.vms.map((v) => (v.id === vmData.id ? vmData : v))
          : [vmData, ...app.vms];

        return { ...app, vms: updatedVms };
      })
    );

    handleCloseModal();
  }

  // Todas as VMs do sistema (caso o modal de edição precise para seleção de vínculos)
  const allVms = applications.flatMap((app) => app.vms);

  return (
    <div className="flex flex-col gap-4">
      <HeaderMonitoring onNewVm={() => {
        // Se houver aplicações, pode abrir para a primeira ou abrir um modal de selecionar app
        if (applications.length > 0) handleOpenCreateVm(applications[0].id);
      }} />

      <main className="p-4 pt-0 flex flex-col gap-6">
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onAddVm={handleOpenCreateVm}
            onViewRamifications={setSelectedAppForTopology}
            onEditVm={handleOpenEditVm}
            onDeleteVm={handleDeleteVm}
          />
        ))}
      </main>

      {/* Modal de Criação / Edição de VM */}
      {isModalOpen && (
        <EditVmModal
          vm={selectedVm}
          availableVms={allVms}
          onClose={handleCloseModal}
          onSave={handleSaveVm}
        />
      )}

      {/* Modal de Topologia das Ramificações da Aplicação */}
      {selectedAppForTopology && (
        <TopologyModal
          // Dica: você pode passar a primeira VM ou adaptar o modal para aceitar a aplicação inteira
          vm={selectedAppForTopology.vms[0]}
          allVms={selectedAppForTopology.vms}
          onClose={() => setSelectedAppForTopology(null)}
        />
      )}
    </div>
  );
}

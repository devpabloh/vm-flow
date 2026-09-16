import { HeaderMonitoring } from '../core-components/header-monitoring';
import { VMTable } from '../core-components/vm-table';

export function PageVirtualMachines() {
  return (
    <div className="flex flex-col gap-4">
      <HeaderMonitoring />
      <main className="p-4 pt-0">
        <VMTable />
      </main>
    </div>
  );
}

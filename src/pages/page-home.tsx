import { HeaderStart } from '../core-components/header-start';
import { Metrics } from '../core-components/metrics';
import { RecentActivities } from '../core-components/recent-activities';
import { GeneralStatus } from '../core-components/general-status';

export function PageHome() {
  return (
    <div className="flex flex-col gap-3 p-4">
      <HeaderStart />
      <Metrics />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <RecentActivities />
        <GeneralStatus />
      </div>
    </div>
  );
}

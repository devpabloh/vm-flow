import { StatusBadge } from '../components/StatusBadge';
import { ResourceBar } from '../components/ResourceBar';
import { GaugeMeter } from '../components/GaugeMeter';
import { Button } from '../components/button';
import { DefaultInput } from '../components/default-input';

export function PageHome() {
  return (
    <>
      <StatusBadge status="running" />
      <StatusBadge status="stopped" />
      <StatusBadge status="alert" />
      <ResourceBar name="CPU" percentage={80} />
      <ResourceBar name="RAM" percentage={60} />
      <ResourceBar name="Disco" percentage={40} />
      <GaugeMeter percentage={60} label="CPU" />
      <GaugeMeter percentage={80} label="RAM" />
      <GaugeMeter percentage={40} label="Disco" />
      <Button>Primary</Button>
      <DefaultInput />
    </>
  );
}

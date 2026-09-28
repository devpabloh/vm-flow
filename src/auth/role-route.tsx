import { Outlet } from 'react-router';
import { useRoles } from './use-roles';
import { PageAccessDenied } from '../pages/page-access-denied';

export function RoleRoute({ allowed }: { allowed: string[] }) {
  const { hasRole } = useRoles();

  return hasRole(...allowed) ? <Outlet /> : <PageAccessDenied />;
}

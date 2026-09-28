import type { ReactNode } from 'react';
import { useRoles } from './use-roles';

export function HasRole({ allowed, children }: { allowed: string[]; children: ReactNode }) {
  const { hasRole } = useRoles();
  return hasRole(...allowed) ? <>{children}</> : null;
}
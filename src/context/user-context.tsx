import { createContext, useState, useContext, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { getMe, getMyPhoto } from '../auth/graph';

export interface User {
  id: string;
  name: string;
  givenName?: string;
  email: string;
  role: string;
  roles: string[];
  jobTitle?: string;
  department?: string;
  initials: string;
  photo?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const {instance, accounts, inProgress} = useMsal();
  const account = instance.getActiveAccount() ?? accounts[0];
  const accountId = account?.homeAccountId;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inProgress !== InteractionStatus.None) return;
    if (!account) {
      setUser(null);
      setLoading(false);
      return;
    }

    const roles = (account.idTokenClaims?.roles as string[] | undefined) ?? [];
    const fromClaims = {
      id: account.localAccountId,
      name: account.name ?? '',
      email: account.username,
      role: roles[0] ?? '',
      roles
    };
    let cancelled = false;

    Promise.all([
      getMe(instance, account),
      
      getMyPhoto(instance, account).catch(() => null)
    ])
      .then(([me, photo]) => {
        if (cancelled) return;
        const name = me.displayName ?? fromClaims.name;
        setUser({
          ...fromClaims,
          name,
          givenName: me.givenName,
          email: me.mail ?? me.userPrincipalName ?? fromClaims.email,
          jobTitle: me.jobTitle,
          department: me.department,
          initials: getInitials(name),
          photo: photo ?? undefined
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar usuário', error);
        
        if (!cancelled) setUser({ ...fromClaims, initials: getInitials(fromClaims.name) });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    
  }, [instance, accountId, inProgress]);

  return <UserContext.Provider value={{ user, loading, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }

  return context;
}

import { createContext, useState, useContext, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  role: string;
  initials: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        // const response = await fetch('/api/me');
        // const data = await response.json();

        const fetchName = 'Pablo Henrique';

        setUser({
          name: fetchName,
          email: 'pablo@empresa.com',
          role: 'Administrador',
          initials: getInitials(fetchName)
        });
      } catch (error) {
        console.error('Erro ao carregar usuário', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentUser();
  }, []);

  return <UserContext.Provider value={{ user, loading, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }

  return context;
}

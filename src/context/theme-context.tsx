import { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface themeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDarkmode: boolean;
}

const themeContext = createContext<themeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('theme') as ThemeMode) || 'system';
  });

  const [isDarkmode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && systemQuery.matches);

      setIsDarkMode(isDark);

      root.classList.toggle('dark', isDark);
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    const handleSystemChange = () => {
      if (theme === 'system') applyTheme();
    };

    systemQuery.addEventListener('change', handleSystemChange);
    return () => systemQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme, isDarkmode }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}

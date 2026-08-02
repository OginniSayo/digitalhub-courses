// ThemeContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Theme = 'silk' | 'abyss';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'digital-courses-theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>((): Theme => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === 'abyss' || saved === 'silk') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'abyss' : 'silk';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'silk' ? 'abyss' : 'silk'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
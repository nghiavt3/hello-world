'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: string;
    darkMode: boolean;
    modalOpen: boolean;
  };
  setTheme: (theme: Partial<ThemeContextProps['theme']>) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: {
    primaryColor: '#4F46E5',
    backgroundColor: '#F3F4F6',
    textColor: '#111827',
    borderRadius: '0.5rem',
    darkMode: false,
    modalOpen: false,
  },
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeContextProps['theme']>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme
        ? JSON.parse(storedTheme)
        : {
            primaryColor: '#4F46E5',
            backgroundColor: '#F3F4F6',
            textColor: '#111827',
            borderRadius: '0.5rem',
            darkMode: false,
            modalOpen: false,
          };
    }
    return {
      primaryColor: '#4F46E5',
      backgroundColor: '#F3F4F6',
      textColor: '#111827',
      borderRadius: '0.5rem',
      darkMode: false,
      modalOpen: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const updateTheme = (newTheme: Partial<ThemeContextProps['theme']>) => {
    setTheme((prevTheme) => ({ ...prevTheme, ...newTheme }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

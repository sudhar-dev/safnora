import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

type ColorSchemeName = 'light' | 'dark';

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  colors: typeof Colors.dark;
  toggleTheme: () => void;
  setTheme: (scheme: ColorSchemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'dark',
  colors: Colors.dark,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceScheme = useDeviceColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    deviceScheme === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    if (deviceScheme) {
      setColorScheme(deviceScheme === 'light' ? 'light' : 'dark');
    }
  }, [deviceScheme]);

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (scheme: ColorSchemeName) => {
    setColorScheme(scheme);
  };

  const colors = Colors[colorScheme];

  return (
    <ThemeContext.Provider value={{ colorScheme, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);

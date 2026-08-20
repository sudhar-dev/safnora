import React, { createContext, useContext } from "react";
import { Colors } from "@/constants/theme";

type ColorSchemeName = "light";

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  colors: typeof Colors.light;
  toggleTheme: () => void;
  setTheme: (scheme: ColorSchemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colorScheme: "light",
  colors: Colors.light,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme: ColorSchemeName = "light";
  const colors = Colors.light;

  return (
    <ThemeContext.Provider
      value={{ colorScheme, colors, toggleTheme: () => {}, setTheme: () => {} }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (isDarkMode === null) return;
    const html = document.documentElement;
    if (isDarkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  if (isDarkMode === null) return null;

  // Dynamic MUI theme
  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#2a1a2a" : "#20b99b",
      },
      // background: {
      //   default: isDarkMode ? "#2a1a2a" : "#ffffff",
      // },
    },
    typography: {
      fontFamily: "unset",
      button: {
        textTransform: "unset",
      },
    },
  });

  // Dynamic Ant Design theme tokens
  const antDesignTheme = {
    token: {
      colorPrimary: isDarkMode ? "#2a1a2a" : "#20b99b",
      colorLink: isDarkMode ? "#8e848e" : "#148069",
      colorBgBase: isDarkMode ? "#121212" : "#ffffff",
    },
    algorithm: isDarkMode
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider theme={antDesignTheme}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

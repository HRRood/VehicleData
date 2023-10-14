"use client";
import { CssBaseline, useMediaQuery } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { useMemo } from "react";

interface ThemeHOCProps {
  children: React.ReactNode;
}

export const THEME_COLORS = {
  light: {
    background: "#f7f6ff",
    backgroundPaper: "#fff",
    primary: "#FF8A99",
    secondary: "#AEDFF7",
    text: "#333333",
    success: "#8CEBA7",
  },
  dark: {
    background: "#010109",
    backgroundPaper: "#0b030a",
    primary: "#FF6B81",
    secondary: "#6BA5E7",
    text: "#EDEDED",
    success: "#68A77E",
  },
};

export const ThemeHOC = ({ children }: ThemeHOCProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => {
    const mode = !prefersDarkMode ? "light" : "dark";
    return createTheme({
      palette: {
        mode,
        background: {
          default: THEME_COLORS[mode].background,
          paper: THEME_COLORS[mode].backgroundPaper,
        },
        primary: {
          main: THEME_COLORS[mode].primary,
        },
        success: {
          main: THEME_COLORS[mode].success,
          contrastText: THEME_COLORS[mode].text,
        },
        text: {
          primary: THEME_COLORS[mode].text,
        },
      },
    });
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

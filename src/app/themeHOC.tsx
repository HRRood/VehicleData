"use client";
import { CssBaseline, useMediaQuery } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { useMemo } from "react";

interface ThemeHOCProps {
  children: React.ReactNode;
}

const colors = {
  light: {
    background: "#f0f0f0",
    backgroundPaper: "#fff",
    primary: "#FFB6C1",
    secondary: "#AEDFF7",
    text: "#333333",
    success: "#8CEBA7",
  },
  dark: {
    background: "#121212",
    backgroundPaper: "#1b1b1b",
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
          default: colors[mode].background,
          paper: colors[mode].backgroundPaper,
        },
        primary: {
          main: colors[mode].primary,
        },
        success: {
          main: colors[mode].success,
          contrastText: colors[mode].text,
        },
        text: {
          primary: colors[mode].text,
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

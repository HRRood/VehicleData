"use client";

import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

interface ThemeHOCProps {
  children: React.ReactNode;
}

export const ThemeHOC = ({ children }: ThemeHOCProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    const mode = prefersDarkMode ? "dark" : "light";
    const customColors = {
      light: {
        primary: "#000", // Custom primary color for light mode
        secondary: "#ff6f61", // Custom secondary color for light mode
      },
      dark: {
        primary: "#fff", // Custom primary color for dark mode
        secondary: "#f50057", // Custom secondary color for dark mode
      },
    };

    return createTheme({
      palette: {
        mode,
        primary: {
          main: customColors[mode].primary,
        },
        secondary: {
          main: customColors[mode].secondary,
        },
      },
    });
  }, [prefersDarkMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

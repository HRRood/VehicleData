"use client";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { useMemo } from "react";
import { useTheme } from "../hooks/useTheme";

interface ThemeHOCProps {
  children: React.ReactNode;
}

export const ThemeHOC = ({ children }: ThemeHOCProps) => {
  const { mode, colors } = useTheme();
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        background: {
          default: colors.background,
          paper: colors.backgroundPaper,
        },
        primary: {
          main: colors.primary,
        },
        success: {
          main: colors.success,
          contrastText: colors.text,
        },
        text: {
          primary: colors.text,
        },
      },
    });
  }, [mode, colors]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

import React, {
  useState,
  createContext,
  useEffect,
  type PropsWithChildren,
} from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";
import { CustomCSS } from "./CustomCSS";
import type { Theme } from "./ThemeTypes";
import { darkTheme, lightTheme, type ThemeContextType } from "@/Theme";


const gridConfig = {
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  columns: 12,
  gutter: "1rem",
};

const defaultContext: ThemeContextType = {
  themeState: defaultTheme,
  setThemeState: () => {},
  toggle: () => {},
  gridConfig,
};

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalThemeContext =
  createContext<ThemeContextType>(defaultContext);

export const GlobalThemeProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [themeState, setThemeState] = useState<Theme>(lightTheme);

  useEffect(() => {
  const localTheme = localStorage.getItem("theme");

  if (localTheme) {
    setThemeState(localTheme === "dark" ? darkTheme : lightTheme);
  } else {
    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setThemeState(systemIsDark ? darkTheme : lightTheme);
  }
  }, []);
  
  useEffect(() => {
    if (themeState.name === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeState.name]);

  useEffect(() => {
  if (localStorage.getItem("theme")) return;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (e: MediaQueryListEvent) => {
    setThemeState(e.matches ? darkTheme : lightTheme);
  };

  setThemeState(mediaQuery.matches ? darkTheme : lightTheme);

  mediaQuery.addEventListener("change", handleChange);
  return () => mediaQuery.removeEventListener("change", handleChange);
}, []);




  const toggle = () => {
    const newTheme = themeState.name === "light" ? darkTheme : lightTheme;
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme.name);

    if (newTheme.name === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <GlobalThemeContext.Provider
      value={{ themeState, setThemeState, toggle, gridConfig }}
    >
      <ThemeProvider theme={themeState}>
        <CustomCSS />
        {children}
      </ThemeProvider>
    </GlobalThemeContext.Provider>
  );
};

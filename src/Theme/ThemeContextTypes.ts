import type { Theme } from "./ThemeTypes";

export interface GridConfig {
  breakpoints: { [key: string]: number };
  columns: number;
  gutter: string;
}



export interface ThemeContextType {
  themeState: Theme;
  setThemeState: React.Dispatch<React.SetStateAction<Theme>>;
  toggle: () => void;
  gridConfig:  GridConfig
}
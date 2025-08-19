// theme/index.ts

// Types
export type { Theme } from "./ThemeTypes"
export * from "./ThemeContextTypes"

// Themes
export { defaultTheme } from "./defaultTheme"
export { darkTheme } from "./dark"
export { lightTheme } from "./light"

// Provider
export { GlobalThemeProvider , GlobalThemeContext } from "./GlobalThemeProvider"

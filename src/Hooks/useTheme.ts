import { useContext } from "react";
import { GlobalThemeContext } from "@/Theme";

export const useTheme = () => {
  const context = useContext(GlobalThemeContext);
  if (!context) {
    throw new Error("ThemeContext not available!");
  }
  return context;
};
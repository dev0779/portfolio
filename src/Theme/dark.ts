import type { Theme } from "./ThemeTypes";
import { defaultTheme } from "./defaultTheme";

export const darkTheme: Theme = {
  ...defaultTheme,
  name: "dark",
  background: "",
  text: "#ffffff",
  primaryColor: "#003366",
  grayColor: "#f5c71e"
};

import type { Theme } from "./ThemeTypes";
import { defaultTheme } from "./defaultTheme";

export const lightTheme: Theme = {
  ...defaultTheme,
  name: "light",
  background: "#ffffff",
  text: "#000000",
  primaryColor: "#262626",
  grayColor: "#707070"
};

import type { Theme } from "./ThemeTypes";



export const defaultTheme: Theme = {
  name: "default",
  background: "#ffffff",
  text: "#000000",
  primaryColor: "#003366",
  whiteColor: "#fcfcfc",
  ligthColor: "#EBF5FF",
  grayColor: "#707070",
  blackColor: "#292929",
  successColor: "#80c896",
  errorColor: "#E4003A",

  fonts: {
    body: "16px",
    small: "12px",
    weightBody: "400",
    lineHeightBody: "1.375",
    lineHeightDisplay: "1.2",
    fontFamilyDisplay: "Quatro",
    fontFamilyBody: "Calibri",
    fontgroup: ["Quatro", "Calibri"],
  },

  headlineSize: {
    h1: "40px",
    h2: "32px",
    h3: "24px",
    h4: "18px",
    h5: "16px",
    h6: "14px",
    headlineWeight: "600",
  },
};

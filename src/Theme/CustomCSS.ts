import { createGlobalStyle } from "styled-components";

export const CustomCSS = createGlobalStyle`
  /* Reset / base */
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    outline: 0;
    color: inherit;
    font-size: 100%;
    box-sizing: border-box;
    vertical-align: baseline;
    list-style: none;
  }

  /* Global body styling */
  body {
    background: ${({ theme }) => theme.background || "white"};
    min-height: 100vh;
    margin: 0;
    color: ${({ theme }) => theme.text || "black"};
    font-family: 'Roboto', sans-serif;
    transition: background 0.3s ease, color 0.3s ease; /* smooth theme switch */
  }
`;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./Api/ApolloClient.ts";
import { GlobalThemeProvider } from "./theme/GlobalThemeProvider.tsx";
import { UserProvider } from "./context/UserContext/UserContext.tsx";
import { TooltipProvider } from "./shared/Tooltip/TooltipProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/UserContext/ProductContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <ProductProvider>
        <GlobalThemeProvider>
          <TooltipProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </TooltipProvider>
        </GlobalThemeProvider>
        </ProductProvider>
      </UserProvider>
    </ApolloProvider>
  </StrictMode>,
);

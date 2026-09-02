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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <GlobalThemeProvider>
          <TooltipProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </TooltipProvider>
        </GlobalThemeProvider>
      </UserProvider>
    </ApolloProvider>
  </StrictMode>,
);

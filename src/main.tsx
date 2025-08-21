import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./Api/ApolloClient.ts";
import { GlobalThemeProvider } from "./Theme/GlobalThemeProvider.tsx";
import { UserProvider } from "./Context/UserContext/UserContext.tsx";
import { TooltipProvider } from "./components/Tooltip/TooltipProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <GlobalThemeProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </GlobalThemeProvider>
      </UserProvider>
    </ApolloProvider>
  </StrictMode>
);

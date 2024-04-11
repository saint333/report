import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { StateReportProvider } from "./context/StateReportContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <StateReportProvider>
        <App />
      </StateReportProvider>
    </ThemeProvider>
  </React.StrictMode>
);

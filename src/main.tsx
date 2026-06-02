import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <HashRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/room/:roomId" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);

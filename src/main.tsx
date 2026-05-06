import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { Debugger } from "./utils/debugger.ts";

// Simulação de eventos para desenvolvimento no navegador
new Debugger([
  {
    action: "setVisibility",
    data: { visibility: true },
  },
  {
    action: "setPlayerData",
    data: {
      name: "John Doe",
      job: "Policial",
      bank: 250000,
      id: 1,
    },
  },
], 1500);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);


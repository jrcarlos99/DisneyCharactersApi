import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {} from "./index.css";

import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App children={undefined} />
  </StrictMode>
);

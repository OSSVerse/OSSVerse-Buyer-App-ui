import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./global.css";
import Providers from "./providers";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Providers queryClient={queryClient} />
      <Toaster />
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}

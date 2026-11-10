import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/eb-garamond";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import "@fontsource-variable/manrope";
import "./styles/index.css";
import { weddingConfig } from "./config/wedding.config";
import { WeddingInvitationView } from "./presentation/views/WeddingInvitationView";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing invitation root element.");
}

createRoot(root).render(
  <StrictMode>
    <WeddingInvitationView config={weddingConfig} />
  </StrictMode>,
);

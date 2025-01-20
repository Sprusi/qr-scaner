import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/Navigation";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>
);

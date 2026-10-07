import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./legacy/runtime.js";
import App from "./App.jsx";

// Nota: no se usa <React.StrictMode> a propósito. Los scripts originales de cada
// página (js) manipulan el DOM directamente y no soportan el doble montaje
// que StrictMode hace en desarrollo.
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

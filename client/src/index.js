import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import App from "./App"; // Your main application component
import reportWebVitals from "./reportWebVitals";
import Footer from "./pages/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      {/* Other providers (if any) */}
      <App />
      <Footer />
    </CookiesProvider>
  </React.StrictMode>
);
reportWebVitals();
